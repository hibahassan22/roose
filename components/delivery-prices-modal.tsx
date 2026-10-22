"use client";

import Image from "next/image";
import { useState } from "react";
import { Modal } from "./ui/modal";

const cities = [
  { name: "الدمام", price: 25 },
  { name: "القطيف", price: 35 },
  { name: "الخبر", price: 40 },
  { name: "الجبيل", price: 90 },
  { name: "الاحساء", price: 100 },
] as const;

const slots = [
  { label: "صباحاً", time: "9:00 AM - 12:00 PM" },
  { label: "ظهراً", time: "1:00 PM - 04:00 PM" },
  { label: "مساءً", time: "05:00 PM - 09:00 PM" },
  { label: "ليلاً", time: "09:00 PM - 11:00 PM" },
] as const;

export function DeliveryPricesModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="أسعار ومواعيد التوصيل"
      titleIcon={
        <Image
          src="/images/icons/truck.png"
          alt=""
          width={22}
          height={22}
          className="size-5 object-contain"
          aria-hidden
        />
      }
    >
      <div className="space-y-6">
        <div className="flex items-start gap-3 rounded-2xl bg-[#E8F6EE] px-4 py-3.5">
          <Image
            src="/images/icons/cart.png"
            alt=""
            width={22}
            height={22}
            className="mt-0.5 size-5 shrink-0 object-contain"
            aria-hidden
          />
          <div className="min-w-0 flex-1 text-start">
            <p className="text-sm font-extrabold leading-6 text-[#1F7A4D]">
              توصيل مجاني للطلبات فوق ٣٥٠ ريال
            </p>
            <p className="mt-1 text-xs leading-5 text-[#4A9A6E]">
              يحسب الخصم تلقائياً عند الدفع لجميع المدن المعتمدة
            </p>
          </div>
        </div>

        <section>
          <h3 className="mb-3 text-sm font-bold text-[#8A7A82]">
            الرسوم الثابتة حسب المدينة
          </h3>
          <ul className="space-y-2.5">
            {cities.map((city) => (
              <li
                key={city.name}
                className="flex items-center justify-between rounded-2xl bg-[#F8EAF1] px-4 py-3.5"
              >
                <span className="text-sm font-extrabold text-[#7A1848]">
                  {city.price} ر.س
                </span>
                <span className="text-sm font-bold text-[#5A2A3E]">
                  {city.name}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-bold text-[#8A7A82]">
            الفترات اليومية المتاحة
          </h3>
          <ul className="grid grid-cols-2 gap-2.5">
            {slots.map((slot) => (
              <li
                key={slot.label}
                className="rounded-2xl bg-[#F8EAF1] px-3.5 py-4 text-center"
              >
                <p className="text-sm font-extrabold text-[#7A1848]">
                  {slot.label}
                </p>
                <p className="mt-1.5 text-xs font-semibold tracking-wide text-[#9B4A6E]" dir="ltr">
                  {slot.time}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Modal>
  );
}

export function DeliveryPricesButton({
  className,
  children = "أسعار التوصيل",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      <DeliveryPricesModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
