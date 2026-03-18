import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Page, Template, Workspace, MediaAsset, ActivityLog } from '@/types/cms';

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
];

const SAMPLE_PAGES: Page[] = [
  {
    id: 'page-1',
    workspaceId: 'ws-1',
    title: 'FlowCMS Landing Page',
    slug: 'landing',
    status: 'published',
    themeId: 'clean',
    icon: '🏠',
    blocks: SAMPLE_TEMPLATES[1].blocks,
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
    icon: '📚',
    blocks: SAMPLE_TEMPLATES[2].blocks,
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
    icon: '🚀',
    blocks: SAMPLE_TEMPLATES[4].blocks,
    tags: ['product', 'announcement'],
    author: 'demo-user',
    createdAt: new Date(Date.now() - 2 * 24 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    viewCount: 0,
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
    { name: 'flowcms-data' }
  )
);
