import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/2348123456789"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mama Tee's Kitchen on WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-surface/90 border border-gold/40 backdrop-blur-md flex items-center justify-center text-gold hover:bg-gold/10 hover:scale-105 transition-all shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]"
    >
      <MessageCircle size={20} strokeWidth={1.5} />
    </a>
  );
}