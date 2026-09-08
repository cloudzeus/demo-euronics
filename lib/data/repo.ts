import "server-only";
import type { Brand, Faq, Guide, Order, Policy, Product, Service, Store } from "./types";
import { navCategories, type NavCategory } from "./nav";
import { products } from "./fixtures/products";
import { stores } from "./fixtures/stores";
import { services } from "./fixtures/services";
import { guides } from "./fixtures/guides";
import { faqs, policies } from "./fixtures/content";
import { orders } from "./fixtures/orders";

/**
 * Repository — the only module pages read data from. Today: typed
 * fixtures. Tomorrow: Prisma queries with identical signatures.
 */

export interface ListFilter {
  l1?: string;
  l2?: string;
  brand?: string[];
  q?: string;
  tag?: string;
  minPrice?: number;
  maxPrice?: number;
  avail?: "in-stock";
  sale?: boolean;
  renew?: boolean;
  energy?: string[];
  sort?: "relevance" | "price-asc" | "price-desc" | "rating" | "newest" | "discount";
  page?: number;
  perPage?: number;
}

export interface ListResult {
  items: Product[];
  total: number;
  page: number;
  pages: number;
  brands: { slug: string; name: string; count: number }[];
  energies: { cls: string; count: number }[];
  priceRange: [number, number];
}

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export async function getCategoryTree(): Promise<NavCategory[]> {
  return navCategories;
}
export async function getL1(slug: string) {
  return navCategories.find((c) => c.slug === slug) ?? null;
}
export async function getL2(l1: string, l2: string) {
  const c = await getL1(l1);
  const s = c?.children.find((x) => x.slug === l2) ?? null;
  return c && s ? { l1: c, l2: s } : null;
}

function applyFilter(f: ListFilter) {
  let list = products.slice();
  if (f.l1) list = list.filter((p) => p.category === f.l1);
  if (f.l2) list = list.filter((p) => p.subcategory === f.l2);
  if (f.brand?.length) list = list.filter((p) => f.brand!.includes(p.brandSlug));
  if (f.tag) list = list.filter((p) => p.tags?.includes(f.tag!));
  if (f.renew) list = list.filter((p) => p.isRenew);
  if (f.minPrice != null) list = list.filter((p) => p.price >= f.minPrice!);
  if (f.maxPrice != null) list = list.filter((p) => p.price <= f.maxPrice!);
  if (f.avail === "in-stock") list = list.filter((p) => p.availability.kind === "in-stock");
  if (f.sale) list = list.filter((p) => p.wasPrice && p.wasPrice > p.price);
  if (f.energy?.length) list = list.filter((p) => p.energy && f.energy!.includes(p.energy.cls));
  if (f.q) {
    const q = norm(f.q);
    list = list.filter((p) => norm(`${p.brand} ${p.title} ${p.sku} ${p.ean ?? ""} ${p.subcategory}`).includes(q));
  }
  return list;
}

export async function listProducts(f: ListFilter = {}): Promise<ListResult> {
  const base = applyFilter({ ...f, brand: undefined, energy: undefined, minPrice: undefined, maxPrice: undefined, avail: undefined, sale: undefined });
  const brandsMap = new Map<string, { slug: string; name: string; count: number }>();
  const energyMap = new Map<string, number>();
  for (const p of base) {
    const b = brandsMap.get(p.brandSlug) ?? { slug: p.brandSlug, name: p.brand, count: 0 };
    b.count++;
    brandsMap.set(p.brandSlug, b);
    if (p.energy) energyMap.set(p.energy.cls, (energyMap.get(p.energy.cls) ?? 0) + 1);
  }
  let list = applyFilter(f);
  const sort = f.sort ?? "relevance";
  const score = (p: Product) => (p.rating?.count ?? 0) + (p.tags?.length ?? 0) * 10 + (p.badge ? 5 : 0);
  list.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return (b.rating?.value ?? 0) - (a.rating?.value ?? 0);
      case "discount":
        return ((b.wasPrice ?? b.price) - b.price) / (b.wasPrice ?? b.price) - ((a.wasPrice ?? a.price) - a.price) / (a.wasPrice ?? a.price);
      case "newest":
        return (b.badge?.kind === "new" ? 1 : 0) - (a.badge?.kind === "new" ? 1 : 0);
      default:
        return score(b) - score(a);
    }
  });
  const perPage = f.perPage ?? 24;
  const page = Math.max(1, f.page ?? 1);
  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const prices = base.map((p) => p.price);
  return {
    items: list.slice((page - 1) * perPage, page * perPage),
    total,
    page,
    pages,
    brands: [...brandsMap.values()].sort((a, b) => b.count - a.count),
    energies: [...energyMap.entries()].map(([cls, count]) => ({ cls, count })).sort((a, b) => a.cls.localeCompare(b.cls)),
    priceRange: prices.length ? [Math.min(...prices), Math.max(...prices)] : [0, 0],
  };
}

export async function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}
export async function getProductsByIds(ids: string[]) {
  return ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
}
export async function getRelated(p: Product, limit = 8) {
  return products.filter((x) => x.id !== p.id && (x.subcategory === p.subcategory || x.category === p.category)).slice(0, limit);
}
export async function getAccessoriesFor(p: Product) {
  const map: Record<string, string[]> = {
    tileoraseis: ["p-jbl-flip-7"],
    "air-condition": [],
    smartphones: ["p-jbl-flip-7"],
    laptops: ["p-ipad-a16-128"],
  };
  return getProductsByIds(map[p.subcategory] ?? []);
}
export async function searchSuggest(q: string) {
  const n = norm(q);
  if (n.length < 2) return { products: [], categories: [], brands: [] };
  const prods = products.filter((p) => norm(`${p.brand} ${p.title} ${p.sku}`).includes(n)).slice(0, 5);
  const cats: { name: string; href: string }[] = [];
  for (const c of navCategories) {
    if (norm(c.label).includes(n)) cats.push({ name: c.label, href: `/k/${c.slug}` });
    for (const ch of c.children) if (norm(ch.name).includes(n)) cats.push({ name: `${ch.name} · ${c.label}`, href: `/k/${c.slug}/${ch.slug}` });
  }
  const brands = (await getBrands()).filter((b) => norm(b.name).includes(n)).slice(0, 4);
  return { products: prods, categories: cats.slice(0, 4), brands };
}

export async function getBrands(): Promise<Brand[]> {
  const map = new Map<string, Brand>();
  for (const p of products) {
    const b = map.get(p.brandSlug) ?? { slug: p.brandSlug, name: p.brand, count: 0 };
    b.count++;
    map.set(p.brandSlug, b);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}
export async function getBrand(slug: string) {
  return (await getBrands()).find((b) => b.slug === slug) ?? null;
}

export async function getStores(q?: { q?: string; region?: string; service?: string }): Promise<Store[]> {
  let list = stores.slice();
  if (q?.region) list = list.filter((s) => s.region === q.region);
  if (q?.service) list = list.filter((s) => s.services.includes(q.service!));
  if (q?.q) {
    const n = norm(q.q);
    list = list.filter((s) => norm(`${s.name} ${s.city} ${s.zip} ${s.region} ${s.address}`).includes(n));
  }
  return list.sort((a, b) => a.distanceKm - b.distanceKm);
}
export async function getStoreBySlug(slug: string) {
  return stores.find((s) => s.slug === slug) ?? null;
}
export async function getRegions() {
  return [...new Set(stores.map((s) => s.region))].sort();
}

export async function getServicesFull(): Promise<Service[]> {
  return services;
}
export async function getService(slug: string) {
  return services.find((s) => s.slug === slug) ?? null;
}
export async function getGuidesFull(): Promise<Guide[]> {
  return guides;
}
export async function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug) ?? null;
}
export async function getFaqs(): Promise<Faq[]> {
  return faqs;
}
export async function getPolicy(slug: string): Promise<Policy | null> {
  return policies.find((p) => p.slug === slug) ?? null;
}
export async function getOrders(): Promise<Order[]> {
  return orders;
}
export async function getOrder(no: string): Promise<Order | null> {
  return orders.find((o) => o.number.toLowerCase() === no.trim().toLowerCase()) ?? null;
}
