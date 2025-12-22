"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import LandingPage from "./LandingPage";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // splash duration

    return () => clearTimeout(timer);
  }, []);

  return showSplash ? <SplashScreen /> : <LandingPage />;
}
