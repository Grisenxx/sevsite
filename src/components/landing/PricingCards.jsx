import React from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Weekly",
    price: "$9.99",
    period: "/ week",
    description: "Try it out risk-free",
    popular: false,
    features: [
      "FiveM External",
      "Temporary Unban",
      "7 Days Subscription",
      "Auto Updates",
      "24/7 Support"
    ]
  },
  {
    name: "Monthly",
    price: "$19.99",
    period: "/ month",
    description: "Most popular choice",
    popular: true,
    features: [
      "FiveM External",
      "Temporary Unban",
      "30 Days Subscription",
      "Auto Updates",
      "24/7 Priority Support"
    ]
  },
  {
    name: "Quarterly",
    price: "$44.99",
    period: "/ 3 months",
    description: "Best value — save 25%",
    popular: false,
    features: [
      "FiveM External",
      "Temporary Unban",
      "90 Days Subscription",
      "Auto Updates",
      "24/7 Priority Support"
    ]
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

export default function PricingCards() {
  return (
    <section id="pricing" className="relative py-32 px-6">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-red-400">
            Pricing
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-[#8b8b9e] text-lg max-w-md mx-auto">
            External + unban included in every plan. No hidden fees.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`relative group rounded-2xl p-[1px] transition-all duration-500 ${
                plan.popular
                  ? "bg-gradient-to-b from-red-500/50 via-red-500/20 to-transparent"
                  : "bg-white/[0.06] hover:bg-white/[0.08]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-semibold tracking-wide shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                    <Star className="w-3 h-3" fill="currentColor" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`relative h-full rounded-2xl p-8 ${
                plan.popular ? "bg-[#0f0f18]" : "bg-[#0a0a0f]"
              }`}>
                {/* Plan name */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold tracking-wide text-red-400 uppercase">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#8b8b9e] mt-1">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-bold text-white tracking-tight">{plan.price}</span>
                  <span className="text-sm text-[#8b8b9e]">{plan.period}</span>
                </div>

                {/* CTA */}
                <button
                  className={`w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 mb-8 ${
                    plan.popular
                      ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.25)] hover:shadow-[0_0_40px_rgba(239,68,68,0.35)]"
                      : "bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.06]"
                  }`}
                >
                  Get Started
                </button>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-[#c4c4d4]">
                      <div className="w-4 h-4 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-red-400" strokeWidth={3} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}