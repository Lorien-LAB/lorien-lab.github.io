# CMM路径加权动量复现公开页面设计

## 发布目标

在个人网站现有 Reproduction Workbench 中新增一篇华福证券 CMM 路径加权动量
A股复现案例，并通过现有 GitHub Pages 工作流公开发布。页面服务于招聘者和量化研究
同行：先给出可信结论，再提供足以审计结论的研究设计、长期证据和限制。

Canonical slug 固定为 `cmm-path-weighted-momentum-a-share`，公开路由为：

`/projects/reproductions/cmm-path-weighted-momentum-a-share/`

## 公开状态与边界

- `sourceType: broker`
- `broker: 华福证券`
- `publishDate: 2026-08-24`
- 分析师：李杨、熊颖瑜、何佳玮
- `stage: extension`
- `result: inconclusive`
- `codeVisibility: private`
- 不填写 `codeUrl`、`sourceUrl`、`reportHtmlPath`、`configurationUrl` 或本地路径。
- 不公开原始PDF、完整持仓、模型权重、私有源码、内部运行目录或机器信息。
- 页面明确写明：总体正式分类仍是“证据或数据不足”；定义和训练规则层面技术复现
  成功，因子层方向性复现较强，但完整组合、SM Top30、56特征、Barra正交化等原文
  主张没有形成完整证据。

网站 `result: inconclusive` 是对项目正式“证据或数据不足”分类的公共映射，不用
`successful`、`extended` 或主观分数覆盖这一结论。

## 核心内容与指标

页面按以下顺序组织：

1. Research question：CMM是否在严格时序和A股执行限制下持续优于简单动量。
2. Source mechanism：231日形成期、跳过21日、16特征到scalar theta、时间softmax、
   CMM及负Pearson相关损失。
3. A-share reproduction design：PIT股票池、半年扩展窗口重训、共同预测样本、月频
   long盘TopN与成本。
4. Factor evidence：60个月CMM RankIC、SM与Direct FFN对照、HAC/bootstrap区间、
   线性theta结果。
5. Portfolio evidence：Top20/30/50、长期与原30个月表现差异、2022/2023亏损、
   2025收益集中、成本敏感性。
6. Benchmark：中证全指000985.SH价格指数与成本后TopN净值同轴展示，明确指数
   不扣费且不可直接视作ETF。
7. Limitations：完整组合、SM Top30退出价值缺口，以及未执行的56特征、Barra、
   可交易多空和真正研报发布后前瞻期。
8. Conclusion：因子机制有研究价值，但长期long-only绩效显著弱于原30个月，
   不构成实盘承诺或投资建议。

结构化 Original vs Reproduced 指标仅使用可直接定位的原文数值，并在名称或正文中
说明窗口与执行口径不完全一致：

| 指标 | 原文 | 本地60个月 | 差异 |
|---|---:|---:|---:|
| CMM Mean RankIC | 8.50% | 8.26% | -0.24pp |
| 非年化 RankICIR | 0.69 | 0.64 | -0.05 |
| Top30 年化收益 | 23.16% | 10.99% | -12.17pp |
| Top30 Sharpe | 0.77 | 0.51 | -0.26 |
| Top30 最大回撤 | -49.97% | -47.09% | +2.88pp |

正文同时披露：Top30累计收益68.42%、年化波动28.65%、月胜率61.67%；单边全包
0/10/20/30bp下年化收益13.87%/12.02%/10.14%/8.30%；中证全指同期价格指数
累计收益13.12%。这些本地结果不能冒充原文同口径复刻。

## 图表与公共资产

复用已验证的长期净值图，复制到：

`public/reproductions/cmm-path-weighted-momentum-a-share/long-horizon-nav.png`

图中包含成本后CMM Top20/30/50及中证全指价格指数，所有曲线从1开始、共享同一
纵轴。页面使用带 `alt`、标题和紧邻解释文字的静态 `<figure>`，不增加新的前端运行
时或交互依赖。图片只用于说明已公开聚合结果，不复制内部CSV。

## 实现与测试

新增一份 broker reproduction Markdown，不修改通用页面组件或schema。新增一个聚焦
测试文件，要求：

- 内容记录通过schema和Astro构建；
- 复现目录出现新卡片和canonical链接；
- 详情页包含公开结论、五项对照指标、长期净值图和基准说明；
- `result` 为 `inconclusive`、`codeVisibility` 为 `private`，页面显示
  `Implementation Private` 且无伪造代码按钮；
- 不包含Windows路径、原始PDF路径、未公开代码URL、持仓清单或“完全复现成功”等
  越界表述；
- 现有 OMD 和股指期货研报页面保持不变。

完成后运行 `npm test`、`npm run check`、`npm run build`，再用真实浏览器验收复现
目录、CMM详情页、窄屏布局、图片加载和控制台错误。

## 发布

在独立 `codex/cmm-reproduction-page` 工作树提交精确网站改动，然后以fast-forward
方式推送到远端 `main`，触发现有 GitHub Pages workflow。发布后核对workflow通过、
线上目录出现CMM卡片、canonical详情页返回200且页面内容/图片实际可见。保留主网站
工作区现有未跟踪文档，不合并、不删除也不提交它们。
