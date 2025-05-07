
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="w-full bg-nexsyn-darkBlue border-t border-border/40 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="md:col-span-2">
            <h3 className="flex items-center text-xl font-bold text-primary mb-6 group">
              <img 
                alt="Nexsyn Logo" 
                className="h-10 group-hover:scale-105 transition-transform duration-300" 
                src="/lovable-uploads/2413e882-78d7-43eb-8317-c8ec49076e7c.png" 
                loading="lazy"
              />
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Soluções inteligentes para empresas alimentícias e 
              gestão de processos de negócios. Transforme sua operação com tecnologia sob medida.
            </p>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://www.instagram.com/nexsyn.si/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary animate-hover bg-muted/20 p-2 rounded-full hover:bg-muted/30 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.youtube.com/@SomosNexsyn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary animate-hover bg-muted/20 p-2 rounded-full hover:bg-muted/30 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative">
              <span className="text-foreground">Links Rápidos</span>
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex">
                  Blog
                </Link>
              </li>
              <li>
                <a href="https://nexsyn.com.br/sobre" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex">
                  Contate-nos
                </a>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative">
              <span className="text-foreground">Categorias</span>
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog/gestao-interna" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex">
                  Gestão Interna
                </Link>
              </li>
              <li>
                <Link to="/blog/tecnologia" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex">
                  Tecnologia
                </Link>
              </li>
              <li>
                <Link to="/blog/foodservice" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex">
                  Foodservice
                </Link>
              </li>
              <li>
                <Link to="/blog/inteligencia-artificial" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex">
                  Inteligência Artificial
                </Link>
              </li>
              <li>
                <Link to="/blog/empresas-alimenticias" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex">
                  Empresas Alimentícias
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Scroll to top button and copyright */}
        <div className="border-t border-border/40 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} NEXSYN. Todos os direitos reservados.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center text-sm text-muted-foreground hover:text-primary group transition-colors"
            aria-label="Voltar ao topo"
          >
            <span className="mr-2">Voltar ao topo</span>
            <span className="bg-muted/20 p-1 rounded-full group-hover:bg-primary/20 transition-colors">
              <ArrowUp className="h-4 w-4 transform group-hover:-translate-y-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
