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

  const returnToTop = () => {
    // Remove a stale section anchor while retaining language/filter parameters
    // and history state. Native smooth scrolling preserves acceleration/easing.
    if (window.location.hash) {
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
    }
    window.scrollTo({ top: 0, left: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    document.querySelector<HTMLElement>(".site-header .wordmark")?.focus({ preventScroll: true });
  };

  return (
    <button
      aria-label={english ? "Back to top" : "返回顶部"}
      aria-hidden={!visible}
      className={`back-to-top${visible ? " is-visible" : ""}`}
      onClick={returnToTop}
      tabIndex={visible ? 0 : -1}
      type="button"
    >
      <span aria-hidden="true">↑</span>
      <small>TOP</small>
    </button>
  );
}
