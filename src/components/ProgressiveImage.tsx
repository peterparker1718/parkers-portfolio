"use client";

import { useState, useRef, useCallback } from "react";

/**
 * ProgressiveImage — Loads images with blur-up progressive enhancement.
 *
 * 1. Shows a low-res placeholder (CSS blur on tiny inline)
 * 2. Loads full-resolution image in background
 * 3. Crossfades when loaded
 */
interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function ProgressiveImage({
  src,
  alt,
  className = "",
  width,
  height,
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      data-testid="progressive-image"
    >
      {/* Blur placeholder */}
      <div
        className={`absolute inset-0 bg-zinc-800 transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        data-testid="image-placeholder"
      />

      {/* Error state */}
      {error && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-zinc-600 text-xs"
          data-testid="image-error"
        >
          Failed to load
        </div>
      )}

      {/* Full-resolution image */}
      {!error && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          data-testid="image-full"
        />
      )}
    </div>
  );
}
