
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import BlogSidebar from '../components/BlogSidebar';
import ScrollToTop from '../components/ScrollToTop';
import PaginationControls from '../components/PaginationControls';
import { mockPosts } from '../data/mockPosts';
import { Post } from '../types/Post';
import SEO from '@/components/SEO';

const POSTS_PER_PAGE = 6; // Updated to match the standard across the site

const Index = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(mockPosts);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Filter posts by category if category param exists
  useEffect(() => {
    if (category) {
      const filtered = mockPosts.filter(post => 
        post.categoria.toLowerCase().replace(/\s+/g, '-') === category
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(mockPosts);
    }
  }, [category]);
  
  // Update displayed posts when filteredPosts or page changes
  useEffect(() => {
    setLoading(true);
    
    // Calculate pagination slice indexes
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedPosts(filteredPosts.slice(startIndex, endIndex));
      setLoading(false);
    }, 500);
    
  }, [filteredPosts, currentPage]);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // Handle page change
  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryTitle = () => {
    if (!category) return "Blog";
    
    // Convert kebab-case to Title Case
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title={getCategoryTitle()} 
        description={`NEXSYN ${getCategoryTitle()} - Artigos sobre gestão empresarial e tecnologia`}
      />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {getCategoryTitle()} <span className="text-primary">NEXSYN</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe as últimas notícias e artigos sobre gestão, tecnologia e inovação
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Posts - 2 columns on desktop, 1 on mobile */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(POSTS_PER_PAGE)].map((_, index) => (
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
            ) : displayedPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayedPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
                
                {filteredPosts.length > POSTS_PER_PAGE && (
                  <PaginationControls 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-muted-foreground">
                  Nenhum artigo encontrado para esta categoria.
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

export default Index;
