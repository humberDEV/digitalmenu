import { Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import connectDB from "../../lib/mongodb";
import { Toaster } from "sonner";

export const metadata = {
  title: "MenuPage - Menús digitales",
  description:
    "MenuPage ofrece páginas y menús digitales fáciles de usar para restaurantes y negocios. Personaliza tu menú con nuestra plataforma intuitiva y atrae a más clientes. QR para menus.",
};

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  connectDB();

  return (
    <html lang="en" data-theme="light">
      <body className={`${poppins.className} antialiased`}>
        <QueryProvider>
          <Toaster richColors position="top-center" />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
