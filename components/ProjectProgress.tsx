"use client";

import { useEffect, useMemo, useState } from "react";

export type ProjectProgressItem = {
  id: string;
  number: string;
  label: string;
};

export default function ProjectProgress({
  items,
}: {
  items: ProjectProgressItem[];
}) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const ids = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      setProgress(Math.min(1, Math.max(0, window.scrollY / max)));

      const marker = window.innerHeight * 0.42;
      let nextActive = 0;

      ids.forEach((id, index) => {
        const element = document.getElementById(id);
        if (!element) return;
        if (element.getBoundingClientRect().top <= marker) {
          nextActive = index;
        }
      });

      setActive(nextActive);
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <aside className="project-reading-progress" aria-label="Project sections">
      <div className="project-reading-progress-track" aria-hidden="true">
        <span style={{ transform: `scaleY(${progress})` }} />
      </div>

      <div className="project-reading-progress-items">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={index === active ? "is-active" : ""}
            aria-current={index === active ? "step" : undefined}
            onClick={() => goTo(item.id)}
          >
            <span>{item.number}</span>
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
    </aside>
  );
}
