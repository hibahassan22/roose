"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { bestSellers, moreProducts } from "@/lib/home-data";
import { SectionTitle } from "./categories";
import { ProductCard } from "./product-card";

export function ProductSection() {
  return (
    <section id="products" className="mx-auto w-full px-5 pb-6 sm:px-8 lg:px-12">
      <SectionTitle
        action={
          <Link
            href="#"
            className="inline-flex items-center gap-1 text-sm font-bold text-brand transition hover:text-brand-deep"
          >
            رؤية المزيد
            <ArrowLeft className="size-4" />
          </Link>
        }
      >
        الأكثر طلباً ومبيعاً
      </SectionTitle>

      <ProductGrid products={bestSellers} />

      <div className="mt-10">
        <ProductGrid products={moreProducts} />
      </div>
    </section>
  );
}

function ProductGrid({
  products,
}: {
  products: typeof bestSellers;
}) {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
      {products.map((product, index) => (
        <motion.li
          key={product.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
        >
          <ProductCard product={product} />
        </motion.li>
      ))}
    </ul>
  );
}
