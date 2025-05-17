'use client';

import { memo } from 'react';
import { Line } from 'react-konva';
import type { SegmentAnnotation } from '@/types';

interface SegmentAnnotationProps {
  annotation: SegmentAnnotation;
  isSelected?: boolean;
}

export const SegmentAnnotationComponent = memo(
  function SegmentAnnotationComponent({
    annotation,
    isSelected = false,
  }: SegmentAnnotationProps) {
    const { points, color } = annotation;

    return (
      <Line
        points={points.flatMap((point) => [point.x, point.y])}
        fill={color || 'rgba(0, 255, 0, 0.5)'}
        stroke={isSelected ? '#000' : 'transparent'}
        strokeWidth={isSelected ? 2 : 0}
        closed
        listening={true}
      />
    );
  },
);
