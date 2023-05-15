import React from 'react';
import { PolygonAnnotation } from '../../types/annotation';
import { Line } from 'react-konva';

type PolygonAnnotationComponentProps = {
  annotation: PolygonAnnotation;
};

export const PolygonAnnotationComponent: React.FC<
PolygonAnnotationComponentProps
> = ({ annotation }) => {
  const { points, color } = annotation;

  return (
    <Line
      points={points.flatMap(point => [point.x, point.y])}
      fill={color || 'rgba(0, 255, 0, 0.5)'}
      closed // ポリゴンを閉じるためのプロパティ
    />
  );
};
