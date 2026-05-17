import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is Severance currently undetected?",
    a: "Yes. Severance is fully undetected and has maintained a clean status since launch. We push silent updates to stay ahead of anti-cheat patches."
  },
  {
    q: "How does the unban work?",
    a: "Our built-in token spoofer blocks all token requests that FiveM uses to ban your machine. It works on all server and anticheat bans."
  },
  {
    q: "Is this an external cheat?",
    a: "Yes. Severance runs entirely outside the game process. There's no injection involved, which makes it significantly harder to detect."
  },
  {
    q: "How fast is the setup?",
    a: "Under 60 seconds. Download the loader, register with your key, and click Load. Everything is automatic — no manual configuration needed."
  },
  {
    q: "What happens when my subscription expires?",
    a: "The software simply stops working. No data is collected, and you can re-subscribe at any time to pick up where you left off."
  },
  {
    q: "Do you offer support?",
    a: "24/7 support is available through our Discord, but remember - we're humans aswell."
  }
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-zinc-800/50 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className={`text-base font-semibold transition-colors duration-300 ${isOpen ? 'text-zinc-100' : 'text-zinc-300 group-hover:text-red-400'}`}>
          {faq.q}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300 ${isOpen ? 'bg-red-500/20' : 'bg-zinc-800'}`}>
          {isOpen ? (
            <Minus className="w-4 h-4 text-red-400" strokeWidth={2.5} />
          ) : (
            <Plus className="w-4 h-4 text-zinc-400" strokeWidth={2.5} />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-zinc-400 leading-relaxed pr-12">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-red-500">
            FAQ
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100">
            Common Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-3xl border border-zinc-800/60 bg-zinc-900/40 p-8 shadow-xl"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}