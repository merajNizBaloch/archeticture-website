"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProjectMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!pathname.startsWith("/projects/")) return;

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
        .toArray<HTMLElement>(
          ".case-intro-grid, .case-context-grid, .case-concept-grid, .case-materials-grid, .case-credits-grid",
        )
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
        .toArray<HTMLElement>(
          ".case-image-full, .case-gallery-large, .case-gallery-small, .case-wide-image, .case-final-gallery-media",
        )
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
                yPercent: element.classList.contains("case-wide-image") ? 5 : 0,
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

      gsap.utils.toArray<HTMLElement>(".case-drawing").forEach((drawing, index) => {
        gsap.from(drawing, {
          y: 52,
          opacity: 0,
          duration: 0.9,
          delay: index * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: drawing,
            start: "top 86%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".case-material").forEach((material, index) => {
        gsap.from(material, {
          x: 34,
          opacity: 0,
          duration: 0.65,
          delay: index * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: material,
            start: "top 90%",
          },
        });
      });

      gsap.from(".case-final-gallery-copy", {
        y: 36,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".case-final-gallery",
          start: "top 78%",
        },
      });

      gsap.from(".case-project-nav > a", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".case-project-nav",
          start: "top 88%",
        },
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
