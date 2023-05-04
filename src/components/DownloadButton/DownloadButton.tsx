import React, { useContext } from 'react';
import { AnnotationContext } from '../../contexts/AnnotationContext';

export const DownloadButton: React.FC = () => {
  const { annotations } = useContext(AnnotationContext);

  const exportAnnotations = () => {
    const data = JSON.stringify(annotations, null, 2);
    return data;
  };

  const downloadAnnotations = () => {
    const data = exportAnnotations();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'annotations.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="App">
      <button onClick={downloadAnnotations}>Download Annotations</button>
    </div>
  );
};
