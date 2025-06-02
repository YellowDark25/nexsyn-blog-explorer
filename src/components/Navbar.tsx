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
      className={`sticky top-0 z-50 w-full bg-nexsyn-darkBlue border-b border-border/40 py-2 sm:py-3 shadow-md transition-all duration-300 ${
        scrolled ? 'bg-opacity-95 backdrop-blur-sm shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center flex-shrink-0">
          <img 
            alt="Nexsyn Logo" 
            className="h-10 w-auto transition-transform duration-300 hover:scale-105" 
            src="/lovable-uploads/2413e882-78d7-43eb-8317-c8ec49076e7c.png"
            loading="lazy"
            style={{ height: '40px', width: 'auto' }}
          />
        </Link>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            className="text-foreground hover:text-primary transition-colors p-2 -mr-2" 
            onClick={toggleMobileMenu} 
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
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
            <NavigationMenuList className="flex items-center space-x-1">
              <NavigationMenuItem>
                <Link 
                  to="/" 
                  className={`${navigationMenuTriggerStyle()} text-sm sm:text-base relative px-4 py-2 transition-all duration-200 rounded-lg
                    ${location.pathname === '/' ? 'text-primary font-semibold after:absolute after:left-2 after:right-2 after:-bottom-1 after:h-1 after:bg-primary after:rounded-full' : 'text-foreground hover:text-primary hover:bg-primary/10 hover:scale-105'}`}
                >
                  <span className="inline-flex items-center gap-1">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-primary"><path d="M3 12L12 3l9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 21V9h6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Home
                  </span>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={`text-sm sm:text-base flex items-center gap-1 px-4 py-2 transition-all duration-200 rounded-lg
                    ${location.pathname.includes('/blog') ? 'text-primary font-semibold after:absolute after:left-2 after:right-2 after:-bottom-1 after:h-1 after:bg-primary after:rounded-full' : 'text-foreground hover:text-primary hover:bg-primary/10 hover:scale-105'}`}
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-primary"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                  Blogs
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-2 p-3 w-[220px] sm:w-[250px] bg-gradient-to-b from-card to-card/95 backdrop-blur-md rounded-xl shadow-xl border border-primary/20 animate-fadeIn">
                    <Link 
                      to="/blog" 
                      className={`${navigationMenuTriggerStyle()} justify-start text-sm sm:text-base rounded-md px-3 py-2 transition-all hover:bg-primary/10 hover:scale-105`}
                    >
                      Todos os Blogs
                    </Link>
                    <Link 
                      to="/blog/gestao-interna" 
                      className={`${navigationMenuTriggerStyle()} justify-start text-sm sm:text-base rounded-md px-3 py-2 transition-all hover:bg-primary/10 hover:scale-105`}
                    >
                      Gestão Interna
                    </Link>
                    <Link 
                      to="/blog/tecnologia" 
                      className={`${navigationMenuTriggerStyle()} justify-start text-sm sm:text-base rounded-md px-3 py-2 transition-all hover:bg-primary/10 hover:scale-105`}
                    >
                      Tecnologia
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={`text-sm sm:text-base flex items-center gap-1 px-4 py-2 transition-all duration-200 rounded-lg
                    ${location.pathname.includes('/institucional') ? 'text-primary font-semibold after:absolute after:left-2 after:right-2 after:-bottom-1 after:h-1 after:bg-primary after:rounded-full' : 'text-foreground hover:text-primary hover:bg-primary/10 hover:scale-105'}`}
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-primary"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>
                  Institucional
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-2 p-3 w-[220px] sm:w-[250px] bg-gradient-to-b from-card to-card/95 backdrop-blur-md rounded-xl shadow-xl border border-primary/20 animate-fadeIn">
                    <a 
                      href="https://nexsyn.com.br/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${navigationMenuTriggerStyle()} justify-start text-sm sm:text-base rounded-md px-3 py-2 transition-all hover:bg-primary/10 hover:scale-105`}
                    >
                      Site Oficial
                    </a>
                    <a 
                      href="https://nexsyn.com.br/sobre"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${navigationMenuTriggerStyle()} justify-start text-sm sm:text-base rounded-md px-3 py-2 transition-all hover:bg-primary/10 hover:scale-105`}
                    >
                      Sobre Nós
                    </a>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${navigationMenuTriggerStyle()} bg-primary hover:bg-primary/90 text-primary-foreground ml-1 sm:ml-2 text-sm sm:text-base whitespace-nowrap shadow-lg px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 active:scale-95`}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Fale Conosco
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Mobile Navigation Menu with animation */}
        <div 
          className={`fixed inset-0 bg-nexsyn-darkBlue/95 backdrop-blur-sm z-40 transform transition-all duration-300 ease-in-out shadow-2xl border-l border-primary/20 md:hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="container mx-auto px-4 py-20 h-full overflow-y-auto flex flex-col">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`py-3 px-4 rounded-lg transition-all text-lg flex items-center gap-2 shadow-sm active:scale-95 ${
                  location.pathname === '/' ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-primary/10 hover:text-primary'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-primary"><path d="M3 12L12 3l9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 21V9h6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Home
              </Link>
              
              <div className="pt-2">
                <h3 className="px-4 py-2 text-muted-foreground text-sm font-medium">Categorias</h3>
                <div className="space-y-1 mt-2">
                  <Link 
                    to="/blog" 
                    className={`block py-3 px-4 rounded-lg transition-all text-base flex items-center gap-2 shadow-sm active:scale-95 ${
                      location.pathname === '/blog' ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-primary/10 hover:text-primary'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-primary"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                    Todos os Blogs
                  </Link>
                  <Link 
                    to="/blog/gestao-interna" 
                    className={`block py-3 px-4 rounded-lg transition-all text-base flex items-center gap-2 shadow-sm active:scale-95 ${
                      location.pathname.includes('/blog/gestao-interna') ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-primary/10 hover:text-primary'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-primary"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>
                    Gestão Interna
                  </Link>
                  <Link 
                    to="/blog/tecnologia" 
                    className={`block py-3 px-4 rounded-lg transition-all text-base flex items-center gap-2 shadow-sm active:scale-95 ${
                      location.pathname.includes('/blog/tecnologia') ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-primary/10 hover:text-primary'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-primary"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                    Tecnologia
                  </Link>
                </div>
                
                <div className="mt-4">
                  <h3 className="px-4 py-2 text-muted-foreground text-sm font-medium">Institucional</h3>
                  <div className="space-y-1 mt-2">
                    <a 
                      href="https://nexsyn.com.br/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block py-3 px-4 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-all flex items-center gap-2 shadow-sm active:scale-95"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-primary"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>
                      Institucional
                    </a>
                    <a 
                      href="https://nexsyn.com.br/sobre" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block py-3 px-4 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-all flex items-center gap-2 shadow-sm active:scale-95"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-primary"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>
                      Sobre a Nexsyn
                    </a>
                  </div>
                </div>
              </div>
              
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-6 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg font-semibold shadow-lg transition-all duration-200 active:scale-95 border-2 border-primary/30"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageSquare className="h-5 w-5" />
                <span>Fale Conosco</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
