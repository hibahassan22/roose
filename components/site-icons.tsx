import Image from "next/image";

type IconProps = {
  className?: string;
};

function PngIcon({
  src,
  className = "size-5",
}: {
  src: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={80}
      height={80}
      className={`object-contain ${className}`}
      aria-hidden
    />
  );
}

export function IconCart({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3.5 5h1.7l1.2 9.2a1.6 1.6 0 0 0 1.6 1.4h8.7a1.6 1.6 0 0 0 1.55-1.2L19.5 8.2H7.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.2" cy="19.2" r="1.35" fill="currentColor" />
      <circle cx="16.3" cy="19.2" r="1.35" fill="currentColor" />
    </svg>
  );
}

export function IconHeart({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 19.4S4.8 14.6 4.8 9.7A3.9 3.9 0 0 1 12 7.6a3.9 3.9 0 0 1 7.2 2.1c0 4.9-7.2 9.7-7.2 9.7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconUser({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5.2 19.2c1.4-3.2 3.7-4.8 6.8-4.8s5.4 1.6 6.8 4.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconMenu({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 7h14M5 12h14M5 17h9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="16.2"
        y="15.4"
        width="2.8"
        height="3.4"
        rx="0.4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function IconTruck({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3.5 7.5h9.8v8.3H3.5z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M13.3 10.2h4.1l2.6 3v2.6h-6.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="7.2" cy="17.8" r="1.45" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.4" cy="17.8" r="1.45" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconFlower({ className = "size-5" }: IconProps) {
  return <PngIcon src="/images/icons/flower.png" className={className} />;
}

export function IconVerified({ className = "size-5" }: IconProps) {
  return <PngIcon src="/images/icons/verified.png" className={className} />;
}

export function IconStar({ className = "size-5" }: IconProps) {
  return <PngIcon src="/images/icons/star.png" className={className} />;
}

export function IconClock({ className = "size-5" }: IconProps) {
  return <PngIcon src="/images/icons/clock.png" className={className} />;
}

export function ScooterMark({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="6" cy="16.5" r="2.1" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="17.2" cy="16.5" r="2.35" stroke="currentColor" strokeWidth="1.65" />
      <path
        d="M8.2 16.5h6.4M14.2 16.5 15.6 11h2.3M9.4 11.2h4.4M15.5 11.1 16.7 7.4h2.2"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m12 18.6.85 1.7M11.15 20.3 12 18.6l.85 1.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
