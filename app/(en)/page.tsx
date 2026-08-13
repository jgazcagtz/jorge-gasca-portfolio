import { HomePage } from "@/components/home-page";
import { SiteShell } from "@/components/site-shell";

export default function EnglishHome() {
  return (
    <SiteShell locale="en" alternateHref="/es">
      <HomePage locale="en" />
    </SiteShell>
  );
}
