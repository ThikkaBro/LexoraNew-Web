"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, RotateCcw, X } from "lucide-react";
import { assistantConfig } from "@/assistant.config";
import { cn } from "@/components/ui";
import { LeadForm } from "./LeadForm";
import { useAssistantChat } from "./useAssistantChat";

/**
 * The panel. Lazy-loaded — see Assistant.tsx for why.
 *
 * Motion: every transition here is CSS, and `app/globals.css` already reduces
 * all transition and animation durations to ~0 under
 * `prefers-reduced-motion: reduce`. So the panel appears instantly rather than
 * sliding for anyone who has asked for that, with no JavaScript check and no
 * separate code path to keep in sync.
 */

export function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { business, persona, ui, leadCapture, disclaimer } = assistantConfig;
  const chat = useAssistantChat();

  const [draft, setDraft] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const hasMessages = chat.messages.length > 0;

  /* ── Focus management ───────────────────────────────────────────────────── */

  useEffect(() => {
    if (!open) return;
    // Let the panel paint before moving focus, or the caret lands nowhere.
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      // Trap Tab inside the panel while it is open. Without this, tabbing
      // walks into the page behind and a keyboard user is stranded.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input:not([type="hidden"]), select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, onClose]);

  /** Keep the newest message in view as it streams. */
  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [chat.messages, chat.offerLead, chat.leadSent, open]);

  /* ── Composer ───────────────────────────────────────────────────────────── */

  const submit = useCallback(() => {
    const text = draft.trim();
    if (!text || chat.pending) return;
    setDraft("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    void chat.send(text);
  }, [draft, chat]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter makes a new line — what people expect from a
    // chat box. The form is still submittable without a mouse either way.
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const autoGrow = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  const remaining = assistantConfig.limits.maxMessageChars - draft.length;
  const sideClass = ui.side === "left" ? "sm:left-6" : "sm:right-6";

  return (
    <div
      id="assistant-panel"
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-label={ui.panelTitle}
      /*
        Kept mounted while closed, so the conversation survives closing and
        reopening and the chunk is fetched once.
        
        NOT hidden with the `hidden` attribute. That attribute's
        `display: none` comes from the browser's own stylesheet, which loses to
        any author declaration — so the `flex` class below silently overrode it
        and the "closed" panel stayed laid out, invisible at opacity 0, quietly
        swallowing every click in the bottom corner of the page including the
        ones aimed at its own launcher. `invisible` (visibility: hidden) is an
        author declaration, so it wins, and it also takes the panel out of the
        tab order and the accessibility tree — which `opacity-0` alone does not.
      */
      className={cn(
        "fixed z-[70] flex flex-col overflow-hidden border border-line bg-surface shadow-2xl shadow-black/60",
        // Mobile: a sheet anchored to the bottom, using dynamic viewport units
        // so the browser's own chrome does not clip the composer.
        "inset-x-0 bottom-0 top-auto max-h-[85dvh] rounded-t-2xl",
        // Desktop: a panel above the launcher.
        "sm:inset-x-auto sm:bottom-24 sm:h-[min(34rem,calc(100dvh-8rem))] sm:max-h-none sm:w-[23rem] sm:rounded-2xl",
        sideClass,
        "transition-opacity duration-200 ease-out",
        open
          ? "visible opacity-100"
          : "invisible opacity-0 pointer-events-none",
      )}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="min-w-0">
          <p className="t-h3 truncate text-paper">{ui.panelTitle}</p>
          <p className="t-micro mt-1 text-faint">
            {persona.name} · answers from this site
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {hasMessages && (
            <button
              type="button"
              onClick={() => {
                chat.reset();
                inputRef.current?.focus();
              }}
              aria-label="Start a new conversation"
              className="flex h-8 w-8 items-center justify-center rounded text-muted transition-colors duration-150 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <RotateCcw size={15} strokeWidth={1.5} aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close the assistant"
            className="flex h-8 w-8 items-center justify-center rounded text-muted transition-colors duration-150 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <X size={16} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Transcript ─────────────────────────────────────────────────────── */}
      <div
        ref={transcriptRef}
        className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
      >
        {/* Greeting is presentational, so it is not announced as a live update. */}
        <div className="max-w-[92%] rounded-xl rounded-bl-sm bg-raised px-3.5 py-2.5">
          <p className="t-small text-paper">{persona.greeting}</p>
        </div>

        {!hasMessages && (
          <ul className="flex flex-wrap gap-1.5 pt-1">
            {persona.suggestions.map((suggestion) => (
              <li key={suggestion}>
                <button
                  type="button"
                  onClick={() => void chat.send(suggestion)}
                  className="rounded-full border border-line px-3 py-1.5 text-[0.8125rem] text-muted transition-colors duration-150 hover:border-line-strong hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/*
          aria-live="polite" announces each completed reply to a screen reader
          without interrupting. It is on the container rather than each bubble
          so the region exists before the content arrives — a live region added
          at the same time as its content is not announced.
        */}
        <div aria-live="polite" aria-atomic="false" className="space-y-3">
          {chat.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[92%] rounded-xl px-3.5 py-2.5",
                message.role === "user"
                  ? "ml-auto rounded-br-sm bg-paper text-ink"
                  : "rounded-bl-sm bg-raised text-paper",
              )}
            >
              <p className="t-small whitespace-pre-wrap break-words">
                {message.content}
                {message.streaming && message.content && (
                  <span
                    aria-hidden="true"
                    className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 bg-accent"
                  />
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Typing indicator: only while waiting for the first token. */}
        {chat.pending && !chat.messages.at(-1)?.content && (
          <div className="w-fit rounded-xl rounded-bl-sm bg-raised px-3.5 py-3">
            <span className="sr-only">{persona.name} is typing</span>
            <span className="flex gap-1" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-faint"
                  style={{ animationDelay: `${i * 160}ms` }}
                />
              ))}
            </span>
          </div>
        )}

        {chat.error && (
          <p role="alert" className="t-small rounded-xl border border-line px-3.5 py-2.5 text-muted">
            {chat.error}
          </p>
        )}

        {leadCapture.enabled && chat.offerLead && !chat.leadSent && (
          <LeadForm
            transcript={chat.messages.map(({ role, content }) => ({ role, content }))}
            onSent={chat.markLeadSent}
            onDismiss={chat.dismissLead}
          />
        )}

        {chat.leadSent && (
          <p className="t-small rounded-xl border border-line bg-raised px-3.5 py-2.5 text-muted">
            {leadCapture.successMessage}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Composer ───────────────────────────────────────────────────────── */}
      <div className="border-t border-line px-3 pb-3 pt-2.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex items-end gap-2"
        >
          <label className="sr-only" htmlFor="assistant-input">
            Message {persona.name}
          </label>
          <textarea
            id="assistant-input"
            ref={inputRef}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value.slice(0, assistantConfig.limits.maxMessageChars));
              autoGrow(e.target);
            }}
            onKeyDown={onInputKeyDown}
            rows={1}
            placeholder="Ask about pricing, process, past work…"
            maxLength={assistantConfig.limits.maxMessageChars}
            className="max-h-[120px] min-h-[2.5rem] flex-1 resize-none rounded-lg border border-line bg-ink px-3 py-2 text-sm text-paper placeholder:text-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          />
          <button
            type="submit"
            disabled={!draft.trim() || chat.pending}
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-paper text-ink transition-opacity duration-150 disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <ArrowUp size={17} strokeWidth={2} aria-hidden="true" />
          </button>
        </form>

        {/* Not `t-micro`: that style is uppercase with wide tracking, which is
            right for a two-word eyebrow and unreadable for three lines. */}
        <p className="mt-2 text-[0.6875rem] leading-[1.5] text-faint">
          {remaining < 100 ? `${remaining} characters left. ` : ""}
          {disclaimer}{" "}
          {business.contact.bookingUrl && (
            <a
              href={business.contact.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm text-muted underline underline-offset-2 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              {business.contact.bookingLabel}
            </a>
          )}
        </p>
      </div>
    </div>
  );
}
