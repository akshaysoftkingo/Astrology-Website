import { Suspense } from "react";
import { notFound } from "next/navigation";

import { directoryAstrologers } from "@/data/astrologers/directory";
import { directoryProfileDetails } from "@/data/astrologers/profiles";

import AudioSession from "./session";

export function generateStaticParams() {
  return directoryAstrologers.map(({ slug }) => ({ slug }));
}

async function AudioSessionContent({ params }) {
  const { slug } = await params;
  const astrologer = directoryAstrologers.find(
    (person) => person.slug === slug,
  );

  if (!astrologer) notFound();

  return (
    <AudioSession
      astrologer={astrologer}
      details={directoryProfileDetails[slug] || null}
    />
  );
}

export default function AudioSessionPage({ params }) {
  return (
    <Suspense
      fallback={
        <main
          className="audio-session-loading"
          aria-label="Loading audio session"
        />
      }
    >
      <AudioSessionContent params={params} />
    </Suspense>
  );
}
