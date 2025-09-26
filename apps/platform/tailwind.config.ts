import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    // Rutas explícitas a todas las carpetas que contienen clases de Tailwind
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config