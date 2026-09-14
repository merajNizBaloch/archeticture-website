import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ProjectsArchive from "@/components/ProjectsArchive";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected architecture, interior architecture and spatial design projects.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="inner-page projects-page">
      <SiteHeader />

      <section className="inner-hero">
        <div className="inner-hero-top">
          <span>Projects / Archive</span>
          <span>{site.location}</span>
        </div>

        <div className="inner-hero-title">
          <p>Selected work across architecture and interiors</p>
          <h1>
            BUILT
            <br />
            IDEAS.
          </h1>
        </div>
      </section>

      <section className="archive-section">
        <ProjectsArchive />
      </section>
    </main>
  );
}
