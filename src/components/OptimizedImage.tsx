
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
  
  // Usamos cache para evitar recarregamento de imagens já vistas
  const cachedImages = React.useRef<Set<string>>(new Set());
  
  useEffect(() => {
    // Se a imagem já estiver em cache, considere-a carregada
    if (cachedImages.current.has(src)) {
      setImgSrc(src);
      setIsLoaded(true);
      return;
    }
    
    // Para novas imagens, resetamos o estado
    setIsLoaded(false);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      // Adiciona ao cache
      cachedImages.current.add(src);
      setImgSrc(src);
      // Pequeno delay para garantir transição suave
      setTimeout(() => {
        setIsLoaded(true);
      }, 50);
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
            height: props.height ? `${props.height}px` : 'auto',
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
