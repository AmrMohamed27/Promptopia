import "@styles/globals.css";
import Navbar from "@components/Navbar";
import AuthProvider from "./context/AuthProvider";
import Footer from "@components/Footer";
import Background from "@components/Background";
import { DarkModeProvider } from "@components/DarkModeContext";

export const metadata = {
  title: "Promptopia",
  description: "Discover and Share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <DarkModeProvider>
      <html lang="en">
        <body className="relative dark:bg-black dark:text-white">
          <AuthProvider>
            <Background />
            <main className="app relative">
              <Navbar />
              <div className="mt-20">{children}</div>
              <Footer />
            </main>
          </AuthProvider>
        </body>
      </html>
    </DarkModeProvider>
  );
}
