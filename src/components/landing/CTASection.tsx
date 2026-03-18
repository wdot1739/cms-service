import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          지금 바로 시작하세요
        </h2>
        <p className="text-xl text-indigo-200 mb-10">
          신용카드 없이 무료로 시작하세요. 언제든지 업그레이드할 수 있습니다.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/login">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 px-10 h-12 text-base gap-2">
              무료로 시작하기
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent px-10 h-12 text-base">
              데모 로그인
            </Button>
          </Link>
        </div>
        <p className="text-indigo-300 text-sm mt-6">
          이미 10,000+ 팀이 FlowCMS를 사용 중입니다
        </p>
      </div>
    </section>
  );
}
