import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  width?: number;
  height?: number;
}

export function ImageWithSkeleton({
  src,
  alt,
  className = '',
  skeletonClassName = '',
  width,
  height
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && !hasError && (
        <Skeleton 
          className={`absolute inset-0 ${skeletonClassName}`} 
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
