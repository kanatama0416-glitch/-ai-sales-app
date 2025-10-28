import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export default function FreeChat({ onBack = () => {} }: { onBack?: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'こんにちは。自由にご相談ください。状況や目的を教えていただけると、より具体的にお手伝いできます。',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    const text = input.trim();
    if (!text || loading) return;
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const reply = `ご相談ありがとうございます。\n要約: ${text.slice(0, 60)}\n\n次の観点で考えてみましょう:\n- お客様状況\n- 目的と制約\n- 具体フレーズの候補\n\n必要なら「ロールプレイして」で対話練習も可能です。`;
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">自由相談</h1>
          <p className="text-gray-600 mt-1">ChatGPT風のチャットで相談できます</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="h-[28rem] overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-line shadow ${
                  m.role === 'user'
                    ? 'bg-vivid-red text-white rounded-br-none'
                    : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-xs text-gray-500">AIが入力中...</div>}
        </div>
        <div className="border-t bg-white p-3 flex items-end space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="ここに自由に入力してください"
            rows={1}
            className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-blue"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-sky-blue text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>送信</span>
          </button>
        </div>
      </div>
    </div>
  );
}

