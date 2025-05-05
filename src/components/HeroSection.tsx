
import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative w-full bg-nexsyn-darkBlue h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background overlay with dark gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10"
        aria-hidden="true"
      />
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80)',
          filter: 'brightness(0.6)'
        }}
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-20 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl mx-auto leading-tight drop-shadow-xl font-poppins animate-fade-in">
        Seu atendimento está abrindo portas ou perdendo clientes?
        </h1>
        <div className="mt-8 flex justify-center">
          <a 
            href="#contato" 
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-300 font-medium"
          >
            Saiba Mais
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
