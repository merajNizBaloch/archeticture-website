"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  MouseEvent,
  ReactNode,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

type ProjectTransitionLinkProps = {
  href: string;
  image: string;
  title: string;
  className?: string;
  children: ReactNode;
  cursorLabel?: string;
};

export default function ProjectTransitionLink({
  href,
  image,
  title,
  className,
  children,
  cursorLabel = "VIEW",
}: ProjectTransitionLinkProps) {
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const [transitioning, setTransitioning] = useState(false);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (transitioning) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(href);
      return;
    }

    const node = overlay.current;
    if (!node) {
      router.push(href);
      return;
    }

    setTransitioning(true);
    document.body.style.overflow = "hidden";

    const media = node.querySelector(".project-transition-media");
    const titleNode = node.querySelector(".project-transition-title");
    const meta = node.querySelector(".project-transition-meta");

    gsap.set(node, {
      display: "block",
      pointerEvents: "auto",
      clipPath: "inset(100% 0 0 0)",
    });

    gsap.set(media, { scale: 1.12 });
    gsap.set(titleNode, { yPercent: 115 });
    gsap.set(meta, { opacity: 0, y: 14 });

    gsap
      .timeline({
        onComplete: () => {
          router.push(href);
          window.setTimeout(() => {
            document.body.style.overflow = "";
          }, 150);
        },
      })
      .to(node, {
        clipPath: "inset(0% 0 0 0)",
        duration: 0.64,
        ease: "power4.inOut",
      })
      .to(
        media,
        {
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        0.08,
      )
      .to(
        titleNode,
        {
          yPercent: 0,
          duration: 0.72,
          ease: "power4.out",
        },
        0.26,
      )
      .to(
        meta,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        },
        0.34,
      );
  };

  return (
    <>
      <a
        href={href}
        className={className}
        data-cursor-label={cursorLabel}
        aria-busy={transitioning}
        onPointerEnter={() => router.prefetch(href)}
        onTouchStart={() => router.prefetch(href)}
        onClick={handleClick}
      >
        {children}
      </a>

      <div
        ref={overlay}
        className="project-transition-overlay"
        aria-hidden="true"
      >
        <div className="project-transition-media">
          {transitioning && (
            <Image
              src={image}
              alt=""
              fill
              sizes="100vw"
              className="cover-image"
            />
          )}
          <div className="project-transition-shade" />
        </div>

        <div className="project-transition-top">
          <span>Opening project</span>
          <span>Selected work</span>
        </div>

        <div className="project-transition-copy">
          <span className="project-transition-meta">Architecture / Case study</span>
          <div className="project-transition-title-mask">
            <strong className="project-transition-title">{title}</strong>
          </div>
        </div>
      </div>
    </>
  );
}
