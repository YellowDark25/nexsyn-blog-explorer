
import { getPosts, getCategories } from './postService';
import { Post } from '@/types/Post';

const BASE_URL = 'https://nexsyn.com.br';

// Define interface for URLs with lastmod
interface SitemapUrl {
  url: string;
  priority: number;
  changefreq: string;
  lastmod?: string; // Make lastmod optional
}

/**
 * Gera o conteúdo XML do sitemap dinâmicamente
 */
export async function generateSitemap(): Promise<string> {
  try {
    // Fetch all posts and categories for the sitemap
    const { posts } = await getPosts(1, 1000); // Get all posts with a big limit
    const categories = await getCategories();
    
    // Base URLs that are always included
    const staticUrls: SitemapUrl[] = [
      { url: '/', priority: 1.0, changefreq: 'weekly' },
      { url: '/blog', priority: 0.8, changefreq: 'daily' },
    ];
    
    // Add category URLs
    const categoryUrls: SitemapUrl[] = categories.map(category => ({
      url: `/blog/${category.slug}`,
      priority: 0.7,
      changefreq: 'weekly',
    }));
    
    // Add post URLs
    const postUrls: SitemapUrl[] = posts.map(post => ({
      url: `/posts/${post.slug}`,
      priority: 0.6,
      changefreq: 'monthly',
      lastmod: post.data_publicacao.split('T')[0], // Use post date as lastmod
    }));
    
    // Combine all URLs
    const allUrls: SitemapUrl[] = [...staticUrls, ...categoryUrls, ...postUrls];
    
    // XML Header
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add URL entries
    allUrls.forEach(entry => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${BASE_URL}${entry.url}</loc>\n`;
      if (entry.lastmod) {
        sitemap += `    <lastmod>${entry.lastmod}</lastmod>\n`;
      }
      sitemap += `    <changefreq>${entry.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${entry.priority}</priority>\n`;
      sitemap += '  </url>\n';
    });
    
    // XML Footer
    sitemap += '</urlset>';
    
    return sitemap;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>';
  }
}

/**
 * Gera dados estruturados do tipo Article para schema.org
 */
export function generateArticleSchema(post: Post) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.titulo,
    'description': post.resumo,
    'image': post.imagem_destaque,
    'datePublished': post.data_publicacao,
    'dateModified': post.data_publicacao,
    'author': {
      '@type': 'Organization',
      'name': 'NEXSYN',
      'url': 'https://nexsyn.com.br'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'NEXSYN',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://nexsyn.com.br/nexsyn-logo.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://nexsyn.com.br/posts/${post.slug}`
    }
  };

  return articleSchema;
}
