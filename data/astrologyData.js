export const services = [
  {
    icon: "headset",
    title: "Talk to Astrologer",
    description:
      "Instant chat & audio call consultation with verified experts. Clear real-time doubts within 60 seconds.",
    meta: "1,500+ Experts Active",
    cta: "Consult Now",
    popular: true,
  },
  {
    icon: "sun",
    tone: "blue",
    title: "Free Horoscope",
    description:
      "Accurate daily, weekly & monthly astrological forecasts for all 12 sun and moon zodiac signs.",
    meta: "Today's Prediction",
    cta: "Check Sign",
  },
  {
    icon: "hash",
    tone: "coral",
    title: "Create Kundli",
    description:
      "In-depth Janam Kundli with detailed dosha analysis, Vimshottari Dasha calculations & gemstone guide.",
    meta: "100% Free Report",
    cta: "Generate Kundli",
  },
  {
    icon: "heart",
    title: "Kundli Matching",
    description:
      "Detailed 36 Ashtakoot Guna Milan compatibility score with Mangal dosha checks for a harmonious marriage.",
    meta: "Marriage Analysis",
    cta: "Match Now",
  },
  {
    icon: "flame",
    tone: "coral",
    title: "Book a Puja",
    description:
      "Vedic rituals and authentic sankalp performed in your name by experienced priests at certified mandirs.",
    meta: "Sacred Mandirs",
    cta: "Book Ritual",
  },
  {
    icon: "gem",
    tone: "blue",
    title: "Astrology Store",
    description:
      "Energized certified natural gemstones, genuine Nepali rudraksha beads, and sacred energized copper yantras.",
    meta: "100% Certified Lab",
    cta: "Visit Store",
  },
];

export const astrologers = [
  {
    name: "Pt. Radheshyam",
    image: "/images/expert-1.svg",
    specialty: "Vedic & KP Astrology",
    experience: "18+ Yrs",
    rating: "4.9",
    reviews: "4,210",
    rate: 35,
  },
  {
    name: "Acharya Meenakshi",
    image: "/images/expert-2.svg",
    specialty: "Tarot & Relationship Guide",
    experience: "12+ Yrs",
    rating: "4.95",
    reviews: "3,890",
    rate: 40,
  },
  {
    name: "Dr. Arvind Shastri",
    image: "/images/expert-3.svg",
    specialty: "Career, Wealth & Vedic",
    experience: "22+ Yrs",
    rating: "4.88",
    reviews: "6,150",
    rate: 50,
  },
  {
    name: "Shrimati Sunita",
    image: "/images/expert-4.svg",
    specialty: "Numerology & Kundli Milan",
    experience: "15+ Yrs",
    rating: "4.92",
    reviews: "2,940",
    rate: 30,
  },
];

export const signs = [
  ["Aries", "Mar 21 - Apr 19", "Fire", "Favorable Day"],
  ["Taurus", "Apr 20 - May 20", "Earth", "Financial Gain"],
  ["Gemini", "May 21 - Jun 20", "Air", "Creative Spark"],
  ["Cancer", "Jun 21 - Jul 22", "Water", "Emotional Harmony"],
  ["Leo", "Jul 23 - Aug 22", "Fire", "Leadership Boost"],
  ["Virgo", "Aug 23 - Sep 22", "Earth", "High Productivity"],
  ["Libra", "Sep 23 - Oct 22", "Air", "Peaceful Balance"],
  ["Scorpio", "Oct 23 - Nov 21", "Water", "Sharp Intuition"],
  ["Sagittarius", "Nov 22 - Dec 21", "Fire", "Travel & Fortune"],
  ["Capricorn", "Dec 22 - Jan 19", "Earth", "Career Recognition"],
  ["Aquarius", "Jan 20 - Feb 18", "Air", "Social Connection"],
  ["Pisces", "Feb 19 - Mar 20", "Water", "Spiritual Peace"],
].map(([name, dates, element, message], index) => ({
  name,
  dates,
  element,
  message,
  lucky: [0, 3, 5, 8, 11].includes(index),
}));

export const pujas = [
  {
    badge: "Trimbakeshwar Temple",
    title: "Maha Mrityunjaya Jaap & Havan",
    description:
      "For health recovery, profound vitality, planetary longevity, and the removal of life-threatening physical obstacles.",
    meta: "Performed by 5 Vedic Brahmins",
    metaIcon: "users",
    price: "₹2,100",
    image: "/images/temple-1.svg",
  },
  {
    badge: "Siddhivinayak",
    title: "Special Ganesh Sankat Nashan",
    description:
      "For removing business delays, clearing auspicious hurdles, career stability, and invoking abundance in new ventures.",
    meta: "Individual Sankalp & Prasad",
    metaIcon: "calendar",
    price: "₹1,500",
    image: "/images/temple-2.svg",
  },
  {
    badge: "Kashi Kshetra",
    title: "Navagraha Shanti & Dosha Nivaran",
    description:
      "Balance malefic planetary periods (Rahu-Ketu transit, Saturn Sade Sati) and restore peaceful karmic balance.",
    meta: "Performed by 3 Priests",
    metaIcon: "users",
    price: "₹3,500",
    image: "/images/temple-3.svg",
  },
];

export const products = [
  {
    badge: "Certified Lab",
    title: "Natural Blue Sapphire",
    description:
      "Certified 4.25 Ratti Ceylon gemstone for Saturn (Shani) relief and mental discipline.",
    price: "₹14,500",
    image: "/images/remedies-1.svg",
  },
  {
    badge: "Varanasi Energized",
    title: "Original 5 Mukhi Mala",
    description:
      "108+1 Beads energized on the banks of holy Ganga in Varanasi for inner peace and concentration.",
    price: "₹1,250",
    image: "/images/remedies-2.svg",
  },
  {
    badge: "Handcrafted",
    title: "Pure Copper Sri Yantra",
    description:
      "3×3 inch geometric sacred copper plate invoking Goddess Lakshmi for lasting financial abundance.",
    price: "₹850",
    image: "/images/remedies-3.svg",
  },
  {
    badge: "Budha Graha",
    title: "Natural Emerald (Panna)",
    description:
      "3.50 Ratti certified natural gemstone boosting intellect, analytical memory, speech & trade success.",
    price: "₹9,800",
    image: "/images/remedies-4.svg",
  },
];

export const trustItems = [
  {
    icon: "shieldCheck",
    tone: "gold",
    title: "100% Verified Astrologers",
    description:
      "Strict 4-step background check and credential validation by a council of senior Gurus before onboarding.",
  },
  {
    icon: "shieldKeyhole",
    tone: "blue",
    title: "Complete Privacy & Confidentiality",
    description:
      "Encrypted 1-on-1 private consultations. Your birth charts, audio calls, and identity are never exposed or shared.",
  },
  {
    icon: "clock4",
    tone: "gold",
    title: "Instant 24×7 Consultations",
    description:
      "Connect with certified astrologers anytime around the clock with zero waiting queues and fast direct audio connects.",
  },
  {
    icon: "userRoundCog",
    tone: "coral",
    title: "Guaranteed Authentic Remedies",
    description:
      "Honest, ethical spiritual counseling with realistic perspectives. No forced expensive rituals or fear-driven claims.",
  },
];

export const testimonials = [
  {
    quote:
      "Pandit Radheshyam's career prediction regarding my job switch in October was spot on to the exact month. His recommended copper yantra and mantra brought clarity during a very anxious period.",
    initials: "PK",
    name: "Prateek Kapoor",
    details: "Bengaluru • Chat Consultation",
  },
  {
    quote:
      "I was skeptical about online Kundli matching, but Acharya Meenakshi explained the Guna Milan breakdown and Mangal Dosha nuances with immense empathy. Saved us so much emotional distress.",
    initials: "SM",
    name: "Sneha Mukherjee",
    details: "Kolkata • Audio Call Consultation",
  },
  {
    quote:
      "Booked the Maha Mrityunjaya Puja for my father. We received continuous updates, holy prasad, and the sankalp was performed on time. Truly genuine and transparent spiritual service.",
    initials: "VG",
    name: "Vikramaditya Gaikwad",
    details: "Pune • Mandir Puja Booking",
  },
];
