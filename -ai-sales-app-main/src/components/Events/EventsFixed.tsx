import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

type EventStatus = 'upcoming' | 'active' | 'completed';

type SimpleEvent = {
  id: string;
  name: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string;
  status: EventStatus;
  tags: string[];
};

const events: SimpleEvent[] = [
  {
    id: '1',
    name: '呪術廻戦フェア',
    description: '人気アニメとのコラボイベント。限定グッズとカード案内を強化。',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    status: 'active',
    tags: ['#呪術廻戦', '#アニメコラボ']
  },
  {
    id: '2',
    name: 'MGAフェス2024',
    description: 'マルイグループ年次イベント。全店参加の大型キャンペーン。',
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    status: 'completed',
    tags: ['#MGAフェス', '#全店']
  },
  {
    id: '3',
    name: 'バレンタインフェア',
    description: 'ギフト需要期に合わせた特典案内を実施。',
    startDate: '2024-02-01',
    endDate: '2024-02-14',
    status: 'active',
    tags: ['#バレンタイン', '#ギフト']
  }
];

function statusColor(status: EventStatus) {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700';
    case 'upcoming':
      return 'bg-blue-100 text-blue-700';
    case 'completed':
      return 'bg-gray-200 text-gray-700';
  }
}

export default function Events() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">好きイベ事例</h2>
        <p className="text-gray-600 text-sm">一時的な安全版で表示中（後で本UIに戻します）</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {events.map(ev => (
          <div key={ev.id} className="bg-white rounded-xl border-2 border-gray-200 hover:border-sky-blue transition-colors p-4 cursor-default">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{ev.name}</h3>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColor(ev.status)}`}>
                    {ev.status === 'active' ? '開催中' : ev.status === 'upcoming' ? '開催予定' : '終了'}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2 line-clamp-2">{ev.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(ev.startDate).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })}
                      {' - '}
                      {new Date(ev.endDate).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {ev.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 ml-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

