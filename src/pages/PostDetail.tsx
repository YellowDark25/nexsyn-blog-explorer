
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowLeft, Calendar, Tag, Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RelatedPostsSidebar from '@/components/RelatedPostsSidebar';
import { getPostBySlug, getPosts } from '@/services/postService';
import { Post } from '@/types/Post';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { slugToReadable } from '@/utils/formatUtils';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const articleRef = useRef<HTMLDivElement>(null);
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
        
        // Buscar posts relacionados
        const related = await getPosts(3, postData.categoria);
        setRelatedPosts(related.filter(p => p.id !== postData.id).slice(0, 2));
        
        // Set the document title for SEO
        document.title = `${postData.titulo} | Blog Nexsyn`;
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
    
    // Scroll to top when loading a new post
    window.scrollTo(0, 0);
  }, [slug, toast, navigate]);
  
  // Handle scroll and reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      
      const totalHeight = articleRef.current.clientHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      
      // Calculate how much of the article has been scrolled
      const scrolled = scrollTop / (totalHeight - windowHeight) * 100;
      setReadingProgress(Math.min(Math.max(scrolled, 0), 100));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Share functionality
  const handleShare = async () => {
    if (!post) return;
    
    const shareData = {
      title: post.titulo,
      text: post.resumo,
      url: window.location.href,
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support native sharing
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: 'Link copiado!',
          description: 'O link do artigo foi copiado para a área de transferência.',
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  // Função para copiar o link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({
      title: 'Link copiado!',
      description: 'O link do artigo foi copiado para a área de transferência.',
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Funções de compartilhamento para redes sociais
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };
  
  const shareOnTwitter = () => {
    if (!post) return;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.titulo)}`, '_blank');
  };
  
  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse max-w-3xl mx-auto">
            <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-40 mb-8"></div>
            <div className="h-64 bg-muted rounded w-full mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
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
      
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300 ease-out"
        style={{ width: `${readingProgress}%` }}
      ></div>
      
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
            loading="eager"
          />
          
          <div className="container mx-auto px-4 h-full flex items-center relative z-20">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center text-white/80 mb-3 text-sm gap-2">
                <span className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  {formattedDate}
                </span>
                <span className="hidden sm:inline mx-2">•</span>
                <Link to={`/blog/${post.categoria}`} className="flex items-center">
                  <Tag className="h-3.5 w-3.5 mr-1.5" />
                  <Badge variant="outline" className="px-2 py-0 text-xs bg-white/10 hover:bg-primary/20 transition-colors border-white/20">
                    {formattedCategory}
                  </Badge>
                </Link>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-poppins animate-fade-in">
                {post.titulo}
              </h1>
            </div>
          </div>
        </div>
        
        {/* Post Content with Sidebar */}
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="max-w-3xl">
                <div className="flex justify-between items-center mb-8">
                  <Link to="/blog" className="inline-flex items-center text-primary hover:underline group">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Voltar para o blog
                  </Link>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary"
                      >
                        <Share2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Compartilhar</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={shareOnFacebook} className="cursor-pointer">
                        <Facebook className="mr-2 h-4 w-4" />
                        <span>Facebook</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={shareOnTwitter} className="cursor-pointer">
                        <Twitter className="mr-2 h-4 w-4" />
                        <span>Twitter</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={shareOnLinkedIn} className="cursor-pointer">
                        <Linkedin className="mr-2 h-4 w-4" />
                        <span>LinkedIn</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
                        {copied ? (
                          <Check className="mr-2 h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="mr-2 h-4 w-4" />
                        )}
                        <span>Copiar link</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div 
                  ref={articleRef}
                  className="prose prose-lg max-w-none font-sansation prose-headings:font-poppins prose-img:rounded-lg prose-img:shadow-md"
                  dangerouslySetInnerHTML={{ __html: post.conteudo }} 
                />
                
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Categoria:</span>
                      <Link 
                        to={`/blog/${post.categoria}`}
                        className="ml-2 text-primary hover:underline"
                      >
                        {formattedCategory}
                      </Link>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button asChild variant="outline">
                        <Link to={`/blog/${post.categoria}`}>
                          Mais em {formattedCategory}
                        </Link>
                      </Button>
                      <Button asChild>
                        <Link to="/blog">
                          Ver todos os artigos
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <RelatedPostsSidebar 
                category={post.categoria} 
                currentPostSlug={post.slug}
                relatedPosts={relatedPosts}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostDetail;
