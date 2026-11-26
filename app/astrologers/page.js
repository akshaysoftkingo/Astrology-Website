"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  BadgeCheck,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Hourglass,
  LockKeyhole,
  MessageSquareText,
  Phone,
  RefreshCcw,
  Search,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";

import {
  directoryAstrologers as consultants,
  directorySpecialties as specialties,
  directoryFilterOptions as filterOptions,
} from "../../data/astrologyData";

import "./astrologers.css";

function ConsultantCard({ person }) {
  const [notice, setNotice] = useState("");
  return (
    <article className="directory-card">
      <Link
        href={`/astrologers/${person.slug}`}
        className="consultant-profile-link"
      >
        <div className="directory-card-top">
          <span
            className={`availability ${person.online ? "is-online" : "is-offline"}`}
          >
            <i />
            {person.online ? "Online" : "Offline"}
          </span>
          <span className="experience-pill">{person.experience}+ Yrs</span>
        </div>
        <div className="consultant-info">
          <Image
            src={person.image}
            className="consultant-avatar"
            width={60}
            height={60}
            alt="astrologer-image"
          />
          <div className="consultant-copy">
            <h2>
              {person.name} <BadgeCheck size={20} fill="currentColor" />
            </h2>
            <p>{person.specialty}</p>
            <small>{person.languages}</small>
          </div>
        </div>
        <div className="consultant-rating">
          <span>
            <Star size={17} fill="currentColor" />{" "}
            <b>{person.rating.toFixed(1)}</b>{" "}
            <small className="mt-1">({person.reviews})</small>
          </span>
          <strong>
            ₹{person.rate} <small>/ min</small>
          </strong>
        </div>
      </Link>
      {person.online ? (
        <div className="consultant-actions">
          <button
            onClick={() =>
              setNotice(`Chat request started with ${person.name}`)
            }
          >
            <MessageSquareText size={17} />
            Chat
          </button>
          <button
            className="call-action"
            onClick={() =>
              setNotice(`Call request started with ${person.name}`)
            }
          >
            <Phone size={17} />
            Call
          </button>
        </div>
      ) : (
        <div className="consultant-actions">
          <button
            onClick={() =>
              setNotice(`${person.name} has been added to your queue`)
            }
          >
            <Hourglass size={17} />
            Queue
          </button>
          <button
            onClick={() =>
              setNotice(`We'll notify you when ${person.name} is online`)
            }
          >
            <Bell size={17} />
            Notify
          </button>
        </div>
      )}
      {notice && (
        <p className="card-notice" role="status">
          {notice}
        </p>
      )}
    </article>
  );
}

export default function AstrologersPage() {
  const [query, setQuery] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState(specialties[0]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const visible = useMemo(() => {
    let list = consultants.filter((person) => {
      const searchMatches =
        `${person.name} ${person.specialty} ${person.languages}`
          .toLowerCase()
          .includes(query.toLowerCase());
      const spec = activeSpecialty.toLowerCase();
      const categoryMatches =
        activeSpecialty === specialties[0] ||
        (spec.includes("love")
          ? /relationship|tarot/i.test(person.specialty)
          : spec.includes("career")
            ? /career|wealth/i.test(person.specialty)
            : spec.includes("vedic")
              ? /vedic|kundli|vastu/i.test(person.specialty)
              : spec.includes("tarot")
                ? /tarot/i.test(person.specialty)
                : person.specialty.toLowerCase().includes(spec.split(" ")[0]));
      const f = filters;
      return (
        searchMatches &&
        categoryMatches &&
        (!f.Language ||
          f.Language === "All Languages" ||
          person.languages.includes(f.Language)) &&
        (!f.Experience ||
          f.Experience === "All Experience" ||
          person.experience >= Number.parseInt(f.Experience)) &&
        (!f.Rating ||
          f.Rating === "All Ratings" ||
          person.rating >= Number.parseFloat(f.Rating)) &&
        (!f.Availability ||
          f.Availability === "All Status" ||
          person.online === (f.Availability === "Online")) &&
        (!f.Expertise ||
          f.Expertise === "All Specialties" ||
          person.specialty.toLowerCase().includes(f.Expertise.toLowerCase())) &&
        (!f.Type ||
          f.Type === "All Types" ||
          person.specialty.toLowerCase().includes(f.Type.toLowerCase()))
      );
    });
    if (filters["Sort By"] === "Top Rated")
      list.sort((a, b) => b.rating - a.rating);
    if (filters["Sort By"] === "Most Experienced")
      list.sort((a, b) => b.experience - a.experience);
    if (filters["Sort By"] === "Price: Low to High")
      list.sort((a, b) => a.rate - b.rate);
    return list;
  }, [query, activeSpecialty, filters]);

  const activeCount =
    Object.entries(filters).filter(
      ([key, value]) => value && value !== filterOptions[key]?.[0],
    ).length +
    (query ? 1 : 0) +
    (activeSpecialty !== specialties[0] ? 1 : 0);
  const resetFilters = () => {
    setFilters({});
    setQuery("");
    setActiveSpecialty(specialties[0]);
    setPage(1);
  };

  return (
    <main className="directory-page">
      <nav className="directory-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <strong>Talk to Astrologer</strong>
      </nav>
      <header className="directory-heading">
        <div className="directory-title-line">
          <h1 className="font-bold">Talk to Astrologers</h1>
          <span className="available-count">
            <i />
            540+ Astrologers Available
          </span>
        </div>
        <div className="trust-pills">
          <span>
            <BadgeCheck size={22} className="trust-verified-badge" />
            100% Verified Profiles
          </span>
          <span>
            <LockKeyhole size={17} />
            Private &amp; Confidential
          </span>
        </div>
        <p>
          Connect with verified Vedic astrologers, tarot readers, and
          numerologists for instant guidance via text chat or direct audio call.
          Select an expert below to begin your consultation.
        </p>
      </header>

      <section className="directory-filters" aria-label="Find astrologers">
        <label className="directory-search">
          <Search size={19} />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search by astrologer name or expertise (e.g. Career, Kundli, Vedic)..."
          />
        </label>
        <div className="directory-filter-grid">
          {Object.entries(filterOptions).map(([name, options]) => (
            <label className="directory-select" key={name}>
              <span>{name}</span>
              <div>
                <select
                  value={filters[name] || options[0]}
                  onChange={(event) => {
                    setFilters({ ...filters, [name]: event.target.value });
                    setPage(1);
                  }}
                >
                  {options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown size={16} />
              </div>
            </label>
          ))}
        </div>
        <div className="filter-summary">
          <span>
            Active Filters: <b>{activeCount ? activeCount : "None"}</b>
          </span>
          <button onClick={resetFilters}>
            <RefreshCcw size={16} />
            Reset all filters
          </button>
        </div>
      </section>

      <nav className="specialty-tabs" aria-label="Astrologer specialties">
        {specialties.map((item) => (
          <button
            key={item}
            className={activeSpecialty === item ? "selected" : ""}
            onClick={() => {
              setActiveSpecialty(item);
              setPage(1);
            }}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="directory-results">
        <span>
          Showing {visible.length ? (page - 1) * 8 + 1 : 0}–
          {Math.min(page * 8, visible.length)} of {visible.length} verified
          consultants
        </span>
        <strong>
          <Zap size={17} fill="currentColor" />
          Avg. Response Time: &lt; 60 seconds
        </strong>
      </div>
      {visible.length ? (
        <div className="directory-grid">
          {visible.slice((page - 1) * 8, page * 8).map((person, index) => (
            <ConsultantCard key={`${person.name}-${index}`} person={person} />
          ))}
        </div>
      ) : (
        <div className="directory-empty">
          <Search size={28} />
          <h2>No astrologers found</h2>
          <p>Try changing your search or filters to see more consultants.</p>
          <button onClick={resetFilters}>Clear filters</button>
        </div>
      )}
      <div className="directory-pagination">
        <span>
          Showing {visible.length ? (page - 1) * 8 + 1 : 0}–
          {Math.min(page * 8, visible.length)} of {visible.length} astrologers
        </span>
        <div>
          <button
            disabled={page === 1}
            onClick={() => setPage(Math.max(1, page - 1))}
          >
            <div className="flex item-center gap-1 text-[#1B1B1E]">
              <ChevronLeft size={15} className="mt-1" />
              <p>Previous</p>
            </div>
          </button>
          {[1, 2, 3].map((number) => (
            <button
              key={number}
              className={page === number ? "current" : ""}
              onClick={() => setPage(number)}
            >
              {number}
            </button>
          ))}
          <span>…</span>
          <button onClick={() => setPage(12)}>12</button>
          <button onClick={() => setPage(Math.min(12, page + 1))}>
            <div className="flex item-center gap-1 text-[#1B1B1E]">
              <p>Next</p>
              <ChevronRight size={15} className="mt-1" />
            </div>
          </button>
        </div>
      </div>
      <footer className="directory-assurance">
        <span>
          <CircleCheck size={22} fill="currentColor" color="#FFFFFF" />
          All consultations are 100% confidential. Money-back guarantee if
          unsatisfied.
        </span>
        <span>
          <div className="flex item-center gap-1">
            <ShieldCheck size={15} className="item-shield" />
            <p>SSL 256-bit Secure</p>
          </div>
          <div className="flex item-center">
            <BadgeCheck
              size={19}
              fill="currentColor"
              color="#FFFFFF"
              className="item-verified"
            />
            <p>Verified Astrologers</p>
          </div>
        </span>
      </footer>
    </main>
  );
}
