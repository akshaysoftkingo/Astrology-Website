"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CircleCheck,
  CreditCardPlus,
  FileText,
  IndianRupee,
  LockKeyhole,
  Paperclip,
  Phone,
  PhoneOff,
  SendHorizontal,
  ShieldCheck,
  Smile,
  Sparkles,
  Timer,
  Wallet,
} from "lucide-react";

import { astrologers as homepageAstrologers } from "@/data/homepage";
import { createMessages } from "@/data/chat-messages";

import { formatTime, timeLabel } from "@/utils/time";

import "./session.css";

export default function ChatSession({ astrologer, details }) {
  const [seconds, setSeconds] = useState(0);
  const [ended, setEnded] = useState(false);
  const [draft, setDraft] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [messages, setMessages] = useState(() =>
    createMessages(astrologer.name),
  );
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);
  const rate = Number(astrologer.rate);
  const balance = Math.max(0, 250 - (seconds * rate) / 60);
  const runway = Math.floor((balance / rate) * 60);
  const fullName = details?.name || astrologer.name;
  const homepageAstrologer = homepageAstrologers.find(
    (expert) =>
      expert.name === astrologer.name ||
      expert.name.startsWith(astrologer.name) ||
      astrologer.name.startsWith(expert.name),
  );
  const sessionId = useMemo(
    () =>
      `#AST-${astrologer.slug.replaceAll("-", "").slice(0, 4).toUpperCase()}8429`,
    [astrologer.slug],
  );

  useEffect(() => {
    if (ended) return undefined;
    const interval = window.setInterval(
      () => setSeconds((value) => value + 1),
      1000,
    );
    return () => window.clearInterval(interval);
  }, [ended]);

  useEffect(() => {
    if (balance <= 0) setEnded(true);
  }, [balance]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (ended || (!draft.trim() && !attachment)) return;
    setMessages((items) => [
      ...items,
      {
        id: Date.now(),
        from: "user",
        time: timeLabel(),
        text: draft.trim(),
        file: attachment?.name || null,
      },
    ]);
    setDraft("");
    setAttachment(null);
  };

  const addEmoji = () => {
    setDraft((value) => `${value}${value ? " " : ""}🙏`);
    inputRef.current?.focus();
  };

  return (
    <main className="chat-session-page">
      <header className="chat-session-header">
        <Link
          href={`/astrologers/${astrologer.slug}`}
          className="chat-back-link"
        >
          <ArrowLeft size={22} /> Back to Astrologer Profile
        </Link>
        <div className="chat-session-actions">
          <span className="chat-session-id">
            Session ID: <strong>{sessionId}</strong>
          </span>
          <span className="chat-session-timer">
            <Timer size={20} /> {formatTime(seconds)}
          </span>
          <button
            className="chat-end-button"
            onClick={() => setEnded(true)}
            disabled={ended}
          >
            {ended ? <PhoneOff size={18} /> : <Phone size={18} />}{" "}
            {ended ? "Chat Ended" : "End Chat"}
          </button>
        </div>
      </header>

      <div className="chat-session-layout">
        <section className="chat-conversation-card">
          <div className="chat-conversation-heading">
            <Image
              src={astrologer.image}
              alt=""
              width={58}
              height={58}
              className="chat-heading-avatar"
            />
            <div>
              <h1>
                {fullName} <BadgeCheck size={20} />
              </h1>
              <p>
                {homepageAstrologer?.specialty || astrologer.specialty}{" "}
                <span>•</span>{" "}
                {homepageAstrologer?.experience ||
                  `${astrologer.experience}+ Yrs`}{" "}
                Experience
              </p>
            </div>
            <div className="chat-encryption-label">
              <LockKeyhole size={18} /> End-to-End Encrypted Consultation
            </div>
          </div>

          <div className="chat-messages" aria-live="polite">
            <div className="chat-connected-banner">
              <Sparkles size={18} /> Connected with {fullName}. Your session has
              started.
            </div>
            {messages.map((message) => (
              <article
                className={`chat-message-row is-${message.from}`}
                key={message.id}
              >
                {message.from === "astrologer" && (
                  <Image
                    src={astrologer.image}
                    alt={`${fullName}`}
                    width={42}
                    height={42}
                    className="chat-message-avatar"
                  />
                )}
                <div className="chat-message-content">
                  <div className="chat-bubble">
                    {message.file && (
                      <div className="chat-file-card">
                        <span>
                          <FileText size={25} />
                        </span>
                        <div>
                          <strong>{message.file}</strong>
                          <small>
                            1.2 MB • Generated by Parashara Vedic Engine
                          </small>
                        </div>
                      </div>
                    )}
                    {message.text && <p>{message.text}</p>}
                  </div>
                  <time>{message.time}</time>
                </div>
                {message.from === "user" && (
                  <span className="chat-user-avatar">You</span>
                )}
              </article>
            ))}
            {ended && (
              <div className="chat-ended-notice">
                <CircleCheck size={18} /> This consultation has ended. Your
                messages are saved in this session.
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          <form className="chat-composer" onSubmit={sendMessage}>
            <label className="chat-attach-button" aria-label="Attach a file">
              <Paperclip size={22} />
              <input
                type="file"
                onChange={(event) =>
                  setAttachment(event.target.files?.[0] || null)
                }
                disabled={ended}
              />
            </label>
            <div className="chat-input-wrap">
              {attachment && (
                <span className="chat-attachment-chip">{attachment.name}</span>
              )}
              <input
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={
                  ended
                    ? "This chat session has ended"
                    : `Type your message to ${astrologer.name}...`
                }
                disabled={ended}
                aria-label="Your message"
              />
              <button
                type="button"
                onClick={addEmoji}
                disabled={ended}
                aria-label="Add emoji"
              >
                <Smile size={22} />
              </button>
            </div>
            <button
              className="chat-send-button"
              type="submit"
              disabled={ended || (!draft.trim() && !attachment)}
            >
              Send <SendHorizontal size={18} />
            </button>
          </form>
        </section>

        <aside className="chat-sidebar">
          <section className="chat-astrologer-card">
            <div className="chat-astrologer-identity">
              <div className="chat-sidebar-avatar-wrap">
                <Image
                  src={astrologer.image}
                  alt={fullName}
                  width={82}
                  height={82}
                />
                <i />
              </div>
              <div>
                <h2>
                  {fullName} <BadgeCheck size={19} />
                </h2>
                <p>{homepageAstrologer?.specialty || astrologer.specialty}</p>
                <div className="chat-review-line">
                  <b>★ {homepageAstrologer?.rating || astrologer.rating}</b> (
                  {homepageAstrologer?.reviews || astrologer.reviews} reviews)
                </div>
              </div>
            </div>
            <div className="chat-stat-pills">
              <div>
                <span>Experience</span>
                <strong>
                  {homepageAstrologer?.experience ||
                    `${astrologer.experience}+ Yrs`}
                </strong>
              </div>
              <div>
                <span>Rate</span>
                <strong>
                  <IndianRupee size={17} /> {rate} / min
                </strong>
              </div>
            </div>
            <dl className="chat-detail-list">
              <div>
                <dt>Languages</dt>
                <dd>{astrologer.languages}</dd>
              </div>
              <div>
                <dt>Specialization</dt>
                <dd>
                  {astrologer.specialty
                    .split(",")
                    .map((item) => item.trim())
                    .join(", ")}
                </dd>
              </div>
              <div>
                <dt>Session Duration</dt>
                <dd>
                  {String(Math.floor(seconds / 60)).padStart(2, "0")} mins{" "}
                  {String(seconds % 60).padStart(2, "0")} secs
                </dd>
              </div>
            </dl>
          </section>

          <section className="chat-wallet-card">
            <div className="chat-wallet-title">
              <span>Wallet Balance</span>
              <strong>
                <Wallet size={17} /> <IndianRupee size={15} />{" "}
                {balance.toFixed(2)}
              </strong>
            </div>
            <p>
              Sufficient balance for approx.{" "}
              <b>{Math.floor(runway / 60)} more minutes</b> at current
              consultation rate.
            </p>
            <Link href="/wallet">
              <CreditCardPlus size={18} /> Recharge Wallet Instantly
            </Link>
          </section>

          <section className="chat-privacy-card">
            <h2>
              <ShieldCheck size={20} /> 100% Confidential Guarantee
            </h2>
            <p>
              All conversations, kundli details, and birth charts shared during
              this consultation are strictly encrypted and protected under
              AstroMul privacy protocol.
            </p>
            <div>
              <ShieldCheck size={17} /> Certified Vedic Scholar Network
              (IN-DL-ASTR-01)
            </div>
          </section>
          {ended && (
            <Link
              className="chat-return-link"
              href={`/astrologers/${astrologer.slug}`}
            >
              <Check size={17} /> Return to astrologer profile
            </Link>
          )}
        </aside>
      </div>
    </main>
  );
}
