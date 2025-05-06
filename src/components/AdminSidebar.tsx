
import React from 'react';
import { MessageSquare, PlusCircle, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatSession {
  id: string;
  name: string;
  timestamp: Date;
  messages: any[];
}

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onSelectSession: (sessionId: string) => void;
  onNewChat: () => void;
  onLogout: () => void;
}

export const Sidebar = ({ 
  sessions, 
  currentSessionId, 
  onSelectSession, 
  onNewChat,
  onLogout
}: SidebarProps) => {
  return (
    <div className="w-64 h-full bg-nexsyn-darkBlue border-r border-border flex flex-col">
      <div className="p-4 flex justify-between items-center">
        <img 
          src="/lovable-uploads/2413e882-78d7-43eb-8317-c8ec49076e7c.png" 
          alt="Nexsyn Logo" 
          className="h-6" 
        />
      </div>
      
      <Button 
        className="mx-4 bg-nexsyn-orange hover:bg-nexsyn-orange/90 flex items-center gap-2"
        onClick={onNewChat}
      >
        <PlusCircle size={16} />
        Nova conversa
      </Button>
      
      <ScrollArea className="flex-1 mt-4">
        <div className="p-4 space-y-2">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={`w-full text-left p-2 rounded-md flex items-center gap-2 transition-colors ${
                currentSessionId === session.id 
                  ? 'bg-secondary text-secondary-foreground' 
                  : 'text-white/70 hover:bg-secondary/10'
              }`}
            >
              <MessageSquare size={16} />
              <div className="truncate text-sm">
                {session.name}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-border/40">
        <Button 
          variant="outline" 
          className="w-full border-white/20 text-white/70 hover:text-white"
          onClick={onLogout}
        >
          <LogOut size={16} className="mr-2" />
          Sair
        </Button>
      </div>
    </div>
  );
};
