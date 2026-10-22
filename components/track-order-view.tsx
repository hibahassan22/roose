"use client";

import {
  Check,
  ChevronDown,
  Gift,
  MapPin,
  Package,
  Scissors,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  FREE_DELIVERY_THRESHOLD,
  trackedOrders,
  type TrackOrderStatus,
  type TrackedOrder,
} from "@/lib/home-data";

const statusOrder: TrackOrderStatus[] = [
  "received",
  "preparing",
  "out_for_delivery",
  "delivered",
];

const statusIcons: Record<
  TrackOrderStatus,
  React.ComponentType<{ className?: string }>
> = {
  received: ShoppingBag,
  preparing: Scissors,
  out_for_delivery: Truck,
  delivered: Package,
};

export function TrackOrderView() {
  const [orderId, setOrderId] = useState(trackedOrders[0].id);
  const order = useMemo(
    () => trackedOrders.find((o) => o.id === orderId) ?? trackedOrders[0],
    [orderId],
  );
  const currentIndex = statusOrder.indexOf(order.currentStatus);
  const total = Math.max(
    0,
    order.subtotal + order.addons - order.discount,
  );
  const freeDelivery =
    order.subtotal + order.addons >= FREE_DELIVERY_THRESHOLD;

  return (
    <div className="bg-white">
      <div className="mx-auto w-full px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold text-[#B0005A] sm:text-4xl">
              تتبع طلبك
            </h1>
            <p className="mt-3 text-sm leading-8 text-muted sm:text-base">
              أهلاً بك مجدداً، {order.customerName}. نعتني بتفاصيل باقاتك لتصل
              بأبهى وأعطر حُلة إلى من تحبين.
            </p>
          </div>

          <label className="block w-full max-w-sm shrink-0 lg:ms-auto">
            <span className="mb-2 block text-sm font-bold text-ink">
              اختر من طلباتك
            </span>
            <div className="relative">
              <select
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="h-12 w-full appearance-none rounded-2xl bg-[#FDF2F7] pe-10 ps-4 text-sm font-bold text-ink outline-none ring-1 ring-[#E8CFDB] transition focus:bg-white focus:ring-2 focus:ring-[#B0005A]/20"
              >
                {trackedOrders.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 end-3 size-4 -translate-y-1/2 text-muted"
                aria-hidden
              />
            </div>
          </label>
        </div>

        <section className="mt-8 rounded-[1.75rem] bg-[#FDF2F7] p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-muted">رقم الطلب</p>
              <p className="mt-1 text-xl font-extrabold text-ink" dir="ltr">
                {order.id}
              </p>
              <p className="mt-2 text-sm font-bold text-muted">
                تم الطلب {order.placedAt}
              </p>
            </div>
            {order.paymentConfirmed ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F6EE] px-3.5 py-2 text-xs font-extrabold text-[#1F7A4D]">
                <Check className="size-3.5" strokeWidth={3} />
                تم تأكيد الدفع عبر {order.paymentMethod}
              </span>
            ) : null}
          </div>

          <OrderTimeline order={order} currentIndex={currentIndex} />
        </section>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Products + gift — start/right in RTL */}
          <section className="rounded-[1.75rem] bg-[#FDF2F7] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold text-ink">ملخص المنتجات</h2>
              <span className="inline-flex items-center rounded-full bg-[#B0005A] px-3 py-1 text-xs font-bold text-white">
                {order.items.length} منتجات
              </span>
            </div>

            <ul className="mt-5 space-y-3.5">
              {order.items.map((item) => (
                <li key={item.key} className="flex gap-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-[#F3D9E5]">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-contain p-1"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-extrabold text-ink">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-[0.7rem] font-bold text-muted">
                          الكمية {item.qty}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-extrabold text-[#B0005A]">
                        {item.price} ر.س
                      </p>
                    </div>
                    <p className="mt-1 text-[0.7rem] leading-5 text-muted">
                      {item.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-2xl bg-white px-4 py-4 ring-1 ring-[#E8CFDB]">
              <p className="flex items-center gap-2 text-sm font-extrabold text-ink">
                <Gift className="size-4 text-[#B0005A]" aria-hidden />
                رسالة كارت الإهداء الفاخر
              </p>
              <p className="mt-2 text-sm leading-7 text-muted">
                {order.giftMessage}
              </p>
            </div>
          </section>

          {/* Delivery + pricing — end/left in RTL */}
          <section className="rounded-[1.75rem] bg-[#FDF2F7] p-5 sm:p-6">
            <h2 className="text-lg font-extrabold text-ink">تفاصيل التوصيل</h2>

            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="font-bold text-muted">اسم المستلم</dt>
                <dd className="mt-1 font-extrabold text-ink">
                  {order.recipientName}
                </dd>
              </div>
              <div>
                <dt className="font-bold text-muted">العنوان</dt>
                <dd className="mt-1 flex items-start gap-2 font-bold leading-7 text-ink">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-[#B0005A]"
                    aria-hidden
                  />
                  {order.address}
                </dd>
              </div>
              <div>
                <dt className="font-bold text-muted">موعد التوصيل</dt>
                <dd className="mt-1 font-extrabold text-ink">
                  {order.deliverySlot}
                </dd>
              </div>
              <div>
                <dt className="font-bold text-muted">ملاحظات خاصة</dt>
                <dd className="mt-1 font-bold leading-7 text-ink/85">
                  {order.specialNotes}
                </dd>
              </div>
            </dl>

            <dl className="mt-6 space-y-2.5 border-t border-[#E8CFDB] pt-4 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="font-bold text-muted">المجموع الفرعي</dt>
                <dd className="font-extrabold text-ink">{order.subtotal} ر.س</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="font-bold text-muted">الإضافات</dt>
                <dd className="font-extrabold text-ink">{order.addons} ر.س</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="font-bold text-muted">
                  رسوم التوصيل ({order.city})
                </dt>
                <dd className="text-end font-extrabold">
                  {freeDelivery ? (
                    <span className="text-[#1F7A4D]">
                      مجاني
                      <span className="mt-0.5 block text-[0.65rem] font-bold">
                        (تجاوز {FREE_DELIVERY_THRESHOLD} ر.س)
                      </span>
                    </span>
                  ) : (
                    <span className="text-ink">محسوبة</span>
                  )}
                </dd>
              </div>
              {order.discount > 0 ? (
                <div className="flex justify-between gap-3">
                  <dt className="font-bold text-muted">
                    الخصم ({order.discountLabel})
                  </dt>
                  <dd className="font-extrabold text-[#1F7A4D]">
                    −{order.discount} ر.س
                  </dd>
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-3 border-t border-[#E8CFDB] pt-3">
                <dt className="text-base font-extrabold text-ink">الإجمالي</dt>
                <dd className="text-xl font-extrabold text-[#B0005A]">
                  {total} ر.س
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      <SupportBanner />
    </div>
  );
}

function OrderTimeline({
  order,
  currentIndex,
}: {
  order: TrackedOrder;
  currentIndex: number;
}) {
  return (
    <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2">
      {order.timeline.map((step, index) => {
        const done = index < currentIndex;
        const active = index === currentIndex;
        const Icon = statusIcons[step.id];
        const reached = done || active;

        return (
          <li key={step.id} className="relative">
            {index < order.timeline.length - 1 ? (
              <span
                className={`pointer-events-none absolute top-5 start-[calc(50%+1.75rem)] hidden h-0.5 w-[calc(100%-1.5rem)] lg:block ${
                  index < currentIndex ? "bg-[#B0005A]" : "bg-[#E8CFDB]"
                }`}
                aria-hidden
              />
            ) : null}

            <div className="flex flex-col items-center text-center lg:px-2">
              <span
                className={`relative z-10 inline-flex size-11 items-center justify-center rounded-full transition ${
                  reached
                    ? "bg-[#B0005A] text-white shadow-[0_10px_22px_-10px_rgba(176,0,90,0.55)]"
                    : "bg-white text-muted ring-1 ring-[#E8CFDB]"
                }`}
              >
                {done ? (
                  <Check className="size-5" strokeWidth={2.5} />
                ) : (
                  <Icon className="size-5" />
                )}
              </span>
              <p
                className={`mt-3 text-sm font-extrabold ${
                  active ? "text-[#B0005A]" : "text-ink"
                }`}
              >
                {step.label}
              </p>
              <p className="mt-1 text-[0.7rem] font-bold leading-5 text-muted">
                {step.detail}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function SupportBanner() {
  return (
    <aside className="relative mt-4 overflow-hidden bg-[#F3D9E5]">
      <div
        className="pointer-events-none absolute -start-8 top-0 h-full w-[min(48%,320px)] opacity-90"
        aria-hidden
      >
        <Image
          src="/images/decor-cherry-banner.png"
          alt=""
          fill
          className="object-contain object-left"
          sizes="320px"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full flex-col items-start gap-5 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12 lg:py-12">
        <div className="max-w-lg ps-0 sm:ps-[min(28%,180px)] lg:ps-[min(32%,220px)]">
          <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
            تحتاج مساعدة أو لديك استفسار عن طلبك؟
          </h2>
          <p className="mt-2 text-sm leading-7 text-ink/75">
            فريق اللؤلؤة روز جاهز لمساعدتك عبر واتساب في أي وقت.
          </p>
        </div>

        <a
          href="https://wa.me/"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#128C7E] px-6 text-sm font-extrabold text-white shadow-[0_12px_28px_-12px_rgba(18,140,126,0.55)] transition hover:bg-[#0f7a6d]"
        >
          <Image
            src="/images/icons/social-whatsapp.png"
            alt=""
            width={20}
            height={20}
            className="size-5 object-contain brightness-0 invert"
            aria-hidden
          />
          تواصل عبر واتساب
        </a>
      </div>
    </aside>
  );
}
