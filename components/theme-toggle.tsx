export function ThemeToggle({ label }: { label: string }) {
  return (
    <button
      className="themeToggle"
      type="button"
      aria-label={label}
      aria-pressed="false"
      data-testid="theme-toggle"
      data-theme-toggle
    >
      <span className="themeToggleTrack" aria-hidden="true">
        <span className="themeToggleKnob" />
      </span>
    </button>
  );
}
