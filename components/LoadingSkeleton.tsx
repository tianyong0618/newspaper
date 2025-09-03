import React from 'react';

const SkeletonBlock: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`bg-gray-200 rounded animate-pulse ${className || ''}`}></div>
);

const SkeletonSection: React.FC<{ children: React.ReactNode, className?: string}> = ({ children, className }) => (
    <div className={`p-4 border-2 border-dotted border-gray-200 rounded-lg space-y-3 ${className || ''}`}>
        {children}
    </div>
);

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="bg-amber-50/50 p-6 rounded-lg shadow-lg border-4 border-dashed border-gray-200">
        {/* Main Title Skeleton */}
        <div className="text-center mb-8 pb-4 border-b-4 border-double border-gray-200">
            <SkeletonBlock className="h-12 w-3/4 mx-auto" />
            <SkeletonBlock className="h-6 w-1/2 mx-auto mt-4" />
        </div>

        {/* Dynamic Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Article Skeleton */}
            <SkeletonSection className="md:col-span-2">
                <SkeletonBlock className="h-8 w-1/3" />
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-5/6" />
                <SkeletonBlock className="h-4 w-full" />
            </SkeletonSection>

            {/* Introduction Skeleton */}
            <SkeletonSection className="md:col-span-1">
                <SkeletonBlock className="h-8 w-1/2" />
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-11/12" />
            </SkeletonSection>
            
            {/* Poem Skeleton */}
            <SkeletonSection className="md:col-span-2">
                <SkeletonBlock className="h-8 w-1/3" />
                <SkeletonBlock className="h-4 w-3/4 mx-auto" />
                <SkeletonBlock className="h-4 w-3/4 mx-auto" />
                <SkeletonBlock className="h-4 w-1/2 ml-auto" />
            </SkeletonSection>
            
            {/* Knowledge Corner Skeleton */}
            <SkeletonSection className="md:col-span-1">
                <SkeletonBlock className="h-8 w-1/2" />
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-5/6" />
            </SkeletonSection>
            
            {/* Illustration Ideas Skeleton */}
            <SkeletonSection className="md:col-span-3">
                 <SkeletonBlock className="h-8 w-1/4 mb-2" />
                 <div className="flex justify-center">
                    <div className="space-y-2 w-full max-w-sm">
                        <SkeletonBlock className="w-full aspect-square" />
                        <SkeletonBlock className="h-3 w-full" />
                    </div>
                 </div>
            </SkeletonSection>

             {/* Slogans Skeleton */}
             <SkeletonSection className="md:col-span-3">
                 <SkeletonBlock className="h-8 w-1/4" />
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SkeletonBlock className="h-5 w-3/4" />
                    <SkeletonBlock className="h-5 w-3/4" />
                 </div>
            </SkeletonSection>
        </div>
    </div>
  );
};

export default LoadingSkeleton;