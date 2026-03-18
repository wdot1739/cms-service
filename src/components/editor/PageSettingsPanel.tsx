import { useState } from 'react';
import { X, Plus, Tag } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { ThemeId } from '@/types/cms';
import { cn } from '@/lib/utils';

const THEMES: { id: ThemeId; name: string; colors: { bg: string; accent: string } }[] = [
  { id: 'clean', name: '클린', colors: { bg: 'bg-white', accent: 'bg-indigo-500' } },
  { id: 'dark', name: '다크', colors: { bg: 'bg-gray-900', accent: 'bg-purple-500' } },
  { id: 'colorful', name: '컬러풀', colors: { bg: 'bg-gradient-to-br from-pink-100 to-indigo-100', accent: 'bg-pink-500' } },
  { id: 'minimal', name: '미니멀', colors: { bg: 'bg-gray-50', accent: 'bg-gray-800' } },
  { id: 'corporate', name: '코퍼레이트', colors: { bg: 'bg-blue-50', accent: 'bg-blue-700' } },
];

interface Props {
  slug: string;
  setSlug: (v: string) => void;
  themeId: ThemeId;
  setThemeId: (v: ThemeId) => void;
  tags: string[];
  setTags: (v: string[]) => void;
  seoTitle: string;
  setSeoTitle: (v: string) => void;
  seoDescription: string;
  setSeoDescription: (v: string) => void;
  onClose: () => void;
}

export default function PageSettingsPanel({
  slug, setSlug, themeId, setThemeId,
  tags, setTags, seoTitle, setSeoTitle,
  seoDescription, setSeoDescription, onClose,
}: Props) {
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  return (
    <div className="w-72 bg-white border-l border-gray-200 flex flex-col overflow-hidden flex-shrink-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 text-sm">페이지 설정</h3>
        <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 text-gray-500">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* URL Slug */}
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">URL 슬러그</Label>
          <div className="flex items-center">
            <span className="text-sm text-gray-400 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg px-2 py-2">/</span>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value.replace(/[^a-z0-9-]/g, ''))}
              className="rounded-l-none text-sm h-9"
              placeholder="my-page"
            />
          </div>
        </div>

        {/* Theme */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">페이지 테마</Label>
          <div className="grid grid-cols-5 gap-2">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setThemeId(theme.id)}
                title={theme.name}
                className={cn(
                  'flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all',
                  themeId === theme.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className={`w-8 h-6 rounded ${theme.colors.bg} border border-gray-200 overflow-hidden`}>
                  <div className={`h-1 w-full ${theme.colors.accent}`} />
                </div>
                <span className="text-[9px] text-gray-500 truncate w-full text-center">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">태그</Label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full border border-indigo-100">
                <Tag className="w-2.5 h-2.5" />
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-0.5 hover:text-red-500">
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTag()}
              placeholder="태그 추가..."
              className="h-8 text-sm flex-1"
            />
            <Button size="sm" variant="outline" onClick={addTag} className="h-8 w-8 p-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* SEO */}
        <div className="space-y-3">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">SEO 설정</Label>
          <div className="space-y-1.5">
            <Label className="text-xs text-gray-500">SEO 제목</Label>
            <Input
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="SEO용 제목"
              className="h-9 text-sm"
            />
            <p className="text-[10px] text-gray-400">{seoTitle.length}/60자</p>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-gray-500">메타 설명</Label>
            <Textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="검색 엔진에 표시될 설명..."
              className="text-sm resize-none"
              rows={3}
            />
            <p className="text-[10px] text-gray-400">{seoDescription.length}/160자</p>
          </div>
        </div>

        {/* SEO Preview */}
        {(seoTitle || seoDescription) && (
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">검색 미리보기</Label>
            <div className="border border-gray-200 rounded-lg p-3 bg-white">
              <p className="text-sm text-blue-600 font-medium truncate">{seoTitle || '제목 없음'}</p>
              <p className="text-xs text-green-700 mt-0.5">flowcms.io/{slug}</p>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{seoDescription}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
