"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteHeader from "@/components/SiteHeader";
import ProjectTransitionLink from "@/components/ProjectTransitionLink";
import { projects } from "@/lib/projects";
import { principles, process, services, site } from "@/lib/site";

export default function HomeExperienceV2() {
  const root = useRef<HTMLElement>(null);
  const hero = useRef<HTMLElement>(null);
  const projectsSection = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".preloader", { display: "none" });
      gsap.set(".hero-copy-line > span", { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(".hero-copy-line > span", { yPercent: 120 });
      gsap.set(".hero-kicker, .hero-footer", { opacity: 0, y: 18 });

      gsap
        .timeline()
        .to(".preloader-panel", {
          scaleY: 0,
          duration: 1.15,
          stagger: 0.08,
          transformOrigin: "top center",
          ease: "power4.inOut",
        })
        .to(
          ".hero-copy-line > span",
          {
            yPercent: 0,
            duration: 1.05,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.62",
        )
        .to(
          ".hero-kicker, .hero-footer",
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.58",
        );

      if (hero.current) {
        gsap.to(".hero-media-inner", {
          yPercent: 13,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: hero.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-copy", {
          yPercent: 18,
          opacity: 0.28,
          ease: "none",
          scrollTrigger: {
            trigger: hero.current,
            start: "35% top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".reveal-copy").forEach((element) => {
        gsap.from(element, {
          y: 72,
          opacity: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
          },
        });
      });

      if (projectsSection.current) {
        const layers = gsap.utils.toArray<HTMLElement>(
          ".project-layer",
          projectsSection.current,
        );
        const metas = gsap.utils.toArray<HTMLElement>(
          ".project-meta",
          projectsSection.current,
        );

        gsap.set(layers.slice(1), { clipPath: "inset(100% 0 0 0)" });
        gsap.set(metas, { pointerEvents: "none" });
        gsap.set(metas[0], { pointerEvents: "auto" });
        gsap.set(metas.slice(1), { opacity: 0, y: 28 });

        const sequence = gsap.timeline();

        for (let index = 1; index < layers.length; index += 1) {
          const at = index - 1;

          sequence
            .set(metas[index - 1], { pointerEvents: "none" }, at)
            .to(metas[index - 1], { opacity: 0, y: -24, duration: 0.22 }, at)
            .to(
              layers[index],
              {
                clipPath: "inset(0% 0 0 0)",
                duration: 0.78,
                ease: "none",
              },
              at,
            )
            .set(metas[index], { pointerEvents: "auto" }, at + 0.48)
            .to(
              metas[index],
              { opacity: 1, y: 0, duration: 0.28 },
              at + 0.5,
            );
        }

        ScrollTrigger.create({
          trigger: projectsSection.current,
          start: "top top",
          end: "bottom bottom",
          animation: sequence,
          scrub: 0.8,
        });

        gsap.to(".project-progress-fill", {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: projectsSection.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".service-row").forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="site-shell">
      <div className="preloader" aria-hidden="true">
        <div className="preloader-panel" />
        <div className="preloader-panel" />
        <div className="preloader-panel" />
      </div>

      <SiteHeader />

      <section ref={hero} className="hero">
        <div className="hero-media" aria-hidden="true">
          <div className="hero-media-inner">
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2600&q=90"
              alt=""
              fill
              priority
              sizes="100vw"
              className="cover-image"
            />
          </div>
          <div className="hero-shade" />
        </div>

        <div className="hero-kicker">
          <span>{site.descriptor.replace(" · Spatial Design", "")}</span>
          <span>{site.location} · {site.year}</span>
        </div>

        <div className="hero-copy">
          <h1>
            <span className="hero-copy-line"><span>FORM</span></span>
            <span className="hero-copy-line"><span>LIGHT</span></span>
            <span className="hero-copy-line hero-copy-line-indent"><span>PLACE</span></span>
          </h1>
        </div>

        <div className="hero-footer">
          <p>{site.statement}</p>
          <div className="scroll-cue">
            <span>Scroll to explore</span>
            <ArrowDown size={16} strokeWidth={1.4} />
          </div>
        </div>
      </section>

      <section id="studio" className="manifesto section-pad">
        <div className="section-index"><span>01</span><span>Studio</span></div>
        <div className="manifesto-copy reveal-copy">
          <p className="eyebrow">A practice of restraint and clarity</p>
          <h2>We design spaces that feel <em>inevitable</em> to their place.</h2>
        </div>
        <div className="manifesto-note reveal-copy">
          <p>
            Architecture is a response to light, climate, movement, memory and
            construction. Every project is developed from these conditions outward.
          </p>
        </div>
      </section>

      <section id="projects" ref={projectsSection} className="projects-shell">
        <div className="projects-sticky">
          <div className="projects-topline">
            <span>02 / Selected projects</span>
            <span>Scroll sequence</span>
          </div>

          <div className="project-stage">
            {projects.map((project, index) => (
              <div className="project-layer" key={project.slug}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="cover-image project-image"
                  priority={index === 0}
                />
                <div className="project-image-shade" />
              </div>
            ))}

            <div className="project-meta-wrap">
              {projects.map((project) => (
                <article className="project-meta" key={project.slug}>
                  <div className="project-number">{project.number}</div>

                  <ProjectTransitionLink
                    href={"/projects/" + project.slug}
                    image={project.image}
                    title={project.title}
                    className="project-title-link"
                    cursorLabel="VIEW"
                  >
                    <h3>{project.title}</h3>
                  </ProjectTransitionLink>

                  <div className="project-details">
                    <span>{project.location}</span>
                    <span>{project.type}</span>
                    <span>{project.year}</span>
                  </div>

                  <ProjectTransitionLink
                    href={"/projects/" + project.slug}
                    image={project.image}
                    title={project.title}
                    className="project-link"
                    cursorLabel="VIEW"
                  >
                    View project
                    <ArrowUpRight size={17} strokeWidth={1.4} />
                  </ProjectTransitionLink>
                </article>
              ))}
            </div>
          </div>

          <div className="project-progress"><div className="project-progress-fill" /></div>
        </div>
      </section>

      <section id="services" className="services section-pad">
        <div className="section-index"><span>03</span><span>Capabilities</span></div>

        <div className="services-heading reveal-copy">
          <p className="eyebrow">From first line to built space</p>
          <h2>Architecture as a complete process.</h2>
        </div>

        <div className="services-list">
          {services.map((service) => (
            <div className="service-row" key={service.number} data-cursor="service">
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.note}</p>
              <ArrowUpRight size={22} strokeWidth={1.2} />
            </div>
          ))}
        </div>
      </section>

      <section className="statement">
        <div className="statement-media">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2400&q=88"
            alt="Architectural interior"
            fill
            sizes="100vw"
            className="cover-image"
          />
        </div>
        <div className="statement-overlay" />
        <div className="statement-copy reveal-copy">
          <p>BUILDING WITH PURPOSE</p>
          <h2>Less noise.<br />More meaning.</h2>
        </div>
      </section>

      <section className="numbers section-pad">
        <div className="section-index"><span>04</span><span>Principles</span></div>
        <div className="numbers-grid reveal-copy">
          {principles.map((principle) => (
            <div key={principle.title}>
              <strong>{principle.title}</strong>
              <span>{principle.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="process section-pad">
        <div className="section-index"><span>05</span><span>Process</span></div>
        <div className="process-title reveal-copy">
          <p className="eyebrow">A disciplined design sequence</p>
          <h2>From observation to occupation.</h2>
        </div>
        <div className="process-grid">
          {process.map((step) => (
            <article className="process-card reveal-copy" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.note}</p>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact" className="contact">
        <div className="contact-top">
          <span>06 / Contact</span>
          <span>New commissions · 2026</span>
        </div>
        <div className="contact-copy reveal-copy">
          <p>Have a site or an idea?</p>
          <a href="#contact" data-cursor-label="HELLO">
            Let&apos;s build<br />something lasting.
            <ArrowUpRight size={64} strokeWidth={0.8} />
          </a>
        </div>
        <div className="contact-bottom">
          <span>STUDIO / 01</span>
          <span>Architecture · Interiors · Spatial Design</span>
          <span>Pakistan</span>
        </div>
      </footer>
    </main>
  );
}
