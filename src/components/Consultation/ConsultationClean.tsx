import React from 'react';
import { Users, Target, MessageSquare, Zap, BookOpen, ChevronRight } from 'lucide-react';

type IconType = React.ComponentType<{ className?: string }>;

interface ConsultationCategory {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  color: string;    // text color class
  bgColor: string;  // light bg + border color class
}

const categories: ConsultationCategory[] = [
  {
    id: 'customer-service',
    title: '接客スキル相談',
    description: '声かけ、リピート促進、断られたときの対応など',
    icon: Users,
    color: 'text-sky-blue',
    bgColor: 'bg-blue-50 border-blue-200',
  },
  {
    id: 'product-situation',
    title: '商品・シチュエーション別相談',
    description: 'フィンテック商品、シニア層、時間がない客など',
    icon: Target,
    color: 'text-success-green',
    bgColor: 'bg-green-50 border-green-200',
  },
  {
    id: 'expression',
    title: '言い回し・表現相談',
    description: '言葉づかい、失礼チェック、フレーズ提案',
    icon: MessageSquare,
    color: 'text-sunshine-yellow',
    bgColor: 'bg-yellow-50 border-yellow-200',
  },
  {
    id: 'roleplay',
    title: 'ロールプレイ相談',
    description: 'AIが顧客役になって対話練習',
    icon: Zap,
    color: 'text-vivid-red',
    bgColor: 'bg-red-50 border-red-200',
  },
  {
    id: 'learning-support',
    title: '学習支援相談',
    description: 'おすすめ練習シナリオ、事例紹介、個別アドバイス',
    icon: BookOpen,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
  },
];

// Map text color token to darker bg for icon square
const iconBgFromText: Record<string, string> = {
  'text-sky-blue': 'bg-sky-blue',
  'text-success-green': 'bg-success-green',
  'text-sunshine-yellow': 'bg-sunshine-yellow',
  'text-vivid-red': 'bg-vivid-red',
  'text-purple-600': 'bg-purple-600',
};

export default function ConsultationClean() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">相談カテゴリを選択</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => {
            const Icon = c.icon;
            const iconBg = iconBgFromText[c.color] || 'bg-gray-400';
            return (
              <div
                key={c.id}
                className={`p-6 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-lg group ${c.bgColor}`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBg}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <ChevronRight className={`w-5 h-5 ${c.color} group-hover:translate-x-1 transition-transform`} />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${c.color}`}>{c.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{c.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

