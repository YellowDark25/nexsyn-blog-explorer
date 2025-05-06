
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/AdminSidebar";
import ChatMessages from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatSession {
  id: string;
  name: string;
  timestamp: Date;
  messages: Message[];
}

const AdminChat = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentSession, setCurrentSession] = useState<ChatSession>({
    id: 'session-' + Date.now(),
    name: 'Nova conversa',
    timestamp: new Date(),
    messages: []
  });
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Check if user is logged in as admin
  useEffect(() => {
    const isAdmin = localStorage.getItem('nexsyn_admin');
    if (!isAdmin) {
      navigate('/admin/login');
    }
    
    // Load saved sessions
    const savedSessions = localStorage.getItem('nexsyn_chat_sessions');
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions);
        setSessions(parsedSessions);
        
        // If we have saved sessions, set the most recent one as current
        if (parsedSessions.length > 0) {
          setCurrentSession(parsedSessions[0]);
        }
      } catch (e) {
        console.error("Failed to parse saved sessions", e);
      }
    }
  }, [navigate]);

  // Save sessions to localStorage when they change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('nexsyn_chat_sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Create a new message from the user
    const userMessage: Message = {
      id: 'msg-' + Date.now(),
      content: message,
      role: 'user',
      timestamp: new Date()
    };
    
    // Update the current session with the new message
    const updatedCurrentSession = {
      ...currentSession,
      messages: [...currentSession.messages, userMessage]
    };
    setCurrentSession(updatedCurrentSession);
    
    // Update the sessions list
    const updatedSessions = sessions.filter(s => s.id !== currentSession.id);
    setSessions([updatedCurrentSession, ...updatedSessions]);
    
    // Send the message to the n8n webhook
    setLoading(true);
    
    try {
      // Generate a session ID if needed or use the current one
      const sessionId = currentSession.id.startsWith('session-') 
        ? uuidv4() 
        : currentSession.id;
      
      // Send the message to the n8n webhook
      const response = await fetch('https://n8n-wh.nexsyn.com.br/webhook/set/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId,
          message: message
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from webhook');
      }
      
      const data = await response.json();
      
      // Create a new message from the AI
      const aiMessage: Message = {
        id: 'msg-' + Date.now(),
        content: data.reply || 'Não foi possível processar sua solicitação.',
        role: 'assistant',
        timestamp: new Date()
      };
      
      const finalSession = {
        ...updatedCurrentSession,
        id: sessionId, // Update with the UUID if it was generated
        messages: [...updatedCurrentSession.messages, aiMessage]
      };
      
      setCurrentSession(finalSession);
      
      // Update the sessions list again
      const finalSessions = sessions.filter(s => s.id !== updatedCurrentSession.id);
      setSessions([finalSession, ...finalSessions]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar a mensagem para o webhook',
        variant: 'destructive'
      });
      
      // Add error message to the chat
      const errorMessage: Message = {
        id: 'msg-' + Date.now(),
        content: 'Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.',
        role: 'assistant',
        timestamp: new Date()
      };
      
      const finalSession = {
        ...updatedCurrentSession,
        messages: [...updatedCurrentSession.messages, errorMessage]
      };
      
      setCurrentSession(finalSession);
      
      // Update the sessions list again
      const finalSessions = sessions.filter(s => s.id !== updatedCurrentSession.id);
      setSessions([finalSession, ...finalSessions]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewChat = () => {
    const newSession: ChatSession = {
      id: 'session-' + Date.now(),
      name: 'Nova conversa',
      timestamp: new Date(),
      messages: []
    };
    
    setCurrentSession(newSession);
    setSessions([newSession, ...sessions]);
  };

  const handleSelectSession = (sessionId: string) => {
    const selected = sessions.find(s => s.id === sessionId);
    if (selected) {
      setCurrentSession(selected);
    }
  };

  const handleGenerateIdeas = () => {
    handleSendMessage("Preciso de ideias para posts sobre tecnologia na indústria alimentícia.");
  };

  const handleEvaluateIdea = () => {
    handleSendMessage("Avalie esta ideia de post: 'Como a IA está transformando a gestão de restaurantes'.");
  };

  const handleFindCoverImage = () => {
    handleSendMessage("Busque uma imagem de capa para um post sobre tecnologia em restaurantes.");
  };

  const handleSaveToSupabase = () => {
    setLoading(true);
    
    toast({
      title: 'Salvando post...',
      description: 'O conteúdo está sendo salvo no Supabase'
    });
    
    // Here you would typically make another call to n8n to save the data to Supabase
    // For this example, we'll just simulate the API call
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: 'Sucesso!',
        description: 'Post salvo com sucesso na tabela posts_blog',
        variant: 'default'
      });
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('nexsyn_admin');
    navigate('/admin/login');
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <Sidebar 
        sessions={sessions} 
        onSelectSession={handleSelectSession}
        onNewChat={handleCreateNewChat}
        currentSessionId={currentSession.id}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col h-full">
        <header className="p-4 border-b bg-card">
          <h1 className="text-xl font-bold text-primary">Converse com a IA Nexsyn</h1>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleGenerateIdeas}
              disabled={loading}
            >
              Gerar ideias de post
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleEvaluateIdea}
              disabled={loading}
            >
              Avaliar ideia
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleFindCoverImage}
              disabled={loading}
            >
              Buscar capa
            </Button>
            <Button 
              size="sm"
              className="bg-nexsyn-orange hover:bg-nexsyn-orange/90"
              onClick={handleSaveToSupabase}
              disabled={loading}
            >
              Salvar no Supabase
            </Button>
          </div>
        </header>
        
        <ChatMessages 
          messages={currentSession.messages} 
          loading={loading}
        />
        
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={loading} 
        />
      </div>
    </div>
  );
};

export default AdminChat;
