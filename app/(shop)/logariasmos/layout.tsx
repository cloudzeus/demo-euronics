import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AccountNav } from "@/components/account/AccountNav";

/** Account shell: sidebar nav (desktop) / horizontal chips (mobile). Demo session — no real auth. */
export default function AccountLayout({ children }: LayoutProps<"/logariasmos">) {
  return (
    <div className="eu-container">
      <Breadcrumbs items={[{ label: "Ο λογαριασμός μου" }]} />
      <div className="eu-canvas eu-gutter pb-12 grid grid-cols-1 @lg:grid-cols-[240px_minmax(0,1fr)] gap-6 items-start">
        <AccountNav />
        <div className="min-w-0 eu-container">{children}</div>
      </div>
    </div>
  );
}
