
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { MessageSquare, Menu, X } from 'lucide-react';

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=556592934536&text=Venho%20através%20do%20blog%2C%20tenho%20interesse%20no%20sistema%20PDVLegal%21&type=phone_number&app_absent=0";

interface NavbarProps {
  onContactClick?: () => void;
}

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full bg-nexsyn-darkBlue border-b border-border/40 py-3 shadow-md transition-all duration-300 ${
        scrolled ? 'bg-opacity-95 backdrop-blur-sm shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            alt="Nexsyn Logo" 
            className="h-10 transition-transform duration-300 hover:scale-105" 
            src="/lovable-uploads/2413e882-78d7-43eb-8317-c8ec49076e7c.png"
            loading="lazy"
          />
        </Link>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            className="text-foreground hover:text-primary transition-colors p-1" 
            onClick={toggleMobileMenu} 
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link 
                  to="/" 
                  className={`${navigationMenuTriggerStyle()} ${location.pathname === '/' ? 'text-primary font-semibold' : ''}`}
                >
                  Home
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className={location.pathname.includes('/blog') ? 'text-primary font-semibold' : ''}>
                  Blogs
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[240px] bg-gradient-to-b from-card to-card/95 backdrop-blur-sm">
                    <Link to="/blog" className={`${navigationMenuTriggerStyle()} ${location.pathname === '/blog' ? 'text-primary font-semibold' : ''}`}>
                      Todos os Blogs
                    </Link>
                    <Link to="/blog/gestao-interna" className={navigationMenuTriggerStyle()}>
                      Gestão Interna
                    </Link>
                    <Link to="/blog/tecnologia" className={navigationMenuTriggerStyle()}>
                      Tecnologia
                    </Link>
                    <Link to="/blog/foodservice" className={navigationMenuTriggerStyle()}>
                      Foodservice
                    </Link>
                    <Link to="/blog/inteligencia-artificial" className={navigationMenuTriggerStyle()}>
                      Inteligência Artificial
                    </Link>
                    <Link to="/blog/empresas-alimenticias" className={navigationMenuTriggerStyle()}>
                      Empresas Alimentícias
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Institucional</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[240px] bg-gradient-to-b from-card to-card/95 backdrop-blur-sm">
                    <a href="https://nexsyn.com.br/" target="_blank" rel="noopener noreferrer" className={navigationMenuTriggerStyle()}>
                      Institucional
                    </a>
                    <a href="https://nexsyn.com.br/sobre" target="_blank" rel="noopener noreferrer" className={navigationMenuTriggerStyle()}>
                      Sobre a Nexsyn
                    </a>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${navigationMenuTriggerStyle()} flex items-center gap-2 hover:bg-primary/10 hover:text-primary transition-colors`}
                >
                  <MessageSquare className="h-4 w-4" />
                  Contate-nos
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Mobile Navigation Menu with animation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-nexsyn-darkBlue border-b border-border pt-2 pb-4 px-4 shadow-lg z-50 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`text-foreground hover:text-primary py-2 transition-colors ${location.pathname === '/' ? 'text-primary font-semibold' : ''}`} 
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <div className="py-2">
                <div className={`font-medium mb-2 ${location.pathname.includes('/blog') ? 'text-primary' : 'text-foreground'}`}>
                  Blogs
                </div>
                <div className="pl-4 flex flex-col space-y-2">
                  <Link 
                    to="/blog" 
                    className={`text-muted-foreground hover:text-primary transition-colors ${location.pathname === '/blog' ? 'text-primary' : ''}`} 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Todos os Blogs
                  </Link>
                  <Link to="/blog/gestao-interna" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Gestão Interna
                  </Link>
                  <Link to="/blog/tecnologia" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Tecnologia
                  </Link>
                  <Link to="/blog/foodservice" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Foodservice
                  </Link>
                  <Link to="/blog/inteligencia-artificial" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Inteligência Artificial
                  </Link>
                  <Link to="/blog/empresas-alimenticias" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Empresas Alimentícias
                  </Link>
                </div>
              </div>
              
              <div className="py-2">
                <div className="font-medium text-foreground mb-2">Institucional</div>
                <div className="pl-4 flex flex-col space-y-2">
                  <a href="https://nexsyn.com.br/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    Institucional
                  </a>
                  <a href="https://nexsyn.com.br/sobre" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    Sobre a Nexsyn
                  </a>
                </div>
              </div>
              
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-foreground hover:text-primary py-2 flex items-center gap-2 transition-colors" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageSquare className="h-5 w-5" />
                <span>Contate-nos</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
