
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '@/services/postService';
import { Post } from '@/types/Post';
import PostCard from './PostCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 font-poppins">
            {category ? category.toUpperCase() : "Artigos Recentes"}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="bg-card rounded-xl h-full flex flex-col border border-border/20 animate-pulse overflow-hidden">
              <div className="aspect-video bg-muted/40"></div>
              <div className="p-5 sm:p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-3 bg-muted/40 rounded-full w-24"></div>
                  <div className="h-3 bg-muted/40 rounded-full w-16"></div>
                </div>
                <div className="h-5 bg-muted/40 rounded-lg w-4/5 mb-3"></div>
                <div className="space-y-2 mt-2 flex-grow">
                  <div className="h-3 bg-muted/40 rounded-full w-full"></div>
                  <div className="h-3 bg-muted/40 rounded-full w-5/6"></div>
                  <div className="h-3 bg-muted/40 rounded-full w-2/3"></div>
                </div>
                <div className="h-4 bg-muted/40 rounded-full w-1/3 mt-6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-28 bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div 
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Nosso Blog
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 font-poppins">
            {category ? category : "Artigos Recentes"}
          </h2>
          <p className="text-muted-foreground text-lg">
            Confira nossos artigos mais recentes sobre tecnologia, inovação e gestão empresarial.
          </p>
        </motion.div>
        
        {posts.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted-foreground text-base sm:text-lg font-sansation">
              Nenhum artigo encontrado {category ? `na categoria ${category}` : ''}.
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              {posts.map((post, index) => (
                <motion.div key={post.id} variants={item}>
                  <PostCard post={post} />
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/blog">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group border-primary/30 hover:border-primary/50 bg-background/50 backdrop-blur-sm hover:bg-primary/5 px-8 py-6 text-base font-medium transition-all duration-300"
                >
                  Ver Todos os Artigos
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default RecentPosts;
