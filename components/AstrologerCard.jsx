import Link from "next/link";
import Image from "next/image";
import { MessageSquareText, Phone } from "lucide-react";

export default function AstrologerCard({ astrologer }) {
  return (
    <article className="astrologer-card">
      <div className="expert-head">
        <Image
          className="expert-avatar"
          src={astrologer.image}
          alt={`Portrait of ${astrologer.name}`}
          width={66}
          height={67}
        />
        <div className="expert-name">
          <h3 className="font-bold">
            {astrologer.name} <span className="verified">✿</span>
          </h3>
          <p className="font-semibold">{astrologer.specialty}</p>
          <small className="font-semibold">
            {astrologer.experience} Experience
          </small>
          <strong className="rating">
            ★ {astrologer.rating} <span>({astrologer.reviews})</span>
          </strong>
        </div>
      </div>
      <div className="rate-row">
        <span className="font-semibold">Consultation rate</span>
        <strong>
          ₹{astrologer.rate}
          <small>/min</small>
        </strong>
      </div>
      <div className="expert-actions">
        <Link className="button button--soft" href="#contact">
          <MessageSquareText size={18} />
          Chat Now
        </Link>
        <Link className="button button--gold" href="#contact">
          <Phone size={18} />
          Call Now
        </Link>
      </div>
    </article>
  );
}
