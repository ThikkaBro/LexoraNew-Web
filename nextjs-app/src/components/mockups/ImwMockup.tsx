const nav = ["Solutions", "Events", "Our Specialists", "Contact"];

export function ImwMockup() {
  return (
    <div className="@container bg-[#eef4f1] p-5 text-[10px] leading-tight text-[#12332c] @sm:text-[11px]">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="shrink-0 font-semibold">Inner Mental Wellness</span>
        <div className="hidden min-w-0 gap-3 @sm:flex">
          {nav.map((item) => (
            <span key={item} className="whitespace-nowrap text-[#12332c]/50">{item}</span>
          ))}
        </div>
      </div>
      <span className="mb-3 inline-block rounded-full bg-[#12332c]/8 px-3 py-1 text-[9px] text-[#2f6b5a]">
        Sri Lanka&apos;s first EAP service
      </span>
      <p className="mb-2 max-w-xs text-[15px] font-semibold">
        Leading the future of <span className="text-[#2f9e7d]">mental health wellness</span>
      </p>
      <p className="mb-4 max-w-xs text-[#12332c]/60">
        Confidential counselling and Employee Assistance Programs, delivered island-wide.
      </p>
      <div className="flex gap-2">
        <span className="rounded-full bg-[#12332c] px-3 py-1.5 text-[9px] font-medium text-white">Get started →</span>
        <span className="rounded-full border border-[#12332c]/20 px-3 py-1.5 text-[9px] text-[#12332c]/70">Explore our EAP</span>
      </div>
    </div>
  );
}
