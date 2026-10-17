"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import {
  trackEvent,
  type AnalyticsEventData,
  type AnalyticsEventName,
} from "@/components/analytics/track";

type TrackedLinkProps = Omit<ComponentProps<typeof Link>, "onClick"> & {
  eventName: AnalyticsEventName;
  eventData?: AnalyticsEventData;
  onClick?: ComponentProps<typeof Link>["onClick"];
};

/** Internal navigation link that reports a custom analytics event on click. */
export function TrackedLink({
  eventName,
  eventData,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventData);
        onClick?.(event);
      }}
    />
  );
}
