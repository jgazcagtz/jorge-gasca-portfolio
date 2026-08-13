"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type MobileNavLink = {
  href: string;
  label: string;
};

export function MobileNav({
  label,
  navigationLabel,
  links,
}: {
  label: string;
  navigationLabel: string;
  links: MobileNavLink[];
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setOpen(false);
      window.requestAnimationFrame(() => buttonRef.current?.focus());
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="mobileNav" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{label}</span>
        <span aria-hidden="true">{open ? "×" : "+"}</span>
      </button>
      <nav id={panelId} aria-label={navigationLabel} hidden={!open}>
        {links.map((link, index) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
