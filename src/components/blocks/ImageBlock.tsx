import type { ComponentConfig } from '@measured/puck';
import { cn } from '@/lib/utils';

interface ImageBlockProps {
  src: string;
  alt: string;
  caption?: string;
  width: 'full' | 'large' | 'medium' | 'small';
  align: 'left' | 'center' | 'right';
  rounded: boolean;
  shadow: boolean;
}

export function ImageBlockComponent({
  src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop',
  alt = '이미지',
  caption = '',
  width = 'full',
  align = 'center',
  rounded = true,
  shadow = true,
}: ImageBlockProps) {
  const widthClass = { full: 'w-full', large: 'max-w-4xl', medium: 'max-w-2xl', small: 'max-w-sm' }[width];
  const alignClass = { left: 'mr-auto', center: 'mx-auto', right: 'ml-auto' }[align];

  return (
    <div className="py-6 px-6">
      <figure className={cn(widthClass, alignClass)}>
        {src ? (
          <img
            src={src}
            alt={alt}
            className={cn('w-full object-cover', rounded && 'rounded-2xl', shadow && 'shadow-lg')}
          />
        ) : (
          <div className={cn('w-full bg-gray-100 flex items-center justify-center py-20', rounded && 'rounded-2xl')}>
            <p className="text-gray-400 text-sm">이미지 URL을 입력하세요</p>
          </div>
        )}
        {caption && (
          <figcaption className="text-center text-sm text-gray-500 mt-3">{caption}</figcaption>
        )}
      </figure>
    </div>
  );
}

export const ImageBlock: ComponentConfig<ImageBlockProps> = {
  label: '이미지',
  fields: {
    src: { type: 'text', label: '이미지 URL' },
    alt: { type: 'text', label: '대체 텍스트 (접근성)' },
    caption: { type: 'text', label: '캡션 (옵션)' },
    width: {
      type: 'select',
      label: '너비',
      options: [
        { value: 'full', label: '전체 너비' },
        { value: 'large', label: '크게 (896px)' },
        { value: 'medium', label: '보통 (672px)' },
        { value: 'small', label: '작게 (384px)' },
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
    rounded: { type: 'radio', label: '둥근 모서리', options: [{ value: true, label: '예' }, { value: false, label: '아니오' }] },
    shadow: { type: 'radio', label: '그림자', options: [{ value: true, label: '예' }, { value: false, label: '아니오' }] },
  },
  defaultProps: {
    src: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop',
    alt: '이미지',
    caption: '',
    width: 'full',
    align: 'center',
    rounded: true,
    shadow: true,
  },
  render: ImageBlockComponent,
};
