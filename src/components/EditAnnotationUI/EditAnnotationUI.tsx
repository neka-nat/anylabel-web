import React, { useEffect, useState } from 'react';
import { Annotation } from '../../types/annotation';

type EditAnnotationUIProps = {
  annotation: Annotation | undefined;
  onUpdate: (updatedAnnotation: Partial<Annotation>) => void;
};

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const EditAnnotationUI: React.FC<EditAnnotationUIProps> = ({
  annotation,
  onUpdate,
}) => {
  if (!annotation) {
    return <div>Please select an annotation to edit.</div>;
  }

  const [label, setLabel] = useState(annotation.label);
  const [color, setColor] = useState(annotation.color || '');

  useEffect(() => {
    setLabel(annotation.label);
    setColor(annotation.color || '');
  }, [annotation]);

  // ラベルが変更されたときの処理
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = event.target.value;
    setLabel(newLabel);
    onUpdate({ ...annotation, label: newLabel });
  };

  // 色が変更されたときの処理
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = hexToRgba(event.target.value, 0.5);
    setColor(newColor);
    onUpdate({ ...annotation, color: newColor });
  };

  return (
    <div>
      <h3>Edit Annotation</h3>
      <form>
        <label>
          Label:
          <input type="text" value={label} onChange={handleLabelChange} />
        </label>
        <label>
          Color:
          <input type="color" value={color} onChange={handleColorChange} />
        </label>
      </form>
    </div>
  );
};
