import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { ComponentConfig } from '@measured/puck';

interface CTABlockProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryText?: string;
  secondaryLink?: string;
  background: 'gradient' | 'indigo' | 'dark' | 'white';
  note?: string;
}

export function CTABlockComponent({
  title = '지금 바로 시작하세요',
  subtitle = '신용카드 없이 무료로 시작하세요. 언제든지 업그레이드할 수 있습니다.',
  ctaText = '무료로 시작하기',
  ctaLink = '/login',
  secondaryText = '데모 로그인',
  secondaryLink = '/login',
  background = 'gradient',
  note = '',
}: CTABlockProps) {
  const bgClass = {
    gradient: 'bg-gradient-to-br from-indigo-600 to-purple-700',
    indigo: 'bg-indigo-600',
    dark: 'bg-gray-950',
    white: 'bg-white border-y border-gray-100',
  }[background];

  const isLight = background === 'white';

  return (
    <section className={`py-24 ${bgClass}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className={`text-4xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>{title}</h2>
        <p className={`text-xl mb-10 ${isLight ? 'text-gray-600' : 'text-indigo-200'}`}>{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to={ctaLink}>
            <Button size="lg" className={`px-10 h-12 text-base gap-2 ${isLight ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-indigo-600 hover:bg-indigo-50'}`}>
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          {secondaryText && (
            <Link to={secondaryLink || '/login'}>
              <Button size="lg" variant="outline" className={`px-10 h-12 text-base ${isLight ? 'border-gray-200 text-gray-700' : 'border-white/30 text-white hover:bg-white/10 bg-transparent'}`}>
                {secondaryText}
              </Button>
            </Link>
          )}
        </div>
        {note && <p className={`text-sm mt-6 ${isLight ? 'text-gray-400' : 'text-indigo-300'}`}>{note}</p>}
      </div>
    </section>
  );
}

export const CTABlock: ComponentConfig<CTABlockProps> = {
  label: 'CTA (행동 유도)',
  fields: {
    title: { type: 'text', label: '제목' },
    subtitle: { type: 'textarea', label: '부제목' },
    ctaText: { type: 'text', label: '주 버튼 텍스트' },
    ctaLink: { type: 'text', label: '주 버튼 링크' },
    secondaryText: { type: 'text', label: '보조 버튼 텍스트' },
    secondaryLink: { type: 'text', label: '보조 버튼 링크' },
    note: { type: 'text', label: '하단 메모' },
    background: {
      type: 'select',
      label: '배경',
      options: [
        { value: 'gradient', label: '그라디언트' },
        { value: 'indigo', label: '인디고' },
        { value: 'dark', label: '다크' },
        { value: 'white', label: '화이트' },
      ],
    },
  },
  defaultProps: {
    title: '지금 바로 시작하세요',
    subtitle: '신용카드 없이 무료로 시작하세요. 언제든지 업그레이드할 수 있습니다.',
    ctaText: '무료로 시작하기',
    ctaLink: '/login',
    secondaryText: '데모 로그인',
    secondaryLink: '/login',
    background: 'gradient',
    note: '이미 10,000+ 팀이 FlowCMS를 사용 중입니다',
  },
  render: CTABlockComponent,
};
