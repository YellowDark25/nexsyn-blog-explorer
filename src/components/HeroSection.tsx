// HeroSection: Componente de destaque da home, exibe o título, subtítulo e chamada para ação principal.
// Utiliza props para customização e pode ser reutilizado em outras páginas.
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-[#0A192F] to-[#0F2A4A] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5"></div>
        
        {/* Animated dots */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-primary/40 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-4 h-4 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-20 md:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Content */}
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left"
              variants={fadeInUp}
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Zap className="h-4 w-4 mr-2" />
                PDV Legal - O mais completo do mercado
              </div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-white"
                variants={fadeInUp}
              >
                Seu negócio <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">mais ágil</span> e eficiente
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-muted-foreground/90 mb-8 max-w-2xl mx-auto lg:mx-0"
                variants={fadeInUp}
              >
                Solução completa para gestão de vendas com tecnologia de ponta e suporte especializado para o seu negócio.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-10"
                variants={fadeInUp}
              >
                <a 
                  href="https://nexsyn.com.br/pdvlegal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto px-8 py-6 text-base font-medium bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
                  >
                    Saiba Mais
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground/80"
                variants={fadeInUp}
              >
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  Fácil de usar
                </div>
                <div className="hidden sm:flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  Suporte 24/7
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  Segurança garantida
                </div>
              </motion.div>
            </motion.div>
            
            {/* Image */}
            <motion.div 
              className="lg:w-1/2 relative"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1]
                  } 
                }
              }}
            >
              <div className="relative z-10">
                <picture>
                  <img 
                    src="/lovable-uploads/45346a3d-16d1-4d5a-9158-3dfba5c3c19c.png" 
                    alt="PDV Legal Card Machine" 
                    className="w-full max-w-2xl mx-auto object-contain drop-shadow-2xl"
                    width={400}
                    height={400}
                    loading="eager"
                  />
                </picture>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full mix-blend-screen blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full mix-blend-screen blur-3xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
