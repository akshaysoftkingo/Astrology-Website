"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Check,
  GraduationCap,
  Heart,
  IndianRupee,
  LockKeyhole,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import "./profile.css";

const tabs = [
  ["overview", "Overview & Bio"],
  ["expertise", "Expertise & Remedies"],
  ["plans", "Consultation Plans"],
  ["reviews", "Reviews & Ratings"],
  ["similar", "Similar Astrologers"],
];

const fallbackTopics = [
  {
    title: "Love & Relationships",
    description:
      "Compatibility, marriage timing, and clear guidance for important relationship decisions.",
  },
  {
    title: "Career & Business",
    description:
      "Practical insight on career changes, business decisions, and auspicious timing.",
  },
  {
    title: "Wealth & Finance",
    description:
      "Understand financial periods and plan important decisions with greater confidence.",
  },
  {
    title: "Vedic Remedies",
    description:
      "Traditional mantras, gemstone guidance, and simple remedies tailored to your chart.",
  },
];

const sampleReviews = [
  {
    name: "Ananya S.",
    place: "Mumbai",
    age: "3 days ago",
    quote:
      "The consultation was thoughtful and easy to understand. I received practical guidance for the questions I brought.",
  },
  {
    name: "Rahul M.",
    place: "Pune",
    age: "1 week ago",
    quote:
      "A patient and detailed reading. The astrologer explained the chart clearly and answered all my follow-up questions.",
  },
];

function ConsultationButtons({ astrologer, onAction, compact = false }) {
  return (
    <div className={`profile-consult-buttons${compact ? " is-compact" : ""}`}>
      <button className="profile-chat-button" onClick={() => onAction("chat")}>
        <MessageSquareText size={17} />
        Start Text Chat — ₹{astrologer.rate}/min
      </button>
      <button className="profile-call-button" onClick={() => onAction("call")}>
        <Phone size={17} />
        Start Audio Call — ₹{astrologer.rate}/min
      </button>
    </div>
  );
}

export default function AstrologerProfile({
  astrologer,
  details,
  astrologers,
}) {
  const [actionMessage, setActionMessage] = useState("");
  const router = useRouter();
  const displayName = details?.name || astrologer.name;
  const title =
    details?.title || `Verified ${astrologer.specialty} Astrologer & Guide`;
  const topics = details?.topics || fallbackTopics;
  const reviews = details?.reviews || sampleReviews;
  const similarAstrologers = (
    details?.similar ||
    astrologers
      .filter((person) => person.slug !== astrologer.slug)
      .slice(0, 4)
      .map((person) => person.slug)
  )
    .map((slug) => astrologers.find((person) => person.slug === slug))
    .filter(Boolean);
  const expertise = astrologer.specialty
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const beginConsultation = (type, consultant = astrologer) => {
    if (type === "call") {
      router.push(`/astrologers/${consultant.slug}/audio`);
      return;
    }
    const label = type === "chat" ? "Text chat" : "Audio call";
    setActionMessage(
      `${label} request started for ${consultant.name}. Sign in to continue.`,
    );
  };

  return (
    <main className="profile-page">
      <nav className="profile-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/astrologers">Talk to Astrologer</Link>
        <span>/</span>
        <strong>Astrologer Profile</strong>
      </nav>

      <section className="profile-hero" aria-labelledby="profile-name">
        <div className="profile-identity">
          <div className="profile-photo-wrap">
            <Image
              className="profile-photo"
              src={astrologer.image}
              alt={`Portrait of ${displayName}`}
              width={152}
              height={152}
              priority
            />
            {/* <span className={`profile-online-dot${astrologer.online ? "" : " is-offline"}`} aria-label={astrologer.online ? "Online now" : "Currently offline"} /> */}
          </div>
          <div className="profile-intro">
            <div className="profile-name-line">
              <h1 id="profile-name">{displayName}</h1>
              <span className="verified-master">
                <BadgeCheck size={16} />
              </span>
            </div>
            <p className="profile-title">{title}</p>
            <div className="profile-stats">
              <span className="profile-rating">
                <Star size={16} />
                <b>{astrologer.rating.toFixed(1)}</b>
                <p className="text-[#827561]">({astrologer.reviews} reviews)</p>
              </span>
              <i />
              <span>{astrologer.experience} Years Experience</span>
              <i />
              <span>
                {details?.consultations || `${astrologer.reviews}+`}{" "}
                Consultations
              </span>
              <i />
              <span>{astrologer.languages}</span>
            </div>
            <div className="profile-tags">
              {expertise.map((item) => (
                <span key={item}>{item}</span>
              ))}
              {astrologer.specialty.toLowerCase().includes("vedic") && (
                <span>Remedial Puja</span>
              )}
            </div>
          </div>
        </div>
        <div className="profile-tariff">
          <div className="profile-tariff-line">
            <span>Consultation Tariff</span>
            <strong>₹{astrologer.rate}/min</strong>
          </div>
          <ConsultationButtons
            astrologer={astrologer}
            onAction={beginConsultation}
          />
          <p>
            <LockKeyhole size={14} color="#059669" />
            100% Confidential &amp; Secure Session
          </p>
        </div>
      </section>

      <nav className="profile-tabs" aria-label="Profile sections">
        {tabs.map(([id, label], index) => (
          <a
            className={index === 0 ? "is-current" : ""}
            href={`#${id}`}
            key={id}
          >
            {id === "reviews" ? `${label} (${astrologer.reviews})` : label}
          </a>
        ))}
      </nav>

      <div className="profile-content-grid">
        <div className="profile-content-main">
          <section className="profile-panel profile-bio" id="overview">
            <h2>About Astrologer {displayName}</h2>
            <p>
              {details?.bio ||
                `${displayName} is an experienced ${astrologer.specialty} consultant with ${astrologer.experience} years of practice. They offer thoughtful, personal guidance for life's important questions, drawing on traditional astrology and a careful understanding of each seeker's birth chart.`}
            </p>
            <p>
              {details?.approach ||
                `Consultations are available in ${astrologer.languages}. ${displayName} takes time to understand your concerns, explain the chart in clear language, and suggest practical next steps suited to your situation.`}
            </p>
            <div className="profile-credentials">
              {(
                details?.credentials || [
                  "Verified astrology practitioner",
                  `Specialist in ${astrologer.specialty}`,
                ]
              ).map((credential, index) => (
                <div key={credential}>
                  <span>
                    {index === 0 ? (
                      <GraduationCap size={19} />
                    ) : (
                      <ShieldCheck size={19} />
                    )}
                  </span>
                  <p>
                    <strong>
                      {index === 0 ? "Parampara Lineage" : "Certified Scholar"}
                    </strong>
                    <small>{credential}</small>
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="profile-panel profile-expertise" id="expertise">
            <h2>Core Specialisations &amp; Disciplines</h2>
            <div className="profile-topic-grid">
              {topics.map((topic, index) => (
                <article key={topic.title}>
                  <span>
                    {index === 0 ? (
                      <Heart size={21} color="#7D5800" />
                    ) : index === 1 ? (
                      <BriefcaseBusiness size={20} color="#7D5800" />
                    ) : index === 2 ? (
                      <Banknote size={20} color="#7D5800" />
                    ) : (
                      <Sparkles size={20} color="#7D5800" />
                    )}
                  </span>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="profile-panel profile-plans" id="plans">
            <h2>Consultation Modes &amp; Packages</h2>
            <div className="profile-plan-grid">
              <article className="profile-plan is-popular">
                <span className="plan-popular-label">Most Popular</span>
                <h3>Live Text Consultation</h3>
                <p>Real-time interactive chat with chart analysis</p>
                <strong>
                  <IndianRupee size={19} className="font-bold" />
                  {astrologer.rate} <small>/ minute</small>
                </strong>
                <ul>
                  <li>
                    <Check size={15} />
                    Instant connection when online
                  </li>
                  <li>
                    <Check size={15} />
                    Detailed planetary chart breakdown
                  </li>
                  <li>
                    <Check size={15} />
                    Written remedy notes provided
                  </li>
                </ul>
                <button onClick={() => beginConsultation("chat")}>
                  Start Chat Session
                </button>
              </article>
              <article className="profile-plan">
                <h3>Priority Audio Call</h3>
                <p>In-depth voice consultation for complex queries</p>
                <strong>
                  <IndianRupee size={14} className="plan-currency" />
                  {astrologer.rate} <small>/ minute</small>
                </strong>
                <ul>
                  <li>
                    <Check size={15} />
                    Crystal clear direct audio call
                  </li>
                  <li>
                    <Check size={15} />
                    Ask your specific life questions
                  </li>
                  <li>
                    <Check size={15} />
                    Post-call summary included
                  </li>
                </ul>
                <button onClick={() => beginConsultation("call")}>
                  Start Audio Call
                </button>
              </article>
            </div>
          </section>

          <section className="profile-panel profile-reviews" id="reviews">
            <div className="profile-reviews-heading">
              <div>
                <h2>Client Reviews &amp; Testimonials</h2>
                <p>Verified ratings from real seekers across India</p>
              </div>
              <div className="profile-review-score">
                <strong>{astrologer.rating.toFixed(1)}</strong>
                <span>
                  <span
                    className="review-score-stars"
                    role="img"
                    aria-label="5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} size={12} aria-hidden="true" />
                    ))}
                  </span>
                  <small>Based on {astrologer.reviews} reviews</small>
                </span>
              </div>
            </div>
            <div className="profile-review-list">
              {reviews.map((review) => (
                <article key={review.name}>
                  <div className="review-author">
                    <span style={{ backgroundColor: review.avatarColor }}>
                      {review.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <div>
                      <strong>{review.name}</strong>
                      <small>
                        {review.place} · {review.age}
                      </small>
                    </div>
                    <span
                      className="review-stars"
                      role="img"
                      aria-label="5 out of 5 stars"
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star key={index} size={13} aria-hidden="true" />
                      ))}
                    </span>
                  </div>
                  <p>“{review.quote}”</p>
                  <div className="review-tags">
                    {(review.tags || ["Chat Consultation", "Guidance"]).map(
                      (tag) => (
                        <span key={tag}>{tag}</span>
                      ),
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="profile-sidebar">
          <section className="profile-panel consultation-desk">
            <div className="desk-heading">
              <h2>Consultation Desk</h2>
              <span
                className={`desk-status${astrologer.online ? "" : " is-offline"}`}
              >
                <i />
                {astrologer.online ? "Online Now" : "Offline"}
              </span>
            </div>
            <dl>
              <div>
                <dt>Response Time</dt>
                <dd>
                  {astrologer.online
                    ? "Instant (< 30s)"
                    : "Usually within 1 hour"}
                </dd>
              </div>
              <div>
                <dt>Total Consultations</dt>
                <dd>
                  {details?.consultations || `${astrologer.reviews}+ completed`}{" "}
                  completed
                </dd>
              </div>
              <div>
                <dt>Wallet Balance</dt>
                <dd className="wallet-balance">
                  {/* <Wallet size={15} /> */}
                  ₹250.00 (+ Add)
                </dd>
              </div>
            </dl>
            <ConsultationButtons
              astrologer={astrologer}
              onAction={beginConsultation}
              compact
            />
            <div className="profile-privacy">
              <strong>
                <ShieldCheck size={16} />
                Privacy Guarantee
              </strong>
              <p>
                Your birth details and consultation chats are strictly
                confidential and encrypted end-to-end.
              </p>
            </div>
          </section>
          <section className="profile-panel profile-schedule">
            <h2>Weekly Availability Schedule</h2>
            <div>
              <span>Monday – Friday</span>
              <strong>09:00 AM – 09:00 PM</strong>
            </div>
            <div>
              <span>Saturday</span>
              <strong>10:00 AM – 08:00 PM</strong>
            </div>
            <div>
              <span>Sunday</span>
              <strong className="schedule-off">
                Special Puja &amp; Fasting (Off)
              </strong>
            </div>
          </section>
        </aside>
      </div>

      <section className="similar-astrologers" id="similar">
        <div className="similar-heading">
          <div>
            <h2>Similar Verified Astrologers</h2>
            <p>Explore top-rated specialists available right now</p>
          </div>
          <Link href="/astrologers">
            View All Astrologers <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="similar-grid">
          {similarAstrologers.map((person, index) => (
            <article className="similar-card" key={person.slug}>
              <Link
                className="similar-card-profile"
                href={`/astrologers/${person.slug}`}
              >
                <Image
                  src={`/images/verified-astro-${index + 1}.svg`}
                  width={48}
                  height={48}
                  alt={`Portrait of ${person.name}`}
                  className="rounded-full"
                />
                <div className="similar-card-info">
                  <strong>
                    {person.name} <BadgeCheck size={15} />
                  </strong>
                  <span>
                    {person.similarSpecialty || person.specialty} ·{" "}
                    {person.similarExperience || person.experience}+ Yrs
                  </span>
                  <small>
                    <Star size={13} />
                    <p className="text-[#1B1B1E]">
                      <span>
                        {(person.similarRating || person.rating)
                          .toFixed(2)
                          .replace(/0+$/, "")
                          .replace(/\.$/, "")}{" "}
                      </span>
                      <span className="text-[#827561] font-normal">
                        {" "}
                        ({person.similarReviews || person.reviews})
                      </span>
                    </p>
                  </small>
                </div>
              </Link>
              <div className="similar-card-bottom">
                <strong>
                  <IndianRupee size={13} aria-hidden="true" />
                  {person.similarRate || person.rate}/min
                </strong>
                <button onClick={() => beginConsultation("chat", person)}>
                  Chat Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {actionMessage && (
        <div className="profile-action-message" role="status">
          <span>
            <Check size={17} />
          </span>
          {actionMessage}
          <button onClick={() => setActionMessage("")} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}
    </main>
  );
}
