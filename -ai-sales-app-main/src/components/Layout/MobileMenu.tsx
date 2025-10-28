import React from 'react';
import { X, LogOut } from 'lucide-react';
import {
  BarChart3,
  BookOpen,
  Settings,
  HelpCircle,
  FolderOpen
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onReturnToOnboarding: () => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard', label: '学習コンテンツ', icon: BookOpen },
  { id: 'cases', label: '事例集', icon: FolderOpen },
  { id: 'consultation', label: '相談コーナー', icon: HelpCircle },
];

export default function MobileMenu({ isOpen, onClose, activeTab, onTabChange, onReturnToOnboarding, onLogout }: MobileMenuProps) {
  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    onClose();
  };

  const handleReturnToOnboarding = () => {
    onReturnToOnboarding();
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">メニュー</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-4 text-gray-400 hover:bg-red-50 hover:text-vivid-red rounded-lg transition-all duration-200 mt-2"
          >
            <LogOut className="w-6 h-6" />
            <span className="font-medium text-base">ログアウト</span>
          </button>
        </div>
        
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-4 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-red-50 text-vivid-red border border-red-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? 'text-vivid-red' : 'text-gray-400'}`} />
                    <span className="font-medium text-base">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button className="w-full flex items-center space-x-3 px-4 py-4 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200">
              <Settings className="w-6 h-6 text-gray-400" />
              <span className="font-medium text-base">設定</span>
            </button>
            
            <button
              onClick={() => handleTabChange('evaluation')}
              className={`w-full flex items-center space-x-3 px-4 py-4 rounded-lg text-left transition-all duration-200 mt-2 ${
                activeTab === 'evaluation'
                  ? 'bg-red-50 text-vivid-red border border-red-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <BarChart3 className={`w-6 h-6 ${activeTab === 'evaluation' ? 'text-vivid-red' : 'text-gray-400'}`} />
              <span className="font-medium text-base">スキル評価</span>
            </button>
            
            <button 
              onClick={handleReturnToOnboarding}
              className="w-full flex items-center space-x-3 px-4 py-4 text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-lg transition-all duration-200 mt-2"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="text-sm">?</span>
              </div>
              <span className="font-medium text-base">表紙に戻る</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}