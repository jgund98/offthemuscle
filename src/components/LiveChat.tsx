"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE, PROPERTY_OPTIONS } from "@/lib/site";

/* Live "chat with Jason" — a guided, on-brand conversation that MIRRORS the
   quote form: it walks the same fields in the same order (property → services →
   name → phone → email → notes) and posts to the same /api/lead endpoint.
   It sends automatically once the flow completes, and — as a safety net — if a
   visitor gives a phone or email and then goes quiet for 5 minutes, it sends
   what it has so the lead is never lost. */

type Msg = { from: "jason" | "you"; text: string };
type Step = "property" | "services" | "name" | "phone" | "email" | "notes" | "done";

const AUTOSEND_MS = 5 * 60 * 1000;

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  // on mobile the launcher waits until the hero (and its CTAs) are scrolled
  // past, so it never competes with the hero + sticky dock at once
  const [pastHero, setPastHero] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", update);
    };
  }, []);
  const launcherVisible = isDesktop || pastHero;
  const [step, setStep] = useState<Step>("property");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "jason", text: "Hey, it's Jason 👋 Owner here. Quick few questions and I'll get you a free estimate. First — where are we washing?" },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [svcSel, setSvcSel] = useState<string[]>([]);
  const data = useRef<{ property?: string; propertyLabel?: string; services: string[]; name?: string; phone?: string; email?: string; notes?: string }>({ services: [] });
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState<null | boolean>(null);
  const sentRef = useRef(false);
  const autosendTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeProperty = PROPERTY_OPTIONS.find((p) => p.key === data.current.property);

  // gentle one-time nudge after 30s if they haven't opened it — late enough
  // that it never stacks on top of the estimate popup's moment
  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 30000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, open]);

  const jasonSays = (text: string, after?: () => void) => {
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "jason", text }]);
      after?.();
    }, 750);
    return () => clearTimeout(t);
  };

  const pushYou = (text: string) => setMsgs((m) => [...m, { from: "you", text }]);

  // POST the lead. Idempotent — auto-send + manual send can both fire; only the
  // first wins. Sends whatever we have (never blocks on optional fields).
  const sendLead = async () => {
    if (sentRef.current) return;
    sentRef.current = true;
    if (autosendTimer.current) clearTimeout(autosendTimer.current);
    const d = data.current;
    setSending(true);
    setSentOk(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: d.name,
          phone: d.phone,
          email: d.email,
          property: d.propertyLabel || d.property,
          services: d.services.length ? d.services : "Not sure yet — walk me through it",
          notes: d.notes,
          source: "Live chat",
        }),
      });
      setSentOk(res.ok);
      if (!res.ok) sentRef.current = false; // allow a manual retry
    } catch {
      setSentOk(false);
      sentRef.current = false;
    } finally {
      setSending(false);
    }
  };

  // once we have a way to reach them, arm a 5-min inactivity auto-send
  const armAutoSend = () => {
    if (autosendTimer.current) clearTimeout(autosendTimer.current);
    autosendTimer.current = setTimeout(() => {
      if (!sentRef.current && (data.current.phone || data.current.email)) sendLead();
    }, AUTOSEND_MS);
  };
  useEffect(() => () => { if (autosendTimer.current) clearTimeout(autosendTimer.current); }, []);

  const advance = (value: string) => {
    if (!value.trim()) return;
    if (autosendTimer.current) clearTimeout(autosendTimer.current); // activity resets the timer
    setDraft("");
    const skip = /^(skip|no|nope|n\/a|none)$/i.test(value.trim());

    if (step === "name") {
      pushYou(value);
      data.current.name = value;
      setStep("phone");
      jasonSays(`Good to meet you, ${value}! What's the best number to text your free estimate?`);
    } else if (step === "phone") {
      pushYou(value);
      data.current.phone = value;
      setStep("email");
      armAutoSend();
      jasonSays("Got it. What's your email? I'll send the written estimate there too — or tap Skip.");
    } else if (step === "email") {
      pushYou(skip ? "Skip" : value);
      data.current.email = skip ? undefined : value;
      setStep("notes");
      armAutoSend();
      jasonSays("Perfect. Anything else I should know? (gate code, problem spots, timeline) — or tap Skip.");
    } else if (step === "notes") {
      pushYou(skip ? "Skip" : value);
      data.current.notes = skip ? undefined : value;
      finish();
    }
  };

  const pickProperty = (opt: (typeof PROPERTY_OPTIONS)[number]) => {
    pushYou(opt.label);
    data.current.property = opt.key;
    data.current.propertyLabel = opt.label;
    setStep("services");
    jasonSays(`${opt.label} — got it. What needs the wash? Tap all that apply, then hit "That's all".`);
  };

  const confirmServices = () => {
    const chosen = svcSel.length ? svcSel : ["Not sure yet"];
    data.current.services = chosen;
    pushYou(chosen.join(", "));
    setStep("name");
    jasonSays("Perfect. What's your first name?");
  };

  const finish = () => {
    setStep("done");
    jasonSays(
      `You're all set${data.current.name ? `, ${data.current.name}` : ""} — I'll get you a straight price, usually the same day. Talk soon! 🧼`,
      () => sendLead() // completed flow = enough info, send automatically
    );
  };

  const inputMode = step === "phone" ? "tel" : step === "email" ? "email" : "text";
  const placeholder =
    step === "name" ? "First name…"
    : step === "phone" ? "(561) 555-0134"
    : step === "email" ? "you@email.com (optional)"
    : step === "notes" ? "Anything else… (optional)"
    : "Type a message…";

  return (
    <>
      {/* launcher — slides in only once it has the stage to itself */}
      <div
        className={`fixed bottom-[5.5rem] right-4 z-50 transition-all duration-500 lg:bottom-6 lg:right-6 ${
          open ? "pointer-events-none opacity-0 lg:opacity-100 lg:pointer-events-auto" : ""
        } ${
          launcherVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
        }`}
      >
        <AnimatePresence>
          {nudge && !open && launcherVisible && (
            <motion.button
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => { setOpen(true); setNudge(false); }}
              className="absolute bottom-16 right-0 w-56 rounded-2xl rounded-br-sm border border-hydro/20 bg-white p-3.5 text-left shadow-[0_16px_40px_-16px_rgba(6,24,38,0.5)]"
            >
              <span className="mb-1 block text-[0.6rem] font-bold uppercase tracking-[0.18em] text-brand">Jason · Off The Muscle</span>
              <span className="block text-sm leading-snug text-ink">Got a property that needs a wash? Let&apos;s talk 👋</span>
            </motion.button>
          )}
        </AnimatePresence>
        <button
          onClick={() => { setOpen((o) => !o); setNudge(false); }}
          aria-label={open ? "Close chat" : "Chat with Jason"}
          className="group relative flex items-center gap-3 rounded-full border-2 border-foam/15 bg-abyss/90 py-2 pl-2 pr-5 shadow-[0_12px_36px_-10px_rgba(29,169,232,0.6)] backdrop-blur-md transition-transform hover:scale-[1.03]"
        >
          <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full ring-2 ring-hydro">
            <Image src="/images/jason-face.jpg" alt="Jason" fill className="object-cover" sizes="44px" />
          </span>
          {!open && (
            <span className="hidden text-left leading-none sm:block">
              <span className="block text-[0.6rem] font-bold uppercase tracking-[0.18em] text-spray">Live chat</span>
              <span className="display mt-1 block text-sm text-foam">Chat with Jason</span>
            </span>
          )}
          <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-abyss bg-hydro">
            <span className="absolute inset-0 animate-ping rounded-full bg-hydro" />
          </span>
        </button>
      </div>

      {/* panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-[60] flex h-[68svh] max-h-[calc(100svh-5.5rem)] flex-col overflow-hidden rounded-[1.75rem] border border-hydro/20 bg-white shadow-[0_48px_120px_-24px_rgba(6,24,38,0.75)] lg:inset-x-auto lg:right-6 lg:bottom-28 lg:h-[70vh] lg:max-h-[560px] lg:w-[24rem]"
            role="dialog"
            aria-label="Chat with Jason"
          >
            {/* header */}
            <div className="relative flex items-center gap-3 bg-abyss p-4" style={{ clipPath: "polygon(0 0,100% 0,100% 84%,0 100%)" }}>
              <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full ring-2 ring-hydro">
                <Image src="/images/jason-face.jpg" alt="Jason" fill className="object-cover" sizes="44px" />
              </span>
              <div className="leading-tight">
                <p className="display text-lg text-foam">Jason</p>
                <p className="flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-spray">
                  <span className="h-1.5 w-1.5 rounded-full bg-hydro" /> Owner · usually replies fast
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="ml-auto mb-2 grid h-9 w-9 place-items-center rounded-full bg-foam/10 text-foam transition-colors hover:bg-foam/20">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto bg-ice/50 p-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug ${
                      m.from === "you"
                        ? "rounded-br-sm bg-hydro text-abyss"
                        : "rounded-bl-sm bg-white text-ink shadow-[0_4px_16px_-8px_rgba(13,37,55,0.4)]"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-[0_4px_16px_-8px_rgba(13,37,55,0.4)]">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate/50" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              {/* property chips — mirrors the form's "Where are we washing?" */}
              {step === "property" && !typing && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {PROPERTY_OPTIONS.map((p) => (
                    <button
                      key={p.key}
                      onClick={() => pickProperty(p)}
                      className="rounded-full border border-brand/30 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand transition-colors hover:border-hydro hover:bg-hydro hover:text-abyss"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
              {/* services multi-select — mirrors "What needs the wash? (tap all)" */}
              {step === "services" && !typing && activeProperty && (
                <div className="pt-1">
                  <div className="flex flex-wrap gap-2">
                    {activeProperty.services.map((s) => {
                      const on = svcSel.includes(s);
                      return (
                        <button
                          key={s}
                          onClick={() => setSvcSel((cur) => (on ? cur.filter((x) => x !== s) : [...cur, s]))}
                          className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                            on ? "border-hydro bg-hydro text-abyss" : "border-brand/30 bg-white text-brand hover:border-hydro"
                          }`}
                        >
                          {on ? "✓ " : ""}{s}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={confirmServices}
                    className="btn-jet mt-3 rounded-full bg-brand px-4 py-2 text-xs font-bold text-foam transition-transform active:scale-95"
                  >
                    That&apos;s all →
                  </button>
                </div>
              )}
              {/* optional steps get a Skip chip */}
              {(step === "email" || step === "notes") && !typing && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => advance("skip")}
                    className="rounded-full border border-slate/25 bg-white px-3 py-1.5 text-xs font-semibold text-slate transition-colors hover:border-hydro hover:text-brand"
                  >
                    Skip →
                  </button>
                </div>
              )}
            </div>

            {/* composer / done state */}
            {step === "done" ? (
              <div className="border-t border-brand/10 bg-white p-3">
                {sentOk === true ? (
                  <p className="rounded-full bg-hydro/12 py-3 text-center text-sm font-semibold text-brand">
                    ✓ Sent to Jason — he&apos;ll be in touch shortly.
                  </p>
                ) : (
                  <button
                    onClick={sendLead}
                    disabled={sending}
                    className="btn-jet label w-full rounded-full bg-hydro py-3.5 text-center text-abyss disabled:opacity-70"
                  >
                    {sending ? "Sending…" : "Send to Jason →"}
                  </button>
                )}
                {sentOk === false && (
                  <p className="mt-2 text-center text-xs font-semibold text-red-600">
                    Couldn&apos;t send — call or text {SITE.phone} and we&apos;ve got you.
                  </p>
                )}
                <a href={SITE.phoneHref} className="mt-2 block text-center text-xs font-semibold text-slate transition-colors hover:text-brand">
                  Prefer to talk now? Call or text {SITE.phone}
                </a>
              </div>
            ) : step === "property" || step === "services" ? (
              <div className="border-t border-brand/10 bg-white p-3 text-center text-xs font-semibold text-slate">
                👆 Tap {step === "property" ? "where we're washing" : "everything that needs cleaning"} above
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); advance(draft); }}
                className="flex items-center gap-2 border-t border-brand/10 bg-white p-3"
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  inputMode={inputMode}
                  placeholder={placeholder}
                  className="min-w-0 flex-1 rounded-full border border-slate/25 bg-ice/60 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-hydro focus:bg-white"
                  autoComplete={step === "name" ? "given-name" : step === "phone" ? "tel" : "off"}
                />
                <button type="submit" aria-label="Send" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-hydro text-abyss transition-transform active:scale-95">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
