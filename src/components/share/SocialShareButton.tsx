
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SocialShareButtonProps {
  platform: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({ 
  platform, 
  label, 
  icon, 
  onClick 
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClick} 
          className="text-muted-foreground hover:text-primary"
        >
          {icon}
          <span className="sr-only">{label}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SocialShareButton;
