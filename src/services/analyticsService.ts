
/**
 * Analytics Service
 * Handles tracking and analytics functionality
 */

export interface AnalyticsEvent {
  type: string;
  label: string;
  category?: string;
  value?: number;
  metadata?: Record<string, any>;
}

/**
 * Track a page view
 */
export const trackPageView = (path: string, title: string) => {
  // Track in Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
      page_location: window.location.href
    });
  }
  
  console.log('Page view tracked:', { path, title });
};

/**
 * Track an event
 */
export const trackEvent = (event: AnalyticsEvent) => {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.type, {
      event_category: event.category || 'engagement',
      event_label: event.label,
      value: event.value,
      ...event.metadata
    });
  }
  
  // Log for debugging
  console.log('Event tracked:', event);
};

/**
 * Track user engagement with social features
 */
export const trackSocialEngagement = (
  action: 'like' | 'share' | 'comment' | 'bookmark', 
  contentId: string, 
  metadata?: Record<string, any>
) => {
  const event: AnalyticsEvent = {
    type: 'social_engagement',
    label: action,
    category: 'social',
    metadata: {
      contentId,
      ...metadata
    }
  };
  
  trackEvent(event);
};

/**
 * Track post view - used specifically for blog post views
 */
export const trackPostView = (postId: string, postTitle: string) => {
  trackEvent({
    type: 'post_view',
    label: postTitle,
    category: 'content',
    metadata: { postId }
  });
};
