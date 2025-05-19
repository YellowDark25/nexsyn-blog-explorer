
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getPostBySlug } from '@/services/postService';
import { Post } from '@/types/Post';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { slugToReadable } from '@/utils/formatUtils';

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        if (!slug) {
          navigate('/blog');
          return;
        }

        const postData = await getPostBySlug(slug);
        
        if (!postData) {
          toast({
            title: 'Erro',
            description: 'Artigo não encontrado.',
            variant: 'destructive',
          });
          navigate('/blog');
          return;
        }
        
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar o artigo. Por favor, tente novamente mais tarde.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, toast, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 max-w-2xl mb-4"></div>
            <div className="h-4 bg-muted rounded w-40 mb-8"></div>
            <div className="h-64 bg-muted rounded w-full mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const formattedDate = format(parseISO(post.data_publicacao), 'dd MMM yyyy', { locale: ptBR });
  const formattedCategory = slugToReadable(post.categoria);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Post Header */}
        <div className="relative h-[300px] md:h-[400px] w-full bg-nexsyn-darkBlue overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10"
            aria-hidden="true"
          />
          
          <img 
            src={post.imagem_destaque} 
            alt={post.titulo}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          
          <div className="container mx-auto px-4 h-full flex items-center relative z-20">
            <div className="max-w-3xl">
              <div className="flex items-center text-white/80 mb-3 text-sm">
                <span>{formattedDate}</span>
                <span className="mx-2">•</span>
                <span>{formattedCategory}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-poppins">
                {post.titulo}
              </h1>
            </div>
          </div>
        </div>
        
        {/* Post Content */}
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-8">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Voltar para o blog
            </Link>
            
            <div 
              className="prose prose-lg max-w-none font-sansation"
              dangerouslySetInnerHTML={{ __html: post.conteudo }} 
            />
            
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">Categoria:</span>
                  <Link 
                    to={`/blog/${post.categoria}`}
                    className="ml-2 text-primary hover:underline"
                  >
                    {formattedCategory}
                  </Link>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <Button asChild variant="outline">
                    <Link to="/blog">
                      Ver todos os artigos
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostDetail;
