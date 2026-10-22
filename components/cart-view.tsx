"use client";

import {
  AlertCircle,
  ArrowLeft,
  Info,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  cartSuggestions,
  FREE_DELIVERY_THRESHOLD,
  initialCartItems,
  type CartLine,
} from "@/lib/home-data";
import { DeliveryPricesButton } from "./delivery-prices-modal";
import { IconTruck } from "./site-icons";
import { ProductCard } from "./product-card";

export function CartView() {
  const [items, setItems] = useState<CartLine[]>(initialCartItems);
  const [coupon, setCoupon] = useState("");
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items],
  );

  const addonsTotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          item.addons.reduce((a, addon) => a + addon.price, 0) * item.qty,
        0,
      ),
    [items],
  );

  const discount = couponApplied ? 25 : 0;
  const total = Math.max(0, subtotal + addonsTotal - discount);
  const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - total);
  const progress = Math.min(100, (total / FREE_DELIVERY_THRESHOLD) * 100);
  const hasBlockingItem = items.some((item) => item.deliveryUnavailable);

  const setQty = (key: string, next: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, qty: Math.max(0, next) } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const setMessage = (key: string, giftMessage: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, giftMessage } : item,
      ),
    );
  };

  return (
    <div className="bg-white">
      <CartBanner />

      <div className="mx-auto w-full px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,22rem)] lg:gap-8">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.key}>
                  <CartItemCard
                    item={item}
                    onQty={(qty) => setQty(item.key, qty)}
                    onRemove={() => removeItem(item.key)}
                    onMessage={(msg) => setMessage(item.key, msg)}
                  />
                </li>
              ))}
            </ul>

            <aside className="lg:sticky lg:top-24">
              <div className="rounded-[1.75rem] bg-[#FDF2F7] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-extrabold text-ink">ملخص الطلب</h2>
                  <span className="inline-flex items-center rounded-full bg-[#B0005A] px-3 py-1 text-xs font-bold text-white">
                    {itemCount} منتجات
                  </span>
                </div>

                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="font-bold text-muted">المجموع الفرعي</dt>
                    <dd className="font-extrabold text-ink">{subtotal} ر.س</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="font-bold text-muted">الإضافات</dt>
                    <dd className="font-extrabold text-ink">{addonsTotal} ر.س</dd>
                  </div>
                  {discount > 0 ? (
                    <div className="flex items-center justify-between gap-3">
                      <dt className="font-bold text-muted">الخصم</dt>
                      <dd className="font-extrabold text-[#1F7A4D]">
                        −{discount} ر.س
                      </dd>
                    </div>
                  ) : null}
                  <div className="flex items-start justify-between gap-3">
                    <dt className="font-bold text-muted">رسوم التوصيل</dt>
                    <dd className="text-end">
                      <p className="font-bold text-ink/80">
                        تُحسب عند إتمام الطلب
                      </p>
                      <DeliveryPricesButton className="mt-1 text-xs font-bold text-[#B0005A] underline decoration-[#B0005A]/35 underline-offset-4 transition hover:text-[#96004c]">
                        أسعار التوصيل حسب المدينة
                      </DeliveryPricesButton>
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 border-t border-[#E8CFDB] pt-4">
                  <button
                    type="button"
                    onClick={() => setCouponOpen((v) => !v)}
                    className="flex w-full items-center justify-between gap-2 text-sm font-bold text-ink"
                    aria-expanded={couponOpen}
                  >
                    <span>لديك كود خصم؟</span>
                    <span className="text-[#B0005A]">
                      {couponOpen ? "−" : "+"}
                    </span>
                  </button>
                  {couponOpen ? (
                    <form
                      className="mt-3 flex gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setCouponApplied(coupon.trim().length > 0);
                      }}
                    >
                      <input
                        type="text"
                        value={coupon}
                        onChange={(e) => {
                          setCoupon(e.target.value);
                          setCouponApplied(false);
                        }}
                        placeholder="أدخل رمز الكوبون"
                        className="h-11 min-w-0 flex-1 rounded-full bg-white px-4 text-sm text-ink outline-none ring-1 ring-[#E8CFDB] placeholder:text-muted/60 focus:ring-2 focus:ring-[#B0005A]/20"
                      />
                      <button
                        type="submit"
                        className="h-11 shrink-0 rounded-full bg-[#B0005A] px-4 text-sm font-bold text-white transition hover:bg-[#96004c]"
                      >
                        تطبيق
                      </button>
                    </form>
                  ) : null}
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E8CFDB] pt-4">
                  <span className="text-base font-extrabold text-ink">
                    الإجمالي
                  </span>
                  <span className="text-xl font-extrabold text-[#B0005A]">
                    {total} ر.س
                  </span>
                </div>

                {hasBlockingItem ? (
                  <p className="mt-4 flex items-start gap-2 rounded-2xl bg-[#FFF6E8] px-3.5 py-3 text-xs font-bold leading-5 text-[#9A6A20]">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                    احذف المنتجات غير المتوفرة لخيارات التوصيل الحالية قبل
                    المتابعة.
                  </p>
                ) : null}

                {hasBlockingItem ? (
                  <button
                    type="button"
                    disabled
                    className="mt-5 inline-flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#B0005A]/40 text-sm font-extrabold text-white"
                  >
                    إتمام الطلب
                    <ArrowLeft className="size-4" strokeWidth={2.5} />
                  </button>
                ) : (
                  <Link
                    href="/checkout"
                    className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#B0005A] text-sm font-extrabold text-white shadow-[0_12px_28px_-12px_rgba(176,0,90,0.55)] transition hover:bg-[#96004c]"
                  >
                    إتمام الطلب
                    <ArrowLeft className="size-4" strokeWidth={2.5} />
                  </Link>
                )}

                <Link
                  href="/category/bouquets"
                  className="mt-3 flex w-full items-center justify-center py-2 text-sm font-bold text-[#B0005A] transition hover:text-[#96004c]"
                >
                  متابعة التسوق
                </Link>

                <FreeDeliveryProgress
                  remaining={remainingForFree}
                  progress={progress}
                />
              </div>
            </aside>
          </div>
        )}
      </div>

      {items.length > 0 ? (
        <section className="border-t border-[#F3D9E5] bg-[#FDF2F7]/50">
          <div className="mx-auto w-full px-5 py-10 sm:px-8 lg:px-12">
            <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
              منتجات مشابهة قد تنال إعجابك
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {cartSuggestions.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function FreeDeliveryProgress({
  remaining,
  progress,
}: {
  remaining: number;
  progress: number;
}) {
  const unlocked = remaining <= 0;

  return (
    <div
      className={`mt-5 rounded-2xl px-4 py-3.5 ring-1 ${
        unlocked
          ? "bg-[#F3FBF6] ring-[#CDEAD9]"
          : "bg-white ring-[#E8CFDB]"
      }`}
    >
      {unlocked ? (
        <p className="flex items-center gap-2 text-sm font-bold text-[#1F7A4D]">
          <IconTruck className="size-4 shrink-0" />
          مبروك حصلت على توصيل مجاني لطلبك
        </p>
      ) : (
        <p className="text-sm font-bold text-ink">
          باقي{" "}
          <span className="text-[#B0005A]">{remaining} ر.س</span> للتوصيل
          المجاني
        </p>
      )}
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-[0.7rem] font-bold text-muted">
          الحد الأدنى {FREE_DELIVERY_THRESHOLD} ر.س
        </span>
      </div>
      <div
        className={`mt-2 h-2 overflow-hidden rounded-full ${
          unlocked ? "bg-[#CDEAD9]" : "bg-[#F3D9E5]"
        }`}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${
            unlocked ? "bg-[#1F7A4D]" : "bg-[#B0005A]"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {!unlocked ? (
        <DeliveryPricesButton className="mt-2 text-xs font-bold text-muted underline decoration-[#E8CFDB] underline-offset-4 transition hover:text-[#B0005A]">
          أسعار التوصيل حسب المدينة
        </DeliveryPricesButton>
      ) : null}
    </div>
  );
}

function CartBanner() {
  return (
    <section className="relative overflow-hidden bg-[#FDF2F7]">
      <div
        className="pointer-events-none absolute -start-10 top-1/2 h-40 w-40 -translate-y-1/2 opacity-80 sm:h-52 sm:w-52 lg:-start-4 lg:h-60 lg:w-60"
        aria-hidden
      >
        <Image
          src="/images/decor-hibiscus.png"
          alt=""
          fill
          className="object-contain"
          sizes="240px"
          priority
        />
      </div>
      <div
        className="pointer-events-none absolute -end-10 top-1/2 h-40 w-40 -translate-y-1/2 -scale-x-100 opacity-80 sm:h-52 sm:w-52 lg:-end-4 lg:h-60 lg:w-60"
        aria-hidden
      >
        <Image
          src="/images/decor-hibiscus.png"
          alt=""
          fill
          className="object-contain"
          sizes="240px"
          priority
        />
      </div>
      <div className="relative z-10 flex min-h-[7.5rem] items-center justify-center px-5 py-8 sm:min-h-[8.5rem] sm:py-10">
        <h1 className="text-3xl font-extrabold text-[#B0005A] sm:text-4xl">
          سلة التسوق
        </h1>
      </div>
    </section>
  );
}

function CartItemCard({
  item,
  onQty,
  onRemove,
  onMessage,
}: {
  item: CartLine;
  onQty: (qty: number) => void;
  onRemove: () => void;
  onMessage: (message: string) => void;
}) {
  const paidAddons = item.addons.filter((a) => a.price > 0);
  const freeAddons = item.addons.filter((a) => a.price === 0);

  return (
    <article className="rounded-[1.5rem] bg-[#FDF2F7] p-4 sm:p-5">
      <div className="flex gap-3 sm:gap-4">
        <Link
          href={`/product/${item.productId}`}
          className="relative size-[5.5rem] shrink-0 overflow-hidden rounded-2xl bg-[#F3D9E5] sm:size-[6.5rem]"
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-1.5"
            sizes="104px"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                href={`/product/${item.productId}`}
                className="text-base font-extrabold text-ink transition hover:text-[#B0005A] sm:text-lg"
              >
                {item.name}
              </Link>
              <p className="mt-1 text-xs leading-5 text-muted sm:text-sm">
                {item.desc}
              </p>
            </div>
            <p className="shrink-0 text-base font-extrabold text-[#B0005A] sm:text-lg">
              {item.price * item.qty} ر.س
            </p>
          </div>

          {freeAddons.length > 0 || item.deliveryLabel ? (
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {freeAddons.map((addon) => (
                <li
                  key={addon.id}
                  className="inline-flex items-center rounded-full bg-[#E8F6EE] px-2.5 py-1 text-[0.7rem] font-bold text-[#1F7A4D]"
                >
                  {addon.name} · مجاناً
                </li>
              ))}
              {item.deliveryLabel ? (
                <li className="inline-flex items-center rounded-full bg-[#F3D9E5] px-2.5 py-1 text-[0.7rem] font-bold text-[#7A1848]">
                  {item.deliveryLabel}
                </li>
              ) : null}
            </ul>
          ) : null}

          {paidAddons.length > 0 ? (
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {paidAddons.map((addon) => (
                <li
                  key={addon.id}
                  className="inline-flex items-center rounded-full bg-[#F3D9E5] px-2.5 py-1 text-[0.7rem] font-bold text-[#7A1848]"
                >
                  {addon.name} +{addon.price}
                </li>
              ))}
            </ul>
          ) : null}

          {item.deliveryUnavailable ? (
            <p className="mt-3 flex items-start gap-2 rounded-2xl bg-[#FFF6E8] px-3.5 py-3 text-xs font-bold leading-5 text-[#9A6A20]">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
              عذراً، هذا المنتج غير متوفر لخيارات التوصيل المختارة حالياً. يرجى
              الحذف للمتابعة
            </p>
          ) : null}

          {item.allowGiftMessage && !item.deliveryUnavailable ? (
            <label className="mt-3 block">
              <span className="sr-only">رسالة بطاقة الإهداء</span>
              <textarea
                value={item.giftMessage ?? ""}
                onChange={(e) => onMessage(e.target.value)}
                rows={2}
                placeholder="اكتب رسالة بطاقة الإهداء..."
                className="w-full resize-none rounded-2xl border border-[#E8CFDB] bg-white px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted/60 focus:ring-2 focus:ring-[#B0005A]/20"
              />
            </label>
          ) : null}

          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex h-10 items-center rounded-full bg-white ring-1 ring-[#E8CFDB]">
              <button
                type="button"
                aria-label={`تقليل كمية ${item.name}`}
                onClick={() => onQty(item.qty - 1)}
                className="inline-flex size-10 items-center justify-center text-ink transition hover:text-[#B0005A]"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="min-w-7 text-center text-sm font-extrabold text-ink">
                {item.qty}
              </span>
              <button
                type="button"
                aria-label={`زيادة كمية ${item.name}`}
                onClick={() => onQty(item.qty + 1)}
                className="inline-flex size-10 items-center justify-center text-[#B0005A] transition hover:text-[#96004c]"
              >
                <Plus className="size-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={onRemove}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-muted transition hover:text-[#B0005A]"
            >
              <Trash2 className="size-4" />
              حذف
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function EmptyCart() {
  return (
    <div className="mx-auto max-w-md rounded-[1.75rem] bg-white px-6 py-12 text-center shadow-[0_18px_50px_-28px_rgba(42,26,34,0.35)] ring-1 ring-[#F3D9E5] sm:px-10 sm:py-14">
      <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#FDF2F7]">
        <ShoppingBag
          className="size-9 text-[#B0005A]"
          strokeWidth={1.6}
          aria-hidden
        />
      </div>
      <h2 className="mt-6 text-xl font-extrabold text-ink sm:text-2xl">
        سلتك فارغة حالياً
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
        استكشف تشكيلاتنا من الورود والباقات المنمّقة وشارك الفرح مع من تحب
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
