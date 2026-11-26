import {
  ZodiacAquarius,
  ZodiacAries,
  ZodiacCancer,
  ZodiacCapricorn,
  ZodiacGemini,
  ZodiacLeo,
  ZodiacLibra,
  ZodiacPisces,
  ZodiacSagittarius,
  ZodiacScorpio,
  Star,
  ZodiacTaurus,
  ZodiacVirgo,
} from "lucide-react";

const zodiacIcons = {
  Aries: ZodiacAries,
  Taurus: ZodiacTaurus,
  Gemini: ZodiacGemini,
  Cancer: ZodiacCancer,
  Leo: ZodiacLeo,
  Virgo: ZodiacVirgo,
  Libra: ZodiacLibra,
  Scorpio: ZodiacScorpio,
  Sagittarius: ZodiacSagittarius,
  Capricorn: ZodiacCapricorn,
  Aquarius: ZodiacAquarius,
  Pisces: ZodiacPisces,
};

export default function ZodiacCard({ sign }) {
  const elementClass = `element element--${sign.element.toLowerCase()}`;
  const luckClass = sign.lucky ? "lucky" : "";
  const ZodiacIcon = zodiacIcons[sign.name];

  return (
    <article className="zodiac-card">
      <div className="zodiac-top">
        <span className="zodiac-symbol">
          <ZodiacIcon size={22} strokeWidth={1.8} />
        </span>
        <span className={elementClass}>{sign.element}</span>
      </div>
      <h3 className="font-bold text-[#1B1B1E]">{sign.name}</h3>
      <small>{sign.dates}</small>
      <strong className={luckClass}>
        <div className="flex item-center gap-1">
          <Star
            size={12}
            fill="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
            className="star"
          />
          <p>{sign.message}</p>
        </div>
      </strong>
    </article>
  );
}
