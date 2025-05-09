
import React from 'react';
import { MessageSquare, ThumbsUp, Bookmark, Share2 } from 'lucide-react';
import EngagementButton from './EngagementButton';
import { useAnalytics } from '@/hooks/use-analytics';

interface EngagementGroupProps {
  title: string;
  url: string;
  postId: string;
}

const EngagementGroup: React.FC<EngagementGroupProps> = ({ title, url, postId }) => {
  const analytics = useAnalytics();

  const handleNativeShare = () => {
    analytics.trackEvent({
      type: 'share',
      label: 'share_button_click',
      metadata: { postId }
    });
    
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url
      }).catch(err => console.error('Erro ao compartilhar:', err));
    }
  };

  const engagementButtons = [
    {
      icon: <MessageSquare className="h-4 w-4" />,
      label: "Comentar",
      tooltipText: "Deixe um comentário",
      onClick: () => {
        analytics.trackEvent({
          type: 'engagement',
          label: 'comment_button_click',
          metadata: { postId }
        });
      }
    },
    {
      icon: <ThumbsUp className="h-4 w-4" />,
      label: "Curtir",
      tooltipText: "Curtir este artigo",
      onClick: () => {
        analytics.trackEvent({
          type: 'engagement',
          label: 'like_button_click',
          metadata: { postId }
        });
      }
    },
    {
      icon: <Bookmark className="h-4 w-4" />,
      label: "Salvar",
      tooltipText: "Salvar para ler depois",
      onClick: () => {
        analytics.trackEvent({
          type: 'engagement',
          label: 'save_button_click',
          metadata: { postId }
        });
      }
    },
    {
      icon: <Share2 className="h-4 w-4" />,
      label: "Compartilhar",
      tooltipText: "Compartilhar",
      onClick: handleNativeShare
    }
  ];

  return (
    <div className="flex items-center space-x-2">
      {engagementButtons.map((button, index) => (
        <EngagementButton
          key={index}
          icon={button.icon}
          label={button.label}
          onClick={button.onClick}
        />
      ))}
    </div>
  );
};

export default EngagementGroup;
