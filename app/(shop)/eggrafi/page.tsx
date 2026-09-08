import type { Metadata } from "next";
import { AuthForm } from "@/components/account/AuthForm";

export const metadata: Metadata = { title: "Εγγραφή" };

export default function RegisterPage() {
  return (
    <div className="eu-container">
      <div className="eu-canvas eu-gutter py-10 max-w-[560px]">
        <AuthForm mode="register" />
      </div>
    </div>
  );
}
