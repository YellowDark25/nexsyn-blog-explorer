
import React from 'react';
import { Helmet } from 'react-helmet';
import GoogleAnalytics from './integrations/GoogleAnalytics';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
  analytics?: {
    googleAnalytics?: string;
  };
  structuredData?: Record<string, any>;
  canonical?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = "NEXSYN Blog Explorer",
  description = "Blog NEXSYN - Acompanhe as últimas notícias e artigos sobre gestão, tecnologia e inovação",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = typeof window !== 'undefined' ? window.location.href : 'https://nexsyn.com.br',
  type = "website",
  article,
  analytics,
  structuredData,
  canonical,
  noindex = false,
}) => {
  const siteTitle = title ? `${title} | NEXSYN` : "NEXSYN Blog Explorer";
  
  // Create a sanitized JSON string for LD+JSON that doesn't contain any Symbol values
  const jsonLdData = structuredData || {
    "@context": "https://schema.org",
    "@type": type === 'article' ? 'Article' : 'WebSite',
    "headline": title,
    "description": description,
    "image": [image],
    "url": url,
    ...(type === 'article' && article ? {
      "datePublished": article.publishedTime,
      ...(article.modifiedTime ? { "dateModified": article.modifiedTime } : {}),
      ...(article.author ? { "author": { "@type": "Person", "name": article.author } } : {})
    } : {})
  };
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      
      {/* Canonical Link */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots Control */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="NEXSYN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nexsyn" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Article Specific Schema (if applicable) */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={`tag-${index}`} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Schema.org LD+JSON - Using JSON.stringify instead of template literals */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>
      
      {/* Preconnect to important domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.pexels.com" />
      
      {/* Analytics Integrations */}
      {analytics?.googleAnalytics && (
        <GoogleAnalytics measurementId={analytics.googleAnalytics} />
      )}
    </Helmet>
  );
};

export default SEO;
