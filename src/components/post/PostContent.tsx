
import React from 'react';

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  return (
    <div 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default PostContent;
