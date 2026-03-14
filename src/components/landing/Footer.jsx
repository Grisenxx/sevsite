import React from "react";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <Shield className="w-5 h-5 text-violet-400" strokeWidth={1.5} />
          <span className="text-sm font-semibold tracking-wide text-white/80">Severance</span>
        </div>

        <div className="flex items-center gap-8">
          <a href="#features" className="text-xs text-[#8b8b9e] hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-xs text-[#8b8b9e] hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="text-xs text-[#8b8b9e] hover:text-white transition-colors">FAQ</a>
        </div>

        <p className="text-xs text-[#555568]">
          © 2026 Severance. All rights reserved.
        </p>
      </div>
    </footer>
  );
}