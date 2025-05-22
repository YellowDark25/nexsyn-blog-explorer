
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, ArrowUp, Lock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="w-full bg-nexsyn-darkBlue border-t border-border/40 py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Company info */}
          <div className="sm:col-span-2">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h3 className="flex items-center text-xl font-bold text-primary mb-4 sm:mb-6 group">
                <img 
                  alt="Nexsyn Logo" 
                  className="h-8 sm:h-10 group-hover:scale-105 transition-transform duration-300" 
                  src="/lovable-uploads/2413e882-78d7-43eb-8317-c8ec49076e7c.png" 
                  width={120}
                  height={40}
                  loading="lazy"
                />
              </h3>
              <p className="text-muted-foreground mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
                Soluções inteligentes para empresas alimentícias e 
                gestão de processos de negócios. Transforme sua operação com tecnologia sob medida.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <a 
                  href="https://www.instagram.com/nexsyn.si/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary animate-hover bg-muted/20 p-2 rounded-full hover:bg-muted/30 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a 
                  href="https://www.youtube.com/@SomosNexsyn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary animate-hover bg-muted/20 p-2 rounded-full hover:bg-muted/30 transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="mt-6 sm:mt-0">
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 relative">
              <span className="text-foreground">Links Rápidos</span>
              <span className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-12 sm:w-16 h-0.5 sm:h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/" className="text-sm sm:text-base text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 transition-colors"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm sm:text-base text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 transition-colors"></span>
                  Blog
                </Link>
              </li>
              <li>
                <a 
                  href="https://nexsyn.com.br/sobre" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm sm:text-base text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 transition-colors"></span>
                  Sobre Nós
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/5565992934536?text=Venho%20através%20do%20blog%2C%20tenho%20interesse%20no%20sistema%20PDVLegal" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 transition-colors"></span>
                  Contate-nos
                </a>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="mt-8 sm:mt-0">
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 relative">
              <span className="text-foreground">Categorias</span>
              <span className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-12 sm:w-16 h-0.5 sm:h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="grid grid-cols-2 gap-2 sm:gap-3">
              <li>
                <Link to="/blog/gestao-interna" className="text-sm sm:text-base text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 flex-shrink-0 transition-colors"></span>
                  <span className="truncate">Gestão Interna</span>
                </Link>
              </li>
              <li>
                <Link to="/blog/tecnologia" className="text-sm sm:text-base text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 flex-shrink-0 transition-colors"></span>
                  <span className="truncate">Tecnologia</span>
                </Link>
              </li>
              <li>
                <Link to="/blog/foodservice" className="text-sm sm:text-base text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 flex-shrink-0 transition-colors"></span>
                  <span className="truncate">Foodservice</span>
                </Link>
              </li>
              <li>
                <Link to="/blog/inteligencia-artificial" className="text-sm sm:text-base text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 flex-shrink-0 transition-colors"></span>
                  <span className="truncate">IA</span>
                </Link>
              </li>
              <li className="col-span-2">
                <Link to="/blog/empresas-alimenticias" className="text-sm sm:text-base text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 flex-shrink-0 transition-colors"></span>
                  <span className="truncate">Empresas Alimentícias</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Scroll to top button and copyright */}
        <div className="border-t border-border/40 mt-8 sm:mt-10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-muted-foreground">
              &copy; {currentYear} NEXSYN. Todos os direitos reservados.
            </p>
            <div className="hidden sm:block w-px h-4 bg-border/40"></div>
            <Link 
              to="/admin/login" 
              className="text-xs sm:text-sm text-muted-foreground/70 hover:text-primary flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-all"
              aria-label="Área administrativa"
            >
              <Lock className="h-3 w-3 flex-shrink-0" />
              <span>Admin</span>
            </Link>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center text-xs sm:text-sm text-muted-foreground hover:text-primary group transition-colors"
            aria-label="Voltar ao topo"
          >
            <span className="mr-1.5 sm:mr-2">Voltar ao topo</span>
            <span className="bg-muted/20 p-1 rounded-full group-hover:bg-primary/20 transition-colors flex-shrink-0">
              <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 transform group-hover:-translate-y-0.5 sm:group-hover:-translate-y-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
