"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Linkedin, Mail, User, FileText, CheckCircle, ChevronRight, Briefcase, BarChart2, Share2, Lightbulb, Target, TrendingUp } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// ── Job data ────────────────────────────────────────────────────────────────
const JOB = {
  title: "Marketing Specialist",
  type: "Full-Time · On-site / Hybrid",
  location: "Colombo, Sri Lanka",
  posted: "September 2026",
  headline: "Shape Our Brand. Grow Our Reach. Drive The Future.",
  intro:
    "We're looking for a creative, strategic, and results-driven marketer to join the LexoraTech team. You'll own our brand voice, grow our digital presence, and drive campaigns that connect us with clients worldwide.",
  responsibilities: [
    "Plan and execute multi-channel marketing campaigns (LinkedIn, Instagram, TikTok, YouTube)",
    "Create compelling content — copy, visuals, and short-form video — that reflects LexoraTech's brand",
    "Manage and grow our social media profiles with consistent, high-quality output",
    "Analyze campaign performance and report on key metrics: reach, engagement, conversions",
    "Develop and execute brand growth strategies to expand our global reach",
    "Collaborate closely with the product and dev team to create launch materials",
  ],
  requirements: [
    "2+ years of experience in digital marketing or a related role",
    "Strong written communication skills in English",
    "Experience with social media management and analytics tools",
    "Creative eye for design and visual storytelling",
    "Data-driven mindset with the ability to interpret marketing metrics",
    "Ability to work independently and take ownership of projects",
  ],
  skills: [
    { icon: BarChart2, label: "Digital Marketing" },
    { icon: FileText, label: "Content Strategy" },
    { icon: Share2, label: "Social Media" },
    { icon: TrendingUp, label: "Brand Growth" },
    { icon: Target, label: "Campaigns" },
    { icon: Lightbulb, label: "Creative Thinking" },
  ],
};

// ── Animated section wrapper ────────────────────────────────────────────────
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ── Application Form ────────────────────────────────────────────────────────
function ApplicationForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/careers", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Unknown error");
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 rounded-xl border border-line-strong bg-raised px-8 py-16 text-center lit-edge"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
          <CheckCircle className="text-accent" size={28} />
        </div>
        <h3 className="t-h3 text-paper">Application received!</h3>
        <p className="t-small text-muted max-w-xs">
          Thank you for applying. We review every application carefully and will be in touch if you&apos;re a great fit.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      id="application-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="flex flex-col gap-5"
    >
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="career-name" className="t-micro text-muted">
          Full Name <span className="text-accent">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" size={15} />
          <input
            id="career-name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className="w-full rounded border border-line bg-surface py-2.5 pl-9 pr-4 text-sm text-paper placeholder:text-faint focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="career-email" className="t-micro text-muted">
          Email Address <span className="text-accent">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" size={15} />
          <input
            id="career-email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className="w-full rounded border border-line bg-surface py-2.5 pl-9 pr-4 text-sm text-paper placeholder:text-faint focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors"
          />
        </div>
      </div>

      {/* LinkedIn */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="career-linkedin" className="t-micro text-muted">
          LinkedIn Profile <span className="text-faint">(optional)</span>
        </label>
        <div className="relative">
          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" size={15} />
          <input
            id="career-linkedin"
            name="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/yourname"
            className="w-full rounded border border-line bg-surface py-2.5 pl-9 pr-4 text-sm text-paper placeholder:text-faint focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors"
          />
        </div>
      </div>

      {/* Cover note */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="career-cover" className="t-micro text-muted">
          Cover Note <span className="text-faint">(optional)</span>
        </label>
        <textarea
          id="career-cover"
          name="coverNote"
          rows={4}
          placeholder="Tell us why you'd be a great fit at LexoraTech — keep it real, not corporate."
          className="w-full resize-none rounded border border-line bg-surface px-4 py-2.5 text-sm text-paper placeholder:text-faint focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors"
        />
      </div>

      {/* CV Upload */}
      <div className="flex flex-col gap-1.5">
        <label className="t-micro text-muted">
          Your CV / Resume <span className="text-faint">(PDF or DOCX)</span>
        </label>
        <button
          type="button"
          id="cv-upload-btn"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-3 rounded border border-dashed border-line-strong bg-surface px-4 py-3.5 text-left transition-colors hover:border-accent/50 hover:bg-raised"
        >
          <Upload className="shrink-0 text-faint" size={15} />
          <span className="text-sm text-muted">
            {fileName ? (
              <span className="text-paper">{fileName}</span>
            ) : (
              "Click to upload your CV"
            )}
          </span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          name="cv"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="t-small rounded border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-red-400"
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        id="submit-application-btn"
        type="submit"
        disabled={status === "submitting"}
        className="flex h-11 items-center justify-center gap-2 rounded bg-accent px-6 text-sm font-medium text-ink transition-all hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Submit Application
            <ChevronRight size={15} />
          </>
        )}
      </button>
    </form>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CareersPage() {
  return (
    <>
      <Nav />
      <main id="careers-main" className="min-h-screen">
        {/* Hero */}
        <section
          id="careers-hero"
          className="relative overflow-hidden pt-32 pb-20 dot-grid"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
            <div className="h-[400px] w-[700px] rounded-full bg-accent/5 blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-shell px-6 sm:px-8">
            <FadeUp>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span className="t-micro text-accent tracking-widest">We&apos;re Hiring</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.06}>
              <h1 className="t-display mb-4 max-w-2xl text-balance text-paper">
                {JOB.title}
              </h1>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="t-lead mb-8 max-w-xl text-muted">{JOB.headline}</p>
            </FadeUp>

            <FadeUp delay={0.14}>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 rounded border border-line bg-raised px-3 py-1.5 text-sm text-muted lit-edge">
                  <Briefcase size={13} className="text-faint" />
                  {JOB.type}
                </div>
                <div className="flex items-center gap-2 rounded border border-line bg-raised px-3 py-1.5 text-sm text-muted lit-edge">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-faint">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  {JOB.location}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-shell px-6 pb-section sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
            {/* Left — Job Details */}
            <div className="flex flex-col gap-10">
              {/* About the role */}
              <FadeUp>
                <div>
                  <p className="t-micro mb-4 text-accent">About the Role</p>
                  <p className="t-body text-muted">{JOB.intro}</p>
                </div>
              </FadeUp>

              {/* Key Skills */}
              <FadeUp delay={0.04}>
                <div>
                  <p className="t-micro mb-4 text-accent">Key Skills</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {JOB.skills.map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2.5 rounded border border-line bg-raised px-4 py-3 lit-edge"
                      >
                        <Icon size={14} className="shrink-0 text-accent" />
                        <span className="t-small text-paper">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Responsibilities */}
              <FadeUp delay={0.06}>
                <div>
                  <p className="t-micro mb-4 text-accent">What You&apos;ll Do</p>
                  <ul className="flex flex-col gap-3">
                    {JOB.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <ChevronRight size={14} className="mt-1 shrink-0 text-accent" />
                        <span className="t-body text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              {/* Requirements */}
              <FadeUp delay={0.08}>
                <div>
                  <p className="t-micro mb-4 text-accent">What We&apos;re Looking For</p>
                  <ul className="flex flex-col gap-3">
                    {JOB.requirements.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <ChevronRight size={14} className="mt-1 shrink-0 text-accent" />
                        <span className="t-body text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </div>

            {/* Right — Application Form */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <FadeUp delay={0.1}>
                <div className="rounded-xl border border-line-strong bg-raised p-6 lit-edge">
                  <div className="mb-6">
                    <h2 className="t-h3 text-paper">Apply Now</h2>
                    <p className="t-small mt-1 text-muted">
                      Takes less than 2 minutes. We read every application.
                    </p>
                  </div>
                  <ApplicationForm />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
