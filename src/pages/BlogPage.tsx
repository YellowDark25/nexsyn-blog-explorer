
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogSidebar from '@/components/BlogSidebar';
import PostCard from '@/components/PostCard';
import ScrollToTop from '@/components/ScrollToTop';
import { getPosts } from '@/services/postService';
import { Post } from '@/types/Post';
import { Separator } from '@/components/ui/separator';
import SEO from '@/components/SEO';
import { slugToReadable } from '@/utils/formatUtils';
import PaginationControls from '@/components/PaginationControls';
import { trackEvent } from '@/services/analyticsService';

const POSTS_PER_PAGE = 6;

const BlogPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  const pageParam = searchParams.get('page');
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(
    pageParam ? parseInt(pageParam, 10) : 1
  );
  
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  useEffect(() => {
    // Reset state when search or category changes
    setIsLoading(true);
    
    // Update page number from URL if it exists
    const pageFromUrl = pageParam ? parseInt(pageParam, 10) : 1;
    setCurrentPage(pageFromUrl);
    
    loadPosts(pageFromUrl, category, searchQuery || undefined);
  }, [category, searchQuery, pageParam]);
  
  const loadPosts = async (page: number, categorySlug?: string, search?: string) => {
    try {
      setIsLoading(true);
      const { posts: newPosts, total } = await getPosts(page, POSTS_PER_PAGE, categorySlug, search);
      
      setPosts(newPosts);
      setTotalPosts(total);
      setIsLoading(false);
      
      // Track page view in analytics
      trackEvent({
        type: 'page_view',
        category: 'blog',
        label: `Blog Page ${page}`,
        metadata: {
          category: categorySlug,
          search: search,
          page: page
        }
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      setIsLoading(false);
    }
  };
  
  const handlePageChange = (page: number) => {
    const searchParamsObj = new URLSearchParams(searchParams.toString());
    searchParamsObj.set('page', page.toString());
    
    // Update URL with new page number
    navigate({
      pathname: location.pathname,
      search: searchParamsObj.toString()
    });
  };
  
  // Generate page title based on context
  const getPageTitle = () => {
    if (searchQuery) return `Busca: ${searchQuery}`;
    if (category) {
      // Use the slugToReadable utility function
      return slugToReadable(category);
    }
    return 'Blog';
  };

  return (
    <>
      <SEO 
        title={getPageTitle()}
        description={searchQuery 
          ? `Resultados da busca para "${searchQuery}" no Blog NEXSYN` 
          : category 
            ? `Artigos sobre ${slugToReadable(category)} no Blog NEXSYN`
            : "Explore nossos artigos sobre gestão, tecnologia e inovação no Blog NEXSYN"
        }
      />
    
      <Navbar />
      
      <div className="bg-muted py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{getPageTitle()}</h1>
            
            {searchQuery ? (
              <p className="text-muted-foreground">
                Mostrando resultados para "{searchQuery}"
                {totalPosts > 0 && <span> ({totalPosts} {totalPosts === 1 ? 'resultado' : 'resultados'})</span>}
              </p>
            ) : category ? (
              <p className="text-muted-foreground">
                Artigos relacionados à categoria selecionada
              </p>
            ) : (
              <p className="text-muted-foreground">
                Explore nosso conteúdo sobre gestão, tecnologia e inovação
              </p>
            )}
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {isLoading ? (
              // Loading state
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(POSTS_PER_PAGE)].map((_, index) => (
                  <div 
                    key={index} 
                    className="border border-border rounded-lg p-4 h-80 animate-pulse"
                  >
                    <div className="bg-muted h-40 rounded-md mb-4"></div>
                    <div className="bg-muted h-6 w-3/4 rounded-md mb-2"></div>
                    <div className="bg-muted h-4 rounded-md mb-2"></div>
                    <div className="bg-muted h-4 w-1/2 rounded-md"></div>
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <div className="mt-10 flex justify-center">
                    <PaginationControls
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Nenhum resultado encontrado</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery 
                    ? `Não encontramos resultados para "${searchQuery}".`
                    : 'Não há artigos disponíveis nesta categoria.'}
                </p>
                <Link 
                  to="/blog"
                  className="text-primary hover:underline"
                >
                  Ver todos os artigos
                </Link>
              </div>
            )}
          </div>
          
          <div className="lg:w-1/3">
            <BlogSidebar />
          </div>
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default BlogPage;
