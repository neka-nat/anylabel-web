'use client';

import { memo, useEffect, useState } from 'react';
import { useAnnotation } from '@/contexts/AnnotationContext';
import type { Annotation } from '@/types';
import { labelToColor } from '@/utils/color';

interface EditAnnotationUIProps {
  annotation: Annotation | undefined;
  onUpdate: (updatedAnnotation: Partial<Annotation>) => void;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const EditAnnotationUI = memo(function EditAnnotationUI({
  annotation,
  onUpdate,
}: EditAnnotationUIProps) {
  const { removeAnnotation } = useAnnotation();
  const [label, setLabel] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (annotation) {
      setLabel(annotation.label);
      setColor(annotation.color || '');
    }
  }, [annotation]);

  if (!annotation) {
    return (
      <div className="w-64 p-4 bg-white rounded-lg shadow">
        <div className="text-gray-500 text-center">
          アノテーションを選択してください
        </div>
      </div>
    );
  }

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = event.target.value;
    const newColor = labelToColor(newLabel);
    setLabel(newLabel);
    setColor(newColor);
    onUpdate({ label: newLabel, color: newColor });
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = hexToRgba(event.target.value, 0.5);
    setColor(newColor);
    onUpdate({ color: newColor });
  };

  return (
    <div className="w-64 p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">アノテーション編集</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ラベル
          </label>
          <input
            type="text"
            value={label}
            onChange={handleLabelChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            色
          </label>
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
          />
        </div>
        <div className="text-sm text-gray-500">
          タイプ: {annotation.type === 'rectangle' ? '矩形' : 'ポリゴン'}
        </div>
        <button
          type="button"
          onClick={() => removeAnnotation(annotation.id)}
          className="w-full rounded-md bg-red-600 text-white py-2 mt-2 hover:bg-red-500"
        >
          削除
        </button>
      </form>
    </div>
  );
});
