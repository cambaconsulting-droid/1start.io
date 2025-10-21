"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Definimos explícitamente el tipo de las props
interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}