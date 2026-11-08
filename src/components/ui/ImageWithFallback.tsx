import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  aspectRatio = 'aspect-[16/10]',
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-brand-light ${aspectRatio} ${containerClassName}`}
    >
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-brand-light via-brand-light-border to-brand-light animate-pulse" />
      )}

      {/* Fallback Display if network fails */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-brand-navy text-white">
          <div className="w-12 h-12 rounded-full border border-brand-sky/40 flex items-center justify-center text-brand-sky mb-3">
            ✳
          </div>
          <span className="text-xs font-mono text-brand-sky uppercase tracking-wider block mb-1">
            PVC SMART SERVICES
          </span>
          <p className="text-xs text-brand-sky-pale max-w-xs">{alt}</p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
