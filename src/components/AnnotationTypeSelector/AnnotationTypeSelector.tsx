'use client';

import { memo } from 'react';
import { useAnnotation } from '@/contexts/AnnotationContext';

export const AnnotationTypeSelector = memo(function AnnotationTypeSelector() {
  const { currentAnnotationType, setAnnotationType, polygonDrawMode, setPolygonDrawMode } = useAnnotation();

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow mb-4">
      <h2 className="text-lg font-bold mb-4">アノテーションタイプ</h2>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setAnnotationType('rectangle')}
          className={`
            flex-1 px-4 py-2 rounded-md
            transition-colors duration-200
            ${
              currentAnnotationType === 'rectangle'
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
            ${
              currentAnnotationType === 'polygon'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }
          `}
        >
          ポリゴン
        </button>
      </div>
      
      {currentAnnotationType === 'polygon' && (
        <div className="mt-3">
          <h3 className="text-sm font-medium mb-2">ポリゴン描画モード</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setPolygonDrawMode('click')}
              className={`
                flex-1 px-3 py-1 rounded-md text-sm
                transition-colors duration-200
                ${
                  polygonDrawMode === 'click'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }
              `}
            >
              クリックで頂点追加
            </button>
            <button
              onClick={() => setPolygonDrawMode('drag')}
              className={`
                flex-1 px-3 py-1 rounded-md text-sm
                transition-colors duration-200
                ${
                  polygonDrawMode === 'drag'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }
              `}
            >
              ドラッグで描画
            </button>
          </div>
        </div>
      )}
    </div>
  );
});
