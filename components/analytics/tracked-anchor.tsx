"use client";

import type { ComponentProps } from "react";
import {
  trackEvent,
  type AnalyticsEventData,
  type AnalyticsEventName,
} from "@/components/analytics/track";

type TrackedAnchorProps = Omit<ComponentProps<"a">, "onClick"> & {
  eventName: AnalyticsEventName;
  eventData?: AnalyticsEventData;
  onClick?: ComponentProps<"a">["onClick"];
};

/** Plain anchor (downloads, external files) that reports a custom analytics event on click. */
export function TrackedAnchor({
  eventName,
  eventData,
  onClick,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventData);
        onClick?.(event);
      }}
    />
  );
}
