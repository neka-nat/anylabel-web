import { memo, useState } from 'react';
import { ImageDisplayArea } from './components/ImageDisplayArea';
import {
  AnnotationProvider,
  useAnnotation,
} from './contexts/AnnotationContext';
import { Sidebar } from './components/Sidebar';

const DEFAULT_IMAGE_URL = 'https://i.gzn.jp/img/2009/06/18/lenna/000.jpg';

export const App = memo(function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AnnotationProvider>
        <AppContent />
      </AnnotationProvider>
    </div>
  );
});

function AppContent() {
  const { clearAnnotations } = useAnnotation();
  const [imageUrls, setImageUrls] = useState<string[]>([DEFAULT_IMAGE_URL]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImagesLoaded = (urls: string[]) => {
    if (urls.length > 0) {
      setImageUrls(urls);
      setCurrentIndex(0);
      clearAnnotations();
    }
  };

  const showPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      clearAnnotations();
    }
  };

  const showNext = () => {
    if (currentIndex < imageUrls.length - 1) {
      setCurrentIndex(currentIndex + 1);
      clearAnnotations();
    }
  };

  return (
    <div className="flex">
      <Sidebar onImagesLoaded={handleImagesLoaded} />
      <main className="flex-1 ml-64 p-4">
        <ImageDisplayArea imageUrl={imageUrls[currentIndex]} />
        {imageUrls.length > 1 && (
          <div className="flex justify-center items-center mt-4 gap-4">
            <button
              onClick={showPrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2 rounded text-white ${
                currentIndex === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500'
              }`}
            >
              前へ
            </button>
            <span>
              {currentIndex + 1} / {imageUrls.length}
            </span>
            <button
              onClick={showNext}
              disabled={currentIndex === imageUrls.length - 1}
              className={`px-4 py-2 rounded text-white ${
                currentIndex === imageUrls.length - 1
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500'
              }`}
            >
              次へ
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
