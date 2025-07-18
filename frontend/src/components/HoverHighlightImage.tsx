import React, { useRef, useEffect } from 'react';
import type { CSSProperties } from 'react';

interface HoverHighlightImageProps {
  src: string;
  width?: number;
  height?: number;
  scaleOnHover?: number;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  growDirection?: 'left' | 'right' | 'center';
  highlight?: boolean;
}

const HoverHighlightImage: React.FC<HoverHighlightImageProps> = ({
  src,
  width = 300,
  height = 300,
  scaleOnHover = 1.2,
  alt = '',
  className = '',
  style = {},
  growDirection = 'center',
  highlight = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());

  useEffect(() => {
    const img = imageRef.current;
    img.src = src;
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      drawImage(highlight);
    };
  }, [src]);

  useEffect(() => {
    drawImage(highlight);
  }, [highlight]);

  const drawImage = (highlight: boolean) => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgAspectRatio = img.naturalWidth / img.naturalHeight;
    let drawWidth = width;
    let drawHeight = height;

    if (width / height > imgAspectRatio) {
      drawHeight = height;
      drawWidth = drawHeight * imgAspectRatio;
    } else {
      drawWidth = width;
      drawHeight = drawWidth / imgAspectRatio;
    }

    if (highlight) {
      drawWidth *= scaleOnHover;
      drawHeight *= scaleOnHover;
    }

    let offsetX = 0;
    if (highlight) {
      if (growDirection === 'right') {
        offsetX = 0;
      } else if (growDirection === 'left') {
        offsetX = width - drawWidth;
      } else {
        offsetX = (width - drawWidth) / 2;
      }
    } else {
      offsetX = (width - drawWidth) / 2;
    }
    const offsetY = (height - drawHeight) / 2;

    if (highlight) {
      ctx.filter = style.filter ? style.filter : 'none';
    } else {
      // Apply grayscale plus any existing filter (e.g. drop-shadow)
      const baseFilter = 'grayscale(100%)';
      ctx.filter = style.filter ? baseFilter + ' ' + style.filter : baseFilter;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      aria-label={alt}
      role="img"
      style={{ cursor: 'pointer', ...style }}
    />
  );
};

export default HoverHighlightImage;
