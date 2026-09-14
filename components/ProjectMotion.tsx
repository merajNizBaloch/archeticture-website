"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProjectMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".case-hero-copy > *", {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        delay: 0.45,
        ease: "power4.out",
      });

      gsap.from(".case-hero-top, .case-hero-bottom", {
        opacity: 0,
        y: 16,
        duration: 0.7,
        delay: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.to(".case-hero-media img", {
        yPercent: 11,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".case-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils
        .toArray<HTMLElement>(".case-intro-grid, .case-concept-grid, .case-facts")
        .forEach((element) => {
          gsap.from(element, {
            y: 64,
            opacity: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
          });
        });

      gsap.utils
        .toArray<HTMLElement>(".case-image-full, .case-gallery-large, .case-gallery-small")
        .forEach((element) => {
          const image = element.querySelector("img");

          gsap.from(element, {
            clipPath: "inset(8% 0 8% 0)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            },
          });

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.08 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: element,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }
        });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
