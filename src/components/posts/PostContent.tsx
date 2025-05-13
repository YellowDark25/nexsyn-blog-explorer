
import React from 'react';
import OptimizedImage from '@/components/OptimizedImage';
import PostHeader from './PostHeader';
import PostAuthor from './PostAuthor';
import { Post } from '@/types/Post';

interface PostContentProps {
  post: Post;
  readingTime: number;
}

const PostContent: React.FC<PostContentProps> = ({ post, readingTime }) => {
  return (
    <div className="lg:w-2/3">
      <PostHeader 
        title={post.titulo} 
        date={post.data_publicacao}
        readingTime={readingTime}
        category={post.categoria}
      />
      
      <div className="mb-8">
        <OptimizedImage 
          src={post.imagem_destaque} 
          alt={post.titulo}
          className="w-full h-auto rounded-lg object-cover"
          placeholderClassName="h-[300px] md:h-[400px] lg:h-[500px]"
          style={{ maxHeight: "500px" }}
        />
      </div>
      
      <div className="prose prose-lg max-w-none"
           dangerouslySetInnerHTML={{ __html: post.conteudo }}
      />
      
      <PostAuthor />
    </div>
  );
};

export default PostContent;
