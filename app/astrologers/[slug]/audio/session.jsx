"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CircleCheck,
  IndianRupee,
  Lightbulb,
  Mic,
  MicOff,
  Plus,
  Star,
  Timer,
  Wallet,
  Volume2,
  Phone,
  PhoneOff,
  VolumeOff,
} from "lucide-react";

import { astrologers as homepageAstrologers } from "@/data/homepage";

import { formatTime } from "@/utils/time";

import "./session.css";

export default function AudioSession({ astrologer, details }) {
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [ended, setEnded] = useState(false);
  const rate = Number(astrologer.rate);
  const startingBalance = 250;
  const accrued = Math.min(startingBalance, (seconds * rate) / 60);
  const balance = Math.max(0, startingBalance - accrued);
  const runway = Math.floor((balance / rate) * 60);
  const fullName = details?.name || astrologer.name;
  const homepageAstrologer = homepageAstrologers.find(
    (expert) =>
      expert.name === astrologer.name ||
      expert.name.startsWith(astrologer.name) ||
      astrologer.name.startsWith(expert.name),
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

  return (
    <main className="audio-session-page">
      <header className="audio-session-header">
        <Link
          href={`/astrologers/${astrologer.slug}`}
          className="audio-back-link"
        >
          <ArrowLeft size={22} />
          Back to Astrologer Profile
        </Link>
        <div className="audio-live-timer">
          <Timer size={21} />
          <span>{ended ? "Session Ended" : "Live Session Time:"}</span>
          {!ended && <strong>{formatTime(seconds)}</strong>}
        </div>
      </header>

      <div className="audio-session-layout">
        <section className="audio-main-column">
          <div className={`audio-call-panel${ended ? " is-ended" : ""}`}>
            <div className="audio-panel-topline">
              <span className="audio-secure-label">
                <i /> Secure Vedic Voice Channel
              </span>
              <span className="audio-rate-pill">
                <IndianRupee size={14} aria-hidden="true" />
                <span>{rate.toFixed(2)} / min active rate</span>
              </span>
            </div>
            <div className="audio-caller">
              <Image
                src={astrologer.image}
                alt={fullName}
                width={128}
                height={128}
                className="audio-caller-avatar"
                priority
              />
              <h1>{fullName}</h1>
              <p>
                {details?.title ||
                  `Verified ${astrologer.specialty} Astrologer`}
              </p>
            </div>
            <div
              className="audio-wave-box"
              aria-label="Audio transmission status"
            >
              <div
                className={`audio-wave${muted || ended ? " is-still" : ""}`}
                aria-hidden="true"
              >
                {[24, 42, 30, 56, 34, 48, 60, 30, 42].map((height, index) => (
                  <i
                    key={index}
                    style={{
                      "--wave-height": `${height}px`,
                      "--wave-delay": `${index * 90}ms`,
                    }}
                  />
                ))}
              </div>
              <span>
                {ended
                  ? "SESSION DISCONNECTED"
                  : muted
                    ? "MICROPHONE MUTED"
                    : "AUDIO TRANSMISSION STABLE (HD VEDIC CHANNEL)"}
              </span>
            </div>
            <div className="audio-controls">
              <button
                className={muted ? "is-active" : ""}
                onClick={() => setMuted(!muted)}
                aria-pressed={muted}
              >
                <span>{muted ? <MicOff size={25} /> : <Mic size={25} />}</span>
                {muted ? "Unmute" : "Mute"}
              </button>
              <button
                className={speakerOn ? "is-active" : ""}
                onClick={() => setSpeakerOn(!speakerOn)}
                aria-pressed={speakerOn}
              >
                <span>
                  {speakerOn ? <VolumeOff size={25} /> : <Volume2 size={25} />}
                </span>
                {speakerOn ? "Speaker" : "Earpiece"}
              </button>
              <button
                className="audio-end-control"
                onClick={() => setEnded(true)}
                disabled={ended}
              >
                <span>
                  {ended ? <PhoneOff size={26} /> : <Phone size={26} />}
                </span>
                {ended ? "Ended" : "End Call"}
              </button>
            </div>
          </div>
          <section className="audio-tip-card">
            <h2>
              <Lightbulb size={24} /> Tips for Your Vedic Consultation
            </h2>
            <p>
              Keep your precise birth chart, specific life questions (career
              switch, marriage matching, or health remedies), and notebook
              ready. {fullName} specializes in deep Vimshottari Dasha analysis.
            </p>
          </section>
        </section>

        <aside className="audio-side-column">
          <section className="audio-info-card audio-astrologer-card">
            <div className="audio-astrologer-heading">
              <Image src={astrologer.image} alt="" width={96} height={96} />
              <div>
                <h2>
                  {fullName}{" "}
                  <BadgeCheck size={22} fill="currentColor" color="#ffffff" />
                </h2>
                <p>
                  {homepageAstrologer?.specialty || astrologer.specialty}{" "}
                  <span>•</span>{" "}
                  {homepageAstrologer?.experience ||
                    `${astrologer.experience}+ Yrs`}
                </p>
                <div className="audio-rating">
                  <b>
                    <Star size={14} fill="currentColor" aria-hidden="true" />{" "}
                    {astrologer.rating}
                  </b>
                  <span>
                    ({homepageAstrologer?.reviews || astrologer.reviews}{" "}
                    Consultations )
                  </span>
                </div>
              </div>
            </div>
            <div className="audio-astrologer-meta">
              <span>
                <strong>Languages:</strong> {astrologer.languages}
              </span>
              <span>
                <strong>Specialty:</strong>{" "}
                {homepageAstrologer?.specialty || astrologer.specialty}
              </span>
            </div>
          </section>

          <section className="audio-info-card audio-accounting-card">
            <div className="audio-card-heading">
              <h2>
                <Wallet size={23} /> Live Session Accounting
              </h2>
              <span
                className={`audio-billing-badge${ended ? " is-paused" : ""}`}
              >
                {ended ? "Billing Paused" : "Active Billing"}
              </span>
            </div>
            <dl className="audio-accounting-list">
              <div>
                <dt>Consultation Rate:</dt>
                <dd className="audio-rate-value">
                  <IndianRupee size={15} aria-hidden="true" />
                  <span>{rate.toFixed(2)} / min</span>
                </dd>
              </div>
              <div>
                <dt>Session Duration:</dt>
                <dd>
                  {String(Math.floor(seconds / 60)).padStart(2, "0")} mins{" "}
                  {String(seconds % 60).padStart(2, "0")} secs
                </dd>
              </div>
              <div>
                <dt>Accrued Charges:</dt>
                <dd className="audio-gold-value audio-money-value">
                  <IndianRupee size={15} aria-hidden="true" />
                  <span>{accrued.toFixed(2)}</span>
                </dd>
              </div>
              <div>
                <dt>Available Wallet Balance:</dt>
                <dd className="audio-green-value audio-money-value">
                  <IndianRupee size={15} aria-hidden="true" />
                  <span>{balance.toFixed(2)}</span>
                </dd>
              </div>
            </dl>
            <div className="audio-runway-card">
              <div className="audio-runway-head">
                <strong>Estimated Runway</strong>
                <b>
                  {ended
                    ? "Session complete"
                    : `~${Math.floor(runway / 60)} minutes remaining`}
                </b>
              </div>
              <div className="audio-runway-track">
                <i style={{ width: `${(balance / startingBalance) * 100}%` }} />
              </div>
              <div className="audio-runway-foot">
                <span>
                  {ended ? "Billing stopped" : "Auto-debited from wallet"}
                </span>
                <Link href="/wallet">
                  <Plus size={15} aria-hidden="true" /> RECHARGE WALLET
                </Link>
              </div>
            </div>
          </section>

          <section className="audio-security-card">
            <h2>Session Protocol &amp; Security</h2>
            <p>
              <CircleCheck size={17} /> End-to-end encrypted audio stream
            </p>
            <p>
              <CircleCheck size={17} /> Strict astrologer code of
              confidentiality
            </p>
            <p>
              <CircleCheck size={17} /> Automated minute-by-minute ledger
              logging
            </p>
          </section>
          {ended && (
            <Link
              className="audio-return-link"
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
