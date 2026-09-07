"use client";

import dynamic from "next/dynamic";

/* The lead popup, live chat, and back-to-top button are pure client
   conveniences that nobody needs in the first second. Loading them as
   separate, client-only chunks keeps their JavaScript (and framer-motion
   work) out of the critical path, so the hero paints sooner on phones. */
const TravisPopup = dynamic(() => import("@/components/TravisPopup"), { ssr: false });
const LiveChat = dynamic(() => import("@/components/LiveChat"), { ssr: false });
const DropTop = dynamic(() => import("@/components/DropTop"), { ssr: false });

export default function DeferredWidgets() {
  return (
    <>
      <TravisPopup />
      <LiveChat />
      <DropTop />
    </>
  );
}
