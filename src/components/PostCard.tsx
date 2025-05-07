
import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Post } from '@/types/Post';
import { slugToReadable } from '@/utils/formatUtils';
import { Calendar, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formattedDate = format(parseISO(post.data_publicacao), 'dd MMM yyyy', { locale: ptBR });
  const formattedCategory = slugToReadable(post.categoria);
  
  return (
    <article className="bg-card rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] h-full flex flex-col blog-card-hover border border-transparent hover:border-primary/20">
      <Link to={`/posts/${post.slug}`} className="block overflow-hidden">
        <div className="h-48 overflow-hidden blog-card-image relative">
          <img 
            src={post.imagem_destaque} 
            alt={post.titulo}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      </Link>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <Link to={`/blog/${post.categoria}`} className="flex items-center group">
            <Tag className="h-3.5 w-3.5 mr-1.5 group-hover:text-primary transition-colors" />
            <Badge variant="outline" className="px-2 py-0 text-xs bg-muted/30 hover:bg-primary/10 hover:text-primary transition-colors">
              {formattedCategory}
            </Badge>
          </Link>
        </div>
        
        <Link to={`/posts/${post.slug}`} className="group">
          <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 font-poppins">
            {post.titulo}
          </h2>
        </Link>
        
        <p className="text-muted-foreground mb-4 line-clamp-3 font-sansation">
          {post.resumo}
        </p>
        
        <div className="mt-auto pt-4 border-t border-border/20">
          <Link 
            to={`/posts/${post.slug}`}
            className="inline-flex items-center text-primary font-medium hover:underline transition-all relative overflow-hidden group"
          >
            <span>Leia mais</span>
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
