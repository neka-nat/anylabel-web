'use client';

import dynamic from 'next/dynamic';
import { AnnotationProvider } from '@/contexts/AnnotationContext';
import { Sidebar } from '@/components/Sidebar';

// Konvaコンポーネントをクライアントサイドでのみ読み込む
const ImageDisplayArea = dynamic(
  () => import('@/components/ImageDisplayArea').then(mod => mod.ImageDisplayArea),
  { ssr: false }
);

const DEFAULT_IMAGE_URL = 'https://i.gzn.jp/img/2009/06/18/lenna/000.jpg';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AnnotationProvider>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 p-4">
            <ImageDisplayArea imageUrl={DEFAULT_IMAGE_URL} />
          </main>
        </div>
      </AnnotationProvider>
    </div>
  );
} 