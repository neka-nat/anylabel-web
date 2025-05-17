'use client';

import { memo, useCallback } from 'react';
import { Line, Circle, Group } from 'react-konva';
import type Konva from 'konva';
import type { SegmentAnnotation } from '@/types';

interface SegmentAnnotationProps {
  annotation: SegmentAnnotation;
  isSelected?: boolean;
  onUpdate?: (updatedAnnotation: Partial<SegmentAnnotation>) => void;
  onSelect?: () => void;
}

export const SegmentAnnotationComponent = memo(
  function SegmentAnnotationComponent({
    annotation,
    isSelected = false,
    onUpdate,
    onSelect,
  }: SegmentAnnotationProps) {
    const { points, color } = annotation;

    const handlePointDragMove = useCallback(
      (idx: number, e: Konva.KonvaEventObject<DragEvent>) => {
        if (!onUpdate) return;
        const position = e.target.position();
        const updatedPoints = points.map((p, i) =>
          i === idx ? { x: position.x, y: position.y } : p,
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
          points.map((p, idx) => (
            <Circle
              key={idx}
              x={p.x}
              y={p.y}
              radius={5}
              fill="#000"
              draggable
              onDragMove={(e) => handlePointDragMove(idx, e)}
            />
          ))}
      </Group>
    );
  },
);
