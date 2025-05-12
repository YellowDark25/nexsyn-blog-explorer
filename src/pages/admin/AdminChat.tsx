
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, LogOut, Send, RefreshCw, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  timestamp: Date;
  lastMessage: string;
}

const AdminChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [showSessions, setShowSessions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { username, logout } = useAdmin();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Generate session ID on first load if needed
  useEffect(() => {
    const storedSessionId = localStorage.getItem('currentChatSessionId');
    
    if (storedSessionId) {
      setSessionId(storedSessionId);
      loadChatHistory(storedSessionId);
    } else {
      const newSessionId = Date.now().toString(36) + Math.random().toString(36).substring(2);
      setSessionId(newSessionId);
      localStorage.setItem('currentChatSessionId', newSessionId);
      
      // Add initial bot message
      setMessages([
        {
          id: Date.now().toString(),
          role: 'bot',
          content: 'Olá, como posso ajudar hoje?',
          timestamp: new Date()
        }
      ]);
    }
    
    // Load previous chat sessions
    loadChatSessions();
    
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const loadChatSessions = async () => {
    // In a real app, this would be an API call to load historical sessions
    try {
      // For now, get from localStorage
      const sessionsJSON = localStorage.getItem('chatSessions');
      if (sessionsJSON) {
        const sessions = JSON.parse(sessionsJSON);
        setChatSessions(sessions);
      }
    } catch (error) {
      console.error("Error loading chat sessions:", error);
      toast({
        title: "Erro ao carregar histórico",
        description: "Não foi possível carregar o histórico de sessões.",
        variant: "destructive",
      });
    }
  };
  
  const loadChatHistory = async (sid: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to load chat history
      // For now, get from localStorage
      const historyJSON = localStorage.getItem(`chatHistory_${sid}`);
      
      if (historyJSON) {
        const history = JSON.parse(historyJSON);
        // Convert string timestamps back to Date objects
        const messagesWithDates = history.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } else {
        // If no history found, start with a greeting
        setMessages([
          {
            id: Date.now().toString(),
            role: 'bot',
            content: 'Olá, como posso ajudar hoje?',
            timestamp: new Date()
          }
        ]);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
      toast({
        title: "Erro ao carregar mensagens",
        description: "Não foi possível carregar o histórico da conversa.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStartNewSession = () => {
    const newSessionId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    
    // Save current session to sessions list if it has messages
    if (messages.length > 1) {
      saveCurrentSession();
    }
    
    // Update current session
    setSessionId(newSessionId);
    localStorage.setItem('currentChatSessionId', newSessionId);
    setMessages([
      {
        id: Date.now().toString(),
        role: 'bot',
        content: 'Olá, como posso ajudar hoje?',
        timestamp: new Date()
      }
    ]);
    
    toast({
      title: "Nova conversa iniciada",
      description: "Você começou uma nova sessão de chat.",
    });
  };
  
  const handleSessionSelect = (sid: string) => {
    // Save current session
    if (messages.length > 1) {
      saveCurrentSession();
    }
    
    // Load selected session
    setSessionId(sid);
    localStorage.setItem('currentChatSessionId', sid);
    loadChatHistory(sid);
  };
  
  const saveCurrentSession = () => {
    // Save current messages
    localStorage.setItem(`chatHistory_${sessionId}`, JSON.stringify(messages));
    
    // Update sessions list
    const lastMessage = messages[messages.length - 1].content;
    const truncatedMessage = lastMessage.length > 30 
      ? lastMessage.substring(0, 30) + '...' 
      : lastMessage;
    
    const currentSession: ChatSession = {
      id: sessionId,
      timestamp: new Date(),
      lastMessage: truncatedMessage
    };
    
    const updatedSessions = [
      currentSession,
      ...chatSessions.filter(session => session.id !== sessionId)
    ];
    
    setChatSessions(updatedSessions);
    localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
  };
  
  const handleDeleteSession = (sid: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Remove from sessions list
    const updatedSessions = chatSessions.filter(session => session.id !== sid);
    setChatSessions(updatedSessions);
    localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
    
    // Remove chat history
    localStorage.removeItem(`chatHistory_${sid}`);
    
    // If current session was deleted, start new one
    if (sid === sessionId) {
      handleStartNewSession();
    }
    
    toast({
      title: "Sessão excluída",
      description: "A sessão de chat foi excluída com sucesso.",
    });
  };
  
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!message.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsSending(true);
    
    try {
      // For now we'll simulate an API call with setTimeout
      // In a real app, this would be a fetch to n8n webhook
      setTimeout(() => {
        // Simulate response
        const botResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: `Estou processando sua mensagem: "${userMessage.content}". Este é um exemplo de resposta simulada. Em produção, isso seria conectado à API n8n.`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsSending(false);
        
        // Save session after bot response
        setTimeout(() => {
          saveCurrentSession();
        }, 300);
      }, 1500);
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Não foi possível processar sua mensagem.",
        variant: "destructive",
      });
      setIsSending(false);
    }
  };
  
  const handleLogout = () => {
    // Save current session before logout
    saveCurrentSession();
    
    logout();
    navigate('/admin/login');
    toast({
      title: "Logout realizado",
      description: "Você saiu da área administrativa.",
    });
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sessions sidebar */}
      <div className={`border-r border-border h-full w-[280px] ${showSessions ? 'block' : 'hidden'} md:block bg-sidebar transition-all ease-in-out duration-300`}>
        <div className="p-4 border-b border-border bg-sidebar">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Conversas</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleStartNewSession}
              className="h-8 px-2"
            >
              <span className="text-xs">Nova conversa</span>
            </Button>
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-112px)]">
          {chatSessions.length > 0 ? (
            <ul>
              {chatSessions.map((session) => (
                <li 
                  key={session.id}
                  onClick={() => handleSessionSelect(session.id)}
                  className={`
                    p-3 border-b border-border/50 cursor-pointer flex justify-between
                    ${sessionId === session.id ? 'bg-muted/50' : 'hover:bg-muted/30'}
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="text-xs text-muted-foreground">
                      {new Date(session.timestamp).toLocaleDateString('pt-BR')} · {new Date(session.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-sm truncate">
                      {session.lastMessage}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleDeleteSession(session.id, e)}
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:opacity-100"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span className="sr-only">Excluir</span>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-muted-foreground text-sm">
              Nenhuma conversa salva
            </div>
          )}
        </div>
        
        <div className="border-t border-border p-3 bg-sidebar">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              {username}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="h-8 px-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Sair</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Chat area */}
      <div className="flex-1 flex flex-col h-full">
        <header className="border-b border-border p-4 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden h-8 w-8 p-0"
                onClick={() => setShowSessions(!showSessions)}
              >
                {showSessions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <span className="sr-only">Toggle sidebar</span>
              </Button>
              
              <h2 className="font-medium">Chat Administrativo</h2>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleStartNewSession}
                className="h-8"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                <span className="text-xs">Nova conversa</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
                className="h-8"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span className="text-xs">Voltar ao site</span>
              </Button>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="flex flex-col items-center gap-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <p className="text-muted-foreground">Carregando mensagens...</p>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                  <div className="text-xs opacity-70 mt-1 text-right">
                    {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isSending && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <Separator />
        
        <form onSubmit={handleSendMessage} className="p-4 bg-background">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              disabled={isSending}
              className="flex-1"
              autoFocus
            />
            <Button 
              type="submit" 
              disabled={isSending || !message.trim()}
            >
              <Send className="h-4 w-4 mr-1" />
              <span>Enviar</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminChat;
