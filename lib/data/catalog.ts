import "server-only";
import type { Category, Guide, HeroSlide, Product, Service, Store } from "./types";

/**
 * Data layer. Today these are typed fixtures reproduced from the design
 * (real euronics.gr assets and copy). Every function is async and
 * server-only so that swapping in Prisma (see prisma/schema.prisma) or
 * the ERP adapter changes nothing in the components.
 */

const IMG = "https://www.euronics.gr/images/thumbs";

const products: Product[] = [
  {
    id: "p-inventor-ikura",
    sku: "11398500",
    slug: "inventor-ikura-ikui-ikuo-12wfi-12000-btu",
    brand: "INVENTOR",
    title: "IKURA IKUI/IKUO-12WFI Inverter 12.000 BTU",
    image: "/img/product-ac.jpg",
    price: 449,
    wasPrice: 499,
    lowest30: 489,
    energy: { cls: "A++", fiche: "#" },
    availability: { kind: "in-stock", deliveryDate: "2026-09-10" },
    storeStock: 12,
    installation: true,
    badge: { kind: "discount" },
  },
  {
    id: "p-lg-43nano82",
    sku: "11004601",
    slug: "lg-43nano82t6b-nanocell-43-4k-smart-tv",
    brand: "LG",
    title: "43NANO82T6B NanoCell 43\" 4K Smart TV",
    image: `${IMG}/11004601_480.jpeg`,
    price: 349,
    wasPrice: 429,
    lowest30: 379,
    energy: { cls: "F", fiche: "#" },
    availability: { kind: "days", min: 2, max: 4, deliveryDate: "2026-09-12" },
    storeStock: 8,
    badge: { kind: "discount" },
  },
  {
    id: "p-aeg-lr7f49gs",
    sku: "lr7f49gs",
    slug: "aeg-lr7f49gs-plyntirio-9kg",
    brand: "AEG",
    title: "LR7F49GS Πλυντήριο 9kg 1400 στροφών",
    image: "/img/product-washer.jpg",
    price: 549,
    wasPrice: 799,
    lowest30: 599,
    energy: { cls: "A", fiche: "#" },
    availability: { kind: "in-stock", deliveryDate: "2026-09-10", label: "Άμεσα · με εγκατάσταση" },
    tradeIn: true,
    installation: true,
    badge: { kind: "discount" },
  },
  {
    id: "p-delonghi-magnifica-evo",
    sku: "magnifica-evo",
    slug: "delonghi-magnifica-evo",
    brand: "DELONGHI",
    title: "Magnifica Evo Αυτόματη Μηχανή Espresso",
    image: "/img/product-espresso.jpg",
    price: 399,
    gift: "Δώρο 2 κιλά καφέ αξίας 34,00 €",
    rating: { value: 4.6, count: 128 },
    availability: { kind: "in-stock", deliveryDate: "2026-09-10" },
    storeStock: 24,
    badge: { kind: "gift", label: "Δώρο" },
  },
];

const categories: Category[] = [
  { id: "tv", no: "01", slug: "tileoraseis-ixos", title: "Τηλεοράσεις & Ήχος", titleBreak: ["Τηλεοράσεις", "& Ήχος"], count: 214, meta: "7 μάρκες" },
  { id: "clima", no: "02", slug: "klimatismos-thermansi", title: "Κλιματισμός & Θέρμανση", titleBreak: ["Κλιματισμός", "& Θέρμανση"], count: 186, meta: "εποχική αιχμή", featured: true },
  { id: "wash", no: "03", slug: "plyntiria-stegnotiria", title: "Πλυντήρια & Στεγνωτήρια", titleBreak: ["Πλυντήρια", "& Στεγνωτήρια"], count: 240, meta: "με εγκατάσταση" },
  { id: "fridge", no: "04", slug: "psygeia-katapsyktes", title: "Ψυγεία & Καταψύκτες", titleBreak: ["Ψυγεία", "& Καταψύκτες"], count: 198, meta: "A έως G" },
  { id: "mobile", no: "05", slug: "kinita-wearables", title: "Κινητά & Wearables", titleBreak: ["Κινητά", "& Wearables"], count: 312 },
  { id: "computing", no: "06", slug: "laptops-computing", title: "Laptops & Computing", titleBreak: ["Laptops", "& Computing"], count: 154 },
  { id: "coffee", no: "07", slug: "kafes-mageiriki", title: "Καφές & Μαγειρική", titleBreak: ["Καφές", "& Μαγειρική"], count: 176 },
  { id: "vacuum", no: "08", slug: "skoupes-kathariotita", title: "Σκούπες & Καθαριότητα", titleBreak: ["Σκούπες", "& Καθαριότητα"], count: 142 },
  { id: "care", no: "09", slug: "prosopiki-frontida", title: "Προσωπική Φροντίδα", titleBreak: ["Προσωπική", "Φροντίδα"], count: 208 },
];

const services: Service[] = [
  { no: "01", slug: "epektasi-eggyisis", title: "Επέκταση εγγύησης", blurb: "Έως 5 έτη, από 19 € · καλύπτει και βλάβη από υγρά", priceFrom: 19 },
  { no: "02", slug: "paradosi-egkatastasi", title: "Παράδοση & εγκατάσταση", blurb: "Με ραντεβού, από τεχνικό του καταστήματος" },
  { no: "03", slug: "paralavi-2-ores", title: "Παραλαβή σε 2 ώρες", blurb: "Σε 350 σημεία · χωρίς κόστος" },
  { no: "04", slug: "anakyklosi-aiie", title: "Ανακύκλωση ΑΗΗΕ", blurb: "Δωρεάν παραλαβή της παλιάς συσκευής" },
  { no: "05", slug: "dorean-fylaxi", title: "Δωρεάν φύλαξη", blurb: "Έως 6 μήνες, μέχρι να ετοιμαστεί ο χώρος" },
  { no: "06", slug: "service", title: "Δικό μας service", blurb: "Συντήρηση & επισκευή, με ανταλλακτικά αντιπροσωπείας" },
  { no: "07", slug: "e-support", title: "E-Support", blurb: "Απομακρυσμένη υποστήριξη συσκευών υψηλής τεχνολογίας" },
  { no: "08", slug: "eggyisi-xamiloteris-timis", title: "Εγγύηση χαμηλότερης τιμής", blurb: "Διαφορά τιμής πίσω, με απλή απόδειξη" },
  { no: "09", slug: "eggyisi-allagis", title: "Εγγύηση αλλαγής", blurb: "Αλλαγή προϊόντος εντός 14 ημερών" },
  { no: "10", slug: "xrimatodotisi", title: "Χρηματοδότηση", blurb: "Δόσεις με ή χωρίς κάρτα, έως 24 μήνες" },
  { no: "11", slug: "symvouleytiki", title: "Συμβουλευτική από ειδικούς", blurb: "Στο κατάστημα, τηλεφωνικά ή με video" },
  { no: "12", slug: "kartes-dorou", title: "Κάρτες δώρου", blurb: "Ψηφιακές ή φυσικές, εξαργύρωση παντού" },
];

const stores: Store[] = [
  { id: "s1", name: "Μπριλάκη Αφοί — Μεσογείων 64", address: "Μεσογείων 64, Αθήνα", distanceKm: 1.2, openUntil: "21:00", lat: 37.985, lng: 23.77 },
  { id: "s2", name: "Euronics Αχαρνές", address: "Δαμάσκου Σταμάτη 12, Αχαρνές", distanceKm: 9.8, openUntil: "20:30", lat: 38.08, lng: 23.73 },
];

const guides: Guide[] = [
  {
    slug: "epilogi-klimatistikou",
    kicker: "Οδηγός",
    minutes: 4,
    title: "Πώς να επιλέξεις το σωστό κλιματιστικό για κάθε χώρο",
    excerpt: "BTU, Inverter, ενεργειακή απόδοση, μόνωση: τι μετράει πραγματικά.",
    cta: "Διάβασε & δες 6 προτάσεις →",
    image: "/img/guide-ac.jpg",
    tone: "blue",
  },
  {
    slug: "mikrosyskeves-foititiko",
    kicker: "Οδηγός",
    minutes: 5,
    title: "Οι βασικές μικροσυσκευές για φοιτητικό σπίτι",
    excerpt: "Λίγος χώρος, απαιτητική καθημερινότητα: οι επιλογές που αξίζουν.",
    cta: "Δες 9 προτάσεις →",
    image: "/img/guide-student.jpg",
    tone: "red",
  },
  {
    slug: "nea-energeiaki-etiketa",
    kicker: "Ενέργεια",
    minutes: 3,
    title: "Τι σημαίνει η νέα ενεργειακή ετικέτα A–G",
    excerpt: "Πόσο ρεύμα γλιτώνεις πραγματικά ανεβαίνοντας μία κλάση.",
    cta: "Διάβασε →",
    image: "/img/guide-energy.jpg",
    tone: "green",
  },
];

const heroSlides: HeroSlide[] = [
  {
    id: "summer-clima",
    kicker: "Καλοκαίρι 2026 · κλιματισμός",
    title: ["Δροσιά", "που δεν καίει", "ρεύμα"],
    body: "Inverter έως A+++, τοποθέτηση από πιστοποιημένο τεχνικό του καταστήματος της γειτονιάς σου, δόσεις χωρίς κάρτα.",
    primary: { label: "Δες τα 186 μοντέλα", href: "/klimatismos-thermansi" },
    secondary: { label: "Υπολόγισε BTU", href: "/odigoi/btu" },
    bullets: ["Δωρεάν μεταφορά", "Εγκατάσταση", "Εγγύηση έως 5 έτη"],
    image: "/img/hero-clima.jpg",
    alt: "Δροσερό σαλόνι με κλιματιστικό inverter",
  },
  {
    id: "back-to-school",
    kicker: "Σεπτέμβριος · computing",
    title: ["Laptop", "για κάθε", "σχολή"],
    body: "Από 399 €, με δωρεάν τσάντα και εγκατάσταση Office από το κατάστημα.",
    primary: { label: "Δες τα 154 μοντέλα", href: "/laptops-computing" },
    secondary: { label: "Οδηγός επιλογής", href: "/odigoi/laptop" },
    bullets: ["Δωρεάν μεταφορά", "Δόσεις χωρίς κάρτα", "Επίσημη εγγύηση"],
    image: "/img/hero-laptop.jpg",
    alt: "Φοιτήτρια με laptop στο γραφείο της",
  },
  {
    id: "renew",
    kicker: "Euronics Renew",
    title: ["Refurbished", "με 2 χρόνια", "εγγύηση"],
    body: "Έλεγχος 60 σημείων, μπαταρία ≥85%, Grade A/B με σαφή περιγραφή.",
    primary: { label: "Δες τα Renew", href: "/renew" },
    secondary: { label: "Τι είναι το Renew", href: "/odigoi/renew" },
    bullets: ["2 έτη εγγύηση", "14 ημέρες υπαναχώρηση", "Δόσεις"],
    image: "/img/hero-renew.jpg",
    alt: "Refurbished smartphone στο χέρι",
  },
];

export async function getProducts(): Promise<Product[]> {
  return products;
}
export async function getProduct(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}
export async function getCategories(): Promise<Category[]> {
  return categories;
}
export async function getServices(limit?: number): Promise<Service[]> {
  return limit ? services.slice(0, limit) : services;
}
export async function getNearestStore(): Promise<Store> {
  return stores[0];
}
export async function getGuides(): Promise<Guide[]> {
  return guides;
}
export async function getHeroSlides(): Promise<HeroSlide[]> {
  return heroSlides;
}
export async function getDealOfDay(): Promise<{ product: Product; endsAt: string }> {
  const end = new Date();
  end.setHours(23, 59, 59, 0);
  return { product: products[1], endsAt: end.toISOString() };
}
export async function getWeeklyDeals(): Promise<{ products: Product[]; endsAt: string; label: string }> {
  // Real expiry: next Sunday 23:59 (Omnibus: no fake countdowns)
  const end = new Date();
  end.setDate(end.getDate() + ((7 - end.getDay()) % 7 || 7));
  end.setHours(23, 59, 0, 0);
  const label = new Intl.DateTimeFormat("el-GR", { weekday: "long", day: "numeric", month: "long" }).format(end);
  return { products, endsAt: end.toISOString(), label: `Λήγουν ${label}` };
}
