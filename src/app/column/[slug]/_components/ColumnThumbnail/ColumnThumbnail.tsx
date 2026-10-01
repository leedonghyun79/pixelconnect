'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './ColumnThumbnail.module.css';

interface ColumnThumbnailProps {
  src: string;
  alt: string;
}

export default function ColumnThumbnail({ src, alt }: ColumnThumbnailProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.container}>
      {isLoading && <div className={styles.skeleton} />}
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className={styles.image}
        priority
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}
