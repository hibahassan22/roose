"use client";

import { ChevronDown, Filter, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  categories,
  categoryMeta,
  type CategoryId,
  type Product,
} from "@/lib/home-data";
import { CategoryIcon } from "./category-icon";
import { DeliveryPricesButton } from "./delivery-prices-modal";
import {
  emptyFilters,
  FilterModal,
  matchesPriceFilter,
  priceFilterLabel,
  type ProductFilters,
} from "./filter-modal";
import { ProductCard } from "./product-card";

const PAGE_SIZE = 8;

type SortKey = "popular" | "price-asc" | "price-desc";

export function CategoryBrowse({
  slug,
  products,
}: {
  slug: CategoryId;
  products: Product[];
}) {
  const meta = categoryMeta[slug];
  const [sort, setSort] = useState<SortKey>("popular");
  const [draftFilters, setDraftFilters] = useState<ProductFilters>(emptyFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<ProductFilters>(emptyFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      matchesPriceFilter(p.price, appliedFilters.price),
    );
    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [products, appliedFilters.price, sort]);

  const shown = filtered.slice(0, visible);
  const firstRow = shown.slice(0, 4);
  const rest = shown.slice(4);
  const canShowMore = visible < filtered.length;
  const activePriceLabel = priceFilterLabel(appliedFilters.price);

  return (
    <div className="bg-white">
      <div className="mx-auto w-full px-5 pt-8 pb-4 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
              {meta.title}
            </h1>
            <p className="mt-2 text-sm leading-7 text-muted sm:text-base">
              {meta.description}
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-[#B0005A] px-4 py-2 text-sm font-bold text-white">
            {meta.total} متوفر منتج
          </span>
        </div>

        <p className="mt-8 text-sm font-bold text-ink sm:text-base">
          تصفح أقسام البوتيك
        </p>
        <ul className="mt-4 flex gap-4 overflow-x-auto pb-2 sm:gap-5">
          {categories.map((category) => {
            const active = category.id === slug;
            return (
              <li key={category.id} className="shrink-0">
                <Link
                  href={`/category/${category.id}`}
                  className="group flex w-[4.75rem] flex-col items-center gap-2 text-center sm:w-[5.25rem]"
                >
                  <span
                    className={`inline-flex size-[4.5rem] items-center justify-center overflow-hidden rounded-full transition sm:size-[4.75rem] ${
                      active
                        ? "bg-[#B0005A] shadow-[0_10px_24px_-10px_rgba(176,0,90,0.55)]"
                        : "bg-[#f7e9f0] group-hover:bg-white group-hover:shadow-[0_8px_20px_-10px_rgba(155,16,72,0.35)]"
                    }`}
                  >
                    <span className={active ? "brightness-0 invert" : undefined}>
                      <CategoryIcon name={category.icon} />
                    </span>
                  </span>
                  <span
                    className={`text-[0.78rem] font-bold leading-tight ${
                      active ? "text-[#B0005A]" : "text-ink"
                    }`}
                  >
                    {category.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <label className="relative inline-flex">
            <span className="sr-only">ترتيب المنتجات</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-11 appearance-none rounded-full bg-[#FDF2F7] pe-10 ps-4 text-sm font-bold text-ink outline-none ring-1 ring-[#E8CFDB] transition hover:bg-white"
            >
              <option value="popular">الأكثر طلباً</option>
              <option value="price-asc">السعر: الأقل أولاً</option>
              <option value="price-desc">السعر: الأعلى أولاً</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 end-3 size-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
          </label>

          <button
            type="button"
            onClick={() => {
              setDraftFilters(appliedFilters);
              setFilterOpen(true);
            }}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-ink ring-1 ring-[#E8CFDB] transition hover:text-[#B0005A]"
          >
            <Filter className="size-4 text-[#B0005A]" aria-hidden />
            فلتر
          </button>
        </div>

        {activePriceLabel ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                const cleared = { ...appliedFilters, price: null };
                setAppliedFilters(cleared);
                setDraftFilters(cleared);
                setVisible(PAGE_SIZE);
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#B0005A] px-3.5 py-1.5 text-sm font-bold text-white"
            >
              {activePriceLabel}
              <X className="size-3.5" aria-hidden />
            </button>
          </div>
        ) : null}
      </div>

      <div className="mx-auto w-full px-5 pb-10 sm:px-8 lg:px-12">
        {firstRow.length > 0 ? (
          <ul className="mt-2 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {firstRow.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-center text-sm text-muted">
            لا توجد منتجات ضمن الفلتر الحالي.
          </p>
        )}

        {slug === "bouquets" ? <DeliveryPromoBanner /> : null}

        {rest.length > 0 ? (
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {rest.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10 flex flex-col items-center gap-3">
          {canShowMore ? (
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#B0005A] px-8 text-sm font-bold text-white shadow-[0_12px_28px_-12px_rgba(176,0,90,0.55)] transition hover:bg-[#96004c]"
            >
              عرض المزيد
            </button>
          ) : null}
          <p className="text-sm text-muted">
            عرض {shown.length} من أصل {meta.total} منتج
          </p>
        </div>
      </div>

      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        value={draftFilters}
        onChange={setDraftFilters}
        onApply={() => {
          setAppliedFilters(draftFilters);
          setVisible(PAGE_SIZE);
          setFilterOpen(false);
        }}
        onClear={() => {
          setDraftFilters(emptyFilters);
          setAppliedFilters(emptyFilters);
          setVisible(PAGE_SIZE);
          setFilterOpen(false);
        }}
      />
    </div>
  );
}

function DeliveryPromoBanner() {
  return (
    <aside className="relative mt-8 overflow-hidden rounded-[1.75rem] bg-[#F3D9E5] sm:rounded-[2rem]">
      <div
        className="pointer-events-none absolute -start-16 -top-24 h-[22rem] w-[22rem] rotate-[-28deg] opacity-70"
        aria-hidden
      >
        <Image
          src="/images/decor-pink-wash.png"
          alt=""
          fill
          className="object-contain"
          sizes="360px"
        />
      </div>

      <div
        className="pointer-events-none absolute -end-8 top-0 h-full w-[min(48%,280px)] opacity-90 sm:w-[min(42%,340px)]"
        aria-hidden
      >
        <Image
          src="/images/decor-cherry-banner.png"
          alt=""
          fill
          className="object-contain object-left"
          sizes="340px"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:pe-48">
        <div className="max-w-md">
          <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
            نوصل لك لحد باب البيت
          </h2>
          <p className="mt-2 text-sm leading-7 text-ink/75 sm:text-base">
            توصيل مجاني للطلبات فوق{" "}
            <span className="font-extrabold text-[#B0005A]">٣٥٠ ريال</span>
          </p>
          <DeliveryPricesButton className="mt-5 inline-flex h-11 items-center rounded-full bg-[#B0005A] px-6 text-sm font-bold text-white transition hover:bg-[#96004c]" />
        </div>

        <div className="relative mx-auto h-36 w-44 shrink-0 sm:mx-0 sm:h-40 sm:w-52">
          <Image
            src="/images/illust-delivery.png"
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="208px"
          />
        </div>
      </div>
    </aside>
  );
}
