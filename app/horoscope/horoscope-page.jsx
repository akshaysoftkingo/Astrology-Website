"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import {
  BookOpenText,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Hash,
  Heart,
  HeartPulse,
  Palette,
  PhoneCall,
  Share2,
  Sparkles,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { signs } from "@/data/homepage";
import { horoscopeLuckyDetails, rulingPlanets } from "@/data/horoscope";

import { zodiacIcons } from "@/components/ZodiacCard";

import { formatDate, localDateInputValue, moveDate } from "@/utils/date";

import "./horoscope.css";

function buildForecast(sign, index, period, date) {
  const timeframe = period.toLowerCase();
  const elementCopy = {
    Fire: "Your natural initiative is strong, and a measured first step can turn today's momentum into lasting progress.",
    Earth:
      "Practical planning brings the clearest results. Focus on steady progress and give important decisions room to settle.",
    Air: "Fresh conversations and flexible thinking open useful doors. Listen closely before committing to a new direction.",
    Water:
      "Trust your intuition while keeping your plans grounded. A little quiet reflection helps you find the right balance.",
  };
  return {
    dateLabel: formatDate(date, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    overview:
      sign.name === "Aries"
        ? "Today brings an intense wave of transformative energy for Aries natives. As Mars forms a powerful trine with Jupiter, your natural leadership and dynamic drive are amplified. You may encounter crucial decision points in professional spheres that require bold yet calculated moves. Trust your intuitive impulses, but remain grounded against impulsive overreactions in personal conversations. Evening hours favor peaceful retrospection and meditative alignment."
        : `${timeframe === "daily" ? "Today" : `This ${timeframe}`} brings ${elementCopy[sign.element].toLowerCase()} ${sign.name} natives. ${sign.message} Keep your priorities clear and make space for thoughtful conversations, small, consistent choices can shape a more satisfying outcome.`,
    categories: [
      {
        title: "Love & Relationships",
        status: index % 3 === 0 ? "Favourable" : "Warm connections",
        rating: index % 4 === 2 ? "4.0/5" : "4.5/5",
        icon: Heart,
        color: "rose",
        text: "Romance takes an uplifting turn today. If committed, shared ambitions bring you closer to your partner. Single Aries couldexperience an unexpected spark through professional networking or spiritual circles.",
      },
      {
        title: "Career & Business",
        status: index % 3 === 1 ? "High momentum" : "Steady progress",
        rating: index % 5 === 0 ? "4.5/5" : "4.0/5",
        icon: TrendingUp,
        color: "blue",
        text: "Your workplace performance captures senior attention. High momentum allows you to clear pending projects smoothly. Entrepreneurs will find favorable terrain in closing partnership deals during afternoon hours.",
      },
      {
        title: "Money & Finance",
        status: index % 2 === 0 ? "Moderate" : "Promising",
        rating: index % 3 === 0 ? "3.5/5" : "4.0/5",
        icon: Wallet,
        color: "green",
        text: "Financial streams remain steady, but avoid speculative ventures or sudden high-ticket acquisitions today. Focus on long-term portfolio balancing and clearing outstanding utility liabilities.",
      },
      {
        title: "Health & Wellness",
        status: index % 2 === 0 ? "Balanced" : "Restore your energy",
        rating: index % 4 === 0 ? "4.0/5" : "4.5/5",
        icon: HeartPulse,
        color: "purple",
        text: "Vitality is strong, though minor muscular tension in the upper neck may occur due to hectic pacing. Incorporate light stretching and hydration to maintain equilibrium throughout the day.",
      },
    ],
    lucky: horoscopeLuckyDetails[sign.name],
  };
}

export default function HoroscopePage() {
  const [period, setPeriod] = useState("Daily");
  const [selectedDate, setSelectedDate] = useState(null);
  const [today, setToday] = useState(null);
  const [selectedSign, setSelectedSign] = useState("Aries");
  const [copied, setCopied] = useState(false);
  const dateInputRef = useRef(null);
  const selectedIndex = signs.findIndex((sign) => sign.name === selectedSign);
  const sign = signs[selectedIndex] || signs[0];
  const ZodiacIcon = zodiacIcons[sign.name];
  const forecast = useMemo(
    () =>
      buildForecast(
        sign,
        Math.max(0, selectedIndex),
        period,
        new Date(selectedDate),
      ),
    [sign, selectedIndex, period, selectedDate],
  );

  useEffect(() => {
    const currentDate = new Date();
    setToday(currentDate);
    setSelectedDate(currentDate);
  }, []);

  const selectRelativeDate = (offset) => {
    setSelectedDate((current) => moveDate(current, offset, period));
  };

  const chooseDate = (event) => {
    const [year, month, day] = event.target.value.split("-").map(Number);
    if (year && month && day) setSelectedDate(new Date(year, month - 1, day));
  };

  const shareForecast = async () => {
    const shareText = `${sign.name} ${period.toLowerCase()} horoscope for ${forecast.dateLabel}: ${forecast.overview}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${sign.name} Horoscope`,
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // The share sheet can be dismissed without sharing.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  if (!today || !selectedDate) {
    return (
      <main className="horoscope-page">
        <div
          className="horoscope-container horoscope-loading"
          aria-label="Loading horoscope"
        />
      </main>
    );
  }

  return (
    <main className="horoscope-page">
      <div className="horoscope-container">
        <nav className="horoscope-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={17} />
          <strong>Horoscope</strong>
        </nav>

        <section className="horoscope-hero">
          <div className="horoscope-hero-copy">
            <span className="horoscope-eyebrow">
              <Sparkles size={17} /> Celestial Guidance
            </span>
            <h1>Daily Horoscope</h1>
            <p>
              Discover what the movements of celestial bodies have aligned for
              your sign today. Receive expert astrological forecasts for love,
              career, finance, and wellness.
            </p>
          </div>
          <div
            className="horoscope-period-tabs"
            role="tablist"
            aria-label="Horoscope period"
          >
            {["Daily", "Weekly", "Monthly"].map((item) => (
              <button
                key={item}
                className={period === item ? "is-selected" : ""}
                onClick={() => setPeriod(item)}
                role="tab"
                aria-selected={period === item}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section
          className="horoscope-datebar"
          aria-label="Choose forecast date"
        >
          {period === "Daily" ? (
            <>
              <button onClick={() => selectRelativeDate(-1)}>Yesterday</button>
              <button
                className="horoscope-date-current"
                onClick={() => setSelectedDate(new Date())}
              >
                <i /> Today, {formatDate(today)}
              </button>
              <button onClick={() => selectRelativeDate(1)}>Tomorrow</button>
            </>
          ) : (
            <>
              <button onClick={() => selectRelativeDate(-1)}>
                <ChevronLeft size={17} /> Previous{" "}
                {period === "Weekly" ? "Week" : "Month"}
              </button>
              <button
                className="horoscope-date-current"
                onClick={() => setSelectedDate(new Date())}
              >
                <i /> Current {period === "Weekly" ? "Week" : "Month"}
              </button>
              <button onClick={() => selectRelativeDate(1)}>
                Next {period === "Weekly" ? "Week" : "Month"}{" "}
                <ChevronRight size={17} />
              </button>
            </>
          )}
          <label className="horoscope-pick-date">
            <CalendarDays size={18} /> Pick Date
            <input
              ref={dateInputRef}
              type="date"
              value={localDateInputValue(selectedDate)}
              onChange={chooseDate}
              aria-label="Pick horoscope date"
            />
          </label>
        </section>

        <section
          className="horoscope-sign-section"
          aria-labelledby="horoscope-sign-heading"
        >
          <div className="horoscope-section-heading">
            <h2 id="horoscope-sign-heading">Select Your Zodiac Sign</h2>
            <span>Showing all 12 celestial houses</span>
          </div>
          <div className="horoscope-sign-grid">
            {signs.map((item) => {
              const Icon = zodiacIcons[item.name];
              const selected = selectedSign === item.name;
              return (
                <button
                  key={item.name}
                  className={`horoscope-sign-card${selected ? " is-selected" : ""}`}
                  onClick={() => setSelectedSign(item.name)}
                  aria-pressed={selected}
                >
                  <span className="horoscope-sign-icon">
                    <Icon size={28} strokeWidth={1.8} />
                  </span>
                  <strong>{item.name}</strong>
                  <small>
                    {item.element} <i /> {rulingPlanets[item.name]}
                  </small>
                </button>
              );
            })}
          </div>
        </section>

        <article className="horoscope-reading-card">
          <header className="horoscope-reading-header">
            <span className="horoscope-reading-symbol">
              <ZodiacIcon size={42} />
            </span>
            <div className="horoscope-reading-title">
              <div>
                <h2>
                  {sign.name} {period} Horoscope
                </h2>
                <span className="horoscope-reading-date">
                  {forecast.dateLabel}
                </span>
              </div>
              <p>
                Ruling Planet: <strong>{rulingPlanets[sign.name]}</strong>
                <i /> Element: <strong>{sign.element}</strong>
              </p>
            </div>
            <button className="horoscope-share-button" onClick={shareForecast}>
              {copied ? <Check size={18} /> : <Share2 size={18} />}
              {copied ? "Copied" : "Share Horoscope"}
            </button>
          </header>
          <div className="horoscope-lucky-grid">
            <div>
              <span>
                <Hash size={21} color="#7D5800" />
              </span>
              <small>Lucky Number</small>
              <strong>{forecast.lucky.number}</strong>
            </div>
            <div>
              <span className="lucky-color-dot">
                <Palette size={21} color="#7D5800" />
              </span>
              <small>Lucky Colour</small>
              <strong>{forecast.lucky.color}</strong>
            </div>
            <div>
              <span>
                <Clock size={21} />
              </span>
              <small>Auspicious Time</small>
              <strong>{forecast.lucky.time}</strong>
            </div>
            <div>
              <span>
                <Compass size={21} />
              </span>
              <small>Favourable Direction</small>
              <strong>{forecast.lucky.direction}</strong>
            </div>
          </div>
          <section className="horoscope-overview">
            <h3>General Transit Overview</h3>
            <p>{forecast.overview}</p>
          </section>
          <div className="horoscope-category-grid">
            {forecast.categories.map((category) => {
              const Icon = category.icon;
              return (
                <section
                  className="horoscope-category-card"
                  key={category.title}
                >
                  <div className="horoscope-category-heading">
                    <span
                      className={`horoscope-category-icon is-${category.color}`}
                    >
                      <Icon size={25} />
                    </span>
                    <div>
                      <h3>{category.title}</h3>
                      <strong>{category.status}</strong>
                    </div>
                    <span className="horoscope-score">
                      <Star size={15} /> {category.rating}
                    </span>
                  </div>
                  <p>{category.text}</p>
                </section>
              );
            })}
          </div>
        </article>

        <section className="horoscope-guidance-cta">
          <span>
            <BookOpenText size={30} />
          </span>
          <div>
            <h2>Need Personalised Guidance for Your Kundli?</h2>
            <p>
              Connect directly with India&apos;s top certified Vedic astrologers
              for deep 1-on-1 consultations.
            </p>
          </div>
          <Link href="/astrologers">
            <PhoneCall size={18} /> Talk to an Astrologer{" "}
          </Link>
        </section>
      </div>
    </main>
  );
}
