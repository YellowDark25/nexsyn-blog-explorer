
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PostDetailSkeleton: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Skeleton className="h-6 w-40 mb-4" />
            <Skeleton className="h-12 w-full mb-3" />
            <Skeleton className="h-5 w-56 mb-8" />
            <Skeleton className="h-64 w-full mb-8" />
            <div className="flex flex-col space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/3">
            <Skeleton className="h-10 w-full mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostDetailSkeleton;
