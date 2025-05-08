
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated via localStorage
    const adminSession = localStorage.getItem('adminSession');
    
    if (!adminSession) {
      setIsAuthenticated(false);
      return;
    }
    
    try {
      const session = JSON.parse(adminSession);
      const currentTime = new Date().getTime();
      
      // Check if session is expired (24 hours)
      if (session.expiresAt && session.expiresAt < currentTime) {
        localStorage.removeItem('adminSession');
        setIsAuthenticated(false);
        return;
      }
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error parsing admin session:', error);
      localStorage.removeItem('adminSession');
      setIsAuthenticated(false);
    }
  }, []);
  
  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    toast({
      title: "Acesso restrito",
      description: "Faça login para acessar esta área.",
      variant: "destructive",
    });
    
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
