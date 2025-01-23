import { memo, useCallback } from 'react';
import type { Annotation } from '../../types/annotation';
import { useAnnotation } from '../../contexts/AnnotationContext';

interface AnnotationListProps {
  annotations: Annotation[];
  onSelectAnnotation: (id: string | undefined) => void;
}

export const AnnotationList = memo(function AnnotationList({
  annotations,
  onSelectAnnotation,
}: AnnotationListProps) {
  const { selectedAnnotationId } = useAnnotation();

  const handleAnnotationClick = useCallback((id: string) => {
    onSelectAnnotation(id === selectedAnnotationId ? undefined : id);
  }, [onSelectAnnotation, selectedAnnotationId]);

  if (annotations.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-center">
        アノテーションがありません
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {annotations.map((annotation) => (
        <button
          key={annotation.id}
          onClick={() => handleAnnotationClick(annotation.id)}
          className={`
            w-full px-4 py-2 text-left rounded
            transition-colors duration-200
            ${selectedAnnotationId === annotation.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }
          `}
        >
          <div className="font-medium">{annotation.label}</div>
          <div className="text-sm opacity-75">
            {annotation.type === 'rectangle' ? '矩形' : 'ポリゴン'}
          </div>
        </button>
      ))}
    </div>
  );
});
