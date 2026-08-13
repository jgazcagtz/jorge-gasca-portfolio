import { HomePage } from "@/components/home-page";
import { SiteShell } from "@/components/site-shell";

export default function SpanishHome() {
  return (
    <SiteShell locale="es" alternateHref="/">
      <HomePage locale="es" />
    </SiteShell>
  );
}
