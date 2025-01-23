'use client';

import { memo } from 'react';
import type { Annotation } from '@/types';
import { useAnnotation } from '@/contexts/AnnotationContext';

interface AnnotationListProps {
  annotations: Annotation[];
  onSelectAnnotation: (id: string | undefined) => void;
}

export const AnnotationList = memo(function AnnotationList({
  annotations,
  onSelectAnnotation,
}: AnnotationListProps) {
  const { selectedAnnotationId } = useAnnotation();

  if (annotations.length === 0) {
    return (
      <div className="w-64 p-4 bg-white rounded-lg shadow">
        <div className="text-gray-500 text-center">
          アノテーションがありません
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">アノテーション一覧</h2>
      <div className="space-y-2">
        {annotations.map((annotation) => (
          <button
            key={annotation.id}
            onClick={() => onSelectAnnotation(annotation.id === selectedAnnotationId ? undefined : annotation.id)}
            className={`
              w-full px-4 py-2 text-left rounded
              transition-colors duration-200
              ${selectedAnnotationId === annotation.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }
            `}
          >
            <div className="font-medium truncate">{annotation.label}</div>
            <div className="text-sm opacity-75 truncate">
              {annotation.type === 'rectangle' ? '矩形' : 'ポリゴン'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
});
