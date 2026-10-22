export type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
};

export type ProductAddon = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type ProductDetail = Product & {
  longDesc: string;
  badges: string[];
  components: string[];
  gallery: string[];
  details: string;
  care: string;
  policy: string;
  bestSeller?: boolean;
  inStock?: boolean;
};

export type CategoryId =
  | "bouquets"
  | "vases"
  | "contracts"
  | "wholesale"
  | "balloons"
  | "letters"
  | "wraps"
  | "candles"
  | "ribbons";

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

export const categoryMeta: Record<
  CategoryId,
  { title: string; description: string; total: number }
> = {
  bouquets: {
    title: "باقات",
    description:
      "باقات ورد مصممة بعناية لكل مناسبة، منسقة بأيدي خبراء الزهور.",
    total: 24,
  },
  vases: {
    title: "فازات",
    description: "فازات أنيقة بتنسيقات جاهزة تضيف لمسة فخامة لأي مكان.",
    total: 12,
  },
  contracts: {
    title: "عقود",
    description: "عقود ورود فاخرة للمناسبات الخاصة والاحتفالات.",
    total: 8,
  },
  wholesale: {
    title: "قسم جملة",
    description: "كميات وأسعار الجملة للمحلات ومنسقي الفعاليات.",
    total: 16,
  },
  balloons: {
    title: "بوالين",
    description: "بوالين ملونة وهليومية تكمل فرحة الباقة.",
    total: 10,
  },
  letters: {
    title: "حروف",
    description: "حروف وردية تكتب الاسم أو الرسالة بطريقة مميزة.",
    total: 6,
  },
  wraps: {
    title: "تغاليف",
    description: "تغاليف فاخرة تناسب الهدايا والمناسبات.",
    total: 9,
  },
  candles: {
    title: "شموع",
    description: "شموع عطرية وأنيقة تكتمل معها أجواء الهدية.",
    total: 7,
  },
  ribbons: {
    title: "شرايط",
    description: "شرايط وأكسسوارات تضيف لمسة نهائية للتغليف.",
    total: 5,
  },
};

/** Products for the bouquets category page (matches catalog screenshot). */
export const bouquetProducts: Product[] = [
  {
    id: "b1",
    name: "إسراء",
    desc: "مزيج بيبي روز بألوان ناعمة",
    price: 140,
    image: "/images/prod-a.png",
  },
  {
    id: "b2",
    name: "الرومانسية",
    desc: "٨ ورود مع عبارة I love you",
    price: 80,
    image: "/images/product-3.png",
  },
  {
    id: "b3",
    name: "باقة الحب",
    desc: "١٨ غصن بيبي روز وكازا ٢ غصن",
    price: 200,
    image: "/images/product-love-main.jpg",
  },
  {
    id: "b4",
    name: "١ باقة باتشي",
    desc: "٢٠ غصن بيبي مع شوكولاتة باتشي",
    price: 200,
    image: "/images/prod-d.png",
  },
  {
    id: "b5",
    name: "باقة أبيض",
    desc: "٥٠ وردة بيضاء فاخرة",
    price: 280,
    image: "/images/product-4.png",
  },
  {
    id: "b6",
    name: "زيارة",
    desc: "٣٠ غصن مشكل مع بوالين",
    price: 200,
    image: "/images/product-2.png",
  },
  {
    id: "b7",
    name: "ميلانو",
    desc: "١٠ ورود بتنسيق أنيق",
    price: 60,
    image: "/images/product-1.png",
  },
  {
    id: "b8",
    name: "باقة وردي",
    desc: "١٠ ورود وردية ناعمة",
    price: 60,
    image: "/images/prod-b.png",
  },
];

export function isCategoryId(value: string): value is CategoryId {
  return categories.some((c) => c.id === value);
}

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

export function productsForCategory(slug: CategoryId): Product[] {
  if (slug === "bouquets") return bouquetProducts;
  // Reuse catalog until other category inventories are filled in
  return [...bestSellers, ...moreProducts].slice(0, 8);
}

export const cartCatalogExtras: Product[] = [
  {
    id: "box-1",
    name: "بوكس ورد",
    desc: "صندوق أسطواني بورد جوري فاخر",
    price: 80,
    image: "/images/prod-c.png",
  },
  {
    id: "vase-red",
    name: "فازة احمر",
    desc: "وردات مع الفازه والتغليفه ٨",
    price: 135,
    image: "/images/product-3.png",
  },
];

export const allProducts: Product[] = [
  ...bestSellers,
  ...moreProducts,
  ...bouquetProducts,
  ...cartCatalogExtras,
];

export const productAddons: ProductAddon[] = [
  {
    id: "card",
    name: "بطاقة إهداء فاخرة",
    price: 0,
    image: "/images/illust-message.png",
  },
  {
    id: "balloon",
    name: "بالون هيليوم مميز",
    price: 30,
    image: "/images/categories/balloon.png",
  },
  {
    id: "patchi",
    name: "شوكولاتة باتشي فاخرة",
    price: 80,
    image: "/images/prod-d.png",
  },
  {
    id: "candle",
    name: "شمعة فانيلا فرنسية",
    price: 30,
    image: "/images/categories/candle.png",
  },
];

const defaultDetails = {
  details:
    "تُقطف ورودنا بعناية من أفضل المزارع الكولومبية، وتُنسق يدوياً في نفس يوم الطلب داخل استوديو اللؤلؤة روز بالدمام، مع تغليف حريري يحفظ نضارتها حتى باب المستلم.",
  care: "ضع الباقة في ماء نظيف فوراً، قصّ أطراف السيقان قطرياً، وغيّر الماء يومياً، وأبعدها عن أشعة الشمس المباشرة والتيارات الهوائية.",
  policy:
    "يمكن إلغاء الطلب قبل التجهيز بساعتين على الأقل. في حال وجود مشكلة في جودة الورد عند الاستلام، تواصل معنا خلال ساعة لاستبدال فوري وفق سياسة المتجر المعتمدة.",
};

const detailOverrides: Record<
  string,
  Partial<ProductDetail> & { longDesc?: string }
> = {
  b3: {
    name: "باقة الحب",
    price: 200,
    image: "/images/product-love-main.jpg",
    longDesc:
      "باقة أنيقة تجمع بين البيبي روز والكازا بتغليف حريري ناعم يناسب أجمل لحظاتك.",
    badges: ["الأكثر طلباً", "متوفر"],
    components: ["١٨ غصن بيبي", "٢ غصن كازا", "تغليف أبيض", "أغصان خضراء"],
    gallery: [
      "/images/product-love-main.jpg",
      "/images/product-love-clean.png",
      "/images/prod-c.png",
    ],
    bestSeller: true,
    inStock: true,
  },
  "3": {
    name: "باقة الحب",
    price: 200,
    image: "/images/product-love-main.jpg",
    longDesc:
      "باقة أنيقة تجمع بين البيبي روز والكازا بتغليف حريري ناعم يناسب أجمل لحظاتك.",
    badges: ["الأكثر طلباً", "متوفر"],
    components: ["١٨ غصن بيبي", "٢ غصن كازا", "تغليف أبيض", "أغصان خضراء"],
    gallery: [
      "/images/product-love-main.jpg",
      "/images/product-love-clean.png",
      "/images/prod-c.png",
    ],
    bestSeller: true,
    inStock: true,
  },
};

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getProductDetail(id: string): ProductDetail | undefined {
  const base = getProductById(id);
  if (!base) return undefined;
  const override = detailOverrides[id] ?? {};
  return {
    ...base,
    ...override,
    longDesc:
      override.longDesc ??
      `${base.desc}. تنسيق فاخر من اللؤلؤة روز يُحضَّر بعناية ويُوصل مبرّداً.`,
    badges: override.badges ?? ["متوفر"],
    components: override.components ?? ["تنسيق يدوي", "تغليف فاخر"],
    gallery: override.gallery ?? [base.image, base.image, base.image],
    details: override.details ?? defaultDetails.details,
    care: override.care ?? defaultDetails.care,
    policy: override.policy ?? defaultDetails.policy,
    bestSeller: override.bestSeller ?? false,
    inStock: override.inStock ?? true,
  };
}

export function relatedProducts(id: string, limit = 4): Product[] {
  const current = getProductById(id);
  const seen = new Set<string>([id]);
  const result: Product[] = [];
  for (const p of allProducts) {
    if (seen.has(p.id)) continue;
    if (current && p.name === current.name) continue;
    seen.add(p.id);
    result.push(p);
    if (result.length >= limit) break;
  }
  return result;
}

export type CartAddon = {
  id: string;
  name: string;
  price: number;
};

export type CartLine = {
  key: string;
  productId: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  qty: number;
  addons: CartAddon[];
  giftMessage?: string;
  allowGiftMessage?: boolean;
  /** When true, shows the delivery-unavailable warning on the cart line. */
  deliveryUnavailable?: boolean;
  deliveryLabel?: string;
};

/** Seed cart matching the cart page design. */
export const initialCartItems: CartLine[] = [
  {
    key: "cart-love",
    productId: "b3",
    name: "باقة الحب",
    desc: "١٨ غصن بيبي روز قرمزي وكازابلانكا ٢ غصن",
    price: 200,
    image: "/images/product-love-main.jpg",
    qty: 1,
    addons: [{ id: "card", name: "بطاقة إهداء فاخرة", price: 0 }],
    allowGiftMessage: true,
    giftMessage: "",
  },
  {
    key: "cart-box",
    productId: "box-1",
    name: "بوكس ورد",
    desc: "صندوق أسطواني بورد جوري فاخر",
    price: 80,
    image: "/images/prod-c.png",
    qty: 1,
    addons: [],
  },
  {
    key: "cart-vase",
    productId: "vase-red",
    name: "فازة احمر",
    desc: "وردات مع الفازه والتغليفه ٨",
    price: 135,
    image: "/images/product-3.png",
    qty: 1,
    addons: [{ id: "patchi", name: "شوكولاتة باتشي", price: 80 }],
  },
];

/** Checkout summary seed (matches إتمام الطلب designs). */
export const checkoutOrder = {
  id: "LR-10234",
  city: "الخبر",
  discount: 50,
  discountLabel: "كوبون ورد",
  subtotal: 465,
  addons: 110,
  items: [
    {
      key: "co-love",
      name: "باقة الحب",
      qty: 1,
      price: 250,
      image: "/images/product-love-main.jpg",
      note: "بطاقة فاخرة + بالون هيليوم",
    },
    {
      key: "co-box",
      name: "بوكس ورد",
      qty: 1,
      price: 80,
      image: "/images/prod-c.png",
      note: "صندوق أسطواني أنيق",
    },
    {
      key: "co-vase",
      name: "فازة أحمر",
      qty: 1,
      price: 135,
      image: "/images/product-3.png",
      note: "شوكولاتة باتشي فاخرة",
    },
  ],
} as const;

export const checkoutCities = [
  { name: "الدمام", price: 25 },
  { name: "الخبر", price: 40 },
  { name: "القطيف", price: 35 },
  { name: "الجبيل", price: 90 },
  { name: "الاحساء", price: 100 },
] as const;

export const checkoutTimeSlots = [
  "صباحاً",
  "ظهراً",
  "عصراً",
  "مساءً",
] as const;

export const FREE_DELIVERY_THRESHOLD = 350;

export type TrackOrderStatus =
  | "received"
  | "preparing"
  | "out_for_delivery"
  | "delivered";

export type TrackedOrder = {
  id: string;
  label: string;
  customerName: string;
  placedAt: string;
  paymentMethod: string;
  paymentConfirmed: boolean;
  currentStatus: TrackOrderStatus;
  recipientName: string;
  address: string;
  deliverySlot: string;
  specialNotes: string;
  giftMessage: string;
  subtotal: number;
  addons: number;
  discount: number;
  discountLabel: string;
  city: string;
  items: {
    key: string;
    name: string;
    qty: number;
    price: number;
    image: string;
    note: string;
  }[];
  timeline: {
    id: TrackOrderStatus;
    label: string;
    detail: string;
  }[];
};

/** Seed orders for تتبع طلبك page. */
export const trackedOrders: TrackedOrder[] = [
  {
    id: "LR-10234",
    label: "LR-10234 (باقة الحب والفازة)",
    customerName: "سارة",
    placedAt: "٢٠ أكتوبر ٢٠٢٦ · ١١:١٥ ص",
    paymentMethod: "مدى",
    paymentConfirmed: true,
    currentStatus: "out_for_delivery",
    recipientName: "سارة العتيبي",
    address: "المنطقة الشرقية — الخبر، حي الحزام الذهبي، شارع الأمير فيصل",
    deliverySlot: "الخميس ٢٢ أكتوبر ٢٠٢٦ — الفترة المسائية",
    specialNotes:
      "يرجى التوصيل بعناية دون إتلاف التغليف، والتواصل هاتفياً قبل الوصول بـ ١٥ دقيقة.",
    giftMessage:
      "كل عام وأنتِ زهرة قلبي وبهجة أيامي... دمتِ محاطة بالفرح والجمال كما تستحقين دائماً وأبداً.",
    subtotal: 465,
    addons: 110,
    discount: 50,
    discountLabel: "كوبون ورد",
    city: "الخبر",
    items: [
      {
        key: "tr-love",
        name: "باقة الحب",
        qty: 1,
        price: 250,
        image: "/images/product-love-main.jpg",
        note: "بطاقة فاخرة + بالون هيليوم",
      },
      {
        key: "tr-box",
        name: "بوكس ورد",
        qty: 1,
        price: 80,
        image: "/images/prod-c.png",
        note: "صندوق أسطواني أنيق",
      },
      {
        key: "tr-vase",
        name: "فازة أحمر",
        qty: 1,
        price: 135,
        image: "/images/product-3.png",
        note: "شوكولاتة باتشي فاخرة",
      },
    ],
    timeline: [
      {
        id: "received",
        label: "تم استلام طلبك",
        detail: "٢٠ أكتوبر ٢٠٢٦ · ١١:١٥ ص",
      },
      {
        id: "preparing",
        label: "قيد التجهيز",
        detail: "٢١ أكتوبر ٢٠٢٦ · ٠٩:٣٠ ص",
      },
      {
        id: "out_for_delivery",
        label: "خرج للتوصيل",
        detail: "متوقع ٢٢ أكتوبر ٢٠٢٦ · ٠٤:٠٠ م",
      },
      {
        id: "delivered",
        label: "تم التسليم",
        detail: "متوقع ٢٢ أكتوبر ٢٠٢٦ · مساءً",
      },
    ],
  },
  {
    id: "LR-10188",
    label: "LR-10188 (باقة الرومانسية)",
    customerName: "سارة",
    placedAt: "١٨ أكتوبر ٢٠٢٦ · ٠٣:٤٠ م",
    paymentMethod: "فيزا",
    paymentConfirmed: true,
    currentStatus: "delivered",
    recipientName: "نورة العتيبي",
    address: "الدمام، حي الشاطئ، شارع الخليج",
    deliverySlot: "السبت ١٨ أكتوبر ٢٠٢٦ — الفترة المسائية",
    specialNotes: "اترك الطلب عند الاستقبال إن لم يرد أحد.",
    giftMessage: "أحبك دائماً… مع باقة تليق بكِ.",
    subtotal: 280,
    addons: 30,
    discount: 0,
    discountLabel: "",
    city: "الدمام",
    items: [
      {
        key: "tr-rom",
        name: "باقة الرومانسية",
        qty: 1,
        price: 280,
        image: "/images/product-3.png",
        note: "٨ ورود مع عبارة I love you",
      },
    ],
    timeline: [
      {
        id: "received",
        label: "تم استلام طلبك",
        detail: "١٨ أكتوبر ٢٠٢٦ · ٠٣:٤٠ م",
      },
      {
        id: "preparing",
        label: "قيد التجهيز",
        detail: "١٨ أكتوبر ٢٠٢٦ · ٠٤:١٠ م",
      },
      {
        id: "out_for_delivery",
        label: "خرج للتوصيل",
        detail: "١٨ أكتوبر ٢٠٢٦ · ٠٦:٢٠ م",
      },
      {
        id: "delivered",
        label: "تم التسليم",
        detail: "١٨ أكتوبر ٢٠٢٦ · ٠٧:٠٥ م",
      },
    ],
  },
];

export const cartSuggestions: Product[] = [
  bouquetProducts[4],
  bouquetProducts[5],
  bouquetProducts[6],
  bouquetProducts[7],
];

/** Filter chip id for favorites page (includes تغريسات beyond CategoryId). */
export type FavoriteFilterId = "all" | CategoryId | "toppers";

export type FavoriteItem = Product & {
  categoryId: CategoryId | "toppers";
  available: boolean;
};

export const favoriteFilterChips: {
  id: FavoriteFilterId;
  name: string;
}[] = [
  { id: "all", name: "الكل" },
  ...categories.map((c) => ({ id: c.id as FavoriteFilterId, name: c.name })),
  { id: "toppers", name: "تغريسات" },
];

/** Seed favorites matching the المفضلة design (8 items, 1 unavailable). */
export const initialFavorites: FavoriteItem[] = [
  { ...bouquetProducts[0], categoryId: "bouquets", available: true },
  { ...bouquetProducts[1], categoryId: "bouquets", available: true },
  { ...bouquetProducts[2], categoryId: "bouquets", available: true },
  { ...bouquetProducts[3], categoryId: "bouquets", available: true },
  { ...bouquetProducts[4], categoryId: "vases", available: false },
  { ...bouquetProducts[5], categoryId: "vases", available: true },
  { ...bouquetProducts[6], categoryId: "contracts", available: true },
  { ...bouquetProducts[7], categoryId: "wholesale", available: true },
];

/** Recommendations below favorites (not already favorited). */
export const favoriteSuggestions: Product[] = [
  bestSellers[0],
  bestSellers[1],
  moreProducts[0],
  moreProducts[1],
];

export function allProductIds(): string[] {
  return [...new Set(allProducts.map((p) => p.id))];
}

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
