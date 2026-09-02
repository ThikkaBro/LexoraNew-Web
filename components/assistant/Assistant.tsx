"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MessageSquare, X } from "lucide-react";
import { assistantConfig } from "@/assistant.config";
import { cn } from "@/components/ui";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE MOUNT — deliberately the smallest component in the project
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  This file is all the JavaScript the assistant adds to a page load: a button
 *  and a boolean. The panel — transcript, streaming, lead form — is a separate
 *  chunk that Next.js only fetches when it is needed.
 *
 *  Why that matters for the Lighthouse score:
 *
 *    • Nothing here is render-blocking. It is a client component inside an
 *      otherwise server-rendered page, so it hydrates after paint.
 *    • The panel's code is not in the initial bundle, so it does not count
 *      towards the main-thread work or the transfer size that Total Blocking
 *      Time and Speed Index are measured against.
 *    • The launcher is positioned `fixed` and painted last, so it cannot shift
 *      any existing content — no Cumulative Layout Shift.
 *    • No network request is made until the visitor opens the panel.
 *
 *  The prefetch below is the one judgement call: when the browser reports it is
 *  idle we fetch the panel chunk early, so the first open is instant instead of
 *  showing a spinner. It runs after everything Lighthouse measures. Set
 *  ui.prefetchOnIdle to false to turn it off.
 */

const ChatPanel = dynamic(() => import("./ChatPanel").then((m) => m.ChatPanel), {
  ssr: false,
});

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const { ui, persona } = assistantConfig;

  useEffect(() => {
    if (!ui.prefetchOnIdle || shouldLoad) return;

    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(() => setShouldLoad(true), { timeout: 5000 })
        : window.setTimeout(() => setShouldLoad(true), 3000);

    return () => {
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, [ui.prefetchOnIdle, shouldLoad]);

  const handleOpen = useCallback(() => {
    setShouldLoad(true);
    setOpen(true);
  }, []);

  /** Focus returns to the button that opened the panel, as it must. */
  const handleClose = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  const side = ui.side === "left" ? "left-4 sm:left-6" : "right-4 sm:right-6";

  return (
    <>
      {(shouldLoad || open) && <ChatPanel open={open} onClose={handleClose} />}

      <button
        ref={launcherRef}
        type="button"
        onClick={open ? handleClose : handleOpen}
        aria-expanded={open}
        aria-controls="assistant-panel"
        aria-label={open ? "Close the assistant" : `${ui.launcherLabel} — ${persona.name}`}
        className={cn(
          "fixed bottom-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full",
          "border border-line-strong bg-raised text-paper shadow-lg shadow-black/40",
          "transition-colors duration-150 ease-out hover:border-white/25 hover:bg-white/[0.08]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
          // Below the panel on mobile, where the panel is full-width.
          open && "max-sm:hidden",
          side,
          "sm:bottom-6",
        )}
      >
        {open ? (
          <X size={20} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <MessageSquare size={20} strokeWidth={1.5} aria-hidden="true" />
        )}
      </button>
    </>
  );
}
