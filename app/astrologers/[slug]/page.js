import { notFound } from "next/navigation";
import {
  directoryAstrologers,
  directoryProfileDetails,
} from "../../../data/astrologyData";
import AstrologerProfile from "./profile";

export function generateStaticParams() {
  return directoryAstrologers.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const person = directoryAstrologers.find(
    (astrologer) => astrologer.slug === slug,
  );

  return {
    title: person
      ? `${person.name} | AstroMul`
      : "Astrologer Profile | AstroMul",
    description: person
      ? `View ${person.name}'s verified astrologer profile, expertise, reviews, and consultation options.`
      : "Explore verified astrologer profiles on AstroMul.",
  };
}

export default async function AstrologerProfilePage({ params }) {
  const { slug } = await params;
  const person = directoryAstrologers.find(
    (astrologer) => astrologer.slug === slug,
  );

  if (!person) notFound();

  return (
    <AstrologerProfile
      astrologer={person}
      details={directoryProfileDetails[slug] || null}
      astrologers={directoryAstrologers}
    />
  );
}
