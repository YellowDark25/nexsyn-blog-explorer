
import React from 'react';
import SocialShareButton from './SocialShareButton';
import SocialIcon from './SocialIcons';
import { createShareUrl, openShareDialog } from '@/utils/shareUtils';
import { useAnalytics } from '@/hooks/use-analytics';

interface SocialShareGroupProps {
  title: string;
  url: string;
  postId: string;
}

const SocialShareGroup: React.FC<SocialShareGroupProps> = ({ 
  title, 
  url, 
  postId 
}) => {
  const analytics = useAnalytics();

  const handleShare = (platform: string) => {
    const shareUrl = createShareUrl(platform, url, title);
    
    // Track the share event
    analytics.trackEvent({
      type: 'share',
      label: platform,
      metadata: { 
        postId,
        title,
        platform
      }
    });

    openShareDialog(shareUrl);
  };

  const socialPlatforms = [
    { 
      id: 'facebook', 
      label: 'Compartilhar no Facebook',
      icon: <SocialIcon type="facebook" /> 
    },
    { 
      id: 'twitter',
      label: 'Compartilhar no Twitter', 
      icon: <SocialIcon type="twitter" /> 
    },
    { 
      id: 'linkedin',
      label: 'Compartilhar no LinkedIn', 
      icon: <SocialIcon type="linkedin" /> 
    },
    { 
      id: 'whatsapp',
      label: 'Compartilhar no WhatsApp', 
      icon: <SocialIcon type="whatsapp" /> 
    }
  ];

  return (
    <div className="flex items-center space-x-2 border-r pr-4 border-border">
      {socialPlatforms.map((platform) => (
        <SocialShareButton
          key={platform.id}
          platform={platform.id}
          label={platform.label}
          icon={platform.icon}
          onClick={() => handleShare(platform.id)}
        />
      ))}
    </div>
  );
};

export default SocialShareGroup;
