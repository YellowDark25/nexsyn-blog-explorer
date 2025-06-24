import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Post } from '@/types/Post';
import { Badge } from '@/components/ui/badge';
import { formatDate, slugToReadable } from '@/utils/formatUtils';
import OptimizedImage from './OptimizedImage';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = memo(({ post }) => {
  const formattedDate = formatDate(post.data_publicacao);
  const formattedCategory = slugToReadable(post.categoria);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group bg-card rounded-xl h-full flex flex-col border border-border/20 shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 overflow-hidden hover:-translate-y-1"
      whileHover={{ y: -4 }}
    >
      {/* Post image */}
      <Link to={`/posts/${post.slug}`} className="block overflow-hidden relative">
        <div className="aspect-video overflow-hidden relative">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Category badge */}
          <div className="absolute bottom-4 left-4 z-20">
            <Badge 
              variant="secondary" 
              className="bg-primary/90 text-primary-foreground hover:bg-primary/100 backdrop-blur-sm shadow-lg border-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/20"
            >
              {formattedCategory}
            </Badge>
          </div>
          
          {/* Optimized post image */}
          <OptimizedImage
            src={post.imagem_destaque}
            alt={post.titulo}
            width={600}
            height={338}
            className="w-full h-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
          />
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-6 sm:p-7 flex-grow flex flex-col bg-background/80 backdrop-blur-sm">
        {/* Metadata */}
        <div className="flex items-center text-xs text-muted-foreground mb-4 gap-3">
          <div className="flex items-center text-xs bg-muted/40 px-2.5 py-1 rounded-full">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary/80" />
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center text-xs bg-muted/40 px-2.5 py-1 rounded-full">
            <Tag className="h-3.5 w-3.5 mr-1.5 text-primary/80" />
            <Link 
              to={`/blog/${post.categoria}`} 
              className="font-medium hover:text-primary transition-colors"
            >
              {formattedCategory}
            </Link>
          </div>
        </div>
        
        {/* Title */}
        <Link to={`/posts/${post.slug}`} className="group block mt-1">
          <motion.h2 
            className="text-xl sm:text-2xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 font-poppins leading-tight"
            whileHover={{ color: 'hsl(var(--primary))' }}
          >
            {post.titulo}
          </motion.h2>
        </Link>
        
        {/* Excerpt */}
        <p className="text-muted-foreground mb-5 line-clamp-3 leading-relaxed">
          {post.resumo}
        </p>
        
        {/* Read more */}
        <div className="mt-auto">
          <Link 
            to={`/posts/${post.slug}`}
            className="inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors group/link"
            aria-label={`Leia mais sobre ${post.titulo}`}
          >
            Leia mais
            <motion.svg 
              className="ml-2 h-4 w-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
});

PostCard.displayName = 'PostCard';

export default PostCard;
