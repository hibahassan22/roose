import Image from "next/image";

export function BrandMark({
  className = "size-10",
  color: _color,
}: {
  className?: string;
  /** Kept for callers; logo asset has fixed brand colors */
  color?: string;
}) {
  void _color;
  return (
    <Image
      src="/images/logo-tulip.png"
      alt=""
      width={64}
      height={56}
      className={`object-contain ${className}`}
      aria-hidden
    />
  );
}
