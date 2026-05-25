import { createFileRoute } from "@tanstack/react-router";
import bannerCatfish from "@/assets/banner-catfish.jpg";
import bannerJollof from "@/assets/banner-jollof.jpg";

export const Route = createFileRoute("/specials")({
  head: () => ({
    meta: [
      { title: "Specials — Mama Tee's Kitchen Abuja" },
      { name: "description", content: "Friday Catfish Pepper Soup and Sunday Family Meal Deal at Mama Tee's Kitchen, Wuse 2 Abuja." },
    ],
  }),
  component: Specials,
});

function Specials() {
  return (
    <div className="px-5 pt-10 pb-24 max-w-4xl mx-auto">
      <div className="text-center">
        <p className="uppercase tracking-[0.5em] text-xs text-gold">House Specials</p>
        <h1 className="font-display text-5xl md:text-6xl mt-3">Reserved for the week.</h1>
      </div>

      <section className="mt-16 relative overflow-hidden rounded-md">
        <img src={bannerCatfish} alt="Catfish pepper soup" loading="lazy" className="w-full h-80 md:h-[28rem] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
        <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end">
          <p className="uppercase tracking-[0.4em] text-xs text-gold">Friday Only</p>
          <h2 className="font-display text-4xl md:text-5xl mt-2">Catfish Pepper Soup</h2>
          <p className="font-display text-5xl md:text-6xl text-gold mt-3">₦3,500</p>
          <p className="text-muted-foreground text-sm mt-3 max-w-md">
            From 12pm until sold out. Hand-caught catfish, utazi, scotch bonnet
            and a broth that has fed three generations.
          </p>
        </div>
      </section>

      <section className="mt-12 relative overflow-hidden rounded-md">
        <img src={bannerJollof} alt="Sunday family meal jollof" loading="lazy" className="w-full h-80 md:h-[28rem] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
        <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end">
          <p className="uppercase tracking-[0.4em] text-xs text-gold">Sundays</p>
          <h2 className="font-display text-4xl md:text-5xl mt-2">Family Meal Deal</h2>
          <p className="font-display text-5xl md:text-6xl text-gold mt-3">₦7,000</p>
          <ul className="mt-4 text-sm text-muted-foreground space-y-1">
            <li>· 2 Large Jollof Rice</li>
            <li>· 2 Chicken Pieces</li>
            <li>· 1 Moi Moi</li>
            <li>· 2 Drinks</li>
          </ul>
        </div>
      </section>
    </div>
  );
}