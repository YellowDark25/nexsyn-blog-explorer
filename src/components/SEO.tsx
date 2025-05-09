
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
  // Ensure all inputs are strings
  const safeTitle = String(title || "");
  const safeDescription = String(description || "");
  const safeImage = String(image || "");
  const safeUrl = String(url || "");
  const safeType = String(type || "website");
  const siteTitle = safeTitle ? `${safeTitle} | NEXSYN` : "NEXSYN Blog Explorer";
  
  // Process article data safely
  const safeArticle = React.useMemo(() => {
    if (!article) return null;
    
    // Create safe tags array
    const safeTags: string[] = [];
    if (article.tags && Array.isArray(article.tags)) {
      for (const tag of article.tags) {
        if (tag) safeTags.push(String(tag));
      }
    }
    
    return {
      publishedTime: article.publishedTime ? String(article.publishedTime) : "",
      modifiedTime: article.modifiedTime ? String(article.modifiedTime) : "",
      author: article.author ? String(article.author) : "",
      tags: safeTags
    };
  }, [article]);
  
  // Create JSON-LD data object
  const jsonLdData = React.useMemo(() => {
    const data: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": safeType === 'article' ? 'Article' : 'WebSite',
      "headline": safeTitle,
      "description": safeDescription,
      "image": [safeImage],
      "url": safeUrl
    };
    
    if (safeType === 'article' && safeArticle) {
      if (safeArticle.publishedTime) {
        data.datePublished = safeArticle.publishedTime;
      }
      
      if (safeArticle.modifiedTime) {
        data.dateModified = safeArticle.modifiedTime;
      }
      
      if (safeArticle.author) {
        data.author = { "@type": "Person", "name": safeArticle.author };
      }
      
      if (safeArticle.tags.length > 0) {
        data.keywords = safeArticle.tags.join(',');
      }
    }
    
    return data;
  }, [safeTitle, safeDescription, safeImage, safeUrl, safeType, safeArticle]);

  // Convert JSON-LD to string safely
  const jsonLdString = React.useMemo(() => {
    try {
      return JSON.stringify(jsonLdData);
    } catch (error) {
      console.error("Error stringifying JSON-LD data:", error);
      return "{}";
    }
  }, [jsonLdData]);
  
  // Process analytics ID safely
  const safeGoogleAnalyticsId = analytics?.googleAnalytics ? String(analytics.googleAnalytics) : "";
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={safeDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={safeType} />
      <meta property="og:url" content={safeUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:image" content={safeImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nexsyn" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={safeImage} />
      
      {/* Article Specific Schema */}
      {safeArticle && (
        <>
          {safeArticle.publishedTime && <meta property="article:published_time" content={safeArticle.publishedTime} />}
          {safeArticle.modifiedTime && <meta property="article:modified_time" content={safeArticle.modifiedTime} />}
          {safeArticle.author && <meta property="article:author" content={safeArticle.author} />}
          {safeArticle.tags.map((tag, index) => (
            <meta key={`tag-${index}`} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Schema.org LD+JSON */}
      <script type="application/ld+json">{jsonLdString}</script>
      
      {/* Analytics Integration */}
      {safeGoogleAnalyticsId && (
        <GoogleAnalytics measurementId={safeGoogleAnalyticsId} />
      )}
    </Helmet>
  );
};

export default SEO;
