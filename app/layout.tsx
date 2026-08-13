import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

import { AuthProvider } from "@/context/AuthContext";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jardin Bezoli",
  description: "Jardin Bezoli: Una colección exclusiva de plantas carnívoras.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} bg-bezoli-dark text-gray-100 min-h-screen`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
            <CartSidebar />
            <WhatsAppButton />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
