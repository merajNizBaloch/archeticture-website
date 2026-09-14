"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/projects";

export default function ProjectIndex() {
  const preview = useRef<HTMLDivElement>(null);
  const railViewport = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const viewport = railViewport.current;
    const track = rail.current;

    if (!viewport || !track) return;

    const desktop = window.matchMedia("(min-width: 901px)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!desktop || reduceMotion) return;

    const ctx = gsap.context(() => {
      const distance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: viewport,
          start: "top top",
          end: () => "+=" + Math.max(distance(), window.innerWidth * 1.35),
          scrub: 0.85,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.from(".project-index-title .index-mask > span", {
        yPercent: 112,
        duration: 0.95,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".project-index-title",
          start: "top 78%",
        },
      });

      gsap.from(".project-index-card", {
        y: 48,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: viewport,
          start: "top 82%",
        },
      });
    }, viewport);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const node = preview.current;
    if (!node) return;

    let targetX = window.innerWidth * 0.68;
    let targetY = window.innerHeight * 0.5;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const move = (event: PointerEvent) => {
      targetX = event.clientX + 34;
      targetY = event.clientY - 120;
    };

    const render = () => {
      x += (targetX - x) * 0.14;
      y += (targetY - y) * 0.14;
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="project-index-section">
      <div className="project-index-head">
        <span>07 / Project index</span>
        <span>{String(projects.length).padStart(2, "0")} selected works</span>
      </div>

      <div className="project-index-title">
        <p>Browse all selected work</p>
        <h2>
          <span className="index-mask"><span>PROJECT</span></span>
          <span className="index-mask"><span>INDEX</span></span>
        </h2>
      </div>

      <div ref={railViewport} className="project-index-rail-viewport">
        <div ref={rail} className="project-index-rail">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={"/projects/" + project.slug}
              className="project-index-card"
              data-cursor-label="OPEN"
              onMouseEnter={() => {
                setActive(index);
                setVisible(true);
              }}
              onMouseLeave={() => setVisible(false)}
            >
              <div className="project-index-card-top">
                <span>{project.number}</span>
                <span>{project.type}</span>
              </div>

              <div className="project-index-card-title">
                <span>{project.title}</span>
              </div>

              <div className="project-index-card-bottom">
                <span>{project.location}</span>
                <span>{project.year}</span>
                <ArrowUpRight size={24} strokeWidth={1.05} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div
        ref={preview}
        className={"project-hover-preview" + (visible ? " is-visible" : "")}
        aria-hidden="true"
      >
        <div className="project-hover-preview-media">
          <Image
            key={projects[active].slug}
            src={projects[active].image}
            alt=""
            fill
            sizes="360px"
            className="cover-image"
          />
        </div>

        <div className="project-hover-preview-meta">
          <span>{projects[active].number}</span>
          <span>{projects[active].type}</span>
        </div>
      </div>
    </section>
  );
}
