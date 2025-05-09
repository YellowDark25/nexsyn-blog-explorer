
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
  
  const safeGoogleAnalyticsId = "G-XXXXXXXXXX"; // Replace with your actual GA ID when ready
  
  return (
    <>
      <SEO 
        title="Home" 
        description="NEXSYN - Soluções inovadoras em gestão empresarial e tecnologia da informação" 
        analytics={{
          googleAnalytics: safeGoogleAnalyticsId
        }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <RecentPosts />
        <ContactForm />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Home;
