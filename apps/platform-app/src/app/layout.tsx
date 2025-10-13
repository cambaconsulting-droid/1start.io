import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import dynamic from 'next/dynamic';

const ClientWeb3Provider = dynamic(
  () => import('@/lib/ClientWeb3Provider').then((mod) => mod.ClientWeb3Provider),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "1Start Platform",
  description: "The Operating System for Programmable Trust",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ClientWeb3Provider>
            {children}
          </ClientWeb3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}