"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { assistantConfig } from "@/assistant.config";
import type { ChatMessage, StreamEvent } from "@/lib/assistant/types";

/**
 * Conversation state and the streaming fetch.
 *
 * History lives in `sessionStorage`, not `localStorage` and not a cookie:
 * it survives a page navigation within the visit, and is gone when the tab
 * closes. That keeps the privacy policy simple and honest, and it is what a
 * visitor expects a chat panel to do.
 */

export type UiMessage = ChatMessage & { id: string; streaming?: boolean };

const STORAGE_KEY = "lexora.assistant.v1";

/** sessionStorage throws in some privacy modes; never let that break the chat. */
function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Private mode, or storage full. The conversation still works in memory. */
  }
}

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function useAssistantChat() {
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** True once the assistant has said it cannot answer, or after N replies. */
  const [offerLead, setOfferLead] = useState(false);
  const [leadSent, setLeadSent] = useState(false);

  const sessionId = useRef<string>("");
  const abortRef = useRef<AbortController | null>(null);
  /**
   * How many replies the assistant has given, counted in a ref.
   *
   * It cannot be derived inside a `setMessages` updater and read straight
   * afterwards: React defers updater functions to render time, so the value
   * read on the next line is always the previous one and the lead form never
   * appears. A ref is updated synchronously, which is what this needs.
   */
  const assistantReplies = useRef(0);

  // Restore on mount only — this is a client component, so there is no server
  // render to mismatch.
  useEffect(() => {
    const saved = safeRead<{ sessionId?: string; messages?: UiMessage[]; leadSent?: boolean }>(
      STORAGE_KEY,
      {},
    );
    sessionId.current = saved.sessionId ?? newId();
    if (saved.messages?.length) {
      setMessages(saved.messages.map((m) => ({ ...m, streaming: false })));
      assistantReplies.current = saved.messages.filter((m) => m.role === "assistant").length;
    }
    if (saved.leadSent) setLeadSent(true);
  }, []);

  useEffect(() => {
    if (!sessionId.current) return;
    safeWrite(STORAGE_KEY, { sessionId: sessionId.current, messages, leadSent });
  }, [messages, leadSent]);

  // Cancel any in-flight request if the component goes away.
  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim().slice(0, assistantConfig.limits.maxMessageChars);
      if (!trimmed || pending) return;

      setError(null);
      const userMessage: UiMessage = { id: newId(), role: "user", content: trimmed };
      const replyId = newId();

      // Snapshot the history we are about to send, so the request body does not
      // depend on state that may have moved on by the time fetch runs.
      const history = [...messages, userMessage].map(({ role, content }) => ({ role, content }));

      setMessages((prev) => [
        ...prev,
        userMessage,
        { id: replyId, role: "assistant", content: "", streaming: true },
      ]);
      setPending(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/assistant/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history, sessionId: sessionId.current }),
          signal: controller.signal,
        });

        if (!res.body) throw new Error("No response body");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        // Newline-delimited JSON. Chunks split mid-line, so only complete lines
        // are parsed and the remainder is carried into the next read.
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.trim()) continue;

            let parsed: StreamEvent;
            try {
              parsed = JSON.parse(line) as StreamEvent;
            } catch {
              continue;
            }

            if (parsed.type === "delta") {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === replyId ? { ...m, content: m.content + parsed.text } : m,
                ),
              );
            } else if (parsed.type === "done") {
              setMessages((prev) =>
                prev.map((m) => (m.id === replyId ? { ...m, streaming: false } : m)),
              );

              assistantReplies.current += 1;

              const { leadCapture } = assistantConfig;
              if (
                leadCapture.enabled &&
                ((leadCapture.offerOnFallback && parsed.fallback) ||
                  assistantReplies.current >= leadCapture.afterAssistantMessages)
              ) {
                setOfferLead(true);
              }
            } else if (parsed.type === "error") {
              setError(parsed.message);
              setMessages((prev) =>
                prev.filter((m) => !(m.id === replyId && m.content === "")),
              );
            }
          }
        }
      } catch (cause) {
        if ((cause as Error)?.name !== "AbortError") {
          setError("Could not reach the assistant. Check your connection and try again.");
          setMessages((prev) => prev.filter((m) => !(m.id === replyId && m.content === "")));
        }
      } finally {
        setMessages((prev) => prev.map((m) => (m.streaming ? { ...m, streaming: false } : m)));
        setPending(false);
        abortRef.current = null;
      }
    },
    [messages, pending],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setOfferLead(false);
    assistantReplies.current = 0;
    sessionId.current = newId();
  }, []);

  return {
    messages,
    pending,
    error,
    offerLead,
    leadSent,
    dismissLead: useCallback(() => setOfferLead(false), []),
    markLeadSent: useCallback(() => {
      setLeadSent(true);
      setOfferLead(false);
    }, []),
    send,
    reset,
    sessionId,
  };
}
