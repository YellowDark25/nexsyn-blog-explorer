import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import RecentPosts from '@/components/RecentPosts';
import ContactForm from '@/components/ContactForm';
import ScrollToTop from '@/components/ScrollToTop';
import SEO from '@/components/SEO';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { useAnalytics } from '@/hooks/use-analytics';

const Home = () => {
  const analytics = useAnalytics();
  
  // Breadcrumb structure for home page
  const breadcrumbItems = [
    {
      name: 'NEXSYN Blog',
      url: 'https://blog.nexsyn.com.br'
    }
  ];
  
  return (
    <>
      <SEO 
        title="NEXSYN - Soluções em Gestão Empresarial e Tecnologia" 
        description="NEXSYN - Especialista em soluções de gestão empresarial, sistemas ERP, PDV e tecnologia para restaurantes, food service e pequeno varejo. Transforme seu negócio com nossas soluções inovadoras." 
        url="https://blog.nexsyn.com.br"
        type="website"
        analytics={{
          googleAnalytics: "G-XXXXXXXXXX" // Replace with your actual GA ID when ready
        }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
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
