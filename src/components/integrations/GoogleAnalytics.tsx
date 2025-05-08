
import React from 'react';

interface GoogleAnalyticsProps {
  measurementId: string;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    GOOGLE_ANALYTICS_ID?: string;
  }
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId }) => {
  // Don't render during SSR
  if (typeof window === 'undefined') {
    return null;
  }

  // Store measurement ID in window for access in service
  if (measurementId) {
    window.GOOGLE_ANALYTICS_ID = measurementId;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', { send_page_view: false });
          `
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
