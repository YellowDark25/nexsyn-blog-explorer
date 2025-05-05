
import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import HeroSection from '../components/HeroSection';
import RecentPosts from '../components/RecentPosts';

const Home = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar onContactClick={scrollToContact} />
      
      <main className="flex-grow">
        <HeroSection />
        <RecentPosts limit={3} />
        
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
