
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
}

const SEO: React.FC<SEOProps> = ({
  title = "NEXSYN Blog Explorer",
  description = "Blog NEXSYN - Acompanhe as últimas notícias e artigos sobre gestão, tecnologia e inovação",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = typeof window !== 'undefined' ? window.location.href : 'https://nexsyn.com.br',
  type = "website",
  article,
  analytics
}) => {
  const siteTitle = title ? `${title} | NEXSYN` : "NEXSYN Blog Explorer";
  
  // Create a sanitized object for LD+JSON that won't contain any Symbol values
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? 'Article' : 'WebSite',
    "headline": title,
    "description": description,
    "image": [image],
    "url": url
  };
  
  // Only add article properties if they exist and are not symbols
  if (type === 'article' && article) {
    if (article.publishedTime) {
      jsonLdData["datePublished"] = article.publishedTime;
    }
    if (article.modifiedTime) {
      jsonLdData["dateModified"] = article.modifiedTime;
    }
    if (article.author) {
      jsonLdData["author"] = { "@type": "Person", "name": article.author };
    }
  }
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
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
      
      {/* Schema.org LD+JSON - Manually stringifying with care */}
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
