import { track } from "@vercel/analytics";

export type AnalyticsEventName =
  | "case_study_open"
  | "cv_pdf_download"
  | "writing_post_open";

export type AnalyticsEventData = Record<
  string,
  string | number | boolean
>;

/**
 * Fire a custom analytics event. Vercel Web Analytics needs no key on Vercel
 * deployments (the script is injected automatically); in local development the
 * package only logs to the console, so the extra log below keeps every custom
 * event visible while iterating locally.
 */
export function trackEvent(
  name: AnalyticsEventName,
  data?: AnalyticsEventData,
) {
  if (process.env.NODE_ENV === "development") {
    console.info(`[analytics] ${name}`, data ?? {});
  }
  track(name, data);
}
