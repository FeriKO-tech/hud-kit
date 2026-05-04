import { useEffect, useRef } from 'react';
import type { MinimapMarker, MinimapProps } from '../types';

const markerColors: Record<NonNullable<MinimapMarker['type']>, string> = {
  player: 'var(--hk-minimap-player)',
  enemy: 'var(--hk-minimap-enemy)',
  npc: 'var(--hk-minimap-npc)',
  quest: 'var(--hk-minimap-quest)',
  custom: '#ffffff',
};

function drawTriangle(context: CanvasRenderingContext2D, x: number, y: number, rotation: number, color: string) {
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(0, -7);
  context.lineTo(5, 6);
  context.lineTo(-5, 6);
  context.closePath();
  context.fill();
  context.restore();
}

export function Minimap({
  width = 160,
  height = 160,
  mapSrc,
  markers = [],
  playerPosition,
  zoom = 1,
  shape = 'circle',
  className,
}: MinimapProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);

    const renderMarkers = () => {
      context.save();
      context.translate(width / 2, height / 2);
      context.scale(zoom, zoom);
      context.translate(-width / 2, -height / 2);

      markers.forEach((marker) => {
        const markerType = marker.type ?? 'custom';
        context.fillStyle = marker.color ?? markerColors[markerType];
        context.beginPath();
        context.arc(marker.x, marker.y, markerType === 'quest' ? 4.5 : 3.5, 0, Math.PI * 2);
        context.fill();

        if (marker.label) {
          context.font = '10px system-ui';
          context.fillText(marker.label, marker.x + 6, marker.y - 6);
        }
      });

      if (playerPosition) {
        drawTriangle(
          context,
          playerPosition.x,
          playerPosition.y,
          playerPosition.rotation ?? 0,
          markerColors.player,
        );
      }

      context.restore();
    };

    if (mapSrc) {
      const image = new Image();
      image.onload = () => {
        context.drawImage(image, 0, 0, width, height);
        renderMarkers();
      };
      image.src = mapSrc;
      return;
    }

    const gradient = context.createRadialGradient(width / 2, height / 2, 8, width / 2, height / 2, Math.max(width, height) / 2);
    gradient.addColorStop(0, 'rgba(99,102,241,0.2)');
    gradient.addColorStop(1, 'rgba(5,5,15,0.95)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    context.strokeStyle = 'rgba(255,255,255,0.08)';
    context.lineWidth = 1;

    for (let x = 0; x < width; x += 24) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }

    for (let y = 0; y < height; y += 24) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }

    renderMarkers();
  }, [height, mapSrc, markers, playerPosition, width, zoom]);

  return (
    <div
      className={['hk-root', 'hk-minimap', `hk-minimap--${shape}`, className].filter(Boolean).join(' ')}
      style={{ width, height }}
    >
      <canvas className="hk-minimap__canvas" ref={canvasRef} aria-label="Minimap" role="img" />
    </div>
  );
}
