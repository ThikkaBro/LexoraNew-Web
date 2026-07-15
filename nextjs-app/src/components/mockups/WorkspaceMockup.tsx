const categories = ["Design Tools", "Video Suite", "Audio Lab", "Developer", "Utilities", "Career"];

const tools = [
  { name: "Online Whiteboard", tag: "New" },
  { name: "Device Mockups", tag: "Popular" },
  { name: "Photo Enhancer", tag: "AI" },
  { name: "Background Remover", tag: "AI" },
];

export function WorkspaceMockup() {
  return (
    <div className="@container flex bg-[#0b0d12] text-[10px] leading-tight text-white/70 @sm:text-[11px]">
      <div className="hidden w-32 shrink-0 border-r border-white/5 p-4 @sm:block">
        <p className="mb-2 text-[9px] uppercase tracking-[0.12em] text-white/30">Studio</p>
        {categories.slice(0, 3).map((c) => (
          <p key={c} className="mb-2 text-white/60">{c}</p>
        ))}
        <p className="mb-2 mt-4 text-[9px] uppercase tracking-[0.12em] text-white/30">Productivity</p>
        {categories.slice(3).map((c) => (
          <p key={c} className="mb-2 text-white/60">{c}</p>
        ))}
      </div>
      <div className="min-w-0 flex-1 p-5">
        <p className="mb-1 text-[13px] font-semibold text-white">Free online creator &amp; productivity tools</p>
        <p className="mb-4 max-w-xs text-white/40">34+ browser-based utilities. Edit images, record your screen, format code — no downloads.</p>
        <div className="grid grid-cols-2 gap-2">
          {tools.map((tool) => (
            <div key={tool.name} className="min-w-0 rounded-[8px] border border-white/8 bg-white/[0.03] p-3">
              <span className="mb-4 inline-block rounded-full bg-white/8 px-1.5 py-0.5 text-[8px] text-white/50">{tool.tag}</span>
              <p className="truncate text-white/80">{tool.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
