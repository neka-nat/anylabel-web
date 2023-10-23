import React from 'react';
import { DownloadButton } from '../DownloadButton';

export const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-48 fixed bg-gray-600 text-white p-4">
      <DownloadButton />
    </div>
  );
};
