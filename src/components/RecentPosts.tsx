
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '@/services/postService';
import { Post } from '@/types/Post';
import PostCard from './PostCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface RecentPostsProps {
  category?: string;
  limit?: number;
}

const RecentPosts: React.FC<RecentPostsProps> = ({ category, limit = 6 }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Always get page 1, with the specified limit
        const result = await getPosts(1, limit, category);
        setPosts(result.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os artigos. Por favor, tente novamente mais tarde.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, limit, toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 font-poppins">
          {category ? category.toUpperCase() : "ARTIGOS RECENTES"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="bg-card rounded-lg shadow-md h-full flex flex-col animate-pulse">
              <div className="aspect-video bg-muted rounded-t-lg"></div>
              <div className="p-4 sm:p-5 flex-grow flex flex-col">
                <div className="h-4 bg-muted rounded w-1/3 mb-3"></div>
                <div className="h-5 bg-muted rounded w-4/5 mb-3"></div>
                <div className="space-y-2 mt-2 flex-grow">
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-5/6"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
                <div className="h-4 bg-muted rounded w-1/2 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 font-poppins">
        {category ? category.toUpperCase() : "ARTIGOS RECENTES"}
      </h2>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-base sm:text-lg font-sansation">
            Nenhum artigo encontrado {category ? `na categoria ${category}` : ''}.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-10 sm:mt-12">
            <Link to="/blog">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary text-primary hover:bg-primary/10 text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12"
              >
                Ver Todos os Artigos
              </Button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default RecentPosts;
