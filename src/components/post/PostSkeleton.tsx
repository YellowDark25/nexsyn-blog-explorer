
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PostSkeleton: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-2/3 mb-4" />
        <Skeleton className="h-6 w-1/3 mb-8" />
        <Skeleton className="h-64 w-full mb-8" />
        <div className="flex flex-col space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostSkeleton;
