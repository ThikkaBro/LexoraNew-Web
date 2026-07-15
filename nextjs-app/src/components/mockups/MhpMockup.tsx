const guides = ["Home safety checklist", "Reporting a concern", "For teachers", "For parents"];

export function MhpMockup() {
  return (
    <div className="bg-[#0b0d12] p-5 text-[10px] leading-tight text-white/70 sm:text-[11px]">
      <div className="mb-4 flex gap-2">
        <span className="rounded-full bg-white/8 px-2.5 py-1 text-[9px] text-white/60">Web development</span>
        <span className="rounded-full bg-white/8 px-2.5 py-1 text-[9px] text-white/60">Education tech</span>
      </div>
      <p className="mb-2 max-w-xs text-[15px] font-semibold text-white">Maga Harunu Paadama</p>
      <p className="mb-4 max-w-xs text-white/40">
        A centralised safety and education hub for Sri Lankan children — one place instead of scattered posts.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {guides.map((g) => (
          <div key={g} className="rounded-[8px] border border-white/8 bg-white/[0.03] p-3 text-white/60">
            {g}
          </div>
        ))}
      </div>
    </div>
  );
}
