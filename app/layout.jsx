import "@styles/globals.css";
import Navbar from "@components/navbar/Navbar";
import AuthProvider from "./context/AuthProvider";
import Footer from "@components/common/Footer";
import Background from "@components/common/Background";
import { DarkModeProvider } from "@components/common/DarkModeContext";
import { PostsProvider } from "@components/common/PostsContext";

export const metadata = {
  title: "Promptopia",
  description: "Discover and Share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <PostsProvider>
        <DarkModeProvider>
          <html lang="en">
            <body className="relative dark:bg-black dark:text-white">
              <Background />
              <main className="app relative">
                <Navbar />
                <div className="mt-20 w-full">{children}</div>
                <Footer />
              </main>
            </body>
          </html>
        </DarkModeProvider>
      </PostsProvider>
    </AuthProvider>
  );
}
