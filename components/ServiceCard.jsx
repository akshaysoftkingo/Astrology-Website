import Link from "next/link";
import { Clock3, Flame, Gem, Hash, Headset, Heart, Sun } from "lucide-react";

const serviceIcons = {
  headset: Headset,
  sun: Sun,
  hash: Hash,
  heart: Heart,
  flame: Flame,
  gem: Gem,
};

export default function ServiceCard({ service }) {
  const ServiceIcon = serviceIcons[service.icon] ?? Clock3;

  return (
    <article className="service-card">
      {service.popular && <span className="popular-tag">Most Popular</span>}
      <div className={`icon-tile ${service.tone || "gold"}`}>
        <ServiceIcon size={24} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <h3 className="font-bold">{service.title}</h3>
      <p className="text-[#504534]">{service.description}</p>
      <Link className="card-link" href={service.href || "#"}>
        <span className="font-semibold text-[12px]">{service.meta}</span>
        <strong className="font-bold text-[12px]">{service.cta} →</strong>
      </Link>
    </article>
  );
}
