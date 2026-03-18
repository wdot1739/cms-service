import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Page, Template, Workspace, MediaAsset, ActivityLog, PageStatus, BlockType, ThemeId, PuckPageData } from '@/types/cms';
import { LANDING_PAGE_PUCK_DATA } from '@/lib/defaultPuckData';

const SAMPLE_TEMPLATES: Template[] = [
  {
    id: 'tpl-blog',
    name: 'Blog Post',
    description: 'Clean blog post with hero image, content sections',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop',
    category: 'blog',
    tags: ['blog', 'article', 'content'],
    isDefault: true,
    blocks: [
      { id: 'b1', type: 'hero', content: { title: 'Blog Post Title', subtitle: 'Your subtitle here', background: 'gradient' }, order: 0 },
      { id: 'b2', type: 'paragraph', content: { text: 'Start writing your content here...' }, order: 1 },
    ],
  },
  {
    id: 'tpl-landing',
    name: 'Landing Page',
    description: 'High-converting landing page with hero, features, CTA',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    category: 'landing',
    tags: ['landing', 'marketing', 'product'],
    isDefault: true,
    blocks: [
      { id: 'b1', type: 'hero', content: { title: 'Your Product Name', subtitle: 'The best solution for your needs', cta: 'Get Started' }, order: 0 },
      { id: 'b2', type: 'features', content: { title: 'Why Choose Us', items: ['Fast', 'Reliable', 'Scalable'] }, order: 1 },
      { id: 'b3', type: 'cta', content: { title: 'Ready to Start?', button: 'Try for Free' }, order: 2 },
    ],
  },
  {
    id: 'tpl-docs',
    name: 'Documentation',
    description: 'Technical documentation with structured sections',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    category: 'docs',
    tags: ['docs', 'technical', 'guide'],
    isDefault: true,
    blocks: [
      { id: 'b1', type: 'heading', content: { text: 'Getting Started', level: 1 }, order: 0 },
      { id: 'b2', type: 'paragraph', content: { text: 'Welcome to the documentation.' }, order: 1 },
      { id: 'b3', type: 'code', content: { code: 'npm install my-package', language: 'bash' }, order: 2 },
    ],
  },
  {
    id: 'tpl-portfolio',
    name: 'Portfolio',
    description: 'Showcase your work with a beautiful portfolio layout',
    thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
    category: 'portfolio',
    tags: ['portfolio', 'creative', 'showcase'],
    isDefault: true,
    blocks: [
      { id: 'b1', type: 'hero', content: { title: 'My Portfolio', subtitle: 'Creative work & projects' }, order: 0 },
      { id: 'b2', type: 'gallery', content: { columns: 3, items: [] }, order: 1 },
    ],
  },
  {
    id: 'tpl-product',
    name: 'Product Page',
    description: 'Product showcase with features, testimonials, pricing',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    category: 'product',
    tags: ['product', 'ecommerce', 'saas'],
    isDefault: true,
    blocks: [
      { id: 'b1', type: 'hero', content: { title: 'Product Name', subtitle: 'The ultimate solution', image: '' }, order: 0 },
      { id: 'b2', type: 'features', content: { title: 'Key Features', layout: 'grid' }, order: 1 },
      { id: 'b3', type: 'testimonial', content: { title: 'What customers say' }, order: 2 },
      { id: 'b4', type: 'pricing', content: { plans: ['Free', 'Pro', 'Enterprise'] }, order: 3 },
    ],
  },
  {
    id: 'tpl-landing-full',
    name: '랜딩 페이지 (전체)',
    description: 'FlowCMS 랜딩 페이지와 동일한 구조의 전체 마케팅 페이지',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    category: 'landing',
    tags: ['landing', 'marketing', 'full-page'],
    isDefault: true,
    blocks: [
      {
        id: 'tpl-lf-1',
        type: 'hero',
        content: {
          html: '<h1>제품 이름</h1><p>제품의 핵심 가치를 한 줄로 설명하세요</p>',
          title: '제품 이름',
          subtitle: '제품의 핵심 가치를 한 줄로 설명하세요',
        },
        order: 0,
      },
      {
        id: 'tpl-lf-2',
        type: 'features',
        content: { html: '<h2>핵심 기능</h2><ul><li>기능 1</li><li>기능 2</li><li>기능 3</li></ul>' },
        order: 1,
      },
      {
        id: 'tpl-lf-3',
        type: 'testimonial',
        content: { html: '<h2>고객 후기</h2><blockquote><p>"정말 훌륭한 제품입니다." — 홍길동, 기업명</p></blockquote>' },
        order: 2,
      },
      {
        id: 'tpl-lf-4',
        type: 'pricing',
        content: { html: '<h2>요금제</h2><p><strong>Free</strong> — 무료 | <strong>Pro</strong> — 월 ₩15,000 | <strong>Enterprise</strong> — 문의</p>' },
        order: 3,
      },
      {
        id: 'tpl-lf-5',
        type: 'cta',
        content: { html: '<h2>지금 시작하세요</h2><p>신용카드 없이 무료로 시작하세요.</p>' },
        order: 4,
      },
    ],
  },
];

const SAMPLE_PAGES: Page[] = [
  {
    id: 'page-1',
    workspaceId: 'ws-1',
    title: 'FlowCMS Landing Page',
    slug: 'landing',
    status: 'published',
    themeId: 'clean',
    icon: 'Home',
    blocks: SAMPLE_TEMPLATES[1].blocks,
    puckData: {
      content: [
        {
          type: 'HeroBlock',
          props: {
            id: 'hero-page1-1',
            title: 'Your Product Name',
            subtitle: 'The best solution for your needs',
            ctaText: 'Get Started',
            ctaLink: '/login',
            secondaryText: '',
            secondaryLink: '',
            background: 'gradient',
            badge: 'Landing Page',
            stats: [],
          },
        },
        {
          type: 'FeaturesBlock',
          props: {
            id: 'features-page1-1',
            title: 'Why Choose Us',
            subtitle: 'Everything you need in one platform.',
            layout: 'grid-3',
            features: [
              { icon: 'Zap', title: 'Fast', description: 'Lightning-fast performance.' },
              { icon: 'Shield', title: 'Reliable', description: 'Built for stability.' },
              { icon: 'Layers', title: 'Scalable', description: 'Grows with your team.' },
            ],
          },
        },
        {
          type: 'CTABlock',
          props: {
            id: 'cta-page1-1',
            title: 'Ready to Start?',
            subtitle: 'Try for free today.',
            ctaText: 'Try for Free',
            ctaLink: '/login',
            secondaryText: '',
            secondaryLink: '',
            background: 'gradient',
          },
        },
      ],
      root: { props: { title: 'FlowCMS Landing Page', description: 'A sample landing page' } },
    } as PuckPageData,
    tags: ['landing', 'marketing'],
    author: 'demo-user',
    createdAt: new Date(Date.now() - 7 * 24 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    publishedAt: new Date(Date.now() - 6 * 24 * 3600000).toISOString(),
    viewCount: 1247,
    templateId: 'tpl-landing',
  },
  {
    id: 'page-2',
    workspaceId: 'ws-1',
    title: 'Getting Started Guide',
    slug: 'getting-started',
    status: 'published',
    themeId: 'clean',
    icon: 'BookOpen',
    blocks: SAMPLE_TEMPLATES[2].blocks,
    puckData: {
      content: [
        {
          type: 'HeadingBlock',
          props: { text: 'Getting Started', level: 1, align: 'left', color: 'default', subtitle: 'Welcome to FlowCMS' },
        },
        {
          type: 'TextBlock',
          props: {
            content: 'Welcome to the documentation. This guide will help you get started with FlowCMS and explore its features.',
            align: 'left',
            size: 'base',
            maxWidth: 'prose',
            color: 'default',
          },
        },
        {
          type: 'CodeBlock',
          props: { code: 'npm install flowcms', language: 'bash', filename: 'terminal', showLineNumbers: false },
        },
      ],
      root: { props: { title: 'Getting Started Guide', description: 'Learn how to use FlowCMS' } },
    } as PuckPageData,
    tags: ['docs', 'guide'],
    author: 'demo-user',
    createdAt: new Date(Date.now() - 5 * 24 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    publishedAt: new Date(Date.now() - 4 * 24 * 3600000).toISOString(),
    viewCount: 892,
    templateId: 'tpl-docs',
  },
  {
    id: 'page-3',
    workspaceId: 'ws-1',
    title: 'Product Announcement',
    slug: 'product-v2',
    status: 'draft',
    themeId: 'colorful',
    icon: 'Rocket',
    blocks: SAMPLE_TEMPLATES[4].blocks,
    puckData: {
      content: [
        {
          type: 'HeroBlock',
          props: {
            title: 'Product Name v2',
            subtitle: 'The ultimate solution for modern teams',
            ctaText: 'Learn More',
            ctaLink: '/login',
            secondaryText: '',
            background: 'gradient',
            badge: 'New Release',
            stats: [],
          },
        },
        {
          type: 'FeaturesBlock',
          props: {
            title: 'Key Features',
            subtitle: 'What makes v2 special.',
            layout: 'grid-2',
            features: [
              { icon: 'Zap', title: 'Performance', description: '2x faster than before.' },
              { icon: 'Palette', title: 'New Design', description: 'Completely redesigned UI.' },
            ],
          },
        },
        {
          type: 'TestimonialsBlock',
          props: {
            title: 'What customers say',
            subtitle: '',
            background: 'white',
            columns: 2,
            testimonials: [
              { name: 'Jane Doe', title: 'CTO', text: 'Amazing product upgrade!', rating: 5, avatarSeed: 'jane' },
              { name: 'John Kim', title: 'Developer', text: 'The new features are incredible.', rating: 5, avatarSeed: 'john' },
            ],
          },
        },
        {
          type: 'PricingBlock',
          props: {
            title: 'Simple Pricing',
            subtitle: 'Choose the plan that fits your needs.',
            background: 'gray',
            plans: [
              { name: 'Free', price: '$0', period: '/mo', description: 'For individuals', features: '5 pages\nBasic templates', featured: false },
              { name: 'Pro', price: '$15', period: '/mo', description: 'For teams', features: 'Unlimited pages\nAll templates\nPriority support', featured: true },
              { name: 'Enterprise', price: 'Contact', period: '', description: 'For organizations', features: 'Everything in Pro\nSSO\nDedicated support', featured: false },
            ],
          },
        },
      ],
      root: { props: { title: 'Product Announcement', description: 'Introducing Product v2' } },
    } as PuckPageData,
    tags: ['product', 'announcement'],
    author: 'demo-user',
    createdAt: new Date(Date.now() - 2 * 24 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    viewCount: 0,
  },
  {
    id: 'page-landing',
    workspaceId: 'ws-1',
    title: 'FlowCMS 랜딩 페이지',
    slug: 'landing-page',
    status: 'published' as PageStatus,
    themeId: 'clean' as ThemeId,
    icon: 'Home',
    blocks: [
      {
        id: 'block-landing-main',
        type: 'paragraph' as BlockType,
        content: {
          html: `<h1>FlowCMS - 콘텐츠 관리의 새로운 기준</h1>
<p>이 페이지는 FlowCMS 에디터로 직접 작성된 랜딩 페이지입니다. 아래 내용을 자유롭게 수정하거나, 새 블록을 추가해보세요.</p>
<h2>핵심 기능</h2>
<ul>
<li><strong>블록 기반 에디터</strong> — 드래그 앤 드롭으로 콘텐츠를 구성하세요</li>
<li><strong>테마 &amp; 스타일</strong> — 5가지 전문 테마로 브랜드를 표현하세요</li>
<li><strong>빠른 발행</strong> — 클릭 하나로 콘텐츠를 발행하고 CDN으로 배포하세요</li>
<li><strong>다국어 지원</strong> — 하나의 플랫폼에서 여러 언어로 관리하세요</li>
<li><strong>역할 기반 권한</strong> — 팀 협업을 안전하게 관리하세요</li>
<li><strong>분석 &amp; 인사이트</strong> — 조회수, 전환율을 실시간 모니터링하세요</li>
</ul>
<h2>어떻게 시작하나요?</h2>
<ol>
<li>템플릿을 선택하거나 빈 페이지에서 시작하세요</li>
<li>에디터로 콘텐츠를 자유롭게 편집하세요</li>
<li>발행 버튼 하나로 전 세계에 배포하세요</li>
</ol>
<h2>요금제</h2>
<p><strong>Free</strong> — 개인 프로젝트용, 최대 5개 페이지, 무료</p>
<p><strong>Pro</strong> — 팀 협업용, 무제한 페이지, 월 ₩15,000</p>
<p><strong>Enterprise</strong> — 대규모 조직용, SSO/SAML, 전담 지원, 문의</p>
<h2>고객 후기</h2>
<blockquote><p>"FlowCMS 덕분에 콘텐츠 발행 속도가 3배 빨라졌어요." — 김지영, TechCorp</p></blockquote>
<blockquote><p>"The template system is incredible. We launched our entire product site in one day." — James Park, StartupXYZ</p></blockquote>
<h2>지금 시작하세요</h2>
<p>신용카드 없이 무료로 시작하세요. 언제든지 업그레이드할 수 있습니다.</p>`,
        },
        order: 0,
      },
    ],
    puckData: LANDING_PAGE_PUCK_DATA,
    tags: ['landing', 'tutorial', 'demo'],
    author: 'demo-user',
    createdAt: new Date(Date.now() - 14 * 24 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    publishedAt: new Date(Date.now() - 13 * 24 * 3600000).toISOString(),
    templateId: 'tpl-landing',
    viewCount: 3842,
    seoTitle: 'FlowCMS - 콘텐츠 관리의 새로운 기준',
    seoDescription: 'FlowCMS로 팀의 콘텐츠를 더 빠르게 만들고, 더 쉽게 관리하고, 더 넓게 배포하세요.',
  },
];

const SAMPLE_WORKSPACE: Workspace = {
  id: 'ws-1',
  name: 'My Workspace',
  slug: 'my-workspace',
  themeId: 'clean',
  plan: 'pro',
  members: [
    { userId: 'demo-user', name: 'Demo User', email: 'demo@flowcms.io', role: 'owner', joinedAt: new Date().toISOString() },
  ],
  createdAt: new Date(Date.now() - 30 * 24 * 3600000).toISOString(),
};

interface CMSState {
  workspace: Workspace;
  pages: Page[];
  templates: Template[];
  mediaAssets: MediaAsset[];
  activityLog: ActivityLog[];
  selectedPageId: string | null;
  setWorkspace: (ws: Partial<Workspace>) => void;
  createPage: (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>) => Page;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  publishPage: (id: string) => void;
  duplicatePage: (id: string) => void;
  selectPage: (id: string | null) => void;
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>) => void;
  deleteMediaAsset: (id: string) => void;
  logActivity: (action: string, target: string, targetId: string, userId: string, userName: string) => void;
}

export const useCMSStore = create<CMSState>()(
  persist(
    (set, get) => ({
      workspace: SAMPLE_WORKSPACE,
      pages: SAMPLE_PAGES,
      templates: SAMPLE_TEMPLATES,
      mediaAssets: [],
      activityLog: [],
      selectedPageId: null,

      setWorkspace: (updates) => set((s) => ({ workspace: { ...s.workspace, ...updates } })),

      createPage: (pageData) => {
        const newPage: Page = {
          ...pageData,
          id: `page-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          viewCount: 0,
        };
        set((s) => ({ pages: [...s.pages, newPage] }));
        get().logActivity('created', 'page', newPage.id, pageData.author, pageData.author);
        return newPage;
      },

      updatePage: (id, updates) => set((s) => ({
        pages: s.pages.map((p) => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p),
      })),

      deletePage: (id) => set((s) => ({ pages: s.pages.filter((p) => p.id !== id) })),

      publishPage: (id) => set((s) => ({
        pages: s.pages.map((p) => p.id === id
          ? { ...p, status: 'published' as const, publishedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
          : p
        ),
      })),

      duplicatePage: (id) => {
        const page = get().pages.find((p) => p.id === id);
        if (!page) return;
        const copy: Page = {
          ...page,
          id: `page-${Date.now()}`,
          title: `${page.title} (Copy)`,
          slug: `${page.slug}-copy-${Date.now()}`,
          status: 'draft',
          publishedAt: undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          viewCount: 0,
        };
        set((s) => ({ pages: [...s.pages, copy] }));
      },

      selectPage: (id) => set({ selectedPageId: id }),

      addMediaAsset: (assetData) => set((s) => ({
        mediaAssets: [...s.mediaAssets, {
          ...assetData,
          id: `asset-${Date.now()}`,
          uploadedAt: new Date().toISOString(),
        }],
      })),

      deleteMediaAsset: (id) => set((s) => ({
        mediaAssets: s.mediaAssets.filter((a) => a.id !== id),
      })),

      logActivity: (action, target, targetId, userId, userName) => set((s) => ({
        activityLog: [{
          id: `log-${Date.now()}`,
          userId,
          userName,
          action,
          target,
          targetId,
          createdAt: new Date().toISOString(),
        }, ...s.activityLog].slice(0, 100),
      })),
    }),
    {
      name: 'flowcms-data',
      version: 6,
      migrate: (_persistedState: unknown, version: number) => {
        if (version < 6) {
          // Force full reset to pick up new sample data and fixed puckData IDs
          return null as unknown as CMSState;
        }
        return _persistedState as CMSState;
      },
    }
  )
);
