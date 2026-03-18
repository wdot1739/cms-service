import { useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Puck, type Data } from '@measured/puck';
import '@measured/puck/puck.css';
import { puckConfig } from '@/lib/puckConfig';
import { BLANK_PAGE_PUCK_DATA } from '@/lib/defaultPuckData';
import { useCMSStore } from '@/store/cmsStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Globe, Eye, ChevronLeft,
  CheckCircle2, Clock, AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ThemeId, PageStatus, PuckPageData } from '@/types/cms';

const STATUS_INFO = {
  draft: { label: '초안', icon: Clock, className: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  published: { label: '발행됨', icon: CheckCircle2, className: 'text-green-600 bg-green-50 border-green-200' },
  archived: { label: '보관됨', icon: AlertCircle, className: 'text-gray-500 bg-gray-50 border-gray-200' },
};

export default function EditorPage() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { pages, createPage, updatePage, publishPage } = useCMSStore();

  const isNew = pageId === 'new' || !pageId;
  const existingPage = isNew ? null : pages.find((p) => p.id === pageId);

  const [title, setTitle] = useState(existingPage?.title || '');
  const [status, setStatus] = useState<PageStatus>(existingPage?.status || 'draft');
  const [currentPageId, setCurrentPageId] = useState<string | null>(existingPage?.id || null);
  const [saved, setSaved] = useState(false);

  const initialData: Data = (existingPage?.puckData as Data) || (BLANK_PAGE_PUCK_DATA as Data);
  const currentDataRef = useRef<Data>(initialData);

  const handleSave = useCallback((data: Data) => {
    const puckData = data as unknown as PuckPageData;

    if (isNew || !currentPageId) {
      const slug = title
        ? title.toLowerCase().replace(/[^a-z0-9가-힣\s-]/g, '').replace(/\s+/g, '-').slice(0, 60)
        : `page-${Date.now()}`;
      const newPage = createPage({
        workspaceId: 'ws-1',
        title: title || '제목 없음',
        slug,
        status: 'draft',
        themeId: 'clean' as ThemeId,
        icon: 'FileText',
        blocks: [],
        puckData,
        tags: [],
        author: user?.id || 'unknown',
      });
      setCurrentPageId(newPage.id);
      navigate(`/dashboard/editor/${newPage.id}`, { replace: true });
    } else {
      updatePage(currentPageId, { title, puckData, blocks: [] });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [title, isNew, currentPageId, user, createPage, updatePage, navigate]);

  const handlePublish = useCallback((data: Data) => {
    const puckData = data as unknown as PuckPageData;

    if (isNew || !currentPageId) {
      // Create the page first, then publish it
      const slug = title
        ? title.toLowerCase().replace(/[^a-z0-9가-힣\s-]/g, '').replace(/\s+/g, '-').slice(0, 60)
        : `page-${Date.now()}`;
      const newPage = createPage({
        workspaceId: 'ws-1',
        title: title || '제목 없음',
        slug,
        status: 'draft',
        themeId: 'clean' as ThemeId,
        icon: 'FileText',
        blocks: [],
        puckData,
        tags: [],
        author: user?.id || 'unknown',
      });
      setCurrentPageId(newPage.id);
      publishPage(newPage.id);
      setStatus('published');
      navigate(`/dashboard/editor/${newPage.id}`, { replace: true });
    } else {
      updatePage(currentPageId, { title, puckData, blocks: [] });
      publishPage(currentPageId);
      setStatus('published');
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [title, isNew, currentPageId, user, createPage, updatePage, publishPage, navigate]);

  const statusInfo = STATUS_INFO[status];
  const StatusIcon = statusInfo.icon;

  return (
    <div className="flex flex-col h-full">
      {/* Top bar above Puck */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-200 flex-shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard/pages')}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="페이지 제목"
            className="text-base font-semibold text-gray-900 bg-transparent border-none outline-none placeholder:text-gray-400 min-w-48 max-w-64"
          />
          <Badge variant="outline" className={cn('gap-1.5 text-xs', statusInfo.className)}>
            <StatusIcon className="w-3 h-3" />
            {statusInfo.label}
          </Badge>
          {saved && (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 저장됨
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSave(currentDataRef.current)}
            className="gap-1.5"
          >
            저장
          </Button>
          {currentPageId && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/preview/${currentPageId}`)}
              className="gap-1.5"
            >
              <Eye className="w-4 h-4" />
              미리보기
            </Button>
          )}
          <Button
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5"
            onClick={() => handlePublish(currentDataRef.current)}
          >
            <Globe className="w-4 h-4" />
            {status === 'published' ? '저장 & 재발행' : '발행하기'}
          </Button>
        </div>
      </div>

      {/* Puck editor fills remaining space */}
      <div className="flex-1 min-h-0 overflow-hidden [&_.Puck]:h-full [&_.PuckLayout]:h-full [&_.PuckLayout-inner]:h-full">
        <Puck
          config={puckConfig}
          data={initialData}
          onChange={(data) => { currentDataRef.current = data; }}
          onPublish={async (data) => {
            handlePublish(data);
          }}
          overrides={{
            headerActions: ({ children }) => (
              <div className="flex items-center gap-2">
                {children}
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}
