'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import type { Annotation } from '@/types';

type AnnotationType = 'rectangle' | 'polygon';

interface AnnotationContextType {
  annotations: Annotation[];
  selectedAnnotationId: string | undefined;
  currentAnnotationType: AnnotationType;
  polygonDrawMode: 'click' | 'drag';  // Added: polygon draw mode
  addAnnotation: (annotation: Annotation) => void;
  updateAnnotation: (
    annotationId: string,
    updatedAnnotationData: Partial<Annotation>,
  ) => void;
  removeAnnotation: (annotationId: string) => void;
  selectAnnotation: (annotationId: string | undefined) => void;
  setAnnotationType: (type: AnnotationType) => void;
  setPolygonDrawMode: (mode: 'click' | 'drag') => void;  // Added: polygon draw mode setter
}

const AnnotationContext = createContext<AnnotationContextType | null>(null);

export function useAnnotation() {
  const context = useContext(AnnotationContext);
  if (!context) {
    throw new Error('useAnnotation must be used within an AnnotationProvider');
  }
  return context;
}

interface AnnotationProviderProps {
  children: React.ReactNode;
}

export function AnnotationProvider({ children }: AnnotationProviderProps) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string>();
  const [currentAnnotationType, setCurrentAnnotationType] =
    useState<AnnotationType>('rectangle');
  const [polygonDrawMode, setPolygonDrawModeState] = useState<'click' | 'drag'>('click');

  const addAnnotation = useCallback((annotation: Annotation) => {
    setAnnotations((prev) => [...prev, annotation]);
  }, []);

  const updateAnnotation = useCallback(
    (annotationId: string, updatedAnnotationData: Partial<Annotation>) => {
      setAnnotations((prev) =>
        prev.map((annotation) =>
          annotation.id === annotationId
            ? ({ ...annotation, ...updatedAnnotationData } as Annotation)
            : annotation,
        ),
      );
    },
    [],
  );

  const removeAnnotation = useCallback(
    (annotationId: string) => {
      setAnnotations((prev) =>
        prev.filter((annotation) => annotation.id !== annotationId),
      );
      if (selectedAnnotationId === annotationId) {
        setSelectedAnnotationId(undefined);
      }
    },
    [selectedAnnotationId],
  );

  const selectAnnotation = useCallback((annotationId: string | undefined) => {
    setSelectedAnnotationId(annotationId);
  }, []);

  const setAnnotationType = useCallback((type: AnnotationType) => {
    setCurrentAnnotationType(type);
  }, []);

  const setPolygonDrawMode = useCallback((mode: 'click' | 'drag') => {
    setPolygonDrawModeState(mode);
  }, []);

  const value = {
    annotations,
    selectedAnnotationId,
    currentAnnotationType,
    polygonDrawMode,
    addAnnotation,
    updateAnnotation,
    removeAnnotation,
    selectAnnotation,
    setAnnotationType,
    setPolygonDrawMode,
  };

  return (
    <AnnotationContext.Provider value={value}>
      {children}
    </AnnotationContext.Provider>
  );
}
