import { Star } from 'lucide-react';
import type { ComponentConfig } from '@measured/puck';

interface Testimonial {
  name: string;
  title: string;
  text: string;
  rating: number;
  avatarSeed?: string;
}

interface TestimonialsBlockProps {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
  background: 'white' | 'gray';
  columns: 2 | 3;
}

export function TestimonialsBlockComponent({
  title = '10,000+ 팀이 선택한 이유',
  subtitle = '',
  testimonials = [],
  background = 'white',
  columns = 3,
}: TestimonialsBlockProps) {
  const colClass = columns === 3
    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    : 'grid-cols-1 md:grid-cols-2';

  return (
    <section id="testimonials" className={`py-24 ${background === 'gray' ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-gray-500">{subtitle}</p>}
        </div>
        <div className={`grid ${colClass} gap-6`}>
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow bg-white">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: Math.max(1, Math.min(5, t.rating)) }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.avatarSeed || t.name}`}
                  alt={t.name}
                  className="w-10 h-10 rounded-full bg-indigo-100"
                />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const TestimonialsBlock: ComponentConfig<TestimonialsBlockProps> = {
  label: '고객 후기',
  fields: {
    title: { type: 'text', label: '섹션 제목' },
    subtitle: { type: 'text', label: '부제목' },
    background: {
      type: 'select',
      label: '배경',
      options: [
        { value: 'white', label: '화이트' },
        { value: 'gray', label: '회색' },
      ],
    },
    columns: {
      type: 'select',
      label: '열 수',
      options: [
        { value: 3, label: '3열' },
        { value: 2, label: '2열' },
      ],
    },
    testimonials: {
      type: 'array',
      label: '후기 목록',
      arrayFields: {
        name: { type: 'text', label: '이름' },
        title: { type: 'text', label: '직함' },
        text: { type: 'textarea', label: '후기 내용' },
        rating: {
          type: 'select',
          label: '별점',
          options: [
            { value: 5, label: '★★★★★' },
            { value: 4, label: '★★★★' },
            { value: 3, label: '★★★' },
          ],
        },
        avatarSeed: { type: 'text', label: '아바타 시드 (옵션)' },
      },
      defaultItemProps: { name: '홍길동', title: 'Product Manager', text: '정말 훌륭한 제품입니다.', rating: 5, avatarSeed: '' },
    },
  },
  defaultProps: {
    title: '10,000+ 팀이 선택한 이유',
    subtitle: '',
    background: 'white',
    columns: 3,
    testimonials: [
      { name: '김지영', title: 'Product Manager at TechCorp', text: 'FlowCMS 덕분에 콘텐츠 발행 속도가 3배 빨라졌어요.', rating: 5, avatarSeed: 'jiyoung' },
      { name: 'James Park', title: 'CEO at StartupXYZ', text: 'The template system is incredible. We launched our entire product site in one day.', rating: 5, avatarSeed: 'james' },
      { name: '이민수', title: 'Tech Lead at DevStudio', text: 'API 연동이 너무 쉬워서 놀랐습니다.', rating: 5, avatarSeed: 'minsu' },
    ],
  },
  render: TestimonialsBlockComponent,
};
