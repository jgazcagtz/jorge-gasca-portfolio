import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { geist, instrumentSerif } from "@/lib/fonts";
import type { Locale } from "@/lib/site";

const themeScript = `(() => { try { const saved = localStorage.getItem('jorge-theme'); const theme = saved === 'dark' || saved === 'light' ? saved : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); document.documentElement.dataset.theme = theme; document.documentElement.style.colorScheme = theme; } catch (_) {} })();`;

function interactionScript(locale: Locale) {
  return `(() => {
    const toggle = document.querySelector('[data-theme-toggle]');
    const updateToggle = () => {
      if (!toggle) return;
      const dark = document.documentElement.dataset.theme === 'dark';
      toggle.setAttribute('aria-pressed', String(dark));
      toggle.setAttribute('aria-label', ${JSON.stringify(locale)} === 'en'
        ? 'Switch to ' + (dark ? 'light' : 'dark') + ' theme'
        : 'Cambiar al tema ' + (dark ? 'claro' : 'oscuro'));
    };
    updateToggle();
    toggle?.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      document.documentElement.style.colorScheme = next;
      try { localStorage.setItem('jorge-theme', next); } catch (_) {}
      updateToggle();
    });
    const localeSwitch = document.querySelector('[data-locale-switch]');
    if (localeSwitch) {
      const path = location.pathname;
      localeSwitch.setAttribute('href', ${JSON.stringify(locale)} === 'en'
        ? '/es' + (path === '/' ? '' : path)
        : (path.replace(/^\\/es(?=\\/|$)/, '') || '/'));
    }
    const mobileNav = document.querySelector('details.mobileNav');
    mobileNav?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileNav.removeAttribute('open'));
    });
  })();`;
}

export function RootDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const skipLabel = locale === "en" ? "Skip to content" : "Saltar al contenido";

  return (
    <html
      lang={locale}
      className={`${geist.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a className="skipLink" href="#main-content">{skipLabel}</a>
        <SiteHeader locale={locale} />
        <script dangerouslySetInnerHTML={{ __html: interactionScript(locale) }} />
        {children}
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
