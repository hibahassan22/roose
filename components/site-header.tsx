"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./brand-mark";
import { IconCart, IconHeart, IconMenu, IconTruck, IconUser } from "./site-icons";

export function SiteHeader({ cartBadge = "3" }: { cartBadge?: string }) {
  const pathname = usePathname();
  const onFavorites = pathname === "/favorites";
  const onCart = pathname === "/cart";
  const onTrack = pathname === "/track";

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Keep header clear so bouquet can show through the glassy search */}
      <div className="border-b border-[#F3D9E5]/40 bg-[#FDF2F733] backdrop-blur-md">
        <div className="mx-auto flex w-full items-center gap-2 px-5 py-3 sm:gap-3 sm:px-8 sm:py-4 lg:px-12">
          <Link href="/" className="flex shrink-0 items-center gap-2 text-brand">
            <BrandMark className="h-9 w-auto sm:h-10" />
            <span className="text-lg font-extrabold tracking-tight sm:text-xl">
              اللؤلؤة روز
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <IconButton label="القائمة">
              <IconMenu className="size-5" />
            </IconButton>
            <IconButton label="حسابي">
              <IconUser className="size-5" />
            </IconButton>
            <IconButton
              label="المفضلة"
              href="/favorites"
              active={onFavorites}
            >
              <IconHeart className="size-5" />
            </IconButton>
            <IconButton
              label="سلة التسوق"
              badge={onFavorites ? "0" : cartBadge}
              href="/cart"
              active={onCart}
            >
              <IconCart className="size-5" />
            </IconButton>
          </div>

          <form
            className="relative mx-2 hidden min-w-0 flex-1 md:block"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="site-search" className="sr-only">
              ابحث هنا
            </label>
            <input
              id="site-search"
              type="search"
              placeholder="ابحث هنا..."
              className="glass-input h-11 w-full rounded-full pr-5 pl-11 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:ring-2 focus:ring-brand/10"
            />
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
          </form>

          <Link
            href="/track"
            aria-current={onTrack ? "page" : undefined}
            className={`ms-auto hidden shrink-0 items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-bold text-brand transition sm:inline-flex lg:text-sm ${
              onTrack
                ? "bg-white/70 shadow-[0_4px_12px_-6px_rgba(176,0,90,0.35)]"
                : "hover:bg-white/35"
            }`}
          >
            <IconTruck className="size-5" />
            تتبع الطلب
          </Link>
        </div>
      </div>
    </header>
  );
}

function IconButton({
  label,
  badge,
  href,
  active,
  children,
}: {
  label: string;
  badge?: string;
  href?: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  const className = `relative inline-flex size-10 items-center justify-center rounded-full text-brand transition ${
    active ? "bg-white/70 shadow-[0_4px_12px_-6px_rgba(176,0,90,0.35)]" : "hover:bg-white/35"
  }`;

  const content = (
    <>
      {children}
      {badge != null ? (
        <span className="absolute top-0.5 left-0.5 flex size-4 items-center justify-center rounded-full bg-brand-hot text-[0.6rem] font-bold text-white">
          {badge}
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} aria-label={label} className={className} aria-current={active ? "page" : undefined}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" aria-label={label} className={className}>
      {content}
    </button>
  );
}
