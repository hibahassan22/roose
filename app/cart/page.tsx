import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "سلة التسوق | اللؤلؤة روز",
  description: "راجع منتجاتك وأكمل طلبك من اللؤلؤة روز مع توصيل مبرّد في المنطقة الشرقية.",
};

export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CartView />
      </main>
      <SiteFooter />
    </>
  );
}
