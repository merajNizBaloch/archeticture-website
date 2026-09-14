"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import StudioMark from "@/components/StudioMark";
import ProjectTransitionLink from "@/components/ProjectTransitionLink";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const items = [
  { label: "Projects", href: "/projects", number: "01" },
  { label: "Studio", href: "/studio", number: "02" },
  { label: "Services", href: "/studio#services", number: "03" },
  { label: "Contact", href: "/contact", number: "04" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const panel = overlay.current;
    if (!panel) return;

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.killTweensOf(panel);
      gsap.set(panel, { display: "block" });
      gsap.fromTo(
        panel,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.72,
          ease: "power4.inOut",
        },
      );
      gsap.fromTo(
        ".menu-link-line > span",
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.07,
          delay: 0.28,
          ease: "power4.out",
        },
      );
      gsap.fromTo(
        ".menu-footer",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, delay: 0.5 },
      );
    } else {
      document.body.style.overflow = "";
      gsap.killTweensOf(panel);
      gsap.to(panel, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.55,
        ease: "power4.inOut",
        onComplete: () => gsap.set(panel, { display: "none" }),
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label={site.name + " home"}>
          <StudioMark className="wordmark-mark" />
          <span className="wordmark-copy">
            <strong>{site.shortName}</strong>
            <small>/ 01</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {items.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "is-active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/contact" className="header-cta">
            Start a project
            <ArrowUpRight size={15} strokeWidth={1.5} />
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <div ref={overlay} className="menu-overlay" aria-hidden={!open}>
        <div className="menu-grid">
          <div className="menu-label">
            <span>Navigation</span>
            <span>{site.name}</span>
          </div>

          <nav className="menu-links" aria-label="Overlay navigation">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={"menu-link" + (isActive(item.href) ? " is-active" : "")}
                onClick={() => setOpen(false)}
                data-cursor-label="GO"
              >
                <span className="menu-link-number">{item.number}</span>
                <span className="menu-link-line">
                  <span>{item.label}</span>
                </span>
                <ArrowUpRight size={26} strokeWidth={1.1} />
              </Link>
            ))}
          </nav>

          <div className="menu-feature">
            <ProjectTransitionLink
              href={"/projects/" + projects[0].slug}
              image={projects[0].image}
              title={projects[0].title}
              className="menu-feature-link"
              cursorLabel="VIEW"
            >
              <div className="menu-feature-media">
                <Image
                  src={projects[0].image}
                  alt=""
                  fill
                  sizes="120px"
                  className="cover-image"
                />
              </div>
              <div className="menu-feature-copy">
                <span>Featured project</span>
                <strong>{projects[0].title}</strong>
                <span>{projects[0].location}</span>
              </div>
            </ProjectTransitionLink>
          </div>

          <div className="menu-footer">
            <span className="menu-availability">{site.availability}</span>
            <span>{site.location} · {site.year}</span>
          </div>
        </div>
      </div>
    </>
  );
}
