import Script from "next/script";

/* Google Analytics 4, gated on NEXT_PUBLIC_GA_ID so nothing loads until a
   real measurement ID (G-XXXXXXXXXX) is set in Vercel. Loaded after the page
   is interactive so it never competes with the hero. */
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
