// Pikselske ikone sa markolosic.github.io (mreža 9×9).
const paths = {
  mark: 'M8 1h1v1h-1zM7 2h2v1h-2zM0 3h1v1h-1zM6 3h2v1h-2zM0 4h2v1h-2zM5 4h2v1h-2zM1 5h2v1h-2zM4 5h2v1h-2zM2 6h3v1h-3zM3 7h1v1h-1z',
  arrow: 'M5 1h1v1h-1zM6 2h1v1h-1zM7 3h1v1h-1zM0 4h9v1h-9zM7 5h1v1h-1zM6 6h1v1h-1zM5 7h1v1h-1z',
  back: 'M3 1h1v1h-1zM2 2h1v1h-1zM1 3h1v1h-1zM0 4h9v1h-9zM1 5h1v1h-1zM2 6h1v1h-1zM3 7h1v1h-1z',
  moon: 'M3 0h4v1h-4zM2 1h2v1h-2zM1 2h2v1h-2zM1 3h2v1h-2zM1 4h2v1h-2zM1 5h2v1h-2zM8 5h1v1h-1zM2 6h2v1h-2zM7 6h2v1h-2zM3 7h5v1h-5z',
  sun: 'M4 0h1v1h-1zM1 1h1v1h-1zM7 1h1v1h-1zM3 2h3v1h-3zM2 3h5v1h-5zM0 4h1v1h-1zM2 4h5v1h-5zM8 4h1v1h-1zM2 5h5v1h-5zM3 6h3v1h-3zM1 7h1v1h-1zM7 7h1v1h-1zM4 8h1v1h-1z',
  github:
    'M1 0h1v1h-1zM7 0h1v1h-1zM1 1h2v1h-2zM6 1h2v1h-2zM1 2h7v1h-7zM0 3h9v1h-9zM0 4h2v1h-2zM3 4h3v1h-3zM7 4h2v1h-2zM0 5h9v1h-9zM1 6h7v1h-7zM2 7h1v1h-1zM6 7h1v1h-1zM2 8h1v1h-1zM6 8h1v1h-1z',
  linkedin:
    'M0 0h9v1h-9zM0 1h1v1h-1zM2 1h7v1h-7zM0 2h9v1h-9zM0 3h1v1h-1zM2 3h1v1h-1zM4 3h1v1h-1zM7 3h2v1h-2zM0 4h1v1h-1zM2 4h1v1h-1zM5 4h2v1h-2zM8 4h1v1h-1zM0 5h1v1h-1zM2 5h1v1h-1zM4 5h3v1h-3zM8 5h1v1h-1zM0 6h1v1h-1zM2 6h1v1h-1zM4 6h3v1h-3zM8 6h1v1h-1zM0 7h1v1h-1zM2 7h1v1h-1zM4 7h3v1h-3zM8 7h1v1h-1zM0 8h9v1h-9z',
  mail: 'M0 1h9v1h-9zM0 2h2v1h-2zM7 2h2v1h-2zM0 3h1v1h-1zM2 3h1v1h-1zM6 3h1v1h-1zM8 3h1v1h-1zM0 4h1v1h-1zM3 4h1v1h-1zM5 4h1v1h-1zM8 4h1v1h-1zM0 5h1v1h-1zM4 5h1v1h-1zM8 5h1v1h-1zM0 6h1v1h-1zM8 6h1v1h-1zM0 7h9v1h-9z',
  pin: 'M2 0h5v1h-5zM1 1h2v1h-2zM6 1h2v1h-2zM1 2h1v1h-1zM4 2h1v1h-1zM7 2h1v1h-1zM1 3h1v1h-1zM7 3h1v1h-1zM1 4h2v1h-2zM6 4h2v1h-2zM2 5h2v1h-2zM5 5h2v1h-2zM3 6h3v1h-3zM4 7h1v1h-1z',
} as const;

export type PixelIconName = keyof typeof paths;

interface PixelIconProps {
  name: PixelIconName;
  size?: number;
  className?: string;
}

export default function PixelIcon({ name, size = 18, className }: PixelIconProps) {
  return (
    <svg
      viewBox="0 0 9 9"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      shapeRendering="crispEdges"
      className={`flex-none ${className ?? ''}`}
    >
      <path d={paths[name]} />
    </svg>
  );
}
