import { type ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  className = "",
  id,
  containerClassName = "",
  bleed = false,
  padTop = true,
  padBottom = true,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
  bleed?: boolean;
  padTop?: boolean;
  padBottom?: boolean;
}) {
  return (
    <section
      id={id}
      className={className}
      style={{
        paddingTop: padTop ? "var(--section-pad)" : 0,
        paddingBottom: padBottom ? "var(--section-pad)" : 0,
      }}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
