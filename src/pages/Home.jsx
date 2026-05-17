import React from "react";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import ESPComparison from "../components/landing/ESPComparison";
import PricingCards from "../components/landing/PricingCards";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";
import Navbar from "../components/landing/Navbar";

export default function Home() {
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen selection:bg-red-500/30 selection:text-red-50 font-sans">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <Features />
        <ESPComparison />
        <PricingCards />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
}