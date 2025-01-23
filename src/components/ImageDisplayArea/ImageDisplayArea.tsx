'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import type Konva from 'konva';
import { v4 as uuidv4 } from 'uuid';
import { PolygonAnnotation } from '@/components/Annotation/PolygonAnnotationComponent';
import { RectangleAnnotationComponent } from '@/components/Annotation/RectangleAnnotationComponent';
import { useAnnotation } from '@/contexts/AnnotationContext';
import type { RectangleAnnotation, Annotation, Point, PolygonAnnotation as PolygonAnnotationType } from '@/types';
import { EditAnnotationUI } from '@/components/EditAnnotationUI';
import { AnnotationList } from '@/components/AnnotationList';

interface ImageDisplayAreaProps {
  imageUrl: string;
}

export const ImageDisplayArea = memo(function ImageDisplayArea({ imageUrl }: ImageDisplayAreaProps) {
  const {
    annotations,
    selectedAnnotationId,
    currentAnnotationType,
    addAnnotation,
    selectAnnotation,
    updateAnnotation,
  } = useAnnotation();

  const [rectangleStart, setRectangleStart] = useState<Point>();
  const [previewRectangle, setPreviewRectangle] = useState<RectangleAnnotation>();
  const [polygonPoints, setPolygonPoints] = useState<Point[]>([]);
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

    if (currentAnnotationType === 'rectangle') {
      if (!rectangleStart) {
        setRectangleStart({ x, y });
        return;
      }

      const newAnnotation: RectangleAnnotation = {
        id: uuidv4(),
        type: 'rectangle',
        label: '新規矩形',
        x: rectangleStart.x,
        y: rectangleStart.y,
        width: x - rectangleStart.x,
        height: y - rectangleStart.y,
        color: 'rgba(0, 255, 0, 0.5)',
      };

      addAnnotation(newAnnotation);
      setRectangleStart(undefined);
      setPreviewRectangle(undefined);
    } else {
      const newPoint = { x, y };
      const updatedPoints = [...polygonPoints, newPoint];
      setPolygonPoints(updatedPoints);

      // ダブルクリックでポリゴンを完成させる
      if (event.evt.detail === 2 && updatedPoints.length >= 3) {
        const newAnnotation: PolygonAnnotationType = {
          id: uuidv4(),
          type: 'polygon',
          label: '新規ポリゴン',
          points: updatedPoints,
          color: 'rgba(0, 255, 0, 0.5)',
        };

        addAnnotation(newAnnotation);
        setPolygonPoints([]);
      }
    }
  }, [addAnnotation, currentAnnotationType, polygonPoints, rectangleStart]);

  const handleMouseMove = useCallback((event: Konva.KonvaEventObject<MouseEvent>) => {
    if (currentAnnotationType === 'rectangle' && rectangleStart) {
      const { offsetX: x, offsetY: y } = event.evt;
      setPreviewRectangle({
        id: 'preview',
        type: 'rectangle',
        label: 'プレビュー',
        x: rectangleStart.x,
        y: rectangleStart.y,
        width: x - rectangleStart.x,
        height: y - rectangleStart.y,
        color: 'rgba(0, 255, 0, 0.3)',
      });
    }
  }, [currentAnnotationType, rectangleStart]);

  const handleAnnotationUpdate = useCallback((
    annotationId: string,
    updatedAnnotation: Partial<Annotation>
  ) => {
    updateAnnotation(annotationId, updatedAnnotation);
  }, [updateAnnotation]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setRectangleStart(undefined);
      setPreviewRectangle(undefined);
      setPolygonPoints([]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!image) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100">
        <div className="text-gray-500">画像を読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-sm text-gray-500 mb-2">
          {currentAnnotationType === 'rectangle'
            ? '矩形: クリックして開始点を指定し、もう一度クリックして矩形を確定'
            : 'ポリゴン: クリックして頂点を追加し、ダブルクリックで確定'
          }
        </div>
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
            {polygonPoints.length > 0 && (
              <PolygonAnnotation
                annotation={{
                  id: 'preview',
                  type: 'polygon',
                  label: 'プレビュー',
                  points: polygonPoints,
                  color: 'rgba(0, 255, 0, 0.3)',
                }}
                isSelected={false}
              />
            )}
          </Layer>
        </Stage>
      </div>
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
