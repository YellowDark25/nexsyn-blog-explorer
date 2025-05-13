
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  aspectRatio?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  placeholderClassName,
  aspectRatio,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>('');
  
  // Usamos essa ref para manter o estado correto durante a transição
  const isCurrentSource = React.useRef<string>(src);
  
  useEffect(() => {
    // Reset state when src changes and track current source
    if (isCurrentSource.current !== src) {
      setIsLoaded(false);
      isCurrentSource.current = src;
    }
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      // Verificamos se ainda é a mesma fonte antes de atualizar o estado
      if (isCurrentSource.current === src) {
        setImgSrc(src);
        setIsLoaded(true);
      }
    };
    
    img.onerror = () => {
      console.error(`Error loading image: ${src}`);
      // Verificamos se ainda é a mesma fonte antes de atualizar o estado
      if (isCurrentSource.current === src) {
        setImgSrc('/placeholder.svg');
        setIsLoaded(true);
      }
    };
    
    // Start loading the image
    setImgSrc(src);
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);
  
  // Se temos uma proporção específica, usamos o componente AspectRatio
  const ImageContent = (
    <>
      {!isLoaded && (
        <div 
          className={cn(
            "bg-muted animate-pulse rounded-lg transition-opacity", 
            placeholderClassName
          )}
          style={{ 
            width: props.width ? `${props.width}px` : '100%',
            height: props.height ? `${props.height}px` : '300px',
            opacity: isLoaded ? 0 : 1
          }}
        />
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        className={cn(
          className,
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => {
          // Pequeno delay para garantir transição suave
          setTimeout(() => {
            if (isCurrentSource.current === src) {
              setIsLoaded(true);
            }
          }, 50);
        }}
        {...props}
      />
    </>
  );
  
  if (aspectRatio) {
    return (
      <AspectRatio ratio={aspectRatio} className="relative overflow-hidden rounded-lg">
        {ImageContent}
      </AspectRatio>
    );
  }
  
  return (
    <div className="relative">
      {ImageContent}
    </div>
  );
};

export default OptimizedImage;
