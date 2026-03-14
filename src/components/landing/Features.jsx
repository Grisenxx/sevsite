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
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-red-400">
            What's Included
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            Everything you need
          </h2>
          <p className="mt-4 text-[#8b8b9e] text-lg max-w-md mx-auto">
            External + unban bundled in one seamless package.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative p-7 rounded-2xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-red-600/5 to-transparent" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-5">
                  <feature.icon className="w-5 h-5 text-red-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[#8b8b9e] leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}