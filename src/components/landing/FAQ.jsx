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
    <div className="border-b border-white/[0.04] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className={`text-sm font-medium transition-colors duration-300 ${isOpen ? 'text-white' : 'text-[#c4c4d4] group-hover:text-white'}`}>
          {faq.q}
        </span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300 ${isOpen ? 'bg-red-500/20' : 'bg-white/[0.04]'}`}>
          {isOpen ? (
            <Minus className="w-3 h-3 text-red-400" strokeWidth={2.5} />
          ) : (
            <Plus className="w-3 h-3 text-[#8b8b9e]" strokeWidth={2.5} />
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
            <p className="pb-5 text-sm text-[#8b8b9e] leading-relaxed pr-10">
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
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-red-400">
            FAQ
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            Questions?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl border border-white/[0.04] bg-white/[0.01] px-7"
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