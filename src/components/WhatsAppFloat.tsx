import { CONTACT } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/en";

export function WhatsAppFloat({ dict }: { dict: Dictionary }) {
  return (
    <a
      href={CONTACT.whatsappUrl(dict.whatsapp.defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[99] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.35)] text-white no-underline transition-transform duration-300 hover:scale-110 animate-[fadeUp_0.8s_1.2s_forwards] opacity-0"
      title={dict.whatsapp.title}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.29-1.24l-.308-.184-2.867.852.852-2.867-.184-.308A8 8 0 1112 20z" />
      </svg>
    </a>
  );
}
