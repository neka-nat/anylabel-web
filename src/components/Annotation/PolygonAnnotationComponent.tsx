'use client';

import { memo, useCallback } from 'react';
import { Line, Circle, Group } from 'react-konva';
import type Konva from 'konva';
import type { PolygonAnnotation as PolygonAnnotationType } from '@/types';

interface PolygonAnnotationProps {
  annotation: PolygonAnnotationType;
  isSelected?: boolean;
  onUpdate?: (updatedAnnotation: Partial<PolygonAnnotationType>) => void;
  onSelect?: () => void;
}

export const PolygonAnnotation = memo(function PolygonAnnotation({
  annotation,
  isSelected = false,
  onUpdate,
  onSelect,
}: PolygonAnnotationProps) {
  const { points, color } = annotation;

  const handlePointDragMove = useCallback(
    (index: number, e: Konva.KonvaEventObject<DragEvent>) => {
      if (!onUpdate) return;
      const position = e.target.position();
      const updatedPoints = points.map((p, i) =>
        i === index ? { x: position.x, y: position.y } : p,
      );
      onUpdate({ points: updatedPoints });
    },
    [onUpdate, points],
  );

  return (
    <Group onClick={onSelect}>
      <Line
        points={points.flatMap((point) => [point.x, point.y])}
        fill={color || 'rgba(0, 255, 0, 0.5)'}
        stroke={isSelected ? '#000' : 'transparent'}
        strokeWidth={isSelected ? 2 : 0}
        closed
        listening={true}
      />
      {isSelected &&
        points.map((point, idx) => (
          <Circle
            key={idx}
            x={point.x}
            y={point.y}
            radius={5}
            fill="#000"
            draggable
            onDragMove={(e) => handlePointDragMove(idx, e)}
          />
        ))}
    </Group>
  );
});
