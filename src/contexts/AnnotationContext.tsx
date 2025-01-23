import { createContext, useCallback, useContext, useState } from 'react';
import type { Annotation } from '../types/annotation';

interface AnnotationContextType {
  annotations: Annotation[];
  selectedAnnotationId: string | undefined;
  addAnnotation: (annotation: Annotation) => void;
  updateAnnotation: (annotationId: string, updatedAnnotationData: Partial<Annotation>) => void;
  removeAnnotation: (annotationId: string) => void;
  selectAnnotation: (annotationId: string | undefined) => void;
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

  const addAnnotation = useCallback((annotation: Annotation) => {
    setAnnotations(prev => [...prev, annotation]);
  }, []);

  const updateAnnotation = useCallback((
    annotationId: string,
    updatedAnnotationData: Partial<Annotation>
  ) => {
    setAnnotations(prev =>
      prev.map(annotation =>
        annotation.id === annotationId
          ? { ...annotation, ...updatedAnnotationData } as Annotation
          : annotation
      )
    );
  }, []);

  const removeAnnotation = useCallback((annotationId: string) => {
    setAnnotations(prev => prev.filter(annotation => annotation.id !== annotationId));
    if (selectedAnnotationId === annotationId) {
      setSelectedAnnotationId(undefined);
    }
  }, [selectedAnnotationId]);

  const selectAnnotation = useCallback((annotationId: string | undefined) => {
    setSelectedAnnotationId(annotationId);
  }, []);

  const value = {
    annotations,
    selectedAnnotationId,
    addAnnotation,
    updateAnnotation,
    removeAnnotation,
    selectAnnotation,
  };

  return (
    <AnnotationContext.Provider value={value}>
      {children}
    </AnnotationContext.Provider>
  );
}
