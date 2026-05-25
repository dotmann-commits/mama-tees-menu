import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { ChevronDown, Mic, PhoneOff } from "lucide-react";
import heroJollof from "@/assets/hero-jollof.jpg";
import bannerJollof from "@/assets/banner-jollof.jpg";
import bannerEgusi from "@/assets/banner-egusi.jpg";
import bannerFish from "@/assets/banner-fish.jpg";
import bannerSmallchops from "@/assets/banner-smallchops.jpg";
import bannerDrinks from "@/assets/banner-drinks.jpg";
import { useVapi, VapiOverlay } from "@/components/VapiAssistant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mama Tee's Kitchen — Cinematic Nigerian Dining in Abuja" },
      { name: "description", content: "Smoky jollof, egusi, peppered fish and pepper soup — Abuja's most cinematic Nigerian dining experience in Wuse 2." },
    ],
  }),
  component: Index,
});

type Item = { name: string; price: string; desc?: string };
type Category = { title: string; items: Item[]; banner?: string; bannerAlt?: string };

const FOOD: Category[] = [
  {
    title: "Rice",
    banner: bannerJollof,
    bannerAlt: "Smoky Nigerian jollof rice",
    items: [
      { name: "Jollof Rice (Small)", price: "₦1,500", desc: "Smoky Nigerian party jollof rice" },
      { name: "Jollof Rice (Large)", price: "₦2,500" },
      { name: "Fried Rice (Small)", price: "₦1,500", desc: "Mixed vegetables and liver fried rice" },
      { name: "Fried Rice (Large)", price: "₦2,500" },
      { name: "White Rice and Stew", price: "₦1,500" },
      { name: "Coconut Rice", price: "₦2,000" },
    ],
  },
  {
    title: "Swallow & Soup",
    banner: bannerEgusi,
    bannerAlt: "Egusi soup with pounded yam",
    items: [
      { name: "Eba and Egusi Soup", price: "₦2,000" },
      { name: "Eba and Ogbono Soup", price: "₦2,000" },
      { name: "Eba and Bitterleaf Soup", price: "₦2,000" },
      { name: "Pounded Yam and Egusi Soup", price: "₦2,500" },
      { name: "Pounded Yam and Ogbono Soup", price: "₦2,500" },
      { name: "Amala and Ewedu with Gbegiri", price: "₦2,000" },
      { name: "Wheat and Oha Soup", price: "₦2,500" },
    ],
  },
  {
    title: "Proteins",
    banner: bannerFish,
    bannerAlt: "Peppered fish",
    items: [
      { name: "Chicken", price: "₦1,000" },
      { name: "Turkey", price: "₦1,500" },
      { name: "Beef", price: "₦1,000" },
      { name: "Fish", price: "₦1,200" },
      { name: "Goat Meat", price: "₦1,500" },
      { name: "Ponmo", price: "₦500" },
      { name: "Shaki", price: "₦800" },
    ],
  },
  {
    title: "Small Chops & Snacks",
    banner: bannerSmallchops,
    bannerAlt: "Nigerian small chops platter",
    items: [
      { name: "Puff Puff", price: "₦800" },
      { name: "Moi Moi", price: "₦600" },
      { name: "Akara", price: "₦500" },
      { name: "Peppered Gizzard", price: "₦1,500" },
      { name: "Peppered Chicken Wings", price: "₦2,000" },
      { name: "Peppered Fish", price: "₦1,500" },
    ],
  },
];

const DRINKS: Category[] = [
  {
    title: "Soft Drinks",
    items: [
      { name: "Coke", price: "₦400" },
      { name: "Fanta", price: "₦400" },
      { name: "Sprite", price: "₦400" },
      { name: "Malt", price: "₦500" },
      { name: "Bottled Water", price: "₦200" },
    ],
  },
  {
    title: "Local Drinks",
    banner: bannerDrinks,
    bannerAlt: "Chapman cocktail",
    items: [
      { name: "Zobo", price: "₦600" },
      { name: "Kunu", price: "₦600" },
      { name: "Chapman", price: "₦800" },
    ],
  },
];

function CategoryRow({ cat }: { cat: Category }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-border/60 last:border-b">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-7 px-1 text-left group"
        aria-expanded={open}
      >
        <span className="font-display text-2xl md:text-3xl uppercase tracking-[0.18em] text-foreground group-hover:text-gold transition-colors">
          {cat.title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-gold"
        >
          <ChevronDown size={22} strokeWidth={1.25} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 pt-2 space-y-6">
              {cat.items.map((it) => (
                <div key={it.name} className="px-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-foreground/95 text-base md:text-lg">{it.name}</span>
                    <span className="flex-1 border-b border-dotted border-border/70 translate-y-[-3px]" />
                    <span className="text-gold tracking-wider text-base md:text-lg">{it.price}</span>
                  </div>
                  {it.desc && (
                    <p className="text-muted-foreground text-sm mt-1.5 italic">{it.desc}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



function Index() {
  const vapiRef = useRef<any>(null);
  const [isCalling, setIsCalling] = useState(false);

  const handleVapiCall = async () => {
    try {
      if (!vapiRef.current) {
        const VapiModule = await import("@vapi-ai/web");
        const Vapi = VapiModule.default;

        vapiRef.current = new Vapi(
          import.meta.env.VITE_VAPI_PUBLIC_KEY
        );

        vapiRef.current.on("call-start", () => {
          setIsCalling(true);
        });

        vapiRef.current.on("call-end", () => {
          setIsCalling(false);
      });

        vapiRef.current.on("error", (error: unknown) => {
          console.error(error);
          setIsCalling(false);
        });
      }

      if (isCalling) {
        vapiRef.current.stop();
        return;
      }

      await vapiRef.current.start(
        import.meta.env.VITE_VAPI_ASSISTANT_ID
      );

    } catch (error) {
      console.error("Vapi failed:", error);
    }
  };


  const [tab, setTab] = useState<"food" | "drinks">("food");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden">
        <img
          src={heroJollof}
          alt="Smoky Nigerian jollof rice with plantains"
          className="absolute inset-0 w-full h-full object-cover"
          width={1536}
          height={1920}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background" />
        <div className="absolute inset-0 hero-vignette" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 px-6 pb-16 max-w-3xl mx-auto text-center"
        >
          <p className="uppercase tracking-[0.5em] text-xs text-gold mb-6">Abuja · Est. Wuse 2</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-foreground">
            A Taste of <em className="text-gold not-italic">Home</em>,
            <br /> Plated Like Poetry.
          </h1>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            Smoky party jollof. Pounded yam pulled by hand. Pepper soup that warms the soul.
          </p>
          <button
            onClick={() => {
              setMenuOpen((o) => !o);
              if (!menuOpen) {
                setTimeout(() => {
                  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 80);
              }
            }}
            className="mt-10 inline-block px-8 py-4 border border-gold/60 text-gold uppercase tracking-[0.3em] text-xs hover:bg-gold/10 transition-colors"
          >
            {menuOpen ? "Close Menu ↑" : "View the Menu ↓"}
          </button>
        </motion.div>
      </section>

      {/* MENU EXPERIENCE — hidden until customer opens it */}
      <section id="menu" className="px-5 md:px-10 max-w-3xl mx-auto">
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              key="menu-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-16 pb-4">
                <div className="grid grid-cols-2 border-y border-border/70">
                  {(["food", "drinks"] as const).map((t) => {
                    const active = tab === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`relative py-6 uppercase tracking-[0.4em] text-sm md:text-base transition-colors ${
                          active ? "text-gold" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {t}
                        {active && (
                          <motion.span
                            layoutId="tab-underline"
                            className="absolute left-1/2 -translate-x-1/2 bottom-[-1px] h-[2px] w-16 bg-gold"
                            style={{ boxShadow: "0 0 14px hsl(var(--gold) / 0.7), 0 0 28px hsl(var(--gold) / 0.4)" }}
                            transition={{ type: "spring", stiffness: 320, damping: 32 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="pb-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    {(tab === "food" ? FOOD : DRINKS).map((cat) => (
                      <CategoryRow key={cat.title} cat={cat} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* BEST SELLERS */}
      <BestSellers />

      {/* ASSISTANT */}
      <HomeAssistant />

      {/* TESTIMONIALS */}
      <Testimonials />
    </div>
  );
}

const BEST_SELLERS = [
  {
    img: bannerEgusi,
    name: "Pounded Yam & Egusi Soup",
    note: "Hand-pulled yam. Rich, oily, generational egusi.",
    index: "01",
  },
  {
    img: bannerDrinks,
    name: "Chapman",
    note: "Iced, citrus-led — Abuja's classic refresher.",
    index: "02",
  },
  {
    img: bannerJollof,
    name: "Smoky Jollof Rice",
    note: "Wood-fire kissed. The real party rice.",
    index: "03",
  },
];

function BestSellers() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % BEST_SELLERS.length),
      5200,
    );
    return () => clearInterval(id);
  }, []);
  const b = BEST_SELLERS[idx];
  return (
    <section className="pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="max-w-5xl mx-auto px-5 md:px-10 text-center">
        <p className="uppercase tracking-[0.5em] text-xs text-gold">Most Loved</p>
        <h2 className="font-display text-4xl md:text-6xl mt-4">Best Sellers</h2>
        <div className="mt-8 mx-auto h-px w-16 bg-gold/50" />
      </div>

      <div className="mt-16 md:mt-20 max-w-2xl mx-auto px-5">
        <div className="relative aspect-[4/5] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={b.name}
              src={b.img}
              alt={b.name}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/40 pointer-events-none" />
        </div>
        <div className="mt-10 text-center min-h-[140px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="font-display text-3xl md:text-5xl leading-[1.05]">
                {b.name}
              </h3>
              <div className="mt-6 mx-auto h-px w-10 bg-gold/60" />
              <p className="mt-6 text-muted-foreground italic leading-relaxed max-w-md mx-auto">
                {b.note}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex justify-center gap-2.5">
          {BEST_SELLERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Best seller ${i + 1}`}
              className={`h-px transition-all duration-700 ${
                i === idx ? "w-10 bg-gold" : "w-5 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeAssistant() {
  const vapi = useVapi();
  return (
    <section className="relative border-t border-border/50 overflow-hidden">
      <div className="px-5 py-24 md:py-32 max-w-2xl mx-auto text-center relative">
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
          Speak With Our <em className="text-gold not-italic">Assistant</em>
        </h2>
        <p className="text-muted-foreground mt-5 text-sm md:text-base">
          Place orders instantly with our AI assistant.
        </p>

        <div className="mt-14 relative inline-flex flex-col items-center">
          <span className="absolute inset-0 rounded-full bg-gold/15 blur-3xl scale-150" />
          <span className="absolute inset-0 rounded-full bg-gold/10 blur-2xl scale-125" />
          <button
            onClick={vapi.isCalling ? vapi.stop : vapi.start}
            aria-label="Start voice assistant"
            className="relative w-32 h-32 md:w-36 md:h-36 rounded-full border border-gold/60 bg-surface flex items-center justify-center hover:bg-gold/10 transition-colors group cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full border border-gold/30 animate-ping" />
            <span className="absolute inset-2 rounded-full border border-gold/20" />
            {vapi.isCalling ? <PhoneOff size={40} className="text-gold animate-pulse" /> : <Mic size={40} className="text-gold group-hover:scale-110 transition-transform" />}
          </button>
          <button
            onClick={vapi.isCalling ? vapi.stop : vapi.start}
            className="mt-10 inline-block px-8 py-4 border border-gold/60 text-gold uppercase tracking-[0.3em] text-xs hover:bg-gold/10 transition-colors cursor-pointer"
          >
            {vapi.status === "connecting" ? "Connecting..." : vapi.status === "connected" ? "End Call" : "Start Order"}
          </button>
        </div>
      </div>
      <VapiOverlay
        open={vapi.open}
        status={vapi.status}
        error={vapi.error}
        speaking={vapi.speaking}
        onClose={vapi.close}
        onStop={vapi.stop}
      />
    </section>
  );
}

const TESTIMONIALS = [
  { quote: "The AI assistant made ordering incredibly smooth.", name: "Ada", area: "Wuse 2" },
  { quote: "The smoky jollof tasted exactly like party rice.", name: "Tunde", area: "Garki" },
  { quote: "Beautiful experience from the menu to delivery.", name: "Miriam", area: "Asokoro" },
];

function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[idx];
  return (
    <section className="mt-28 md:mt-40 border-t border-border/50">
      <div className="max-w-3xl mx-auto px-6 py-28 md:py-36 text-center min-h-[42vh] flex flex-col justify-center">
        <p className="uppercase tracking-[0.5em] text-xs text-gold">Guests</p>
        <div className="mt-10 relative">
          <AnimatePresence mode="wait">
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-2xl md:text-4xl leading-relaxed text-foreground/95">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-10 mx-auto h-px w-10 bg-gold/50" />
              <figcaption className="mt-6 text-xs uppercase tracking-[0.45em] text-gold">
                {t.name}{" "}
                <span className="text-muted-foreground">· {t.area}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-12 flex justify-center gap-2.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-px transition-all duration-500 ${
                i === idx ? "w-10 bg-gold" : "w-5 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
