"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

const needs = ["Design", "Build", "Grow", "Not sure"];
const budgets = [
  { value: "<1k", label: "Under $1,000" },
  { value: "1-5k", label: "$1,000 – $5,000" },
  { value: "5-15k", label: "$5,000 – $15,000" },
  { value: "15k+", label: "$15,000+" },
];

const inputClass =
  "w-full rounded-[12px] border border-line bg-surface px-4 py-3 text-body text-[15px] text-text-high placeholder:text-text-meta transition-colors focus:border-line-strong focus:outline-none";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[12px] border border-line bg-surface p-10 text-center">
        <p className="text-h3 mb-2">Got it — we&apos;ll reply within one business day.</p>
        <p className="text-body mx-auto text-[15px]">
          In a hurry? Email us directly at{" "}
          <a href="mailto:hello@lexoratech.com" className="link-reveal text-accent">
            hello@lexoratech.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-meta">Name *</span>
          <input required name="name" type="text" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-meta">Email *</span>
          <input required name="email" type="email" className={inputClass} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-meta">Company</span>
          <input name="company" type="text" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-meta">Based in (country) *</span>
          <input required name="basedIn" type="text" className={inputClass} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-meta">What do you need? *</span>
          <select required name="need" defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select one
            </option>
            {needs.map((need) => (
              <option key={need} value={need}>
                {need}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-meta">Budget range (USD) *</span>
          <select required name="budget" defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select one
            </option>
            {budgets.map((budget) => (
              <option key={budget.value} value={budget.value}>
                {budget.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-meta">What are you building? *</span>
        <textarea required name="message" rows={5} className={inputClass} />
      </label>

      {status === "error" && (
        <p role="alert" className="text-[14px] text-red-400">
          {errorMessage}
        </p>
      )}

      <Button type="submit" variant="primary" className="self-start">
        {status === "submitting" ? "Sending…" : "Start a project"}
      </Button>
    </form>
  );
}
