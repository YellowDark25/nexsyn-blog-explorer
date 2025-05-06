
import React, { useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from '@/pages/AdminChat';

interface ChatMessagesProps {
  messages: Message[];
  loading?: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, loading = false }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [messages]);
  
  if (messages.length === 0 && !loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center text-muted-foreground">
          <h3 className="text-lg font-medium">Bem-vindo ao Chat da IA Nexsyn</h3>
          <p className="mt-2">Digite uma mensagem para começar uma conversa ou use os botões acima para ações específicas.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 overflow-hidden relative">
      <ScrollArea className="h-full" ref={scrollAreaRef}>
        <div className="p-4 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] md:max-w-[70%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-nexsyn-orange text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="text-sm">{message.content}</div>
                <div className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] md:max-w-[70%] rounded-lg p-3 bg-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  <span className="text-sm text-gray-500 ml-2">IA digitando...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatMessages;
