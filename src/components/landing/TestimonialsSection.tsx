import { Star } from 'lucide-react';

const testimonials = [
  {
    name: '김지영',
    title: 'Product Manager at TechCorp',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jiyoung',
    rating: 5,
    text: 'FlowCMS 덕분에 콘텐츠 발행 속도가 3배 빨라졌어요. 팀원들 모두 직관적이라 교육이 거의 필요 없었습니다.',
  },
  {
    name: 'James Park',
    title: 'CEO at StartupXYZ',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
    rating: 5,
    text: 'The template system is incredible. We launched our entire product site in one day. Highly recommend for any team.',
  },
  {
    name: '이민수',
    title: 'Tech Lead at DevStudio',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=minsu',
    rating: 5,
    text: 'API 연동이 너무 쉬워서 놀랐습니다. 헤드리스 CMS로 사용하면서 프론트엔드 자유도를 그대로 유지할 수 있었어요.',
  },
  {
    name: 'Sarah Kim',
    title: 'Marketing Director',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    rating: 5,
    text: 'The analytics dashboard gives us exactly the insights we need. FlowCMS transformed how we approach content strategy.',
  },
  {
    name: '박현우',
    title: 'Freelance Designer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hyunwoo',
    rating: 5,
    text: '테마 시스템이 정말 강력합니다. 클라이언트마다 다른 브랜드 가이드를 적용하는 게 이렇게 쉬울 줄 몰랐어요.',
  },
  {
    name: 'Emma Chen',
    title: 'Content Strategist',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    rating: 5,
    text: 'Finally a CMS that understands how content teams actually work. The collaboration features are a game changer.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            10,000+ 팀이 선택한 이유
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full bg-indigo-100" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
