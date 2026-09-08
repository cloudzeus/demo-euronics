import type { Metadata } from "next";
import { getCustomer } from "@/lib/data/repo";
import { ProfileForm } from "@/components/account/ProfileForm";

export const metadata: Metadata = { title: "Τα στοιχεία μου" };

/** @dynamic /logariasmos/stoixeia — `getCustomer(session)` → SoftOne CUSTOMER; writes go through the account API with audit. */
export default async function ProfilePage() {
  const c = await getCustomer();
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <h1 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-26)]">Τα στοιχεία μου</h1>
        <p className="m-0 mt-1 text-eu-muted text-[length:var(--fs-15)]">Πελάτης #{c.id} · μέλος από {new Date(c.memberSince).toLocaleDateString("el-GR", { month: "long", year: "numeric" })}</p>
      </div>
      <ProfileForm customer={c} />
    </div>
  );
}
