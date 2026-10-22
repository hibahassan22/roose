import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CategoryBrowse } from "@/components/category-browse";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  categories,
  categoryMeta,
  isCategoryId,
  productsForCategory,
  type CategoryId,
} from "@/lib/home-data";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  if (!isCategoryId(slug)) {
    return { title: "قسم غير موجود | اللؤلؤة روز" };
  }
  const meta = categoryMeta[slug];
  return {
    title: `${meta.title} | اللؤلؤة روز`,
    description: meta.description,
  };
}

export default function CategoryPage({
  params,
}: PageProps<"/category/[slug]">) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Suspense fallback={<CategoryBrowseSkeleton />}>
          <CategoryContent params={params} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}

async function CategoryContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isCategoryId(slug)) notFound();

  const categorySlug = slug as CategoryId;
  const products = productsForCategory(categorySlug);

  return <CategoryBrowse slug={categorySlug} products={products} />;
}

function CategoryBrowseSkeleton() {
  return (
    <div className="bg-white">
      <div className="mx-auto w-full px-5 pt-8 pb-4 sm:px-8 lg:px-12">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-[#F3D9E5]" />
        <div className="mt-3 h-5 w-full max-w-md animate-pulse rounded bg-[#FDF2F7]" />
        <div className="mt-8 flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex w-[4.75rem] shrink-0 flex-col items-center gap-2">
              <div className="size-[4.5rem] animate-pulse rounded-full bg-[#F3D9E5]" />
              <div className="h-3 w-12 animate-pulse rounded bg-[#FDF2F7]" />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between">
          <div className="h-11 w-36 animate-pulse rounded-full bg-[#FDF2F7]" />
          <div className="h-11 w-24 animate-pulse rounded-full bg-[#FDF2F7]" />
        </div>
      </div>
      <div className="mx-auto grid w-full grid-cols-2 gap-3 px-5 pb-10 sm:gap-4 sm:px-8 lg:grid-cols-4 lg:gap-5 lg:px-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[5/6] animate-pulse rounded-[1.5rem] bg-[#F3D9E5] sm:aspect-[4/5]"
          />
        ))}
      </div>
    </div>
  );
}
