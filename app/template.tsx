"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

export default function Template({ children }: { children: ReactNode }) {
  const curtain = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = curtain.current;
    if (!node) return;

    gsap.set(node, { scaleY: 1, transformOrigin: "bottom center" });
    gsap.to(node, {
      scaleY: 0,
      duration: 0.78,
      delay: 0.04,
      ease: "power4.inOut",
      transformOrigin: "top center",
    });
  }, []);

  return (
    <>
      <div ref={curtain} className="route-curtain" aria-hidden="true" />
      {children}
    </>
  );
}
