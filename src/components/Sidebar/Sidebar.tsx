import { memo } from 'react';
import { DownloadButton } from '../DownloadButton';

export const Sidebar = memo(function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">ツール</h2>
      <div className="space-y-4">
        <DownloadButton />
      </div>
    </aside>
  );
});
