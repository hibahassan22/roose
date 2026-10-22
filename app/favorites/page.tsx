import type { Metadata } from "next";
import { FavoritesView } from "@/components/favorites-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "المفضلة | اللؤلؤة روز",
  description:
    "منتجاتك المفضلة من باقات وفازات وتنسيقات اللؤلؤة روز، جاهزة للإضافة إلى السلة.",
};

export default function FavoritesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <FavoritesView />
      </main>
      <SiteFooter />
    </>
  );
}
