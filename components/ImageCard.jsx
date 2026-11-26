import Link from "next/link";
import { CalendarCheck, UserRoundGroup } from "lucide-react";

export default function ImageCard({ item, kind }) {
  const style = { backgroundImage: `url("${item.image}")` };
  const MetaIcon =
    item.metaIcon === "calendar" ? CalendarCheck : UserRoundGroup;
  return (
    <article className={`${kind}-card`}>
      <div className="image-card-visual" style={style}>
        <span className={`image-badge image-badge--${kind}`}>{item.badge}</span>
      </div>
      <div className="image-card-content">
        <h3 className="font-bold">{item.title}</h3>
        <p className="text-[18px]">{item.description}</p>
        {kind === "puja" ? (
          <>
            <span className="image-meta">
              <MetaIcon size={14} aria-hidden="true" />
              {item.meta}
            </span>
            <div className="image-card-bottom">
              <div>
                <small>Dakshina</small>
                <strong>{item.price}</strong>
              </div>
              <Link className="button button--gold" href="#contact">
                View Details &amp; Book
              </Link>
            </div>
          </>
        ) : (
          <div className="product-bottom">
            <strong>{item.price}</strong>
            <Link className="button button--soft" href="#contact">
              View Product
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
