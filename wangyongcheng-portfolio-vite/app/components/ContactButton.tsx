"use client";

import { useEffect, useState } from "react";

export default function ContactButton({ english = false }: { english?: boolean }) {
  const [visibleOnMobile, setVisibleOnMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hidden = isMobile && !visibleOnMobile;

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth <= 768);
      setVisibleOnMobile(window.scrollY > window.innerHeight * 0.72);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <a
      aria-label={english ? "Email Tommy" : "联系 Tommy"}
      aria-hidden={hidden || undefined}
      className="contact-float"
      data-mobile-visible={visibleOnMobile ? "true" : "false"}
      href="mailto:w3194510963@gmail.com"
      tabIndex={hidden ? -1 : undefined}
      title={english ? "Email Tommy" : "联系 Tommy"}
    >
      <span aria-hidden="true">✉</span>
      <small>MAIL</small>
    </a>
  );
}
