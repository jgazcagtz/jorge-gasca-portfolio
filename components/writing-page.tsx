import Link from "next/link";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { ActionLink, MetaLabel } from "@/components/design-primitives";
import {
  writingHubPath,
  writingPostPath,
  writingPosts,
  writingUiCopy,
  type WritingPost,
} from "@/lib/writing";
import { localePath, type Locale } from "@/lib/site";
import styles from "./writing-page.module.css";

function formatDate(isoDate: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export function WritingIndexPage({ locale }: { locale: Locale }) {
  const copy = writingUiCopy[locale];

  return (
    <main id="main-content" className={styles.indexMain}>
      <section className={styles.indexHero} aria-labelledby="writing-title">
        <MetaLabel>{copy.eyebrow}</MetaLabel>
        <h1 id="writing-title">{copy.title}</h1>
        <p>{copy.intro}</p>
      </section>

      <section className={styles.postSection} aria-label={copy.eyebrow}>
        <div className={styles.postList}>
          {writingPosts.map((post) => (
            <article key={post.slug} className={styles.postCard}>
              <div className={styles.postCardMeta}>
                <span>{formatDate(post.date, locale)}</span>
              </div>
              <h2>
                <TrackedLink
                  href={writingPostPath(locale, post.slug)}
                  eventName="writing_post_open"
                  eventData={{ slug: post.slug, locale }}
                >
                  {post.copy[locale].title}
                </TrackedLink>
              </h2>
              <p>{post.copy[locale].dek}</p>
              <span className={styles.postReadMore}>
                {copy.readPost}
                <span aria-hidden="true">→</span>
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export function WritingPostPage({
  locale,
  post,
}: {
  locale: Locale;
  post: WritingPost;
}) {
  const copy = writingUiCopy[locale];
  const localized = post.copy[locale];

  return (
    <main id="main-content" className={styles.postMain}>
      <nav className={styles.breadcrumbs} aria-label={locale === "en" ? "Breadcrumb" : "Ruta de navegación"}>
        <Link href={localePath(locale)}>{locale === "en" ? "Portfolio" : "Portafolio"}</Link>
        <span aria-hidden="true">/</span>
        <Link href={writingHubPath(locale)}>{copy.eyebrow}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{localized.title}</span>
      </nav>

      <article className={styles.postArticle} aria-labelledby="post-title">
        <header className={styles.postHeader}>
          <div className={styles.postHeaderMeta}>
            <MetaLabel>{copy.published} · {formatDate(post.date, locale)}</MetaLabel>
          </div>
          <h1 id="post-title">{localized.title}</h1>
          <p className={styles.postDek}>{localized.dek}</p>
        </header>

        <div className={styles.postBody}>
          {localized.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <footer className={styles.postFooter}>
          <ActionLink href={writingHubPath(locale)} variant="secondary">
            {copy.back}
          </ActionLink>
        </footer>
      </article>
    </main>
  );
}
