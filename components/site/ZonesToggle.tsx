"use client";

import { useEffect } from "react";

/** ?zones=1 shows the numbered zone badges of the design (review mode). */
export function ZonesToggle({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (enabled) document.documentElement.dataset.zones = "1";
    else delete document.documentElement.dataset.zones;
  }, [enabled]);
  return null;
}
