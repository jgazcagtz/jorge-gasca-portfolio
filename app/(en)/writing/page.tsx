import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { WritingIndexPage } from "@/components/writing-page";
import { writingHubMetadata } from "@/lib/seo";

export const metadata: Metadata = writingHubMetadata("en");

export default function EnglishWritingIndex() {
  return (
    <SiteShell locale="en" alternateHref="/es/writing">
      <WritingIndexPage locale="en" />
    </SiteShell>
  );
}
