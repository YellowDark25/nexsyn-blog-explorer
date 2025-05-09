
import React from 'react';
import { Share2, MessageSquare, ThumbsUp, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAnalytics } from '@/hooks/use-analytics';

interface SocialShareButtonsProps {
  title: string;
  url: string;
  postId: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ title, url, postId }) => {
  const analytics = useAnalytics();

  const handleShare = (platform: string) => {
    let shareUrl = '';
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedTitle} ${encodedUrl}`;
        break;
      default:
        shareUrl = '';
    }

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

    // Open share dialog in new window
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=450');
    }
  };

  return (
    <div className="flex items-center gap-2 my-4">
      <TooltipProvider>
        <div className="flex items-center space-x-2 border-r pr-4 border-border">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleShare('facebook')} 
                className="text-muted-foreground hover:text-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Compartilhar no Facebook</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Compartilhar no Facebook</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleShare('twitter')} 
                className="text-muted-foreground hover:text-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Compartilhar no Twitter</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Compartilhar no Twitter</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleShare('linkedin')} 
                className="text-muted-foreground hover:text-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="lucide lucide-linkedin">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">Compartilhar no LinkedIn</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Compartilhar no LinkedIn</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleShare('whatsapp')} 
                className="text-muted-foreground hover:text-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="lucide lucide-whatsapp">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.882 11.882 0 005.7 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                </svg>
                <span className="sr-only">Compartilhar no WhatsApp</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Compartilhar no WhatsApp</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                onClick={() => {
                  analytics.trackEvent({
                    type: 'engagement',
                    label: 'comment_button_click',
                    metadata: { postId }
                  });
                }}
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">Comentar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Deixe um comentário</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                onClick={() => {
                  analytics.trackEvent({
                    type: 'engagement',
                    label: 'like_button_click',
                    metadata: { postId }
                  });
                }}
              >
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm">Curtir</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Curtir este artigo</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                onClick={() => {
                  analytics.trackEvent({
                    type: 'engagement',
                    label: 'save_button_click',
                    metadata: { postId }
                  });
                }}
              >
                <Bookmark className="h-4 w-4" />
                <span className="text-sm">Salvar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Salvar para ler depois</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                onClick={() => {
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
                }}
              >
                <Share2 className="h-4 w-4" />
                <span className="text-sm">Compartilhar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Compartilhar</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default SocialShareButtons;
