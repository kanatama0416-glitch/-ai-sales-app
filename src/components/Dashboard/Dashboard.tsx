import React, { useState } from 'react';
import { BookOpen, Video, Headphones, Play, MessageSquare, Heart, Clock, Sparkles, Award } from 'lucide-react';
import Simulation from '../Simulation/Simulation';
import BeginnerCourse from './BeginnerCourse';

interface LearningContent {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'simulation';
  duration: string;
  difficulty: 'beginner' | 'intermediate';
  category: string;
  description: string;
  completed: boolean;
  isFavorite?: boolean;
  scenarioCount?: number;
  tags: string[];
}

const mockLearningContents: LearningContent[] = [
  // 初心者向けコンテンツ
  {
    id: '1',
    title: '基本的なカード口コミマナー',
    type: 'video',
    duration: '12分',
    difficulty: 'beginner',
    category: '基礎知識',
    description: 'カード口コミの基本マナーと声かけのポイントを学びます',
    completed: true,
    isFavorite: false,
    tags: ['基礎', 'マナー']
  },
  {
    id: '2',
    title: 'カード口コミ入門シミュレーション',
    type: 'simulation',
    duration: '10分',
    difficulty: 'beginner',
    category: '基礎知識',
    description: '選択肢式で基本的な声かけを練習します',
    completed: false,
    isFavorite: true,
    scenarioCount: 3,
    tags: ['基礎', '選択式']
  },
  {
    id: '3',
    title: 'カード特典の説明方法',
    type: 'audio',
    duration: '15分',
    difficulty: 'beginner',
    category: 'カード知識',
    description: 'カードの基本的な特典と説明のコツを音声で学びます',
    completed: false,
    isFavorite: false,
    tags: ['カード特典', '説明']
  },
  {
    id: '4',
    title: 'レジでの声かけ基本',
    type: 'simulation',
    duration: '12分',
    difficulty: 'beginner',
    category: '基礎知識',
    description: 'レジでの基本的な声かけを選択肢形式で練習',
    completed: false,
    isFavorite: false,
    scenarioCount: 4,
    tags: ['レジ', '基礎']
  },
  {
    id: '5',
    title: 'お客様への第一声',
    type: 'video',
    duration: '8分',
    difficulty: 'beginner',
    category: 'コミュニケーション',
    description: '効果的な第一声と笑顔の重要性',
    completed: true,
    isFavorite: false,
    tags: ['コミュニケーション', '基礎']
  },
  {
    id: '6',
    title: '簡単な声かけ練習',
    type: 'simulation',
    duration: '10分',
    difficulty: 'beginner',
    category: 'コミュニケーション',
    description: 'シンプルな声かけパターンを選択式で学習',
    completed: false,
    isFavorite: false,
    scenarioCount: 5,
    tags: ['声かけ', '基礎']
  },

  // 中級者向けコンテンツ
  {
    id: '7',
    title: 'アニメファン接客シミュレーション',
    type: 'simulation',
    duration: '20分',
    difficulty: 'intermediate',
    category: '実践事例',
    description: 'アニメイベントでの複雑な接客を自由回答形式で練習',
    completed: false,
    isFavorite: true,
    scenarioCount: 6,
    tags: ['イベント', 'アニメ', '自由回答']
  },
  {
    id: '8',
    title: '断り対応の実践テクニック',
    type: 'simulation',
    duration: '18分',
    difficulty: 'intermediate',
    category: 'コミュニケーション',
    description: '様々な断り文句への対応を自然言語で練習',
    completed: false,
    isFavorite: false,
    scenarioCount: 8,
    tags: ['断り対応', '応用']
  },
  {
    id: '9',
    title: 'クレーム対応からの口コミ転換',
    type: 'simulation',
    duration: '22分',
    difficulty: 'intermediate',
    category: 'コミュニケーション',
    description: '難易度の高いクレーム対応シナリオ',
    completed: false,
    isFavorite: false,
    scenarioCount: 5,
    tags: ['クレーム', '応用']
  },
  {
    id: '10',
    title: 'シニア層への丁寧な説明術',
    type: 'video',
    duration: '16分',
    difficulty: 'intermediate',
    category: '実践事例',
    description: 'シニア層への効果的なカード説明方法',
    completed: true,
    isFavorite: false,
    tags: ['シニア', '説明']
  },
  {
    id: '11',
    title: '複雑なカード特典の説明',
    type: 'audio',
    duration: '20分',
    difficulty: 'intermediate',
    category: 'カード知識',
    description: '詳細なカード特典と状況別の提案方法',
    completed: false,
    isFavorite: false,
    tags: ['カード特典', '応用']
  },
  {
    id: '12',
    title: 'ファミリー層への提案術',
    type: 'simulation',
    duration: '18分',
    difficulty: 'intermediate',
    category: '実践事例',
    description: '家族連れへの効果的なアプローチ',
    completed: false,
    isFavorite: false,
    scenarioCount: 7,
    tags: ['ファミリー', '応用']
  },
  {
    id: '13',
    title: '忙しい時間帯の効率的な口コミ',
    type: 'simulation',
    duration: '15分',
    difficulty: 'intermediate',
    category: 'コミュニケーション',
    description: '混雑時の素早く効果的な声かけ',
    completed: false,
    isFavorite: false,
    scenarioCount: 6,
    tags: ['効率化', '応用']
  },
  {
    id: '14',
    title: '上級者インタビュー集',
    type: 'audio',
    duration: '25分',
    difficulty: 'intermediate',
    category: '実践事例',
    description: 'トップセールスの実践テクニックを学ぶ',
    completed: false,
    isFavorite: false,
    tags: ['上級者', 'ノウハウ']
  },
];

type SkillLevel = 'beginner' | 'intermediate';

function getTypeIcon(type: string) {
  const icons = {
    video: Video,
    audio: Headphones,
    simulation: MessageSquare
  };

  return icons[type as keyof typeof icons] || BookOpen;
}

function getTypeColor(type: string): string {
  const colors = {
    video: 'bg-red-100 text-vivid-red',
    audio: 'bg-green-100 text-success-green',
    simulation: 'bg-purple-100 text-purple-600'
  };

  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-600';
}

function getTypeLabel(type: string): string {
  const labels = {
    video: '動画学習',
    audio: '音声学習',
    simulation: 'AIシミュレーション'
  };

  return labels[type as keyof typeof labels] || type;
}

function getDifficultyLabel(difficulty: string): string {
  return difficulty === 'beginner' ? '初心者向け' : '中級者向け';
}

function getDifficultyColor(difficulty: string): string {
  return difficulty === 'beginner'
    ? 'bg-blue-100 text-sky-blue'
    : 'bg-orange-100 text-orange-600';
}

interface DashboardProps {
  onNavigateToSimulation: () => void;
}

export default function Dashboard({ onNavigateToSimulation }: DashboardProps) {
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('beginner');
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
  const [showSimulation, setShowSimulation] = useState(false);
  const [contents, setContents] = useState<LearningContent[]>(mockLearningContents);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // スキルレベルでフィルタリング
  const filteredBySkillLevel = contents.filter(content => content.difficulty === skillLevel);

  // お気に入りフィルタ
  const displayContents = showFavoritesOnly
    ? filteredBySkillLevel.filter(content => content.isFavorite)
    : filteredBySkillLevel;

  // 今日のおすすめ学習（未完了で最初の2つ）
  const recommendedContents = filteredBySkillLevel
    .filter(content => !content.completed)
    .slice(0, 2);

  // カテゴリー別にグループ化
  const categorizedContents = displayContents.reduce((acc, content) => {
    if (!acc[content.category]) {
      acc[content.category] = [];
    }
    acc[content.category].push(content);
    return acc;
  }, {} as Record<string, LearningContent[]>);

  // コンテンツタイプ別の統計
  const videoCount = filteredBySkillLevel.filter(c => c.type === 'video').length;
  const audioCount = filteredBySkillLevel.filter(c => c.type === 'audio').length;
  const simulationCount = filteredBySkillLevel.filter(c => c.type === 'simulation').length;

  const handleContentTypeClick = (type: string) => {
    if (type === 'simulation') {
      setShowSimulation(true);
    } else {
      setSelectedContentType(type);
      setShowSimulation(false);
    }
  };

  const handleBackToContent = () => {
    setSelectedContentType(null);
    setShowSimulation(false);
  };

  const toggleFavorite = (contentId: string) => {
    setContents(prev => prev.map(content =>
      content.id === contentId
        ? { ...content, isFavorite: !content.isFavorite }
        : content
    ));
  };

  // AIシミュレーションページを表示
  if (showSimulation) {
    return <Simulation onBack={handleBackToContent} />;
  }

  // 特定のコンテンツタイプを表示
  if (selectedContentType) {
    const typeFilteredContents = displayContents.filter(content => content.type === selectedContentType);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{getTypeLabel(selectedContentType)}</h1>
            <p className="text-gray-600 mt-1">{getDifficultyLabel(skillLevel)} - {getTypeLabel(selectedContentType)}</p>
          </div>
          <button
            onClick={handleBackToContent}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            戻る
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid grid-cols-1 gap-4">
            {typeFilteredContents.map((content) => {
              const IconComponent = getTypeIcon(content.type);

              return (
                <div
                  key={content.id}
                  className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(content.type)}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-gray-900">{content.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{content.description}</p>
                      </div>
                      <button
                        onClick={() => toggleFavorite(content.id)}
                        className={`p-1 rounded-full transition-colors ml-2 ${
                          content.isFavorite
                            ? 'text-vivid-red hover:text-red-600'
                            : 'text-gray-400 hover:text-vivid-red'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${content.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{content.duration}</span>
                      </div>
                      {content.scenarioCount && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          {content.scenarioCount}シナリオ
                        </span>
                      )}
                      {content.completed && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          完了
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(content.difficulty)}`}>
                        {getDifficultyLabel(content.difficulty)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      {content.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    className="flex items-center space-x-2 px-4 py-2 bg-sky-blue text-white rounded-lg hover:bg-blue-600 transition-colors flex-shrink-0"
                    onClick={content.type === 'simulation' ? () => onNavigateToSimulation() : undefined}
                  >
                    <Play className="w-4 h-4" />
                    <span className="text-sm font-medium">開始</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">学習コンテンツ</h1>
        <p className="text-gray-600 mt-1">あなたのレベルに合わせた学習で口コミスキルを向上させましょう</p>
      </div>

      {/* スキルレベル切替タブ */}
      <div className="bg-white rounded-xl border border-gray-200 p-1">
        <div className="flex space-x-2">
          <button
            onClick={() => setSkillLevel('beginner')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              skillLevel === 'beginner'
                ? 'bg-sky-blue text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>初心者</span>
            </div>
            <p className="text-xs mt-1 opacity-90">基礎から学びたい方</p>
          </button>
          <button
            onClick={() => setSkillLevel('intermediate')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              skillLevel === 'intermediate'
                ? 'bg-orange-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Award className="w-5 h-5" />
              <span>中級者</span>
            </div>
            <p className="text-xs mt-1 opacity-90">応用スキルを習得したい方</p>
          </button>
        </div>
      </div>

      {/* 初心者：コースビュー、中級者：従来の表示 */}
      {skillLevel === 'beginner' ? (
        <BeginnerCourse />
      ) : (
        <>
          {/* 今日のおすすめ学習 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-sky-blue" />
              <h2 className="text-lg font-semibold text-gray-900">今日のおすすめ学習</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              あなたの学習履歴とスキル評価に基づいて、AIが最適な学習コンテンツを選びました
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedContents.map((content) => {
                const IconComponent = getTypeIcon(content.type);

                return (
                  <div key={content.id} className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(content.type)}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{content.title}</h4>
                        <p className="text-xs text-gray-600 mb-2">{content.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{content.duration}</span>
                          {content.scenarioCount && (
                            <>
                              <span>•</span>
                              <span>{content.scenarioCount}シナリオ</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

      {/* 学習コンテンツ分類 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">学習コンテンツ分類</h2>
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              showFavoritesOnly
                ? 'bg-vivid-red text-white'
                : 'text-gray-600 hover:text-vivid-red'
            }`}
          >
            <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            <span>{showFavoritesOnly ? 'お気に入り' : 'お気に入り表示'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleContentTypeClick('video')}
            className="bg-white rounded-xl border-2 border-gray-200 p-6 text-center hover:border-vivid-red hover:shadow-md transition-all duration-200"
          >
            <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Video className="w-7 h-7 text-vivid-red" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">動画学習</h3>
            <p className="text-sm text-gray-600 mb-3">実践的な動画で視覚的に学習</p>
            <div className="text-2xl font-bold text-vivid-red">{videoCount}</div>
            <p className="text-xs text-gray-500">コンテンツ</p>
          </button>

          <button
            onClick={() => handleContentTypeClick('audio')}
            className="bg-white rounded-xl border-2 border-gray-200 p-6 text-center hover:border-success-green hover:shadow-md transition-all duration-200"
          >
            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Headphones className="w-7 h-7 text-success-green" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">音声学習</h3>
            <p className="text-sm text-gray-600 mb-3">移動中でも聞いて学習</p>
            <div className="text-2xl font-bold text-success-green">{audioCount}</div>
            <p className="text-xs text-gray-500">コンテンツ</p>
          </button>

          <button
            onClick={() => handleContentTypeClick('simulation')}
            className="bg-white rounded-xl border-2 border-gray-200 p-6 text-center hover:border-purple-600 hover:shadow-md transition-all duration-200"
          >
            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">AIシミュレーション</h3>
            <p className="text-sm text-gray-600 mb-3">
              {skillLevel === 'beginner' ? '選択式で基礎を練習' : '自由回答で実践練習'}
            </p>
            <div className="text-2xl font-bold text-purple-600">{simulationCount}</div>
            <p className="text-xs text-gray-500">シナリオ</p>
          </button>
        </div>
      </div>

      {/* カテゴリー別コンテンツ一覧 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">すべてのコンテンツ</h2>

        {Object.entries(categorizedContents).map(([category, contents]) => (
          <div key={category} className="mb-6 last:mb-0">
            <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
              {category}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {contents.map((content) => {
                const IconComponent = getTypeIcon(content.type);

                return (
                  <div
                    key={content.id}
                    className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(content.type)}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">{content.title}</h4>
                        <button
                          onClick={() => toggleFavorite(content.id)}
                          className={`p-1 rounded-full transition-colors ${
                            content.isFavorite
                              ? 'text-vivid-red hover:text-red-600'
                              : 'text-gray-400 hover:text-vivid-red'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${content.isFavorite ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center space-x-1 text-xs text-gray-600">
                          <Clock className="w-3 h-3" />
                          <span>{content.duration}</span>
                        </div>
                        {content.scenarioCount && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                            {content.scenarioCount}シナリオ
                          </span>
                        )}
                        {content.completed && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            完了
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      className="px-3 py-1 bg-sky-blue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      onClick={content.type === 'simulation' ? () => onNavigateToSimulation() : undefined}
                    >
                      開始
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

          {/* お気に入りが空の場合のメッセージ */}
          {showFavoritesOnly && displayContents.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">お気に入りがありません</h3>
              <p className="text-gray-600 mb-4">学習コンテンツのハートマークをクリックしてお気に入りに追加しましょう</p>
              <button
                onClick={() => setShowFavoritesOnly(false)}
                className="px-4 py-2 bg-sky-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                すべてのコンテンツを表示
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
