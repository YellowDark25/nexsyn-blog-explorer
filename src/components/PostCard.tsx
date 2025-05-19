
import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Post } from '@/types/Post';
import { slugToReadable } from '@/utils/formatUtils';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formattedDate = format(parseISO(post.data_publicacao), 'dd MMM yyyy', { locale: ptBR });
  const formattedCategory = slugToReadable(post.categoria);
  
  return (
    <article className="bg-card rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] h-full flex flex-col blog-card-hover hover:border-primary/50 hover:border">
      <Link to={`/posts/${post.slug}`} className="block overflow-hidden">
        <div className="h-48 overflow-hidden blog-card-image">
          <img 
            src={post.imagem_destaque} 
            alt={post.titulo}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <Link to={`/blog/${post.categoria}`} className="hover:text-primary">
            {formattedCategory}
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
        
        <div className="mt-auto">
          <Link 
            to={`/posts/${post.slug}`}
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            Leia mais
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
