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
import { ChevronLeft } from 'lucide-react';
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
      
      <main className="container mx-auto px-4 py-8 md:py-12 lg:max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-3/4">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar ao blog
            </Link>
            
            <h1 className="text-2xl xs:text-3xl md:text-4xl lg:text-[2.5rem] font-bold mb-3 sm:mb-4 leading-tight">
              {post.titulo}
            </h1>
            
            <div className="flex flex-wrap items-center text-xs xs:text-sm text-muted-foreground mb-4 sm:mb-6 gap-1.5">
              <span>{formatDate(post.data_publicacao)}</span>
              <span className="hidden xs:inline">•</span>
              <span className="hidden xs:inline">5 min de leitura</span>
              <span className="hidden xs:inline">•</span>
              <span className="inline-block bg-muted/50 px-2 py-0.5 rounded-full text-xs">
                <Link 
                  to={`/blog/${post.categoria}`} 
                  className="hover:text-primary hover:underline whitespace-nowrap"
                >
                  {post.categoria}
                </Link>
              </span>
            </div>
            
            <div className="mb-6 sm:mb-8 overflow-hidden rounded-lg">
              <img 
                src={post.imagem_destaque} 
                alt={post.titulo}
                className="w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[500px] object-cover"
                loading="lazy"
              />
            </div>
            
            <div 
              className="prose prose-sm sm:prose-base max-w-none text-foreground/90"
              dangerouslySetInnerHTML={{ __html: post.conteudo }}
            />
            
            {/* Author Section */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Sobre o autor</h3>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img 
                    src="/lovable-uploads/Kleverson-CUbTOqrG.png" 
                    alt="Kleverson Silva Jara"
                    className="h-16 w-16 rounded-full object-cover border-2 border-primary/20"
                    onError={(e) => {
                      // Fallback image if the main image fails to load
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Kleverson+Jara&background=random';
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Kleverson Silva Jara</h4>
                  <p className="text-muted-foreground text-sm mb-2">Especialista em Tecnologia e Inovação</p>
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
