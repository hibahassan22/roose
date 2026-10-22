"use client";

import { X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export function Modal({
  open,
  onClose,
  title,
  titleIcon,
  children,
  footer,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  titleIcon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="إغلاق الخلفية"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative z-10 flex max-h-[min(92vh,720px)] w-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_24px_60px_-20px_rgba(42,26,34,0.35)] ${
          wide ? "max-w-[34rem]" : "max-w-[28rem]"
        }`}
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[#EDE4E9] px-5 py-4 sm:px-6">
          <h2
            id="modal-title"
            className="flex items-center gap-2 text-base font-extrabold text-[#7A1848] sm:text-lg"
          >
            {title}
            {titleIcon}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="inline-flex size-9 items-center justify-center rounded-full text-ink transition hover:bg-[#FDF2F7]"
          >
            <X className="size-5" strokeWidth={2} />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {children}
        </div>

        {footer ? (
          <footer className="shrink-0 border-t border-[#EDE4E9] px-5 py-4 sm:px-6">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
