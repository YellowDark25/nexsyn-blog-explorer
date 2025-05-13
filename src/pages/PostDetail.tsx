
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RelatedPostsSidebar from '@/components/RelatedPostsSidebar';
import ScrollToTop from '@/components/ScrollToTop';
import PostDetailSkeleton from '@/components/posts/PostDetailSkeleton';
import PostNotFound from '@/components/posts/PostNotFound';
import PostContent from '@/components/posts/PostContent';
import SEO from '@/components/SEO';
import { usePost } from '@/hooks/use-post';

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, isLoading, readingTime, articleSchema } = usePost(slug);

  // Se ainda estiver carregando, mostramos o esqueleto
  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  if (!post) {
    return <PostNotFound />;
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
        structuredData={articleSchema}
      />
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 md:py-12 lg:max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <PostContent post={post} readingTime={readingTime} />
          
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
