
import { useState, useEffect } from 'react';
import { Post } from '@/types/Post';
import { getPostBySlug } from '@/services/postService';
import { useAnalytics } from './use-analytics';

export function usePost(slug: string | undefined) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const analytics = useAnalytics();

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        setIsLoading(true);
        try {
          const postData = await getPostBySlug(slug);
          setPost(postData);
          
          // Track post view
          if (postData) {
            analytics.trackPostView(postData.id, postData.titulo);
          }
        } catch (error) {
          console.error("Error fetching post:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug, analytics]);

  return {
    post,
    isLoading
  };
}
