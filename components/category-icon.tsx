import Image from "next/image";

export type CategoryIconName =
  | "bouquet"
  | "vase"
  | "wreath"
  | "wholesale"
  | "balloon"
  | "letter"
  | "wrap"
  | "candle"
  | "ribbon";

const icons: Record<CategoryIconName, string> = {
  bouquet: "/images/categories/bouquet.png",
  vase: "/images/categories/vase.png",
  wreath: "/images/categories/wreath.png",
  wholesale: "/images/categories/wholesale.png",
  balloon: "/images/categories/balloon.png",
  letter: "/images/categories/letter.png",
  wrap: "/images/categories/wrap.png",
  candle: "/images/categories/candle.png",
  ribbon: "/images/categories/ribbon.png",
};

export function CategoryIcon({ name }: { name: CategoryIconName }) {
  return (
    <Image
      src={icons[name]}
      alt=""
      width={40}
      height={40}
      className="pointer-events-none size-10 object-contain"
      aria-hidden
    />
  );
}
