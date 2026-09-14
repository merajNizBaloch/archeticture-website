"use client";

import { useEffect, useRef, useState } from "react";

export default function ArchitectureCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const follower = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = cursor.current;
    const ring = follower.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const render = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      raf = requestAnimationFrame(render);
    };

    const move = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const over = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        "a, button, [data-cursor]",
      );

      if (!target) return;

      ring.classList.add("cursor-active");
      setLabel(target.dataset.cursorLabel ?? "");
    };

    const out = (event: MouseEvent) => {
      const related = event.relatedTarget as HTMLElement | null;
      if (related?.closest?.("a, button, [data-cursor]")) return;

      ring.classList.remove("cursor-active");
      setLabel("");
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={cursor} className="cursor-dot" aria-hidden="true" />
      <div ref={follower} className="cursor-ring" aria-hidden="true">
        <span>{label}</span>
      </div>
    </>
  );
}
