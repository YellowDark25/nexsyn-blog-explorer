
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import BlogSidebar from '../components/BlogSidebar';
import LoadMoreButton from '../components/LoadMoreButton';
import ScrollToTop from '../components/ScrollToTop';
import { mockPosts } from '../data/mockPosts';
import { Post } from '../types/Post';

const POSTS_PER_PAGE = 4;

const Index = () => {
  const { category } = useParams();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(mockPosts);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  
  // Filter posts by category if category param exists
  useEffect(() => {
    if (category) {
      const filtered = mockPosts.filter(post => 
        post.categoria.toLowerCase().replace(/\s+/g, '-') === category
      );
      setFilteredPosts(filtered);
      setPage(1);
    } else {
      setFilteredPosts(mockPosts);
      setPage(1);
    }
  }, [category]);
  
  // Update displayed posts when filteredPosts or page changes
  useEffect(() => {
    setDisplayedPosts(filteredPosts.slice(0, page * POSTS_PER_PAGE));
  }, [filteredPosts, page]);
  
  const hasMore = displayedPosts.length < filteredPosts.length;
  
  const handleLoadMore = () => {
    setLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const nextPage = page + 1;
      setDisplayedPosts(filteredPosts.slice(0, nextPage * POSTS_PER_PAGE));
      setPage(nextPage);
      setLoading(false);
    }, 800);
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
            {displayedPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayedPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
                
                <LoadMoreButton 
                  loading={loading} 
                  onLoadMore={handleLoadMore} 
                  hasMore={hasMore} 
                />
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
