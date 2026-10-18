"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScooterMark } from "./site-icons";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-brand-mist">
      {/* Soft full-bleed wash — no pink halo behind bouquet */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fdf2f7_0%,#fce8f1_48%,#fdf2f7_100%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid min-h-[min(86vh,760px)] w-full items-end gap-0 px-5 pt-[5.25rem] sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-0 lg:px-12 lg:pt-[5.5rem] lg:pb-4">
        {/* Copy — closer to the bouquet */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 order-2 max-w-xl pb-6 ps-2 sm:ps-3 lg:order-1 lg:max-w-none lg:justify-self-stretch lg:self-center lg:pb-8 lg:ps-6 lg:pe-2 xl:ps-8"
        >
          {/* Decor branch watermark behind the copy */}
          <div
            className="pointer-events-none absolute -inset-x-4 -top-10 bottom-[-18%] -z-10 opacity-100 sm:-inset-x-10 lg:-start-8 lg:-end-2"
            aria-hidden
          >
            <Image
              src="/images/decor-branch.png"
              alt=""
              fill
              className="scale-125 object-contain object-[70%_42%] contrast-125 saturate-150 brightness-[0.92] mix-blend-multiply lg:scale-[1.35] lg:object-[55%_40%]"
              sizes="(max-width: 1024px) 90vw, 52vw"
              priority
            />
          </div>

          <h1 className="text-[2.15rem] leading-[1.3] font-extrabold sm:text-[2.65rem] lg:text-[3.1rem] xl:text-[3.45rem]">
            <span className="block whitespace-nowrap text-ink">
              لحظاتك المميزة تستحق
            </span>
            <span className="block text-[#B0005A]">أرقى الزهور</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-8 text-ink/80 sm:text-base lg:max-w-lg lg:text-[1.05rem]">
            نبتكر في «اللؤلؤة روز» تصاميم زهرية تخطف الأنظار، مصنوعة بشغف وتُوصل
            بتغليف مبرّد يحفظ نضارتها إلى الدمام والخبر والظهران والقطيف.
          </p>
          <Link
            href="#products"
            className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[#B0005A] px-7 text-sm font-bold text-white shadow-[0_12px_32px_-10px_rgba(176,0,90,0.55)] transition hover:bg-[#96004c]"
          >
            تسوق الكتالوج الآن
            <ChevronLeft className="size-4" strokeWidth={2.5} />
          </Link>
          <p className="mt-4 flex items-center gap-2 text-sm font-bold text-ink/85">
            <ScooterMark className="size-5 shrink-0" />
            <span>
              توصيل مجاني للطلبات فوق{" "}
              <span className="text-ok">٣٥٠ ريال</span>
            </span>
          </p>
        </motion.div>

        {/* Bouquet — large, tip peeks behind glassy search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="relative order-1 -mx-2 flex min-h-[380px] items-end justify-center sm:-mx-3 sm:min-h-[480px] lg:order-2 lg:-me-6 lg:ms-[-2rem] lg:min-h-[680px] lg:justify-start lg:self-stretch"
        >
          <div className="relative z-10 aspect-square w-[min(96vw,580px)] sm:w-[620px] lg:absolute lg:-top-[5.5rem] lg:bottom-2 lg:start-[-2rem] lg:w-[min(60vw,820px)] xl:-top-[6.25rem] xl:start-[-2.5rem] xl:w-[min(58vw,900px)]">
            <Image
              src="/images/hero-bouquet-clean.png"
              alt="باقة ورد فاخرة من اللؤلؤة روز"
              fill
              priority
              className="object-contain object-bottom drop-shadow-[0_28px_48px_rgba(176,0,90,0.18)]"
              sizes="(max-width: 1024px) 96vw, 58vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
