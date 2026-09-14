import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Grid2X2 } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ProjectTransitionLink from "@/components/ProjectTransitionLink";
import ProjectProgress from "@/components/ProjectProgress";
import ProjectDiagram from "@/components/ProjectDiagram";
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
    alternates: {
      canonical: "/projects/" + project.slug,
    },
    openGraph: {
      title: project.title,
      description: project.intro,
      url: "/projects/" + project.slug,
      images: [{ url: project.image, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.intro,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="project-page project-page-v2">
      <SiteHeader />
      <ProjectProgress
        items={[
          { id: "overview", number: "01", label: "Overview" },
          { id: "context", number: "02", label: "Context" },
          { id: "concept", number: "03", label: "Concept" },
          { id: "drawings", number: "04", label: "Drawings" },
          { id: "materials", number: "05", label: "Materials" },
          { id: "detail", number: "06", label: "Detail" },
          { id: "credits", number: "07", label: "Credits" },
        ]}
      />

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

      <section id="overview" className="case-intro case-section">
        <div className="case-index">
          <span>01</span>
          <span>Overview</span>
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
            <div>
              <span>Year</span>
              <strong>{project.year}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="case-image-full">
        <Image
          src={project.gallery[0]}
          alt={project.title + " primary view"}
          fill
          sizes="100vw"
          className="cover-image"
        />
        <div className="case-image-caption">
          <span>View / 01</span>
          <span>{project.title}</span>
        </div>
      </section>

      <section id="context" className="case-context case-section">
        <div className="case-index">
          <span>02</span>
          <span>Context</span>
        </div>

        <div className="case-context-grid">
          <div className="case-context-copy">
            <p className="case-kicker">Site + response</p>
            <h2>{project.context}</h2>
          </div>

          <div className="case-strategies">
            <p className="case-kicker">Design strategies</p>
            <ol>
              {project.strategies.map((strategy, index) => (
                <li key={strategy}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{strategy}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="case-gallery case-gallery-editorial">
        <div className="case-gallery-large">
          <Image
            src={project.gallery[1]}
            alt={project.title + " view 02"}
            fill
            sizes="(max-width: 900px) 100vw, 66vw"
            className="cover-image"
          />
          <span className="case-gallery-label">02</span>
        </div>

        <div className="case-gallery-small">
          <Image
            src={project.gallery[2]}
            alt={project.title + " view 03"}
            fill
            sizes="(max-width: 900px) 100vw, 34vw"
            className="cover-image"
          />
          <span className="case-gallery-label">03</span>
        </div>
      </section>

      <section id="concept" className="case-concept case-section">
        <div className="case-index">
          <span>03</span>
          <span>Concept</span>
        </div>

        <div className="case-concept-grid">
          <p className="case-kicker">Design approach</p>
          <h2>{project.concept}</h2>
        </div>
      </section>

      <section id="drawings" className="case-drawings case-section">
        <div className="case-index case-index-light">
          <span>04</span>
          <span>Drawings</span>
        </div>

        <div className="case-drawings-head">
          <p>
            Diagrammatic studies show the spatial logic behind the project.
            Replace these with the final plans, sections or elevations when
            project drawings are available.
          </p>
        </div>

        <div className="case-drawings-grid">
          {project.drawings.map((drawing, index) => (
            <figure key={drawing.title} className="case-drawing">
              <div className="case-drawing-canvas">
                <ProjectDiagram index={index} title={drawing.title} />
              </div>
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{drawing.title}</strong>
                <p>{drawing.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="materials" className="case-materials case-section">
        <div className="case-index">
          <span>05</span>
          <span>Material language</span>
        </div>

        <div className="case-materials-grid">
          <div className="case-materials-title">
            <p className="case-kicker">Palette</p>
            <h2>Material chosen for atmosphere, tactility and time.</h2>
          </div>

          <div className="case-material-list">
            {project.materials.map((material, index) => (
              <div className="case-material" key={material}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{material}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-wide-image">
        <Image
          src={project.gallery[3]}
          alt={project.title + " view 04"}
          fill
          sizes="100vw"
          className="cover-image"
        />
        <div className="case-wide-index">04 / Atmosphere</div>
      </section>

      <section id="detail" className="case-final-gallery">
        <div className="case-final-gallery-copy">
          <span>06 / Detail</span>
          <p>
            The case study closes at the scale of material, light and
            occupation—the point where the architectural idea becomes lived
            experience.
          </p>
        </div>

        <div className="case-final-gallery-media">
          <Image
            src={project.gallery[4]}
            alt={project.title + " detail view"}
            fill
            sizes="(max-width: 900px) 100vw, 70vw"
            className="cover-image"
          />
        </div>
      </section>

      <section id="credits" className="case-credits case-section">
        <div className="case-index">
          <span>07</span>
          <span>Project information</span>
        </div>

        <div className="case-credits-grid">
          <div className="case-credits-title">
            <p className="case-kicker">{site.name}</p>
            <h2>{project.title}</h2>
          </div>

          <dl>
            {project.credits.map((credit) => (
              <div key={credit.role}>
                <dt>{credit.role}</dt>
                <dd>{credit.value}</dd>
              </div>
            ))}
            <div>
              <dt>Area</dt>
              <dd>{project.area}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>
        </div>
      </section>

      <nav className="case-project-nav" aria-label="Project navigation">
        <ProjectTransitionLink
          href={"/projects/" + previousProject.slug}
          image={previousProject.image}
          title={previousProject.title}
          className="case-project-nav-side"
          cursorLabel="PREV"
        >
          <ArrowLeft size={18} strokeWidth={1.2} />
          <span>
            <small>Previous</small>
            {previousProject.title}
          </span>
        </ProjectTransitionLink>

        <Link
          href="/projects"
          className="case-project-nav-all"
          data-cursor-label="ALL"
        >
          <Grid2X2 size={18} strokeWidth={1.2} />
          All projects
        </Link>

        <ProjectTransitionLink
          href={"/projects/" + nextProject.slug}
          image={nextProject.image}
          title={nextProject.title}
          className="case-project-nav-side case-project-nav-next"
          cursorLabel="NEXT"
        >
          <span>
            <small>Next</small>
            {nextProject.title}
          </span>
          <ArrowRight size={18} strokeWidth={1.2} />
        </ProjectTransitionLink>
      </nav>

      <section className="case-next">
        <p>{site.name} · Next project / {nextProject.number}</p>
        <ProjectTransitionLink
          href={"/projects/" + nextProject.slug}
          image={nextProject.image}
          title={nextProject.title}
          cursorLabel="NEXT"
        >
          <span>{nextProject.title}</span>
          <span aria-hidden="true">↗</span>
        </ProjectTransitionLink>
        <div className="case-next-meta">
          <span>{nextProject.location}</span>
          <span>{nextProject.year}</span>
        </div>
      </section>
    </main>
  );
}
