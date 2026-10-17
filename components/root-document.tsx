import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { geist, instrumentSerif } from "@/lib/fonts";
import type { Locale } from "@/lib/site";

const themeScript = `(() => { try { const saved = localStorage.getItem('jorge-theme'); const theme = saved === 'dark' || saved === 'light' ? saved : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); document.documentElement.dataset.theme = theme; document.documentElement.style.colorScheme = theme; } catch (_) {} })();`;

/**
 * Vercel Web Analytics. Only mounted on Vercel deployments: there the script
 * is served same-origin (allowed by the site CSP) and no key is required. In
 * local dev and `next start` the script would be blocked or 404, so custom
 * events are logged to the console instead via the track helper.
 */
const isVercelDeployment = process.env.VERCEL === "1";

export function RootDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <html
      lang={locale}
      className={`${geist.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
        {isVercelDeployment ? <Analytics /> : null}
      </body>
    </html>
  );
}
