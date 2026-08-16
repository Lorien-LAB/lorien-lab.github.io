export interface PublicContentZhEntry {
  title: string;
  description: string;
  category?: string;
  status?: string;
}

export const publicContentZh: Record<'research' | 'projects' | 'notes', Record<string, PublicContentZhEntry>> = {
  research: {
    'automated-alpha-discovery': {
      title: '自动化 Alpha 发现',
      description: '一个有界研究闭环：结合大语言模型与算法搜索提出、评估、筛选并演化量化因子。',
      category: 'Alpha 研究',
      status: '持续研究',
    },
    'futures-term-structure': {
      title: '期货期限结构与价差研究',
      description: '研究主力与次主力期货合约、期限结构、移仓动态以及价差状态建模。',
      category: '期货研究',
      status: '持续研究',
    },
    'high-frequency-daily-alpha': {
      title: '高频数据 → 日频 Alpha',
      description: '将一分钟行情与订单簿行为压缩为具有可解释微观结构逻辑的稳健日频因子。',
      category: '市场微观结构',
      status: '研究方向',
    },
  },
  projects: {
    'quant-research-harness': {
      title: '量化研究 Harness',
      description: '面向数据处理、因子实验、回测、诊断与 Agent 协作工作流的模块化研究工作台。',
      status: '开发中',
    },
    'llm-factor-discovery': {
      title: '基于 LLM 的因子发现引擎',
      description: '以 Loop Engineering 组织因子生成，将语言模型假设、确定性验证与多种搜索后端组合为统一研究闭环。',
      status: '原型阶段',
    },
    'cta-research-framework': {
      title: 'CTA 研究框架',
      description: '覆盖趋势、反转、波动率缩放、事件过滤与稳健验证的系统化期货策略研究框架。',
      status: '研究框架',
    },
    'systematic-futures-calendar-spread-internship': {
      title: '系统化期货跨期价差研究 — 实习案例',
      description: '经脱敏处理的系统化期货跨期价差研究案例，重点展示时间一致性、合约状态质量、成本约束下的稳健验证与研究工程方法。',
      status: '实习研究',
    },
  },
  notes: {
    'research-system-design': {
      title: '为什么研究工作台、Agent 与搜索算法应该彼此分离',
      description: '关于如何让量化研究基础设施保持模块化、可审计，并同时适合人类与 Agent 协作的系统设计笔记。',
      category: '研究工程',
    },
  },
};
