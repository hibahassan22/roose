import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { categories, quickLinks, shopTags } from "@/lib/home-data";
import { BrandMark } from "./brand-mark";

const tagHref: Record<string, string> = Object.fromEntries([
  ...categories.map((c) => [c.name, `/category/${c.id}`] as const),
  ["قسم الجملة", "/category/wholesale"],
  ["عطور", "/category/bouquets"],
  ["تغريسات", "/category/wraps"],
]);

const socials = [
  { label: "إنستغرام", src: "/images/icons/social-instagram.png" },
  { label: "واتساب", src: "/images/icons/social-whatsapp.png" },
  { label: "فيسبوك", src: "/images/icons/social-facebook.png" },
  { label: "سناب شات", src: "/images/icons/social-snapchat.png" },
];

export function SiteFooter() {
  return (
    <footer id="track" className="mt-auto bg-[#FDF2F7]">
      <div className="w-full px-5 py-12 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid w-full gap-10 lg:grid-cols-4 lg:gap-10 xl:gap-12">
          {/* Brand — far right in RTL */}
          <div className="min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-[#B0005A]"
            >
              <BrandMark className="size-10" color="var(--brand)" />
              <span className="text-xl font-extrabold sm:text-2xl">
                اللؤلؤة روز
              </span>
            </Link>
            <p className="mt-4 w-full text-base leading-8 text-[#6B5A63]">
              متجر فاخر لتصميم وتنسيق الزهور الطبيعية والهدايا الاستثنائية لجميع
              مناسباتك في المنطقة الشرقية بأعلى معايير الجودة والذوق الرفيع.
            </p>
            <div
              dir="ltr"
              className="mt-5 flex items-center justify-center gap-2.5"
            >
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="inline-flex size-8 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_-4px_rgba(176,0,90,0.25)] transition hover:-translate-y-0.5"
                >
                  <Image
                    src={social.src}
                    alt=""
                    width={16}
                    height={16}
                    className="size-3.5 object-contain"
                    aria-hidden
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="min-w-0">
            <h2 className="text-base font-extrabold text-[#B0005A] sm:text-lg">
              تسوق
            </h2>
            <p className="mt-2 text-sm leading-7 text-[#6B5A63]">
              (لو عندك مناسبات: عيد ميلاد.. مواليد جديد.. تخرج ...)
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {shopTags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={tagHref[tag] ?? "#categories"}
                    className="inline-flex rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-[#6B5A63] ring-1 ring-[#E8CFDB] transition hover:text-[#B0005A]"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="min-w-0">
            <h2 className="text-base font-extrabold text-[#B0005A] sm:text-lg">
              روابط سريعه
            </h2>
            <ul className="mt-4 space-y-3 text-base text-[#6B5A63]">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    href={
                      link === "السلة"
                        ? "/cart"
                        : link === "المفضلة"
                          ? "/favorites"
                          : link === "تتبع طلبك"
                            ? "/track"
                            : link === "الأقسام"
                              ? "/category/bouquets"
                              : "#"
                    }
                    className="transition hover:text-[#B0005A]"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="min-w-0">
            <h2 className="text-base font-extrabold text-[#B0005A] sm:text-lg">
              تواصل معنا
            </h2>
            <ul className="mt-4 space-y-3.5 text-base text-[#6B5A63]">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-1 size-5 text-[#B0005A]" aria-hidden />
                <span dir="ltr">info@yourdomain.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-1 size-5 text-[#B0005A]" aria-hidden />
                <span dir="ltr">+966 5X XXX XXXX</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-1 size-5 text-[#B0005A]" aria-hidden />
                <span>الدمام، المنطقة الشرقية</span>
              </li>
            </ul>
            <div className="mt-4 text-sm leading-7 text-[#6B5A63]">
              <p>السبت - الخميس: 9:00 ص - 11:00 م</p>
              <p>الجمعة: 2:00 م - 11:00 م</p>
            </div>
            <Image
              src="/images/icons/flower-mark.png"
              alt=""
              width={36}
              height={36}
              className="mt-5 size-9 object-contain"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div className="bg-[#B0005A] py-3.5 text-center text-sm font-medium text-white sm:text-base">
        © ٢٠٢٦ اللؤلؤة روز. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
