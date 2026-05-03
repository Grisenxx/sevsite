import React from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <Shield className="w-4 h-4 text-red-400" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">Severance</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Features</a>
          <a href="#comparison" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Comparison</a>
          <a href="#pricing" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="text-sm font-medium text-white/60 hover:text-white transition-colors">FAQ</a>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link 
            to="/Dashboard"
            className="px-5 py-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 text-red-400 hover:text-red-300 font-semibold text-sm transition-all"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
