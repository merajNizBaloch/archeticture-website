"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { projects } from "@/lib/projects";

export default function ProjectsArchive() {
  const types = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.type)))],
    [],
  );
  const [activeType, setActiveType] = useState("All");

  const visibleProjects =
    activeType === "All"
      ? projects
      : projects.filter((project) => project.type === activeType);

  return (
    <>
      <div className="archive-filters" aria-label="Project filters">
        {types.map((type) => (
          <button
            key={type}
            type="button"
            className={activeType === type ? "is-active" : ""}
            onClick={() => setActiveType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="archive-grid">
        {visibleProjects.map((project, index) => (
          <Link
            key={project.slug}
            href={"/projects/" + project.slug}
            className={index % 3 === 0 ? "archive-card archive-card-wide" : "archive-card"}
            data-cursor-label="VIEW"
          >
            <div className="archive-card-media">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes={index % 3 === 0 ? "100vw" : "(max-width: 900px) 100vw, 50vw"}
                className="cover-image"
              />
              <span className="archive-card-number">{project.number}</span>
            </div>

            <div className="archive-card-info">
              <div>
                <h2>{project.title}</h2>
                <p>{project.location}</p>
              </div>

              <div className="archive-card-meta">
                <span>{project.type}</span>
                <span>{project.year}</span>
                <ArrowUpRight size={20} strokeWidth={1.15} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
