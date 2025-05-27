// Configurações para o arquivo robots.txt
export const robotsConfig = {
  // Configurações para todos os user-agents
  default: {
    userAgent: '*',
    // URLs que não devem ser rastreadas
    disallow: [
      '/src/',
      '/node_modules/',
      '/.git/',
      '/.vscode/',
      '/.idea/',
      '/dist/',
      '/build/',
      '/*.json',
      '/*.ts',
      '/*.tsx',
      '/*.js',
      '/*.map',
      '/*.css',
      '/*.map',
    ],
    // Sitemap
    sitemap: 'https://nexsyn.vercel.app/sitemap.xml',
  },
  // Configurações específicas para Googlebot
  googlebot: {
    userAgent: 'Googlebot',
    // URLs adicionais que o Google não deve rastrear
    disallow: [
      '/admin/',
      '/api/',
    ],
    // Sitemap
    sitemap: 'https://nexsyn.vercel.app/sitemap.xml',
  },
  // Configurações específicas para Bingbot
  bingbot: {
    userAgent: 'Bingbot',
    // URLs adicionais que o Bing não deve rastrear
    disallow: [
      '/admin/',
      '/api/',
    ],
    // Sitemap
    sitemap: 'https://nexsyn.vercel.app/sitemap.xml',
  },
};
