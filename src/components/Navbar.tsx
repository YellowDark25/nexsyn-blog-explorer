
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="w-full bg-background border-b border-border/40 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-3xl font-bold text-primary">
            NEXSYN
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-foreground hover:text-primary animate-hover">
            Home
          </Link>
          <Link to="/blog" className="text-foreground hover:text-primary animate-hover">
            Blogs
          </Link>
          <Link to="/institutional" className="text-foreground hover:text-primary animate-hover">
            Institucional
          </Link>
          <Link to="/contact" className="text-foreground hover:text-primary animate-hover">
            Contate-nos
          </Link>
        </nav>
        <div className="md:hidden">
          <button className="text-foreground hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
