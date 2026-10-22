import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product-detail";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  allProductIds,
  getProductDetail,
  relatedProducts,
} from "@/lib/home-data";

export function generateStaticParams() {
  return allProductIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[id]">) {
  const { id } = await params;
  const product = getProductDetail(id);
  if (!product) return { title: "منتج غير موجود | اللؤلؤة روز" };
  return {
    title: `${product.name} | اللؤلؤة روز`,
    description: product.longDesc,
  };
}

export default function ProductPage({
  params,
}: PageProps<"/product/[id]">) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductContent params={params} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}

async function ProductContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductDetail(id);
  if (!product) notFound();

  return (
    <ProductDetailView
      product={product}
      related={relatedProducts(product.id)}
    />
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="mx-auto grid w-full gap-8 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:px-12">
      <div className="aspect-square animate-pulse rounded-[1.75rem] bg-[#F3D9E5]" />
      <div className="space-y-4">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-[#F3D9E5]" />
        <div className="h-5 w-full animate-pulse rounded bg-[#FDF2F7]" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-[#FDF2F7]" />
        <div className="mt-8 grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl bg-[#F3D9E5]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
