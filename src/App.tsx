import React from 'react';
import { ImageDisplayArea } from './components/ImageDisplayArea';
import { AnnotationProvider } from './contexts/AnnotationContext';
import { Sidebar } from './components/Sidebar';

function App() {
  const imageUrl = 'https://i.gzn.jp/img/2009/06/18/lenna/000.jpg';
  return (
    <div className="App">
      <AnnotationProvider>
        <Sidebar />
        <div className="ml-64 p-4">
          <ImageDisplayArea imageUrl={imageUrl} />
        </div>
      </AnnotationProvider>
    </div>
  );
}

export default App;
