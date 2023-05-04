import React, { useState } from 'react';
import { Annotation } from '../../types/annotation';

type EditAnnotationUIProps = {
  annotation: Annotation | undefined;
  onUpdate: (updatedAnnotation: Partial<Annotation>) => void;
};

export const EditAnnotationUI: React.FC<EditAnnotationUIProps> = ({
  annotation,
  onUpdate,
}) => {
  if (!annotation) {
    return <div>Please select an annotation to edit.</div>;
  }

  // フォームの状態を管理
  const [label, setLabel] = useState(annotation.label);
  const [color, setColor] = useState(annotation.color || '');

  // ラベルが変更されたときの処理
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = event.target.value;
    setLabel(newLabel);
    onUpdate({ ...annotation, label: newLabel });
  };

  // 色が変更されたときの処理
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
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
