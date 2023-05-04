import React, { useRef } from 'react';
import { RectangleAnnotation } from '../../types/annotation';
import { Rect, Circle, Group } from 'react-konva';
import Konva from 'konva';

type RectangleAnnotationComponentProps = {
  annotation: RectangleAnnotation;
  onUpdate: (updatedAnnotation: RectangleAnnotation) => void;
  onSelect: () => void;
};

export const RectangleAnnotationComponent: React.FC<
  RectangleAnnotationComponentProps
> = ({ annotation, onUpdate, onSelect }) => {
  const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;
    onSelect();
  };

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const updatedAnnotation = {
      ...annotation,
      x: e.target.position().x,
      y: e.target.position().y,
    };
    onUpdate(updatedAnnotation);
  };

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    const rect = e.target;
    const newPosition = rect.position();

    onUpdate({
      ...annotation,
      x: newPosition.x,
      y: newPosition.y,
    });

    // Move the circle along with the rectangle
    handleRef.current.position({
      x: newPosition.x + annotation.width,
      y: newPosition.y + annotation.height,
    });
  };

  const handleRef = useRef<any>(undefined);

  const handleResizeStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;
  };

  const handleResizeEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    if (handleRef.current) {
      onUpdate({
        ...annotation,
        width: handleRef.current.x() - annotation.x,
        height: handleRef.current.y() - annotation.y,
      });
    }
  };

  const handleResizeMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    const circle = e.target;
    const newPosition = circle.position();
    const newWidth = newPosition.x - annotation.x;
    const newHeight = newPosition.y - annotation.y;

    onUpdate({
      ...annotation,
      width: newWidth,
      height: newHeight,
    });

    // Move the circle back to the corner of the rectangle
    circle.position({
      x: annotation.x + newWidth,
      y: annotation.y + newHeight,
    });
  };

  return (
    <Group>
      <Rect
        x={annotation.x}
        y={annotation.y}
        width={annotation.width}
        height={annotation.height}
        fill={annotation.color || 'rgba(0, 255, 0, 0.5)'}
        strokeWidth={2}
        stroke="black"
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
      />
      <Circle
        ref={handleRef}
        x={annotation.x + annotation.width}
        y={annotation.y + annotation.height}
        radius={5}
        fill="black"
        draggable={true}
        onDragStart={handleResizeStart}
        onDragEnd={handleResizeEnd}
        onDragMove={handleResizeMove}
      />
    </Group>
  );
};
