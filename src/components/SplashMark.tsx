/* Off The Muscle's recurring section mark: a water droplet, tinted by the
   current text color so it inherits each section's accent. */
export default function SplashMark({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 30" fill="none" aria-hidden="true" className={`${className} select-none`}>
      <path
        d="M12 1C16 8 22 13 22 19a10 10 0 1 1-20 0C2 13 8 8 12 1Z"
        fill="currentColor"
      />
      <path
        d="M7.5 17.5c0 2.6 1.7 4.6 4 5.2"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
