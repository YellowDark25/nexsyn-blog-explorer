
import { supabase } from "@/integrations/supabase/client";
import { Post } from "@/types/Post";

export async function getPosts(limit = 6, category?: string) {
  try {
    let query = supabase
      .from('posts_blog')
      .select('*')
      .eq('status', 'publicado')
      .order('data_publicacao', { ascending: false })
      .limit(limit);
    
    if (category) {
      query = query.eq('categoria', category);
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

export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('posts_blog')
      .select('categoria')
      .eq('status', 'publicado')
      .order('categoria');
    
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    
    // Extract unique categories
    const categories = [...new Set(data.map(post => post.categoria))];
    return categories;
  } catch (error) {
    console.error('Error in getCategories:', error);
    return [];
  }
}
