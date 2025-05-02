
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Instagram } from 'lucide-react';

interface NavbarProps {
  onContactClick?: () => void;
}

const Navbar = ({ onContactClick }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border/40 py-3 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-3xl font-bold text-primary">NEXSYN</span>
        </Link>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            className="text-foreground hover:text-primary"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
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
                <button 
                  onClick={onContactClick} 
                  className={navigationMenuTriggerStyle()}
                >
                  Contate-nos
                </button>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <a 
                  href="https://www.instagram.com/nexsyn.oficial/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border pt-2 pb-4 px-4 shadow-lg">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-foreground hover:text-primary py-2">
                Home
              </Link>
              <div className="py-2">
                <div className="font-medium text-foreground mb-2">Blogs</div>
                <div className="pl-4 flex flex-col space-y-2">
                  <Link to="/blog" className="text-muted-foreground hover:text-primary">
                    Todos os Blogs
                  </Link>
                  <Link to="/blog/gestao-interna" className="text-muted-foreground hover:text-primary">
                    Gestão Interna
                  </Link>
                  <Link to="/blog/tecnologia" className="text-muted-foreground hover:text-primary">
                    Tecnologia
                  </Link>
                  <Link to="/blog/foodservice" className="text-muted-foreground hover:text-primary">
                    Foodservice
                  </Link>
                  <Link to="/blog/inteligencia-artificial" className="text-muted-foreground hover:text-primary">
                    Inteligência Artificial
                  </Link>
                  <Link to="/blog/empresas-alimenticias" className="text-muted-foreground hover:text-primary">
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
              <button 
                onClick={() => {
                  onContactClick?.();
                  setMobileMenuOpen(false);
                }} 
                className="text-foreground hover:text-primary py-2"
              >
                Contate-nos
              </button>
              <a 
                href="https://www.instagram.com/nexsyn.oficial/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary py-2 flex items-center gap-2"
              >
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
