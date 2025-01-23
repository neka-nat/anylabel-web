'use client';

import { memo } from 'react';
import { useAnnotation } from '@/contexts/AnnotationContext';

export const AnnotationTypeSelector = memo(function AnnotationTypeSelector() {
  const { currentAnnotationType, setAnnotationType } = useAnnotation();

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow mb-4">
      <h2 className="text-lg font-bold mb-4">アノテーションタイプ</h2>
      <div className="flex gap-2">
        <button
          onClick={() => setAnnotationType('rectangle')}
          className={`
            flex-1 px-4 py-2 rounded-md
            transition-colors duration-200
            ${currentAnnotationType === 'rectangle'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }
          `}
        >
          矩形
        </button>
        <button
          onClick={() => setAnnotationType('polygon')}
          className={`
            flex-1 px-4 py-2 rounded-md
            transition-colors duration-200
            ${currentAnnotationType === 'polygon'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }
          `}
        >
          ポリゴン
        </button>
      </div>
    </div>
  );
}); 