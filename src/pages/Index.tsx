
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import BlogSidebar from '../components/BlogSidebar';
import LoadMoreButton from '../components/LoadMoreButton';
import { mockPosts } from '../data/mockPosts';
import { Post } from '../types/Post';

const POSTS_PER_PAGE = 4;

const Index = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts.slice(0, POSTS_PER_PAGE));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  
  const hasMore = posts.length < mockPosts.length;
  
  const handleLoadMore = () => {
    setLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const nextPage = page + 1;
      const nextPosts = mockPosts.slice(0, nextPage * POSTS_PER_PAGE);
      setPosts(nextPosts);
      setPage(nextPage);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Blog <span className="text-primary">NEXSYN</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe as últimas notícias e artigos sobre gestão, tecnologia e inovação
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Posts - 2 columns on desktop, 1 on mobile */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            
            <LoadMoreButton 
              loading={loading} 
              onLoadMore={handleLoadMore} 
              hasMore={hasMore} 
            />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
