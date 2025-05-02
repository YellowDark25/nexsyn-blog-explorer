
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Post } from '../types/Post';

interface BlogCardProps {
  post: Post;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formattedDate = format(new Date(post.date), 'dd MMM yyyy', { locale: ptBR });
  
  return (
    <div className="blog-card-hover bg-card rounded-md shadow-md overflow-hidden animate-fade-in" style={{ animationDelay: `${post.id * 100}ms` }}>
      <Link to={`/post/${post.id}`} className="block">
        <div className="blog-card-image">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-48 object-cover"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <span>{formattedDate}</span>
        </div>
        <Link to={`/post/${post.id}`}>
          <h3 className="text-xl font-bold hover:text-primary animate-hover mb-2">{post.title}</h3>
        </Link>
        <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
        <Link to={`/post/${post.id}`} className="inline-block text-primary font-medium hover:underline">
          Continuar lendo
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
