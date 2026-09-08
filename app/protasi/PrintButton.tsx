"use client";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="rounded-full bg-eu-navy text-white px-4 py-2 font-extrabold hover:bg-eu-blue min-h-10">
      Εκτύπωση / PDF
    </button>
  );
}
