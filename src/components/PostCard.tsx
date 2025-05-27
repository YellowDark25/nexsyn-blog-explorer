
import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Post } from '@/types/Post';
import { slugToReadable } from '@/utils/formatUtils';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formattedDate = format(parseISO(post.data_publicacao), 'dd MMM yyyy', { locale: ptBR });
  const formattedCategory = slugToReadable(post.categoria);
  
  return (
    <motion.article 
      className="group bg-card rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col border border-border/20 hover:border-primary/20 relative"
      whileHover={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      
      {/* Image container */}
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
          
          {/* Post image */}
          <motion.img 
            src={post.imagem_destaque} 
            alt={post.titulo}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            loading="lazy"
            width={600}
            height={338}
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
        <div className="mt-auto pt-4 border-t border-border/10">
          <Link 
            to={`/posts/${post.slug}`}
            className="inline-flex items-center text-sm font-medium text-primary group w-fit"
          >
            <span className="relative after:absolute after:content-[''] after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:scale-x-0 after:origin-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-left">
              Continuar lendo
            </span>
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;
