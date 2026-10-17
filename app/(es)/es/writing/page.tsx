import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { WritingIndexPage } from "@/components/writing-page";
import { writingHubMetadata } from "@/lib/seo";

export const metadata: Metadata = writingHubMetadata("es");

export default function SpanishWritingIndex() {
  return (
    <SiteShell locale="es" alternateHref="/writing">
      <WritingIndexPage locale="es" />
    </SiteShell>
  );
}
