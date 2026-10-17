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
    // Cancel smooth scrolling and remove a stale section anchor while retaining
    // language/filter parameters and the framework's existing history state.
    if (window.location.hash) {
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
