/**
 * @dynamic «Οι συσκευές μου» — everything electronic per purchased
 * appliance: warranty (legal 2 years + bought extension), service history
 * (SoftOne SRVJOB), documents (receipt/invoice PDF from SALDOC, warranty
 * certificate, manual and EU energy label from the PIM/EPREL), the
 * manufacturer hotline and the recycling/trade-in offer. Demo fixture keyed
 * by productId; production joins orders × SRVJOB × PIM.
 */
export interface ServiceEvent {
  date: string;
  kind: "install" | "repair" | "check" | "ticket";
  title: string;
  detail: string;
  status: "done" | "open" | "scheduled";
  technician?: string;
  cost?: number;
}
export interface DeviceDocs {
  receipt?: string;
  warranty?: string;
  manual?: string;
  energyLabel?: string;
}
export interface DeviceInfo {
  productId: string;
  serial: string;
  docs: DeviceDocs;
  service: ServiceEvent[];
  hotline?: string;
  tradeIn?: number;
  tips?: string[];
}

export const devices: DeviceInfo[] = [
  {
    productId: "p-lg-43nano82",
    serial: "409MAKB3T7521",
    docs: { receipt: "/docs/receipt-EUR-20260904-0417.pdf", warranty: "/docs/warranty-409MAKB3T7521.pdf", manual: "https://www.lg.com/gr/support/manuals", energyLabel: "https://eprel.ec.europa.eu/" },
    service: [{ date: "2026-09-06", kind: "install", title: "Παράδοση & τοποθέτηση σε βάση τοίχου", detail: "Τεχνικός καταστήματος Μπριλάκη · ρύθμιση εικόνας", status: "done", technician: "Ν. Καραμανλής" }],
    hotline: "801 11 200 900",
    tips: ["Ενημέρωση webOS διαθέσιμη (26.10) — γίνεται από το μενού Ρυθμίσεις", "Καθάρισε την οθόνη μόνο με στεγνό πανί μικροϊνών"],
  },
  {
    productId: "p-jbl-flip-7",
    serial: "JBL7-2K8Q-1193",
    docs: { receipt: "/docs/receipt-EUR-20260904-0417.pdf", manual: "https://support.jbl.com/" },
    service: [],
    hotline: "210 6 30 40 50",
  },
  {
    productId: "p-philips-airfryer",
    serial: "PH9285-88112-A",
    docs: { receipt: "/docs/receipt-EUR-20260812-0093.pdf", manual: "https://www.philips.gr/support" },
    service: [{ date: "2026-08-30", kind: "ticket", title: "Ερώτηση: θόρυβος ανεμιστήρα", detail: "Απαντήθηκε από το κατάστημα — φυσιολογικός στα 200 °C", status: "done" }],
    hotline: "2111 983 029",
    tradeIn: 15,
    tips: ["Καθάρισε το καλάθι μετά από κάθε χρήση, μπαίνει στο πλυντήριο πιάτων"],
  },
];
