/** @type {Record<string, string>} */
export const domainLabelsZh = {
  'Quantitative Finance': '量化金融',
  'Mathematics & Statistics': '数学与统计',
  'Machine Learning': '机器学习',
  'AI & Research Agents': 'AI 与研究 Agent',
  'Research Infrastructure': '研究基础设施',
  Finance: '金融基础',
  'Interview Strategy & Communication': '面试策略与沟通',
};

/** @type {Record<string, {en: string, zh: string}>} */
export const typeLabels = {
  concept: { en: 'Concept', zh: '概念' },
  paper: { en: 'Paper', zh: '论文' },
  tool: { en: 'Tool', zh: '工具' },
  topic: { en: 'Research Topic', zh: '研究主题' },
};

/** @type {Record<string, string>} */
export const statusLabelsZh = { seed: '起步', growing: '完善中', mature: '成熟' };

/** @type {Record<string, string>} */
export const categoryLabelsZh = {
  'Problem Solving Techniques': '解题方法', Probability: '概率论', Statistics: '统计学',
  Calculus: '微积分', 'Linear Algebra': '线性代数', 'Discrete Mathematics': '离散数学',
  'Derivatives & Pricing': '衍生品与定价', 'Asset Pricing': '资产定价',
  'Model Validation': '模型验证', 'Automated Factor Discovery': '自动化因子发现',
  'Quant Platforms': '量化平台', 'Factor Investing': '因子投资',
  'Research Community': '研究社区', Backtesting: '回测', 'Industry Research': '行业研究',
  'Learning Resources': '学习资源', 'Financial ML': '金融机器学习',
  'Model Interpretability': '模型可解释性',
};

/** @type {Record<string, {title: string, description: string}>} */
export const featuredKnowledgeZh = {
  'fama-macbeth-regression': { title: 'Fama–MacBeth 回归', description: '先在时间序列上估计风险暴露，再在截面上检验这些暴露是否被定价的两阶段资产定价方法。' },
  'walk-forward-validation': { title: '滚动前推验证', description: '按时间顺序反复使用历史数据训练，并在后续未见数据上评估的验证框架。' },
  'automated-factor-discovery': { title: '自动化因子发现', description: '通过可复现的搜索闭环生成、评估、去重并筛选候选 Alpha 因子。' },
};
