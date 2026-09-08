import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CartView } from "@/components/checkout/CartView";
import { getProductsByIds, getServicesFull } from "@/lib/data/repo";

export const metadata: Metadata = { title: "Καλάθι" };

export default async function CartPage() {
  const [services, crossSell] = await Promise.all([getServicesFull(), getProductsByIds(["p-jbl-flip-7", "p-philips-airfryer", "p-rowenta-iron"])]);
  return (
    <div className="eu-container">
      <Breadcrumbs items={[{ label: "Καλάθι" }]} />
      <CartView services={services.filter((s) => s.addonAt?.includes("checkout") || s.addonAt?.includes("pdp"))} crossSell={crossSell} />
    </div>
  );
}
