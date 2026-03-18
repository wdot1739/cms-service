import type { ComponentConfig } from '@measured/puck';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────
// TEXT BLOCK
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// HEADING BLOCK
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// IMAGE BLOCK
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// QUOTE BLOCK
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// DIVIDER BLOCK
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// CODE BLOCK
// ─────────────────────────────────────────────

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  showLineNumbers: boolean;
}

export function CodeBlockComponent({
  code = 'console.log("Hello, FlowCMS!");',
  language = 'javascript',
  filename = '',
  showLineNumbers = false,
}: CodeBlockProps) {
  const lines = code.split('\n');

  return (
    <div className="py-6 px-6">
      <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between bg-gray-900 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            {filename && <span className="text-gray-400 text-xs ml-2">{filename}</span>}
          </div>
          <span className="text-gray-500 text-xs font-mono">{language}</span>
        </div>
        <div className="bg-gray-950 p-4 overflow-x-auto">
          <pre className="text-gray-200 text-sm font-mono leading-relaxed">
            {showLineNumbers ? (
              lines.map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-gray-600 select-none w-6 text-right flex-shrink-0">{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))
            ) : (
              <code>{code}</code>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}

export const CodeBlock: ComponentConfig<CodeBlockProps> = {
  label: '코드 블록',
  fields: {
    code: { type: 'textarea', label: '코드' },
    language: {
      type: 'select',
      label: '언어',
      options: [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'bash', label: 'Bash' },
        { value: 'python', label: 'Python' },
        { value: 'json', label: 'JSON' },
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
        { value: 'sql', label: 'SQL' },
      ],
    },
    filename: { type: 'text', label: '파일명 (옵션)' },
    showLineNumbers: {
      type: 'radio',
      label: '줄 번호',
      options: [{ value: true, label: '표시' }, { value: false, label: '숨김' }],
    },
  },
  defaultProps: {
    code: '// FlowCMS API 예제\nconst response = await fetch("/api/pages");\nconst pages = await response.json();\nconsole.log(pages);',
    language: 'javascript',
    filename: 'example.js',
    showLineNumbers: true,
  },
  render: CodeBlockComponent,
};
