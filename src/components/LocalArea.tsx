import { ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { ScrollReveal } from "./ScrollReveal";
import type { Dictionary } from "@/lib/i18n/en";

interface LocalAreaProps {
  dict: Dictionary;
  links: { name: string; url: string; description: string }[];
}

export function LocalArea({ dict, links }: LocalAreaProps) {
  return (
    <section className="py-24 px-6 md:px-12 bg-warm-white">
      <ScrollReveal>
        <SectionHeader
          tag={dict.localArea.tag}
          title={dict.localArea.title}
          subtitle={dict.localArea.subtitle}
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1100px]">
        {links.map((link, i) => (
          <ScrollReveal key={link.url} delay={(i % 5) * 0.08}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-5 bg-cream rounded-[4px] no-underline text-dark transition-all duration-300 border border-transparent hover:border-earth hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(44,36,22,0.08)]"
            >
              <ExternalLink
                size={18}
                className="text-earth shrink-0 mt-0.5"
              />
              <div>
                <span className="text-[0.88rem] font-medium block mb-1">
                  {link.name}
                </span>
                <span className="text-[0.78rem] text-muted leading-[1.5]">
                  {link.description}
                </span>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
