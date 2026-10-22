"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/home-data";
import { IconCart } from "./site-icons";

export function ProductCard({
  product,
  initiallyLiked = false,
  unavailable = false,
  onToggleLike,
}: {
  product: Product;
  initiallyLiked?: boolean;
  unavailable?: boolean;
  onToggleLike?: (liked: boolean) => void;
}) {
  const [liked, setLiked] = useState(initiallyLiked);

  return (
    <article
      className={`group relative flex aspect-[5/6] flex-col overflow-hidden rounded-[1.5rem] bg-[#F3D9E5] sm:aspect-[4/5] sm:rounded-[1.75rem] ${
        unavailable ? "opacity-90" : ""
      }`}
    >
      <Link
        href={`/product/${product.id}`}
        className="relative min-h-0 flex-1 outline-none"
        aria-label={`عرض ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-contain object-center p-2 transition duration-500 sm:p-2.5 ${
            unavailable
              ? "grayscale-[0.35] contrast-90"
              : "group-hover:scale-[1.03]"
          }`}
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        {unavailable ? (
          <span className="absolute inset-0 z-10 flex items-start justify-end bg-[#2A1A22]/45 p-3">
            <span className="rounded-full bg-[#4A4450] px-3 py-1.5 text-[0.65rem] font-bold text-white shadow-sm sm:text-xs">
              غير متوفر حالياً
            </span>
          </span>
        ) : null}
      </Link>

      <button
        type="button"
        aria-label={liked ? "إزالة من المفضلة" : "إضافة للمفضلة"}
        aria-pressed={liked}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setLiked((v) => {
            const next = !v;
            onToggleLike?.(next);
            return next;
          });
        }}
        className="absolute top-3 left-3 z-20 inline-flex size-8 items-center justify-center rounded-full bg-white text-ink shadow-[0_4px_12px_-4px_rgba(42,26,34,0.25)] transition hover:text-brand sm:size-9"
      >
        <Heart
          className="size-3.5 sm:size-4"
          strokeWidth={1.8}
          fill={liked ? "var(--brand)" : "none"}
          color={liked ? "var(--brand)" : "currentColor"}
        />
      </button>

      <div className="relative z-10 shrink-0 rounded-t-[1.25rem] bg-[#FDF2F7] px-3.5 py-4 sm:rounded-t-[1.35rem] sm:px-4 sm:py-5">
        <div className="flex items-center justify-between gap-3">
          <Link href={`/product/${product.id}`} className="min-w-0 flex-1 text-start">
            <h3 className="truncate text-sm font-extrabold text-ink sm:text-[0.95rem]">
              {product.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-[0.7rem] leading-5 text-muted sm:text-xs">
              {product.desc}
            </p>
            <p className="mt-2 text-sm font-extrabold text-[#B0005A] sm:text-[0.95rem]">
              {product.price} ر.س
            </p>
          </Link>

          <button
            type="button"
            aria-label={`أضف ${product.name} إلى السلة`}
            disabled={unavailable}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full text-white shadow-[0_8px_18px_-8px_rgba(176,0,90,0.65)] transition sm:size-11 ${
              unavailable
                ? "cursor-not-allowed bg-[#B0005A]/45"
                : "bg-[#B0005A] hover:bg-[#96004c]"
            }`}
          >
            <IconCart className="size-4 sm:size-[1.05rem]" />
          </button>
        </div>
      </div>
    </article>
  );
}
