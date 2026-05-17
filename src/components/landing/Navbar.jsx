import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-red-500" />
          </div>
          <span className="font-bold text-lg tracking-tight text-zinc-100">Severance</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">Features</a>
          <a href="#esp-comparison" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">Comparison</a>
          <a href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">Pricing</a>
          <a href="#faq" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">FAQ</a>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link 
            to="/Dashboard"
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
