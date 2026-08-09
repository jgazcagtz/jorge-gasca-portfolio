import type { ReactNode } from "react";
import { RootDocument } from "@/components/root-document";
import { homeMetadata } from "@/lib/seo";
import "../globals.css";

export const metadata = homeMetadata("en");

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
