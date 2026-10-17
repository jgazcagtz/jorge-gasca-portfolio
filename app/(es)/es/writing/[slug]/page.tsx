import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { WritingPostPage } from "@/components/writing-page";
import { writingPostMetadata } from "@/lib/seo";
import { getWritingPost, writingSlugs } from "@/lib/writing";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return writingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingPost(slug);
  if (!post) notFound();
  return writingPostMetadata("es", post);
}

export default async function SpanishWritingPost({ params }: Props) {
  const { slug } = await params;
  const post = getWritingPost(slug);
  if (!post) notFound();

  return (
    <SiteShell locale="es" alternateHref={`/writing/${post.slug}`}>
      <WritingPostPage locale="es" post={post} />
    </SiteShell>
  );
}
