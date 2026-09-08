/** Domain types — mirror prisma/schema.prisma. Fixtures live in lib/data/fixtures/. */

export type EnergyClass = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "A+" | "A++" | "A+++";

export type Availability =
  | { kind: "in-stock"; deliveryDate: string; label?: string }
  | { kind: "days"; min: number; max: number; deliveryDate: string }
  | { kind: "order"; label?: string };

export interface Spec {
  group: string;
  key: string;
  value: string;
}

export interface VariantAxis {
  name: string; // "Χρώμα" | "Χωρητικότητα"
  options: { label: string; slug?: string; price?: number; swatch?: string }[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface Question {
  id: string;
  body: string;
  answer?: string;
  date: string;
}

export interface Product {
  id: string;
  sku: string;
  ean?: string;
  slug: string;
  brand: string;
  brandSlug: string;
  title: string;
  /** L1 category id and L2 subcategory slug */
  category: string;
  subcategory: string;
  image: string | null;
  images?: string[];
  price: number;
  wasPrice?: number;
  /** Omnibus: lowest price of the previous 30 days, required with any discount. */
  lowest30?: number;
  energy?: { cls: EnergyClass; fiche: string };
  gift?: string;
  rating?: { value: number; count: number };
  availability: Availability;
  storeStock?: number;
  tradeIn?: boolean;
  installation?: boolean;
  badge?: { kind: "discount" } | { kind: "gift"; label: string } | { kind: "new" } | { kind: "renew"; grade: "A" | "B" };
  description?: string;
  highlights?: string[];
  specs?: Spec[];
  variants?: VariantAxis[];
  reviews?: Review[];
  questions?: Question[];
  tags?: string[];
  isRenew?: boolean;
  /** Source URL on the current euronics.gr (dummy content provenance). */
  sourceUrl?: string;
}

export interface Subcategory {
  slug: string;
  name: string;
  count: number;
  image?: string;
}

export interface Category {
  id: string;
  no: string;
  slug: string;
  title: string;
  titleBreak?: [string, string];
  count: number;
  meta?: string;
  featured?: boolean;
  description?: string;
  children: Subcategory[];
  /** Facet definitions for listings of this category. */
  facets?: FacetDef[];
}

export interface FacetDef {
  param: string;
  label: string;
  kind: "checkbox" | "range";
  /** specs key the facet reads from */
  specKey?: string;
  options?: string[];
}

export interface Brand {
  slug: string;
  name: string;
  count: number;
  logo?: string;
  blurb?: string;
}

export interface Service {
  no: string;
  slug: string;
  title: string;
  blurb: string;
  body?: string;
  priceFrom?: number;
  steps?: string[];
  faq?: { q: string; a: string }[];
  addonAt?: ("pdp" | "checkout" | "delivery")[];
}

export interface Store {
  id: string;
  slug: string;
  name: string;
  member?: string;
  address: string;
  zip: string;
  city: string;
  region: string;
  phone?: string;
  email?: string;
  distanceKm: number;
  openUntil: string;
  hours: { day: string; open: string; close: string }[];
  services: string[];
  lat: number;
  lng: number;
}

export interface Guide {
  slug: string;
  kicker: string;
  minutes: number;
  title: string;
  excerpt: string;
  cta: string;
  ctaHref?: string;
  image?: string;
  tone: "blue" | "red" | "green";
  date?: string;
  body?: string[];
  sourceUrl?: string;
}

export interface HeroSlide {
  id: string;
  kicker: string;
  title: string[];
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  bullets: string[];
  image: string;
  alt: string;
}

export interface Faq {
  group: string;
  q: string;
  a: string;
}

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  number: string;
  floor?: string;
  city: string;
  zip: string;
  region: string;
  phone: string;
  isDefault?: boolean;
}

export interface OrderLine {
  productId: string;
  title: string;
  brand: string;
  image: string | null;
  qty: number;
  unitPrice: number;
  addons?: { slug: string; title: string; price: number }[];
}

export interface Order {
  number: string;
  date: string;
  status: "pending" | "paid" | "processing" | "shipped" | "ready-for-pickup" | "delivered" | "cancelled" | "returned";
  fulfilment: "courier" | "click-collect" | "appointment";
  pickupStore?: string;
  address?: Address;
  lines: OrderLine[];
  subtotal: number;
  shippingFee: number;
  total: number;
  payment: { method: string; instalments?: number; last4?: string };
  tracking?: { courier: string; code: string; url: string; events: { date: string; text: string }[] };
  invoice?: { vat: string; company: string; doy: string };
}

export interface Policy {
  slug: string;
  title: string;
  intro?: string;
  sections: { title: string; body: string[] }[];
  sourceUrl?: string;
  updated?: string;
}
