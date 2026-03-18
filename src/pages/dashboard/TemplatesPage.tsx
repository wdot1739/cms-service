import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMSStore } from '@/store/cmsStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout, Plus, FileText, Globe, BookOpen, Briefcase, Camera, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Template } from '@/types/cms';

const CATEGORY_CONFIG = {
  blog: { label: '블로그', icon: FileText, color: 'bg-blue-50 text-blue-600' },
  landing: { label: '랜딩페이지', icon: Globe, color: 'bg-indigo-50 text-indigo-600' },
  docs: { label: '문서', icon: BookOpen, color: 'bg-green-50 text-green-600' },
  portfolio: { label: '포트폴리오', icon: Camera, color: 'bg-purple-50 text-purple-600' },
  product: { label: '제품', icon: Briefcase, color: 'bg-orange-50 text-orange-600' },
};

type Category = keyof typeof CATEGORY_CONFIG | 'all';

function TemplateCard({ template, onUse }: { template: Template; onUse: (t: Template) => void }) {
  const { label, icon: Icon, color } = CATEGORY_CONFIG[template.category];
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
      <div className="relative h-44 overflow-hidden">
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            onClick={() => onUse(template)}
            className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg gap-1 h-8 text-xs"
          >
            이 템플릿 사용 <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-6 h-6 rounded-md flex items-center justify-center ${color}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs text-gray-500 font-medium">{label}</span>
        </div>
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{template.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-2">{template.description}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {template.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 bg-gray-50 text-gray-500 border-0">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { templates, createPage } = useCMSStore();
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filtered = activeCategory === 'all'
    ? templates
    : templates.filter((t) => t.category === activeCategory);

  const categoryCounts = Object.fromEntries(
    Object.keys(CATEGORY_CONFIG).map((k) => [k, templates.filter((t) => t.category === k).length])
  );

  const handleUseTemplate = (template: Template) => {
    const newPage = createPage({
      workspaceId: 'ws-1',
      title: `${template.name} - 새 페이지`,
      slug: `${template.id}-${Date.now()}`,
      status: 'draft',
      themeId: 'clean',
      icon: '📄',
      blocks: template.blocks.map((b) => ({ ...b, id: `${b.id}-${Date.now()}` })),
      templateId: template.id,
      tags: template.tags,
      author: user?.id || 'unknown',
    });
    navigate(`/dashboard/editor/${newPage.id}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">템플릿 갤러리</h1>
          <Button
            variant="outline"
            className="gap-2 text-gray-600"
            onClick={() => navigate('/dashboard/editor/new')}
          >
            <Plus className="w-4 h-4" />
            빈 페이지 만들기
          </Button>
        </div>
        <p className="text-gray-500">전문적으로 제작된 템플릿으로 빠르게 시작하세요.</p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all',
            activeCategory === 'all'
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
          )}
        >
          <Layout className="w-4 h-4" />
          전체
          <span className={cn(
            'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
            activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
          )}>
            {templates.length}
          </span>
        </button>
        {(Object.entries(CATEGORY_CONFIG) as [Category, typeof CATEGORY_CONFIG[keyof typeof CATEGORY_CONFIG]][]).map(([key, cfg]) => {
          if (key === 'all') return null;
          const Icon = cfg.icon;
          return (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all',
                activeCategory === key
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
              )}
            >
              <Icon className="w-4 h-4" />
              {cfg.label}
              <span className={cn(
                'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                activeCategory === key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              )}>
                {categoryCounts[key] || 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Start from scratch card */}
      <div
        className="border-2 border-dashed border-gray-200 rounded-xl p-8 mb-8 flex items-center justify-between hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group"
        onClick={() => navigate('/dashboard/editor/new')}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
            <Plus className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">처음부터 시작하기</h3>
            <p className="text-sm text-gray-500">빈 캔버스에서 자유롭게 콘텐츠를 구성하세요.</p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((template) => (
          <TemplateCard key={template.id} template={template} onUse={handleUseTemplate} />
        ))}
      </div>
    </div>
  );
}
