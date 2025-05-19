
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import HeroSection from '../components/HeroSection';
import RecentPosts from '../components/RecentPosts';

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <RecentPosts limit={3} />
        
        {/* Contact Section */}
        <ContactForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
