
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative w-full bg-nexsyn-darkBlue h-[600px] flex items-center justify-center overflow-hidden">
      {/* Animated background overlay with gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#031730]/95 to-[#031730]/80 z-10 animate-fade-in" 
        aria-hidden="true" 
      />
      
      {/* Background image with enhanced styling */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2940)`,
          filter: 'brightness(0.4) contrast(1.2)'
        }} 
        aria-hidden="true" 
      />
      
      {/* Product images - positioned to the right with animation */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block pr-16">
        <div className="transition-all duration-700 hover:scale-105">
          <img 
            src="/lovable-uploads/934a6d72-cf72-4481-8c59-0970036520d0.png" 
            alt="PDV Legal Card Machine" 
            className="h-80 object-contain drop-shadow-2xl animate-fade-in" 
            loading="lazy"
          />
        </div>
      </div>
      
      {/* Content with improved typography and animations */}
      <div className="container mx-auto px-6 relative z-20 text-left max-w-6xl">
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-xl leading-tight drop-shadow-xl font-poppins animate-fade-in mb-6">
            Seu atendimento está <span className="text-primary">abrindo portas</span> ou perdendo clientes?
          </h1>
          
          <p className="text-white/90 text-lg mb-8 max-w-lg animate-fade-in" style={{animationDelay: '0.2s'}}>
            Prático e intuitivo de usar, nosso PDV oferece agilidade e facilidade no ponto de venda.
          </p>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-8 tracking-wide animate-fade-in" style={{animationDelay: '0.4s'}}>
            O SISTEMA MAIS ÁGIL DO MERCADO!
          </h2>
          
          <a 
            href="https://nexsyn.com.br/pdvlegal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="animate-fade-in"
            style={{animationDelay: '0.6s'}}
          >
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg font-medium bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg group"
            >
              Saiba Mais
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
