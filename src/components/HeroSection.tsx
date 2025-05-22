
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative w-full bg-nexsyn-darkBlue h-auto min-h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden py-16 md:py-0">
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
      
      <div className="container mx-auto px-4 sm:px-6 relative z-20 h-full flex items-center py-12 md:py-0">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Content with improved typography and animations */}
            <div className="lg:w-1/2 lg:pr-8">
              <div className="max-w-xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight drop-shadow-xl font-poppins animate-fade-in mb-4 sm:mb-6">
                  Seu atendimento está <span className="text-primary">abrindo portas</span> ou perdendo clientes?
                </h1>
                
                <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
                  Prático e intuitivo de usar, nosso PDV oferece agilidade e facilidade no ponto de venda.
                </p>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-6 sm:mb-8 tracking-wide animate-fade-in" style={{animationDelay: '0.4s'}}>
                  O SISTEMA MAIS ÁGIL DO MERCADO!
                </h2>
                
                <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
                  <a 
                    href="https://nexsyn.com.br/pdvlegal" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button 
                      size="lg" 
                      className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg group w-full sm:w-auto text-center"
                    >
                      Saiba Mais
                      <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform inline-block" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Product images - positioned to the right with animation */}
            <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center lg:justify-end w-full">
              <img 
                src="/lovable-uploads/934a6d72-cf72-4481-8c59-0970036520d0.png" 
                alt="PDV Legal Card Machine" 
                className="h-64 sm:h-72 md:h-80 object-contain animate-fade-in drop-shadow-2xl" 
                width={400}
                height={400}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
