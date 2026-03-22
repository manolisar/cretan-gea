import { useUC } from "@/hooks/useGreekUpperCase";

interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  className?: string;
  tagClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionHeader({
  tag,
  title,
  subtitle,
  className = "",
  tagClassName = "text-burgundy",
  titleClassName = "",
  subtitleClassName = "text-[#8A8075]",
}: SectionHeaderProps) {
  const uc = useUC();
  return (
    <div className={`max-w-[560px] mb-12 ${className}`}>
      <span
        className={`font-[family-name:var(--font-nav)] inline-block text-[0.68rem] tracking-[0.3em] uppercase ${tagClassName} mb-4`}
      >
        {uc(tag)}
      </span>
      <h2
        className={`font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.2] mb-4 text-[#1A1A1A] ${titleClassName}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`font-[family-name:var(--font-sans)] text-[0.95rem] ${subtitleClassName} leading-[1.7]`}>{subtitle}</p>
      )}
    </div>
  );
}
