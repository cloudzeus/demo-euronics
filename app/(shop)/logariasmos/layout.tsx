import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AccountNav } from "@/components/account/AccountNav";
import { StickySidebar } from "@/components/fluid/StickySidebar";

/** Account shell: sidebar nav (desktop) / horizontal chips (mobile). Demo session — no real auth. */
export default function AccountLayout({ children }: LayoutProps<"/logariasmos">) {
  return (
    <div className="eu-container">
      <Breadcrumbs items={[{ label: "Ο λογαριασμός μου" }]} />
      <div className="eu-canvas eu-gutter pb-12 grid grid-cols-1 @3xl:grid-cols-[260px_minmax(0,1fr)] gap-6 items-stretch">
        <StickySidebar className="min-w-0">
          <AccountNav />
        </StickySidebar>
        <div className="min-w-0 eu-container">{children}</div>
      </div>
    </div>
  );
}
