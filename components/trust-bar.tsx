import {
  IconClock,
  IconFlower,
  IconStar,
  IconVerified,
} from "./site-icons";

const items = [
  {
    title: "زهور طازجة يومياً",
    icon: IconFlower,
  },
  {
    title: "موثق في معروف",
    icon: IconVerified,
  },
  {
    title: "٤.٩/٥ تقييم الزبائن",
    icon: IconStar,
  },
  {
    title: "توصيل خلال ساعتين",
    icon: IconClock,
  },
];

export function TrustBar() {
  return (
    <section className="pointer-events-none absolute inset-x-0 top-0 z-30 w-full -translate-y-1/2 px-5 sm:px-8 lg:px-12">
      <div className="glass-panel pointer-events-auto mx-auto grid w-full grid-cols-2 rounded-[2rem] shadow-[0_12px_32px_-16px_rgba(176,0,90,0.18)] sm:grid-cols-4 sm:rounded-full">
        {items.map(({ title, icon: Icon }, index) => (
          <div
            key={title}
            className={`flex items-center justify-center gap-3 px-4 py-5 sm:px-5 sm:py-6 lg:gap-3.5 lg:py-7 ${
              index % 2 === 1 ? "border-s border-[#F3D9E5]/70" : ""
            } ${index > 1 ? "border-t border-[#F3D9E5]/70 sm:border-t-0" : ""} ${
              index > 0 ? "sm:border-s sm:border-[#F3D9E5]/70" : ""
            }`}
          >
            <Icon className="size-6 shrink-0 sm:size-7" />
            <span className="text-sm font-bold text-ink sm:text-base lg:text-[1.05rem]">
              {title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
