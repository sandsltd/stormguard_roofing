'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export default function SafeImage({ src, fallbackSrc = '/images/areas/residential1.jpg', alt, ...rest }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  // This will run client-side only
  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
} 