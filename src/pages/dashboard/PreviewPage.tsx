import { useParams, useNavigate } from 'react-router-dom';
import { Render } from '@measured/puck';
import '@measured/puck/puck.css';
import { puckConfig } from '@/lib/puckConfig';
import type { Data } from '@measured/puck';
import { useCMSStore } from '@/store/cmsStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit3, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PreviewPage() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { pages } = useCMSStore();
  const page = pages.find((p) => p.id === pageId);

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">페이지를 찾을 수 없습니다</h1>
          <Button onClick={() => navigate('/dashboard/pages')} variant="outline" className="mt-4 gap-2">
            <ArrowLeft className="w-4 h-4" /> 페이지 목록으로
          </Button>
        </div>
      </div>
    );
  }

  const hasPuckData = page.puckData && (page.puckData as Data).content && ((page.puckData as Data).content as unknown[]).length > 0;

  return (
    <div className="min-h-screen">
      {/* Thin preview bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur text-white px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 hover:text-gray-300">
            <ArrowLeft className="w-4 h-4" /> 뒤로
          </button>
          <span className="text-gray-500">|</span>
          <span className="text-gray-400">미리보기 — {page.title}</span>
          <Badge variant="outline" className={cn(
            'text-[10px]',
            page.status === 'published' ? 'border-green-500/50 text-green-400' : 'border-yellow-500/50 text-yellow-400'
          )}>
            {page.status === 'published' ? '발행됨' : '초안'}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700 h-7 text-xs gap-1" onClick={() => navigate(`/dashboard/editor/${page.id}`)}>
            <Edit3 className="w-3.5 h-3.5" /> 편집
          </Button>
          {page.status !== 'published' && (
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-500 text-white gap-1.5 h-7 text-xs"
              onClick={() => navigate(`/dashboard/editor/${page.id}`)}
            >
              <Globe className="w-3.5 h-3.5" />
              발행하기
            </Button>
          )}
        </div>
      </div>
      <div className="pt-10">
        {hasPuckData ? (
          <Render config={puckConfig} data={page.puckData as Data} />
        ) : (
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <p className="text-xl text-gray-400 mb-4">아직 콘텐츠가 없습니다.</p>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => navigate(`/dashboard/editor/${page.id}`)}
            >
              <Edit3 className="w-4 h-4" />
              편집하러 가기
            </Button>
          </div>
        )}
      </div>

      {/* Floating edit button */}
      <button
        onClick={() => navigate(`/dashboard/editor/${page.id}`)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50"
        title="편집하기"
      >
        <Edit3 className="w-5 h-5" />
      </button>
    </div>
  );
}
