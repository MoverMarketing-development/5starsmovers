"use client";

import Image from "next/image";
import { useState } from "react";

type RemoteCityImageProps = {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
};

export default function RemoteCityImage({
  src,
  fallbackSrc,
  alt,
  className,
}: RemoteCityImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={1600}
      height={1000}
      className={className}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
