/**
 * @dynamic «Ραντάρ ζήτησης» — what customers asked the advisor that the
 * shop could not serve. Production: aggregated nightly from ChatSession /
 * ChatMessage + search logs (intent, model, price ceiling, fit failures),
 * joined with SoftOne stock (MTRSTORE) and the catalogue. Demo: fixture.
 */
export interface RadarSummary {
  period: string;
  sessions: number;
  toCart: number;
  handoffs: number;
  missing: { model: string; brand: string; asks: number; region: string; status: "not-listed" | "out-of-stock"; suggestion: string }[];
  intents: { theme: string; share: number; example: string }[];
  priceCeilings: { category: string; ceiling: number; asks: number; cheapest: number }[];
  fitFailures: { category: string; product: string; door: number; fails: number }[];
}

export const radar: RadarSummary = {
  period: "1–7 Σεπτεμβρίου 2026",
  sessions: 6420,
  toCart: 1188,
  handoffs: 214,
  missing: [
    { model: "WW90CGC04DAE", brand: "Samsung", asks: 140, region: "Αττική", status: "out-of-stock", suggestion: "Παραγγελία 60 τεμ. · lead time 9 ημέρες" },
    { model: "KGN39VLEB", brand: "Bosch", asks: 96, region: "Θεσσαλονίκη", status: "not-listed", suggestion: "Ζήτησε λίστα από BSH Ελλάς" },
    { model: "65C845", brand: "TCL", asks: 71, region: "Πανελλαδικά", status: "not-listed", suggestion: "Νέα μάρκα · 2 ζητήσεις/ημέρα" },
    { model: "V15 Detect", brand: "Dyson", asks: 58, region: "Αττική", status: "out-of-stock", suggestion: "Παραγγελία 25 τεμ." },
    { model: "Serie 6 SMS6ZCI42E", brand: "Bosch", asks: 44, region: "Πάτρα", status: "not-listed", suggestion: "Εντοιχιζόμενο · ζητείται με εγκατάσταση" },
  ],
  intents: [
    { theme: "Θόρυβος (dB) σε πλυντήρια", share: 40, example: "«πόσο θόρυβο κάνει στο στύψιμο;»" },
    { theme: "Διαστάσεις / χωράει;", share: 27, example: "«χωράει σε εσοχή 60 εκ. με πόρτα 58;»" },
    { theme: "Κατανάλωση ρεύματος", share: 18, example: "«πόσο καίει τον χρόνο;»" },
    { theme: "Εγκατάσταση & παλιά συσκευή", share: 9, example: "«παίρνετε την παλιά;»" },
    { theme: "Δόσεις χωρίς κάρτα", share: 6, example: "«πόσες δόσεις χωρίς κάρτα;»" },
  ],
  priceCeilings: [
    { category: "Πλυντήρια 9 kg", ceiling: 400, asks: 312, cheapest: 449 },
    { category: "Τηλεοράσεις 55\"", ceiling: 500, asks: 268, cheapest: 549 },
    { category: "Κλιματιστικά 12.000 BTU", ceiling: 350, asks: 190, cheapest: 379 },
    { category: "Ψυγεία 180 εκ.", ceiling: 450, asks: 122, cheapest: 429 },
  ],
  fitFailures: [
    { category: "Πλυντήρια", product: "Samsung WW11DG5B25AELE", door: 60, fails: 84 },
    { category: "Ψυγεία", product: "Hisense RT728N4WCE1", door: 75, fails: 61 },
    { category: "Πλυντήρια", product: "AEG LF5Z48WG", door: 60, fails: 39 },
  ],
};
