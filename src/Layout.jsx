import React, { useState, useEffect, useRef } from "react";
import { Shield, RefreshCw } from "lucide-react";

// ─── YOUR CLOUDFLARE TURNSTILE SITE KEY ─────────────────────────────────────
const TURNSTILE_SITE_KEY = "0x4AAAAAACXP9pJ03Tg448lE";

// Widget mode — pick ONE and set it in your Cloudflare dashboard to match:
//   "managed"        → Cloudflare decides; may show a checkbox (recommended)
//   "non-interactive" → Visible spinner, no interaction ever needed
//   "invisible"      → Completely hidden, runs in background
const TURNSTILE_MODE = "managed";
// ────────────────────────────────────────────────────────────────────────────

// Widget states matching Cloudflare docs
const STATE = {
  LOADING: "loading",
  READY: "ready",
  SUCCESS: "success",
  ERROR: "error",
  EXPIRED: "expired",
  TIMEOUT: "timeout",
};

function TurnstileGate({ onVerified }) {
  const widgetRef = useRef(null);
  const containerRef = useRef(null);
  const [state, setState] = useState(STATE.LOADING);

  const renderWidget = () => {
    if (!window.turnstile || !containerRef.current) return;
    // Remove previous widget if any
    if (widgetRef.current !== null) {
      window.turnstile.remove(widgetRef.current);
      widgetRef.current = null;
    }

    widgetRef.current = window.turnstile.render(containerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "dark",
      size: "normal",
      // appearance: "always" ensures the widget is visible in managed/non-interactive
      appearance: TURNSTILE_MODE === "invisible" ? "interaction-only" : "always",

      // Called when challenge completes successfully
      callback: (token) => {
        if (token) {
          setState(STATE.SUCCESS);
          setTimeout(() => onVerified(token), 600);
        }
      },

      // Called when an unknown error occurs — visitor can refresh or retry
      "error-callback": () => {
        setState(STATE.ERROR);
      },

      // Called when the token expires before form submission
      "expired-callback": () => {
        setState(STATE.EXPIRED);
        if (window.turnstile && widgetRef.current !== null) {
          window.turnstile.reset(widgetRef.current);
          setState(STATE.READY);
        }
      },

      // Called when visitor doesn't interact within time limit (managed mode)
      "timeout-callback": () => {
        setState(STATE.TIMEOUT);
      },

      // Called once widget is ready to receive interactions
      "before-interactive-callback": () => {
        setState(STATE.READY);
      },

      // Called after interaction is complete
      "after-interactive-callback": () => {
        setState(STATE.LOADING);
      },
    });

    setState(STATE.READY);
  };

  useEffect(() => {
    // Inject Turnstile script from challenges.cloudflare.com
    if (!document.getElementById("cf-turnstile-script")) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    // Poll until the Cloudflare script has loaded
    const interval = setInterval(() => {
      if (window.turnstile) {
        clearInterval(interval);
        renderWidget();
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (window.turnstile && widgetRef.current !== null) {
        window.turnstile.remove(widgetRef.current);
        widgetRef.current = null;
      }
    };
  }, []);

  const handleRetry = () => {
    setState(STATE.LOADING);
    renderWidget();
  };

  const isError = state === STATE.ERROR || state === STATE.TIMEOUT;
  const isSuccess = state === STATE.SUCCESS;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0f]">
      {/* Background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-red-800/6 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-sm w-full">
        {/* Brand mark */}
        <div className="flex flex-col items-center gap-3">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
            isSuccess
              ? "bg-green-500/10 border-green-500/30"
              : isError
              ? "bg-red-500/10 border-red-500/30"
              : "bg-red-500/10 border-red-500/20"
          }`}>
            <Shield
              className={`w-7 h-7 transition-colors duration-500 ${
                isSuccess ? "text-green-400" : "text-red-400"
              }`}
              strokeWidth={1.5}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Severance
            </h1>
            <p className="text-sm text-[#8b8b9e] mt-1">
              {isSuccess
                ? "Verified — entering..."
                : isError
                ? "Verification failed"
                : state === STATE.TIMEOUT
                ? "Challenge timed out"
                : "Complete the check below to continue"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Turnstile widget mount point */}
        <div className="flex flex-col items-center gap-4 w-full">
          {/* This div is where Cloudflare renders the widget */}
          <div ref={containerRef} className={isError || state === STATE.TIMEOUT ? "opacity-40 pointer-events-none" : ""} />

          {/* Error / timeout state with retry */}
          {(isError || state === STATE.TIMEOUT) && (
            <div className="flex flex-col items-center gap-3 mt-1">
              <p className="text-xs text-red-400">
                {state === STATE.TIMEOUT
                  ? "You didn't interact in time — please try again."
                  : "Something went wrong. Please refresh and retry."}
              </p>
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs text-white/70 hover:text-white transition-all duration-200"
              >
                <RefreshCw className="w-3 h-3" />
                Retry
              </button>
            </div>
          )}

          {/* Success feedback */}
          {isSuccess && (
            <div className="flex items-center gap-2 text-xs text-green-400 animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Access granted
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Layout({ children }) {
  // Cloudflare verification disabled for now
  const [verified, setVerified] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white antialiased">
      <style>{`
        :root {
          --accent: #8b5cf6;
          --accent-light: #a78bfa;
          --accent-glow: rgba(139, 92, 246, 0.3);
          --bg-primary: #0a0a0f;
          --bg-card: rgba(255, 255, 255, 0.03);
          --bg-card-hover: rgba(255, 255, 255, 0.06);
          --border: rgba(255, 255, 255, 0.06);
          --text-primary: #f1f1f4;
          --text-secondary: #8b8b9e;
        }
        body {
          background: #0a0a0f;
          margin: 0;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
        }
      `}</style>

      {/*
      {!verified && (
        <TurnstileGate onVerified={() => setVerified(true)} />
      )}
      */}

      {/* Site content */}
      <div style={{ visibility: verified ? "visible" : "hidden" }}>
        {children}
      </div>
    </div>
  );
}
