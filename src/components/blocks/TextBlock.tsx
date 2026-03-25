import type { ComponentConfig } from '@measured/puck';
import { cn } from '@/lib/utils';

interface TextBlockProps {
  content: string;
  align: 'left' | 'center' | 'right';
  size: 'sm' | 'base' | 'lg' | 'xl';
  maxWidth: 'full' | 'prose' | 'narrow';
  color: 'default' | 'muted' | 'primary';
}

export function TextBlockComponent({
  content = '텍스트를 입력하세요.',
  align = 'left',
  size = 'base',
  maxWidth = 'prose',
  color = 'default',
}: TextBlockProps) {
  const maxWidthClass = maxWidth === 'prose' ? 'max-w-3xl' : maxWidth === 'narrow' ? 'max-w-xl' : 'max-w-none';
  const sizeClass = { sm: 'text-sm', base: 'text-base', lg: 'text-lg', xl: 'text-xl' }[size];
  const colorClass = { default: 'text-gray-800', muted: 'text-gray-500', primary: 'text-indigo-700' }[color];
  const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' }[align];

  return (
    <div className="py-8 px-6">
      <div className={cn('mx-auto', maxWidthClass, align === 'center' && 'mx-auto')}>
        <p className={cn('leading-relaxed whitespace-pre-wrap', sizeClass, colorClass, alignClass)}>{content}</p>
      </div>
    </div>
  );
}

export const TextBlock: ComponentConfig<TextBlockProps> = {
  label: '텍스트',
  fields: {
    content: { type: 'textarea', label: '내용' },
    align: {
      type: 'select',
      label: '정렬',
      options: [
        { value: 'left', label: '왼쪽' },
        { value: 'center', label: '가운데' },
        { value: 'right', label: '오른쪽' },
      ],
    },
    size: {
      type: 'select',
      label: '크기',
      options: [
        { value: 'sm', label: '작게' },
        { value: 'base', label: '보통' },
        { value: 'lg', label: '크게' },
        { value: 'xl', label: '매우 크게' },
      ],
    },
    maxWidth: {
      type: 'select',
      label: '최대 너비',
      options: [
        { value: 'full', label: '전체' },
        { value: 'prose', label: '가독성 (768px)' },
        { value: 'narrow', label: '좁게 (576px)' },
      ],
    },
    color: {
      type: 'select',
      label: '색상',
      options: [
        { value: 'default', label: '기본' },
        { value: 'muted', label: '흐리게' },
        { value: 'primary', label: '강조' },
      ],
    },
  },
  defaultProps: {
    content: '여기에 텍스트를 입력하세요. 이 블록을 클릭하면 편집할 수 있습니다.',
    align: 'left',
    size: 'base',
    maxWidth: 'prose',
    color: 'default',
  },
  render: TextBlockComponent,
};
