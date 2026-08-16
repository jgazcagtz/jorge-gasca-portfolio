import type { Metadata } from "next";
import { CvHubPage } from "@/components/cv-page";
import { SiteShell } from "@/components/site-shell";
import { cvHubMetadata } from "@/lib/seo";

export const metadata: Metadata = cvHubMetadata("en");

export default function EnglishCvHub() {
  return (
    <SiteShell locale="en" alternateHref="/es/cv">
      <CvHubPage locale="en" />
    </SiteShell>
  );
}
