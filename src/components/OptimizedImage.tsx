
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  placeholderClassName,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>('');
  
  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      console.error(`Error loading image: ${src}`);
      setImgSrc('/placeholder.svg');
      setIsLoaded(true);
    };
    
    // Start loading the image
    setImgSrc(src);
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);
  
  return (
    <>
      {!isLoaded && (
        <div 
          className={cn(
            "bg-muted animate-pulse rounded-lg", 
            placeholderClassName
          )}
          style={{ 
            width: props.width ? `${props.width}px` : '100%',
            height: props.height ? `${props.height}px` : '300px'
          }}
        />
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        className={cn(
          className,
          !isLoaded && "hidden"
        )}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </>
  );
};

export default OptimizedImage;
