export type UserRole = 'owner' | 'editor' | 'viewer';
export type PageStatus = 'draft' | 'published' | 'archived';
export type ThemeId = 'clean' | 'dark' | 'colorful' | 'minimal' | 'corporate';
export type BlockType =
  | 'heading' | 'paragraph' | 'image' | 'gallery' | 'video'
  | 'quote' | 'code' | 'divider' | 'button' | 'columns'
  | 'hero' | 'features' | 'testimonial' | 'pricing' | 'cta' | 'embed';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
}

export interface WorkspaceTheme {
  id: ThemeId;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    background: string;
    text: string;
    accent: string;
  };
}

export interface ContentBlock {
  id: string;
  type: BlockType;
  content: Record<string, unknown>;
  order: number;
}

export interface Page {
  id: string;
  workspaceId: string;
  title: string;
  slug: string;
  status: PageStatus;
  themeId: ThemeId;
  coverImage?: string;
  icon?: string;
  blocks: ContentBlock[];
  templateId?: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  viewCount: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'blog' | 'landing' | 'docs' | 'portfolio' | 'product';
  blocks: ContentBlock[];
  tags: string[];
  isDefault: boolean;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  themeId: ThemeId;
  members: WorkspaceMember[];
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface WorkspaceMember {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  joinedAt: string;
}

export interface MediaAsset {
  id: string;
  workspaceId: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  uploadedAt: string;
  uploadedBy: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  targetId: string;
  createdAt: string;
}
