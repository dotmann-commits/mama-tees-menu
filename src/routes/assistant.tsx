import { createFileRoute } from "@tanstack/react-router";
import { Mic, Phone, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Speak With Our Assistant — Mama Tee's Kitchen" },
      { name: "description", content: "Place orders, ask menu questions, check delivery availability and make reservations through our smart restaurant call assistant." },
    ],
  }),
  component: Assistant,
});

function Assistant() {
  // Mock/demo order — replace with backend integration later.
  const [order] = useState<{ id: string; total: string } | null>({
    id: "MTK-20425",
    total: "₦7,500",
  });
  const [payOpen, setPayOpen] = useState(false);
  const [paid, setPaid] = useState(false);

  return (
    <div className="px-5 pt-16 pb-24 max-w-2xl mx-auto text-center">
      <p className="uppercase tracking-[0.5em] text-xs text-gold">The Call</p>
      <h1 className="font-display text-5xl md:text-6xl mt-3 leading-[1.05]">
        Speak With Our Assistant
      </h1>
      <p className="text-muted-foreground mt-6 leading-relaxed max-w-md mx-auto">
        Place orders, ask menu questions, check delivery availability and make
        reservations through our smart restaurant call assistant.
      </p>

      <div className="mt-16 relative inline-flex flex-col items-center">
        <span className="absolute inset-0 rounded-full bg-gold/20 blur-3xl scale-150" />
        <span className="absolute inset-0 rounded-full bg-gold/10 blur-2xl scale-125" />
        <a
          href="tel:08123456789"
          aria-label="Call Mama Tee's Kitchen assistant"
          className="relative w-36 h-36 rounded-full border border-gold/60 bg-surface flex items-center justify-center hover:bg-gold/10 transition-colors group"
        >
          <span className="absolute inset-0 rounded-full border border-gold/30 animate-ping" />
          <span className="absolute inset-2 rounded-full border border-gold/20" />
          <Mic size={44} className="text-gold group-hover:scale-110 transition-transform" />
        </a>
        <p className="mt-8 text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
          Tap to call
        </p>
      </div>

      <div className="mt-20 border-t border-border pt-10">
        <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
          Restaurant Line
        </p>
        <a
          href="tel:08123456789"
          className="mt-4 inline-flex items-center gap-3 font-display text-3xl md:text-4xl text-gold hover:text-foreground transition-colors"
        >
          <Phone size={20} /> 0812 345 6789
        </a>
        <p className="mt-4 text-xs text-muted-foreground tracking-wider">
          Available during opening hours
        </p>
      </div>

      {/* PAYMENT / ORDER — revealed only when an order exists */}
      <AnimatePresence>
        {order && (
          <motion.section
            key="order"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-24 border-t border-border pt-14 text-left"
          >
            <p className="uppercase tracking-[0.5em] text-[10px] text-gold text-center">
              Your Order
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  Order ID
                </p>
                <p className="mt-3 font-display text-xl md:text-2xl text-foreground">
                  {order.id}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  Total
                </p>
                <p className="mt-3 font-display text-xl md:text-2xl text-gold">
                  {order.total}
                </p>
              </div>
            </div>

            <div className="mt-12 border-t border-border/60">
              <button
                onClick={() => setPayOpen((o) => !o)}
                aria-expanded={payOpen}
                className="w-full flex items-center justify-between py-7 group"
              >
                <span className="font-display text-lg md:text-xl uppercase tracking-[0.2em] text-foreground group-hover:text-gold transition-colors">
                  Complete Payment
                </span>
                <motion.span
                  animate={{ rotate: payOpen ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-gold"
                >
                  <ChevronDown size={20} strokeWidth={1.25} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {payOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 pt-2 space-y-6">
                      <Row label="Bank" value="Guaranty Trust Bank" />
                      <Row label="Account Name" value="Mama Tee's Kitchen Ltd" />
                      <Row label="Account Number" value="0123456789" />
                      <p className="pt-4 text-xs text-muted-foreground italic leading-relaxed">
                        Use your Order ID <span className="text-gold not-italic">{order.id}</span>{" "}
                        as payment reference.
                      </p>
                      <button
                        onClick={() => setPaid(true)}
                        disabled={paid}
                        className="mt-4 w-full px-8 py-4 border border-gold/60 text-gold uppercase tracking-[0.3em] text-xs hover:bg-gold/10 transition-colors disabled:opacity-60 disabled:cursor-default"
                      >
                        {paid ? "Payment Received · Awaiting Confirmation" : "I Have Made Payment"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        {label}
      </span>
      <span className="flex-1 border-b border-dotted border-border/70 translate-y-[-3px]" />
      <span className="text-foreground tracking-wider text-sm md:text-base">{value}</span>
    </div>
  );
}
