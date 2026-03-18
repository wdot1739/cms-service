import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useCMSStore } from '@/store/cmsStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText, Eye, TrendingUp, Plus, ArrowRight,
  Clock, Globe, Edit3, BarChart2, Sparkles,
} from 'lucide-react';
import { PageIcon } from '@/components/editor/IconPicker';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

function StatCard({ icon: Icon, label, value, change, color }: {
  icon: React.ElementType; label: string; value: string | number;
  change?: string; color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {change && (
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {change}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

const STATUS_CONFIG = {
  published: { label: '발행됨', className: 'bg-green-100 text-green-700 border-green-200' },
  draft: { label: '초안', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  archived: { label: '보관됨', className: 'bg-gray-100 text-gray-600 border-gray-200' },
};

export default function DashboardHome() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { pages, templates } = useCMSStore();

  const totalViews = pages.reduce((acc, p) => acc + p.viewCount, 0);
  const publishedCount = pages.filter((p) => p.status === 'published').length;
  const recentPages = [...pages].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? '좋은 아침이에요' : hour < 18 ? '안녕하세요' : '좋은 저녁이에요';

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {greeting}, {user?.name?.split(' ')[0]}님
          </h1>
          <p className="text-gray-500 mt-1">오늘도 멋진 콘텐츠를 만들어보세요.</p>
        </div>
        <Button
          onClick={() => navigate('/dashboard/editor/new')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          새 페이지
        </Button>
      </div>

      {/* Tutorial Banner */}
      <div className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <h2 className="font-bold text-lg">튜토리얼</h2>
            </div>
            <p className="text-indigo-100 text-sm mb-4">
              이 랜딩 페이지는 FlowCMS로 제작되었습니다. 에디터를 열어 직접 수정해보세요!
            </p>
            <Button
              onClick={() => navigate('/dashboard/editor/page-landing')}
              className="bg-white text-indigo-700 hover:bg-indigo-50 gap-2 font-semibold"
            >
              <Edit3 className="w-4 h-4" />
              랜딩 페이지 편집해보기
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={FileText} label="전체 페이지" value={pages.length} change="+2 이번 주" color="bg-indigo-100 text-indigo-600" />
        <StatCard icon={Globe} label="발행된 페이지" value={publishedCount} color="bg-green-100 text-green-600" />
        <StatCard icon={Eye} label="총 조회수" value={totalViews.toLocaleString()} change="+12%" color="bg-blue-100 text-blue-600" />
        <StatCard icon={BarChart2} label="템플릿" value={templates.length} color="bg-purple-100 text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Pages */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              최근 페이지
            </h2>
            <Link to="/dashboard/pages" className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              모두 보기 <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentPages.map((page) => {
              const status = STATUS_CONFIG[page.status];
              return (
                <div key={page.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors group">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg flex-shrink-0">
                    <PageIcon name={page.icon || 'FileText'} size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 text-sm truncate">{page.title}</p>
                      <Badge variant="outline" className={`text-[10px] ${status.className} flex-shrink-0`}>
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {formatDistanceToNow(new Date(page.updatedAt), { addSuffix: true, locale: ko })} 수정
                    </p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => navigate(`/dashboard/editor/${page.id}`)}
                      className="p-1.5 rounded-md hover:bg-indigo-50 text-gray-400 hover:text-indigo-600"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/preview/${page.id}`)}
                      className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions + Activity */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">빠른 시작</h2>
            <div className="space-y-2">
              {[
                { icon: Edit3, label: '랜딩 페이지 편집해보기', to: '/dashboard/editor/page-landing', color: 'text-white bg-indigo-600' },
                { icon: FileText, label: '빈 페이지 만들기', to: '/dashboard/editor/new', color: 'text-indigo-600 bg-indigo-50' },
                { icon: TrendingUp, label: '템플릿으로 시작', to: '/dashboard/templates', color: 'text-purple-600 bg-purple-50' },
                { icon: Globe, label: '발행된 페이지 보기', to: '/dashboard/pages', color: 'text-green-600 bg-green-50' },
              ].map(({ icon: Icon, label, to, color }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">{label}</span>
                  <ArrowRight className="w-3 h-3 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Top pages */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              인기 페이지
            </h2>
            <div className="space-y-3">
              {[...pages]
                .filter((p) => p.status === 'published')
                .sort((a, b) => b.viewCount - a.viewCount)
                .slice(0, 3)
                .map((page, i) => (
                  <div key={page.id} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 w-4">#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{page.title}</p>
                      <p className="text-xs text-gray-500">{page.viewCount.toLocaleString()} views</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
