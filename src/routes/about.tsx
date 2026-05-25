import { createFileRoute, Link } from "@tanstack/react-router";
import aboutImg from "@/assets/about-mamatee.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Mama Tee — A Story Plated in Abuja" },
      { name: "description", content: "The story behind Mama Tee's Kitchen — a love letter to Nigerian cuisine served from the heart of Wuse 2, Abuja." },
      { property: "og:title", content: "About Mama Tee's Kitchen" },
      { property: "og:description", content: "A Nigerian dining story rooted in family, fire and flavour." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pb-24">
      <section className="px-5 pt-14 max-w-2xl mx-auto text-center">
        <p className="uppercase tracking-[0.5em] text-xs text-gold">Our Story</p>
        <h1 className="font-display text-5xl md:text-6xl mt-4 leading-[1.05]">
          About <em className="text-gold not-italic">Mama Tee</em>
        </h1>
        <p className="text-muted-foreground mt-6 leading-relaxed">
          A love letter to Nigerian cuisine, served from the heart of Wuse 2.
        </p>
      </section>

      <section className="mt-16 max-w-5xl mx-auto px-5">
        <div className="relative overflow-hidden">
          <img
            src={aboutImg}
            alt="Mama Tee plating Nigerian cuisine"
            loading="lazy"
            width={1280}
            height={1600}
            className="w-full h-[60vh] md:h-[75vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
      </section>

      <section className="mt-16 px-5 max-w-2xl mx-auto space-y-10 text-foreground/90 leading-[1.85]">
        <p>
          Mama Tee began the way most Nigerian stories begin — around a wood
          fire, with a pot too heavy for one woman, and the laughter of family
          warming the room more than the embers.
        </p>
        <div className="border-t border-border/60" />
        <p>
          For three decades she fed a neighbourhood. In 2019 she finally let
          Abuja in. What was once a Sunday family table is now a quiet,
          candle-lit room on Adetokunbo Ademola Crescent — where smoky party
          jollof, hand-pulled pounded yam and pepper soup taste exactly the way
          they should.
        </p>
        <div className="border-t border-border/60" />
        <p>
          Nothing here is fusion. Nothing is rebranded. Every plate is
          Nigerian, prepared the slow way, plated with the kind of care that
          only comes from a kitchen that has loved its guests for a very long
          time.
        </p>
      </section>

      <section className="mt-20 px-5 text-center">
        <p className="uppercase tracking-[0.5em] text-xs text-gold">Visit Us</p>
        <p className="font-display text-2xl md:text-3xl mt-4">
          14 Adetokunbo Ademola Crescent
          <br />
          <span className="text-muted-foreground">Wuse 2, Abuja</span>
        </p>
        <div className="mt-10">
          <Link
            to="/contact"
            className="inline-block px-8 py-4 border border-gold/60 text-gold uppercase tracking-[0.3em] text-xs hover:bg-gold/10 transition-colors"
          >
            Find Us
          </Link>
        </div>
      </section>
    </div>
  );
}