
import React from 'react';

const PostAuthor: React.FC = () => {
  return (
    <div className="flex items-center mt-8 pt-6 border-t border-border">
      <div className="mr-4">
        <img 
          src="/lovable-uploads/2413e882-78d7-43eb-8317-c8ec49076e7c.png" 
          alt="NEXSYN"
          className="h-12 w-12 rounded-full object-cover"
        />
      </div>
      <div>
        <p className="font-medium">NEXSYN</p>
        <p className="text-sm text-muted-foreground">Equipe NEXSYN</p>
      </div>
    </div>
  );
};

export default PostAuthor;
