
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogSidebar from '../components/BlogSidebar';
import ScrollToTop from '../components/ScrollToTop';
import { getPosts, searchPosts } from '@/services/postService';
import { Post } from '@/types/Post';
import PostCard from '@/components/PostCard';
import { useToast } from '@/hooks/use-toast';
import { slugToReadable } from '@/utils/formatUtils';
import { Search } from 'lucide-react';

const BlogPage = () => {
  const { category } = useParams<{ category?: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  const postsPerPage = 6;
  const isSearchPage = location.pathname.includes('/blog/search');
  const searchTerm = isSearchPage ? new URLSearchParams(location.search).get('q') || '' : '';

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        if (isSearchPage) {
          const searchResults = await searchPosts(searchTerm);
          setPosts(searchResults);
          setHasMore(false); // Não implementamos paginação para resultados de pesquisa
        } else {
          // Use o slug da categoria diretamente para a filtragem
          const data = await getPosts(postsPerPage * page, category);
          setPosts(data);
          setHasMore(data.length === postsPerPage * page);
        }
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
  }, [category, page, toast, isSearchPage, searchTerm]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get('search-query') as string;
    
    if (!searchQuery?.trim()) {
      toast({
        title: 'Atenção',
        description: 'Digite algo para pesquisar',
        variant: 'default',
      });
      return;
    }
    
    navigate(`/blog/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const getCategoryTitle = () => {
    if (isSearchPage) return `Resultados para "${searchTerm}"`;
    if (!category) return "Blog";
    
    // Converter slug para formato legível
    return slugToReadable(category);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-poppins flex items-center gap-2">
            <img alt="Nexsyn Logo" className="h-7" src="/lovable-uploads/2413e882-78d7-43eb-8317-c8ec49076e7c.png" />
            {getCategoryTitle()}
          </h1>
          <p className="text-muted-foreground mt-2 font-sansation">
            Acompanhe as últimas notícias e artigos sobre gestão, tecnologia e inovação
          </p>
          
          {/* Searchbar para desktop */}
          <div className="hidden md:block mt-6">
            <form onSubmit={handleSearch} className="flex max-w-md">
              <input
                type="text"
                name="search-query"
                placeholder="Buscar no blog..."
                defaultValue={searchTerm}
                className="flex-1 bg-muted rounded-l-md border-y border-l border-border p-2 text-foreground"
              />
              <button type="submit" className="bg-primary hover:bg-primary/90 text-white rounded-r-md px-4 py-2">
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {loading && posts.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-card rounded-lg shadow-md h-80 animate-pulse">
                    <div className="h-48 bg-muted"></div>
                    <div className="p-5">
                      <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                      <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-muted rounded w-full mb-2"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
                
                {hasMore && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="px-6 py-3 bg-primary text-white rounded-md font-medium shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Carregando...
                        </div>
                      ) : (
                        'Carregar mais'
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-muted-foreground">
                  {isSearchPage 
                    ? `Nenhum artigo encontrado para "${searchTerm}".` 
                    : `Nenhum artigo encontrado ${category ? `para a categoria ${getCategoryTitle()}` : ''}.`
                  }
                </h3>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default BlogPage;
