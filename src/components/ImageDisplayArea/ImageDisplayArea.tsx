import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import { RectangleAnnotationComponent } from '../Annotation/RectangleAnnotationComponent';
import { AnnotationContext } from '../../contexts/AnnotationContext';
import { RectangleAnnotation } from '../../types';
import { EditAnnotationUI } from '../EditAnnotationUI';
import { AnnotationList } from '../AnnotationList';
import { v4 as uuidv4 } from 'uuid';

type ImageDisplayAreaProps = {
  imageUrl: string;
};

export const ImageDisplayArea: React.FC<ImageDisplayAreaProps> = ({
  imageUrl,
}) => {
  const {
    annotations,
    selectedAnnotationId,
    addAnnotation,
    selectAnnotation,
    updateAnnotation,
  } = useContext(AnnotationContext);

  const [rectangleStart, setRectangleStart] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  const [previewRectangle, setPreviewRectangle] = useState<
    RectangleAnnotation | undefined
  >(undefined);

  const selectedAnnotation = useMemo(
    () =>
      annotations.find(
        (annotation) => annotation.id === selectedAnnotationId,
      ) || undefined,
    [annotations, selectedAnnotationId],
  );

  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);
  useEffect(() => {
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      setImage(img);
    };
  }, []);

  const handleImageClick = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!rectangleStart) {
      const x = event.evt.x;
      const y = event.evt.y;
      setRectangleStart({ x, y });
    } else {
      const x = event.evt.x;
      const y = event.evt.y;

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
    }
  };

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (rectangleStart) {
      const x = event.evt.x;
      const y = event.evt.y;
      const width = x - rectangleStart.x;
      const height = y - rectangleStart.y;

      setPreviewRectangle({
        id: 'preview',
        type: 'rectangle',
        x: rectangleStart.x,
        y: rectangleStart.y,
        width,
        height,
        label: 'default',
      });
    }
  };

  return (
    <div>
      <Stage
        width={image?.width}
        height={image?.height}
        onClick={handleImageClick}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          {image && <KonvaImage image={image} />}
          {annotations.map((annotation) => (
            <RectangleAnnotationComponent
              key={annotation.id}
              annotation={annotation as RectangleAnnotation}
              onUpdate={(updatedAnnotation) => {
                updateAnnotation(annotation.id, updatedAnnotation);
              }}
            />
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
      <AnnotationList
        annotations={annotations}
        onSelectAnnotation={selectAnnotation}
      />
      {selectedAnnotation && (
        <EditAnnotationUI
          annotation={selectedAnnotation}
          onUpdate={(updatedAnnotationData) =>
            updateAnnotation(selectedAnnotation.id, updatedAnnotationData)
          }
        />
      )}
    </div>
  );
};
