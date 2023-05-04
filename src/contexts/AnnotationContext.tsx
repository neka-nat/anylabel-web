import React, { createContext, useState } from 'react';
import { Annotation } from '../types/annotation';

type AnnotationContextType = {
  annotations: Annotation[];
  selectedAnnotationId: string | undefined;
  addAnnotation: (annotation: Annotation) => void;
  updateAnnotation: (
    annotationId: string,
    updatedAnnotationData: Partial<Annotation>,
  ) => void;
  removeAnnotation: (annotationId: string) => void;
  selectAnnotation: (annotationId: string | undefined) => void;
};

const initialAnnotationContext: AnnotationContextType = {
  annotations: [],
  selectedAnnotationId: undefined,
  addAnnotation: () => {},
  updateAnnotation: () => {},
  removeAnnotation: () => {},
  selectAnnotation: () => {},
};

// コンテキストの作成
export const AnnotationContext = createContext<AnnotationContextType>(
  initialAnnotationContext,
);

// コンテキストプロバイダコンポーネント
export const AnnotationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<
    string | undefined
  >();

  const addAnnotation = (annotation: Annotation) => {
    setAnnotations((prevAnnotations) => [...prevAnnotations, annotation]);
  };

  const updateAnnotation = (
    annotationId: string,
    updatedAnnotationData: Partial<Annotation>,
  ) => {
    setAnnotations(
      (prevAnnotations) =>
        prevAnnotations.map((annotation) => {
          if (annotation.id === annotationId) {
            return { ...annotation, ...updatedAnnotationData };
          }
          return annotation;
        }) as Annotation[],
    );
  };

  const selectAnnotation = (annotationId: string | undefined) => {
    setSelectedAnnotationId(annotationId);
  };

  return (
    <AnnotationContext.Provider
      value={{
        annotations,
        selectedAnnotationId,
        addAnnotation,
        updateAnnotation,
        selectAnnotation,
        removeAnnotation: () => {},
      }}
    >
      {children}
    </AnnotationContext.Provider>
  );
};
