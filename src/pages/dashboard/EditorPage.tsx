import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { useCMSStore } from '@/store/cmsStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import EditorToolbar from '@/components/editor/EditorToolbar';
import PageSettingsPanel from '@/components/editor/PageSettingsPanel';
import IconPicker from '@/components/editor/IconPicker';
import {
  Save, Globe, Eye, ChevronLeft, Settings2,
  CheckCircle2, Clock, AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ThemeId, PageStatus } from '@/types/cms';

export default function EditorPage() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { pages, createPage, updatePage, publishPage } = useCMSStore();

  const isNew = pageId === 'new' || !pageId;
  const existingPage = isNew ? null : pages.find((p) => p.id === pageId);

  const [title, setTitle] = useState(existingPage?.title || '');
  const [slug, setSlug] = useState(existingPage?.slug || '');
  const [status, setStatus] = useState<PageStatus>(existingPage?.status || 'draft');
  const [themeId, setThemeId] = useState<ThemeId>(existingPage?.themeId || 'clean');
  const [icon, setIcon] = useState(existingPage?.icon || 'FileText');
  const [tags, setTags] = useState<string[]>(existingPage?.tags || []);
  const [seoTitle, setSeoTitle] = useState(existingPage?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(existingPage?.seoDescription || '');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentPageId, setCurrentPageId] = useState<string | null>(existingPage?.id || null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: '여기에 콘텐츠를 작성하세요...' }),
      Underline,
      Highlight.configure({ multicolor: true }),
    ],
    content: existingPage?.blocks?.[0]?.content?.html as string || '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[60vh] px-8 py-6',
      },
    },
  });

  useEffect(() => {
    if (!slug && title) {
      setSlug(title.toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 60)
      );
    }
  }, [title]);

  const handleSave = useCallback(() => {
    const htmlContent = editor?.getHTML() || '';
    const blocks = [{ id: 'main', type: 'paragraph' as const, content: { html: htmlContent }, order: 0 }];

    if (isNew || !currentPageId) {
      const newPage = createPage({
        workspaceId: 'ws-1',
        title: title || '제목 없음',
        slug: slug || `page-${Date.now()}`,
        status: 'draft',
        themeId,
        icon,
        blocks,
        tags,
        seoTitle,
        seoDescription,
        author: user?.id || 'unknown',
      });
      setCurrentPageId(newPage.id);
      navigate(`/dashboard/editor/${newPage.id}`, { replace: true });
    } else {
      updatePage(currentPageId, { title, slug, themeId, icon, blocks, tags, seoTitle, seoDescription });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [editor, title, slug, themeId, icon, tags, seoTitle, seoDescription, isNew, currentPageId]);

  const handlePublish = () => {
    handleSave();
    if (currentPageId) {
      publishPage(currentPageId);
      setStatus('published');
    }
  };

  const wordCount = editor?.getText().split(/\s+/).filter(Boolean).length || 0;

  const STATUS_INFO = {
    draft: { label: '초안', icon: Clock, className: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
    published: { label: '발행됨', icon: CheckCircle2, className: 'text-green-600 bg-green-50 border-green-200' },
    archived: { label: '보관됨', icon: AlertCircle, className: 'text-gray-500 bg-gray-50 border-gray-200' },
  };

  const statusInfo = STATUS_INFO[status];
  const StatusIcon = statusInfo.icon;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Editor top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard/pages')}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn('gap-1.5 text-xs', statusInfo.className)}>
            <StatusIcon className="w-3 h-3" />
            {statusInfo.label}
          </Badge>

          <span className="text-xs text-gray-400 hidden sm:block">{wordCount} 단어</span>

          {saved && (
            <span className="text-xs text-green-600 flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" /> 저장됨
            </span>
          )}

          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={cn('p-2 rounded-lg transition-colors', settingsOpen ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100 text-gray-500')}
          >
            <Settings2 className="w-5 h-5" />
          </button>

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
            variant="outline"
            size="sm"
            onClick={handleSave}
            className="gap-1.5"
          >
            <Save className="w-4 h-4" />
            저장
          </Button>

          <Button
            size="sm"
            onClick={handlePublish}
            disabled={status === 'published'}
            className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5"
          >
            <Globe className="w-4 h-4" />
            {status === 'published' ? '발행됨' : '발행하기'}
          </Button>
        </div>
      </div>

      {/* Main editor area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {editor && <EditorToolbar editor={editor} />}

          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="px-8 pt-8 pb-4">
                <div className="flex items-center gap-2 mb-4">
                  <IconPicker value={icon} onChange={setIcon} />
                </div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요..."
                  className="w-full text-4xl font-bold text-gray-900 bg-transparent border-none outline-none placeholder:text-gray-300 mb-2 leading-tight"
                />
                <p className="text-sm text-gray-400">/{slug}</p>
              </div>

              <div className="bg-white mx-4 rounded-xl border border-gray-100 mb-8 min-h-96">
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>
        </div>

        {settingsOpen && (
          <PageSettingsPanel
            slug={slug}
            setSlug={setSlug}
            themeId={themeId}
            setThemeId={setThemeId}
            tags={tags}
            setTags={setTags}
            seoTitle={seoTitle}
            setSeoTitle={setSeoTitle}
            seoDescription={seoDescription}
            setSeoDescription={setSeoDescription}
            onClose={() => setSettingsOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
