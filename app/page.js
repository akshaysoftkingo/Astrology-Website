"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  BadgeCheck,
  CircleCheck,
  Compass,
  LockKeyhole,
  MoveRight,
  PhoneCall,
  WandSparkles,
  Zap,
  ZodiacAries,
  ZodiacLeo,
  ZodiacSagittarius,
  Phone,
  MessageCircleQuestionMark,
} from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import AstrologerCard from "../components/AstrologerCard";
import ZodiacCard from "../components/ZodiacCard";
import ImageCard from "../components/ImageCard";
import TrustCard from "../components/TrustCard";
import TestimonialCard from "../components/TestimonialCard";

import {
  services,
  astrologers,
  signs,
  pujas,
  products,
  trustItems,
  testimonials,
} from "../data/astrologyData";

function HeroIllustration() {
  return (
    <div className="hero-art" aria-label="Illustration of a Vedic birth chart">
      <div className="chart-stage">
        <Image
          src="/images/birth-chart.svg"
          alt="Vedic astrology birth chart"
          width={468}
          height={468}
          className="birth-chart-image"
          priority
        />
        <span className="orbit-label orbit-label--top">
          <ZodiacAries size={12} /> Aries
          <i />
        </span>
        <span className="orbit-label orbit-label--right">
          <ZodiacLeo size={14} />
          Leo
          <i />
        </span>
        <span className="orbit-label orbit-label--bottom">
          <ZodiacSagittarius size={12} />
          Sagittarius
          <i />
        </span>
      </div>
      <div className="floating-astrologer">
        <div className="floating-profile">
          <div className="avatar avatar--three">
            <Image
              src="/images/acharya.svg"
              width={500}
              height={500}
              alt="acharya"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[#1B1B1E] font-semibold">Acharya Dev </span>
              <span className="verified">
                <BadgeCheck size={16} />
              </span>
            </div>
            <p className="font-semibold">Vedic • 15+ Yrs Exp</p>
            <div className="flex item-center">
              <small>🟢 Online Now &nbsp;</small>
              <p className="font-semibold"> ₹32/min</p>
            </div>
          </div>
        </div>
        <div className="floating-call">
          <div className="flex item-center gap-1">
            <PhoneCall size={13} className="phone-call" />
            <p className="font-semibold"> ₹32/min</p>
          </div>
          <strong className="flex item-center gap-1">
            <p>Connect</p>
            <ArrowRight size={20} />
          </strong>
        </div>
      </div>
    </div>
  );
}

function KundliSection() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="kundli-panel" id="kundli">
      <div className="kundli-copy">
        <span className="pill">
          <span>
            <WandSparkles size={14} />
          </span>{" "}
          Parashara Vedic Engine
        </span>
        <h2 className="font-bold">Get Your Comprehensive Janam Kundli</h2>
        <p>
          Unlock deep insights into your planetary alignments, Vimshottari
          Dasha, Mangal Dosha, Sadesati status, and career prospects formulated
          through authentic Parashara Vedic calculations.
        </p>
        <div className="feature-list">
          <span>
            <CircleCheck size={100} />
            Instant Birth Chart Calculation
          </span>
          <span>
            <CircleCheck size={100} />
            Dosha & Remedial Solutions
          </span>
          <span>
            <CircleCheck size={100} />
            Career & Wealth Timeline
          </span>
          <span>
            <CircleCheck size={100} />
            100% Free Detailed PDF Download
          </span>
        </div>
      </div>
      <form
        className="kundli-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <h3 className="font-bold">
          {submitted ? "Your Kundli request is ready" : "Enter Birth Details"}
        </h3>
        <p>
          {submitted
            ? "Thanks! Your birth details have been saved for this session."
            : "Accurate time and coordinates ensure precise planetary degree placement"}
        </p>
        <label>
          Full Name
          <input required placeholder="e.g. Aryan Sharma" />
        </label>
        <div className="form-row">
          <label>
            Date of Birth
            <input required type="date" name="dateOfBirth" />
          </label>
          <label>
            Time of Birth
            <span className="time-input-wrap">
              <input
                type="time"
                name="timeOfBirth"
                required
                step="60"
                className="w-full rounded-full bg-white px-4 py-3 text-sm text-gray-800 outline-none border border-gray-100"
              />
            </span>
          </label>
        </div>
        <label>
          Birth City / Place
          <input required placeholder="e.g. New Delhi, India" />
        </label>
        <button className="button button--gold" type="submit">
          {submitted ? "Request Submitted" : "Create Your Kundli"}
          <ArrowRight size={16} />
        </button>
      </form>
    </section>
  );
}

export default function AstrologyHomePage() {
  const [filter, setFilter] = useState("All Experts");
  const [selectedSign, setSelectedSign] = useState(null);
  const filters = [
    "All Experts",
    "Vedic",
    "Tarot Reading",
    "Numerology",
    "Vastu Shastra",
    "Palmistry",
  ];
  const shownAstrologers = astrologers.filter(
    (expert) =>
      filter === "All Experts" ||
      expert.specialty
        .toLowerCase()
        .includes(filter.replace(" Reading", "").toLowerCase()),
  );
  return (
    <>
      <main className="site-shell">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="rating-pill">
              <span>★</span> Rated 4.9/5 by 2.5M+ Seekers across India
            </div>
            <h1 className="text-[20px]">
              Find Clarity and
              <br />
              Guidance for Your Life
            </h1>
            <p className="text-[40px]">
              Connect with certified Vedic astrologers, Tarot readers, and
              Numerologists for authentic 1-on-1 private consultations. Get
              personalized answers to career, love, health, and life decisions.
            </p>
            <div className="hero-actions">
              <Link
                className="button button--gold button--large"
                href="#experts"
              >
                <PhoneCall size={18} />
                Talk to an Astrologer
              </Link>
              <Link
                className="button button--white button--large"
                href="#horoscope"
              >
                <Compass size={20} className="text-[#7D5800]" />
                Explore Your Horoscope
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <div className="bg-[#EFAE2433] p-3 rounded-full">
                  <BadgeCheck size={20} className="text-[#7D5800]" />
                </div>
                <strong>
                  1,500+<small>Verified Gurus</small>
                </strong>
              </div>
              <div>
                <span className="stat-icon blue">
                  <div className="rounded-full">
                    <LockKeyhole size={20} />
                  </div>
                </span>
                <strong>
                  100%<small>Confidential</small>
                </strong>
              </div>
              <div>
                <span className="stat-icon gray">
                  <Zap size={20} />
                </span>
                <strong>
                  &lt; 60s<small>Instant Connect</small>
                </strong>
              </div>
            </div>
          </div>
          <HeroIllustration />
        </section>

        <section className="section-wrap services-section">
          <SectionHeading
            eyebrow="Comprehensive Discovery"
            title="Explore Astrological Services"
            description="Authentic Vedic solutions tailored for every dimension of your spiritual and earthly journey."
            descriptionRight
          />
          <div className="service-grid">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </section>

        <section className="section-wrap experts-section" id="experts">
          <div className="live-pill">
            <i /> 540+ Online Now
          </div>
          <SectionHeading
            title="Talk to Our Expert Astrologers"
            description="Consult top-rated verified astrologers online via real-time text chat or direct audio call"
            action={{ label: "View All 1,500+ Astrologers", href: "#experts" }}
          />
          <div
            className="filter-row"
            role="group"
            aria-label="Filter astrologers"
          >
            {filters.map((item) => (
              <button
                key={item}
                className={
                  filter === item ? "filter-chip active" : "filter-chip"
                }
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="expert-grid">
            {shownAstrologers.map((expert) => (
              <AstrologerCard key={expert.name} astrologer={expert} />
            ))}
          </div>
        </section>

        <section className="section-wrap horoscope-section" id="horoscope">
          <SectionHeading
            eyebrow="Daily Planetary Currents"
            title="Your Daily Horoscope"
            description="Choose your zodiac sign for today's celestial guidance on career, love, health, and wealth"
            centered
          />
          <div className="zodiac-grid">
            {signs.map((sign) => (
              <button
                className="zodiac-button"
                key={sign.name}
                onClick={() =>
                  setSelectedSign(selectedSign === sign.name ? null : sign.name)
                }
                aria-pressed={selectedSign === sign.name}
              >
                <ZodiacCard sign={sign} />
              </button>
            ))}
          </div>
          {selectedSign && (
            <div className="horoscope-result">
              <strong>{selectedSign} horoscope:</strong> The stars favor
              thoughtful conversations and steady progress today. Make time for
              what brings you balance.
            </div>
          )}
          <Link
            className="button button--gold button--large horoscope-cta"
            href="#horoscope"
          >
            Read Your Complete Horoscope
            <MoveRight size={18} />
          </Link>
        </section>

        <div className="section-wrap">
          <KundliSection />
        </div>

        <section className="section-wrap content-section">
          <SectionHeading
            eyebrow="Temple Rituals"
            title="Book Vedic Pujas & Sacred Rituals"
            description="Personalized rituals performed by experienced priests at holy temples with your name and sankalp"
            descriptionNoWrap
            action={{ label: "View All 24+ Temple Pujas", href: "#pujas" }}
          />
          <div className="puja-grid" id="pujas">
            {pujas.map((item) => (
              <ImageCard key={item.title} item={item} kind="puja" />
            ))}
          </div>
        </section>

        <section className="section-wrap content-section">
          <SectionHeading
            eyebrow="Authentic Remedies"
            title="Sacred Spiritual Store"
            description="100% Certified, energized, and lab-tested astrological items backed by authenticity certificates"
            descriptionNoWrap
            action={{
              label: "Explore Entire Store (250+ Items)",
              href: "#store",
            }}
          />
          <div className="product-grid" id="store">
            {products.map((item) => (
              <ImageCard key={item.title} item={item} kind="product" />
            ))}
          </div>
        </section>

        <section className="section-wrap trust-section">
          <SectionHeading
            eyebrow="Uncompromising Trust"
            title={
              <>
                Why 2.5 Million+ Seekers Trust Astro
                <span className="gold-text">Mul</span>
              </>
            }
            description="Ancient wisdom rendered through contemporary security and uncompromising ethics."
            descriptionNoWrap
            centered
          />
          <div className="trust-grid">
            {trustItems.map((item) => (
              <TrustCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section className="section-wrap testimonials-section">
          <SectionHeading
            eyebrow="Seeker Journeys"
            title="Real Experiences from Our Seekers"
            action={{
              label: "4.9 Average Seeker Rating",
              stars: 5,
              href: "#reviews",
            }}
          />
          <div className="testimonial-grid" id="reviews">
            {testimonials.map((item) => (
              <TestimonialCard key={item.name} item={item} />
            ))}
          </div>
        </section>
      </main>

      <section className="consultation-banner section-wrap" id="contact">
        <div className="consultation-icon">
          <MessageCircleQuestionMark size={22} />
        </div>
        <div className="consultation-copy">
          <strong>First consultation query on your mind?</strong>
          <span>
            Speak with top Vedic Acharyas directly via secure private audio call
            or chat
          </span>
        </div>
        <Link className="button button--gold" href="#experts">
          <Phone size={18} />
          Start Consultation
        </Link>
      </section>
    </>
  );
}
