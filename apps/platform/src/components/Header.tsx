'use client';

import { memo } from 'react'; // Importar 'memo'
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

// Primero, definimos el componente como una función normal.
function HeaderComponent() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200 dark:border-gray-800">
      <a className="flex items-center justify-center" href="#">
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-50">1Start.io</span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <ThemeSwitcher />
      </nav>
    </header>
  );
}

// Luego, exportamos la versión "memorizada".
export const Header = memo(HeaderComponent);