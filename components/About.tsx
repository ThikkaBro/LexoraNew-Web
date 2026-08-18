import Image from "next/image";
import { Github, Globe, Linkedin } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { Eyebrow, Section, SectionHeading, Standfirst } from "./ui";
import { Reveal } from "./Reveal";

export function About() {
  const { about } = siteConfig;

  return (
    <Section id="about" labelledBy="about-heading">
      <Reveal>
        <Eyebrow>{about.eyebrow}</Eyebrow>
        <SectionHeading id="about-heading">{about.heading}</SectionHeading>
        <Standfirst>{about.body}</Standfirst>
      </Reveal>

      <ul className="mt-16 grid gap-x-14 gap-y-12 border-t border-line pt-12 sm:grid-cols-2">
        {about.team.map((person, i) => {
          // Falls back to an initials plate until a real photo is added.
          const photo: string = person.photo;

          return (
            <Reveal as="li" key={person.name} index={i}>
              <div className="h-16 w-16 overflow-hidden rounded-xl border border-line bg-raised">
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
                    className="flex h-full w-full items-center justify-center text-[0.875rem] tracking-[0.06em] text-faint"
                  >
                    {person.initials}
                  </div>
                )}
              </div>

              <h3 className="t-h3 mt-5 text-[1.0625rem]">{person.name}</h3>
              <p className="mt-1 text-[0.8125rem] text-muted">{person.role}</p>
              <p className="t-small mt-3 max-w-prose text-muted">{person.bio}</p>

              <div className="-ml-1.5 mt-4 flex items-center gap-1">
                <a
                  href={person.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${person.name} on GitHub`}
                  className="rounded-sm p-1.5 text-faint transition-colors duration-150 hover:text-paper"
                >
                  <Github size={16} strokeWidth={1.5} aria-hidden="true" />
                </a>
                <a
                  href={person.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${person.name} on LinkedIn`}
                  className="rounded-sm p-1.5 text-faint transition-colors duration-150 hover:text-paper"
                >
                  <Linkedin size={16} strokeWidth={1.5} aria-hidden="true" />
                </a>
                <a
                  href={person.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${person.name}’s personal site`}
                  className="rounded-sm p-1.5 text-faint transition-colors duration-150 hover:text-paper"
                >
                  <Globe size={16} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
