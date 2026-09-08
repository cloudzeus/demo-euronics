import type { Metadata } from "next";
import { OrderSuccess } from "@/components/checkout/OrderSuccess";

export const metadata: Metadata = { title: "Η παραγγελία καταχωρήθηκε" };

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ no?: string }> }) {
  const { no } = await searchParams;
  return (
    <div className="eu-container">
      <OrderSuccess number={no ?? ""} />
    </div>
  );
}
