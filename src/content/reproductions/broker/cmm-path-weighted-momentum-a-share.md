---
slug: cmm-path-weighted-momentum-a-share
title: "CMM 路径加权动量：A 股复现与长期稳健性"
description: "华福证券 CMM 路径加权动量的 16 特征 A 股复现：区分已验证的因子证据、局部 TopN 历史回放与受阻的完整组合。"
researchArea: "Equity Factor Research"
stage: extension
result: inconclusive
resultSummary: "总体正式分类为证据或数据不足：定义与训练规则可以复现，因子方向有支持，但完整组合和原文的多项扩展主张仍缺证据。"
codeVisibility: private
sourceType: broker
broker: "华福证券"
analysts:
  - "李杨"
  - "熊颖瑜"
  - "何佳玮"
publishDate: 2026-08-24
date: 2026-10-24
updated: 2026-10-24
tags:
  - Broker Research
  - CMM
  - Path-Weighted Momentum
  - A-share
  - Point-in-Time
  - Historical Backtest
featured: false
assetClass: "China A-share Equities"
market: "China A-share"
frequency: "Monthly signals · daily inputs"
dataAvailability: "Partial · frozen research inputs and 60-month factor results available; complete portfolio exit values unresolved"
metrics:
  - name: "CMM Mean RankIC · different windows"
    original: "8.50%"
    reproduced: "8.26%"
    difference: "-0.24pp"
  - name: "RankICIR · non-annualized"
    original: "0.69"
    reproduced: "0.64"
    difference: "-0.05"
  - name: "Top30 annual return · different windows"
    original: "23.16%"
    reproduced: "10.99%"
    difference: "-12.17pp"
  - name: "Top30 Sharpe · different windows"
    original: "0.77"
    reproduced: "0.51"
    difference: "-0.26"
  - name: "Top30 maximum drawdown · different windows"
    original: "-49.97%"
    reproduced: "-47.09%"
    difference: "+2.88pp"
---

## 研究问题

华福证券的 CMM 方法对过去收益路径赋予不同权重，而非把形成期的每一天等权处理。这里检验一个更窄的问题：在固定的 A 股时点股票池、半年扩展窗口重训和月频执行代理下，CMM 能否持续优于简单动量（SM），且这种增量能否进入成本后的研究多头组合。

**总体正式分类仍是“证据或数据不足”。** 模型定义与训练时序的技术复现已通过，60 个月的因子排序结果相对 SM 有正向证据；但完整组合运行未通过退出价值门禁，局部 TopN 交付也不能替代原研报的完整组合、可交易多空或发布后前瞻业绩。

## 原研报机制

原研报使用 231 个交易日的收益形成期，跳过最近 21 个交易日。16 个量价与风险特征先映射为每只股票的标量 $\theta$，再由 $\theta$ 与形成期日收益共同决定时间维度的 softmax 权重；CMM 是这些权重下的日收益加权均值。训练目标为月度横截面负 Pearson 相关。当 $\theta=0$ 时，权重退化为等权，CMM 回到简单动量。

原文在 2020 年 1 月至 2026 年 7 月附近的全期表中给出 CMM Mean RankIC **8.50%**、非年化 ICIR **0.69**；其 Top30 表给出年化收益 **23.16%**、Sharpe **0.77**、最大回撤 **-49.97%**。原文还研究了 56 特征、Barra 正交化、G10/LS 和组合回撤等主张。下文的本地结果来自不同时间窗与执行口径，不能把数值接近当作同口径复刻。

## A 股复现设计

本地研究只使用信号日当时可识别的 A 股状态和已成熟标签。股票池排除北交所，要求上市历史与成交额门槛；完整 231 日形成向量加 21 日跳过期使可预测股票还需至少 252 个交易日历史。16 特征和 SM/CMM/直接 FFN 在同一预测股票池上评估，避免用未来可得标签反向筛选当月候选。

主实验在每年 1 月和 7 月用已成熟标签重训，随后冻结模型预测该半年的月份。月末形成信号；本地可交易标签与研究多头使用次月首个交易日收盘附近的执行代理。它与原研报的月末至下月末标签并不相同。TopN 的“paper”费用为买入 13bp、卖出 18bp；这是历史研究回放，不是券商实际成交记录。

## 因子证据：优于 SM，不足以证明优于直接 FFN

2021 年 7 月至 2026 年 6 月的 **60 个严格滚动预测月**中，主 CMM FFN 的月均 RankIC 为 **8.26%**，非年化 RankICIR 为 **0.64**（年化口径为 2.22）。相同预测股票池上的 SM 为 **-2.31%**，直接用 16 特征预测收益的 FFN 为 **7.13%**。CMM 与 SM 的配对月均 RankIC 差为 **10.56 个百分点**；HAC 95% 区间约为 **[7.15, 13.98] 个百分点**，移动块 bootstrap 区间约为 **[6.37, 14.03] 个百分点**。

CMM 相对直接 FFN 的月均差只有 **1.13 个百分点**，HAC 区间约为 **[-0.78, 3.04] 个百分点**，跨越零；线性 $\theta$ 的 Mean RankIC **8.98%** 也高于主 FFN 的 **8.26%**。因此，证据支持路径加权相对简单动量的因子层增量，却不能证明复杂网络本身带来稳定的额外收益。上述 60 个月包含原先 2024—2026 年的重叠区间，不是第二次独立样本外检验。

## 组合证据：局部 TopN 通过，完整组合受阻

完整父组合在持有证券退出收益无法由权威数据解析时停止，**没有通过完整组合门禁**。在独立标注为 `partial_topn` 的局部交付中，Top20/30/50 与五种预设费用身份共 **15 个研究组合身份**通过。下述 Top30 只引用这项局部、成本后、月频历史回放；它不代表完整父组合已修复。

“paper”费用下，CMM Top30 的 60 个月累计收益为 **68.42%**、年化收益 **10.99%**、Sharpe **0.51**、最大回撤 **-47.09%**、年化波动 **28.65%**、月胜率 **61.67%**。2022 和 2023 年的 Top30 累计收益分别为 **-15.12%** 与 **-11.88%**，2025 年则为 **+65.44%**；长期收益明显集中于后期。2026 上半年 Mean RankIC 降至约 **1.9%**，尚不足以判断这是持续衰减还是短期波动。

单边全包摩擦为 0/10/20/30bp 的独立情景下，Top30 年化收益依次为 **13.87% / 12.02% / 10.14% / 8.30%**。“paper”买卖费率不对称，不能把它等同于其中任一对称情景。SM Top30 因另一项持有收益缺口未形成完整 60 个月序列，因此这里**不计算 CMM 减 SM 的组合净收益差**。

### 原文与本地数值并列

| 指标 | 原研报 | 本地 60 个月 | 算术差；非同口径检验 |
|---|---:|---:|---:|
| CMM Mean RankIC | 8.50% | 8.26% | -0.24 个百分点 |
| 非年化 RankICIR | 0.69 | 0.64 | -0.05 |
| Top30 年化收益 | 23.16% | 10.99% | -12.17 个百分点 |
| Top30 Sharpe | 0.77 | 0.51 | -0.26 |
| Top30 最大回撤 | -49.97% | -47.09% | +2.88 个百分点 |

原研报主要表覆盖约 2020 年 1 月至 2026 年 7 月，本地长期回放覆盖 2021 年 7 月至 2026 年 6 月；股票池、标签起止和执行费用也存在差异。表中差值仅帮助读者看清量级，**不是原文主张的精确误差或显著性检验**。局部 Top30 的 10.99% 年化收益明显低于原文 23.16%，不能用因子层相近的 RankIC 掩盖这一组合层差距。

## 基准与长期净值

<figure style="margin:1.5rem 0">
  <img src="/reproductions/cmm-path-weighted-momentum-a-share/long-horizon-nav.png" alt="CMM Top20、Top30、Top50 成本后月度净值与中证全指 000985.SH 不扣费价格指数，从 2021 年 7 月至 2026 年 6 月共用同一纵轴比较" title="CMM 长期研究多头与中证全指价格指数" width="1890" height="1044" loading="lazy" style="display:block;width:100%;height:auto" />
  <figcaption>三条 CMM 曲线计入 paper 买入 13bp、卖出 18bp 费用；灰色点线是 000985.SH 中证全指价格指数，不扣交易费用。所有曲线从净值 1 起步，采用相同月度边界和单一纵轴。<a href="/reproductions/cmm-path-weighted-momentum-a-share/long-horizon-nav.png" target="_blank" rel="noopener">查看原尺寸图表</a>。</figcaption>
</figure>

同期中证全指价格指数累计上涨 **13.12%**。它只提供宽基价格走势参照，不包含基金跟踪误差、交易费用或可执行的逐股持仓，**不能当成 ETF 或可交易组合的净收益**。图中未画 SM Top30，原因是其完整长期退出收益缺失，而不是选择性隐去一条表现较弱的曲线。

## 限制与未完成主张

- **完整组合尚无有效结论。** 父运行的持有证券退出价值未解析；局部 TopN 通过不等于完整组合、容量或成交归因通过，也不能填造缺失价格以补齐净值。
- **原文的大量实验没有形成本地证据。** SM Top30 的完整 60 个月成本后对照、56 特征、Barra 正交化、原文 G10/LS 可交易实现及完整组合回撤均未完成；A 股个股多空也不能直接宣称可交易。
- **样本与时点并非同源。** 本地纳入的板块、标签区间、半年重训解释、月度执行代理和费用与原文并不完全一致；原 30 个月与长期运行中的重叠 30 个月不能算作两次独立验证。
- **没有发布后真实前瞻记录。** 数据止于 2026 年 6 月，早于研报 2026 年 8 月 24 日发布。历史滚动样本外、成本代理和价格指数比较均不是实盘业绩或投资建议。

## 结论

CMM 的路径加权定义、16 特征到标量 $\theta$ 的训练规则与严格时序实现具备可审计的技术基础。60 个月因子层相对 SM 的配对增量为正，但相对直接 FFN 的增量未得到稳定区间支持；成本后长期 Top30 收益与原研报较短、不同口径的结果差距很大，且经历 2022—2023 年亏损与 2025 年收益集中。

在完整组合和关键原文主张仍受阻的条件下，项目的正式结果为**证据或数据不足**。这是一份限定范围的研究记录，不是“完整复现成功”、可部署策略或未来收益承诺。
