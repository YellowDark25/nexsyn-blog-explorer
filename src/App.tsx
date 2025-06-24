import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { AdminProvider } from "./contexts/AdminContext";
import IntegrationsProvider from "./components/integrations/IntegrationsProvider";
import ScrollToTop from "./components/ScrollToTop";
import banner from './assets/banner.png';
// Create a query client with improved configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Analytics configuration
const GOOGLE_ANALYTICS_ID = "G-XXXXXXXXXX"; // Replace with your actual GA ID when ready

// Lazy load das páginas com preloading inteligente
const Home = lazy(() => import("./pages/Home"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages (loaded only when needed)
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminChat = lazy(() => import("./pages/admin/AdminChat"));

// Loading component otimizado e melhorado
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-nexsyn-darkBlue flex items-center justify-center z-50">
    <div className="flex flex-col items-center space-y-6">
      {/* Logo container com proporção correta */}
      <div className="relative">
        <img 
          src="/lovable-uploads/2413e882-78d7-43eb-8317-c8ec49076e7c.png" 
          alt="Nexsyn Logo" 
          className="h-20 w-auto animate-pulse"
          style={{ 
            maxWidth: 'none',
            objectFit: 'contain'
          }}
          loading="eager"
        />
        {/* Glow effect atrás da logo */}
        <div className="absolute inset-0 -z-10 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse"></div>
      </div>
      
      {/* Loading dots melhorados */}
      <div className="flex space-x-2">
        <div 
          className="w-3 h-3 bg-primary rounded-full animate-bounce shadow-lg shadow-primary/50" 
          style={{ animationDelay: '0s', animationDuration: '1.4s' }}
        ></div>
        <div 
          className="w-3 h-3 bg-primary rounded-full animate-bounce shadow-lg shadow-primary/50" 
          style={{ animationDelay: '0.2s', animationDuration: '1.4s' }}
        ></div>
        <div 
          className="w-3 h-3 bg-primary rounded-full animate-bounce shadow-lg shadow-primary/50" 
          style={{ animationDelay: '0.4s', animationDuration: '1.4s' }}
        ></div>
      </div>
      
      {/* Texto de carregamento */}
      <div className="text-center">
        <p className="text-white/80 text-sm font-medium animate-pulse">
          Carregando...
        </p>
      </div>
      
      {/* Círculo de progresso sutil */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"></div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Simulate app loading com otimização
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 500); // Reduzido de 800ms para 500ms
    
    return () => clearTimeout(timer);
  }, []);

  // Preload das páginas mais acessadas de forma inteligente
  useEffect(() => {
    if (!isInitialLoading) {
      // Preload após carregamento inicial para não impactar performance
      const preloadTimer = setTimeout(() => {
        // Preload páginas com maior probabilidade de acesso
        import('./pages/BlogPage').catch(() => {});
        
        // Preload PostDetail um pouco depois
        setTimeout(() => {
          import('./pages/PostDetail').catch(() => {});
        }, 1000);
      }, 2000);
      
      return () => clearTimeout(preloadTimer);
    }
  }, [isInitialLoading]);

  // Preload admin pages apenas quando o usuário interage com links admin
  useEffect(() => {
    const preloadAdminOnHover = () => {
      import('./pages/admin/AdminLogin').catch(() => {});
    };

    // Listen for hover on admin links
    const adminLinks = document.querySelectorAll('a[href*="/admin"]');
    adminLinks.forEach(link => {
      link.addEventListener('mouseenter', preloadAdminOnHover, { once: true });
    });

    return () => {
      adminLinks.forEach(link => {
        link.removeEventListener('mouseenter', preloadAdminOnHover);
      });
    };
  }, []);

  if (isInitialLoading) {
    return <LoadingSpinner />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <IntegrationsProvider 
          googleAnalyticsId={GOOGLE_ANALYTICS_ID}
          // Add other integration IDs as needed:
          // facebookPixelId="123456789"
          // hotjarId="123456"
        >
          <TooltipProvider>
            <Toaster />
            <Sonner closeButton position="bottom-right" />
            <ScrollToTop />
            <Analytics />
            <Suspense fallback={
              <div className="flex items-center justify-center h-screen bg-background">
                <div className="text-center space-y-4">
                  {/* Logo menor para o fallback */}
                  <div className="relative mb-6">
                    <img 
                      src="/lovable-uploads/2413e882-78d7-43eb-8317-c8ec49076e7c.png" 
                      alt="Nexsyn Logo" 
                      className="h-12 w-auto mx-auto animate-pulse"
                      style={{ 
                        maxWidth: 'none',
                        objectFit: 'contain'
                      }}
                      loading="eager"
                    />
                    <div className="absolute inset-0 -z-10 bg-primary/10 blur-lg rounded-full scale-150 animate-pulse"></div>
                  </div>
                  
                  {/* Spinner melhorado */}
                  <div className="relative w-8 h-8 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-2 border-muted"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"></div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm font-medium">Carregando...</p>
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:category" element={<BlogPage />} />
                <Route path="/blog/search" element={<BlogPage />} />
                <Route path="/posts/:slug" element={<PostDetail />} />
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin/chat" 
                  element={
                    <ProtectedRoute>
                      <AdminChat />
                    </ProtectedRoute>
                  } 
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </TooltipProvider>
        </IntegrationsProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
};

export default App;
