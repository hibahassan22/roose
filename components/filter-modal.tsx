"use client";

import { Modal } from "./ui/modal";

export type PriceRange = "lt50" | "50-100" | "100-200" | "gt200" | null;

export type ProductFilters = {
  price: PriceRange;
  occasion: string | null;
  flower: string | null;
  color: string | null;
};

export const emptyFilters: ProductFilters = {
  price: null,
  occasion: null,
  flower: null,
  color: null,
};

const priceOptions: { id: NonNullable<PriceRange>; label: string }[] = [
  { id: "lt50", label: "أقل من ٥٠" },
  { id: "50-100", label: "٥٠ - ١٠٠" },
  { id: "100-200", label: "١٠٠ - ٢٠٠" },
  { id: "gt200", label: "أكثر من ٢٠٠" },
];

const occasions = [
  "عيد ميلاد",
  "مولود جديد",
  "تخرج",
  "خطوبة و زواج",
  "شكر",
] as const;

const flowers = ["جوري", "بيبي روز", "جربيرا", "توليب", "مكس"] as const;

const colors: { id: string; hex: string }[] = [
  { id: "red", hex: "#E11D2E" },
  { id: "pink", hex: "#EC4899" },
  { id: "blue", hex: "#3B82F6" },
  { id: "magenta", hex: "#B0005A" },
  { id: "green", hex: "#22C55E" },
  { id: "blush", hex: "#F9A8D4" },
  { id: "grey", hex: "#6B7280" },
];

export function FilterModal({
  open,
  onClose,
  value,
  onChange,
  onApply,
  onClear,
}: {
  open: boolean;
  onClose: () => void;
  value: ProductFilters;
  onChange: (next: ProductFilters) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  const toggle = <K extends keyof ProductFilters>(
    key: K,
    next: ProductFilters[K],
  ) => {
    onChange({
      ...value,
      [key]: value[key] === next ? null : next,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="الفلتر"
      footer={
        <div className="grid grid-cols-2 gap-3">
          {/* RTL: first cell = right → Apply, second = left → Clear */}
          <button
            type="button"
            onClick={onApply}
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#B0005A] text-sm font-extrabold text-white transition hover:bg-[#96004c]"
          >
            تطبيق الفلاتر
          </button>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#B0005A] bg-white text-sm font-extrabold text-[#B0005A] transition hover:bg-[#FDF2F7]"
          >
            مسح الكل
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <FilterSection title="السعر">
          <div className="flex flex-wrap gap-2">
            {priceOptions.map((opt) => (
              <Chip
                key={opt.id}
                selected={value.price === opt.id}
                onClick={() => toggle("price", opt.id)}
              >
                {opt.label}
              </Chip>
            ))}
          </div>
        </FilterSection>

        <Divider />

        <FilterSection title="المناسبة">
          <div className="flex flex-wrap gap-2">
            {occasions.map((item) => (
              <Chip
                key={item}
                selected={value.occasion === item}
                onClick={() => toggle("occasion", item)}
              >
                {item}
              </Chip>
            ))}
          </div>
        </FilterSection>

        <Divider />

        <FilterSection title="نوع الورد">
          <div className="flex flex-wrap gap-2">
            {flowers.map((item) => (
              <Chip
                key={item}
                selected={value.flower === item}
                onClick={() => toggle("flower", item)}
              >
                {item}
              </Chip>
            ))}
          </div>
        </FilterSection>

        <Divider />

        <FilterSection title="اللون">
          <div className="flex flex-wrap gap-3">
            {colors.map((c) => {
              const selected = value.color === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-label={c.id}
                  aria-pressed={selected}
                  onClick={() => toggle("color", c.id)}
                  className={`size-9 rounded-full transition ${
                    selected
                      ? "ring-2 ring-[#B0005A] ring-offset-2"
                      : "ring-1 ring-black/10"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              );
            })}
          </div>
        </FilterSection>
      </div>
    </Modal>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-3 text-sm font-extrabold text-ink">{title}</h3>
      {children}
    </section>
  );
}

function Divider() {
  return <div className="h-px w-full bg-[#EDE4E9]" aria-hidden />;
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-bold transition ${
        selected
          ? "bg-[#B0005A] text-white"
          : "bg-white text-ink ring-1 ring-[#D9CDD3] hover:ring-[#B0005A]/40"
      }`}
    >
      {children}
    </button>
  );
}

export function matchesPriceFilter(price: number, range: PriceRange): boolean {
  if (range == null) return true;
  if (range === "lt50") return price < 50;
  if (range === "50-100") return price >= 50 && price <= 100;
  if (range === "100-200") return price >= 100 && price <= 200;
  return price > 200;
}

export function priceFilterLabel(range: PriceRange): string | null {
  if (!range) return null;
  return priceOptions.find((o) => o.id === range)?.label ?? null;
}
