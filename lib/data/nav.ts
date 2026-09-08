/** Navigation tree — shared by server and client components (no server-only import). */
export interface NavCategory {
  slug: string;
  label: string;
  children: string[];
  count?: number;
}

export const navCategories: NavCategory[] = [
  { slug: "eikona-ixos", label: "Εικόνα & Ήχος", count: 291, children: ["Τηλεοράσεις", "Home Cinema", "Φορητός ήχος", "Βάσεις TV", "Projectors", "Ηχεία"] },
  { slug: "tilefonia", label: "Τηλεφωνία", count: 225, children: ["Smartphones", "Wearables", "Ακουστικά", "Θήκες", "Power bank", "Σταθερή τηλεφωνία"] },
  { slug: "computing", label: "Computing", count: 181, children: ["Laptops", "Tablets", "Οθόνες", "Περιφερειακά", "Storage", "Networking", "Εκτύπωση"] },
  { slug: "leykes-syskeyes", label: "Λευκές Συσκευές", count: 645, children: ["Ψυγεία", "Πλυντήρια", "Στεγνωτήρια", "Κουζίνες", "Εντοιχιζόμενα", "Μικροκύματα", "Απορροφητήρες"] },
  { slug: "klimatismos", label: "Κλιματισμός", count: 227, children: ["Air condition", "Αφυγραντήρες", "Ανεμιστήρες", "Θερμαντικά", "Ηλιακοί θερμοσίφωνες"] },
  { slug: "oikiakos-exoplismos", label: "Οικιακός Εξοπλισμός", count: 508, children: ["Σκούπες", "Σιδέρωμα", "Καφές & ροφήματα", "Μαγειρική", "Σκεύη"] },
  { slug: "frontida", label: "Φροντίδα", count: 158, children: ["Γυναίκα", "Άνδρας", "Παιδί", "Υγεία & ευεξία"] },
  { slug: "gaming", label: "Gaming", count: 15, children: ["PC Gaming", "Ηλεκτρικά πατίνια", "Αξεσουάρ"] },
];

export const navUtility = [
  { slug: "prosfores", label: "Προσφορές", tone: "offer" as const },
  { slug: "ypiresies", label: "Υπηρεσίες" },
  { slug: "katastimata", label: "Καταστήματα" },
];
