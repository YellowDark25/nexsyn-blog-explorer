import { writeFileSync } from 'fs';
import { join } from 'path';
import { robotsConfig } from '../src/config/robots.config';

// Função para gerar o conteúdo do robots.txt
function generateRobotsTxt() {
  let content = '';

  // Adiciona as configurações padrão
  content += `# Configurações para todos os user-agents\n`;
  content += `User-agent: ${robotsConfig.default.userAgent}\n`;
  robotsConfig.default.disallow.forEach(path => {
    content += `Disallow: ${path}\n`;
  });
  content += `Sitemap: ${robotsConfig.default.sitemap}\n\n`;

  // Adiciona configurações específicas para o Googlebot
  content += `# Configurações específicas para Googlebot\n`;
  content += `User-agent: ${robotsConfig.googlebot.userAgent}\n`;
  robotsConfig.googlebot.disallow.forEach(path => {
    content += `Disallow: ${path}\n`;
  });
  content += `Sitemap: ${robotsConfig.googlebot.sitemap}\n\n`;

  // Adiciona configurações específicas para o Bingbot
  content += `# Configurações específicas para Bingbot\n`;
  content += `User-agent: ${robotsConfig.bingbot.userAgent}\n`;
  robotsConfig.bingbot.disallow.forEach(path => {
    content += `Disallow: ${path}\n`;
  });
  content += `Sitemap: ${robotsConfig.bingbot.sitemap}\n`;

  return content;
}

// Caminho para o arquivo robots.txt
const robotsTxtPath = join(process.cwd(), 'public', 'robots.txt');

// Gera e salva o arquivo robots.txt
const robotsTxtContent = generateRobotsTxt();
writeFileSync(robotsTxtPath, robotsTxtContent, 'utf8');

console.log('Arquivo robots.txt gerado com sucesso!');
