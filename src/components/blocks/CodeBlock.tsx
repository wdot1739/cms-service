import type { ComponentConfig } from '@measured/puck';

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
