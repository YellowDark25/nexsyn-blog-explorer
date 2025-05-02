
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Post } from '../types/Post';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ArticleCardProps {
  post: Post;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  const formattedDate = format(new Date(post.date), 'dd MMM yyyy', { locale: ptBR });
  
  return (
    <Card className="blog-card-hover bg-card overflow-hidden h-full flex flex-col animate-fade-in">
      <Link to={`/post/${post.id}`} className="block overflow-hidden">
        <div className="blog-card-image h-48">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <CardContent className="flex-grow p-5">
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{post.category.name}</span>
        </div>
        <Link to={`/post/${post.id}`}>
          <h3 className="text-xl font-bold hover:text-primary animate-hover mb-3 line-clamp-2">{post.title}</h3>
        </Link>
        <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0">
        <Link to={`/post/${post.id}`} className="inline-block text-primary font-medium hover:underline">
          Leia mais
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
