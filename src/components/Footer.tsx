
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-nexsyn-darkBlue border-t border-border/40 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">
              <img alt="Nexsyn Logo" className="h-10" src="/lovable-uploads/2413e882-78d7-43eb-8317-c8ec49076e7c.png" />
            </h3>
            <p className="text-muted-foreground">
              Soluções inteligentes para empresas alimentícias e 
              gestão de processos de negócios.
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://www.instagram.com/nexsyn.si/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary animate-hover"
                aria-label="Instagram"
              >
                <Instagram />
              </a>
              <a 
                href="https://www.youtube.com/@SomosNexsyn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary animate-hover"
                aria-label="YouTube"
              >
                <Youtube />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground hover:text-primary animate-hover">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-foreground hover:text-primary animate-hover">
                  Blog
                </Link>
              </li>
              <li>
                <a href="https://nexsyn.com.br/sobre" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary animate-hover">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground hover:text-primary animate-hover">
                  Contate-nos
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog/gestao-interna" className="text-foreground hover:text-primary animate-hover">
                  Gestão Interna
                </Link>
              </li>
              <li>
                <Link to="/blog/tecnologia" className="text-foreground hover:text-primary animate-hover">
                  Tecnologia
                </Link>
              </li>
              <li>
                <Link to="/blog/foodservice" className="text-foreground hover:text-primary animate-hover">
                  Foodservice
                </Link>
              </li>
              <li>
                <Link to="/blog/inteligencia-artificial" className="text-foreground hover:text-primary animate-hover">
                  Inteligência Artificial
                </Link>
              </li>
              <li>
                <Link to="/blog/empresas-alimenticias" className="text-foreground hover:text-primary animate-hover">
                  Empresas Alimentícias
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40 mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} NEXSYN. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
