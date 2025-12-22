"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // start fade-out AFTER all text animations are visible
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3600);

    // completely remove splash
    const endTimer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, []);

  if (!visible) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f0f0f] text-white">
        <h1 className="text-xl tracking-wide">Menu Coming Next</h1>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen text-center px-4
      bg-gradient-to-b from-[#141414] via-[#2b1f1f] to-[#3b2a2a]
      transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* LOGO */}
      <Image
        src="/velora-logo.png"
        alt="Velora"
        width={260}
        height={260}
        priority
        className="mb-10 animate-logo"
      />

      {/* BRAND NAME */}
      <h1
        className="text-white font-serif tracking-[0.35em] animate-title"
        style={{ fontSize: "52px" }}
      >
        VELORA
      </h1>

      {/* DIVIDER */}
      <div className="w-20 h-[1px] bg-[#e3d3b0] my-4 animate-divider" />

      {/* SUBTITLE */}
      <p
        className="text-[#e3d3b0] tracking-[0.25em] animate-subtitle"
        style={{ fontSize: "14px" }}
      >
        ROOFTOP RESTAURANT
      </p>
    </div>
  );
}
