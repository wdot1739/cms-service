import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useCMSStore } from '@/store/cmsStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Building2, Users, CreditCard, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ThemeId } from '@/types/cms';

const THEMES: { id: ThemeId; name: string; desc: string }[] = [
  { id: 'clean', name: '클린', desc: '깔끔하고 밝은 테마' },
  { id: 'dark', name: '다크', desc: '다크 배경의 모던 테마' },
  { id: 'colorful', name: '컬러풀', desc: '생동감 있는 그라디언트 테마' },
  { id: 'minimal', name: '미니멀', desc: '단순하고 집중된 테마' },
  { id: 'corporate', name: '코퍼레이트', desc: '전문적이고 신뢰감 있는 테마' },
];

export default function SettingsPage() {
  const { user } = useAuthStore();
  const { workspace, setWorkspace } = useCMSStore();
  const [saved, setSaved] = useState(false);
  const [wsName, setWsName] = useState(workspace.name);
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(workspace.themeId);

  const handleSave = () => {
    setWorkspace({ name: wsName, themeId: selectedTheme });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">설정</h1>
        <p className="text-gray-500 text-sm mt-1">워크스페이스와 계정을 관리하세요.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="gap-2"><User className="w-4 h-4" />프로필</TabsTrigger>
          <TabsTrigger value="workspace" className="gap-2"><Building2 className="w-4 h-4" />워크스페이스</TabsTrigger>
          <TabsTrigger value="members" className="gap-2"><Users className="w-4 h-4" />팀원</TabsTrigger>
          <TabsTrigger value="billing" className="gap-2"><CreditCard className="w-4 h-4" />요금제</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xl">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <Badge className="mt-1 text-[10px] bg-indigo-100 text-indigo-700 border-0">
                  {user?.role === 'owner' ? '소유자' : user?.role}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>이름</Label>
                <Input defaultValue={user?.name} className="h-10" readOnly />
              </div>
              <div className="space-y-1.5">
                <Label>이메일</Label>
                <Input defaultValue={user?.email} type="email" className="h-10" readOnly />
              </div>
            </div>
            <p className="text-xs text-gray-400">데모 계정에서는 프로필 편집이 제한됩니다.</p>
          </div>
        </TabsContent>

        {/* Workspace Tab */}
        <TabsContent value="workspace">
          <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
            <div className="space-y-1.5">
              <Label>워크스페이스 이름</Label>
              <Input value={wsName} onChange={(e) => setWsName(e.target.value)} className="h-10 max-w-sm" />
            </div>

            <div className="space-y-3">
              <Label>기본 페이지 테마</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all',
                      selectedTheme === theme.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    {selectedTheme === theme.id && <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />}
                    <div className={selectedTheme !== theme.id ? 'ml-8' : ''}>
                      <p className="font-medium text-gray-900 text-sm">{theme.name}</p>
                      <p className="text-xs text-gray-500">{theme.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                {saved ? <><CheckCircle2 className="w-4 h-4" /> 저장됨!</> : '변경사항 저장'}
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">팀원 목록</h3>
              <Button size="sm" className="bg-indigo-600 text-white gap-2" disabled>
                <Users className="w-4 h-4" />
                팀원 초대 (준비 중)
              </Button>
            </div>
            {workspace.members.map((member) => (
              <div key={member.userId} className="flex items-center gap-4 py-3 border-b last:border-0 border-gray-50">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 text-sm">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
                <Badge variant="outline" className="text-xs capitalize">
                  {member.role === 'owner' ? '소유자' : member.role}
                </Badge>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-gray-900">현재 플랜</h3>
                <p className="text-sm text-gray-500 mt-1">플랜을 업그레이드하여 더 많은 기능을 사용하세요.</p>
              </div>
              <Badge className="bg-indigo-600 text-white text-sm px-3 py-1">
                {workspace.plan.toUpperCase()}
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: 'Free', price: '₩0/월', desc: '개인 사용', current: workspace.plan === 'free' },
                { name: 'Pro', price: '₩15,000/월', desc: '팀 협업', current: workspace.plan === 'pro' },
                { name: 'Enterprise', price: '문의', desc: '대기업', current: workspace.plan === 'enterprise' },
              ].map((plan) => (
                <div key={plan.name} className={cn('p-4 rounded-xl border-2', plan.current ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200')}>
                  {plan.current && <p className="text-xs text-indigo-600 font-bold mb-1">현재 플랜</p>}
                  <p className="font-bold text-gray-900">{plan.name}</p>
                  <p className="text-indigo-600 font-semibold text-sm mt-1">{plan.price}</p>
                  <p className="text-xs text-gray-500 mt-1">{plan.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
