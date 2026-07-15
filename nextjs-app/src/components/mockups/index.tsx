import { WorkspaceMockup } from "./WorkspaceMockup";
import { StoreMockup } from "./StoreMockup";
import { ImwMockup } from "./ImwMockup";
import { MhpMockup } from "./MhpMockup";

export type VisualKind = "workspace" | "store" | "imw" | "mhp";

export function VisualMockup({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "workspace":
      return <WorkspaceMockup />;
    case "store":
      return <StoreMockup />;
    case "imw":
      return <ImwMockup />;
    case "mhp":
      return <MhpMockup />;
  }
}
