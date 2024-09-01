import "@styles/globals.css";
import Navbar from "@components/Navbar";
import AuthProvider from "./context/AuthProvider";
import Footer from "@components/Footer";
export const metadata = {
  title: "Promptopia",
  description: "Discover and Share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <AuthProvider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
