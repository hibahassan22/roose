"use client";

import {
  ArrowLeft,
  Check,
  ChevronDown,
  CreditCard,
  Pencil,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  checkoutCities,
  checkoutOrder,
  checkoutTimeSlots,
  FREE_DELIVERY_THRESHOLD,
} from "@/lib/home-data";

const steps = [
  { id: 0, label: "بيانات المستلم" },
  { id: 1, label: "التوصيل" },
  { id: 2, label: "بيانات المرسل" },
  { id: 3, label: "طريقة الدفع" },
] as const;

type PaymentMethod = "card" | "cod";

const deliveryDates = [
  { id: "d1", label: "الإثنين", day: "٢٠ مايو" },
  { id: "d2", label: "الثلاثاء", day: "٢١ مايو" },
  { id: "d3", label: "الأربعاء", day: "٢٢ مايو" },
  { id: "d4", label: "الخميس", day: "٢٣ مايو" },
  { id: "d5", label: "الجمعة", day: "٢٤ مايو" },
];

export function CheckoutView() {
  const [step, setStep] = useState(0);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [city, setCity] = useState<(typeof checkoutCities)[number]["name"]>(
    "الدمام",
  );
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [notes, setNotes] = useState("");
  const [dateId, setDateId] = useState("d2");
  const [timeSlot, setTimeSlot] =
    useState<(typeof checkoutTimeSlots)[number]>("صباحاً");
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [submitted, setSubmitted] = useState(false);

  const cityFee =
    checkoutCities.find((c) => c.name === city)?.price ?? 25;
  const qualifiesFree =
    checkoutOrder.subtotal + checkoutOrder.addons >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = qualifiesFree ? 0 : cityFee;
  const total = Math.max(
    0,
    checkoutOrder.subtotal +
      checkoutOrder.addons +
      deliveryFee -
      checkoutOrder.discount,
  );

  const canNext = useMemo(() => {
    if (step === 0) {
      return recipientName.trim().length > 1 && recipientPhone.trim().length >= 9;
    }
    if (step === 1) {
      return district.trim() && street.trim() && building.trim();
    }
    if (step === 2) {
      return senderName.trim().length > 1 && senderPhone.trim().length >= 9;
    }
    return true;
  }, [
    step,
    recipientName,
    recipientPhone,
    district,
    street,
    building,
    senderName,
    senderPhone,
  ]);

  const goNext = () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-lg px-5 py-16 text-center sm:px-8">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#E8F6EE]">
          <Check className="size-7 text-[#1F7A4D]" strokeWidth={2.5} />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-ink">
          تم استلام طلبك بنجاح
        </h1>
        <p className="mt-2 text-sm leading-7 text-muted">
          رقم الطلب{" "}
          <span className="font-extrabold text-[#B0005A]" dir="ltr">
            {checkoutOrder.id}
          </span>
          . سنتواصل معك قريباً لتأكيد التوصيل.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#B0005A] px-8 text-sm font-bold text-white transition hover:bg-[#96004c]"
        >
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto w-full px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-extrabold text-[#B0005A] sm:text-4xl">
            إتمام الطلب
          </h1>
          <p className="mt-2 text-sm leading-7 text-muted sm:text-base">
            أكمل بياناتك لاستلام أو إهداء باقتك بكل سهولة
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,24rem)] lg:gap-10">
          {/* Form — start/right in RTL */}
          <div>
            <CheckoutStepper step={step} onStepChange={setStep} />

            <div className="mt-8">
              {step === 0 ? (
                <RecipientStep
                  name={recipientName}
                  phone={recipientPhone}
                  onName={setRecipientName}
                  onPhone={setRecipientPhone}
                />
              ) : null}
              {step === 1 ? (
                <DeliveryStep
                  city={city}
                  cityFee={cityFee}
                  district={district}
                  street={street}
                  building={building}
                  notes={notes}
                  dateId={dateId}
                  timeSlot={timeSlot}
                  onCity={setCity}
                  onDistrict={setDistrict}
                  onStreet={setStreet}
                  onBuilding={setBuilding}
                  onNotes={setNotes}
                  onDate={setDateId}
                  onTime={setTimeSlot}
                />
              ) : null}
              {step === 2 ? (
                <SenderStep
                  name={senderName}
                  phone={senderPhone}
                  message={giftMessage}
                  onName={setSenderName}
                  onPhone={setSenderPhone}
                  onMessage={setGiftMessage}
                />
              ) : null}
              {step === 3 ? (
                <PaymentStep payment={payment} onPayment={setPayment} />
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#FDF2F7] px-6 text-sm font-bold text-ink ring-1 ring-[#E8CFDB] transition hover:bg-white"
                >
                  السابق
                </button>
              ) : null}
              <button
                type="button"
                disabled={!canNext}
                onClick={goNext}
                className="inline-flex h-12 min-w-[10rem] items-center justify-center gap-2 rounded-full bg-[#B0005A] px-8 text-sm font-extrabold text-white shadow-[0_12px_28px_-12px_rgba(176,0,90,0.55)] transition hover:bg-[#96004c] disabled:cursor-not-allowed disabled:opacity-45"
              >
                {step === steps.length - 1 ? "إتمام الطلب" : "التالي"}
                <ArrowLeft className="size-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Summary — end/left in RTL */}
          <aside className="lg:sticky lg:top-24">
            <CheckoutSummary
              deliveryFee={deliveryFee}
              qualifiesFree={qualifiesFree}
              total={total}
              onComplete={() => {
                if (step < steps.length - 1) {
                  if (canNext) setStep((s) => s + 1);
                  return;
                }
                if (canNext) setSubmitted(true);
              }}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

function CheckoutStepper({
  step,
  onStepChange,
}: {
  step: number;
  onStepChange: (n: number) => void;
}) {
  return (
    <nav aria-label="مراحل إتمام الطلب">
      <ol className="flex flex-wrap gap-x-5 gap-y-3 border-b border-[#F3D9E5] pb-1 sm:gap-x-7">
        {steps.map((s) => {
          const active = s.id === step;
          const done = s.id < step;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => {
                  if (s.id <= step) onStepChange(s.id);
                }}
                className={`relative pb-3 text-sm font-bold transition ${
                  active
                    ? "text-[#B0005A]"
                    : done
                      ? "text-muted hover:text-ink"
                      : "text-muted/70"
                }`}
              >
                <span
                  className={`ms-1 inline-flex size-5 items-center justify-center rounded-full text-[0.7rem] font-extrabold ${
                    active
                      ? "bg-[#B0005A]/10 text-[#B0005A]"
                      : "bg-[#F3D9E5] text-muted"
                  }`}
                >
                  {s.id + 1}
                </span>{" "}
                {s.label}
                {active ? (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#B0005A]" />
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "h-12 w-full rounded-2xl bg-[#FDF2F7] px-4 text-sm text-ink outline-none ring-1 ring-[#E8CFDB] transition placeholder:text-muted/55 focus:bg-white focus:ring-2 focus:ring-[#B0005A]/20";

function PhoneField({
  value,
  onChange,
  placeholder = "0501234567",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex h-12 overflow-hidden rounded-2xl bg-[#FDF2F7] ring-1 ring-[#E8CFDB] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#B0005A]/20">
      <span
        className="inline-flex items-center border-s border-[#E8CFDB] px-3 text-sm font-bold text-muted"
        dir="ltr"
      >
        +966
      </span>
      <input
        type="tel"
        inputMode="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-muted/55"
        dir="ltr"
      />
    </div>
  );
}

function RecipientStep({
  name,
  phone,
  onName,
  onPhone,
}: {
  name: string;
  phone: string;
  onName: (v: string) => void;
  onPhone: (v: string) => void;
}) {
  return (
    <div className="max-w-xl space-y-5">
      <Field label="اسم المستلم">
        <input
          type="text"
          value={name}
          onChange={(e) => onName(e.target.value)}
          placeholder="سارة العتيبي"
          className={inputClass}
        />
      </Field>
      <Field label="رقم جوال المستلم">
        <PhoneField value={phone} onChange={onPhone} />
      </Field>
    </div>
  );
}

function DeliveryStep({
  city,
  cityFee,
  district,
  street,
  building,
  notes,
  dateId,
  timeSlot,
  onCity,
  onDistrict,
  onStreet,
  onBuilding,
  onNotes,
  onDate,
  onTime,
}: {
  city: string;
  cityFee: number;
  district: string;
  street: string;
  building: string;
  notes: string;
  dateId: string;
  timeSlot: string;
  onCity: (v: (typeof checkoutCities)[number]["name"]) => void;
  onDistrict: (v: string) => void;
  onStreet: (v: string) => void;
  onBuilding: (v: string) => void;
  onNotes: (v: string) => void;
  onDate: (v: string) => void;
  onTime: (v: (typeof checkoutTimeSlots)[number]) => void;
}) {
  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <Field label="المدينة">
          <div className="relative">
            <select
              value={city}
              onChange={(e) =>
                onCity(e.target.value as (typeof checkoutCities)[number]["name"])
              }
              className={`${inputClass} appearance-none pe-10`}
            >
              {checkoutCities.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 end-3 size-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
          </div>
        </Field>
        <p className="mt-2 text-sm font-bold text-[#B0005A]">
          رسوم التوصيل: {cityFee} ر.س
        </p>
      </div>

      <Field label="الحي">
        <input
          type="text"
          value={district}
          onChange={(e) => onDistrict(e.target.value)}
          placeholder="حي الحزام الأخضر"
          className={inputClass}
        />
      </Field>
      <Field label="الشارع">
        <input
          type="text"
          value={street}
          onChange={(e) => onStreet(e.target.value)}
          placeholder="شارع الملك فهد - قرب جامع الراجحي"
          className={inputClass}
        />
      </Field>
      <Field label="رقم المبنى">
        <input
          type="text"
          value={building}
          onChange={(e) => onBuilding(e.target.value)}
          placeholder="فيلا 14 بجانب مدرسة الأندلس"
          className={inputClass}
        />
      </Field>
      <Field label="ملاحظات خاصة">
        <textarea
          value={notes}
          onChange={(e) => onNotes(e.target.value)}
          rows={3}
          placeholder="مثال: رمز البوابة، تعليمات للسائق، أو أي ملاحظة للتوصيل..."
          className="w-full resize-none rounded-2xl bg-[#FDF2F7] px-4 py-3 text-sm text-ink outline-none ring-1 ring-[#E8CFDB] placeholder:text-muted/55 focus:bg-white focus:ring-2 focus:ring-[#B0005A]/20"
        />
      </Field>

      <div>
        <p className="mb-3 text-sm font-bold text-ink">تاريخ التوصيل</p>
        <ul className="flex gap-2.5 overflow-x-auto pb-1">
          {deliveryDates.map((d) => {
            const active = d.id === dateId;
            return (
              <li key={d.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onDate(d.id)}
                  className={`min-w-[5.5rem] rounded-2xl px-3 py-3 text-center transition ${
                    active
                      ? "bg-[#B0005A] text-white shadow-[0_10px_22px_-10px_rgba(176,0,90,0.55)]"
                      : "bg-[#FDF2F7] text-ink ring-1 ring-[#E8CFDB] hover:bg-white"
                  }`}
                >
                  <span className="block text-xs font-bold opacity-90">
                    {d.label}
                  </span>
                  <span className="mt-1 block text-sm font-extrabold">
                    {d.day}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <p className="mb-3 text-sm font-bold text-ink">فترة التوصيل</p>
        <ul className="flex flex-wrap gap-2.5">
          {checkoutTimeSlots.map((slot) => {
            const active = slot === timeSlot;
            return (
              <li key={slot}>
                <button
                  type="button"
                  onClick={() => onTime(slot)}
                  className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                    active
                      ? "bg-[#B0005A] text-white"
                      : "bg-[#FDF2F7] text-ink ring-1 ring-[#E8CFDB] hover:bg-white"
                  }`}
                >
                  {slot}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="rounded-2xl bg-[#FDF2F7] px-4 py-3 text-sm font-bold text-[#7A1848]">
        نوصّل بسيارات مبرّدة متخصصة للحفاظ على نضارة الورد
      </p>
    </div>
  );
}

function SenderStep({
  name,
  phone,
  message,
  onName,
  onPhone,
  onMessage,
}: {
  name: string;
  phone: string;
  message: string;
  onName: (v: string) => void;
  onPhone: (v: string) => void;
  onMessage: (v: string) => void;
}) {
  return (
    <div className="max-w-xl space-y-5">
      <Field label="اسم المرسل">
        <input
          type="text"
          value={name}
          onChange={(e) => onName(e.target.value)}
          placeholder="عبدالله الأحمد"
          className={inputClass}
        />
      </Field>
      <Field label="رقم جوال المرسل">
        <PhoneField value={phone} onChange={onPhone} />
      </Field>
      <Field label="رسالة كارت الإهداء الفاخر">
        <textarea
          value={message}
          onChange={(e) => onMessage(e.target.value)}
          rows={4}
          placeholder="كل عام وأنت الأجمل دائماً وأبداً"
          className="w-full resize-none rounded-2xl bg-[#FDF2F7] px-4 py-3 text-sm text-ink outline-none ring-1 ring-[#E8CFDB] placeholder:text-muted/55 focus:bg-white focus:ring-2 focus:ring-[#B0005A]/20"
        />
      </Field>
    </div>
  );
}

function PaymentStep({
  payment,
  onPayment,
}: {
  payment: PaymentMethod;
  onPayment: (v: PaymentMethod) => void;
}) {
  const options = [
    {
      id: "card" as const,
      title: "الدفع الإلكتروني",
      desc: "مدى، فيزا، ماستركارد",
      icon: CreditCard,
    },
    {
      id: "cod" as const,
      title: "الدفع عند الاستلام",
      desc: "كاش أو شبكة للمندوب",
      icon: Wallet,
    },
  ];

  return (
    <ul className="grid max-w-xl gap-3 sm:grid-cols-2">
      {options.map((opt) => {
        const active = payment === opt.id;
        const Icon = opt.icon;
        return (
          <li key={opt.id}>
            <button
              type="button"
              onClick={() => onPayment(opt.id)}
              className={`relative flex w-full flex-col items-start gap-3 rounded-[1.35rem] px-4 py-5 text-start transition ${
                active
                  ? "bg-[#FDF2F7] ring-2 ring-[#B0005A]"
                  : "bg-white ring-1 ring-[#E8CFDB] hover:bg-[#FDF2F7]/60"
              }`}
            >
              {active ? (
                <span className="absolute top-3 end-3 inline-flex size-6 items-center justify-center rounded-full bg-[#B0005A] text-white">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
              ) : null}
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-white text-[#B0005A] ring-1 ring-[#E8CFDB]">
                <Icon className="size-5" />
              </span>
              <span className="text-base font-extrabold text-ink">
                {opt.title}
              </span>
              <span className="text-xs font-bold text-muted">{opt.desc}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function CheckoutSummary({
  deliveryFee,
  qualifiesFree,
  total,
  onComplete,
}: {
  deliveryFee: number;
  qualifiesFree: boolean;
  total: number;
  onComplete: () => void;
}) {
  return (
    <div className="rounded-[1.75rem] bg-[#FDF2F7] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-extrabold text-ink">
          ملخص الطلب{" "}
          <span className="text-[#B0005A]" dir="ltr">
            {checkoutOrder.id}
          </span>
        </h2>
        <span className="inline-flex items-center rounded-full bg-[#B0005A] px-3 py-1 text-xs font-bold text-white">
          {checkoutOrder.items.length} منتجات
        </span>
      </div>

      <ul className="mt-5 space-y-3.5">
        {checkoutOrder.items.map((item) => (
          <li key={item.key} className="flex gap-3">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-[#F3D9E5]">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-contain p-1"
                sizes="56px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-extrabold text-ink">{item.name}</p>
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

      <dl className="mt-5 space-y-2.5 border-t border-[#E8CFDB] pt-4 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="font-bold text-muted">المجموع الفرعي</dt>
          <dd className="font-extrabold text-ink">
            {checkoutOrder.subtotal} ر.س
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="font-bold text-muted">الإضافات</dt>
          <dd className="font-extrabold text-ink">{checkoutOrder.addons} ر.س</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="font-bold text-muted">
            رسوم التوصيل ({checkoutOrder.city})
          </dt>
          <dd className="text-end font-extrabold">
            {qualifiesFree || deliveryFee === 0 ? (
              <span className="text-[#1F7A4D]">
                مجاني
                <span className="mt-0.5 block text-[0.65rem] font-bold">
                  (تجاوز {FREE_DELIVERY_THRESHOLD} ر.س)
                </span>
              </span>
            ) : (
              <span className="text-ink">{deliveryFee} ر.س</span>
            )}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="font-bold text-muted">
            الخصم ({checkoutOrder.discountLabel})
          </dt>
          <dd className="font-extrabold text-[#1F7A4D]">
            −{checkoutOrder.discount} ر.س
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E8CFDB] pt-4">
        <span className="text-base font-extrabold text-ink">الإجمالي</span>
        <span className="text-xl font-extrabold text-[#B0005A]">
          {total} ر.س
        </span>
      </div>

      <button
        type="button"
        onClick={onComplete}
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#B0005A] text-sm font-extrabold text-white shadow-[0_12px_28px_-12px_rgba(176,0,90,0.55)] transition hover:bg-[#96004c]"
      >
        إتمام الطلب
        <ArrowLeft className="size-4" strokeWidth={2.5} />
      </button>

      <Link
        href="/cart"
        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 py-2 text-sm font-bold text-[#B0005A] transition hover:text-[#96004c]"
      >
        <Pencil className="size-3.5" />
        تعديل السلة
      </Link>
    </div>
  );
}
