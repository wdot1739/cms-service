import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layers, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginDemo } = useAuthStore();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDemo = () => {
    loginDemo();
    navigate('/dashboard');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('이메일과 비밀번호를 입력해주세요.'); return; }
    if (tab === 'register' && !name) { setError('이름을 입력해주세요.'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center border border-white/20">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">FlowCMS</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Demo banner */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-center">
            <p className="text-white text-sm font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              데모 계정으로 모든 기능을 무료로 체험하세요
            </p>
          </div>

          <div className="p-8">
            {/* Demo Button */}
            <Button
              onClick={handleDemo}
              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-base gap-2 mb-6 shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              데모로 바로 시작하기
              <ArrowRight className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 border-t border-gray-200" />
              <span className="text-sm text-gray-400">또는</span>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            {/* Tab switcher */}
            <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
              {(['login', 'register'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setTab(t); setError(''); }}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t === 'login' ? '로그인' : '회원가입'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'register' && (
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium">이름</Label>
                  <Input
                    id="name"
                    placeholder="홍길동"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium">비밀번호</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
              >
                {loading ? '처리 중...' : tab === 'login' ? '로그인' : '계정 만들기'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                ← 홈으로 돌아가기
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-indigo-300 text-xs mt-6">
          계속 진행하면 서비스 약관 및 개인정보 처리방침에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
}
