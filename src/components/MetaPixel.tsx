"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/* Meta Pixel (base code). Installed once here in the root layout, so it runs on
   every page. Loaded after the page is interactive so it never competes with
   the hero. The base snippet fires PageView on first load; Next.js navigates
   between pages without a full reload, so we also fire PageView on each
   client-side route change, which is what Meta expects from a single-page app. */
export const META_PIXEL_ID = "2615425398904909";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/* Safe event helper for the rest of the app: no-op if the pixel is blocked. */
export function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}

export default function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    // the inline base code already tracked the first PageView
    if (first.current) {
      first.current = false;
      return;
    }
    fbqTrack("PageView");
  }, [pathname]);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
