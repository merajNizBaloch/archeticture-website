import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import { principles, process, services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Architecture practice focused on context, light, material and precise project delivery.",
};

export default function StudioPage() {
  return (
    <main className="inner-page studio-page">
      <SiteHeader />

      <section className="inner-hero studio-hero">
        <div className="inner-hero-top">
          <span>Studio / About</span>
          <span>{site.location}</span>
        </div>

        <div className="inner-hero-title">
          <p>A practice of restraint, clarity and careful making</p>
          <h1>
            SPACE
            <br />
            WITH PURPOSE.
          </h1>
        </div>
      </section>

      <section className="studio-intro">
        <div className="studio-intro-label">
          <span>01</span>
          <span>Approach</span>
        </div>

        <div className="studio-intro-copy">
          <h2>
            Architecture begins with what is already there: climate, movement,
            memory, material and the way people inhabit a place.
          </h2>

          <p>
            The studio develops each project from these conditions outward,
            balancing concept with constructability and atmosphere with
            long-term use.
          </p>
        </div>
      </section>

      <section className="studio-image">
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2200&q=88"
          alt="Architecture studio workspace"
          fill
          sizes="100vw"
          className="cover-image"
        />
      </section>

      <section className="studio-principles">
        <div className="studio-section-head">
          <span>02 / Principles</span>
          <span>How the work is shaped</span>
        </div>

        <div className="studio-principles-grid">
          {principles.map((principle, index) => (
            <article key={principle.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{principle.title}</h3>
              <p>{principle.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="studio-services">
        <div className="studio-section-head">
          <span>03 / Services</span>
          <span>From first line to built work</span>
        </div>

        <div className="studio-services-list">
          {services.map((service) => (
            <article key={service.number}>
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="studio-process">
        <div className="studio-section-head">
          <span>04 / Process</span>
          <span>A clear sequence</span>
        </div>

        <div className="studio-process-grid">
          {process.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.note}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
