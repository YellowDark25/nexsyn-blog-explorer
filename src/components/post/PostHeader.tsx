
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Post } from '@/types/Post';
import { formatDate } from '@/utils/formatUtils';

interface PostHeaderProps {
  post: Post;
}

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  return (
    <>
      <Link 
        to="/blog" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Voltar ao blog
      </Link>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.titulo}</h1>
      
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <span>{formatDate(post.data_publicacao)}</span>
        <span className="mx-2">•</span>
        <span>5 min de leitura</span>
        <span className="mx-2">•</span>
        <span>
          <Link 
            to={`/blog/${post.categoria}`} 
            className="hover:text-primary hover:underline"
          >
            {post.categoria}
          </Link>
        </span>
      </div>
    </>
  );
};

export default PostHeader;
