/** Domain types — mirror prisma/schema.prisma. */

export type EnergyClass = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "A+" | "A++" | "A+++";

export type Availability =
  | { kind: "in-stock"; deliveryDate: string; label?: string }
  | { kind: "days"; min: number; max: number; deliveryDate: string }
  | { kind: "order"; label?: string };

export interface Product {
  id: string;
  sku: string;
  slug: string;
  brand: string;
  title: string;
  image: string | null;
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
  badge?: { kind: "discount" } | { kind: "gift"; label: string };
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
}

export interface Service {
  no: string;
  slug: string;
  title: string;
  blurb: string;
  priceFrom?: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  openUntil: string;
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
  image?: string;
  tone: "blue" | "red" | "green";
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

export interface Deal {
  productId: string;
  endsAt: string;
}
