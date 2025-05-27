import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Importar configuração do Supabase
import { supabase } from '../src/integrations/supabase/client';

async function generateSitemap() {
  try {
    // Buscar posts publicados
    console.log('Buscando posts do banco de dados...');
    const { data: posts, error } = await supabase
      .from('posts_blog')
      .select('*')
      .eq('status', 'publicado')
      .order('data_publicacao', { ascending: false });

    if (error) {
      console.error('Erro ao buscar posts:', error);
      throw error;
    }
    
    console.log(`Encontrados ${posts?.length || 0} posts publicados`);

    // Iniciar o sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

    // URL base do site
    const baseUrl = 'https://blog.nexsyn.com.br';

    // Adicionar a página inicial
    sitemap += `  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

    // Adicionar cada post
    posts?.forEach(post => {
      const lastmod = new Date(post.data_publicacao).toISOString();
      const url = `${baseUrl}/blog/${post.slug}`;
      
      sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    });

    // Fechar a tag do urlset
    sitemap += '</urlset>';

    // Caminho para salvar o sitemap
    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
    
    // Escrever o arquivo
    writeFileSync(sitemapPath, sitemap);
    
    console.log(`✅ Sitemap gerado com sucesso em: ${sitemapPath}`);
    console.log(`📊 Total de URLs incluídas: ${(posts?.length || 0) + 1}`);
    
  } catch (error) {
    console.error('❌ Erro ao gerar o sitemap:', error);
    process.exit(1);
  }
}

// Executar a geração do sitemap
generateSitemap();
