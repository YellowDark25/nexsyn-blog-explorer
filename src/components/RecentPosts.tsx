
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
        const data = await getPosts(limit, category);
        setPosts(data);
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
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 font-poppins">
          {category ? category.toUpperCase() : "ARTIGOS RECENTES"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="bg-card rounded-lg shadow-md h-80 animate-pulse">
              <div className="h-48 bg-muted"></div>
              <div className="p-5">
                <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 font-poppins">
        {category ? category.toUpperCase() : "ARTIGOS RECENTES"}
      </h2>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg font-sansation">
            Nenhum artigo encontrado {category ? `na categoria ${category}` : ''}.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/blog">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
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
