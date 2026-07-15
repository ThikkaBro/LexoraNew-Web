import Link from "next/link";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { VisualMockup } from "@/components/mockups";
import type { CaseStudy } from "@/lib/work";

export function WorkCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="card-hover group block overflow-hidden rounded-[12px] border border-line"
    >
      <div className="card-hover-frame">
        <BrowserFrame>
          <VisualMockup kind={study.visual} />
        </BrowserFrame>
      </div>
      <div className="p-6">
        <h3 className="text-h3 mb-2">{study.title}</h3>
        <p className="text-body mb-4 text-[15px]">{study.resultLine}</p>
        <p className="text-meta">{study.tags.join(" · ")}</p>
      </div>
    </Link>
  );
}
