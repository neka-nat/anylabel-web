'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import type Konva from 'konva';
import { v4 as uuidv4 } from 'uuid';
import { PolygonAnnotation } from '@/components/Annotation/PolygonAnnotationComponent';
import { RectangleAnnotationComponent } from '@/components/Annotation/RectangleAnnotationComponent';
import { useAnnotation } from '@/contexts/AnnotationContext';
import type { RectangleAnnotation, Annotation } from '@/types';
import { EditAnnotationUI } from '@/components/EditAnnotationUI';
import { AnnotationList } from '@/components/AnnotationList';

interface Point {
  x: number;
  y: number;
}

interface ImageDisplayAreaProps {
  imageUrl: string;
}

export const ImageDisplayArea = memo(function ImageDisplayArea({ imageUrl }: ImageDisplayAreaProps) {
  const {
    annotations,
    selectedAnnotationId,
    addAnnotation,
    selectAnnotation,
    updateAnnotation,
  } = useAnnotation();

  const [rectangleStart, setRectangleStart] = useState<Point>();
  const [previewRectangle, setPreviewRectangle] = useState<RectangleAnnotation>();
  const [image, setImage] = useState<HTMLImageElement>();

  const selectedAnnotation = useMemo(
    () => annotations.find((annotation) => annotation.id === selectedAnnotationId),
    [annotations, selectedAnnotationId]
  );

  useEffect(() => {
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => setImage(img);
  }, [imageUrl]);

  const handleImageClick = useCallback((event: Konva.KonvaEventObject<MouseEvent>) => {
    const { offsetX: x, offsetY: y } = event.evt;

    if (!rectangleStart) {
      setRectangleStart({ x, y });
      return;
    }

    const newAnnotation: RectangleAnnotation = {
      id: uuidv4(),
      type: 'rectangle',
      label: 'New Rectangle',
      x: rectangleStart.x,
      y: rectangleStart.y,
      width: x - rectangleStart.x,
      height: y - rectangleStart.y,
      color: 'rgba(0, 255, 0, 0.5)',
    };

    addAnnotation(newAnnotation);
    setRectangleStart(undefined);
    setPreviewRectangle(undefined);
  }, [addAnnotation, rectangleStart]);

  const handleMouseMove = useCallback((event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!rectangleStart) return;

    const { offsetX: x, offsetY: y } = event.evt;
    setPreviewRectangle({
      id: 'preview',
      type: 'rectangle',
      label: 'Preview',
      x: rectangleStart.x,
      y: rectangleStart.y,
      width: x - rectangleStart.x,
      height: y - rectangleStart.y,
      color: 'rgba(0, 255, 0, 0.3)',
    });
  }, [rectangleStart]);

  const handleAnnotationUpdate = useCallback((
    annotationId: string,
    updatedAnnotation: Partial<Annotation>
  ) => {
    updateAnnotation(annotationId, updatedAnnotation);
  }, [updateAnnotation]);

  if (!image) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100">
        <div className="text-gray-500">画像を読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Stage
        width={image.width}
        height={image.height}
        onClick={handleImageClick}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          <KonvaImage image={image} />
          {annotations.map((annotation) => (
            annotation.type === 'rectangle' ? (
              <RectangleAnnotationComponent
                key={annotation.id}
                annotation={annotation as RectangleAnnotation}
                onUpdate={(updatedAnnotation) => handleAnnotationUpdate(annotation.id, updatedAnnotation)}
                isSelected={selectedAnnotationId === annotation.id}
              />
            ) : (
              <PolygonAnnotation
                key={annotation.id}
                annotation={annotation}
                isSelected={selectedAnnotationId === annotation.id}
              />
            )
          ))}
          {previewRectangle && (
            <RectangleAnnotationComponent
              key={previewRectangle.id}
              annotation={previewRectangle}
              onUpdate={() => {}}
            />
          )}
        </Layer>
      </Stage>
      <div className="flex gap-4">
        <AnnotationList
          annotations={annotations}
          onSelectAnnotation={selectAnnotation}
        />
        {selectedAnnotation && (
          <EditAnnotationUI
            annotation={selectedAnnotation}
            onUpdate={(updatedAnnotationData) =>
              handleAnnotationUpdate(selectedAnnotation.id, updatedAnnotationData)
            }
          />
        )}
      </div>
    </div>
  );
});
