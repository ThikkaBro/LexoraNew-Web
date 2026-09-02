"use client";

import { useState } from "react";
import { assistantConfig } from "@/assistant.config";
import type { ChatMessage } from "@/lib/assistant/types";

/**
 * Offered after a few exchanges, or as soon as the assistant says it cannot
 * answer something — which is the moment a visitor is most likely to want a
 * person, and the moment the widget is otherwise least useful.
 */
export function LeadForm({
  transcript,
  onSent,
  onDismiss,
}: {
  transcript: ChatMessage[];
  onSent: () => void;
  onDismiss: () => void;
}) {
  const { leadCapture } = assistantConfig;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;

    setState("sending");
    setError(null);

    try {
      const res = await fetch("/api/assistant/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          company,
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
          transcript: transcript.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not send that.");

      onSent();
    } catch (cause) {
      setState("error");
      setError(cause instanceof Error ? cause.message : "Could not send that.");
    }
  }

  const field =
    "w-full rounded border border-line bg-ink px-3 py-2 text-sm text-paper placeholder:text-faint " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

  return (
    <form
      onSubmit={submit}
      aria-label={leadCapture.heading}
      className="rounded-xl border border-line bg-raised p-4"
    >
      <p className="t-h3 text-paper">{leadCapture.heading}</p>
      <p className="t-small mt-1.5 text-muted">{leadCapture.body}</p>

      <div className="mt-3 space-y-2">
        <label className="block">
          <span className="sr-only">Your name</span>
          <input
            className={field}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            maxLength={120}
            required
          />
        </label>

        <label className="block">
          <span className="sr-only">Your email</span>
          <input
            className={field}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={200}
            required
          />
        </label>

        {leadCapture.includeMessageField && (
          <label className="block">
            <span className="sr-only">Anything else we should know</span>
            <textarea
              className={`${field} resize-none`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Anything else we should know? (optional)"
              rows={2}
              maxLength={2000}
            />
          </label>
        )}

        {/* Honeypot. Hidden from sighted users and from screen readers, and
            excluded from the tab order — so only a bot ever fills it in. */}
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
        />
      </div>

      {error && (
        <p role="alert" className="t-small mt-2 text-accent">
          {error}
        </p>
      )}

      <div className="mt-3 flex items-center gap-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex h-9 items-center justify-center rounded bg-paper px-4 text-[0.8125rem] font-medium text-ink transition-colors duration-150 hover:bg-white disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          {state === "sending" ? "Sending…" : leadCapture.submitLabel}
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="inline-flex h-9 items-center rounded px-3 text-[0.8125rem] text-muted transition-colors duration-150 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Not now
        </button>
      </div>
    </form>
  );
}
