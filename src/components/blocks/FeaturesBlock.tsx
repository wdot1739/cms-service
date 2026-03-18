import { Layers, Palette, Zap, Globe, Shield, BarChart3, Code2, Users, type LucideIcon } from 'lucide-react';
import type { ComponentConfig } from '@measured/puck';

const ICON_MAP: Record<string, LucideIcon> = {
  Layers, Palette, Zap, Globe, Shield, BarChart3, Code2, Users,
};

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesBlockProps {
  title: string;
  subtitle: string;
  layout: 'grid-4' | 'grid-3' | 'grid-2';
  features: Feature[];
}

const COLOR_CYCLE = [
  'bg-indigo-100 text-indigo-600',
  'bg-purple-100 text-purple-600',
  'bg-yellow-100 text-yellow-600',
  'bg-green-100 text-green-600',
  'bg-red-100 text-red-600',
  'bg-blue-100 text-blue-600',
  'bg-orange-100 text-orange-600',
  'bg-pink-100 text-pink-600',
];

export function FeaturesBlockComponent({
  title = '강력한 기능, 직관적인 경험',
  subtitle = '콘텐츠 관리에 필요한 모든 것을 하나의 플랫폼에서 제공합니다.',
  layout = 'grid-4',
  features = [],
}: FeaturesBlockProps) {
  const colsClass = layout === 'grid-4' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    : layout === 'grid-3' ? 'grid-cols-1 md:grid-cols-3'
    : 'grid-cols-1 md:grid-cols-2';

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-3">Features</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className={`grid ${colsClass} gap-8`}>
          {features.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] || Layers;
            const colorClass = COLOR_CYCLE[i % COLOR_CYCLE.length];
            return (
              <div key={i} className="group p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClass}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const FeaturesBlock: ComponentConfig<FeaturesBlockProps> = {
  label: '기능 그리드',
  fields: {
    title: { type: 'text', label: '제목' },
    subtitle: { type: 'textarea', label: '부제목' },
    layout: {
      type: 'select',
      label: '레이아웃',
      options: [
        { value: 'grid-4', label: '4열 그리드' },
        { value: 'grid-3', label: '3열 그리드' },
        { value: 'grid-2', label: '2열 그리드' },
      ],
    },
    features: {
      type: 'array',
      label: '기능 목록',
      arrayFields: {
        icon: {
          type: 'select',
          label: '아이콘',
          options: [
            { value: 'Layers', label: 'Layers' },
            { value: 'Palette', label: 'Palette' },
            { value: 'Zap', label: 'Zap' },
            { value: 'Globe', label: 'Globe' },
            { value: 'Shield', label: 'Shield' },
            { value: 'BarChart3', label: 'BarChart3' },
            { value: 'Code2', label: 'Code2' },
            { value: 'Users', label: 'Users' },
          ],
        },
        title: { type: 'text', label: '제목' },
        description: { type: 'textarea', label: '설명' },
      },
      defaultItemProps: { icon: 'Zap', title: '새 기능', description: '기능 설명을 입력하세요.' },
    },
  },
  defaultProps: {
    title: '강력한 기능, 직관적인 경험',
    subtitle: '콘텐츠 관리에 필요한 모든 것을 하나의 플랫폼에서 제공합니다.',
    layout: 'grid-4',
    features: [
      { icon: 'Layers', title: '블록 기반 에디터', description: '드래그 앤 드롭으로 콘텐츠를 구성하세요.' },
      { icon: 'Palette', title: '테마 & 스타일', description: '브랜드에 맞는 테마를 선택하거나 커스터마이징하세요.' },
      { icon: 'Zap', title: '빠른 발행', description: '클릭 하나로 콘텐츠를 발행하세요.' },
      { icon: 'Globe', title: '다국어 지원', description: '여러 언어로 콘텐츠를 관리하세요.' },
    ],
  },
  render: FeaturesBlockComponent,
};
