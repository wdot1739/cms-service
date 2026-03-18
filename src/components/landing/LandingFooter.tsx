import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Templates', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'API Reference', 'Community', 'Support'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
};

export default function LandingFooter() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">FlowCMS</span>
            </Link>
            <p className="text-sm leading-relaxed">
              콘텐츠 관리의 새로운 기준. 팀과 함께 더 스마트하게 일하세요.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white text-sm mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">&copy; 2025 FlowCMS. All rights reserved.</p>
          <p className="text-sm">Built with love for content creators everywhere</p>
        </div>
      </div>
    </footer>
  );
}
