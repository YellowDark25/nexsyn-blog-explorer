
import { supabase } from "@/integrations/supabase/client";
import { Post } from "@/types/Post";
import { slugToReadable, readableToSlug } from "@/utils/formatUtils";

/**
 * Normaliza categoria para slug seguro
 * Ex: "Gestão Interna" → "gestao-interna"
 */
function normalizeCategorySlug(categoria?: string): string | undefined {
  if (!categoria) return undefined;
  
  return readableToSlug(categoria);
}

export async function getPosts(limit = 6, category?: string) {
  try {
    let query = supabase
      .from('posts_blog')
      .select('*')
      .eq('status', 'publicado')
      .order('data_publicacao', { ascending: false });
    
    if (category) {
      // Se a categoria for passada, procuramos por posts dessa categoria
      query = query.eq('categoria', category);
    }
    
    if (limit > 0) {
      query = query.limit(limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
    
    return data as Post[];
  } catch (error) {
    console.error('Error in getPosts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('posts_blog')
      .select('*')
      .eq('status', 'publicado')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching post by slug:', error);
      return null;
    }
    
    return data as Post;
  } catch (error) {
    console.error('Error in getPostBySlug:', error);
    return null;
  }
}

export interface CategoryWithCount {
  slug: string;
  name: string;
  count: number;
}

export async function getCategories(): Promise<CategoryWithCount[]> {
  try {
    // Obter posts publicados com suas categorias
    const { data, error } = await supabase
      .from('posts_blog')
      .select('categoria')
      .eq('status', 'publicado');
    
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    
    // Extrair categorias únicas e contar ocorrências
    const categoryCounts: Record<string, number> = {};
    data.forEach(post => {
      const categoria = post.categoria;
      categoryCounts[categoria] = (categoryCounts[categoria] || 0) + 1;
    });
    
    // Converter para o formato necessário
    const categories: CategoryWithCount[] = Object.entries(categoryCounts).map(
      ([slug, count]) => ({
        slug,
        name: slugToReadable(slug),
        count
      })
    );
    
    // Ordenar categorias por nome
    return categories.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error in getCategories:', error);
    return [];
  }
}

export async function searchPosts(searchTerm: string): Promise<Post[]> {
  try {
    if (!searchTerm || searchTerm.trim() === '') {
      return [];
    }
    
    const { data, error } = await supabase
      .from('posts_blog')
      .select('*')
      .eq('status', 'publicado')
      .or(`titulo.ilike.%${searchTerm}%,conteudo.ilike.%${searchTerm}%,resumo.ilike.%${searchTerm}%`)
      .order('data_publicacao', { ascending: false });
    
    if (error) {
      console.error('Error searching posts:', error);
      return [];
    }
    
    return data as Post[];
  } catch (error) {
    console.error('Error in searchPosts:', error);
    return [];
  }
}
