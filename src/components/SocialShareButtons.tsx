
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import SocialShareGroup from './share/SocialShareGroup';
import EngagementGroup from './share/EngagementGroup';

interface SocialShareButtonsProps {
  title: string;
  url: string;
  postId: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ title, url, postId }) => {
  return (
    <div className="flex items-center gap-2 my-4">
      <TooltipProvider>
        <SocialShareGroup title={title} url={url} postId={postId} />
        <EngagementGroup title={title} url={url} postId={postId} />
      </TooltipProvider>
    </div>
  );
};

export default SocialShareButtons;
