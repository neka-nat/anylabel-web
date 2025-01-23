import { memo, useCallback, useState } from 'react';
import { useAnnotation } from '../../contexts/AnnotationContext';

export const DownloadButton = memo(function DownloadButton() {
  const { annotations } = useAnnotation();
  const [isDownloading, setIsDownloading] = useState(false);

  const exportAnnotations = useCallback(() => {
    if (annotations.length === 0) {
      throw new Error('アノテーションが存在しません');
    }
    return JSON.stringify(annotations, null, 2);
  }, [annotations]);

  const downloadAnnotations = useCallback(async () => {
    try {
      setIsDownloading(true);
      const data = exportAnnotations();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `annotations_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('ダウンロード中にエラーが発生しました:', error);
      alert(error instanceof Error ? error.message : 'ダウンロード中にエラーが発生しました');
    } finally {
      setIsDownloading(false);
    }
  }, [exportAnnotations]);

  return (
    <button
      onClick={downloadAnnotations}
      disabled={isDownloading || annotations.length === 0}
      className={`
        w-full rounded px-4 py-2 transition-colors duration-200
        ${annotations.length === 0
          ? 'bg-gray-400 cursor-not-allowed'
          : isDownloading
            ? 'bg-blue-400 cursor-wait'
            : 'bg-blue-600 hover:bg-blue-500'
        }
        text-white
      `}
    >
      {isDownloading ? 'ダウンロード中...' : 'アノテーションをダウンロード'}
    </button>
  );
});
