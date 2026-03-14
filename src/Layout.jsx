import React from "react";

export default function Layout({ children }) {
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
      {children}
    </div>
  );
}