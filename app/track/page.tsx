import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrackOrderView } from "@/components/track-order-view";

export const metadata: Metadata = {
  title: "تتبع طلبك | اللؤلؤة روز",
  description:
    "تابع حالة طلبك من اللؤلؤة روز لحظة بلحظة: الاستلام، التجهيز، التوصيل، والتسليم.",
};

export default function TrackOrderPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <TrackOrderView />
      </main>
      <SiteFooter />
    </>
  );
}
