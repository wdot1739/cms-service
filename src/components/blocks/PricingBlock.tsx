import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ComponentConfig } from '@measured/puck';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string;
  featured: boolean;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface PricingBlockProps {
  title: string;
  subtitle: string;
  plans: PricingPlan[];
  background: 'white' | 'gray';
}

export function PricingBlockComponent({
  title = '투명한 가격 정책',
  subtitle = '숨겨진 비용 없이 팀에 맞는 플랜을 선택하세요.',
  plans = [],
  background = 'gray',
}: PricingBlockProps) {
  return (
    <section id="pricing" className={`py-24 ${background === 'gray' ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-500">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                'rounded-2xl p-8 border relative',
                plan.featured
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl scale-105'
                  : 'bg-white border-gray-200'
              )}
            >
              {(plan.badge || plan.featured) && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {plan.badge || '가장 인기'}
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
              <Link to={plan.ctaLink || '/login'}>
                <Button
                  className={cn(
                    'w-full mb-6',
                    plan.featured
                      ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  )}
                >
                  {plan.ctaText || (plan.featured ? 'Pro 시작하기' : plan.name === 'Free' ? '무료로 시작' : '영업팀 문의')}
                </Button>
              </Link>
              <ul className="space-y-3">
                {(typeof plan.features === 'string' ? plan.features.split('\n').filter(Boolean) : plan.features).map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check className={cn('w-4 h-4 flex-shrink-0 mt-0.5', plan.featured ? 'text-indigo-200' : 'text-indigo-600')} />
                    <span className={plan.featured ? 'text-indigo-100' : 'text-gray-600'}>{f}</span>
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

export const PricingBlock: ComponentConfig<PricingBlockProps> = {
  label: '가격 정책',
  fields: {
    title: { type: 'text', label: '제목' },
    subtitle: { type: 'text', label: '부제목' },
    background: {
      type: 'select',
      label: '배경',
      options: [
        { value: 'gray', label: '회색' },
        { value: 'white', label: '화이트' },
      ],
    },
    plans: {
      type: 'array',
      label: '플랜',
      arrayFields: {
        name: { type: 'text', label: '플랜 이름' },
        price: { type: 'text', label: '가격' },
        period: { type: 'text', label: '기간 (예: /월)' },
        description: { type: 'text', label: '설명' },
        featured: { type: 'radio', label: '추천', options: [{ value: true, label: '예' }, { value: false, label: '아니오' }] },
        badge: { type: 'text', label: '배지 텍스트' },
        ctaText: { type: 'text', label: 'CTA 버튼 텍스트' },
        ctaLink: { type: 'text', label: 'CTA 링크' },
        features: { type: 'textarea', label: '포함 기능 (줄바꿈으로 구분)' },
      },
      defaultItemProps: { name: '새 플랜', price: '₩0', period: '/월', description: '설명', features: '', featured: false },
    },
  },
  defaultProps: {
    title: '투명한 가격 정책',
    subtitle: '숨겨진 비용 없이 팀에 맞는 플랜을 선택하세요.',
    background: 'gray',
    plans: [
      { name: 'Free', price: '₩0', period: '/월', description: '개인 프로젝트', features: '최대 5개 페이지\n3가지 템플릿\n1GB 스토리지', featured: false },
      { name: 'Pro', price: '₩15,000', period: '/월', description: '성장하는 팀', features: '무제한 페이지\n모든 템플릿\n50GB 스토리지\nAPI 접근\n우선 지원', featured: true, badge: '가장 인기' },
      { name: 'Enterprise', price: '문의', period: '', description: '대규모 조직', features: 'Pro의 모든 기능\n무제한 팀원\nSSO & SAML\n전담 지원', featured: false },
    ],
  },
  render: PricingBlockComponent,
};
