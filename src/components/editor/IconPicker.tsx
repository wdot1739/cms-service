import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  FileText, Rocket, Lightbulb, Target, BarChart2, Star,
  Flame, BookOpen, Globe, Layout, Code2, Image, Music,
  ShoppingCart, Users, Mail, Heart, Zap, Camera, Coffee,
  Map, Briefcase, Award, Bell, Home, Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS = [
  { name: 'FileText', Icon: FileText },
  { name: 'Rocket', Icon: Rocket },
  { name: 'Lightbulb', Icon: Lightbulb },
  { name: 'Target', Icon: Target },
  { name: 'BarChart2', Icon: BarChart2 },
  { name: 'Star', Icon: Star },
  { name: 'Flame', Icon: Flame },
  { name: 'BookOpen', Icon: BookOpen },
  { name: 'Globe', Icon: Globe },
  { name: 'Layout', Icon: Layout },
  { name: 'Code2', Icon: Code2 },
  { name: 'Image', Icon: Image },
  { name: 'Music', Icon: Music },
  { name: 'ShoppingCart', Icon: ShoppingCart },
  { name: 'Users', Icon: Users },
  { name: 'Mail', Icon: Mail },
  { name: 'Heart', Icon: Heart },
  { name: 'Zap', Icon: Zap },
  { name: 'Camera', Icon: Camera },
  { name: 'Coffee', Icon: Coffee },
  { name: 'Map', Icon: Map },
  { name: 'Briefcase', Icon: Briefcase },
  { name: 'Award', Icon: Award },
  { name: 'Bell', Icon: Bell },
  { name: 'Home', Icon: Home },
  { name: 'Layers', Icon: Layers },
];

interface IconPickerProps {
  value: string;
  onChange: (name: string) => void;
}

function PageIcon({ name, size = 20 }: { name: string; size?: number }) {
  // If it looks like an emoji or non-ASCII, render as text
  // eslint-disable-next-line no-control-regex
  if (!/^[a-zA-Z0-9]+$/.test(name)) {
    return <span style={{ fontSize: size * 0.8 }}>{name}</span>;
  }
  const found = ICONS.find((i) => i.name === name);
  if (!found) {
    const Fallback = FileText;
    return <Fallback style={{ width: size, height: size }} />;
  }
  const { Icon } = found;
  return <Icon style={{ width: size, height: size }} />;
}

export { PageIcon };

export default function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const found = ICONS.find((i) => i.name === value);
  const CurrentIcon = found?.Icon || FileText;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="w-12 h-12 rounded-xl border border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 flex items-center justify-center cursor-pointer bg-transparent"
        title="아이콘 변경"
      >
        <CurrentIcon className="w-6 h-6 text-gray-600" />
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="start">
        <p className="text-xs font-medium text-gray-500 mb-2">아이콘 선택</p>
        <div className="grid grid-cols-6 gap-1">
          {ICONS.map(({ name, Icon }) => (
            <button
              key={name}
              onClick={() => { onChange(name); setOpen(false); }}
              className={cn(
                'p-2 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center',
                value === name ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'
              )}
              title={name}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
