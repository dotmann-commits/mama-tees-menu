import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Instagram, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mama Tee's Kitchen Wuse 2, Abuja" },
      { name: "description", content: "Visit Mama Tee's Kitchen at 14 Adetokunbo Ademola Crescent, Wuse 2, Abuja. Open daily." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="px-5 pt-16 pb-24 max-w-3xl mx-auto">
      <div className="text-center">
        <p className="uppercase tracking-[0.5em] text-xs text-gold">Find Us</p>
        <h1 className="font-display text-5xl md:text-6xl mt-3">Pull up a chair.</h1>
      </div>

      <div className="mt-16 space-y-10">
        <div className="flex items-start gap-5 border-b border-border pb-8">
          <MapPin className="text-gold mt-1" />
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-muted-foreground">Address</p>
            <p className="font-display text-2xl mt-1">14 Adetokunbo Ademola Crescent</p>
            <p className="text-muted-foreground">Wuse 2, Abuja, FCT</p>
          </div>
        </div>
        <div className="flex items-start gap-5 border-b border-border pb-8">
          <Phone className="text-gold mt-1" />
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-muted-foreground">Phone</p>
            <a href="tel:08123456789" className="font-display text-2xl mt-1 hover:text-gold">0812 345 6789</a>
          </div>
        </div>
        <div className="flex items-start gap-5 border-b border-border pb-8">
          <Instagram className="text-gold mt-1" />
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-muted-foreground">Instagram</p>
            <a href="https://instagram.com/mamateeskitchen" className="font-display text-2xl mt-1 hover:text-gold">@mamateeskitchen</a>
          </div>
        </div>
        <div className="flex items-start gap-5">
          <Clock className="text-gold mt-1" />
          <div className="flex-1">
            <p className="uppercase tracking-[0.3em] text-xs text-muted-foreground">Opening Hours</p>
            <dl className="mt-3 space-y-2 font-display text-lg">
              <div className="flex justify-between"><dt>Monday – Friday</dt><dd className="text-gold">8am – 9pm</dd></div>
              <div className="flex justify-between"><dt>Saturday</dt><dd className="text-gold">9am – 10pm</dd></div>
              <div className="flex justify-between"><dt>Sunday</dt><dd className="text-gold">11am – 7pm</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}