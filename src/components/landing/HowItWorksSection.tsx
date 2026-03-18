import { FileText, Paintbrush, Rocket } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: FileText,
    title: '템플릿 선택',
    description: '블로그, 랜딩 페이지, 문서 등 다양한 템플릿 중에서 시작점을 선택하세요. 또는 처음부터 직접 만들 수도 있습니다.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    step: '02',
    icon: Paintbrush,
    title: '편집 & 커스터마이징',
    description: '직관적인 블록 에디터로 콘텐츠를 구성하고, 테마와 색상으로 브랜드에 맞게 스타일을 설정하세요.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    step: '03',
    icon: Rocket,
    title: '발행 & 공유',
    description: '버튼 하나로 콘텐츠를 발행하세요. 커스텀 도메인 설정, SEO 최적화, 소셜 미디어 공유까지 한번에 처리됩니다.',
    color: 'from-pink-500 to-pink-600',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-3">How It Works</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            3단계로 시작하는 콘텐츠 관리
          </h2>
          <p className="text-xl text-gray-500">
            복잡한 설정 없이 바로 시작할 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting lines */}
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-indigo-200 to-purple-200" />

          {steps.map((step) => (
            <div key={step.step} className="relative text-center">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-50 border border-indigo-100 rounded-full px-2 py-0.5">
                  {step.step}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
