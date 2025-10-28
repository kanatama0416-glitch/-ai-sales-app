import React, { useState } from 'react';
import { 
  MessageCircle, 
  Users, 
  MessageSquare, 
  BookOpen, 
  HelpCircle,
  Send,
  ArrowLeft,
  Clock,
  Star,
  ChevronRight,
  Lightbulb,
  Target,
  Heart,
  Zap
} from 'lucide-react';

interface ConsultationCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  subcategories: string[];
}

interface ConsultationHistory {
  id: string;
  category: string;
  question: string;
  answer: string;
  timestamp: Date;
  rating?: number;
}

const consultationCategories: ConsultationCategory[] = [
  {
    id: 'customer-service',
    title: '接客スキル相諁E,
    description: '声かけ、リピ�Eト俁E��、断られたとき�E対応など',
    icon: Users,
    color: 'text-sky-blue',
    bgColor: 'bg-blue-50 border-blue-200',
    subcategories: ['声かけのタイミング', 'リピ�Eト俁E��', '断り対忁E, '初回接客']
  },
  {
    id: 'product-situation',
    title: '啁E��・シチュエーション別相諁E,
    description: 'フィンチE��ク啁E��、シニア層、時間がなぁE��など',
    icon: Target,
    color: 'text-success-green',
    bgColor: 'bg-green-50 border-green-200',
    subcategories: ['フィンチE��ク啁E��', 'シニア層対忁E, '時間制紁E, 'ファミリー層']
  },
  {
    id: 'expression',
    title: '言ぁE��し�E表現相諁E,
    description: '言葉づかい、失礼チェチE��、フレーズ提桁E,
    icon: MessageSquare,
    color: 'text-sunshine-yellow',
    bgColor: 'bg-yellow-50 border-yellow-200',
    subcategories: ['敬語チェチE��', 'フレーズ提桁E, '失礼回避', '自然な表現']
  },
  {
    id: 'roleplay',
    title: 'ロールプレイ相諁E,
    description: 'AIが顧客役になって対話練翁E,
    icon: Zap,
    color: 'text-vivid-red',
    bgColor: 'bg-red-50 border-red-200',
    subcategories: ['対話練翁E, 'シナリオ練翁E, '実践トレーニング', 'フィードバチE��']
  },
  {
    id: 'learning-support',
    title: '学習支援相諁E,
    description: 'おすすめ練習シナリオ、事例紹介、個別アドバイス',
    icon: BookOpen,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    subcategories: ['学習�Eラン', '事例紹仁E, '個別アドバイス', 'スキル診断']
  }
];

const mockHistory: ConsultationHistory[] = [
  {
    id: '1',
    category: '接客スキル相諁E,
    question: 'アニメイベントでお客様に自然に声をかける方法を教えてください',
    answer: 'アニメイベントでの声かけは、お客様�E興味に寁E��添ぁE��とが重要です、En\n【おすすめアプローチ】\n1. 啁E��への関忁E��確認：「このフィギュア、とても人気ですよね�E�」\n2. 共感を示す：「私もこ�Eシリーズ好きなんです」\n3. 自然な提案：「実�E、アニメグチE��のお買ぁE��でお得になるカードがあるんです」\n\n【�E体的なフレーズ例】\n「イベント限定品、素敵な選択です�E�E�実�E、次回�Eイベントでもお得に使えるカードがあるんですが、ご興味ありますか�E�、E,
    timestamp: new Date('2024-01-20T14:30:00'),
    rating: 5
  },
  {
    id: '2',
    category: '言ぁE��し�E表現相諁E,
    question: '「カードを作りませんか」とぁE��言ぁE��が直接皁E��ぎる気がしまぁE,
    answer: 'より自然で柔らかい表現をご提案します、En\n【改喁E��】\n❁E「カードを作りませんか？」\n✁E「お得な会員サービスがあるんですが、ご案�EさせてぁE��だぁE��もよろしぁE��すか�E�」\n\n【その他�E自然な表現】\n• 「�Eイントが貯まるサービスをご利用ぁE��だけますが...」\n• 「次回からもっとお得にお買ぁE��ぁE��だける方法があります」\n• 「会員様限定�E特典をご紹介できるのですが...」\n\n相手�E立場に立った「提案」として伝えることで、押し付けがましさを避けられます、E,
    timestamp: new Date('2024-01-18T11:15:00'),
    rating: 4
  }
];

export default function Consultation() {
  const [selectedCategory, setSelectedCategory] = useState<ConsultationCategory | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [consultationHistory, setConsultationHistory] = useState<ConsultationHistory[]>(mockHistory);

  const handleCategorySelect = (category: ConsultationCategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
    setQuestion('');
    setAnswer('');
  };

  const handleSubmitQuestion = async () => {
    if (!question.trim() || !selectedCategory) return;

    setIsLoading(true);
    
    // AIに相諁E�E容を送信�E�模擬実裁E��E    setTimeout(() => {
      const mockAnswer = generateMockAnswer(selectedCategory.id, question);
      setAnswer(mockAnswer);
      
      // 履歴に追加
      const newConsultation: ConsultationHistory = {
        id: Date.now().toString(),
        category: selectedCategory.title,
        question: question,
        answer: mockAnswer,
        timestamp: new Date()
      };
      
      setConsultationHistory([newConsultation, ...consultationHistory]);
      setIsLoading(false);
    }, 2000);
  };

  const generateMockAnswer = (categoryId: string, question: string): string => {
    const answers = {
      'customer-service': `接客スキルにつぁE��お答えします、E
【基本アプローチ、E1. お客様�E状況を観察し、E��刁E��タイミングを見計らぁE2. 共感を示しながら自然な会話を始めめE3. お客様�EメリチE��を�E体的に説明すめE
【�E体的なフレーズ例、E「お忙しぁE��恐れ入ります。実�E、今日のお買ぁE��がもっとお得になる方法があるんです、E
【関連する練習シナリオ、E• 基本皁E��声かけ練翁E• タイミング判断トレーニング`,

      'product-situation': `啁E��・シチュエーション別のアドバイスをお伝えします、E
【状況�E析、Eお客様�E属性めE��買状況に応じたアプローチが重要です、E
【おすすめ手法、E1. 相手�E立場に立った提桁E2. 具体的なメリチE��の提示
3. 次回来店時の価値創造

【実践例、E、E{question}」�Eような場面では、お客様�E時間を尊重しつつ、簡潔で魁E��皁E��提案を忁E��けましょぁE��`,

      'expression': `言ぁE��し�E表現につぁE��アドバイスします、E
【改喁E�Eポイント、E• より自然で親しみめE��ぁE��現を使用
• 相手�E立場を老E�Eした言葉選び
• 押し付けがましくなぁE��案方況E
【推奨フレーズ、E「もしよろしければ、お得な惁E��をご案�EさせてぁE��だけますか�E�、E「次回からもっと便利にお買ぁE��ぁE��だける方法があります、E
【避けるべき表現、E直接皁E��ぎる勧誘や、断りにくい表現は控えましょぁE��`,

      'roleplay': `ロールプレイ練習を開始します、E
【練習シナリオ、E私がお客様役を演じます�Eで、実際の接客のように対応してください、E
【お客様設定、E20代女性、アニメグチE��購入、�E回来庁E
【シーン開始、E「お会計お願いします。このキーホルダー、可愛いです�E�E�、E
あなた�E対応をお聞かせください。適刁E��タイミングでカード�Eご案�EをしてみましょぁE��`,

      'learning-support': `学習支援につぁE��お答えします、E
【おすすめ学習�Eラン、E1. 基礎スキル診断で現在のレベルを確誁E2. 弱点刁E��の雁E��練翁E3. 実践シミュレーションで応用力向丁E
【関連事例、Eコミュニティで同様�E相諁E��例を確認できます、E
【次のスチE��プ、E• AIシミュレーションでの実践練翁E• スキル評価での定期皁E��成長確誁E• コミュニティでの事例�E有`
    };

    return answers[categoryId as keyof typeof answers] || '申し訳ござぁE��せん。適刁E��回答を生�Eできませんでした。もぁE��度お試しください、E;
  };

  const resetConsultation = () => {
    setSelectedCategory(null);
    setSelectedSubcategory('');
    setQuestion('');
    setAnswer('');
  };

  if (showHistory) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowHistory(false)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">相諁E��歴</h1>
            <p className="text-gray-600 mt-1">過去の相諁E�E容と回答を確認できまぁE/p>
          </div>
        </div>

        <div className="space-y-4">
          {consultationHistory.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-sky-blue text-sm font-medium rounded-full mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-gray-900">{item.question}</h3>
                </div>
                <div className="text-sm text-gray-500">
                  {item.timestamp.toLocaleDateString('ja-JP')}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">AI回筁E/h4>
                <p className="text-gray-700 whitespace-pre-line">{item.answer}</p>
              </div>
              
              {item.rating && (
                <div className="flex items-center space-x-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating! ? 'text-sunshine-yellow fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">評価済み</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (answer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={resetConsultation}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI回筁E/h1>
            <p className="text-gray-600 mt-1">{selectedCategory?.title}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">あなた�E相諁E/h3>
            <p className="text-gray-700 bg-gray-50 rounded-lg p-4">{question}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-sunshine-yellow" />
              <span>AI回筁E/span>
            </h3>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-gray-700 whitespace-pre-line">{answer}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-medium text-success-green mb-2">関連シミュレーション</h4>
              <p className="text-sm text-gray-700 mb-3">こ�E相諁E�E容に関連する練習シナリオ</p>
              <button className="text-success-green hover:text-emerald-green font-medium text-sm flex items-center space-x-1">
                <span>練習を開姁E/span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="font-medium text-sunshine-yellow mb-2">関連事侁E/h4>
              <p className="text-sm text-gray-700 mb-3">コミュニティの類似事例を確誁E/p>
              <button className="text-sunshine-yellow hover:text-yellow-600 font-medium text-sm flex items-center space-x-1">
                <span>事例を見る</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-2">こ�E回答�E役に立ちましたか！E/p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    className="w-8 h-8 text-gray-300 hover:text-sunshine-yellow transition-colors"
                  >
                    <Star className="w-full h-full" />
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={resetConsultation}
              className="px-4 py-2 bg-sky-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              新しい相諁E��する
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedCategory) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedCategory.title}</h1>
            <p className="text-gray-600 mt-1">{selectedCategory.description}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-3">
              詳細カチE��リ�E�任意！E            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {selectedCategory.subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`p-3 text-sm rounded-lg border transition-colors ${
                    selectedSubcategory === sub
                      ? `${selectedCategory.bgColor} ${selectedCategory.color} border-current`
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-3">
              相諁E�E容 <span className="text-vivid-red">*</span>
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="具体的な状況や悩みを詳しく教えてください。例：「アニメイベントでお客様に自然に声をかける方法を知りたぁE��す、E
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-blue focus:border-transparent resize-none"
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">
                具体的な状況を教えてぁE��だくと、より適刁E��回答ができまぁE              </p>
              <span className="text-sm text-gray-400">{question.length}/1000</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              戻めE            </button>
            <button
              onClick={handleSubmitQuestion}
              disabled={!question.trim() || isLoading}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-sky-blue text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>AI回答生成中...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>相諁E��めE/span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">相諁E��ーナ�E</h1>
          <p className="text-gray-600 mt-1">口コミに関する悩みめE��問をAIに相諁E��きまぁE/p>
        </div>
        
        <button
          onClick={() => setShowHistory(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Clock className="w-4 h-4" />
          <span>相諁E��歴</span>
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-sky-blue rounded-lg flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">AIがあなた�E相諁E��お答えしまぁE/h3>
            <p className="text-gray-700 text-sm">
              カチE��リを選択して具体的な相諁E�E容を�E力すると、AIが実践皁E��アドバイスめE              フレーズ例、E��連する練習シナリオを提案します、E            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">相諁E��チE��リを選抁E/h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultationCategories.map((category) => {
            const IconComponent = category.icon;
            const iconBg = ({
              'text-sky-blue': 'bg-sky-blue',
              'text-success-green': 'bg-success-green',
              'text-sunshine-yellow': 'bg-sunshine-yellow',
              'text-vivid-red': 'bg-vivid-red',
              'text-purple-600': 'bg-purple-600',
            } as Record<string, string>)[category.color] || 'bg-gray-400';
            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className={`p-6 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-lg group ${category.bgColor}`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBg}`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <ChevronRight className={`w-5 h-5 ${category.color} group-hover:translate-x-1 transition-transform`} />
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 ${category.color}`}>
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {category.subcategories.slice(0, 3).map((sub, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white bg-opacity-70 text-gray-600 text-xs rounded-md"
                    >
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="px-2 py-1 bg-white bg-opacity-70 text-gray-500 text-xs rounded-md">
                      +{category.subcategories.length - 3}倁E                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">よくある相諁E��E/h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">「断られた後�E対応方法、E/h4>
            <p className="text-sm text-gray-600">お客様に断られた時の自然なフォローアチE�E方況E/p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">「忙しそうなお客様への声かけ、E/h4>
            <p className="text-sm text-gray-600">時間がなさそぁE��お客様への適刁E��アプローチE/p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">「シニア層への説明方法、E/h4>
            <p className="text-sm text-gray-600">年配�Eお客様にも�EかりめE��ぁE��明テクニック</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">「�E然な言ぁE��し�E提案、E/h4>
            <p className="text-sm text-gray-600">押し付けがましくなぁE�E然な表現方況E/p>
          </div>
        </div>
      </div>
    </div>
  );
}

