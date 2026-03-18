import { Render } from '@measured/puck';
import '@measured/puck/puck.css';
import { puckConfig } from '@/lib/puckConfig';
import { useCMSStore } from '@/store/cmsStore';
import { LANDING_PAGE_PUCK_DATA } from '@/lib/defaultPuckData';
import LandingNav from '@/components/landing/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';
import type { Data } from '@measured/puck';

export default function LandingPage() {
  const { pages } = useCMSStore();
  const landingPage = pages.find((p) => p.id === 'page-landing');
  const puckData = (landingPage?.puckData || LANDING_PAGE_PUCK_DATA) as Data;

  return (
    <div className="min-h-screen">
      <LandingNav />
      <Render config={puckConfig} data={puckData} />
      <LandingFooter />
    </div>
  );
}
