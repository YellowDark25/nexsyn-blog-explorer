
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple front-end validation
    if (username === 'Kleverson' && password === 'Nosrevelk') {
      // Store login state
      localStorage.setItem('nexsyn_admin', 'true');
      
      // Show success toast
      toast({
        title: "Login bem-sucedido",
        description: "Redirecionando para o painel...",
      });
      
      // Redirect to admin chat
      setTimeout(() => {
        navigate('/admin/chat');
      }, 1000);
    } else {
      // Show error toast
      toast({
        title: "Erro de autenticação",
        description: "Credenciais inválidas",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-nexsyn-darkBlue">
      <div className="mb-8">
        <img 
          src="/lovable-uploads/2413e882-78d7-43eb-8317-c8ec49076e7c.png" 
          alt="Nexsyn Logo" 
          className="h-12" 
        />
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">
            Painel Nexsyn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input 
                id="username" 
                placeholder="Seu usuário" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Sua senha" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-nexsyn-orange hover:bg-nexsyn-orange/90"
              disabled={isLoading}
            >
              {isLoading ? "Processando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
