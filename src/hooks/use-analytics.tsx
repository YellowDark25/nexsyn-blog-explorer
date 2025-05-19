
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackEvent, AnalyticsEvent } from '@/services/analyticsService';

/**
 * Hook for using analytics tracking in components
 */
export const useAnalytics = () => {
  const location = useLocation();

  // Track page view on location change
  useEffect(() => {
    const path = location.pathname + location.search;
    const title = document.title;
    trackPageView(path, title);
  }, [location.pathname, location.search]);

  return {
    trackEvent: (event: AnalyticsEvent) => trackEvent(event),
    trackClick: (label: string, category?: string) => trackEvent({
      type: 'click',
      label,
      category,
    }),
    trackFormSubmission: (formId: string, metadata?: Record<string, any>) => trackEvent({
      type: 'form_submission',
      label: formId,
      metadata,
    }),
    trackSearch: (query: string) => trackEvent({
      type: 'search',
      label: query,
    }),
    trackPostView: (postId: string, postTitle: string) => trackEvent({
      type: 'post_view',
      label: postTitle,
      metadata: { postId },
    }),
  };
};
