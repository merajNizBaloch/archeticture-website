"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MaskedEditorial() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".masked-line > span", { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(".masked-line > span", { yPercent: 112 });

      gsap.to(".masked-line > span", {
        yPercent: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section.current,
          start: "top 72%",
          once: true,
        },
      });

      gsap.fromTo(
        ".masked-editorial-media img",
        { scale: 1.12, yPercent: -6 },
        {
          scale: 1,
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.to(".masked-editorial-rule", {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top 80%",
          end: "center 48%",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="masked-editorial">
      <div className="masked-editorial-rule" />

      <div className="masked-editorial-grid">
        <div className="masked-editorial-copy">
          <p>07 / Perspective</p>

          <h2>
            <span className="masked-line"><span>SPACE IS</span></span>
            <span className="masked-line"><span>NOT SEEN.</span></span>
            <span className="masked-line masked-line-offset">
              <span>IT IS FELT.</span>
            </span>
          </h2>

          <div className="masked-editorial-note">
            <span>Material</span>
            <span>Light</span>
            <span>Proportion</span>
            <span>Silence</span>
          </div>
        </div>

        <div className="masked-editorial-media">
          <Image
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=88"
            alt="Architectural detail"
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
            className="cover-image"
          />
        </div>
      </div>
    </section>
  );
}
