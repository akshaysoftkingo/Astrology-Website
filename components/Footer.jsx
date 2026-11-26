import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  CircleLetterC,
  Globe,
  Hash,
  LockKeyhole,
  Mail,
  Play,
  RectangleLandscapePlay,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const homeAnchor = (section) => `/#${section}`;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="footer-about">
          <Link href="/" className="footer-brand">
            <Image src="/images/logo.svg" width={34} height={34} alt="" />
            <span>
              Astro<strong className="text-[#EFAE24]">Mul</strong>
            </span>
          </Link>
          <p>
            India&apos;s trusted Vedic astrology &amp; spiritual guidance
            platform. Connecting sincere seekers with verified authentic
            celestial consultants worldwide.
          </p>
          <div className="footer-trust-badges">
            <span>
              <i /> 100% Certified Gurus
            </span>
            <span>
              <ShieldCheck size={13} /> Encrypted Calls
            </span>
          </div>
          <strong className="footer-app-label">Download our mobile app</strong>
          <div className="footer-app-links">
            <Link href={homeAnchor("contact")} className="app-download">
              <Play size={21} fill="currentColor" aria-hidden="true" />
              <span>
                <small>Get it on</small>Google Play
              </span>
            </Link>
            <Link href={homeAnchor("contact")} className="app-download">
              <Smartphone size={20} aria-hidden="true" />
              <span>
                <small>Download on the</small>App Store
              </span>
            </Link>
          </div>
        </div>

        <nav className="footer-column" aria-label="Our services">
          <h2>Our Services</h2>
          <Link href={homeAnchor("experts")}>Chat with Astrologer</Link>
          <Link href={homeAnchor("experts")}>Audio Consultation</Link>
          <Link href={homeAnchor("kundli")}>Free Janam Kundli</Link>
          <Link href={homeAnchor("horoscope")}>Daily Horoscope</Link>
          <Link href={homeAnchor("pujas")}>Book Puja</Link>
          <Link href={homeAnchor("store")}>Store</Link>
        </nav>

        <nav className="footer-column" aria-label="Support and trust">
          <h2>Support &amp; Trust</h2>
          <Link href={homeAnchor("contact")}>24×7 Helpdesk</Link>
          <Link href={homeAnchor("contact")}>100% Privacy Guarantee</Link>
          <Link href={homeAnchor("experts")}>Verified Astrologers</Link>
          <Link href={homeAnchor("contact")}>Terms &amp; Conditions</Link>
          <Link href={homeAnchor("contact")}>Refund Policy</Link>
        </nav>

        <div className="footer-column footer-contact">
          <h2>Contact &amp; Connect</h2>
          <a href="mailto:support@astromul.com" className="footer-email">
            <Mail size={16} aria-hidden="true" /> support@astromul.com
          </a>
          <p className="text-[#504534] text-[15px]">
            For enterprise and ceremonial <br />
            queries.
          </p>
          <div className="footer-socials" aria-label="Social links">
            <a href={homeAnchor("contact")} aria-label="Instagram">
              <Camera size={21} />
            </a>
            <a href={homeAnchor("contact")} aria-label="YouTube">
              <RectangleLandscapePlay size={21} />
            </a>
            <a href={homeAnchor("contact")} aria-label="Community">
              <Hash size={21} />
            </a>
            <a href={homeAnchor("contact")} aria-label="Website">
              <Globe size={21} />
            </a>
          </div>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span className="flex item-center gap-1">
          <CircleLetterC size={12} className="mt-1" />
          <p className="text-[14px]">2026 AstroMul Inc. All rights reserved.</p>
        </span>
        <span className="flex item-center gap-1">
          <LockKeyhole size={14} />
          <p className="text-[#504534]">ISO 27001 Certified Security</p>
        </span>
      </div>
    </footer>
  );
}
