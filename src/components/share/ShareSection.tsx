
import React from 'react';
import SocialShareButtons from '../SocialShareButtons';

interface ShareSectionProps {
  title: string;
  url: string;
  postId: string;
  showHeading?: boolean;
}

const ShareSection: React.FC<ShareSectionProps> = ({ 
  title, 
  url, 
  postId, 
  showHeading = false 
}) => {
  return (
    <div className={showHeading ? "my-8 pt-6 border-t border-border" : "my-4"}>
      {showHeading && (
        <h3 className="text-lg font-semibold mb-4">Compartilhe este artigo</h3>
      )}
      <SocialShareButtons 
        title={title} 
        url={url} 
        postId={postId} 
      />
    </div>
  );
};

export default ShareSection;
