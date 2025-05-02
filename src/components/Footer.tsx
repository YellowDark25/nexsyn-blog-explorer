
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-background border-t border-border/40 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">NEXSYN</h3>
            <p className="text-muted-foreground">
              Soluções inteligentes para empresas alimentícias e 
              gestão de processos de negócios.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links Úteis</h3>
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
                <Link to="/about" className="text-foreground hover:text-primary animate-hover">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground hover:text-primary animate-hover">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <address className="not-italic text-muted-foreground">
              <p>Email: contato@nexsyn.com.br</p>
              <p>Telefone: (00) 0000-0000</p>
            </address>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-foreground hover:text-primary animate-hover">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-foreground hover:text-primary animate-hover">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-foreground hover:text-primary animate-hover">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
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
