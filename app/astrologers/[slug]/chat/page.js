import { Suspense } from "react";
import { notFound } from "next/navigation";
import { directoryAstrologers } from "@/data/astrologers/directory";
import { directoryProfileDetails } from "@/data/astrologers/profiles";
import ChatSession from "./session";

export function generateStaticParams() {
  return directoryAstrologers.map(({ slug }) => ({ slug }));
}

async function ChatSessionContent({ params }) {
  const { slug } = await params;
  const astrologer = directoryAstrologers.find((person) => person.slug === slug);

  if (!astrologer) notFound();

  return (
    <ChatSession
      astrologer={astrologer}
      details={directoryProfileDetails[slug] || null}
    />
  );
}

export default function ChatSessionPage({ params }) {
  return (
    <Suspense fallback={<main className="chat-session-loading" aria-label="Loading chat session" />}>
      <ChatSessionContent params={params} />
    </Suspense>
  );
}
