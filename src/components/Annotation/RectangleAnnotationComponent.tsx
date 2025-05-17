'use client';

import { memo, useCallback, useRef } from 'react';
import type { RectangleAnnotation } from '@/types';
import { Rect, Circle, Group } from 'react-konva';
import type Konva from 'konva';

interface RectangleAnnotationProps {
  annotation: RectangleAnnotation;
  onUpdate: (updatedAnnotation: Partial<RectangleAnnotation>) => void;
  onSelect?: () => void;
  isSelected?: boolean;
}

export const RectangleAnnotationComponent = memo(function RectangleAnnotationComponent({
  annotation,
  onUpdate,
  onSelect,
  isSelected = false,
}: RectangleAnnotationProps) {
  const handleRef = useRef<Konva.Circle>(null);

  const handleDragStart = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;
  }, []);

  const handleDragEnd = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    const position = e.target.position();
    onUpdate({
      x: position.x,
      y: position.y,
    });
  }, [onUpdate]);

  const handleDragMove = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    const position = e.target.position();
    onUpdate({
      x: position.x,
      y: position.y,
    });

    if (handleRef.current) {
      handleRef.current.position({
        x: position.x + annotation.width,
        y: position.y + annotation.height,
      });
    }
  }, [annotation.height, annotation.width, onUpdate]);

  const handleResizeStart = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;
  }, []);

  const handleResizeEnd = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    if (handleRef.current) {
      const position = handleRef.current.position();
      onUpdate({
        width: position.x - annotation.x,
        height: position.y - annotation.y,
      });
    }
  }, [annotation.x, annotation.y, onUpdate]);

  const handleResizeMove = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    const position = e.target.position();
    const newWidth = Math.max(10, position.x - annotation.x);
    const newHeight = Math.max(10, position.y - annotation.y);

    onUpdate({
      width: newWidth,
      height: newHeight,
    });

    e.target.position({
      x: annotation.x + newWidth,
      y: annotation.y + newHeight,
    });
  }, [annotation.x, annotation.y, onUpdate]);

  return (
    <Group onClick={onSelect}>
      <Rect
        x={annotation.x}
        y={annotation.y}
        width={annotation.width}
        height={annotation.height}
        fill={annotation.color || 'rgba(0, 255, 0, 0.5)'}
        stroke={isSelected ? '#000' : 'transparent'}
        strokeWidth={isSelected ? 2 : 0}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
      />
      {isSelected && (
        <Circle
          ref={handleRef}
          x={annotation.x + annotation.width}
          y={annotation.y + annotation.height}
          radius={5}
          fill="#000"
          draggable
          onDragStart={handleResizeStart}
          onDragEnd={handleResizeEnd}
          onDragMove={handleResizeMove}
        />
      )}
    </Group>
  );
});
