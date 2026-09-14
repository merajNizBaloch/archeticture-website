"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SectionBridge() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bridge-line-a",
        { xPercent: 0 },
        {
          xPercent: -24,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        ".bridge-line-b",
        { xPercent: -18 },
        {
          xPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="section-bridge" aria-hidden="true">
      <div className="bridge-track bridge-line-a">
        <span>SPACE</span><span>LIGHT</span><span>MATERIAL</span><span>CONTEXT</span>
        <span>SPACE</span><span>LIGHT</span><span>MATERIAL</span><span>CONTEXT</span>
      </div>
      <div className="bridge-track bridge-line-b">
        <span>DRAW</span><span>TEST</span><span>REFINE</span><span>BUILD</span>
        <span>DRAW</span><span>TEST</span><span>REFINE</span><span>BUILD</span>
      </div>
    </div>
  );
}
