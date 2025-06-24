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
  
  // Create comprehensive schema.org JSON-LD data for better sitelinks
  const createSchemaData = () => {
    const schemas = [];

    // Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'NEXSYN',
      url: 'https://nexsyn.com.br',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nexsyn.com.br/nexsyn-logo.png'
      },
      sameAs: [
        'https://www.facebook.com/nexsyn',
        'https://www.linkedin.com/company/nexsyn',
        'https://www.instagram.com/nexsyn'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+55-11-99999-9999',
        contactType: 'customer service',
        availableLanguage: 'Portuguese'
      },
      description: 'Especialista em soluções de gestão empresarial, sistemas ERP e tecnologia para restaurantes e food service'
    };

    // Website Schema with potential sitelinks
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'NEXSYN',
      alternateName: 'Blog da NEXSYN',
      url: 'https://blog.nexsyn.com.br',
      description: description,
      publisher: {
        '@type': 'Organization',
        name: 'NEXSYN',
        logo: {
          '@type': 'ImageObject',
          url: 'https://blog.nexsyn.com.br/nexsyn-logo.png'
        }
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://blog.nexsyn.com.br/blog/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: 7,
        itemListElement: [
          {
            '@type': 'SiteNavigationElement',
            '@id': 'https://blog.nexsyn.com.br/#blog',
            name: 'Blog da Nexsyn',
            description: 'Acompanhe as últimas notícias e artigos sobre gestão, tecnologia e inovação',
            url: 'https://blog.nexsyn.com.br/blog'
          },
          {
            '@type': 'SiteNavigationElement',
            '@id': 'https://blog.nexsyn.com.br/#gestao-interna',
            name: 'Gestão Interna',
            description: 'Artigos sobre gestão interna, processos empresariais e melhores práticas',
            url: 'https://blog.nexsyn.com.br/blog/gestao-interna'
          },
          {
            '@type': 'SiteNavigationElement',
            '@id': 'https://blog.nexsyn.com.br/#foodservice',
            name: 'Foodservice',
            description: 'Soluções e tendências para o setor de alimentação e restaurantes',
            url: 'https://blog.nexsyn.com.br/blog/foodservice'
          },
          {
            '@type': 'SiteNavigationElement',
            '@id': 'https://blog.nexsyn.com.br/#tecnologia',
            name: 'Tecnologia',
            description: 'Inovações tecnológicas e transformação digital',
            url: 'https://blog.nexsyn.com.br/blog/tecnologia'
          },
          {
            '@type': 'SiteNavigationElement',
            '@id': 'https://blog.nexsyn.com.br/#inteligencia-artificial',
            name: 'Inteligência Artificial',
            description: 'Tendências e aplicações de IA nos negócios',
            url: 'https://blog.nexsyn.com.br/blog/inteligencia-artificial'
          },
          {
            '@type': 'SiteNavigationElement',
            '@id': 'https://blog.nexsyn.com.br/#empresas-alimenticias',
            name: 'Empresas Alimentícias',
            description: 'Estratégias e soluções para empresas do setor alimentício',
            url: 'https://blog.nexsyn.com.br/blog/empresas-alimenticias'
          },
          {
            '@type': 'SiteNavigationElement',
            '@id': 'https://blog.nexsyn.com.br/#busca',
            name: 'Buscar',
            description: 'Busque por artigos e conteúdos no blog',
            url: 'https://blog.nexsyn.com.br/blog/search'
          }
        ]
      }
    };

    schemas.push(organizationSchema, websiteSchema);

    // Add article schema if it's an article page
    if (type === 'article') {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: [image],
        datePublished: article.publishedTime || new Date().toISOString(),
        dateModified: article.modifiedTime || new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: safeString(article.author, 'NEXSYN Team'),
          url: 'https://nexsyn.com.br'
        },
        publisher: {
          '@type': 'Organization',
          name: 'NEXSYN',
          logo: {
            '@type': 'ImageObject',
            url: 'https://nexsyn.com.br/nexsyn-logo.png'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url
        }
      };

      if (article.tags?.length) {
        articleSchema.keywords = article.tags.map(tag => safeString(tag)).filter(Boolean);
      }

      schemas.push(articleSchema);
    }

    return schemas;
  };

  const schemaData = createSchemaData();
  
  // Safely render meta tags
  const renderMetaTags = () => {
    const tags: JSX.Element[] = [
      <title key="title">{siteTitle}</title>,
      <meta key="desc" name="description" content={description} />,
      
      // Additional SEO meta tags for better indexing
      <meta key="robots" name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />,
      <meta key="googlebot" name="googlebot" content="index, follow" />,
      <link key="canonical" rel="canonical" href={url} />,
      
      // Open Graph / Facebook
      <meta key="og:type" property="og:type" content={type} />,
      <meta key="og:url" property="og:url" content={url} />,
      <meta key="og:title" property="og:title" content={siteTitle} />,
      <meta key="og:desc" property="og:description" content={description} />,
      <meta key="og:image" property="og:image" content={image} />,
      <meta key="og:site_name" property="og:site_name" content="NEXSYN" />,
      <meta key="og:locale" property="og:locale" content="pt_BR" />,
      
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
      
      {/* Multiple Schema.org LD+JSON structures */}
      {schemaData.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
      
      {/* Analytics Integrations */}
      {analytics?.googleAnalytics && (
        <GoogleAnalytics measurementId={analytics.googleAnalytics} />
      )}
    </Helmet>
  );
};

export default SEO;
