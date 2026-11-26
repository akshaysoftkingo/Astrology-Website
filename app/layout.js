import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "AstroMul — Vedic Astrology & Guidance",
  description: "Find clarity with trusted Vedic astrologers, daily horoscopes, Janam Kundli, sacred rituals, and authentic spiritual remedies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
