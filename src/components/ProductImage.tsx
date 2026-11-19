import { useState } from 'react';
import { Wind } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Wind className="w-10 h-10 mb-2 text-slate-300" strokeWidth={1.5} />
        <span className="text-xs font-medium text-slate-500 text-center line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      loading="lazy"
    />
  );
}
