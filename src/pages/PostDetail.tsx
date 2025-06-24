import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RelatedPostsSidebar from '@/components/RelatedPostsSidebar';
import ScrollToTop from '@/components/ScrollToTop';
import { getPostBySlug, getPosts } from '@/services/postService';
import { Post } from '@/types/Post';
import { formatDate } from '@/utils/formatUtils';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, Calendar, Clock } from 'lucide-react';
import SEO from '@/components/SEO';

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper function to fetch related posts
  const fetchRelatedPosts = async (category: string, excludeSlug: string) => {
    try {
      const { posts } = await getPosts(1, 4, category);
      // Filter out the current post and limit to 3 related posts
      return posts.filter(post => post.slug !== excludeSlug).slice(0, 3);
    } catch (error) {
      console.error('Error fetching related posts:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchPostAndRelated = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      try {
        // Fetch the main post
        const postData = await getPostBySlug(slug);
        if (!postData) return;
        
        setPost(postData);
        
        // Fetch related posts from the same category
        if (postData.categoria) {
          const related = await fetchRelatedPosts(postData.categoria, slug);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostAndRelated();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-2/3 mb-4" />
          <Skeleton className="h-6 w-1/3 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="flex flex-col space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Post não encontrado</h1>
          <p className="mb-8">O artigo que você está procurando não existe ou foi removido.</p>
          <Link to="/blog" className="text-primary hover:underline">
            Voltar para o blog
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO 
        title={post.titulo}
        description={post.resumo}
        image={post.imagem_destaque}
        type="article"
        article={{
          publishedTime: post.data_publicacao,
          modifiedTime: post.data_publicacao,
          author: "NEXSYN",
          tags: [post.categoria]
        }}
      />
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 md:py-12 lg:max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="lg:w-3/4">
            <div className="mb-6 sm:mb-8">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group mb-6"
              >
                <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
                Voltar ao blog
              </Link>
              
              <div className="mb-4">
                <Link 
                  to={`/blog/${post.categoria}`} 
                  className="inline-flex items-center text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1 rounded-full transition-colors mb-4"
                >
                  {post.categoria}
                </Link>
              </div>
              
              <h1 className="text-3xl xs:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4 text-foreground">
                {post.titulo}
              </h1>
              
              <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-3">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5 text-primary/80" />
                  {formatDate(post.data_publicacao)}
                </span>
                <span className="text-muted-foreground/30">•</span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1.5 text-primary/80" />
                  5 min de leitura
                </span>
              </div>
            </div>
            
            <div className="mb-8 sm:mb-10 overflow-hidden rounded-xl shadow-lg relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <img 
                src={post.imagem_destaque} 
                alt={post.titulo}
                className="w-full h-auto max-h-[400px] sm:max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            
            <div className="prose prose-sm sm:prose-base max-w-none text-foreground/90 prose-headings:font-poppins prose-headings:font-bold prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-p:leading-relaxed prose-p:mb-4 prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-li:mb-2 prose-a:text-primary hover:prose-a:underline prose-strong:font-semibold prose-strong:text-foreground prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:my-6 prose-blockquote:bg-muted/20 prose-blockquote:rounded-r-lg">
              <div dangerouslySetInnerHTML={{ __html: post.conteudo }} />
            </div>
            
            {/* Author Section */}
            <div className="mt-16 pt-8 border-t border-border/20">
              <h3 className="text-xl font-bold mb-6 font-poppins">Sobre o autor</h3>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-muted/30 p-6 rounded-xl">
                <div className="flex-shrink-0">
                  <img 
                    src="/lovable-uploads/Kleverson-CUbTOqrG.png" 
                    alt="Kleverson Silva Jara"
                    className="h-20 w-20 rounded-full object-cover border-2 border-primary/30 shadow-md"
                    onError={(e) => {
                      // Fallback image if the main image fails to load
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Kleverson+Jara&background=random';
                    }}
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-lg font-bold text-foreground">Kleverson Silva Jara</h4>
                  <p className="text-muted-foreground mb-3">Especialista em Tecnologia e Inovação</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/4">
            <RelatedPostsSidebar 
              category={post.categoria}
              relatedPosts={relatedPosts}
            />
          </div>
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default PostDetail;
