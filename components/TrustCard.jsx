import {
  Clock4,
  ShieldCheck,
  ShieldKeyhole,
  UserRoundCog,
} from "lucide-react";

const trustIcons = {
  shieldCheck: ShieldCheck,
  shieldKeyhole: ShieldKeyhole,
  clock4: Clock4,
  userRoundCog: UserRoundCog,
};

export default function TrustCard({ item }) {
  const Icon = trustIcons[item.icon];

  return (
    <article className="trust-card">
      <div className={`icon-tile ${item.tone}`}>
        <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <h3 className="font-bold">{item.title}</h3>
      <p>{item.description}</p>
    </article>
  );
}
