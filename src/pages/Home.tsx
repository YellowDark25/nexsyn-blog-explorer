
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import RecentPosts from '@/components/RecentPosts';
import ContactForm from '@/components/ContactForm';
import ScrollToTop from '@/components/ScrollToTop';
import SEO from '@/components/SEO';
import { useAnalytics } from '@/hooks/use-analytics';

const Home = () => {
  const analytics = useAnalytics();
  
  return (
    <>
      <SEO 
        title="Home" 
        description="NEXSYN - Soluções inovadoras em gestão empresarial e tecnologia da informação" 
        analytics={{
          googleAnalytics: "G-XXXXXXXXXX" // Replace with your actual GA ID when ready
        }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <RecentPosts limit={3} /> {/* Ensure we're showing 6 posts on the home page */}
        <ContactForm />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Home;
