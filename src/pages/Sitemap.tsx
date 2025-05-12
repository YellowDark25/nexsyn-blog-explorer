
import React, { useEffect } from 'react';
import { generateSitemap } from '@/services/sitemapService';

/**
 * Este componente gera um sitemap dinâmico baseado nos posts e categorias do blog
 * Ele deve ser acessado através da URL /sitemap.xml
 */
const Sitemap = () => {
  useEffect(() => {
    // Generate and serve the sitemap
    async function serveSitemap() {
      try {
        // Generate the sitemap XML
        const sitemap = await generateSitemap();
        
        // Create a blob with the XML
        const blob = new Blob([sitemap], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        // Redirect browser to the sitemap XML
        window.location.href = url;
      } catch (error) {
        console.error('Error serving sitemap:', error);
      }
    }
    
    serveSitemap();
  }, []);

  return (
    <div className="container mx-auto py-16 text-center">
      <p>Gerando sitemap...</p>
    </div>
  );
};

export default Sitemap;
