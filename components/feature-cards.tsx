"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { DeliveryPricesButton } from "./delivery-prices-modal";

const cards = [
  {
    id: "delivery",
    title: "نوصل لك لحد باب البيت",
    body: (
      <>
        توصيل مجاني للطلبات فوق{" "}
        <span className="font-extrabold text-[#B0005A]">٣٥٠ ريال</span>
      </>
    ),
    cta: "أسعار التوصيل",
    tone: "delivery" as const,
    image: "/images/illust-delivery.png",
  },
  {
    id: "message",
    title: "رسالتك توصل مع الباقة",
    body: "اكتب إهداءك وهنكتبه على بطاقة مرفقة بالباقة، وتقدر تخفي اسمك.",
    image: "/images/illust-message.png",
  },
  {
    id: "custom",
    title: "بتريد باقة مخصوصة؟",
    body: "قولنا الميزانية والألوان والمناسبة، وفريقنا يجهزها لك على واتساب",
    cta: "تواصل واتساب",
    href: "https://wa.me/",
    tone: "whatsapp" as const,
    image: "/images/illust-custom.png",
  },
];

export function FeatureCards() {
  return (
    <section className="mx-auto w-full px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
      <ul className="mx-auto grid max-w-[1100px] gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {cards.map((card, index) => (
          <motion.li
            key={card.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
            className="relative mx-auto w-full max-w-[22rem] overflow-hidden rounded-[1.75rem] bg-[#F3D9E5] sm:max-w-none sm:rounded-[2rem]"
          >
            <div className="relative flex min-h-[15.5rem] flex-col sm:min-h-[16.5rem]">
              {/* Text */}
              <div className="relative z-10 flex flex-1 flex-col p-5 pe-[46%] sm:p-6 sm:pe-[44%]">
                <h3 className="text-base leading-8 font-extrabold text-ink sm:text-[1.05rem] sm:leading-8">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-ink/75 sm:text-[0.9rem] sm:leading-7">
                  {card.body}
                </p>
                {card.cta ? (
                  <div className="mt-auto pt-4">
                    {card.tone === "whatsapp" ? (
                      <a
                        href={card.href}
                        className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#128C7E] px-5 text-sm font-bold text-white transition hover:brightness-110"
                      >
                        <WhatsAppIcon className="size-4" />
                        {card.cta}
                      </a>
                    ) : card.tone === "delivery" ? (
                      <DeliveryPricesButton className="inline-flex h-10 items-center gap-1 rounded-full bg-[#B0005A] px-5 text-sm font-bold text-white transition hover:bg-[#96004c]">
                        {card.cta}
                        <ChevronLeft className="size-4" strokeWidth={2.5} />
                      </DeliveryPricesButton>
                    ) : null}
                  </div>
                ) : null}
              </div>

              {/* Illustration — left bottom, full scooter/envelope visible */}
              <div className="pointer-events-none absolute inset-y-3 end-1 w-[48%] sm:end-2 sm:w-[46%]">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className="object-contain object-left-bottom"
                  sizes="180px"
                  priority={card.id === "delivery"}
                />
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.7 7.4L4 20l1.1-3.7a8.5 8.5 0 1 1 15.4-4.7Zm-8.5 6.7a6.7 6.7 0 0 0 3.6-1l.3-.2 2.1.6-.6-2 .2-.3a6.7 6.7 0 1 0-5.6 2.9Zm3.7-4.5c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.6.8-.1.1-.2.2-.4.1a5.5 5.5 0 0 1-1.6-1 6 6 0 0 1-1.1-1.4c-.1-.2 0-.3.1-.4l.3-.4.1-.2c0-.1 0-.2-.1-.3l-.6-1.5c-.2-.4-.3-.3-.5-.3h-.4c-.1 0-.3.1-.5.3-.2.2-.6.6-.6 1.4s.6 1.6.7 1.7c.1.2 1.2 1.9 3 2.6 1.8.7 1.8.5 2.1.4.3 0 1.1-.4 1.2-.9.2-.4.2-.8.1-.9 0-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}
