// GA4 event tracking helper
// Add your GA4 measurement ID to index.html when ready
export function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}
