import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CartView } from "@/components/checkout/CartView";
import { getProductsByIds, getServicesFull } from "@/lib/data/repo";

export const metadata: Metadata = { title: "Καλάθι" };

export default async function CartPage() {
  const [services, crossSell] = await Promise.all([getServicesFull(), getProductsByIds(["r-138705", "r-140497", "r-138544", "r-119009"])]);
  return (
    <div className="eu-container">
      <Breadcrumbs items={[{ label: "Καλάθι" }]} />
      <CartView services={services.filter((s) => s.addonAt?.includes("checkout") || s.addonAt?.includes("pdp"))} crossSell={crossSell} />
    </div>
  );
}
