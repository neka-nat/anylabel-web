import React from 'react';
import './App.css';
import ImageDisplayArea from './components/ImageDisplayArea';
import { DownloadButton } from './components/DownloadButton';
import { AnnotationProvider } from './contexts/AnnotationContext';

function App() {
  const imageUrl = 'https://i.gzn.jp/img/2009/06/18/lenna/000.jpg';
  return (
    <div className="App">
      <AnnotationProvider>
        <ImageDisplayArea imageUrl={imageUrl} />
        <DownloadButton />
      </AnnotationProvider>
    </div>
  );
}

export default App;
