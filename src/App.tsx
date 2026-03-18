import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import DashboardLayout from '@/pages/dashboard/DashboardLayout';
import DashboardHome from '@/pages/dashboard/DashboardHome';
import PagesListPage from '@/pages/dashboard/PagesListPage';
import EditorPage from '@/pages/dashboard/EditorPage';
import TemplatesPage from '@/pages/dashboard/TemplatesPage';
import MediaPage from '@/pages/dashboard/MediaPage';
import SettingsPage from '@/pages/dashboard/SettingsPage';
import PreviewPage from '@/pages/dashboard/PreviewPage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/preview/:pageId" element={<PreviewPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute><DashboardLayout /></PrivateRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="pages" element={<PagesListPage />} />
          <Route path="editor/new" element={<EditorPage />} />
          <Route path="editor/:pageId" element={<EditorPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
