"use client";

import { useEffect, useState } from "react";
import { Download, Mail, Linkedin, Calendar, ChevronDown, ChevronUp, Search, Users } from "lucide-react";

interface Application {
  id: string;
  name: string;
  email: string;
  linkedin: string | null;
  coverNote: string | null;
  expectedSalary: string | null;
  cvFileName: string | null;
  appliedAt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminCareersPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/careers/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      setAuthed(true);
      loadApps();
    } else {
      setPwError("Incorrect password.");
    }
  }

  async function loadApps() {
    setLoading(true);
    const res = await fetch("/api/careers/admin?load=1", {
      headers: { "x-admin-password": pw },
    });
    if (res.ok) {
      const data = await res.json();
      // newest first
      setApps(data.applications.slice().reverse());
    }
    setLoading(false);
  }

  const filtered = apps.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  // ── Login Gate ──────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-6">
        <div className="w-full max-w-sm rounded-xl border border-line-strong bg-raised p-8 lit-edge">
          <div className="mb-6">
            <p className="t-micro mb-1 text-accent">LexoraTech</p>
            <h1 className="t-h3 text-paper">Admin — Careers</h1>
            <p className="t-small mt-1 text-muted">Enter admin password to continue.</p>
          </div>
          <form onSubmit={login} className="flex flex-col gap-4">
            <input
              id="admin-password-input"
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setPwError(""); }}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full rounded border border-line bg-surface px-4 py-2.5 text-sm text-paper placeholder:text-faint focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
            {pwError && <p className="t-small text-red-400">{pwError}</p>}
            <button
              id="admin-login-btn"
              type="submit"
              className="flex h-10 items-center justify-center rounded bg-paper text-sm font-medium text-ink transition-colors hover:bg-white"
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ── Dashboard ───────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-ink px-6 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="t-micro mb-1 text-accent">LexoraTech Admin</p>
            <h1 className="t-h2 text-paper">Applicants</h1>
            <p className="t-small mt-1 text-muted">Marketing Specialist · {apps.length} total</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-raised">
            <Users size={16} className="text-muted" />
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" size={14} />
          <input
            id="admin-search"
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded border border-line bg-surface py-2.5 pl-9 pr-4 text-sm text-paper placeholder:text-faint focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
          />
        </div>

        {/* Loading */}
        {loading && (
          <p className="t-small text-center text-muted py-16">Loading applications…</p>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="rounded-xl border border-line bg-raised py-16 text-center lit-edge">
            <p className="t-small text-muted">
              {apps.length === 0
                ? "No applications yet. Share the careers page!"
                : "No results match your search."}
            </p>
          </div>
        )}

        {/* Application cards */}
        <ul className="flex flex-col gap-3">
          {filtered.map((app) => (
            <li
              key={app.id}
              className="rounded-xl border border-line bg-raised lit-edge overflow-hidden"
            >
              {/* Card header */}
              <button
                id={`applicant-${app.id}`}
                onClick={() => setExpanded((prev) => (prev === app.id ? null : app.id))}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-medium text-accent">
                    {app.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="t-small font-medium text-paper truncate">{app.name}</p>
                    <p className="t-micro text-muted truncate">{app.email}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <div className="hidden items-center gap-1.5 sm:flex">
                    <Calendar size={12} className="text-faint" />
                    <span className="t-micro text-faint">{formatDate(app.appliedAt)}</span>
                  </div>
                  {expanded === app.id ? (
                    <ChevronUp size={14} className="text-muted" />
                  ) : (
                    <ChevronDown size={14} className="text-muted" />
                  )}
                </div>
              </button>

              {/* Expanded detail */}
              {expanded === app.id && (
                <div className="border-t border-line px-5 pb-5 pt-4">
                  <div className="flex flex-col gap-4">
                    {/* Contact */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`mailto:${app.email}`}
                        className="flex items-center gap-2 rounded border border-line bg-surface px-3 py-1.5 text-sm text-accent hover:border-accent/30 transition-colors"
                      >
                        <Mail size={13} />
                        {app.email}
                      </a>
                      {app.linkedin && (
                        <a
                          href={app.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded border border-line bg-surface px-3 py-1.5 text-sm text-accent hover:border-accent/30 transition-colors"
                        >
                          <Linkedin size={13} />
                          LinkedIn Profile
                        </a>
                      )}
                      {app.cvFileName && (
                        <a
                          href={`/api/careers/download?file=${encodeURIComponent(app.cvFileName)}&pw=${encodeURIComponent(pw)}`}
                          className="flex items-center gap-2 rounded border border-line bg-surface px-3 py-1.5 text-sm text-paper hover:border-accent/30 transition-colors"
                        >
                          <Download size={13} />
                          Download CV
                        </a>
                      )}
                    </div>

                    {/* Expected Salary */}
                    {app.expectedSalary && (
                      <div className="flex items-center gap-3 rounded border border-accent/20 bg-accent/5 px-4 py-2.5">
                        <span className="t-micro text-accent">Expected Salary</span>
                        <span className="t-small font-medium text-paper">{app.expectedSalary}</span>
                      </div>
                    )}

                    {/* Cover note */}
                    {app.coverNote && (
                      <div className="rounded border border-line bg-surface px-4 py-3">
                        <p className="t-micro mb-2 text-muted">Cover Note</p>
                        <p className="t-small whitespace-pre-wrap text-paper">{app.coverNote}</p>
                      </div>
                    )}

                    {!app.cvFileName && !app.coverNote && (
                      <p className="t-small text-faint">No CV or cover note provided.</p>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
