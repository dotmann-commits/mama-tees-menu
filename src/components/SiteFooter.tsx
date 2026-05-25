import { Link } from "@tanstack/react-router";
import { Instagram, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <h3 className="font-display text-3xl text-gold">Mama Tee's Kitchen</h3>
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
            Authentic Nigerian cuisine, plated with the elegance of a fine
            dining experience in the heart of Abuja.
          </p>
        </div>
        <div className="text-sm text-muted-foreground space-y-3">
          <p className="uppercase tracking-[0.3em] text-xs text-gold mb-4">Visit</p>
          <p className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" /> 14 Adetokunbo Ademola Crescent, Wuse 2, Abuja, FCT</p>
          <p className="flex items-center gap-3"><Phone size={16} className="text-gold" /> 0812 345 6789</p>
          <a href="https://instagram.com/mamateeskitchen" className="flex items-center gap-3 hover:text-foreground transition-colors"><Instagram size={16} className="text-gold" /> @mamateeskitchen</a>
        </div>
        <div className="text-sm text-muted-foreground space-y-2">
          <p className="uppercase tracking-[0.3em] text-xs text-gold mb-4">Hours</p>
          <p className="flex justify-between"><span>Mon – Fri</span><span>8am – 9pm</span></p>
          <p className="flex justify-between"><span>Saturday</span><span>9am – 10pm</span></p>
          <p className="flex justify-between"><span>Sunday</span><span>11am – 7pm</span></p>
        </div>
      </div>
      <div className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground tracking-[0.2em] uppercase">
        © {new Date().getFullYear()} Mama Tee's Kitchen · <Link to="/menu" className="hover:text-gold">View Menu</Link>
      </div>
    </footer>
  );
}