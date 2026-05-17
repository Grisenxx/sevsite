import React from "react";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-800/50 py-12 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-red-500" strokeWidth={1.5} />
          <span className="text-sm font-bold tracking-wide text-zinc-100">Severance</span>
        </div>

        <div className="flex items-center gap-8">
          <a href="#features" className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">Pricing</a>
          <a href="#faq" className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">FAQ</a>
        </div>

        <p className="text-sm text-zinc-600">
          © 2026 Severance. All rights reserved.
        </p>
      </div>
    </footer>
  );
}