
import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Post } from '../types/Post';

interface BlogCardProps {
  post: Post;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formattedDate = format(parseISO(post.data_publicacao), 'dd MMM yyyy', { locale: ptBR });
  
  return (
    <div className="blog-card-hover bg-card rounded-md shadow-md overflow-hidden animate-fade-in">
      <Link to={`/posts/${post.slug}`} className="block">
        <div className="blog-card-image">
          <img 
            src={post.imagem_destaque} 
            alt={post.titulo} 
            className="w-full h-48 object-cover"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <span>{formattedDate}</span>
        </div>
        <Link to={`/posts/${post.slug}`}>
          <h3 className="text-xl font-bold hover:text-primary animate-hover mb-2">{post.titulo}</h3>
        </Link>
        <p className="text-muted-foreground line-clamp-3 mb-4">{post.resumo}</p>
        <Link to={`/posts/${post.slug}`} className="inline-block text-primary font-medium hover:underline">
          Continuar lendo
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
