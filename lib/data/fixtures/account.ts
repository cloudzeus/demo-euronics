import type { Appointment, ConsentPref, Customer, InstalmentPlan, PaymentMethod } from "../types";

/** @dynamic Demo session customer — replaced by the auth session + SoftOne CUSTOMER record. */
export const customer: Customer = {
  id: "c-10421",
  firstName: "Γιάννης",
  lastName: "Παπαδόπουλος",
  email: "giannis@example.gr",
  phone: "694 123 4567",
  birthday: "1986-03-14",
  vat: "123456789",
  memberSince: "2021-11-03",
  loyaltyPoints: 1240,
  twoFactor: true,
};

/** @dynamic PSP tokens — only masked data ever reaches the browser. */
export const paymentMethods: PaymentMethod[] = [
  { id: "pm-1", kind: "card", label: "Visa", brand: "visa", last4: "4821", expires: "09/28", isDefault: true },
  { id: "pm-2", kind: "card", label: "Mastercard", brand: "mastercard", last4: "0330", expires: "02/27" },
  { id: "pm-3", kind: "iris", label: "IRIS · 694 123 4567" },
];

/** @dynamic Ενεργά προγράμματα δόσεων — από SoftOne FINDOC (κάρτα) ή Eurobank API (χωρίς κάρτα). */
export const instalmentPlans: InstalmentPlan[] = [
  { id: "ip-1", orderNumber: "EUR-20260904-0417", title: "LG 43NANO82T6B + JBL Flip 7", provider: "card", months: 12, paid: 1, monthly: 43.08, nextDate: "2026-10-04" },
  { id: "ip-2", orderNumber: "EUR-20260620-1188", title: "INVENTOR IKURA 12.000 BTU + εγκατάσταση", provider: "eurobank", months: 24, paid: 3, monthly: 23.29, nextDate: "2026-09-20" },
];

/** @dynamic Ραντεβού — SoftOne Service (SRVJOB) / ημερολόγιο καταστήματος. */
export const appointments: Appointment[] = [
  { id: "ap-1", kind: "installation", title: "Εγκατάσταση κλιματιστικού", productTitle: "INVENTOR IKURA IKUI/IKUO-12WFI 12.000 BTU", orderNumber: "EUR-20260620-1188", store: "Μπριλάκη Αφοί Ε.Ε. — Μεσογείων 64", technician: "Κ. Νικολάου", date: "2026-06-24", slot: "09:00–13:00", status: "done", notes: "Τοποθέτηση σε μπαλκόνι 2ου ορόφου, 4 m σωλήνωση." },
  { id: "ap-2", kind: "service", title: "Ετήσιος καθαρισμός & συντήρηση", productTitle: "INVENTOR IKURA IKUI/IKUO-12WFI 12.000 BTU", store: "Μπριλάκη Αφοί Ε.Ε. — Μεσογείων 64", technician: "Κ. Νικολάου", date: "2026-09-18", slot: "13:00–17:00", status: "confirmed" },
  { id: "ap-3", kind: "delivery", title: "Παράδοση με ραντεβού", productTitle: "AEG LR7F49GS Πλυντήριο 9kg", store: "Κέντρο διανομής Αχαρνών", date: "2026-09-12", slot: "17:00–20:00", status: "scheduled", notes: "Παραλαβή παλιάς συσκευής για ανακύκλωση." },
];

/** @dynamic Συγκαταθέσεις — consent ledger· κάθε toggle γράφει νέα εγγραφή με timestamp, κανάλι και πηγή (web/app/store). */
export const consents: ConsentPref[] = [
  { topic: "orders", label: "Ενημερώσεις παραγγελίας", help: "Επιβεβαίωση, αποστολή, παράδοση, ραντεβού. Απαραίτητες για την εκτέλεση της παραγγελίας.", channels: { email: true, sms: true, push: true, viber: false }, updated: "2026-09-04" },
  { topic: "price-drop", label: "Πτώση τιμής στη λίστα μου", help: "Μία ειδοποίηση όταν προϊόν της λίστας σου γίνει φθηνότερο ή μπει σε προσφορά.", channels: { email: true, sms: false, push: true, viber: false }, updated: "2026-08-28" },
  { topic: "back-in-stock", label: "Επιστροφή σε απόθεμα", help: "Για προϊόντα που ζήτησες ειδοποίηση διαθεσιμότητας.", channels: { email: true, sms: false, push: false, viber: false }, updated: "2026-08-28" },
  { topic: "service", label: "Υπενθυμίσεις service & εγγύησης", help: "Ετήσια συντήρηση κλιματιστικού, λήξη εγγύησης, επέκταση.", channels: { email: true, sms: true, push: false, viber: false }, updated: "2026-06-24" },
  { topic: "offers", label: "Προσφορές & εκπτώσεις", help: "Εβδομαδιαίες προσφορές, Black Friday, εκδηλώσεις καταστημάτων.", channels: { email: true, sms: false, push: false, viber: false }, updated: "2026-05-12" },
  { topic: "newsletter", label: "Newsletter Euronics", help: "Νέα προϊόντα, οδηγοί αγοράς, νέα καταστήματα. Μία φορά την εβδομάδα.", channels: { email: true, sms: false, push: false, viber: false }, updated: "2021-11-03" },
];
