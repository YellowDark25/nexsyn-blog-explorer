
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PostNotFound: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Post não encontrado</h1>
        <p className="mb-8">O artigo que você está procurando não existe ou foi removido.</p>
        <Link to="/blog" className="text-primary hover:underline">
          Voltar para o blog
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default PostNotFound;
