"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/home-data";
import { CategoryIcon } from "./category-icon";

export function Categories() {
  return (
    <section id="categories" className="mx-auto w-full px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
      <SectionTitle>تصفح أقسام البوتيك</SectionTitle>

      <ul className="mt-8 flex gap-5 overflow-x-auto pb-2 sm:grid sm:grid-cols-9 sm:gap-3 sm:overflow-visible">
        {categories.map((category, index) => (
          <motion.li
            key={category.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04, duration: 0.4 }}
            className="shrink-0"
          >
            <Link
              href={`#${category.id}`}
              className="group flex w-[5.25rem] flex-col items-center gap-2.5 text-center sm:w-auto"
            >
              <span className="inline-flex size-[4.75rem] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f7e9f0] transition group-hover:bg-white group-hover:shadow-[0_8px_20px_-10px_rgba(155,16,72,0.35)] sm:size-20">
                <CategoryIcon name={category.icon} />
              </span>
              <span className="text-[0.78rem] font-bold leading-tight text-ink">
                {category.name}
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export function SectionTitle({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="flex items-center gap-2 text-xl font-extrabold text-ink sm:text-2xl">
        {children}
        <Image
          src="/images/icons/tulip.png"
          alt=""
          width={24}
          height={24}
          className="size-6 object-contain"
          aria-hidden
        />
      </h2>
      {action}
    </div>
  );
}
