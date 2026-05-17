import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ChevronRight, Activity } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-left"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 backdrop-blur-md mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase text-red-300">
              Operational & Undetected
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight text-zinc-100 mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Untouchable, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500">
              Unstoppable.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-lg text-zinc-400 leading-relaxed max-w-xl mb-10"
          >
            Premium FiveM external with full unban included. <br className="hidden md:block" />
            Dominate every server, undetected.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="#pricing"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] flex items-center justify-center gap-2"
            >
              Get Started <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 hover:bg-zinc-800/50 text-zinc-300 font-medium text-sm tracking-wide transition-all flex items-center justify-center"
            >
              Explore Features
            </a>
          </motion.div>
        </motion.div>

        {/* Visual Element Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex-1 w-full relative hidden lg:flex justify-center"
        >
          <div className="relative w-[80%] aspect-square rounded-full border border-zinc-800/50 flex items-center justify-center before:absolute before:inset-0 before:rounded-full before:border before:border-red-500/20 before:scale-110 after:absolute after:inset-0 after:rounded-full after:border after:border-rose-500/10 after:scale-125">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent rounded-full blur-2xl" />
            <div className="w-40 h-40 rounded-3xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl flex flex-col items-center justify-center shadow-2xl relative z-10 gap-3">
              <ShieldCheck className="w-12 h-12 text-red-500" />
              <div className="flex items-center gap-2 text-xs font-medium text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                <Activity className="w-3 h-3" /> Secure
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}