import React from "react";
import { motion } from "framer-motion";
import { Crosshair, ShieldOff, Cpu, Eye, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: Crosshair,
    title: "External Aimbot",
    description: "Precision targeting with smooth humanized aim. Fully configurable FOV, smoothing, and bone selection."
  },
  {
    icon: Eye,
    title: "ESP & Wallhack",
    description: "Full player ESP with box, skeleton, health bars, distance, and name tags. See everything, always."
  },
  {
    icon: ShieldOff,
    title: "Full Unban",
    description: "Complete token spoofer and unban solution included with every plan. Get back in instantly."
  },
  {
    icon: Cpu,
    title: "External Process",
    description: "Runs completely outside the game process. No injection, no detection vectors."
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description: "One-click loader with automatic updates. Be up and running in under 60 seconds."
  },
  {
    icon: Lock,
    title: "Undetected",
    description: "Continuously updated to stay ahead of anti-cheat. Zero detections since launch."
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function Features() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-red-500">
            Engineered for Dominance
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100">
            Unrivaled Feature Set
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-xl mx-auto">
            Everything you need bundled into one seamless, undetectable package.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative p-8 rounded-3xl border border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-900/80 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-red-600/10 via-transparent to-transparent" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center mb-6 group-hover:border-red-500/30 group-hover:bg-red-500/10 transition-colors duration-500">
                  <feature.icon className="w-6 h-6 text-red-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-zinc-100 mb-3">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}