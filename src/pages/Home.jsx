import React from "react";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import ESPComparison from "../components/landing/ESPComparison";
import PricingCards from "../components/landing/PricingCards";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <ESPComparison />
      <PricingCards />
      <FAQ />
      <Footer />
    </div>
  );
}