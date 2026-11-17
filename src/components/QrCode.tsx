import { useMemo } from 'react';
import { encodeQr } from '../lib/qr';

interface QrCodeProps {
  value: string;
  className?: string;
  title?: string;
}

const QUIET = 2;

// Uvijek crno na bijelom (štampa i čitači), bez obzira na temu sajta.
export default function QrCode({ value, className, title }: QrCodeProps) {
  const { size, d } = useMemo(() => {
    const m = encodeQr(value);
    let path = '';
    m.forEach((row, y) => row.forEach((dark, x) => dark && (path += `M${x + QUIET} ${y + QUIET}h1v1h-1z`)));
    return { size: m.length + QUIET * 2, d: path };
  }, [value]);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      shapeRendering="crispEdges"
    >
      <rect width={size} height={size} fill="#fff" />
      <path d={d} fill="#111827" />
    </svg>
  );
}
