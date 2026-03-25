import type { ComponentConfig } from '@measured/puck';
import { cn } from '@/lib/utils';

interface DividerBlockProps {
  style: 'line' | 'dots' | 'gradient' | 'space';
  spacing: 'sm' | 'md' | 'lg';
}

export function DividerBlockComponent({
  style = 'line',
  spacing = 'md',
}: DividerBlockProps) {
  const spaceClass = { sm: 'py-4', md: 'py-8', lg: 'py-16' }[spacing];

  return (
    <div className={cn('px-6', spaceClass)}>
      {style === 'line' && <hr className="border-gray-200" />}
      {style === 'gradient' && (
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />
      )}
      {style === 'dots' && (
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          ))}
        </div>
      )}
      {style === 'space' && <div />}
    </div>
  );
}

export const DividerBlock: ComponentConfig<DividerBlockProps> = {
  label: '구분선 / 여백',
  fields: {
    style: {
      type: 'select',
      label: '스타일',
      options: [
        { value: 'line', label: '선' },
        { value: 'gradient', label: '그라디언트 선' },
        { value: 'dots', label: '점' },
        { value: 'space', label: '여백만' },
      ],
    },
    spacing: {
      type: 'select',
      label: '여백',
      options: [
        { value: 'sm', label: '작게' },
        { value: 'md', label: '보통' },
        { value: 'lg', label: '크게' },
      ],
    },
  },
  defaultProps: { style: 'line', spacing: 'md' },
  render: DividerBlockComponent,
};
