import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuração do Supabase
const SUPABASE_URL = "https://enmmulxburptgmzsmeja.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVubW11bHhidXJwdGdtenNtZWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMTQ3NDMsImV4cCI6MjA1NjU5MDc0M30.Yqh1mAa1qCoIBgzKhRL5TAChLSE2Zjzu9A55BNbJlSA";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Interface para os dados do post
interface Post {
  slug: string;
  data_publicacao: string;
  data_atualizacao?: string;
  categoria?: string;
}

// Função para formatar a data no formato YYYY-MM-DD
const formatDate = (dateString: string): string => {
  if (!dateString) return new Date().toISOString().split('T')[0];
  return new Date(dateString).toISOString().split('T')[0];
};

// Função para gerar o sitemap
async function generateSitemap() {
  const baseUrl = 'https://blog.nexsyn.com.br';
  const pages = [
    { 
      url: '/', 
      lastmod: formatDate(new Date().toISOString()),
      changefreq: 'daily', 
      priority: '1.0' 
    },
    { 
      url: '/blog', 
      lastmod: formatDate(new Date().toISOString()),
      changefreq: 'daily', 
      priority: '0.9' 
    }
  ];

  try {
    // Buscar todas as categorias únicas
    const { data: categories, error: categoriesError } = await supabase
      .from('posts_blog')
      .select('categoria')
      .eq('status', 'publicado')
      .not('categoria', 'is', null);

    if (!categoriesError && categories) {
      // Adicionar URLs das categorias
      const uniqueCategories = [...new Set(categories.map(cat => String(cat.categoria)))];
      uniqueCategories.forEach(categoria => {
        if (categoria) {
          pages.push({
            url: `/blog/${categoria.toLowerCase().replace(/\s+/g, '-')}`,
            lastmod: formatDate(new Date().toISOString()),
            changefreq: 'weekly',
            priority: '0.8'
          });
        }
      });
    }

    // Buscar todas as postagens publicadas
    const { data: posts, error: postsError } = await supabase
      .from('posts_blog')
      .select('slug, data_publicacao, data_atualizacao')
      .eq('status', 'publicado')
      .order('data_publicacao', { ascending: false });

    if (!postsError && posts) {
      // Adicionar URLs das postagens
      (posts as Post[]).forEach(post => {
        pages.push({
          url: `/posts/${post.slug}`,
          lastmod: formatDate(post.data_atualizacao || post.data_publicacao),
          changefreq: 'weekly',
          priority: '0.8'
        });
      });
    }

    // Gerar o conteúdo do sitemap
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

    // Adicionar cada URL ao sitemap
    pages.forEach(page => {
      sitemapContent += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    });

    sitemapContent += '</urlset>';

    // Caminho para o arquivo sitemap.xml na pasta public
    const sitemapPath = join(__dirname, '..', 'public', 'sitemap.xml');
    
    // Escrever o arquivo
    writeFileSync(sitemapPath, sitemapContent);
    
    console.log(`Sitemap gerado com sucesso em: ${sitemapPath}`);
    console.log(`Total de URLs incluídas: ${pages.length}`);
    
  } catch (error) {
    console.error('Erro ao gerar o sitemap:', error);
    process.exit(1);
  }
}

// Executar a geração do sitemap
generateSitemap().catch(console.error);
