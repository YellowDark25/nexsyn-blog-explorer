
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, UserCheck } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAdmin();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/chat';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o usuário e senha para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      
      if (success) {
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo à área administrativa.",
        });
        
        // Navigate to admin dashboard
        const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/chat';
        navigate(from, { replace: true });
      } else {
        toast({
          title: "Credenciais inválidas",
          description: "Usuário ou senha incorretos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro ao tentar fazer login.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <a href="/" className="inline-block">
              <img 
                src="/lovable-uploads/2413e882-78d7-43eb-8317-c8ec49076e7c.png" 
                alt="Nexsyn Logo"
                className="h-12 mx-auto mb-6"
              />
            </a>
            <h1 className="text-2xl font-bold text-foreground">Área Administrativa</h1>
            <p className="text-muted-foreground mt-2">
              Faça login para acessar o painel administrativo
            </p>
          </div>
          
          <div className="bg-card border border-border/60 rounded-lg p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Seu nome de usuário"
                    className="pl-10"
                    disabled={isLoading}
                  />
                  <UserCheck className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    className="pl-10"
                    disabled={isLoading}
                  />
                  <Lock className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Autenticando..." : "Entrar"}
              </Button>
            </form>
          </div>
          
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-primary hover:underline">
              Voltar para o site
            </a>
          </div>
        </div>
      </div>
      
      <footer className="py-4 border-t border-border bg-background">
        <div className="container text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} NEXSYN. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default AdminLogin;
