import Link from "next/link";
import { Star } from "lucide-react";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  centered = false,
  descriptionRight = false,
  descriptionNoWrap = false,
}) {
  return (
    <div
      className={`section-heading ${centered ? "section-heading--center" : ""} ${descriptionRight ? "section-heading--description-right" : ""} ${descriptionNoWrap ? "section-heading--description-nowrap" : ""}`}
    >
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="font-bold">{title}</h2>
        {description && !descriptionRight && <p>{description}</p>}
      </div>
      {description && descriptionRight && (
        <p className="section-heading__description">{description}</p>
      )}
      {action && (
        <Link className="section-action" href={action.href || "#"}>
          {action.stars > 0 && (
            <span
              className="section-action-stars"
              aria-label={`${action.stars} out of 5 stars`}
            >
              {Array.from({ length: action.stars }, (_, index) => (
                <Star
                  key={index}
                  size={12}
                  fill="currentColor"
                  aria-hidden="true"
                />
              ))}
            </span>
          )}
          {action.label}
        </Link>
      )}
    </div>
  );
}
