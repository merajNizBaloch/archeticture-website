"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

export default function ProjectIndex() {
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

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
        <span>03 / Project index</span>
        <span>{String(projects.length).padStart(2, "0")} selected works</span>
      </div>

      <div className="project-index-title">
        <p>Browse all selected work</p>
        <h2>
          <span>PROJECT</span>
          <span>INDEX</span>
        </h2>
      </div>

      <div className="project-index-list">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={"/projects/" + project.slug}
            className="project-index-row"
            data-cursor-label="OPEN"
            onMouseEnter={() => {
              setActive(index);
              setVisible(true);
            }}
            onMouseLeave={() => setVisible(false)}
          >
            <span className="project-index-number">{project.number}</span>

            <span className="project-index-name">
              <span>{project.title}</span>
            </span>

            <span className="project-index-location">{project.location}</span>
            <span className="project-index-year">{project.year}</span>

            <ArrowUpRight size={22} strokeWidth={1.1} />
          </Link>
        ))}
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
