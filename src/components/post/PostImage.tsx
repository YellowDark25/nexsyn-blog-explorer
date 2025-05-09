
import React from 'react';

interface PostImageProps {
  src: string;
  alt: string;
}

const PostImage: React.FC<PostImageProps> = ({ src, alt }) => {
  return (
    <div className="mb-8">
      <img 
        src={src} 
        alt={alt}
        className="w-full h-auto rounded-lg object-cover"
        style={{ maxHeight: "500px" }}
      />
    </div>
  );
};

export default PostImage;
