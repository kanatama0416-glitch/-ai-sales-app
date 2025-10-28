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
    title: '謗･螳｢繧ｹ繧ｭ繝ｫ逶ｸ隲・,
    description: '螢ｰ縺九￠縲√Μ繝斐・繝井ｿ・ｲ縲∵妙繧峨ｌ縺溘→縺阪・蟇ｾ蠢懊↑縺ｩ',
    icon: Users,
    color: 'text-sky-blue',
    bgColor: 'bg-blue-50 border-blue-200',
    subcategories: ['螢ｰ縺九￠縺ｮ繧ｿ繧､繝溘Φ繧ｰ', '繝ｪ繝斐・繝井ｿ・ｲ', '譁ｭ繧雁ｯｾ蠢・, '蛻晏屓謗･螳｢']
  },
  {
    id: 'product-situation',
    title: '蝠・刀繝ｻ繧ｷ繝√Η繧ｨ繝ｼ繧ｷ繝ｧ繝ｳ蛻･逶ｸ隲・,
    description: '繝輔ぅ繝ｳ繝・ャ繧ｯ蝠・刀縲√す繝九い螻､縲∵凾髢薙′縺ｪ縺・ｮ｢縺ｪ縺ｩ',
    icon: Target,
    color: 'text-success-green',
    bgColor: 'bg-green-50 border-green-200',
    subcategories: ['繝輔ぅ繝ｳ繝・ャ繧ｯ蝠・刀', '繧ｷ繝九い螻､蟇ｾ蠢・, '譎る俣蛻ｶ邏・, '繝輔ぃ繝溘Μ繝ｼ螻､']
  },
  {
    id: 'expression',
    title: '險縺・屓縺励・陦ｨ迴ｾ逶ｸ隲・,
    description: '險闡峨▼縺九＞縲∝､ｱ遉ｼ繝√ぉ繝・け縲√ヵ繝ｬ繝ｼ繧ｺ謠先｡・,
    icon: MessageSquare,
    color: 'text-sunshine-yellow',
    bgColor: 'bg-yellow-50 border-yellow-200',
    subcategories: ['謨ｬ隱槭メ繧ｧ繝・け', '繝輔Ξ繝ｼ繧ｺ謠先｡・, '螟ｱ遉ｼ蝗樣∩', '閾ｪ辟ｶ縺ｪ陦ｨ迴ｾ']
  },
  {
    id: 'roleplay',
    title: '繝ｭ繝ｼ繝ｫ繝励Ξ繧､逶ｸ隲・,
    description: 'AI縺碁｡ｧ螳｢蠖ｹ縺ｫ縺ｪ縺｣縺ｦ蟇ｾ隧ｱ邱ｴ鄙・,
    icon: Zap,
    color: 'text-vivid-red',
    bgColor: 'bg-red-50 border-red-200',
    subcategories: ['蟇ｾ隧ｱ邱ｴ鄙・, '繧ｷ繝翫Μ繧ｪ邱ｴ鄙・, '螳溯ｷｵ繝医Ξ繝ｼ繝九Φ繧ｰ', '繝輔ぅ繝ｼ繝峨ヰ繝・け']
  },
  {
    id: 'learning-support',
    title: '蟄ｦ鄙呈髪謠ｴ逶ｸ隲・,
    description: '縺翫☆縺吶ａ邱ｴ鄙偵す繝翫Μ繧ｪ縲∽ｺ倶ｾ狗ｴｹ莉九∝句挨繧｢繝峨ヰ繧､繧ｹ',
    icon: BookOpen,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    subcategories: ['蟄ｦ鄙偵・繝ｩ繝ｳ', '莠倶ｾ狗ｴｹ莉・, '蛟句挨繧｢繝峨ヰ繧､繧ｹ', '繧ｹ繧ｭ繝ｫ險ｺ譁ｭ']
  }
];

const mockHistory: ConsultationHistory[] = [
  {
    id: '1',
    category: '謗･螳｢繧ｹ繧ｭ繝ｫ逶ｸ隲・,
    question: '繧｢繝九Γ繧､繝吶Φ繝医〒縺雁ｮ｢讒倥↓閾ｪ辟ｶ縺ｫ螢ｰ繧偵°縺代ｋ譁ｹ豕輔ｒ謨吶∴縺ｦ縺上□縺輔＞',
    answer: '繧｢繝九Γ繧､繝吶Φ繝医〒縺ｮ螢ｰ縺九￠縺ｯ縲√♀螳｢讒倥・闊亥袖縺ｫ蟇・ｊ豺ｻ縺・％縺ｨ縺碁㍾隕√〒縺吶・n\n縲舌♀縺吶☆繧√い繝励Ο繝ｼ繝√曾n1. 蝠・刀縺ｸ縺ｮ髢｢蠢・ｒ遒ｺ隱搾ｼ壹後％縺ｮ繝輔ぅ繧ｮ繝･繧｢縲√→縺ｦ繧ゆｺｺ豌励〒縺吶ｈ縺ｭ・√構n2. 蜈ｱ諢溘ｒ遉ｺ縺呻ｼ壹檎ｧ√ｂ縺薙・繧ｷ繝ｪ繝ｼ繧ｺ螂ｽ縺阪↑繧薙〒縺吶構n3. 閾ｪ辟ｶ縺ｪ謠先｡茨ｼ壹悟ｮ溘・縲√い繝九Γ繧ｰ繝・ぜ縺ｮ縺願ｲｷ縺・黄縺ｧ縺雁ｾ励↓縺ｪ繧九き繝ｼ繝峨′縺ゅｋ繧薙〒縺吶構n\n縲仙・菴鍋噪縺ｪ繝輔Ξ繝ｼ繧ｺ萓九曾n縲後う繝吶Φ繝磯剞螳壼刀縲∫ｴ謨ｵ縺ｪ驕ｸ謚槭〒縺吶・・∝ｮ溘・縲∵ｬ｡蝗槭・繧､繝吶Φ繝医〒繧ゅ♀蠕励↓菴ｿ縺医ｋ繧ｫ繝ｼ繝峨′縺ゅｋ繧薙〒縺吶′縲√＃闊亥袖縺ゅｊ縺ｾ縺吶°・溘・,
    timestamp: new Date('2024-01-20T14:30:00'),
    rating: 5
  },
  {
    id: '2',
    category: '險縺・屓縺励・陦ｨ迴ｾ逶ｸ隲・,
    question: '縲後き繝ｼ繝峨ｒ菴懊ｊ縺ｾ縺帙ｓ縺九阪→縺・≧險縺・婿縺檎峩謗･逧・☆縺弱ｋ豌励′縺励∪縺・,
    answer: '繧医ｊ閾ｪ辟ｶ縺ｧ譟斐ｉ縺九＞陦ｨ迴ｾ繧偵＃謠先｡医＠縺ｾ縺吶・n\n縲先隼蝟・｡医曾n笶・縲後き繝ｼ繝峨ｒ菴懊ｊ縺ｾ縺帙ｓ縺具ｼ溘構n笨・縲後♀蠕励↑莨壼藤繧ｵ繝ｼ繝薙せ縺後≠繧九ｓ縺ｧ縺吶′縲√＃譯亥・縺輔○縺ｦ縺・◆縺縺・※繧ゅｈ繧阪＠縺・〒縺吶°・溘構n\n縲舌◎縺ｮ莉悶・閾ｪ辟ｶ縺ｪ陦ｨ迴ｾ縲曾n窶｢ 縲後・繧､繝ｳ繝医′雋ｯ縺ｾ繧九し繝ｼ繝薙せ繧偵＃蛻ｩ逕ｨ縺・◆縺縺代∪縺吶′...縲構n窶｢ 縲梧ｬ｡蝗槭°繧峨ｂ縺｣縺ｨ縺雁ｾ励↓縺願ｲｷ縺・黄縺・◆縺縺代ｋ譁ｹ豕輔′縺ゅｊ縺ｾ縺吶構n窶｢ 縲御ｼ壼藤讒倬剞螳壹・迚ｹ蜈ｸ繧偵＃邏ｹ莉九〒縺阪ｋ縺ｮ縺ｧ縺吶′...縲構n\n逶ｸ謇九・遶句ｴ縺ｫ遶九▲縺溘梧署譯医阪→縺励※莨昴∴繧九％縺ｨ縺ｧ縲∵款縺嶺ｻ倥￠縺後∪縺励＆繧帝∩縺代ｉ繧後∪縺吶・,
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
    
    // AI縺ｫ逶ｸ隲・・螳ｹ繧帝∽ｿ｡・域ｨ｡謫ｬ螳溯｣・ｼ・    setTimeout(() => {
      const mockAnswer = generateMockAnswer(selectedCategory.id, question);
      setAnswer(mockAnswer);
      
      // 螻･豁ｴ縺ｫ霑ｽ蜉
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
      'customer-service': `謗･螳｢繧ｹ繧ｭ繝ｫ縺ｫ縺､縺・※縺顔ｭ斐∴縺励∪縺吶・
縲仙渕譛ｬ繧｢繝励Ο繝ｼ繝√・1. 縺雁ｮ｢讒倥・迥ｶ豕√ｒ隕ｳ蟇溘＠縲・←蛻・↑繧ｿ繧､繝溘Φ繧ｰ繧定ｦ玖ｨ医ｉ縺・2. 蜈ｱ諢溘ｒ遉ｺ縺励↑縺後ｉ閾ｪ辟ｶ縺ｪ莨夊ｩｱ繧貞ｧ九ａ繧・3. 縺雁ｮ｢讒倥・繝｡繝ｪ繝・ヨ繧貞・菴鍋噪縺ｫ隱ｬ譏弱☆繧・
縲仙・菴鍋噪縺ｪ繝輔Ξ繝ｼ繧ｺ萓九・縲後♀蠢吶＠縺・ｸｭ諱舌ｌ蜈･繧翫∪縺吶ょｮ溘・縲∽ｻ頑律縺ｮ縺願ｲｷ縺・黄縺後ｂ縺｣縺ｨ縺雁ｾ励↓縺ｪ繧区婿豕輔′縺ゅｋ繧薙〒縺吶・
縲宣未騾｣縺吶ｋ邱ｴ鄙偵す繝翫Μ繧ｪ縲・窶｢ 蝓ｺ譛ｬ逧・↑螢ｰ縺九￠邱ｴ鄙・窶｢ 繧ｿ繧､繝溘Φ繧ｰ蛻､譁ｭ繝医Ξ繝ｼ繝九Φ繧ｰ`,

      'product-situation': `蝠・刀繝ｻ繧ｷ繝√Η繧ｨ繝ｼ繧ｷ繝ｧ繝ｳ蛻･縺ｮ繧｢繝峨ヰ繧､繧ｹ繧偵♀莨昴∴縺励∪縺吶・
縲千憾豕∝・譫舌・縺雁ｮ｢讒倥・螻樊ｧ繧・ｳｼ雋ｷ迥ｶ豕√↓蠢懊§縺溘い繝励Ο繝ｼ繝√′驥崎ｦ√〒縺吶・
縲舌♀縺吶☆繧∵焔豕輔・1. 逶ｸ謇九・遶句ｴ縺ｫ遶九▲縺滓署譯・2. 蜈ｷ菴鍋噪縺ｪ繝｡繝ｪ繝・ヨ縺ｮ謠千､ｺ
3. 谺｡蝗樊擂蠎玲凾縺ｮ萓｡蛟､蜑ｵ騾

縲仙ｮ溯ｷｵ萓九・縲・{question}縲阪・繧医≧縺ｪ蝣ｴ髱｢縺ｧ縺ｯ縲√♀螳｢讒倥・譎る俣繧貞ｰ企㍾縺励▽縺､縲∫ｰ｡貎斐〒鬲・鴨逧・↑謠先｡医ｒ蠢・′縺代∪縺励ｇ縺・Ａ,

      'expression': `險縺・屓縺励・陦ｨ迴ｾ縺ｫ縺､縺・※繧｢繝峨ヰ繧､繧ｹ縺励∪縺吶・
縲先隼蝟・・繝昴う繝ｳ繝医・窶｢ 繧医ｊ閾ｪ辟ｶ縺ｧ隕ｪ縺励∩繧・☆縺・｡ｨ迴ｾ繧剃ｽｿ逕ｨ
窶｢ 逶ｸ謇九・遶句ｴ繧定・・縺励◆險闡蛾∈縺ｳ
窶｢ 謚ｼ縺嶺ｻ倥￠縺後∪縺励￥縺ｪ縺・署譯域婿豕・
縲先耳螂ｨ繝輔Ξ繝ｼ繧ｺ縲・縲後ｂ縺励ｈ繧阪＠縺代ｌ縺ｰ縲√♀蠕励↑諠・ｱ繧偵＃譯亥・縺輔○縺ｦ縺・◆縺縺代∪縺吶°・溘・縲梧ｬ｡蝗槭°繧峨ｂ縺｣縺ｨ萓ｿ蛻ｩ縺ｫ縺願ｲｷ縺・黄縺・◆縺縺代ｋ譁ｹ豕輔′縺ゅｊ縺ｾ縺吶・
縲宣∩縺代ｋ縺ｹ縺崎｡ｨ迴ｾ縲・逶ｴ謗･逧・☆縺弱ｋ蜍ｧ隱倥ｄ縲∵妙繧翫↓縺上＞陦ｨ迴ｾ縺ｯ謗ｧ縺医∪縺励ｇ縺・Ａ,

      'roleplay': `繝ｭ繝ｼ繝ｫ繝励Ξ繧､邱ｴ鄙偵ｒ髢句ｧ九＠縺ｾ縺吶・
縲千ｷｴ鄙偵す繝翫Μ繧ｪ縲・遘√′縺雁ｮ｢讒伜ｽｹ繧呈ｼ斐§縺ｾ縺吶・縺ｧ縲∝ｮ滄圀縺ｮ謗･螳｢縺ｮ繧医≧縺ｫ蟇ｾ蠢懊＠縺ｦ縺上□縺輔＞縲・
縲舌♀螳｢讒倩ｨｭ螳壹・20莉｣螂ｳ諤ｧ縲√い繝九Γ繧ｰ繝・ぜ雉ｼ蜈･縲∝・蝗樊擂蠎・
縲舌す繝ｼ繝ｳ髢句ｧ九・縲後♀莨夊ｨ医♀鬘倥＞縺励∪縺吶ゅ％縺ｮ繧ｭ繝ｼ繝帙Ν繝繝ｼ縲∝庄諢帙＞縺ｧ縺吶・・√・
縺ゅ↑縺溘・蟇ｾ蠢懊ｒ縺願◇縺九○縺上□縺輔＞縲る←蛻・↑繧ｿ繧､繝溘Φ繧ｰ縺ｧ繧ｫ繝ｼ繝峨・縺疲｡亥・繧偵＠縺ｦ縺ｿ縺ｾ縺励ｇ縺・Ａ,

      'learning-support': `蟄ｦ鄙呈髪謠ｴ縺ｫ縺､縺・※縺顔ｭ斐∴縺励∪縺吶・
縲舌♀縺吶☆繧∝ｭｦ鄙偵・繝ｩ繝ｳ縲・1. 蝓ｺ遉弱せ繧ｭ繝ｫ險ｺ譁ｭ縺ｧ迴ｾ蝨ｨ縺ｮ繝ｬ繝吶Ν繧堤｢ｺ隱・2. 蠑ｱ轤ｹ蛻・㍽縺ｮ髮・ｸｭ邱ｴ鄙・3. 螳溯ｷｵ繧ｷ繝溘Η繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ縺ｧ蠢懃畑蜉帛髄荳・
縲宣未騾｣莠倶ｾ九・繧ｳ繝溘Η繝九ユ繧｣縺ｧ蜷梧ｧ倥・逶ｸ隲・ｺ倶ｾ九ｒ遒ｺ隱阪〒縺阪∪縺吶・
縲先ｬ｡縺ｮ繧ｹ繝・ャ繝励・窶｢ AI繧ｷ繝溘Η繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ縺ｧ縺ｮ螳溯ｷｵ邱ｴ鄙・窶｢ 繧ｹ繧ｭ繝ｫ隧穂ｾ｡縺ｧ縺ｮ螳壽悄逧・↑謌宣聞遒ｺ隱・窶｢ 繧ｳ繝溘Η繝九ユ繧｣縺ｧ縺ｮ莠倶ｾ句・譛荏
    };

    return answers[categoryId as keyof typeof answers] || '逕ｳ縺苓ｨｳ縺斐＊縺・∪縺帙ｓ縲る←蛻・↑蝗樒ｭ斐ｒ逕滓・縺ｧ縺阪∪縺帙ｓ縺ｧ縺励◆縲ゅｂ縺・ｸ蠎ｦ縺願ｩｦ縺励￥縺縺輔＞縲・;
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
            <h1 className="text-2xl font-bold text-gray-900">逶ｸ隲・ｱ･豁ｴ</h1>
            <p className="text-gray-600 mt-1">驕主悉縺ｮ逶ｸ隲・・螳ｹ縺ｨ蝗樒ｭ斐ｒ遒ｺ隱阪〒縺阪∪縺・/p>
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
                <h4 className="font-medium text-gray-900 mb-2">AI蝗樒ｭ・/h4>
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
                  <span className="text-sm text-gray-600 ml-2">隧穂ｾ｡貂医∩</span>
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
            <h1 className="text-2xl font-bold text-gray-900">AI蝗樒ｭ・/h1>
            <p className="text-gray-600 mt-1">{selectedCategory?.title}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">縺ゅ↑縺溘・逶ｸ隲・/h3>
            <p className="text-gray-700 bg-gray-50 rounded-lg p-4">{question}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-sunshine-yellow" />
              <span>AI蝗樒ｭ・/span>
            </h3>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-gray-700 whitespace-pre-line">{answer}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-medium text-success-green mb-2">髢｢騾｣繧ｷ繝溘Η繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ</h4>
              <p className="text-sm text-gray-700 mb-3">縺薙・逶ｸ隲・・螳ｹ縺ｫ髢｢騾｣縺吶ｋ邱ｴ鄙偵す繝翫Μ繧ｪ</p>
              <button className="text-success-green hover:text-emerald-green font-medium text-sm flex items-center space-x-1">
                <span>邱ｴ鄙偵ｒ髢句ｧ・/span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="font-medium text-sunshine-yellow mb-2">髢｢騾｣莠倶ｾ・/h4>
              <p className="text-sm text-gray-700 mb-3">繧ｳ繝溘Η繝九ユ繧｣縺ｮ鬘樔ｼｼ莠倶ｾ九ｒ遒ｺ隱・/p>
              <button className="text-sunshine-yellow hover:text-yellow-600 font-medium text-sm flex items-center space-x-1">
                <span>莠倶ｾ九ｒ隕九ｋ</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-2">縺薙・蝗樒ｭ斐・蠖ｹ縺ｫ遶九■縺ｾ縺励◆縺具ｼ・/p>
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
              譁ｰ縺励＞逶ｸ隲・ｒ縺吶ｋ
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
              隧ｳ邏ｰ繧ｫ繝・ざ繝ｪ・井ｻｻ諢擾ｼ・            </label>
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
              逶ｸ隲・・螳ｹ <span className="text-vivid-red">*</span>
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="蜈ｷ菴鍋噪縺ｪ迥ｶ豕√ｄ謔ｩ縺ｿ繧定ｩｳ縺励￥謨吶∴縺ｦ縺上□縺輔＞縲ゆｾ具ｼ壹後い繝九Γ繧､繝吶Φ繝医〒縺雁ｮ｢讒倥↓閾ｪ辟ｶ縺ｫ螢ｰ繧偵°縺代ｋ譁ｹ豕輔ｒ遏･繧翫◆縺・〒縺吶・
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-blue focus:border-transparent resize-none"
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">
                蜈ｷ菴鍋噪縺ｪ迥ｶ豕√ｒ謨吶∴縺ｦ縺・◆縺縺上→縲√ｈ繧企←蛻・↑蝗樒ｭ斐′縺ｧ縺阪∪縺・              </p>
              <span className="text-sm text-gray-400">{question.length}/1000</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              謌ｻ繧・            </button>
            <button
              onClick={handleSubmitQuestion}
              disabled={!question.trim() || isLoading}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-sky-blue text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>AI蝗樒ｭ皮函謌蝉ｸｭ...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>逶ｸ隲・☆繧・/span>
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
          <h1 className="text-2xl font-bold text-gray-900">逶ｸ隲・さ繝ｼ繝翫・</h1>
          <p className="text-gray-600 mt-1">蜿｣繧ｳ繝溘↓髢｢縺吶ｋ謔ｩ縺ｿ繧・桝蝠上ｒAI縺ｫ逶ｸ隲・〒縺阪∪縺・/p>
        </div>
        
        <button
          onClick={() => setShowHistory(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Clock className="w-4 h-4" />
          <span>逶ｸ隲・ｱ･豁ｴ</span>
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-sky-blue rounded-lg flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">AI縺後≠縺ｪ縺溘・逶ｸ隲・↓縺顔ｭ斐∴縺励∪縺・/h3>
            <p className="text-gray-700 text-sm">
              繧ｫ繝・ざ繝ｪ繧帝∈謚槭＠縺ｦ蜈ｷ菴鍋噪縺ｪ逶ｸ隲・・螳ｹ繧貞・蜉帙☆繧九→縲、I縺悟ｮ溯ｷｵ逧・↑繧｢繝峨ヰ繧､繧ｹ繧・              繝輔Ξ繝ｼ繧ｺ萓九・未騾｣縺吶ｋ邱ｴ鄙偵す繝翫Μ繧ｪ繧呈署譯医＠縺ｾ縺吶・            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">逶ｸ隲・き繝・ざ繝ｪ繧帝∈謚・/h2>
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
                      +{category.subcategories.length - 3}蛟・                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">繧医￥縺ゅｋ逶ｸ隲・ｾ・/h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">縲梧妙繧峨ｌ縺溷ｾ後・蟇ｾ蠢懈婿豕輔・/h4>
            <p className="text-sm text-gray-600">縺雁ｮ｢讒倥↓譁ｭ繧峨ｌ縺滓凾縺ｮ閾ｪ辟ｶ縺ｪ繝輔か繝ｭ繝ｼ繧｢繝・・譁ｹ豕・/p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">縲悟ｿ吶＠縺昴≧縺ｪ縺雁ｮ｢讒倥∈縺ｮ螢ｰ縺九￠縲・/h4>
            <p className="text-sm text-gray-600">譎る俣縺後↑縺輔◎縺・↑縺雁ｮ｢讒倥∈縺ｮ驕ｩ蛻・↑繧｢繝励Ο繝ｼ繝・/p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">縲後す繝九い螻､縺ｸ縺ｮ隱ｬ譏取婿豕輔・/h4>
            <p className="text-sm text-gray-600">蟷ｴ驟阪・縺雁ｮ｢讒倥↓繧ょ・縺九ｊ繧・☆縺・ｪｬ譏弱ユ繧ｯ繝九ャ繧ｯ</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">縲瑚・辟ｶ縺ｪ險縺・屓縺励・謠先｡医・/h4>
            <p className="text-sm text-gray-600">謚ｼ縺嶺ｻ倥￠縺後∪縺励￥縺ｪ縺・・辟ｶ縺ｪ陦ｨ迴ｾ譁ｹ豕・/p>
          </div>
        </div>
      </div>
    </div>
  );
}

