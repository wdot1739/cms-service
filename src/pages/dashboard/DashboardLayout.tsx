import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useCMSStore } from '@/store/cmsStore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard, FileText, Layout, Image, Settings,
  Layers, ChevronLeft, ChevronRight, LogOut, Plus,
  Bell, Search, Moon, Sun, HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: '대시보드', end: true },
  { to: '/dashboard/pages', icon: FileText, label: '페이지 관리' },
  { to: '/dashboard/templates', icon: Layout, label: '템플릿' },
  { to: '/dashboard/media', icon: Image, label: '미디어' },
  { to: '/dashboard/settings', icon: Settings, label: '설정' },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { workspace, pages } = useCMSStore();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNewPage = () => {
    navigate('/dashboard/editor/new');
  };

  const publishedCount = pages.filter((p) => p.status === 'published').length;
  const draftCount = pages.filter((p) => p.status === 'draft').length;

  return (
    <div className={cn('flex h-screen bg-gray-50', darkMode && 'dark')}>
      {/* Sidebar */}
      <aside className={cn(
        'flex flex-col bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0',
        collapsed ? 'w-16' : 'w-64'
      )}>
        {/* Logo */}
        <div className={cn('flex items-center h-16 px-4 border-b border-gray-100', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-gray-900 text-sm">FlowCMS</span>
                <Badge className="ml-2 text-[9px] bg-indigo-100 text-indigo-600 border-0 py-0">
                  {workspace.plan.toUpperCase()}
                </Badge>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* New Page Button */}
        <div className={cn('px-3 py-3', collapsed ? 'flex justify-center' : '')}>
          <Button
            onClick={handleNewPage}
            className={cn(
              'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm',
              collapsed ? 'w-10 h-10 p-0' : 'w-full gap-2'
            )}
            size={collapsed ? 'icon' : 'default'}
          >
            <Plus className="w-4 h-4" />
            {!collapsed && '새 페이지'}
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                collapsed ? 'justify-center' : ''
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && label}
            </NavLink>
          ))}
        </nav>

        {/* Stats (when not collapsed) */}
        {!collapsed && (
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>발행됨</span>
              <span className="font-semibold text-green-600">{publishedCount}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>초안</span>
              <span className="font-semibold text-yellow-600">{draftCount}</span>
            </div>
          </div>
        )}

        {/* User */}
        <div className={cn(
          'flex items-center border-t border-gray-100 p-3',
          collapsed ? 'justify-center' : 'gap-3'
        )}>
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                title="로그아웃"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder="페이지, 템플릿 검색..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
              title="다크모드"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
