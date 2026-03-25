import type { ComponentConfig } from '@measured/puck';
import { cn } from '@/lib/utils';

interface HeadingBlockProps {
  text: string;
  level: 1 | 2 | 3 | 4;
  align: 'left' | 'center' | 'right';
  color: 'default' | 'gradient' | 'muted';
  subtitle?: string;
}

export function HeadingBlockComponent({
  text = '제목을 입력하세요',
  level = 2,
  align = 'left',
  color = 'default',
  subtitle = '',
}: HeadingBlockProps) {
  const sizeClass = { 1: 'text-5xl font-bold', 2: 'text-4xl font-bold', 3: 'text-3xl font-semibold', 4: 'text-2xl font-semibold' }[level];
  const colorClass = color === 'gradient'
    ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'
    : color === 'muted' ? 'text-gray-500' : 'text-gray-900';
  const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' }[align];

  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';

  return (
    <div className={cn('py-6 px-6', alignClass)}>
      <Tag className={cn('leading-tight', sizeClass, colorClass)}>{text}</Tag>
      {subtitle && <p className="mt-3 text-lg text-gray-500">{subtitle}</p>}
    </div>
  );
}

export const HeadingBlock: ComponentConfig<HeadingBlockProps> = {
  label: '제목',
  fields: {
    text: { type: 'text', label: '제목 텍스트' },
    subtitle: { type: 'text', label: '부제목 (옵션)' },
    level: {
      type: 'select',
      label: '제목 레벨',
      options: [
        { value: 1, label: 'H1 - 최대 제목' },
        { value: 2, label: 'H2 - 섹션 제목' },
        { value: 3, label: 'H3 - 소제목' },
        { value: 4, label: 'H4 - 작은 제목' },
      ],
    },
    align: {
      type: 'select',
      label: '정렬',
      options: [
        { value: 'left', label: '왼쪽' },
        { value: 'center', label: '가운데' },
        { value: 'right', label: '오른쪽' },
      ],
    },
    color: {
      type: 'select',
      label: '색상',
      options: [
        { value: 'default', label: '기본 (검정)' },
        { value: 'gradient', label: '그라디언트' },
        { value: 'muted', label: '흐리게' },
      ],
    },
  },
  defaultProps: {
    text: '섹션 제목을 입력하세요',
    level: 2,
    align: 'left',
    color: 'default',
    subtitle: '',
  },
  render: HeadingBlockComponent,
};
