import { type ReactNode } from "react";

export function BrowserFrame({
  children,
  url,
}: {
  children: ReactNode;
  url?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-line bg-surface">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        {url && (
          <span className="text-meta ml-3 truncate text-[13px]">{url}</span>
        )}
      </div>
      <div className="mockup-scale">{children}</div>
    </div>
  );
}
