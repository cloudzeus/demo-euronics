import type { Metadata, Viewport } from "next";
import { Manrope, Poppins } from "next/font/google";
import { DeviceProvider } from "@/components/fluid/DeviceProvider";
import { getDevice } from "@/lib/device";
import "./globals.css";

// Brand typeface "Euronics" is proprietary; Poppins is the design-system
// substitute (latin) with Manrope covering Greek glyphs.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["greek", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "euronics.gr — Πρόταση ανασχεδιασμού", template: "%s · euronics" },
  description: "Νέο frontend euronics.gr: 350 καταστήματα, 12 υπηρεσίες, αγορά σε ένα βήμα.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1d428a",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { device, touch, saveData } = await getDevice();
  return (
    <html
      lang="el"
      data-device={device}
      className={`${poppins.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-eu-ink">
        <DeviceProvider initial={{ device, touch, saveData }}>{children}</DeviceProvider>
      </body>
    </html>
  );
}
