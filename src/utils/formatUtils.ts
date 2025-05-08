
/**
 * Converte uma string em formato slug (ex: "gestao-interna") para formato legível (ex: "Gestão Interna")
 */
export function slugToReadable(slug: string): string {
  if (!slug) return '';
  
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Converte uma string legível (ex: "Gestão Interna") para formato slug (ex: "gestao-interna")
 */
export function readableToSlug(text: string): string {
  if (!text) return '';
  
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]/g, '');
}

/**
 * Formata uma data ISO para exibição no formato brasileiro (DD de Mês de YYYY)
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Formatação usando o método Intl.DateTimeFormat
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}
