"use client";

import { Plus, User, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../app/navbar.css";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/", active: true },
  { name: "Talk to Astrologer", href: "/astrologers" },
  { name: "Horoscope", href: "/horoscope" },
  { name: "Kundli", href: "/kundli" },
  { name: "Kundli Matching", href: "/matching" },
  { name: "Puja", href: "/puja" },
  { name: "Store", href: "/store" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <div className="logo-icon">
            <Image
              src="/images/logo.svg"
              alt="AstroMul"
              width={32}
              height={32}
            />
          </div>
          <p className="logo-text flex items-center">
            Astro <span className="logo-accent">Mul</span>
          </p>
        </Link>

        {/* Desktop Nav Links */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`nav-link ${pathname === link.href || (link.href === "/astrologers" && pathname.startsWith("/astrologers/")) ? "is-active" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Wallet */}
          <div className="wallet">
            <Wallet size={16} className="wallet-icon" />
            <span className="wallet-amount">₹250</span>
            <button className="wallet-add" aria-label="Add funds">
              <Plus size={16} />
            </button>
          </div>

          {/* Login/Signup */}
          <Link href="/login" className="btn-login font-[#1B1B1E]">
            Login/Signup
          </Link>

          {/* Profile */}
          <button className="avatar" aria-label="Profile">
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
