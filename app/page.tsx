import { Categories } from "@/components/categories";
import { FeatureCards } from "@/components/feature-cards";
import { Hero } from "@/components/hero";
import { ProductSection } from "@/components/product-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Testimonials } from "@/components/testimonials";
import { TrustBar } from "@/components/trust-bar";
import { Wholesale } from "@/components/wholesale";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Pink hero zone */}
        <div className="relative -mt-[4.75rem] overflow-hidden bg-brand-mist sm:-mt-[5.25rem]">
          <Hero />
        </div>

        {/* White zone — trust bar sits on the seam between pink & white */}
        <div className="relative bg-white pt-10 sm:pt-12 lg:pt-14">
          <TrustBar />
          <Categories />
          <ProductSection />
          <FeatureCards />
        </div>

        {/* Testimonials + wholesale share the soft pink zone like the design */}
        <Testimonials />
        <Wholesale />
      </main>
      <SiteFooter />
    </>
  );
}
