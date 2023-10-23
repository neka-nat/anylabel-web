import React, { createContext, useState } from 'react';
import { Annotation } from '../types/annotation';

type AnnotationContextType = {
  annotations: Annotation[];  // アノテーションの配列
  selectedAnnotationId: string | undefined;  // 選択されているアノテーションのID
  addAnnotation: (annotation: Annotation) => void;  // アノテーションの追加
  updateAnnotation: (
    annotationId: string,
    updatedAnnotationData: Partial<Annotation>,
  ) => void;  // アノテーションの更新
  removeAnnotation: (annotationId: string) => void; // アノテーションの削除
  selectAnnotation: (annotationId: string | undefined) => void;  // アノテーションの選択
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
