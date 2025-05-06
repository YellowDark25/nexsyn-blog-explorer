
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { SendHorizonal } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <div className="border-t bg-card p-4">
      <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-1 bg-background border border-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-md py-2 px-3"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
        />
        <Button 
          type="submit" 
          className="bg-nexsyn-orange hover:bg-nexsyn-orange/90"
          disabled={!message.trim() || disabled}
        >
          <SendHorizonal size={18} />
          <span className="sr-only">Enviar</span>
        </Button>
      </form>
      {disabled && <p className="text-xs text-muted-foreground mt-2">Aguarde a resposta da IA...</p>}
    </div>
  );
};

export default ChatInput;
