
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
  
  // Ensure all tags are valid strings
  let safeTags: string[] = [];
  if (article?.tags && Array.isArray(article.tags)) {
    safeTags = article.tags
      .filter(tag => typeof tag === 'string')
      .map(tag => String(tag));
  }

  // Sanitize all article data to ensure no Symbol values exist
  const safeArticle = article ? {
    publishedTime: article.publishedTime ? String(article.publishedTime) : undefined,
    modifiedTime: article.modifiedTime ? String(article.modifiedTime) : undefined,
    author: article.author ? String(article.author) : undefined,
    tags: safeTags
  } : undefined;
  
  // Create a sanitized object for LD+JSON that doesn't contain Symbol values
  const jsonLdData: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? 'Article' : 'WebSite',
    "headline": String(title),
    "description": String(description),
    "image": [String(image)],
    "url": String(url)
  };
  
  // Add article properties only if they exist and are not symbols
  if (type === 'article' && safeArticle) {
    if (safeArticle.publishedTime) {
      jsonLdData.datePublished = safeArticle.publishedTime;
    }
    if (safeArticle.modifiedTime) {
      jsonLdData.dateModified = safeArticle.modifiedTime;
    }
    if (safeArticle.author) {
      jsonLdData.author = { "@type": "Person", "name": safeArticle.author };
    }
    if (safeTags.length > 0) {
      jsonLdData.keywords = safeTags.join(',');
    }
  }
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={String(description)} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={String(type)} />
      <meta property="og:url" content={String(url)} />
      <meta property="og:title" content={String(siteTitle)} />
      <meta property="og:description" content={String(description)} />
      <meta property="og:image" content={String(image)} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nexsyn" />
      <meta name="twitter:title" content={String(siteTitle)} />
      <meta name="twitter:description" content={String(description)} />
      <meta name="twitter:image" content={String(image)} />
      
      {/* Article Specific Schema (if applicable) */}
      {safeArticle && (
        <>
          {safeArticle.publishedTime && <meta property="article:published_time" content={safeArticle.publishedTime} />}
          {safeArticle.modifiedTime && <meta property="article:modified_time" content={safeArticle.modifiedTime} />}
          {safeArticle.author && <meta property="article:author" content={safeArticle.author} />}
          {safeTags.map((tag, index) => (
            <meta key={`tag-${index}`} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Schema.org LD+JSON - Using safe JSON conversion */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>
      
      {/* Analytics Integrations */}
      {analytics?.googleAnalytics && (
        <GoogleAnalytics measurementId={String(analytics.googleAnalytics)} />
      )}
    </Helmet>
  );
};

export default SEO;
