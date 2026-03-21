interface SectionDividerProps {
  variant?: "leaf" | "dots" | "line";
}

export function SectionDivider({ variant = "leaf" }: SectionDividerProps) {
  if (variant === "line") {
    return (
      <div className="section-divider py-8">
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className="section-divider py-8 gap-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-gold opacity-50"
          />
        ))}
      </div>
    );
  }

  // variant === "leaf"
  return (
    <div className="section-divider py-8">
      <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-gold opacity-60 mx-3"
      >
        {/* Olive branch — simple stylized leaf motif */}
        <path
          d="M12 2C12 2 8 6 8 10C8 12.5 9.5 14 12 14C14.5 14 16 12.5 16 10C16 6 12 2 12 2Z"
          fill="currentColor"
          opacity="0.7"
        />
        <path
          d="M12 14V22"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M7 8C7 8 5 10 5 12.5C5 14 6 15 7.5 15"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M17 8C17 8 19 10 19 12.5C19 14 18 15 16.5 15"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </svg>
      <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
    </div>
  );
}
