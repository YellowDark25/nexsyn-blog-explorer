
import React, { ReactNode } from 'react';
import GoogleAnalytics from './GoogleAnalytics';

interface IntegrationsProviderProps {
  children: ReactNode;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  hotjarId?: string;
}

/**
 * Provider component that handles all third-party integrations
 * Allows configuring all integrations in one place
 */
const IntegrationsProvider: React.FC<IntegrationsProviderProps> = ({
  children,
  googleAnalyticsId,
  facebookPixelId,
  hotjarId
}) => {
  return (
    <>
      {/* Render the main application */}
      {children}
      
      {/* Integrations are inserted at the end to avoid blocking rendering */}
      {googleAnalyticsId && <GoogleAnalytics measurementId={googleAnalyticsId} />}
      
      {/* Add Facebook Pixel if needed */}
      {facebookPixelId && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${facebookPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
      
      {/* Add Hotjar if needed */}
      {hotjarId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${hotjarId},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      )}
    </>
  );
};

export default IntegrationsProvider;
