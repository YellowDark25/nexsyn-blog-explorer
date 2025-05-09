
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface EngagementButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const EngagementButton: React.FC<EngagementButtonProps> = ({ 
  icon, 
  label, 
  onClick 
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary"
          onClick={onClick}
        >
          {icon}
          <span className="text-sm">{label}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default EngagementButton;
