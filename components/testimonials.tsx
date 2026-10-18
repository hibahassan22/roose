"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { testimonials } from "@/lib/home-data";

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#F3D9E5] py-14 sm:py-16 lg:py-20">
      {/* Soft hibiscus frame — large + faded like the design */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/decor-hibiscus.png"
          alt=""
          width={420}
          height={520}
          className="absolute -top-8 -start-16 w-[14rem] opacity-55 blur-[0.3px] sm:w-[18rem] lg:-start-10 lg:w-[22rem]"
        />
        <Image
          src="/images/decor-hibiscus.png"
          alt=""
          width={420}
          height={520}
          className="absolute -top-6 -end-20 w-[13rem] scale-x-[-1] opacity-55 blur-[0.3px] sm:w-[17rem] lg:-end-8 lg:w-[21rem]"
        />
        <Image
          src="/images/decor-hibiscus.png"
          alt=""
          width={360}
          height={440}
          className="absolute -bottom-10 start-[-2rem] w-[12rem] rotate-[-8deg] opacity-40 sm:w-[15rem] lg:start-4 lg:w-[18rem]"
        />
        <Image
          src="/images/decor-hibiscus.png"
          alt=""
          width={360}
          height={440}
          className="absolute -bottom-8 -end-10 w-[11rem] scale-x-[-1] rotate-[6deg] opacity-40 sm:w-[14rem] lg:end-2 lg:w-[17rem]"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="text-sm font-bold tracking-wide text-[#B0005A]">
            تجارب حقيقية
          </p>
          <h2 className="mt-2 flex flex-wrap items-center justify-center gap-2 text-[1.65rem] font-extrabold text-[#3A1F2B] sm:gap-2.5 sm:text-3xl">
            <span>ماذا يقول عملاؤنا في</span>
            <Image
              src="/images/icons/flower-mark.png"
              alt=""
              width={40}
              height={40}
              className="inline-block size-10 object-contain"
              aria-hidden
            />
            <span>؟</span>
          </h2>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6">
          {testimonials.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.45 }}
              className="flex flex-col rounded-[1.35rem] bg-white px-5 pt-5 pb-5 shadow-[0_10px_28px_-18px_rgba(42,26,34,0.35)] sm:rounded-[1.5rem] sm:px-6 sm:pt-6 sm:pb-5"
            >
              <Image
                src="/images/icons/quote.png"
                alt=""
                width={26}
                height={26}
                className="size-6 object-contain sm:size-7"
                aria-hidden
              />
              <p className="mt-3 flex-1 text-center text-[0.9rem] leading-8 text-[#4A3340] sm:text-[0.95rem] sm:leading-8">
                {item.text}
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-[#F0DCE6] pt-4">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[#F3D9E5] ring-2 ring-white">
                  <Image
                    src={item.avatar}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0 text-start">
                  <p className="text-sm font-extrabold text-[#2A1A22]">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[#8A7380]">{item.place}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
