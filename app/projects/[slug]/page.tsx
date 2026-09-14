import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { getProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.intro,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="project-page">
      <SiteHeader />

      <section className="case-hero">
        <div className="case-hero-media">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="cover-image"
          />
        </div>
        <div className="case-hero-shade" />

        <div className="case-hero-top">
          <span>Project / {project.number}</span>
          <span>{project.type}</span>
        </div>

        <div className="case-hero-copy">
          <p>{project.location}</p>
          <h1>{project.title}</h1>
        </div>

        <div className="case-hero-bottom">
          <span>{project.year}</span>
          <span>{project.area}</span>
          <span>{project.status}</span>
        </div>
      </section>

      <section className="case-intro">
        <div className="case-index">
          <span>01</span>
          <span>Project</span>
        </div>

        <div className="case-intro-grid">
          <h2>{project.intro}</h2>

          <div className="case-facts">
            <div>
              <span>Location</span>
              <strong>{project.location}</strong>
            </div>
            <div>
              <span>Type</span>
              <strong>{project.type}</strong>
            </div>
            <div>
              <span>Area</span>
              <strong>{project.area}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{project.status}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="case-image-full">
        <Image
          src={project.gallery[0]}
          alt={`${project.title} view 01`}
          fill
          sizes="100vw"
          className="cover-image"
        />
      </section>

      <section className="case-concept">
        <div className="case-index">
          <span>02</span>
          <span>Concept</span>
        </div>

        <div className="case-concept-grid">
          <p className="case-kicker">Design approach</p>
          <h2>{project.concept}</h2>
        </div>
      </section>

      <section className="case-gallery">
        <div className="case-gallery-large">
          <Image
            src={project.gallery[1]}
            alt={`${project.title} view 02`}
            fill
            sizes="(max-width: 900px) 100vw, 66vw"
            className="cover-image"
          />
        </div>

        <div className="case-gallery-small">
          <Image
            src={project.gallery[2]}
            alt={`${project.title} view 03`}
            fill
            sizes="(max-width: 900px) 100vw, 34vw"
            className="cover-image"
          />
        </div>
      </section>

      <section className="case-next">
        <p>Next project / {nextProject.number}</p>
        <Link
          href={`/projects/${nextProject.slug}`}
          data-cursor-label="NEXT"
        >
          <span>{nextProject.title}</span>
          <span aria-hidden="true">↗</span>
        </Link>
        <div className="case-next-meta">
          <span>{nextProject.location}</span>
          <span>{nextProject.year}</span>
        </div>
      </section>
    </main>
  );
}
