import type { ComponentConfig } from '@measured/puck';
import { cn } from '@/lib/utils';

interface QuoteBlockProps {
  text: string;
  author?: string;
  role?: string;
  style: 'border' | 'filled' | 'large';
  color: 'indigo' | 'gray' | 'purple';
}

export function QuoteBlockComponent({
  text = '인상적인 인용구를 입력하세요.',
  author = '',
  role = '',
  style = 'border',
  color = 'indigo',
}: QuoteBlockProps) {
  const colorMap = {
    indigo: { border: 'border-indigo-500', bg: 'bg-indigo-50', text: 'text-indigo-800', accent: 'text-indigo-600' },
    gray: { border: 'border-gray-400', bg: 'bg-gray-50', text: 'text-gray-800', accent: 'text-gray-600' },
    purple: { border: 'border-purple-500', bg: 'bg-purple-50', text: 'text-purple-800', accent: 'text-purple-600' },
  }[color];

  return (
    <div className="py-6 px-6">
      <div className={cn(
        'max-w-3xl mx-auto',
        style === 'border' && `border-l-4 ${colorMap.border} pl-6 py-2`,
        style === 'filled' && `${colorMap.bg} rounded-2xl p-8`,
        style === 'large' && 'text-center',
      )}>
        <p className={cn(
          'leading-relaxed italic',
          style === 'large' ? 'text-3xl font-light text-gray-700' : `text-lg ${colorMap.text}`,
        )}>
          &ldquo;{text}&rdquo;
        </p>
        {(author || role) && (
          <div className={cn('mt-4 flex items-center gap-2', style === 'large' && 'justify-center')}>
            <div className="w-6 h-px bg-gray-300" />
            <div>
              {author && <p className={cn('font-semibold text-sm', colorMap.accent)}>{author}</p>}
              {role && <p className="text-xs text-gray-500">{role}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const QuoteBlock: ComponentConfig<QuoteBlockProps> = {
  label: '인용구',
  fields: {
    text: { type: 'textarea', label: '인용 내용' },
    author: { type: 'text', label: '작성자 (옵션)' },
    role: { type: 'text', label: '직책 (옵션)' },
    style: {
      type: 'select',
      label: '스타일',
      options: [
        { value: 'border', label: '좌측 테두리' },
        { value: 'filled', label: '배경 채움' },
        { value: 'large', label: '대형 인용구' },
      ],
    },
    color: {
      type: 'select',
      label: '색상',
      options: [
        { value: 'indigo', label: '인디고' },
        { value: 'gray', label: '회색' },
        { value: 'purple', label: '보라' },
      ],
    },
  },
  defaultProps: {
    text: '인상적인 인용구나 핵심 메시지를 여기에 입력하세요.',
    author: '홍길동',
    role: 'CEO, 회사명',
    style: 'border',
    color: 'indigo',
  },
  render: QuoteBlockComponent,
};
