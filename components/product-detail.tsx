"use client";

import { Check, ChevronDown, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  productAddons,
  type Product,
  type ProductDetail,
} from "@/lib/home-data";
import { IconCart } from "./site-icons";
import { ProductCard } from "./product-card";

export function ProductDetailView({
  product,
  related,
}: {
  product: ProductDetail;
  related: Product[];
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["card"]);
  const [withMessage, setWithMessage] = useState(true);
  const [message, setMessage] = useState("");
  const [openSection, setOpenSection] = useState<
    "details" | "care" | "policy" | null
  >("details");

  const addonsTotal = useMemo(
    () =>
      productAddons
        .filter((a) => selectedAddons.includes(a.id))
        .reduce((sum, a) => sum + a.price, 0),
    [selectedAddons],
  );

  const total = (product.price + addonsTotal) * qty;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-white">
      <div className="mx-auto grid w-full gap-8 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-10">
        {/* Gallery — right in RTL */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-[#F8EAF1]">
            <Image
              src={product.gallery[activeImage] ?? product.image}
              alt={product.name}
              fill
              priority
              className="object-contain p-4 sm:p-6"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <ul className="mt-3 flex gap-2.5">
            {product.gallery.map((src, i) => (
              <li key={`${src}-${i}`}>
                <button
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`relative size-16 overflow-hidden rounded-2xl bg-[#F8EAF1] sm:size-20 ${
                    activeImage === i
                      ? "ring-2 ring-[#B0005A] ring-offset-2"
                      : "ring-1 ring-[#E8CFDB]"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-contain p-1.5"
                    sizes="80px"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
              {product.name}
            </h1>
            <p className="text-2xl font-extrabold text-[#B0005A] sm:text-3xl">
              {product.price} ر.س
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {product.bestSeller ? (
              <span className="rounded-full bg-[#B0005A] px-3 py-1 text-xs font-bold text-white">
                الأكثر طلباً
              </span>
            ) : null}
            {product.inStock ? (
              <span className="rounded-full bg-[#E8F6EE] px-3 py-1 text-xs font-bold text-[#1F7A4D]">
                متوفر
              </span>
            ) : (
              <span className="rounded-full bg-[#F3E8EC] px-3 py-1 text-xs font-bold text-muted">
                غير متوفر
              </span>
            )}
          </div>

          <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
            {product.longDesc}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {product.components.map((item) => (
              <li
                key={item}
                className="rounded-full bg-[#F8EAF1] px-3.5 py-1.5 text-xs font-bold text-[#7A1848]"
              >
                {item}
              </li>
            ))}
          </ul>

          <section className="mt-8">
            <h2 className="text-base font-extrabold text-ink">
              أضف لمسة مميزة
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-3">
              {productAddons.map((addon) => {
                const selected = selectedAddons.includes(addon.id);
                return (
                  <li key={addon.id}>
                    <button
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`relative flex w-full flex-col items-center gap-2 rounded-2xl px-3 py-3 text-center transition ${
                        selected
                          ? "bg-[#F8EAF1] ring-2 ring-[#B0005A]"
                          : "bg-[#FDF2F7] ring-1 ring-[#E8CFDB]"
                      }`}
                    >
                      {selected ? (
                        <span className="absolute top-2 start-2 inline-flex size-5 items-center justify-center rounded-full bg-[#B0005A] text-white">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                      ) : null}
                      <div className="relative h-12 w-12">
                        <Image
                          src={addon.image}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="48px"
                        />
                      </div>
                      <span className="text-xs font-bold leading-5 text-ink">
                        {addon.name}
                      </span>
                      <span className="text-xs font-extrabold text-[#B0005A]">
                        {addon.price === 0 ? "مجاناً" : `+${addon.price} ر.س`}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <label className="mt-6 flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={withMessage}
              onChange={(e) => setWithMessage(e.target.checked)}
              className="mt-1 size-4 accent-[#B0005A]"
            />
            <span className="text-sm font-bold text-ink">
              إضافة بطاقة ورسالة إهداء شخصية
            </span>
          </label>

          {withMessage ? (
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="اكتب رسالتك هنا..."
              className="mt-3 w-full resize-none rounded-2xl border border-[#E8CFDB] bg-[#FDF2F7] px-4 py-3 text-sm text-ink outline-none placeholder:text-muted/70 focus:ring-2 focus:ring-[#B0005A]/20"
            />
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex h-12 items-center rounded-full bg-[#FDF2F7] ring-1 ring-[#E8CFDB]">
              <button
                type="button"
                aria-label="تقليل الكمية"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="inline-flex size-12 items-center justify-center text-ink transition hover:text-[#B0005A]"
              >
                <Minus className="size-4" />
              </button>
              <span className="min-w-8 text-center text-base font-extrabold text-ink">
                {qty}
              </span>
              <button
                type="button"
                aria-label="زيادة الكمية"
                onClick={() => setQty((q) => q + 1)}
                className="inline-flex size-12 items-center justify-center text-ink transition hover:text-[#B0005A]"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <button
              type="button"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#B0005A] px-6 text-sm font-extrabold text-white transition hover:bg-[#96004c] sm:min-w-[12rem]"
            >
              <IconCart className="size-4" />
              أضف للسلة · {total} ر.س
            </button>

            <a
              href="https://wa.me/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-extrabold text-[#128C7E] ring-1 ring-[#128C7E]/40 transition hover:bg-[#F0FAF7]"
            >
              <WhatsAppIcon className="size-4" />
              تواصل واتساب
            </a>
          </div>
        </div>
      </div>

      {/* Accordions */}
      <div className="mx-auto w-full space-y-3 px-5 pb-4 sm:px-8 lg:px-12">
        <Accordion
          title="تفاصيل المنتج والتنسيق الفاخر"
          open={openSection === "details"}
          onToggle={() =>
            setOpenSection((s) => (s === "details" ? null : "details"))
          }
        >
          {product.details}
        </Accordion>
        <Accordion
          title="إرشادات العناية بالورد الطبيعي"
          open={openSection === "care"}
          onToggle={() =>
            setOpenSection((s) => (s === "care" ? null : "care"))
          }
        >
          {product.care}
        </Accordion>
        <Accordion
          title="سياسة الاستبدال والإلغاء المعتمدة"
          open={openSection === "policy"}
          onToggle={() =>
            setOpenSection((s) => (s === "policy" ? null : "policy"))
          }
        >
          {product.policy}
        </Accordion>
      </div>

      {/* Related */}
      {related.length > 0 ? (
        <section className="mx-auto w-full px-5 py-10 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
              منتجات مشابهة
            </h2>
            <Link
              href="/category/bouquets"
              className="text-sm font-bold text-[#B0005A] transition hover:text-[#96004c]"
            >
              عرض الكل
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {related.map((item) => (
              <li key={item.id}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function Accordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#FDF2F7] ring-1 ring-[#E8CFDB]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-start"
      >
        <span className="text-sm font-extrabold text-ink sm:text-base">
          {title}
        </span>
        <ChevronDown
          className={`size-5 shrink-0 text-[#B0005A] transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open ? (
        <div className="border-t border-[#E8CFDB] px-5 py-4 text-sm leading-7 text-muted">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.7 7.4L4 20l1.1-3.7a8.5 8.5 0 1 1 15.4-4.7Zm-8.5 6.7a6.7 6.7 0 0 0 3.6-1l.3-.2 2.1.6-.6-2 .2-.3a6.7 6.7 0 1 0-5.6 2.9Zm3.7-4.5c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.6.8-.1.1-.2.2-.4.1a5.5 5.5 0 0 1-1.6-1 6 6 0 0 1-1.1-1.4c-.1-.2 0-.3.1-.4l.3-.4.1-.2c0-.1 0-.2-.1-.3l-.6-1.5c-.2-.4-.3-.3-.5-.3h-.4c-.1 0-.3.1-.5.3-.2.2-.6.6-.6 1.4s.6 1.6.7 1.7c.1.2 1.2 1.9 3 2.6 1.8.7 1.8.5 2.1.4.3 0 1.1-.4 1.2-.9.2-.4.2-.8.1-.9 0-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}
