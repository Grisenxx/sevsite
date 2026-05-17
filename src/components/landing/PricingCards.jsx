import React from "react";
import { motion } from "framer-motion";
import { Check, Flame } from "lucide-react";
import { SellAuthButton } from "../../hooks/useSellAuthEmbed";

const SHOP_ID = 211519;

const plans = [
  {
    name: "Weekly",
    price: "$9.99",
    period: "/ week",
    description: "Try it out risk-free",
    cart: [{ productId: 716710, variantId: 1151698, quantity: 1 }],
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
    cart: [{ productId: 716510, variantId: 1151333, quantity: 1 }],
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
    cart: [{ productId: 716712, variantId: 1151705, quantity: 1 }],
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-red-500">
            Access Plans
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100">
            Choose Your Arsenal
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-xl mx-auto">
            Gain immediate access. External features and spoofer are included in every tier.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`relative flex flex-col p-8 md:p-10 rounded-2xl border transition-all duration-500 ${
                plan.popular
                  ? "border-red-500/50 bg-zinc-900/40 shadow-[0_0_50px_-12px_rgba(239,68,68,0.15)]"
                  : "border-zinc-800/60 bg-transparent hover:border-zinc-700 hover:bg-zinc-900/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-8 z-20">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold tracking-widest uppercase shadow-lg">
                    <Flame className="w-3 h-3" fill="currentColor" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-zinc-100">
                  {plan.name}
                </h3>
                <p className="text-sm text-zinc-500 mt-2">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1.5 mb-10 pb-10 border-b border-zinc-800/50">
                <span className="text-5xl font-black text-zinc-100 tracking-tight">{plan.price}</span>
                <span className="text-sm font-medium text-zinc-500">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm font-medium text-zinc-300">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-red-500" : "text-zinc-500"}`} strokeWidth={3} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <SellAuthButton
                cart={plan.cart}
                shopId={SHOP_ID}
                modal={true}
                className={`w-full py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center ${
                  plan.popular
                    ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                    : "bg-transparent border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white"
                }`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}