'use client';

import { memo } from 'react';

interface ImageLoaderProps {
  onImagesLoaded: (urls: string[]) => void;
}

export const ImageLoader = memo(function ImageLoader({
  onImagesLoaded,
}: ImageLoaderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    onImagesLoaded(urls);
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow mb-4">
      <h2 className="text-lg font-bold mb-2">画像読み込み</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        ref={(input) => {
          if (input) {
            input.setAttribute('directory', '');
            input.setAttribute('webkitdirectory', '');
          }
        }}
        className="w-full"
      />
    </div>
  );
});
