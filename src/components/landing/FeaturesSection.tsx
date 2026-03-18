import { Layers, Palette, Zap, Globe, Shield, BarChart3, Code2, Users } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: '블록 기반 에디터',
    description: '드래그 앤 드롭으로 콘텐츠를 구성하세요. 20가지 이상의 블록 타입으로 무한한 레이아웃이 가능합니다.',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    icon: Palette,
    title: '테마 & 스타일',
    description: '브랜드에 맞는 테마를 선택하거나 커스터마이징하세요. 다크모드와 라이트모드를 모두 지원합니다.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Zap,
    title: '빠른 발행',
    description: '클릭 하나로 콘텐츠를 발행하세요. CDN을 통해 전 세계 어디서나 빠르게 로드됩니다.',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: Globe,
    title: '다국어 지원',
    description: '하나의 플랫폼에서 여러 언어로 콘텐츠를 관리하세요. 자동 번역 기능도 지원합니다.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Shield,
    title: '역할 기반 권한',
    description: '소유자, 에디터, 뷰어 권한을 세밀하게 설정하세요. 팀 협업을 안전하게 관리합니다.',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: BarChart3,
    title: '분석 & 인사이트',
    description: '페이지 조회수, 체류 시간, 전환율을 실시간으로 모니터링하세요.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Code2,
    title: 'API & 헤드리스',
    description: 'REST API와 GraphQL로 어떤 프론트엔드에도 콘텐츠를 연결하세요.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Users,
    title: '팀 협업',
    description: '실시간으로 팀원과 함께 콘텐츠를 편집하세요. 변경 이력도 자동으로 저장됩니다.',
    color: 'bg-pink-100 text-pink-600',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-3">Features</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            강력한 기능, 직관적인 경험
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            콘텐츠 관리에 필요한 모든 것을 하나의 플랫폼에서 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
