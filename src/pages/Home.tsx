
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import RecentPosts from '@/components/RecentPosts';
import ContactForm from '@/components/ContactForm';
import ScrollToTop from '@/components/ScrollToTop';
import SEO from '@/components/SEO';

const Home = () => {
  return (
    <>
      <SEO 
        title="Home" 
        description="NEXSYN - Soluções inovadoras em gestão empresarial e tecnologia da informação" 
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
