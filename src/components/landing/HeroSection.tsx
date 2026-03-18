import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered CMS Platform
          </Badge>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            콘텐츠 관리의{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              새로운 기준
            </span>
          </h1>

          <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            FlowCMS로 팀의 콘텐츠를 더 빠르게 만들고, 더 쉽게 관리하고, 더 넓게 배포하세요.
            직관적인 에디터와 강력한 템플릿 시스템을 경험해보세요.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link to="/login">
              <Button size="lg" className="bg-indigo-500 hover:bg-indigo-400 text-white px-8 h-12 text-base gap-2">
                무료로 시작하기
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 h-12 text-base gap-2 bg-transparent"
              >
                <Play className="w-4 h-4" />
                데모 보기
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12 mb-16">
            {[
              { value: '10,000+', label: '활성 사용자' },
              { value: '500K+', label: '발행된 페이지' },
              { value: '99.9%', label: '업타임' },
              { value: '150+', label: '국가' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-indigo-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mock product screenshot */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 to-transparent z-10 pointer-events-none" style={{ top: '70%' }} />
            <div className="bg-gray-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 max-w-sm mx-auto text-center">
                  app.flowcms.io/dashboard
                </div>
              </div>
              {/* Dashboard mock */}
              <div className="flex h-80">
                {/* Sidebar */}
                <div className="w-56 bg-gray-900 border-r border-white/5 p-4 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-6 h-6 bg-indigo-500 rounded" />
                    <span className="text-white text-sm font-medium">My Workspace</span>
                  </div>
                  {['대시보드', '페이지', '템플릿', '미디어', '설정'].map((item, i) => (
                    <div
                      key={item}
                      className={`px-3 py-2 rounded-lg text-xs mb-1 ${i === 0 ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                {/* Main area */}
                <div className="flex-1 p-6 bg-gray-900">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-white font-medium">최근 페이지</div>
                    <div className="w-20 h-7 bg-indigo-600 rounded-md" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { title: 'Landing Page', status: '발행됨', color: 'bg-green-500' },
                      { title: 'Blog Post', status: '초안', color: 'bg-yellow-500' },
                      { title: 'Docs', status: '발행됨', color: 'bg-green-500' },
                    ].map((page) => (
                      <div key={page.title} className="bg-gray-800 rounded-lg p-3">
                        <div className="h-20 bg-indigo-900/50 rounded-md mb-3" />
                        <div className="text-white text-xs font-medium">{page.title}</div>
                        <div className={`inline-block text-[10px] px-1.5 py-0.5 rounded-full text-white mt-1 ${page.color}`}>
                          {page.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
