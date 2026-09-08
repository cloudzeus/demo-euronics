import type { Address, Order } from "../types";

export const demoAddress: Address = {
  id: "a1",
  label: "Σπίτι",
  firstName: "Γιάννης",
  lastName: "Παπαδόπουλος",
  street: "Μεσογείων",
  number: "64",
  floor: "3ος",
  city: "Αθήνα",
  zip: "11527",
  region: "Αττική",
  phone: "6941234567",
  isDefault: true,
};

/** Demo orders for the account & tracking flows (number + phone/email unlock tracking). */
export const orders: Order[] = [
  {
    number: "EUR-20260904-0417",
    date: "2026-09-04",
    status: "shipped",
    fulfilment: "courier",
    address: demoAddress,
    lines: [
      { productId: "p-lg-43nano82", title: "43NANO82T6B NanoCell 43\" 4K Smart TV", brand: "LG", image: "https://www.euronics.gr/images/thumbs/11004601_480.jpeg", qty: 1, unitPrice: 349, addons: [{ slug: "epektasi-eggyisis", title: "Επέκταση εγγύησης 5 έτη", price: 39 }] },
      { productId: "p-jbl-flip-7", title: "Flip 7 Φορητό Ηχείο Bluetooth", brand: "JBL", image: null, qty: 1, unitPrice: 129 },
    ],
    subtotal: 517,
    shippingFee: 0,
    total: 517,
    payment: { method: "Κάρτα", instalments: 12, last4: "4821" },
    tracking: {
      courier: "ACS Courier",
      code: "1234567890",
      url: "https://www.acscourier.net/el/track/1234567890",
      events: [
        { date: "2026-09-04 14:12", text: "Η παραγγελία καταχωρήθηκε και η πληρωμή επιβεβαιώθηκε" },
        { date: "2026-09-05 09:40", text: "Συλλογή από το κέντρο διανομής Αχαρνών" },
        { date: "2026-09-05 18:05", text: "Παραδόθηκε στην ACS Courier" },
        { date: "2026-09-06 08:30", text: "Σε διανομή — αναμενόμενη παράδοση σήμερα 10:00–15:00" },
      ],
    },
  },
  {
    number: "EUR-20260812-0093",
    date: "2026-08-12",
    status: "delivered",
    fulfilment: "click-collect",
    pickupStore: "Μπριλάκη Αφοί Ε.Ε. — Μεσογείων 64",
    lines: [{ productId: "p-philips-airfryer", title: "Airfryer XXL HD9285 7,2 L", brand: "PHILIPS", image: null, qty: 1, unitPrice: 179 }],
    subtotal: 179,
    shippingFee: 0,
    total: 179,
    payment: { method: "Κάρτα", last4: "4821" },
  },
  {
    number: "EUR-20260620-1188",
    date: "2026-06-20",
    status: "delivered",
    fulfilment: "appointment",
    address: demoAddress,
    lines: [{ productId: "p-inventor-ikura", title: "IKURA IKUI/IKUO-12WFI Inverter 12.000 BTU", brand: "INVENTOR", image: "/img/product-ac.jpg", qty: 1, unitPrice: 499, addons: [{ slug: "paradosi-egkatastasi", title: "Εγκατάσταση", price: 60 }] }],
    subtotal: 559,
    shippingFee: 0,
    total: 559,
    payment: { method: "Δόσεις χωρίς κάρτα (Eurobank)", instalments: 24 },
    invoice: { vat: "123456789", company: "ΠΑΠΑΔΟΠΟΥΛΟΣ Ι. & ΣΙΑ Ο.Ε.", doy: "Αθηνών Α΄" },
  },
];
