import { Poppins } from "next/font/google";
import "./globals.css";

import connectDB from "../../lib/mongodb";

import { Toaster } from "sonner";

export const metadata = {
  title: "DigiMenu - Menús digitales para restaurantes",
  description:
    "DigiMenu ofrece menús digitales fáciles de usar para restaurantes y negocios. Personaliza tu menú con nuestra plataforma intuitiva.",
};

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  // try to connect to mongodb
  connectDB();

  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {" "}
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}
