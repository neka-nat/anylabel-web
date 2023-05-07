import React from 'react';
import { Annotation } from '../../types/annotation';

type Props = {
  annotations: Annotation[];
  onSelectAnnotation: (id: string) => void;
};

export const AnnotationList: React.FC<Props> = ({
  annotations,
  onSelectAnnotation,
}) => {
  return (
    <div>
      {annotations.map((annotation) => (
        <div
          key={annotation.id}
          onClick={() => onSelectAnnotation(annotation.id)}
          style={{ cursor: 'pointer' }}
        >
          {annotation.label}
        </div>
      ))}
    </div>
  );
};
