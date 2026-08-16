import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { Eyebrow, Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

export function About() {
  const { about } = siteConfig;

  return (
    <Section id="about" label="About us">
      <Reveal>
        <Eyebrow>Who you&rsquo;ll be working with</Eyebrow>
        <SectionHeading>{about.heading}</SectionHeading>
        <p className="mt-6 max-w-prose text-[1.0625rem] leading-[1.6] text-muted">
          {about.body}
        </p>
      </Reveal>

      <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:gap-16">
        {about.team.map((person, i) => {
          // Falls back to an initials block until a real photo is added.
          const photo: string = person.photo;

          return (
            <Reveal as="li" key={person.name} index={i}>
              <div className="flex gap-5">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded border border-hairline bg-surface">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={`${person.name}, ${person.role} at ${siteConfig.company}`}
                      width={160}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex h-full w-full items-center justify-center font-mono text-lg text-muted"
                    >
                      {person.initials}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-medium tracking-[-0.01em] text-paper">
                    {person.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-accent">{person.role}</p>
                  <p className="mt-3 max-w-prose text-[0.95rem] leading-[1.6] text-muted">
                    {person.bio}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <a
                      href={person.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on GitHub`}
                      className="rounded p-1.5 text-muted transition-colors duration-150 hover:text-paper"
                    >
                      <Github size={17} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                    <a
                      href={person.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on LinkedIn`}
                      className="rounded p-1.5 text-muted transition-colors duration-150 hover:text-paper"
                    >
                      <Linkedin size={17} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
