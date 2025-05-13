
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

// Define a proper type for the structured data
interface StructuredData {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  image: string[];
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    "@type": string;
    name: string;
  };
  publisher?: {
    "@type": string;
    name: string;
    logo?: {
      "@type": string;
      url: string;
    };
  };
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
  
  // Create a base structured data object with the proper type
  const baseData: StructuredData = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? 'Article' : 'WebSite',
    "headline": title,
    "description": description,
    "image": [image],
    "url": url
  };
  
  // Add article-specific fields if applicable
  if (type === 'article' && article) {
    if (article.publishedTime) baseData.datePublished = article.publishedTime;
    if (article.modifiedTime) baseData.dateModified = article.modifiedTime;
    if (article.author) {
      baseData.author = { 
        "@type": "Person", 
        "name": article.author 
      };
    }
  }
  
  // Merge with custom structured data if provided
  const jsonLdData = structuredData || baseData;

  // Function to deeply sanitize the JSON data and remove any non-serializable values
  const sanitizeJson = (obj: any): any => {
    if (obj === null || obj === undefined) {
      return null;
    }
    
    // Handle primitive types directly
    if (typeof obj !== 'object' && typeof obj !== 'function' && typeof obj !== 'symbol') {
      return obj;
    }
    
    if (typeof obj === 'function' || typeof obj === 'symbol') {
      return null; // Replace functions and symbols with null
    }
    
    // Handle arrays
    if (Array.isArray(obj)) {
      return obj
        .map(item => sanitizeJson(item))
        .filter(item => item !== null && item !== undefined);
    }
    
    // Handle objects
    const sanitized: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      if (
        value !== undefined && 
        value !== null &&
        typeof value !== 'function' &&
        typeof value !== 'symbol'
      ) {
        sanitized[key] = sanitizeJson(value);
      }
    }
    
    return sanitized;
  };
  
  // Sanitize the JSON data
  const sanitizedJsonLd = sanitizeJson(jsonLdData);

  // Create a stringified version safely
  let jsonLdString = '{}';
  try {
    jsonLdString = JSON.stringify(sanitizedJsonLd);
    // Double-check that it's valid
    JSON.parse(jsonLdString); 
  } catch (error) {
    console.error('Error processing structured data:', error);
    jsonLdString = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "NEXSYN",
      "url": "https://nexsyn.com.br"
    });
  }

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
      {article && article.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article && article.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article && article.author && (
        <meta property="article:author" content={article.author} />
      )}
      {article && article.tags && article.tags.map((tag, index) => (
        <meta key={`tag-${index}`} property="article:tag" content={tag} />
      ))}
      
      {/* Schema.org LD+JSON - Using pre-sanitized and safely stringified JSON */}
      <script type="application/ld+json">{jsonLdString}</script>
      
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
