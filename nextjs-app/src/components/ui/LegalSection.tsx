export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-10 first:border-t-0 first:pt-0">
      <h2 className="text-h3 mb-4">{title}</h2>
      <div className="text-body flex flex-col gap-4 text-[15px]">{children}</div>
    </section>
  );
}
