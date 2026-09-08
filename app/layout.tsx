import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { DeviceProvider } from "@/components/fluid/DeviceProvider";
import { getDevice } from "@/lib/device";
import "./globals.css";

// Brand typeface "Euronics" is proprietary. Manrope (variable, Greek +
// Latin from ONE family) replaces the Poppins+Manrope pair: mixing two
// families per glyph gave Greek text different weights and metrics.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["greek", "latin"],
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
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-eu-ink">
        <DeviceProvider initial={{ device, touch, saveData }}>{children}</DeviceProvider>
      </body>
    </html>
  );
}
