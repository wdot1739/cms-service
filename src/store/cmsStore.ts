import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Page, Template, Workspace, MediaAsset, ActivityLog } from '@/types/cms';
import { SAMPLE_PAGES, SAMPLE_TEMPLATES, SAMPLE_WORKSPACE } from './sampleData';

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
          return null as unknown as CMSState;
        }
        return _persistedState as CMSState;
      },
    }
  )
);
