import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import connectDB from "../../lib/mongodb";
import { Toaster } from "sonner";

export const metadata = {
  title: "MenuPage - Menús digitales",
  description:
    "MenuPage ofrece páginas y menús digitales fáciles de usar para restaurantes y negocios. Personaliza tu menú con nuestra plataforma intuitiva y atrae a más clientes. QR para menus.",
};

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  connectDB();

  return (
    <html lang="es" data-theme="light">
      <body className={`${inter.className} antialiased`}>
        <QueryProvider>
          <Toaster richColors position="top-center" />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
