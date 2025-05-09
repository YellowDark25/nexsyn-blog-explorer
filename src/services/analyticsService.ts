
/**
 * Analytics Service for tracking page views and events
 */

// Define event types for better type checking
export type AnalyticsEventType = 
  | 'page_view' 
  | 'click' 
  | 'form_submission' 
  | 'post_view' 
  | 'search' 
  | 'contact';

// Interface for event data
export interface AnalyticsEvent {
  type: AnalyticsEventType;
  category?: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

/**
 * Tracks a page view in analytics integrations
 * @param path Page path
 * @param title Page title
 */
export const trackPageView = (path: string, title: string) => {
  // Track in Google Analytics if available
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore - gtag is added by the analytics script
    window.gtag('config', window.GOOGLE_ANALYTICS_ID, {
      page_path: path,
      page_title: title,
    });
  }

  console.log('📊 Page view tracked:', { path, title });
};

/**
 * Tracks a custom event in analytics integrations
 * @param event Event details
 */
export const trackEvent = (event: AnalyticsEvent) => {
  // Track in Google Analytics if available
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore - gtag is added by the analytics script
    window.gtag('event', event.type, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.metadata,
    });
  }

  console.log('📊 Event tracked:', event);
};
