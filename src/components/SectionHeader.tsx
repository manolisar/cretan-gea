import { useUC } from "@/hooks/useGreekUpperCase";

interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  className?: string;
  tagClassName?: string;
  titleClassName?: string;
}

export function SectionHeader({
  tag,
  title,
  subtitle,
  className = "",
  tagClassName = "text-earth",
  titleClassName = "",
}: SectionHeaderProps) {
  const uc = useUC();
  return (
    <div className={`max-w-[560px] mb-12 ${className}`}>
      <span
        className={`inline-block text-[0.68rem] tracking-[0.3em] uppercase ${tagClassName} mb-4`}
      >
        {uc(tag)}
      </span>
      <h2
        className={`font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.2] mb-4 ${titleClassName}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-muted leading-[1.7]">{subtitle}</p>
      )}
    </div>
  );
}
