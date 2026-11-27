import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  directoryAstrologers,
  directoryProfileDetails,
} from "@/data/astrologers/directory";
import { directoryProfileDetails as profileDetails } from "@/data/astrologers/profiles";
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

async function AstrologerProfileContent({ params }) {
  const { slug } = await params;
  const person = directoryAstrologers.find(
    (astrologer) => astrologer.slug === slug,
  );

  if (!person) notFound();

  return (
    <AstrologerProfile
      astrologer={person}
      details={profileDetails[slug] || null}
      astrologers={directoryAstrologers}
    />
  );
}

export default function AstrologerProfilePage({ params }) {
  return (
    <Suspense fallback={null}>
      <AstrologerProfileContent params={params} />
    </Suspense>
  );
}
