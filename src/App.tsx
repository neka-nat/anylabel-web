import { memo } from 'react';
import { ImageDisplayArea } from './components/ImageDisplayArea';
import { AnnotationProvider } from './contexts/AnnotationContext';
import { Sidebar } from './components/Sidebar';

const DEFAULT_IMAGE_URL = 'https://i.gzn.jp/img/2009/06/18/lenna/000.jpg';

export const App = memo(function App() {
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
});

export default App;
