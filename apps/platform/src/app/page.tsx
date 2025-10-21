import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { Header } from "@/components/Header"; 

// Force Vercel to trigger a new deployment - 2025-09-22

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> 

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">
            The Starting Point of Trust for the Global Economy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Global Verification. Boundless Commerce.
          </p>
        </div>
        <div className="mt-8">
          <ConnectWalletButton />
        </div>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-center w-full h-24 border-t border-gray-200 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-400">© 2025 1Start.io. All rights reserved.</p>
      </footer>
    </div>
  );
}