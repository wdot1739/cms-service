import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMSStore } from '@/store/cmsStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Plus, Search, Grid3X3, List,
  Edit3, Eye, Trash2, Copy, Globe,
  FileText, MoreHorizontal, Check,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import type { Page, PageStatus } from '@/types/cms';

const STATUS_CONFIG: Record<PageStatus, { label: string; className: string }> = {
  published: { label: '발행됨', className: 'bg-green-100 text-green-700 border-green-200' },
  draft: { label: '초안', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  archived: { label: '보관됨', className: 'bg-gray-100 text-gray-600 border-gray-200' },
};

type SortKey = 'updatedAt' | 'title' | 'viewCount' | 'status';
type ViewMode = 'grid' | 'list';

export default function PagesListPage() {
  const navigate = useNavigate();
  const { pages, deletePage, publishPage, duplicatePage } = useCMSStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<PageStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortKey>('updatedAt');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filtered = pages
    .filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'viewCount') return b.viewCount - a.viewCount;
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedIds(next);
  };

  const handleDelete = (page: Page) => {
    if (confirm(`"${page.title}" 페이지를 삭제할까요?`)) {
      deletePage(page.id);
      setActiveMenu(null);
    }
  };

  const statusCounts = {
    all: pages.length,
    published: pages.filter((p) => p.status === 'published').length,
    draft: pages.filter((p) => p.status === 'draft').length,
    archived: pages.filter((p) => p.status === 'archived').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto" onClick={() => setActiveMenu(null)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">페이지 관리</h1>
          <p className="text-gray-500 text-sm mt-1">총 {pages.length}개 페이지</p>
        </div>
        <Button
          onClick={() => navigate('/dashboard/editor/new')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          새 페이지
        </Button>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {(['all', 'published', 'draft', 'archived'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5',
              statusFilter === s
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {s === 'all' ? '전체' : STATUS_CONFIG[s].label}
            <span className={cn(
              'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
              statusFilter === s ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-500'
            )}>
              {statusCounts[s]}
            </span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="페이지 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortKey)}
          className="h-9 text-sm border border-gray-200 rounded-lg px-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="updatedAt">최근 수정순</option>
          <option value="title">이름순</option>
          <option value="viewCount">조회수순</option>
          <option value="status">상태순</option>
        </select>
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={cn('p-2 transition-colors', viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'bg-white text-gray-400 hover:bg-gray-50')}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn('p-2 transition-colors', viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'bg-white text-gray-400 hover:bg-gray-50')}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bulk actions */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 mb-4">
          <span className="text-sm font-medium text-indigo-700">{selectedIds.size}개 선택됨</span>
          <Button size="sm" variant="outline" onClick={() => setSelectedIds(new Set())} className="h-7 text-xs">
            선택 해제
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="h-7 text-xs"
            onClick={() => {
              if (confirm(`${selectedIds.size}개 페이지를 삭제할까요?`)) {
                selectedIds.forEach((id) => deletePage(id));
                setSelectedIds(new Set());
              }
            }}
          >
            삭제
          </Button>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-24">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-500 font-medium">페이지가 없습니다</h3>
          <p className="text-gray-400 text-sm mt-1">새 페이지를 만들거나 검색 조건을 변경해보세요.</p>
          <Button onClick={() => navigate('/dashboard/editor/new')} className="mt-4 bg-indigo-600 text-white">
            새 페이지 만들기
          </Button>
        </div>
      )}

      {/* Grid view */}
      {viewMode === 'grid' && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((page) => {
            const status = STATUS_CONFIG[page.status];
            const isSelected = selectedIds.has(page.id);
            return (
              <div
                key={page.id}
                className={cn(
                  'bg-white rounded-xl border hover:shadow-md transition-all group relative cursor-pointer',
                  isSelected ? 'border-indigo-400 ring-2 ring-indigo-200' : 'border-gray-100'
                )}
              >
                {/* Thumbnail */}
                <div
                  className="h-36 rounded-t-xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center relative overflow-hidden"
                  onClick={() => navigate(`/dashboard/editor/${page.id}`)}
                >
                  <span className="text-5xl">{page.icon || '📄'}</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-semibold text-gray-900 text-sm truncate cursor-pointer hover:text-indigo-600"
                        onClick={() => navigate(`/dashboard/editor/${page.id}`)}
                      >
                        {page.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatDistanceToNow(new Date(page.updatedAt), { addSuffix: true, locale: ko })}
                      </p>
                    </div>
                    <div className="relative" onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === page.id ? null : page.id); }}>
                      <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {activeMenu === page.id && (
                        <div className="absolute right-0 top-7 w-40 bg-white border border-gray-100 rounded-xl shadow-xl z-10 py-1">
                          <button onClick={() => { navigate(`/dashboard/editor/${page.id}`); setActiveMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-gray-700">
                            <Edit3 className="w-3.5 h-3.5" /> 편집
                          </button>
                          <button onClick={() => { navigate(`/preview/${page.id}`); setActiveMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-gray-700">
                            <Eye className="w-3.5 h-3.5" /> 미리보기
                          </button>
                          {page.status !== 'published' && (
                            <button onClick={() => { publishPage(page.id); setActiveMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-green-600">
                              <Globe className="w-3.5 h-3.5" /> 발행하기
                            </button>
                          )}
                          <button onClick={() => { duplicatePage(page.id); setActiveMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-gray-700">
                            <Copy className="w-3.5 h-3.5" /> 복제
                          </button>
                          <div className="border-t border-gray-100 my-1" />
                          <button onClick={() => handleDelete(page)} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-red-50 text-red-600">
                            <Trash2 className="w-3.5 h-3.5" /> 삭제
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="outline" className={`text-[10px] ${status.className}`}>
                      {status.label}
                    </Badge>
                    {page.viewCount > 0 && (
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Eye className="w-2.5 h-2.5" /> {page.viewCount.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Select checkbox */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSelect(page.id); }}
                  className={cn(
                    'absolute top-2 left-2 w-5 h-5 rounded border-2 flex items-center justify-center transition-all',
                    isSelected
                      ? 'bg-indigo-600 border-indigo-600 opacity-100'
                      : 'bg-white border-gray-300 opacity-0 group-hover:opacity-100'
                  )}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* List view */}
      {viewMode === 'list' && filtered.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 w-8" />
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">페이지</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">상태</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">조회수</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">수정일</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 w-24">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((page) => {
                const status = STATUS_CONFIG[page.status];
                return (
                  <tr key={page.id} className="hover:bg-gray-50 group">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(page.id)}
                        onChange={() => toggleSelect(page.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{page.icon || '📄'}</span>
                        <div>
                          <p
                            className="font-medium text-gray-900 text-sm hover:text-indigo-600 cursor-pointer"
                            onClick={() => navigate(`/dashboard/editor/${page.id}`)}
                          >
                            {page.title}
                          </p>
                          <p className="text-xs text-gray-400">/{page.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={`text-[10px] ${status.className}`}>
                        {status.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {page.viewCount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {formatDistanceToNow(new Date(page.updatedAt), { addSuffix: true, locale: ko })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => navigate(`/dashboard/editor/${page.id}`)} className="p-1.5 rounded hover:bg-indigo-50 text-gray-400 hover:text-indigo-600">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => navigate(`/preview/${page.id}`)} className="p-1.5 rounded hover:bg-gray-100 text-gray-400">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(page)} className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
