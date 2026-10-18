"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Wholesale() {
  return (
    <section className="bg-[#FDF2F7] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid max-w-[1200px] overflow-hidden rounded-[1.75rem] lg:grid-cols-2 lg:rounded-[2rem]"
      >
        {/* Text block — right in RTL */}
        <div className="flex flex-col justify-center bg-[#B0005A] px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <h2 className="text-2xl font-extrabold sm:text-[2rem]">
            تشتري بالجملة؟
          </h2>
          <p className="mt-3 max-w-md text-sm leading-8 text-white/92 sm:text-[0.95rem] sm:leading-8">
            كل ما تحتاجه لتنسيقاتك من ورد وأغصان بالجملة، بجودة طازجة وأسعار تناسب
            الكميات الكبيرة.
          </p>
          <Link
            href="#wholesale"
            className="mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-white px-5 text-sm font-extrabold text-[#B0005A] transition hover:bg-[#FDF2F7]"
          >
            تصفح قسم الجملة
            <Image
              src="/images/icons/flower-mark.png"
              alt=""
              width={20}
              height={20}
              className="size-5 object-contain"
              aria-hidden
            />
          </Link>
        </div>

        {/* Photo — left in RTL — natural aspect, no stretch */}
        <div className="relative order-first min-h-[240px] lg:order-last lg:min-h-[320px]">
          <Image
            src="/images/wholesale.jpg"
            alt="ورشة تنسيق الزهور في اللؤلؤة روز"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 600px"
            quality={90}
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
