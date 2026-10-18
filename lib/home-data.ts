export type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
};

export const categories = [
  { id: "bouquets", name: "باقات", icon: "bouquet" },
  { id: "vases", name: "فازات", icon: "vase" },
  { id: "contracts", name: "عقود", icon: "wreath" },
  { id: "wholesale", name: "قسم جملة", icon: "wholesale" },
  { id: "balloons", name: "بوالين", icon: "balloon" },
  { id: "letters", name: "حروف", icon: "letter" },
  { id: "wraps", name: "تغاليف", icon: "wrap" },
  { id: "candles", name: "شموع", icon: "candle" },
  { id: "ribbons", name: "شرايط", icon: "ribbon" },
] as const;

export const bestSellers: Product[] = [
  {
    id: "1",
    name: "باقة باتشي",
    desc: "٢٠ غصن بيبي مع شوكولاتة باتشي",
    price: 320,
    image: "/images/prod-d.png",
  },
  {
    id: "2",
    name: "فازه كريز",
    desc: "فازة أنيقة بورود وردية ناعمة",
    price: 280,
    image: "/images/prod-b.png",
  },
  {
    id: "3",
    name: "باقة الحب",
    desc: "١٨ غصن بيبي روز وكازا ٢ غصن",
    price: 250,
    image: "/images/prod-c.png",
  },
  {
    id: "4",
    name: "باقة الخوخ",
    desc: "مزيج خوخي وأبيض بتغليف حريري",
    price: 220,
    image: "/images/prod-a.png",
  },
];

export const moreProducts: Product[] = [
  {
    id: "5",
    name: "باقة اللؤلؤة",
    desc: "١٢ غصن بيبي روز وكازا",
    price: 195,
    image: "/images/product-4.png",
  },
  {
    id: "6",
    name: "باقة الرقة",
    desc: "تنسيق ناعم بألوان باستيل",
    price: 210,
    image: "/images/product-2.png",
  },
  {
    id: "7",
    name: "باقة الورد الملكي",
    desc: "ورود حمراء مع بطاقة حب",
    price: 260,
    image: "/images/product-3.png",
  },
  {
    id: "8",
    name: "باقة الصباح",
    desc: "١٨ غصن بيبي وكازا ٢ غصن",
    price: 180,
    image: "/images/product-1.png",
  },
];

export const shopTags = [
  "باقات",
  "فازات",
  "عطور",
  "قسم الجملة",
  "بوالين",
  "حروف",
  "تغاليف",
  "شموع",
  "شرايط",
  "تغريسات",
];

export const quickLinks = [
  "الأقسام",
  "السلة",
  "المفضلة",
  "التوصيل",
  "تتبع طلبك",
  "أسعار التوصيل",
  "باقة مخصصة",
];

export const testimonials = [
  {
    id: "1",
    name: "سلمان الدوسري",
    place: "الخبر • طلب موثق",
    text: "طلبت باقة الرومانسية كود 001 لزوجتي في الخبر، التوصيل كان سريع جدًا والورود فريش كأنها مقطوفة حالاً. شكرًا أفريق اللؤلؤة روز على التعامل الراقي.",
    avatar: "/images/prod-a.png",
  },
  {
    id: "2",
    name: "منيرة القحطاني",
    place: "الدمام • طلب موثق",
    text: "باقة السلام مع شوكولاتة باتشي كانت هدية تخرج مثالية لأختي. التنسيق أجمل من الصور بمراحل والكرت المكتوب بخط اليد أعطاها فخامة مضاعفة.",
    avatar: "/images/prod-b.png",
  },
  {
    id: "3",
    name: "عبدالله آل خليل",
    place: "القطيف • طلب موثق",
    text: "تواصلت معهم عبر الواتساب لاختيار باقة الزفاف، نسقوها نظّف ساعة وأرسلولي صورتها قبل الشحن للقطيف، متجر محترف بكل المقاييس.",
    avatar: "/images/prod-c.png",
  },
];
