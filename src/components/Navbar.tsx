
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { MessageSquare } from 'lucide-react';

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=556592934536&text=Eu+tenho+interesse+no+Sistema+da+NEXSYN%21&type=phone_number&app_absent=0";

interface NavbarProps {
  onContactClick?: () => void;
}

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return <header className="sticky top-0 z-50 w-full bg-nexsyn-darkBlue border-b border-border/40 py-3 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img alt="Nexsyn Logo" className="h-10" src="/lovable-uploads/2413e882-78d7-43eb-8317-c8ec49076e7c.png" />
        </Link>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-foreground hover:text-primary" onClick={toggleMobileMenu} aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Home
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Blogs</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[200px]">
                    <Link to="/blog" className={navigationMenuTriggerStyle()}>
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
                  <div className="grid gap-3 p-4 w-[200px]">
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
                  className={navigationMenuTriggerStyle()}
                >
                  Contate-nos
                </a>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none" 
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="h-5 w-5" />
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && <div className="md:hidden absolute top-full left-0 right-0 bg-nexsyn-darkBlue border-b border-border pt-2 pb-4 px-4 shadow-lg z-50">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-foreground hover:text-primary py-2" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <div className="py-2">
                <div className="font-medium text-foreground mb-2">Blogs</div>
                <div className="pl-4 flex flex-col space-y-2">
                  <Link to="/blog" className="text-muted-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                    Todos os Blogs
                  </Link>
                  <Link to="/blog/gestao-interna" className="text-muted-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                    Gestão Interna
                  </Link>
                  <Link to="/blog/tecnologia" className="text-muted-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                    Tecnologia
                  </Link>
                  <Link to="/blog/foodservice" className="text-muted-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                    Foodservice
                  </Link>
                  <Link to="/blog/inteligencia-artificial" className="text-muted-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                    Inteligência Artificial
                  </Link>
                  <Link to="/blog/empresas-alimenticias" className="text-muted-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                    Empresas Alimentícias
                  </Link>
                </div>
              </div>
              <div className="py-2">
                <div className="font-medium text-foreground mb-2">Institucional</div>
                <div className="pl-4 flex flex-col space-y-2">
                  <a href="https://nexsyn.com.br/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    Institucional
                  </a>
                  <a href="https://nexsyn.com.br/sobre" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    Sobre a Nexsyn
                  </a>
                </div>
              </div>
              <a 
                href={WHATSAPP_URL}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-foreground hover:text-primary py-2 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageSquare className="h-5 w-5" />
                <span>Contate-nos</span>
              </a>
            </nav>
          </div>}
      </div>
    </header>;
};

export default Navbar;
