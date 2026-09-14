"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      duration: isTouch ? 0.85 : 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    let refreshTimer = 0;
    const scheduleRefresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 180);
    };

    const onLoad = () => scheduleRefresh();
    const onOrientation = () => scheduleRefresh();

    window.addEventListener("load", onLoad);
    window.addEventListener("orientationchange", onOrientation);

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    scheduleRefresh();

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("orientationchange", onOrientation);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return children;
}
