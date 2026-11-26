import { Star } from "lucide-react";

export default function TestimonialCard({ item }) {
  return (
    <article className="testimonial-card">
      <div className="stars" role="img" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} size={16} fill="currentColor" aria-hidden="true" />
        ))}
      </div>
      <blockquote>“{item.quote}”</blockquote>
      <div className="testimonial-person">
        <span>{item.initials}</span>
        <div>
          <strong>{item.name}</strong>
          <small>{item.details}</small>
        </div>
      </div>
    </article>
  );
}
