import type { Editor } from '@tiptap/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cmd = (editor: Editor) => (editor.chain().focus() as any);
const can = (editor: Editor) => (editor.can() as any);
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Code, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Minus,
  Undo, Redo, Highlighter,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolbarProps {
  editor: Editor;
}

function ToolbarButton({
  onClick, active, disabled, children, title,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        'p-1.5 rounded-md text-sm transition-colors flex items-center justify-center w-8 h-8',
        active
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
        disabled && 'opacity-30 cursor-not-allowed'
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-6 bg-gray-200 mx-1" />;
}

export default function EditorToolbar({ editor }: ToolbarProps) {
  return (
    <div className="flex items-center gap-0.5 px-4 py-2 bg-white border-b border-gray-100 flex-wrap sticky top-0 z-10">
      <ToolbarButton onClick={() => cmd(editor).undo().run()} disabled={!can(editor).undo()} title="실행 취소">
        <Undo className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => cmd(editor).redo().run()} disabled={!can(editor).redo()} title="다시 실행">
        <Redo className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={() => cmd(editor).toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="제목 1">
        <Heading1 className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => cmd(editor).toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="제목 2">
        <Heading2 className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => cmd(editor).toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="제목 3">
        <Heading3 className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={() => cmd(editor).toggleBold().run()} active={editor.isActive('bold')} title="굵게">
        <Bold className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => cmd(editor).toggleItalic().run()} active={editor.isActive('italic')} title="기울임">
        <Italic className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => cmd(editor).toggleUnderline().run()} active={editor.isActive('underline')} title="밑줄">
        <UnderlineIcon className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => cmd(editor).toggleStrike().run()} active={editor.isActive('strike')} title="취소선">
        <Strikethrough className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => cmd(editor).toggleCode().run()} active={editor.isActive('code')} title="인라인 코드">
        <Code className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => cmd(editor).toggleHighlight().run()} active={editor.isActive('highlight')} title="하이라이트">
        <Highlighter className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={() => cmd(editor).toggleBulletList().run()} active={editor.isActive('bulletList')} title="글머리 기호">
        <List className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => cmd(editor).toggleOrderedList().run()} active={editor.isActive('orderedList')} title="번호 매기기">
        <ListOrdered className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={() => cmd(editor).toggleBlockquote().run()} active={editor.isActive('blockquote')} title="인용구">
        <Quote className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => cmd(editor).toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="코드 블록">
        <Code className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => cmd(editor).setHorizontalRule().run()} title="구분선">
        <Minus className="w-4 h-4" />
      </ToolbarButton>
    </div>
  );
}
