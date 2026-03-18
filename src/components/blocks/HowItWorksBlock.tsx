import type { ComponentConfig } from '@measured/puck';
import { FileText, Paintbrush, Rocket, type LucideIcon } from 'lucide-react';

const STEP_ICONS: LucideIcon[] = [FileText, Paintbrush, Rocket];
const STEP_COLORS = ['from-indigo-500 to-indigo-600', 'from-purple-500 to-purple-600', 'from-pink-500 to-pink-600'];

interface Step {
  number: string;
  title: string;
  description: string;
}

interface HowItWorksBlockProps {
  title: string;
  subtitle: string;
  steps: Step[];
  background: 'white' | 'gray';
}

export function HowItWorksBlockComponent({
  title = '3단계로 시작하는 콘텐츠 관리',
  subtitle = '복잡한 설정 없이 바로 시작할 수 있습니다.',
  steps = [],
  background = 'gray',
}: HowItWorksBlockProps) {
  return (
    <section className={`py-24 ${background === 'gray' ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-3">How It Works</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-500">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i % STEP_ICONS.length];
            const color = STEP_COLORS[i % STEP_COLORS.length];
            return (
              <div key={i} className="relative text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-50 border border-indigo-100 rounded-full px-2 py-0.5">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const HowItWorksBlock: ComponentConfig<HowItWorksBlockProps> = {
  label: '진행 단계',
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
    steps: {
      type: 'array',
      label: '단계',
      arrayFields: {
        number: { type: 'text', label: '번호 (예: 01)' },
        title: { type: 'text', label: '제목' },
        description: { type: 'textarea', label: '설명' },
      },
      defaultItemProps: { number: '01', title: '단계 제목', description: '단계 설명을 입력하세요.' },
    },
  },
  defaultProps: {
    title: '3단계로 시작하는 콘텐츠 관리',
    subtitle: '복잡한 설정 없이 바로 시작할 수 있습니다.',
    background: 'gray',
    steps: [
      { number: '01', title: '템플릿 선택', description: '다양한 템플릿 중에서 시작점을 선택하세요.' },
      { number: '02', title: '편집 & 커스터마이징', description: '블록 에디터로 콘텐츠를 구성하고 스타일을 설정하세요.' },
      { number: '03', title: '발행 & 공유', description: '버튼 하나로 콘텐츠를 발행하세요.' },
    ],
  },
  render: HowItWorksBlockComponent,
};
