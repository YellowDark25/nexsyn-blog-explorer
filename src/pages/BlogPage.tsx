
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogSidebar from '../components/BlogSidebar';
import ScrollToTop from '../components/ScrollToTop';
import { getPosts, searchPosts } from '@/services/postService';
import { Post } from '@/types/Post';
import PostCard from '@/components/PostCard';
import { useToast } from '@/hooks/use-toast';
import { slugToReadable } from '@/utils/formatUtils';
import { Search, BookOpen, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPage = () => {
  const { category } = useParams<{ category?: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  const postsPerPage = 6;
  const isSearchPage = location.pathname.includes('/blog/search');
  const searchTerm = isSearchPage ? new URLSearchParams(location.search).get('q') || '' : '';

  useEffect(() => {
    if (isSearchPage && searchTerm) {
      setSearchQuery(searchTerm);
    }
  }, [isSearchPage, searchTerm]);

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
        
        // Set document title for SEO
        document.title = category 
          ? `${slugToReadable(category)} | Blog Nexsyn`
          : isSearchPage
            ? `Resultados para "${searchTerm}" | Blog Nexsyn`
            : 'Blog | Nexsyn';
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
    
    // Scroll to top when changing category or search
    window.scrollTo(0, 0);
  }, [category, page, toast, isSearchPage, searchTerm]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
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
  
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  
  const focusSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
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
      
      <main className="flex-grow">
        {/* Hero section for blog */}
        <div className="bg-nexsyn-darkBlue py-10 border-b border-border/40">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-poppins mb-4 flex justify-center items-center gap-2">
                <BookOpen className="h-8 w-8 text-primary hidden sm:inline" />
                {getCategoryTitle()}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 font-sansation">
                {isSearchPage
                  ? `Encontramos ${posts.length} ${posts.length === 1 ? 'resultado' : 'resultados'} para sua busca.`
                  : category
                    ? `Artigos sobre ${getCategoryTitle()} para ajudar sua empresa a crescer.`
                    : 'Acompanhe as últimas notícias e artigos sobre gestão, tecnologia e inovação para empresas alimentícias.'}
              </p>
              
              {/* Search bar with animation */}
              <div className="max-w-md mx-auto relative group">
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    name="search-query"
                    placeholder="Buscar no blog..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    ref={searchInputRef}
                    className="flex-1 bg-muted rounded-l-md border-y border-l border-border p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90 text-white rounded-r-md px-4 py-2 transition-colors flex items-center gap-2"
                  >
                    <Search className="h-5 w-5" />
                    <span className="hidden sm:inline">Buscar</span>
                  </button>
                </form>
                <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary transform scale-x-0 group-focus-within:scale-x-100 transition-transform origin-center"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content area */}
        <div className="container mx-auto px-4 py-10">
          {/* Mobile filter toggle */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {posts.length > 0 ? (
                <span>{posts.length} {posts.length === 1 ? 'Artigo' : 'Artigos'}</span>
              ) : (
                <span>Nenhum artigo encontrado</span>
              )}
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleSidebar}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {loading && posts.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-card rounded-lg shadow-md h-80 animate-pulse">
                      <div className="h-48 bg-muted rounded-t-lg"></div>
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
                    <div className="flex justify-center mt-12">
                      <Button
                        onClick={handleLoadMore}
                        disabled={loading}
                        size="lg"
                        className="px-6 py-6 font-medium shadow-md transition-all hover:translate-y-[-2px]"
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
                          'Carregar mais artigos'
                        )}
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 bg-card rounded-lg border border-border/30 shadow-md">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">
                    {isSearchPage 
                      ? `Nenhum artigo encontrado para "${searchTerm}".` 
                      : `Nenhum artigo encontrado ${category ? `para a categoria ${getCategoryTitle()}` : ''}.`
                    }
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Tente usar termos diferentes ou navegue por outras categorias.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button 
                      variant="outline" 
                      onClick={focusSearchInput}
                    >
                      Tentar outra busca
                    </Button>
                    <Button asChild>
                      <Link to="/blog">Ver todos os artigos</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className={`lg:col-span-1 lg:block ${isSidebarVisible ? 'block' : 'hidden'}`}>
              <div className="lg:sticky lg:top-24">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default BlogPage;
