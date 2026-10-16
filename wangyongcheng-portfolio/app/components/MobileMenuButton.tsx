"use client";

import { useEffect, useRef, useState } from "react";

type MobileMenuButtonProps = {
  navId: string;
  label: string;
  closeLabel: string;
};

export default function MobileMenuButton({ navId, label, closeLabel }: MobileMenuButtonProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const navigation = document.getElementById(navId);
    if (!navigation) return;

    navigation.dataset.mobileOpen = open ? "true" : "false";

    const closeFromLink = (event: Event) => {
      if ((event.target as HTMLElement).closest("a")) setOpen(false);
    };
    const closeFromKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    navigation.addEventListener("click", closeFromLink);
    window.addEventListener("keydown", closeFromKeyboard);

    if (open) {
      window.requestAnimationFrame(() => navigation.querySelector<HTMLElement>("a")?.focus());
    }

    return () => {
      navigation.removeEventListener("click", closeFromLink);
      window.removeEventListener("keydown", closeFromKeyboard);
    };
  }, [navId, open]);

  return (
    <button
      aria-controls={navId}
      aria-expanded={open}
      aria-label={open ? closeLabel : label}
      className="mobile-menu-button"
      onClick={() => setOpen((current) => !current)}
      ref={buttonRef}
      type="button"
    >
      <span aria-hidden="true" className="mobile-menu-lines">
        <i />
        <i />
      </span>
      <span>{open ? closeLabel : label}</span>
    </button>
  );
}
