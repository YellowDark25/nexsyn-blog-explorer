import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useState, useEffect } from "react";
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
    },
  },
});

// Analytics configuration
const GOOGLE_ANALYTICS_ID = "G-XXXXXXXXXX"; // Replace with your actual GA ID when ready

// Lazy load das páginas
const Home = lazy(() => import("./pages/Home"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminChat = lazy(() => import("./pages/admin/AdminChat"));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate app loading
  useEffect(() => {
    // Hide initial loading state after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    import('./pages/BlogPage');
    import('./pages/PostDetail');
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-nexsyn-darkBlue flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/2413e882-78d7-43eb-8317-c8ec49076e7c.png" 
            alt="Nexsyn Logo" 
            className="h-16 animate-pulse mb-4"
          />
          <div className="mt-4 flex space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
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
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Carregando...</div>}>
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
