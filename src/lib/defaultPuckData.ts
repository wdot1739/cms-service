import type { PuckPageData } from '@/types/puck';

export const LANDING_PAGE_PUCK_DATA: PuckPageData = {
  content: [
    {
      type: 'HeroBlock',
      props: {
        id: 'hero-landing-1',
        title: 'FlowCMS - 콘텐츠 관리의 새로운 기준',
        subtitle: 'FlowCMS로 팀의 콘텐츠를 더 빠르게 만들고, 더 쉽게 관리하고, 더 넓게 배포하세요.',
        ctaText: '무료로 시작하기',
        ctaLink: '/login',
        secondaryText: '데모 보기',
        secondaryLink: '/login',
        background: 'gradient',
        badge: 'AI-Powered CMS Platform',
        stats: [
          { value: '10,000+', label: '활성 사용자' },
          { value: '500K+', label: '발행된 페이지' },
          { value: '99.9%', label: '업타임' },
        ],
      },
    },
    {
      type: 'FeaturesBlock',
      props: {
        id: 'features-landing-1',
        title: '강력한 기능, 직관적인 경험',
        subtitle: '콘텐츠 관리에 필요한 모든 것을 하나의 플랫폼에서 제공합니다.',
        layout: 'grid-3',
        features: [
          { icon: 'Layers', title: '블록 기반 에디터', description: '드래그 앤 드롭으로 콘텐츠를 구성하세요.' },
          { icon: 'Palette', title: '테마 & 스타일', description: '브랜드에 맞는 테마를 선택하거나 커스터마이징하세요.' },
          { icon: 'Zap', title: '빠른 발행', description: '클릭 하나로 콘텐츠를 발행하세요.' },
          { icon: 'Globe', title: '다국어 지원', description: '하나의 플랫폼에서 여러 언어로 콘텐츠를 관리하세요.' },
          { icon: 'Shield', title: '역할 기반 권한', description: '팀 협업을 안전하게 관리하세요.' },
          { icon: 'BarChart3', title: '분석 & 인사이트', description: '실시간으로 모니터링하세요.' },
        ],
      },
    },
    {
      type: 'HowItWorksBlock',
      props: {
        id: 'howitworks-landing-1',
        title: '3단계로 시작하는 콘텐츠 관리',
        steps: [
          { number: '01', title: '템플릿 선택', description: '다양한 템플릿 중에서 시작점을 선택하세요.' },
          { number: '02', title: '편집 & 커스터마이징', description: '블록 에디터로 콘텐츠를 구성하고 스타일을 설정하세요.' },
          { number: '03', title: '발행 & 공유', description: '버튼 하나로 콘텐츠를 발행하세요.' },
        ],
      },
    },
    {
      type: 'TestimonialsBlock',
      props: {
        id: 'testimonials-landing-1',
        title: '10,000+ 팀이 선택한 이유',
        testimonials: [
          { name: '김지영', title: 'Product Manager', text: 'FlowCMS 덕분에 콘텐츠 발행 속도가 3배 빨라졌어요.', rating: 5, avatarSeed: 'jiyeong' },
          { name: 'James Park', title: 'CEO at StartupXYZ', text: 'The template system is incredible. We launched our entire product site in one day.', rating: 5, avatarSeed: 'james' },
          { name: '이민수', title: 'Tech Lead', text: 'API 연동이 너무 쉬워서 놀랐습니다.', rating: 5, avatarSeed: 'minsoo' },
        ],
      },
    },
    {
      type: 'PricingBlock',
      props: {
        id: 'pricing-landing-1',
        title: '투명한 가격 정책',
        subtitle: '숨겨진 비용 없이 팀에 맞는 플랜을 선택하세요.',
        plans: [
          { name: 'Free', price: '₩0', period: '/월', description: '개인 프로젝트', features: '최대 5개 페이지\n3가지 템플릿\n1GB 스토리지', featured: false },
          { name: 'Pro', price: '₩15,000', period: '/월', description: '성장하는 팀', features: '무제한 페이지\n모든 템플릿\n50GB 스토리지\nAPI 접근\n우선 지원', featured: true, badge: '가장 인기' },
          { name: 'Enterprise', price: '문의', period: '', description: '대규모 조직', features: 'Pro의 모든 기능\n무제한 팀원\nSSO & SAML\n전담 지원', featured: false },
        ],
      },
    },
    {
      type: 'CTABlock',
      props: {
        id: 'cta-landing-1',
        title: '지금 바로 시작하세요',
        subtitle: '신용카드 없이 무료로 시작하세요. 언제든지 업그레이드할 수 있습니다.',
        ctaText: '무료로 시작하기',
        ctaLink: '/login',
        secondaryText: '데모 보기',
        secondaryLink: '/login',
        background: 'gradient',
      },
    },
  ],
  root: {
    props: {
      title: 'FlowCMS - 콘텐츠 관리의 새로운 기준',
      description: 'FlowCMS로 팀의 콘텐츠를 더 빠르게 만들고, 더 쉽게 관리하고, 더 넓게 배포하세요.',
    },
  },
};

export const BLANK_PAGE_PUCK_DATA: PuckPageData = {
  content: [],
  root: { props: { title: '', description: '' } },
};
