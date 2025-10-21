import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The 1Start Foundation",
  description: "Governing the Protocol for Global Trust",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}