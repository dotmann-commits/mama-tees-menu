import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mic } from "lucide-react";
import bannerJollof from "@/assets/banner-jollof.jpg";
import bannerEgusi from "@/assets/banner-egusi.jpg";
import bannerFish from "@/assets/banner-fish.jpg";
import bannerSmall from "@/assets/banner-smallchops.jpg";
import bannerCatfish from "@/assets/banner-catfish.jpg";
import bannerDrinks from "@/assets/banner-drinks.jpg";
import { useVapi, VapiOverlay } from "@/components/VapiAssistant";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Mama Tee's Kitchen Abuja" },
      { name: "description", content: "Jollof, egusi, pepper soup, small chops and Nigerian drinks — served in Wuse 2, Abuja." },
    ],
  }),
  component: MenuPage,
});

type Item = { name: string; price: string; desc?: string };
type Group = { title: string; items: Item[]; banner?: { src: string; alt: string; caption: string } };

const food: Group[] = [
  {
    title: "Rice Dishes",
    items: [
      { name: "Jollof Rice (Small)", price: "₦1,500", desc: "Smoky Nigerian party jollof rice" },
      { name: "Jollof Rice (Large)", price: "₦2,500" },
      { name: "Fried Rice (Small)", price: "₦1,500", desc: "Mixed vegetables and liver fried rice" },
      { name: "Fried Rice (Large)", price: "₦2,500" },
      { name: "White Rice and Stew", price: "₦1,500" },
      { name: "Coconut Rice", price: "₦2,000" },
    ],
    banner: { src: bannerJollof, alt: "Smoky jollof rice", caption: "Party Jollof · slow-smoked over open flame" },
  },
  {
    title: "Swallow & Soup",
    items: [
      { name: "Eba and Egusi Soup", price: "₦2,000" },
      { name: "Eba and Ogbono Soup", price: "₦2,000" },
      { name: "Eba and Bitterleaf Soup", price: "₦2,000" },
      { name: "Pounded Yam and Egusi Soup", price: "₦2,500" },
      { name: "Pounded Yam and Ogbono Soup", price: "₦2,500" },
      { name: "Amala and Ewedu with Gbegiri", price: "₦2,000" },
      { name: "Wheat and Oha Soup", price: "₦2,500" },
    ],
    banner: { src: bannerEgusi, alt: "Egusi soup with pounded yam", caption: "Egusi & Pounded Yam · hand-pounded daily" },
  },
  {
    title: "Proteins",
    items: [
      { name: "Chicken", price: "₦1,000" },
      { name: "Turkey", price: "₦1,500" },
      { name: "Beef", price: "₦1,000" },
      { name: "Fish", price: "₦1,200" },
      { name: "Goat Meat", price: "₦1,500" },
      { name: "Ponmo", price: "₦500" },
      { name: "Shaki", price: "₦800" },
    ],
    banner: { src: bannerFish, alt: "Whole peppered fish", caption: "Peppered Fish · charred, citrus-finished" },
  },
  {
    title: "Small Chops & Snacks",
    items: [
      { name: "Puff Puff", price: "₦800" },
      { name: "Moi Moi", price: "₦600" },
      { name: "Akara", price: "₦500" },
      { name: "Peppered Gizzard", price: "₦1,500" },
      { name: "Peppered Chicken Wings", price: "₦2,000" },
      { name: "Peppered Fish", price: "₦1,500" },
    ],
    banner: { src: bannerSmall, alt: "Nigerian small chops platter", caption: "Small Chops · the table's first applause" },
  },
  {
    title: "Chef's Note",
    items: [],
    banner: { src: bannerCatfish, alt: "Catfish pepper soup", caption: "Catfish Pepper Soup · Fridays only · ₦3,500" },
  },
];

const drinks: Item[] = [
  { name: "Coke / Fanta / Sprite", price: "₦400" },
  { name: "Malt", price: "₦500" },
  { name: "Bottled Water", price: "₦200" },
  { name: "Zobo", price: "₦600" },
  { name: "Kunu", price: "₦600" },
  { name: "Chapman", price: "₦800" },
];

function MenuPage() {
  const [tab, setTab] = useState<"food" | "drinks">("food");
  const { status, open, error, speaking, start, stop, close } = useVapi();

  return (
    <div className="px-5 pt-10 pb-24 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <p className="uppercase tracking-[0.5em] text-xs text-gold">À la carte</p>
        <h1 className="font-display text-5xl md:text-6xl mt-3">The Menu</h1>
        <p className="text-muted-foreground text-sm mt-3">Prices in Naira · Service included</p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 border-y border-border">
        {(["food", "drinks"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative py-6 font-display text-2xl md:text-3xl uppercase tracking-[0.3em] transition-colors ${
              tab === t ? "text-gold gold-underline" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === "food" ? (
          <motion.div
            key="food"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-14 space-y-16"
          >
            {food.map((group) => (
              <section key={group.title}>
                <h2 className="font-display text-3xl text-gold text-center tracking-wide">
                  {group.title}
                </h2>
                <div className="mt-3 mx-auto w-16 h-px bg-gold/40" />

                {group.items.length > 0 && (
                  <ul className="mt-10 space-y-9">
                    {group.items.map((it) => (
                      <li key={it.name}>
                        <div className="flex items-baseline">
                          <span className="font-display text-xl md:text-2xl text-foreground">
                            {it.name}
                          </span>
                          <span className="menu-dotline" />
                          <span className="font-display text-xl md:text-2xl text-gold tabular-nums">
                            {it.price}
                          </span>
                        </div>
                        {it.desc && (
                          <p className="text-sm text-muted-foreground mt-2 italic">{it.desc}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                {group.banner && (
                  <figure className="mt-14 relative overflow-hidden rounded-md">
                    <img
                      src={group.banner.src}
                      alt={group.banner.alt}
                      loading="lazy"
                      className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <figcaption className="absolute bottom-5 left-5 right-5 font-display text-xl text-foreground">
                      {group.banner.caption}
                    </figcaption>
                  </figure>
                )}
              </section>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="drinks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-14 space-y-14"
          >
            <section>
              <h2 className="font-display text-3xl text-gold text-center tracking-wide">
                The Drinks List
              </h2>
              <div className="mt-3 mx-auto w-16 h-px bg-gold/40" />
              <ul className="mt-10 space-y-9">
                {drinks.map((it) => (
                  <li key={it.name} className="flex items-baseline">
                    <span className="font-display text-xl md:text-2xl">{it.name}</span>
                    <span className="menu-dotline" />
                    <span className="font-display text-xl md:text-2xl text-gold tabular-nums">
                      {it.price}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <figure className="relative overflow-hidden rounded-md">
              <img
                src={bannerDrinks}
                alt="Chapman and Zobo Nigerian drinks"
                loading="lazy"
                className="w-full h-72 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <figcaption className="absolute bottom-6 left-6 right-6">
                <p className="text-xs uppercase tracking-[0.4em] text-gold">House Pour</p>
                <p className="font-display text-2xl mt-1">Chapman · Zobo · Kunu</p>
              </figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Assistant CTA — contextual, refined */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-20"
      >
        <div className="relative overflow-hidden rounded-xl border border-gold/20 bg-surface">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-xl bg-[radial-gradient(ellipse_at_top,_color-mix(in_oklab,_var(--gold)_12%,_transparent),_transparent_55%)]"
          />
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <div className="relative flex flex-col sm:flex-row items-center gap-5 px-6 py-7 sm:px-10 sm:py-8 text-center sm:text-left">
            <div className="relative shrink-0">
              <span className="absolute inset-0 rounded-full bg-gold/20 blur-xl scale-125" />
              <div className="relative w-12 h-12 rounded-full border border-gold/50 bg-background flex items-center justify-center">
                <Mic size={20} className="text-gold" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="uppercase tracking-[0.4em] text-[10px] text-gold">Quick order</p>
              <h3 className="font-display text-xl sm:text-2xl mt-1 leading-tight">
                Want to order?
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                Speak with our AI Assistant and place your order effortlessly.
              </p>
            </div>

            <button
              onClick={start}
              className="shrink-0 inline-flex items-center gap-2.5 rounded-full border border-gold/60 px-5 py-2.5 text-gold uppercase tracking-[0.25em] text-[11px] hover:bg-gold/10 transition-colors"
            >
              <Mic size={14} />
              Start Order
            </button>
          </div>
        </div>
      </motion.div>

      <VapiOverlay
        open={open}
        status={status}
        error={error}
        speaking={speaking}
        onClose={close}
        onStop={stop}
      />
    </div>
  );
}