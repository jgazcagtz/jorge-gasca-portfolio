import type { ReactNode } from "react";
import { RootDocument } from "@/components/root-document";
import { homeMetadata } from "@/lib/seo";
import "../../globals.css";

export const metadata = homeMetadata("es");

export default function SpanishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="es">{children}</RootDocument>;
}
