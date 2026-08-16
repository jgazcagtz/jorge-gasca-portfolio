import type { Metadata } from "next";
import { CvHubPage } from "@/components/cv-page";
import { SiteShell } from "@/components/site-shell";
import { cvHubMetadata } from "@/lib/seo";

export const metadata: Metadata = cvHubMetadata("es");

export default function SpanishCvHub() {
  return (
    <SiteShell locale="es" alternateHref="/cv">
      <CvHubPage locale="es" />
    </SiteShell>
  );
}
