
import { useState, useEffect } from 'react';
import { Post } from '@/types/Post';
import { getPostBySlug } from '@/services/postService';
import { generateArticleSchema } from '@/services/sitemapService';
import { useAnalytics } from '@/hooks/use-analytics';

interface UsePostResult {
  post: Post | null;
  isLoading: boolean;
  readingTime: number;
  articleSchema: any;
}

export function usePost(slug: string | undefined): UsePostResult {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [readingTime, setReadingTime] = useState<number>(5); // Default 5 min
  const [articleSchema, setArticleSchema] = useState<any>(null);
  const analytics = useAnalytics();

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        try {
          setIsLoading(true);
          const postData = await getPostBySlug(slug);
          
          if (postData) {
            setPost(postData);
            
            // Calculate reading time based on content length
            if (postData.conteudo) {
              // Average reading speed: 200 words per minute
              const wordCount = postData.conteudo.split(/\s+/).length;
              const calculatedTime = Math.ceil(wordCount / 200);
              setReadingTime(calculatedTime > 0 ? calculatedTime : 1);
            }
            
            // Generate structured data for this article
            const schema = generateArticleSchema(postData);
            setArticleSchema(schema);
            
            // Track page view for analytics
            analytics.trackPostView(postData.id, postData.titulo);
          }
          
          // Set loading to false after data is ready
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching post:", error);
          setIsLoading(false);
        }
      }
    };

    // Reset scroll position when navigating to a new post
    window.scrollTo(0, 0);
    fetchPost();
  }, [slug, analytics]);

  return {
    post,
    isLoading,
    readingTime,
    articleSchema
  };
}
