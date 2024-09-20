import "@styles/globals.css";
import Navbar from "@components/navbar/Navbar";
import Footer from "@components/common/Footer";
import Background from "@components/common/Background";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Promptopia",
  description: "Discover and Share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative dark:bg-black dark:text-white">
        <Providers>
          <div className="block dark:hidden">
            <Background />
          </div>
          <main className="app relative">
            <Navbar />
            <div className="mt-20 w-full">{children}</div>
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
