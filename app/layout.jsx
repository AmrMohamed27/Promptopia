import "@styles/globals.css";
import Navbar from "@components/navbar/Navbar";
import Footer from "@components/common/Footer";
import Background from "@components/common/Background";
import { Providers } from "./providers";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Promptopia",
  description: "Discover and Share AI Prompts",
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
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
