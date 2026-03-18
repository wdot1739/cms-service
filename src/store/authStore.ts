import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/cms';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  loginDemo: () => void;
  register: (name: string, email: string, password: string) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

const DEMO_USER: User = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'demo@flowcms.io',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
  role: 'owner',
  createdAt: new Date().toISOString(),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, _password) => {
        if (email === 'demo@flowcms.io') {
          set({ user: DEMO_USER, isAuthenticated: true });
          return true;
        }
        const user: User = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0],
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          role: 'owner',
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true });
        return true;
      },
      loginDemo: () => set({ user: DEMO_USER, isAuthenticated: true }),
      register: (name, email, _password) => {
        const user: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          role: 'owner',
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true });
      },
      updateUser: (updates) => set((s) => ({ user: s.user ? { ...s.user, ...updates } : null })),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'flowcms-auth' }
  )
);
