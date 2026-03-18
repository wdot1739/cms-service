import { useState, useRef } from 'react';
import { useCMSStore } from '@/store/cmsStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, Trash2, Copy, Grid3X3, List, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const DEMO_ASSETS = [
  { id: 'demo-1', name: 'hero-image.jpg', url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop', type: 'image' as const, size: 245000, workspaceId: 'ws-1', uploadedBy: 'demo-user', uploadedAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString() },
  { id: 'demo-2', name: 'team-photo.jpg', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop', type: 'image' as const, size: 380000, workspaceId: 'ws-1', uploadedBy: 'demo-user', uploadedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString() },
  { id: 'demo-3', name: 'product-shot.jpg', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop', type: 'image' as const, size: 195000, workspaceId: 'ws-1', uploadedBy: 'demo-user', uploadedAt: new Date(Date.now() - 3600000 * 24 * 7).toISOString() },
  { id: 'demo-4', name: 'office.jpg', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop', type: 'image' as const, size: 320000, workspaceId: 'ws-1', uploadedBy: 'demo-user', uploadedAt: new Date(Date.now() - 3600000 * 24 * 10).toISOString() },
  { id: 'demo-5', name: 'dashboard-mock.jpg', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', type: 'image' as const, size: 280000, workspaceId: 'ws-1', uploadedBy: 'demo-user', uploadedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString() },
  { id: 'demo-6', name: 'abstract-bg.jpg', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop', type: 'image' as const, size: 420000, workspaceId: 'ws-1', uploadedBy: 'demo-user', uploadedAt: new Date(Date.now() - 3600000).toISOString() },
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function MediaPage() {
  const { user } = useAuthStore();
  const { mediaAssets, addMediaAsset, deleteMediaAsset } = useCMSStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allAssets = [...DEMO_ASSETS, ...mediaAssets];
  const filtered = allAssets.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleUpload = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      addMediaAsset({
        workspaceId: 'ws-1',
        name: file.name,
        url,
        type: file.type.startsWith('image/') ? 'image' : 'document',
        size: file.size,
        uploadedBy: user?.id || 'unknown',
      });
    });
  };

  const totalSize = allAssets.reduce((acc, a) => acc + a.size, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">미디어 라이브러리</h1>
          <p className="text-gray-500 text-sm mt-1">{allAssets.length}개 파일 · {formatBytes(totalSize)}</p>
        </div>
        <Button onClick={() => fileInputRef.current?.click()} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
          <Upload className="w-4 h-4" />
          업로드
        </Button>
        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleUpload(e.target.files)} />
      </div>

      {/* Drop zone */}
      <div
        className={cn(
          'border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-colors',
          dragging ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
        )}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleUpload(e.dataTransfer.files); }}
      >
        <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">파일을 여기에 드래그하거나 <button className="text-indigo-600 font-medium hover:underline" onClick={() => fileInputRef.current?.click()}>클릭하여 업로드</button></p>
        <p className="text-gray-400 text-xs mt-1">PNG, JPG, GIF, WebP · 최대 10MB</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            placeholder="파일 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 h-9 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button onClick={() => setViewMode('grid')} className={cn('p-2', viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'bg-white text-gray-400 hover:bg-gray-50')}>
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode('list')} className={cn('p-2', viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'bg-white text-gray-400 hover:bg-gray-50')}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filtered.map((asset) => (
            <div key={asset.id} className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">
              <div className="aspect-square bg-gray-50">
                <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => handleCopyUrl(asset.url, asset.id)} className="p-2 bg-white rounded-lg hover:bg-gray-100" title="URL 복사">
                  {copied === asset.id ? <span className="text-xs text-green-600 font-bold px-1">복사됨!</span> : <Copy className="w-4 h-4 text-gray-700" />}
                </button>
                {!asset.id.startsWith('demo-') && (
                  <button onClick={() => deleteMediaAsset(asset.id)} className="p-2 bg-white rounded-lg hover:bg-red-50" title="삭제">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </div>
              <div className="p-2">
                <p className="text-[11px] text-gray-700 font-medium truncate">{asset.name}</p>
                <p className="text-[10px] text-gray-400">{formatBytes(asset.size)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b bg-gray-50"><th className="text-left text-xs text-gray-500 px-4 py-3">파일</th><th className="text-left text-xs text-gray-500 px-4 py-3">크기</th><th className="text-left text-xs text-gray-500 px-4 py-3">업로드</th><th className="px-4 py-3" /></tr></thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={asset.url} alt={asset.name} className="w-10 h-10 object-cover rounded-lg" />
                      <span className="text-sm font-medium text-gray-900">{asset.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatBytes(asset.size)}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{formatDistanceToNow(new Date(asset.uploadedAt), { addSuffix: true, locale: ko })}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 justify-end">
                      <button onClick={() => handleCopyUrl(asset.url, asset.id)} className="p-1.5 rounded hover:bg-gray-100 text-gray-400">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
