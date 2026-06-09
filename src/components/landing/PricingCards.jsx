import React from "react";
import { motion } from "framer-motion";
import { Check, Flame } from "lucide-react";

const plans = [
  {
    name: "Weekly",
    price: "$9.99",
    period: "/ week",
    description: "Try it out risk-free",
    url: "https://severance.mysellauth.com/product/severance-weekly",
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
    url: "https://severance.mysellauth.com/product/severance-monthly",
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
    url: "https://severance.mysellauth.com/product/severance-quarterly",
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
              <a
                href={plan.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center ${
                  plan.popular
                    ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                    : "bg-transparent border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white"
                }`}
              >
                <span>Get Started</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5 ml-2" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16h18L67.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,160,204a28,28,0,1,0,28-28H91.17a8,8,0,0,1-7.87-6.57L80.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87ZM104,204a12,12,0,1,1-12-12A12,12,0,0,1,104,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,200,204Zm4-74.57A8,8,0,0,1,196.1,136H77.22L65.59,72H214.41Z" />
                </svg>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}