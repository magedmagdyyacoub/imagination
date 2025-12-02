"use client"; // ← مهم جدًا عشان يكون Client Component
import { SessionProvider } from "next-auth/react";

export default function RootClientProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
