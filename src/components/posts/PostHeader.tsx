
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { formatDate } from '@/utils/formatUtils';

interface PostHeaderProps {
  title: string;
  date: string;
  readingTime: number;
  category: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ 
  title, 
  date, 
  readingTime, 
  category 
}) => {
  return (
    <>
      <Link 
        to="/blog" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Voltar ao blog
      </Link>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
      
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <span>{formatDate(date)}</span>
        <span className="mx-2">•</span>
        <span>{readingTime} min de leitura</span>
        <span className="mx-2">•</span>
        <span>
          <Link 
            to={`/blog/${category}`} 
            className="hover:text-primary hover:underline"
          >
            {category}
          </Link>
        </span>
      </div>
    </>
  );
};

export default PostHeader;
