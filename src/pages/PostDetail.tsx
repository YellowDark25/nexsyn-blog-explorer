
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RelatedPostsSidebar from '@/components/RelatedPostsSidebar';
import ScrollToTop from '@/components/ScrollToTop';
import SEO from '@/components/SEO';
import CommentSection from '@/components/CommentSection';
import PostHeader from '@/components/post/PostHeader';
import PostImage from '@/components/post/PostImage';
import PostContent from '@/components/post/PostContent';
import PostAuthor from '@/components/post/PostAuthor';
import PostSkeleton from '@/components/post/PostSkeleton';
import PostNotFound from '@/components/post/PostNotFound';
import ShareSection from '@/components/share/ShareSection';
import { usePost } from '@/hooks/use-post';

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, isLoading } = usePost(slug);
  
  // Get current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (!post) {
    return <PostNotFound />;
  }

  // Create a safe tags array with simple string values - ensure no Symbol values get passed
  const safeTags = post?.categoria ? [String(post.categoria)] : [];

  return (
    <>
      <SEO 
        title={String(post.titulo)}
        description={String(post.resumo)}
        image={String(post.imagem_destaque)}
        type="article"
        article={{
          publishedTime: String(post.data_publicacao),
          modifiedTime: String(post.data_publicacao),
          author: "NEXSYN",
          tags: safeTags
        }}
      />
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 md:py-12 lg:max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <PostHeader post={post} />
            <PostImage src={post.imagem_destaque} alt={post.titulo} />
            
            {/* First instance of ShareSection - Positioned below featured image */}
            <ShareSection 
              title={post.titulo} 
              url={currentUrl} 
              postId={post.id} 
            />
            
            <PostContent content={post.conteudo} />
            
            {/* Second instance of ShareSection - Positioned below content with heading */}
            <ShareSection 
              title={post.titulo} 
              url={currentUrl} 
              postId={post.id}
              showHeading={true}
            />
            
            <PostAuthor />

            {/* Comment Section */}
            <CommentSection postId={post.id} />
          </div>
          
          <div className="lg:w-1/3">
            <RelatedPostsSidebar 
              category={post.categoria}
              currentPostSlug={post.slug}
              relatedPosts={[]} // We'll update this later
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
