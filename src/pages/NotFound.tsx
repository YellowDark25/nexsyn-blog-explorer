
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
          <p className="text-xl text-foreground mb-6">
            Oops! Página não encontrada
          </p>
          <p className="text-muted-foreground mb-8">
            A página que você está procurando não existe ou foi removida.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-primary text-white rounded-md font-medium shadow-md hover:bg-primary/90 animate-hover"
          >
            Voltar para Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
