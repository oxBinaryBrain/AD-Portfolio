export function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export function HeroCircleSvg() {
  return (
    <svg
      className="hero-circle-svg"
      viewBox="0 0 120 45"
      fill="none"
      aria-hidden
    >
      <ellipse
        cx="60"
        cy="22.5"
        rx="58"
        ry="20"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}