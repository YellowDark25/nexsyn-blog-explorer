
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

// Utility function to safely convert any value to string
const safeString = (value: any): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'symbol') return '';
  try {
    return String(value);
  } catch (e) {
    console.error('Error converting value to string:', e);
    return '';
  }
};

// Utility function to safely process tags array
const processTags = (tags: any[]): string[] => {
  if (!Array.isArray(tags)) return [];
  return tags
    .filter(tag => tag !== null && tag !== undefined && typeof tag !== 'symbol')
    .map(tag => safeString(tag))
    .filter(tag => tag !== '');
};

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
  const safeTitle = safeString(title);
  const safeDescription = safeString(description);
  const safeImage = safeString(image);
  const safeUrl = safeString(url);
  const safeType = safeString(type || "website");
  const siteTitle = safeTitle ? `${safeTitle} | NEXSYN` : "NEXSYN Blog Explorer";
  
  // Process article data safely
  const safeArticle = React.useMemo(() => {
    if (!article) return null;
    
    // Create safe tags array
    const safeTags: string[] = processTags(article.tags || []);
    
    return {
      publishedTime: safeString(article.publishedTime),
      modifiedTime: safeString(article.modifiedTime),
      author: safeString(article.author),
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
      
      if (safeArticle.tags && safeArticle.tags.length > 0) {
        data.keywords = safeArticle.tags.join(',');
      }
    }
    
    return data;
  }, [safeTitle, safeDescription, safeImage, safeUrl, safeType, safeArticle]);

  // Convert JSON-LD to string safely
  const jsonLdString = React.useMemo(() => {
    try {
      // Deep copy and sanitize the object to remove any Symbol values
      const sanitizedData = JSON.parse(JSON.stringify(jsonLdData, (key, value) => {
        if (typeof value === 'symbol') return undefined;
        return value;
      }));
      return JSON.stringify(sanitizedData);
    } catch (error) {
      console.error("Error stringifying JSON-LD data:", error);
      return "{}";
    }
  }, [jsonLdData]);
  
  // Process analytics ID safely
  const safeGoogleAnalyticsId = analytics?.googleAnalytics ? safeString(analytics.googleAnalytics) : "";

  // Prepare meta tags in a safe way
  const renderMetaTags = () => {
    const tags = [];
    
    // Basic tags
    tags.push(<title key="title">{siteTitle}</title>);
    tags.push(<meta key="description" name="description" content={safeDescription} />);
    
    // Open Graph / Facebook
    tags.push(<meta key="og:type" property="og:type" content={safeType} />);
    tags.push(<meta key="og:url" property="og:url" content={safeUrl} />);
    tags.push(<meta key="og:title" property="og:title" content={siteTitle} />);
    tags.push(<meta key="og:description" property="og:description" content={safeDescription} />);
    tags.push(<meta key="og:image" property="og:image" content={safeImage} />);
    
    // Twitter
    tags.push(<meta key="twitter:card" name="twitter:card" content="summary_large_image" />);
    tags.push(<meta key="twitter:site" name="twitter:site" content="@nexsyn" />);
    tags.push(<meta key="twitter:title" name="twitter:title" content={siteTitle} />);
    tags.push(<meta key="twitter:description" name="twitter:description" content={safeDescription} />);
    tags.push(<meta key="twitter:image" name="twitter:image" content={safeImage} />);
    
    // Article-specific meta tags
    if (safeArticle) {
      if (safeArticle.publishedTime) {
        tags.push(<meta key="article:published_time" property="article:published_time" content={safeArticle.publishedTime} />);
      }
      
      if (safeArticle.modifiedTime) {
        tags.push(<meta key="article:modified_time" property="article:modified_time" content={safeArticle.modifiedTime} />);
      }
      
      if (safeArticle.author) {
        tags.push(<meta key="article:author" property="article:author" content={safeArticle.author} />);
      }
      
      // Handle article tags
      if (safeArticle.tags && Array.isArray(safeArticle.tags)) {
        safeArticle.tags.forEach((tag, index) => {
          if (tag) {
            tags.push(<meta key={`tag-${index}`} property="article:tag" content={tag} />);
          }
        });
      }
    }
    
    // JSON-LD
    tags.push(<script key="jsonld" type="application/ld+json">{jsonLdString}</script>);
    
    return tags;
  };
  
  return (
    <Helmet>
      {renderMetaTags()}
      
      {/* Analytics Integration */}
      {safeGoogleAnalyticsId && (
        <GoogleAnalytics measurementId={safeGoogleAnalyticsId} />
      )}
    </Helmet>
  );
};

export default SEO;
