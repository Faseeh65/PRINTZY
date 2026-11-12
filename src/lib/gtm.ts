/**
 * Google Tag Manager (GTM) integration utilities.
 * Handles dataLayer initialization and SPA virtual pageview tracking.
 */

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

/**
 * Pushes custom events or virtual pageviews to window.dataLayer.
 */
export function pushToDataLayer(event: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/**
 * Pushes a virtual pageview event for SPA client-side route changes.
 */
export function trackGtmPageView(url: string, title?: string): void {
  pushToDataLayer({
    event: "page_view",
    page_path: url,
    page_title: title || (typeof document !== "undefined" ? document.title : ""),
  });
}

/**
 * Pushes a quote submission conversion event to GTM and GA4 dataLayer.
 */
export function trackGtmQuoteSubmit(metadata: { product: string; quantity?: string }): void {
  pushToDataLayer({
    event: "quote_submit",
    product: metadata.product,
    quantity: metadata.quantity || "",
  });
}

/**
 * Pushes a WhatsApp conversation click conversion event to GTM and GA4 dataLayer.
 */
export function trackGtmWhatsAppClick(location?: string): void {
  pushToDataLayer({
    event: "whatsapp_click",
    click_location: location || "direct_button",
  });
}
