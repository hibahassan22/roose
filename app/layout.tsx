import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "اللؤلؤة روز | Al-louloah Rose",
  description:
    "نبتكر في اللؤلؤة روز تصاميم زهرية تخطف الأنظار مع توصيل مبرّد في الدمام والخبر والظهران والقطيف",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col bg-brand-mist font-sans text-ink"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
