import React from 'react';
import { CircleAnnotation } from '../../types/annotation';

type CircleAnnotationComponentProps = {
  annotation: CircleAnnotation;
};

export const CircleAnnotationComponent: React.FC<
  CircleAnnotationComponentProps
> = ({ annotation }) => {
  const { centerX, centerY, radius, color } = annotation;

  return (
    <circle
      cx={centerX}
      cy={centerY}
      r={radius}
      fill={color || 'rgba(0, 255, 0, 0.5)'}
      strokeWidth={2}
      stroke="black"
    />
  );
};
