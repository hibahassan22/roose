"use client";

import { ArrowLeft, ChevronDown, Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  favoriteFilterChips,
  favoriteSuggestions,
  initialFavorites,
  type FavoriteFilterId,
  type FavoriteItem,
} from "@/lib/home-data";
import { SectionTitle } from "./categories";
import { IconCart } from "./site-icons";
import { ProductCard } from "./product-card";

type SortKey = "newest" | "price-asc" | "price-desc";

export function FavoritesView() {
  const [items, setItems] = useState<FavoriteItem[]>(initialFavorites);
  const [filter, setFilter] = useState<FavoriteFilterId>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [addedNotice, setAddedNotice] = useState(false);

  const filterCounts = useMemo(() => {
    const counts = Object.fromEntries(
      favoriteFilterChips.map((chip) => [chip.id, 0]),
    ) as Record<FavoriteFilterId, number>;
    counts.all = items.length;
    for (const item of items) {
      counts[item.categoryId] = (counts[item.categoryId] ?? 0) + 1;
    }
    return counts;
  }, [items]);

  const filtered = useMemo(() => {
    let list =
      filter === "all"
        ? [...items]
        : items.filter((item) => item.categoryId === filter);

    if (sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }
    // newest: keep insertion order (seed order ≈ newest first)
    return list;
  }, [items, filter, sort]);

  const availableCount = useMemo(
    () => items.filter((item) => item.available).length,
    [items],
  );

  const removeFavorite = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setItems([]);
    setFilter("all");
  };

  const addAllAvailable = () => {
    if (availableCount === 0) return;
    setAddedNotice(true);
    window.setTimeout(() => setAddedNotice(false), 2200);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto w-full px-5 pt-8 pb-4 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
              المفضلة
            </h1>
            <p className="mt-2 text-sm leading-7 text-muted sm:text-base">
              باقات ورد مصممة بعناية فائقة لكل مناسبة، منسقة بأيدي خبراء الزهور
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-[#B0005A] px-4 py-2 text-sm font-bold text-white">
            {items.length} منتجات
          </span>
        </div>

        <ul className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {favoriteFilterChips.map((chip) => {
            const count = filterCounts[chip.id] ?? 0;
            const active = filter === chip.id;
            return (
              <li key={chip.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setFilter(chip.id)}
                  className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-bold transition ${
                    active
                      ? "bg-[#B0005A] text-white shadow-[0_8px_18px_-10px_rgba(176,0,90,0.55)]"
                      : "bg-white text-ink ring-1 ring-[#E8CFDB] hover:bg-[#FDF2F7]"
                  }`}
                >
                  {chip.name} ({count})
                </button>
              </li>
            );
          })}
        </ul>

        {items.length > 0 ? (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <label className="relative inline-flex">
              <span className="sr-only">ترتيب المفضلة</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-11 appearance-none rounded-full bg-[#FDF2F7] pe-10 ps-4 text-sm font-bold text-ink outline-none ring-1 ring-[#E8CFDB] transition hover:bg-white"
              >
                <option value="newest">الأحدث إضافة</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 end-3 size-4 -translate-y-1/2 text-muted"
                aria-hidden
              />
            </label>

            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-muted transition hover:text-[#B0005A]"
            >
              <Trash2 className="size-4" strokeWidth={1.8} aria-hidden />
              حذف الكل
            </button>
          </div>
        ) : null}
      </div>

      <div className="mx-auto w-full px-5 pb-8 sm:px-8 lg:px-12">
        {items.length === 0 ? (
          <EmptyFavorites />
        ) : filtered.length === 0 ? (
          <p className="rounded-[1.5rem] bg-[#FDF2F7] px-6 py-12 text-center text-sm font-bold text-muted">
            لا توجد منتجات في هذا التصنيف ضمن مفضلتك
          </p>
        ) : (
          <>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {filtered.map((product) => (
                <li key={product.id}>
                  <ProductCard
                    product={product}
                    initiallyLiked
                    unavailable={!product.available}
                    onToggleLike={(liked) => {
                      if (!liked) removeFavorite(product.id);
                    }}
                  />
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={addAllAvailable}
              disabled={availableCount === 0}
              className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#FDF2F7] text-sm font-extrabold text-[#B0005A] ring-1 ring-[#F3D9E5] transition hover:bg-[#F9E8EF] disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
            >
              <IconCart className="size-5" />
              أضف جميع المنتجات المتوفرة إلى السلة ({availableCount} منتجات)
            </button>
            {addedNotice ? (
              <p
                className="mt-3 text-center text-sm font-bold text-[#1F7A4D]"
                role="status"
              >
                تمت إضافة المنتجات المتوفرة إلى السلة
              </p>
            ) : null}
          </>
        )}
      </div>

      <section className="border-t border-[#F3D9E5] bg-[#FDF2F7]/50">
        <div className="mx-auto w-full px-5 py-10 sm:px-8 lg:px-12">
          <SectionTitle
            action={
              <Link
                href="/category/bouquets"
                className="inline-flex items-center gap-1 text-sm font-bold text-brand transition hover:text-brand-deep"
              >
                رؤية المزيد
                <ArrowLeft className="size-4" />
              </Link>
            }
          >
            منتجات مشابهة قد تنال إعجابك
          </SectionTitle>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {favoriteSuggestions.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function EmptyFavorites() {
  return (
    <div className="mx-auto max-w-md rounded-[1.75rem] bg-white px-6 py-12 text-center shadow-[0_18px_50px_-28px_rgba(42,26,34,0.35)] ring-1 ring-[#F3D9E5] sm:px-10 sm:py-14">
      <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#FDF2F7]">
        <Heart
          className="size-9 text-[#B0005A]"
          strokeWidth={1.6}
          aria-hidden
        />
      </div>
      <h2 className="mt-6 text-xl font-extrabold text-ink sm:text-2xl">
        مفضلتك فارغة حالياً
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
        احفظ الباقات التي تعجبك لتجدها بسهولة لاحقاً وأضفها إلى السلة بضغطة واحدة
      </p>
      <Link
        href="/category/bouquets"
        className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#B0005A] px-8 text-sm font-bold text-white shadow-[0_12px_28px_-12px_rgba(176,0,90,0.55)] transition hover:bg-[#96004c]"
      >
        تصفح الباقات
      </Link>
    </div>
  );
}
