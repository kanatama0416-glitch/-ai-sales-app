import React from 'react';
import {
  BarChart3,
  Trophy,
  BookOpen,
  HelpCircle,
  LogOut,
  FolderOpen
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onReturnToOnboarding: () => void;
  onProfileClick: () => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard', label: '学習コンテンツ', icon: BookOpen },
  { id: 'cases', label: '事例集', icon: FolderOpen },
  { id: 'consultation', label: '相談コーナー', icon: HelpCircle },
];

export default function Sidebar({ activeTab, onTabChange, onReturnToOnboarding, onProfileClick, onLogout }: SidebarProps) {
  return (
    <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-red-50 text-vivid-red border border-red-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-vivid-red' : 'text-gray-400'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => onTabChange('evaluation')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 mt-2 ${
              activeTab === 'evaluation'
                ? 'bg-red-50 text-vivid-red border border-red-200'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            } mt-2`}
          >
            <BarChart3 className={`w-5 h-5 ${activeTab === 'evaluation' ? 'text-vivid-red' : 'text-gray-400'}`} />
            <span className="font-medium">スキル評価</span>
          </button>
          
          <button
            onClick={onProfileClick}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 mt-2 ${
              activeTab === 'profile'
                ? 'bg-red-50 text-vivid-red border border-red-200'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Trophy className={`w-5 h-5 ${activeTab === 'profile' ? 'text-vivid-red' : 'text-gray-400'}`} />
            <span className="font-medium">プロフィール</span>
          </button>
          
          <button 
            onClick={onReturnToOnboarding}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-lg transition-all duration-200 mt-2"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <span className="text-xs">?</span>
            </div>
            <span className="font-medium text-sm">表紙に戻る</span>
          </button>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-red-50 hover:text-vivid-red rounded-lg transition-all duration-200 mt-2"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">ログアウト</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}