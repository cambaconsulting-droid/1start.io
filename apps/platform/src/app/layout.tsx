import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import dynamic from 'next/dynamic';

// Importamos nuestro nuevo proveedor de forma dinámica CON SSR DESACTIVADO
const ClientWeb3Provider = dynamic(
  () => import('@/lib/ClientWeb3Provider').then((mod) => mod.ClientWeb3Provider),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "1Start.io",
  description: "The Starting Point of Trust for the Global Economy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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