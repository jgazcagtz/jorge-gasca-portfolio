"use client";

import { useSyncExternalStore } from "react";

const themeEvent = "jorge-theme-change";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(themeEvent, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(themeEvent, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getThemeSnapshot() {
  return document.documentElement.dataset.theme === "dark";
}

function getServerThemeSnapshot() {
  return false;
}

export function ThemeToggle({ locale }: { locale: "en" | "es" }) {
  const dark = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const label = locale === "en"
    ? `Switch to ${dark ? "light" : "dark"} theme`
    : `Cambiar al tema ${dark ? "claro" : "oscuro"}`;

  const toggleTheme = () => {
    const nextDark = !dark;
    const theme = nextDark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem("jorge-theme", theme);
    } catch {
      // The visual theme still changes if storage is unavailable.
    }
    window.dispatchEvent(new Event(themeEvent));
  };

  return (
    <button
      className="themeToggle"
      type="button"
      aria-label={label}
      aria-pressed={dark}
      data-testid="theme-toggle"
      data-theme-toggle
      onClick={toggleTheme}
    >
      <span className="themeToggleTrack" aria-hidden="true">
        <span className="themeToggleKnob" />
      </span>
    </button>
  );
}
