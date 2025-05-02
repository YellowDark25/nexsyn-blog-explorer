
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import ArticleCard from '../components/ArticleCard';
import { Button } from '@/components/ui/button';
import { mockPosts } from '../data/mockPosts';
import HeroSection from '../components/HeroSection';

const Home = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const recentPosts = mockPosts.slice(0, 3);
  
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar onContactClick={scrollToContact} />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Recent Articles Section */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            ARTIGOS RECENTES
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/blog">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                Ver Todos os Artigos
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Contact Section */}
        <div ref={contactRef}>
          <ContactForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
