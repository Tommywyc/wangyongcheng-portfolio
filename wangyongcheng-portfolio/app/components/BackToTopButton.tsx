"use client";

import { useEffect, useState } from "react";

export default function BackToTopButton({ english = false }: { english?: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 420);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <button
      aria-label={english ? "Back to top" : "返回顶部"}
      aria-hidden={!visible}
      className={`back-to-top${visible ? " is-visible" : ""}`}
      onClick={() => window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      })}
      tabIndex={visible ? 0 : -1}
      type="button"
    >
      <span aria-hidden="true">↑</span>
      <small>TOP</small>
    </button>
  );
}
