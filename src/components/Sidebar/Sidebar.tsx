'use client';

import { memo } from 'react';
import { DownloadButton } from '@/components/DownloadButton';
import { AnnotationTypeSelector } from '@/components/AnnotationTypeSelector/AnnotationTypeSelector';
import { ImageLoader } from '@/components/ImageLoader';

interface SidebarProps {
  onImagesLoaded?: (urls: string[]) => void;
}
export const Sidebar = memo(function Sidebar({ onImagesLoaded }: SidebarProps) {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 shadow-lg overflow-y-auto">
      <h1 className="text-2xl font-bold mb-8">AnyLabel</h1>
      <div className="space-y-4">
        {onImagesLoaded && <ImageLoader onImagesLoaded={onImagesLoaded} />}
        <AnnotationTypeSelector />
        <DownloadButton />
      </div>
    </aside>
  );
});
