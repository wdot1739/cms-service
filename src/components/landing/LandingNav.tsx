import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layers, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className={cn('font-bold text-lg', scrolled ? 'text-gray-900' : 'text-white')}>
              FlowCMS
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How It Works', 'Pricing', 'Docs'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-indigo-400',
                  scrolled ? 'text-gray-600' : 'text-white/80'
                )}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className={cn(scrolled ? 'text-gray-700' : 'text-white hover:bg-white/10')}
              >
                로그인
              </Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                무료로 시작하기
              </Button>
            </Link>
            <button
              className={cn('md:hidden', scrolled ? 'text-gray-700' : 'text-white')}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {['Features', 'How It Works', 'Pricing', 'Docs'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
