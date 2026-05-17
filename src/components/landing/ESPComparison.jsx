import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

import IMAGE_CLEAN from "./images/esp-clean.png";
import IMAGE_ESP from "./images/esp-active.png";

export default function ESPComparison() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  // Track container width for correct image sizing
  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const updateSlider = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    updateSlider(e.clientX);
  };

  const onTouchStart = (e) => {
    setIsDragging(true);
    updateSlider(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (isDragging) updateSlider(e.clientX);
    };
    const onTouchMove = (e) => {
      if (isDragging) updateSlider(e.touches[0].clientX);
    };
    const onUp = () => setIsDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, updateSlider]);

  return (
    <section id="esp-comparison" className="relative py-32 px-6">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-red-500">
            See The Difference
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100">
            Tactical Awareness
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-lg mx-auto">
            Our ESP gives you complete awareness of your surroundings. See enemies through walls
            and never get caught off guard.
          </p>
        </motion.div>

        {/* Comparison Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden border border-zinc-700/50 shadow-[0_0_80px_rgba(0,0,0,0.6)]"
          style={{ userSelect: "none" }}
        >
          {/* Container */}
          <div
            ref={containerRef}
            className="relative w-full cursor-col-resize"
            style={{ aspectRatio: "16/9" }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            {/* Clean image (background, full width) */}
            <img
              src={IMAGE_CLEAN}
              alt="Without ESP"
              className="absolute inset-0 w-full h-full object-cover select-none"
              draggable={false}
            />

            {/* ESP image clipped to the left side */}
            <div
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={IMAGE_ESP}
                alt="With ESP"
                className="absolute top-0 left-0 h-full select-none"
                style={{ width: containerWidth ? `${containerWidth}px` : "100vw", maxWidth: "none", objectFit: "cover" }}
                draggable={false}
              />
            </div>

            {/* Divider line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
              style={{ left: `calc(${sliderPos}% - 1px)` }}
            />

            {/* Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-red-500 border-4 border-zinc-900 shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center cursor-col-resize z-10 transition-transform duration-100"
              style={{ left: `${sliderPos}%`, transform: `translateX(-50%) translateY(-50%) scale(${isDragging ? 1.15 : 1})` }}
            >
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                <path d="M6 4L2 9L6 14" stroke="#09090b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 4L16 9L12 14" stroke="#09090b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Labels */}
            <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700/50 text-xs font-bold text-red-400 tracking-wider uppercase shadow-lg">
              ESP Active
            </div>
            <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700/50 text-xs font-bold text-zinc-400 tracking-wider uppercase shadow-lg">
              Disabled
            </div>

            {/* Drag hint */}
            {sliderPos === 50 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700/50 text-xs font-medium text-zinc-300 pointer-events-none shadow-xl"
              >
                Drag to compare
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}