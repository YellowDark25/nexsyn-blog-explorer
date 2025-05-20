
import React from 'react';
import { Helmet, HelmetProps } from 'react-helmet';
import GoogleAnalytics from './integrations/GoogleAnalytics';

type ArticleData = {
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
};

interface SEOProps {
  title?: string | null;
  description?: string | null;
  image?: string | null;
  url?: string | null;
  type?: 'website' | 'article';
  article?: ArticleData | null;
  analytics?: {
    googleAnalytics?: string;
  };
}

// Helper function to safely get string values
const safeString = (value: unknown, defaultValue: string = ''): string => {
  if (value == null) return defaultValue;
  if (typeof value === 'string') return value.trim() || defaultValue;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (typeof value.toString === 'function') {
    try {
      const str = value.toString();
      return typeof str === 'string' ? str.trim() : defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
};

// Helper to safely get URL
const getSafeUrl = (url: string | null | undefined, fallback: string): string => {
  try {
    const urlStr = safeString(url, fallback);
    // Basic URL validation
    if (/^https?:\/\//.test(urlStr)) {
      return urlStr;
    }
    return fallback;
  } catch {
    return fallback;
  }
};

const SEO: React.FC<SEOProps> = ({
  title: propTitle,
  description: propDescription,
  image: propImage,
  url: propUrl,
  type = 'website',
  article: propArticle,
  analytics,
}) => {
  // Default values
  const DEFAULT_TITLE = 'NEXSYN Blog Explorer';
  const DEFAULT_DESCRIPTION = 'Blog NEXSYN - Acompanhe as últimas notícias e artigos sobre gestão, tecnologia e inovação';
  const DEFAULT_IMAGE = 'https://lovable.dev/opengraph-image-p98pqg.png';
  const DEFAULT_URL = 'https://nexsyn.com.br';

  // Safely process all inputs
  const title = safeString(propTitle, DEFAULT_TITLE);
  const description = safeString(propDescription, DEFAULT_DESCRIPTION);
  const image = getSafeUrl(propImage, DEFAULT_IMAGE);
  const url = getSafeUrl(
    propUrl,
    typeof window !== 'undefined' ? window.location.href : DEFAULT_URL
  );
  const article = propArticle || {};
  
  const siteTitle = title ? `${title} | NEXSYN` : 'NEXSYN Blog Explorer';
  
  // Create schema.org JSON-LD data
  const jsonLdData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebSite',
    headline: title || DEFAULT_TITLE,
    description: description || DEFAULT_DESCRIPTION,
    image: [image],
    url: url,
  };

  // Add article-specific properties
  if (type === 'article') {
    if (article.publishedTime) {
      jsonLdData.datePublished = safeString(article.publishedTime);
    }
    if (article.modifiedTime) {
      jsonLdData.dateModified = safeString(article.modifiedTime);
    }
    if (article.author) {
      jsonLdData.author = {
        '@type': 'Person',
        name: safeString(article.author, 'NEXSYN'),
      };
    }
  }
  
  // Safely render meta tags
  const renderMetaTags = () => {
    const tags: JSX.Element[] = [
      <title key="title">{siteTitle}</title>,
      <meta key="desc" name="description" content={description} />,
      
      // Open Graph / Facebook
      <meta key="og:type" property="og:type" content={type} />,
      <meta key="og:url" property="og:url" content={url} />,
      <meta key="og:title" property="og:title" content={siteTitle} />,
      <meta key="og:desc" property="og:description" content={description} />,
      <meta key="og:image" property="og:image" content={image} />,
      
      // Twitter
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />,
      <meta key="twitter:site" name="twitter:site" content="@nexsyn" />,
      <meta key="twitter:title" name="twitter:title" content={siteTitle} />,
      <meta key="twitter:desc" name="twitter:description" content={description} />,
      <meta key="twitter:image" name="twitter:image" content={image} />
    ];

    // Add article-specific meta tags
    if (type === 'article') {
      if (article.publishedTime) {
        tags.push(
          <meta 
            key="article:published_time" 
            property="article:published_time" 
            content={safeString(article.publishedTime)} 
          />
        );
      }
      
      if (article.modifiedTime) {
        tags.push(
          <meta 
            key="article:modified_time" 
            property="article:modified_time" 
            content={safeString(article.modifiedTime)} 
          />
        );
      }
      
      if (article.author) {
        tags.push(
          <meta 
            key="article:author" 
            property="article:author" 
            content={safeString(article.author, 'NEXSYN')} 
          />
        );
      }
      
      if (article.tags?.length) {
        article.tags.forEach((tag, index) => {
          const safeTag = safeString(tag);
          if (safeTag) {
            tags.push(
              <meta 
                key={`tag-${index}`} 
                property="article:tag" 
                content={safeTag} 
              />
            );
          }
        });
      }
    }
    
    return tags;
  };

  return (
    <Helmet>
      {renderMetaTags()}
      
      {/* Schema.org LD+JSON */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>
      
      {/* Analytics Integrations */}
      {analytics?.googleAnalytics && (
        <GoogleAnalytics measurementId={analytics.googleAnalytics} />
      )}
    </Helmet>
  );
};

export default SEO;
