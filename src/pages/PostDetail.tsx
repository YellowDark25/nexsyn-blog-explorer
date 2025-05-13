
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RelatedPostsSidebar from '@/components/RelatedPostsSidebar';
import ScrollToTop from '@/components/ScrollToTop';
import { getPostBySlug } from '@/services/postService';
import { generateArticleSchema } from '@/services/sitemapService'; 
import { Post } from '@/types/Post';
import { formatDate } from '@/utils/formatUtils';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import SEO from '@/components/SEO';
import { useAnalytics } from '@/hooks/use-analytics';

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [readingTime, setReadingTime] = useState<number>(5); // Default 5 min
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

  // Se ainda estiver carregando, mostramos o esqueleto
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <Skeleton className="h-6 w-40 mb-4" />
              <Skeleton className="h-12 w-full mb-3" />
              <Skeleton className="h-5 w-56 mb-8" />
              <Skeleton className="h-64 w-full mb-8" />
              <div className="flex flex-col space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/3">
              <Skeleton className="h-10 w-full mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
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

  // Generate structured data for this article
  const articleSchema = generateArticleSchema(post);
  
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
        structuredData={articleSchema}
      />
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 md:py-12 lg:max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar ao blog
            </Link>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.titulo}</h1>
            
            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <span>{formatDate(post.data_publicacao)}</span>
              <span className="mx-2">•</span>
              <span>{readingTime} min de leitura</span>
              <span className="mx-2">•</span>
              <span>
                <Link 
                  to={`/blog/${post.categoria}`} 
                  className="hover:text-primary hover:underline"
                >
                  {post.categoria}
                </Link>
              </span>
            </div>
            
            <div className="mb-8">
              <OptimizedImage 
                src={post.imagem_destaque} 
                alt={post.titulo}
                className="w-full h-auto rounded-lg object-cover"
                placeholderClassName="h-[300px] md:h-[400px] lg:h-[500px]"
                style={{ maxHeight: "500px" }}
              />
            </div>
            
            <div className="prose prose-lg max-w-none"
                 dangerouslySetInnerHTML={{ __html: post.conteudo }}
            />
            
            <div className="flex items-center mt-8 pt-6 border-t border-border">
              <div className="mr-4">
                <img 
                  src="/lovable-uploads/2413e882-78d7-43eb-8317-c8ec49076e7c.png" 
                  alt="NEXSYN"
                  className="h-12 w-12 rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">NEXSYN</p>
                <p className="text-sm text-muted-foreground">Equipe NEXSYN</p>
              </div>
            </div>
          </div>
          
          <RelatedPostsSidebar 
            category={post.categoria}
            currentPostSlug={post.slug}
            relatedPosts={[]} // We'll update this later
          />
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default PostDetail;
