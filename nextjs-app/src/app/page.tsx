import { Hero } from "@/components/sections/Hero";
import { ProofBar } from "@/components/sections/ProofBar";
import { Pillars } from "@/components/sections/Pillars";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { ProductsStrip } from "@/components/sections/ProductsStrip";
import { Process } from "@/components/sections/Process";
import { CtaBand } from "@/components/sections/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofBar />
      <Pillars />
      <FeaturedWork />
      <ProductsStrip />
      <Process />
      <CtaBand />
    </>
  );
}
