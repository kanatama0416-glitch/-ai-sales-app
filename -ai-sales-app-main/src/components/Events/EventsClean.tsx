import React, { useMemo, useState } from 'react';
import { Calendar, ChevronRight, Search } from 'lucide-react';

type EventStatus = 'upcoming' | 'active' | 'completed';

type Event = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: EventStatus;
  tags: string[];
  totalPosts: number;
  totalViews: number;
  totalReactions: number;
};

const eventsData: Event[] = [
  {
    id: '1',
    name: '呪術廻戦フェア',
    description: '人気アニメとのコラボイベント。限定グッズとカード提案を強化',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-15'),
    status: 'active',
    tags: ['#呪術廻戦', '#アニメコラボ', '#限定グッズ', '#カード'],
    totalPosts: 12,
    totalViews: 456,
    totalReactions: 89,
  },
  {
    id: '2',
    name: 'MGAフェス2024',
    description: 'マルイグループ年次イベント。全店で実施する大型キャンペーン',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-29'),
    status: 'completed',
    tags: ['#MGAフェス', '#全店', '#年次イベント', '#キャンペーン'],
    totalPosts: 28,
    totalViews: 1234,
    totalReactions: 267,
  },
  {
    id: '3',
    name: 'バレンタインフェア',
    description: 'ギフト需要期に合わせた提案の強化',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-14'),
    status: 'active',
    tags: ['#バレンタイン', '#ギフト'],
    totalPosts: 9,
    totalViews: 320,
    totalReactions: 54,
  },
];

function statusBadge(status: EventStatus) {
  switch (status) {
    case 'active':
      return { text: '開催中', className: 'bg-green-100 text-green-700' };
    case 'upcoming':
      return { text: '開催予定', className: 'bg-blue-100 text-blue-700' };
    case 'completed':
      return { text: '終了', className: 'bg-gray-200 text-gray-700' };
  }
}

type FilterStatus = 'all' | EventStatus;

export default function Events() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');

  const events = useMemo(() => {
    return eventsData.filter((e) => {
      const matchesQuery = query
        ? e.name.includes(query) || e.description.includes(query) || e.tags.some(t => t.includes(query))
        : true;
      const matchesStatus = filter === 'all' ? true : e.status === filter;
      return matchesQuery && matchesStatus;
    });
  }, [query, filter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">好きイベ事例</h2>
        <div className="relative w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-blue"
            placeholder="イベント名・タグを検索"
          />
        </div>
      </div>

      <div className="flex gap-2">
        {[
          { key: 'all', label: 'すべて' },
          { key: 'active', label: '開催中' },
          { key: 'upcoming', label: '開催予定' },
          { key: 'completed', label: '終了' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as FilterStatus)}
            className={`px-3 py-1.5 rounded-lg text-sm border ${
              filter === key ? 'bg-sky-blue text-white border-sky-blue' : 'text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {events.map((ev) => {
          const badge = statusBadge(ev.status);
          return (
            <div key={ev.id} className="bg-white rounded-xl border-2 border-gray-200 hover:border-sky-blue transition-colors p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{ev.name}</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${badge.className}`}>{badge.text}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">{ev.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {ev.startDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })}
                        {' - '}
                        {ev.endDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="hidden sm:flex items-center gap-3">
                      <span>投稿 {ev.totalPosts}</span>
                      <span>閲覧 {ev.totalViews}</span>
                      <span>反応 {ev.totalReactions}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {ev.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 ml-3" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

