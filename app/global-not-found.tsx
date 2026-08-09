import type { Metadata } from "next";
import Link from "next/link";
import { geist, instrumentSerif } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found / Página no encontrada — Jorge Gasca",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geist.variable} ${instrumentSerif.variable}`}>
      <body>
        <main id="main-content" className="notFoundPage">
          <p>404 / Not found / <span lang="es">No encontrado</span></p>
          <h1>That page is not here.</h1>
          <p lang="es">Esa página no está aquí.</p>
          <nav aria-label="Portfolio home / Inicio del portafolio">
            <Link href="/">English <span aria-hidden="true">→</span></Link>
            <Link href="/es" lang="es">Español <span aria-hidden="true">→</span></Link>
          </nav>
        </main>
      </body>
    </html>
  );
}
