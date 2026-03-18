import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Free',
    price: '₩0',
    period: '/월',
    description: '개인 프로젝트와 소규모 팀에 적합',
    cta: '무료로 시작',
    featured: false,
    features: [
      '최대 5개 페이지',
      '3가지 템플릿',
      '1GB 미디어 스토리지',
      '기본 분석',
      '커뮤니티 지원',
    ],
  },
  {
    name: 'Pro',
    price: '₩15,000',
    period: '/월',
    description: '성장하는 팀과 비즈니스에 최적화',
    cta: 'Pro 시작하기',
    featured: true,
    badge: '가장 인기',
    features: [
      '무제한 페이지',
      '모든 템플릿 (50+)',
      '50GB 미디어 스토리지',
      '고급 분석 & 리포트',
      '커스텀 도메인',
      'API 접근',
      '우선 지원',
      '팀원 5명',
    ],
  },
  {
    name: 'Enterprise',
    price: '문의',
    period: '',
    description: '대규모 조직과 엔터프라이즈 요구사항',
    cta: '영업팀 문의',
    featured: false,
    features: [
      'Pro의 모든 기능',
      '무제한 팀원',
      '500GB+ 스토리지',
      'SSO & SAML',
      '전용 서버',
      'SLA 보장',
      '24/7 전담 지원',
      '커스텀 계약',
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">투명한 가격 정책</h2>
          <p className="text-xl text-gray-500">숨겨진 비용 없이 팀에 맞는 플랜을 선택하세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'rounded-2xl p-8 border relative',
                plan.featured
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl scale-105'
                  : 'bg-white border-gray-200'
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={cn('text-lg font-bold mb-1', plan.featured ? 'text-indigo-100' : 'text-gray-900')}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className={cn('text-4xl font-bold', plan.featured ? 'text-white' : 'text-gray-900')}>
                    {plan.price}
                  </span>
                  <span className={cn('text-sm', plan.featured ? 'text-indigo-200' : 'text-gray-500')}>
                    {plan.period}
                  </span>
                </div>
                <p className={cn('text-sm mt-2', plan.featured ? 'text-indigo-200' : 'text-gray-500')}>
                  {plan.description}
                </p>
              </div>

              <Link to="/login">
                <Button
                  className={cn(
                    'w-full mb-6',
                    plan.featured
                      ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  )}
                >
                  {plan.cta}
                </Button>
              </Link>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className={cn('w-4 h-4 flex-shrink-0', plan.featured ? 'text-indigo-200' : 'text-indigo-600')} />
                    <span className={plan.featured ? 'text-indigo-100' : 'text-gray-600'}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
