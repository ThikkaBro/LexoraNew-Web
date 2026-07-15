const nav = ["Home", "Shop", "Offers", "Gifts", "Contact", "About"];
const categories = ["Tech Accessories", "Office Essentials", "Paper & Notebooks"];

export function StoreMockup() {
  return (
    <div className="@container bg-[#0b0d12] p-5 text-[10px] leading-tight text-white/70 @sm:text-[11px]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="shrink-0 font-semibold text-white">Lexora Store</span>
        <div className="hidden min-w-0 gap-3 @sm:flex">
          {nav.map((item) => (
            <span key={item} className="whitespace-nowrap text-white/40">{item}</span>
          ))}
        </div>
        <span className="shrink-0 rounded-full bg-[#8b93f8] px-3 py-1 text-[9px] font-medium text-[#0a0c10]">Sign up</span>
      </div>
      <div className="mb-4 rounded-[8px] border border-white/8 bg-white/[0.03] p-4">
        <p className="mb-1 text-[9px] uppercase tracking-[0.12em] text-white/30">Elevate your workspace</p>
        <p className="mb-2 text-[13px] font-semibold text-white">Build your ultimate setup</p>
        <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[9px] text-white/70">Shop premium tech</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {categories.map((c) => (
          <div key={c} className="rounded-[8px] border border-white/8 bg-white/[0.03] p-3">
            <p className="text-white/70">{c}</p>
            <p className="mt-1 text-[9px] text-[#8b93f8]">Explore →</p>
          </div>
        ))}
      </div>
    </div>
  );
}
