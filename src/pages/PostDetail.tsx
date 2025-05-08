import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RelatedPostsSidebar from '@/components/RelatedPostsSidebar';
import ScrollToTop from '@/components/ScrollToTop';
import { getPostBySlug } from '@/services/postService';
import { Post } from '@/types/Post';
import { formatDate } from '@/utils/formatUtils';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft } from 'lucide-react';
import SEO from '@/components/SEO';

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        setIsLoading(true);
        try {
          const postData = await getPostBySlug(slug);
          setPost(postData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching post:", error);
          setIsLoading(false);
        }
      }
    };

    fetchPost();
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
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        type="article"
        article={{
          publishedTime: post.publishedAt,
          modifiedTime: post.updatedAt,
          author: post.author.name,
          tags: post.categories.map(cat => cat.name)
        }}
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
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <span>{formatDate(post.publishedAt)}</span>
              <span className="mx-2">•</span>
              <span>{post.readingTime} min de leitura</span>
              {post.categories.length > 0 && (
                <>
                  <span className="mx-2">•</span>
                  <span>
                    {post.categories.map((category, index) => (
                      <span key={category.id}>
                        <Link 
                          to={`/blog/${category.slug}`} 
                          className="hover:text-primary hover:underline"
                        >
                          {category.name}
                        </Link>
                        {index < post.categories.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </span>
                </>
              )}
            </div>
            
            <div className="mb-8">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-auto rounded-lg object-cover"
                style={{ maxHeight: "500px" }}
              />
            </div>
            
            <div className="prose prose-lg max-w-none"
                 dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <div className="flex items-center mt-8 pt-6 border-t border-border">
              <div className="mr-4">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
          </div>
          
          <RelatedPostsSidebar 
            currentPostId={post.id}
            categories={post.categories.map(c => c.id)}
          />
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default PostDetail;
