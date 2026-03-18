import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import type { ComponentConfig } from '@measured/puck';

interface HeroStat {
  value: string;
  label: string;
}

interface HeroBlockProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryText: string;
  secondaryLink: string;
  background: 'gradient' | 'white' | 'dark';
  badge: string;
  stats: HeroStat[];
}

export function HeroBlockComponent({
  title = 'FlowCMS - 콘텐츠 관리의 새로운 기준',
  subtitle = 'FlowCMS로 팀의 콘텐츠를 더 빠르게 만들고, 더 쉽게 관리하고, 더 넓게 배포하세요.',
  ctaText = '무료로 시작하기',
  ctaLink = '/login',
  secondaryText = '데모 보기',
  secondaryLink = '/login',
  background = 'gradient',
  badge = 'AI-Powered CMS Platform',
  stats = [],
}: HeroBlockProps) {
  const bgClass = background === 'gradient'
    ? 'bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900'
    : background === 'dark'
    ? 'bg-gray-950'
    : 'bg-white';

  const textClass = background === 'white' ? 'text-gray-900' : 'text-white';
  const subtitleClass = background === 'white' ? 'text-gray-600' : 'text-indigo-200';

  return (
    <section className={`relative py-24 overflow-hidden ${bgClass}`}>
      {background !== 'white' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
      )}
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {badge && (
          <div className="mb-6 inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-full px-4 py-1.5 text-sm">
            <Sparkles className="w-3.5 h-3.5" />
            {badge}
          </div>
        )}
        <h1 className={`text-5xl sm:text-6xl font-bold leading-tight mb-6 ${textClass}`}>
          {title}
        </h1>
        <p className={`text-xl leading-relaxed mb-10 max-w-2xl mx-auto ${subtitleClass}`}>
          {subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link to={ctaLink}>
            <Button size="lg" className="bg-indigo-500 hover:bg-indigo-400 text-white px-8 h-12 gap-2">
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          {secondaryText && (
            <Link to={secondaryLink}>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent px-8 h-12 gap-2">
                <Play className="w-4 h-4" />
                {secondaryText}
              </Button>
            </Link>
          )}
        </div>
        {stats.length > 0 && (
          <div className="flex flex-wrap justify-center gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-3xl font-bold ${textClass}`}>{stat.value}</div>
                <div className={`text-sm mt-1 ${subtitleClass}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export const HeroBlock: ComponentConfig<HeroBlockProps> = {
  label: 'Hero 섹션',
  fields: {
    title: { type: 'text', label: '제목' },
    subtitle: { type: 'textarea', label: '부제목' },
    badge: { type: 'text', label: '배지 텍스트' },
    ctaText: { type: 'text', label: 'CTA 버튼 텍스트' },
    ctaLink: { type: 'text', label: 'CTA 링크' },
    secondaryText: { type: 'text', label: '보조 버튼 텍스트' },
    secondaryLink: { type: 'text', label: '보조 버튼 링크' },
    background: {
      type: 'select',
      label: '배경',
      options: [
        { value: 'gradient', label: '그라디언트 (인디고)' },
        { value: 'dark', label: '다크' },
        { value: 'white', label: '화이트' },
      ],
    },
    stats: {
      type: 'array',
      label: '통계',
      arrayFields: {
        value: { type: 'text', label: '수치' },
        label: { type: 'text', label: '레이블' },
      },
      defaultItemProps: { value: '1,000+', label: '사용자' },
    },
  },
  defaultProps: {
    title: 'FlowCMS - 콘텐츠 관리의 새로운 기준',
    subtitle: 'FlowCMS로 팀의 콘텐츠를 더 빠르게 만들고, 더 쉽게 관리하고, 더 넓게 배포하세요.',
    ctaText: '무료로 시작하기',
    ctaLink: '/login',
    secondaryText: '데모 보기',
    secondaryLink: '/login',
    background: 'gradient',
    badge: 'AI-Powered CMS Platform',
    stats: [
      { value: '10,000+', label: '활성 사용자' },
      { value: '500K+', label: '발행된 페이지' },
      { value: '99.9%', label: '업타임' },
    ],
  },
  render: HeroBlockComponent,
};
