type TrackEvent = {
  name: string;
  properties?: Record<string, unknown>;
};

type TrackPageView = {
  path: string;
  title?: string;
};

export function trackEvent(event: TrackEvent): void {
  if (import.meta.env.DEV) {
    console.log("[analytics:track]", event.name, event.properties);
  }
}

export function trackPageView(page: TrackPageView): void {
  if (import.meta.env.DEV) {
    console.log("[analytics:pageview]", page.path, page.title);
  }
}