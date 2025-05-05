
import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Post } from '../types/Post';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ArticleCardProps {
  post: Post;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  const formattedDate = format(parseISO(post.data_publicacao), 'dd MMM yyyy', { locale: ptBR });
  
  return (
    <Card className="blog-card-hover bg-card overflow-hidden h-full flex flex-col animate-fade-in">
      <Link to={`/posts/${post.slug}`} className="block overflow-hidden">
        <div className="blog-card-image h-48">
          <img 
            src={post.imagem_destaque} 
            alt={post.titulo} 
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <CardContent className="flex-grow p-5">
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{post.categoria}</span>
        </div>
        <Link to={`/posts/${post.slug}`}>
          <h3 className="text-xl font-bold hover:text-primary animate-hover mb-3 line-clamp-2">{post.titulo}</h3>
        </Link>
        <p className="text-muted-foreground line-clamp-3 mb-4">{post.resumo}</p>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0">
        <Link to={`/posts/${post.slug}`} className="inline-block text-primary font-medium hover:underline">
          Leia mais
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
