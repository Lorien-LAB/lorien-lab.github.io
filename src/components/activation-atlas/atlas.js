/* Activation Atlas, adapted from the supplied standalone interactive atlas. */
const atlas = document.querySelector("[data-activation-atlas]");
const root = atlas.shadowRoot;
const COLORS = {
  classic: "#93bedc",
  sigmoid: "#b39efa",
  rectifier: "#f3be7d",
  exponential: "#f28e9b",
  smooth: "#65e6c2",
  periodic: "#80c9ec",
  adaptive: "#e2b8fb",
  gated: "#b0eb94",
  vector: "#facb74",
  complex: "#8be0d6",
  spiking: "#e89c9c",
};
const CATEGORIES = [
  {
    id: "all",
    name: "所有类别",
    icon: "∑",
    desc: "所有激活函数、结构和计算算子",
  },
  {
    id: "classic",
    name: "经典与阈值",
    icon: "⌑",
    desc: "线性、二值、阈值、多项式",
  },
  {
    id: "sigmoid",
    name: "S 型与饱和",
    icon: "∿",
    desc: "Sigmoid、Tanh 与平滑饱和",
  },
  {
    id: "rectifier",
    name: "ReLU / 整流",
    icon: "⌁",
    desc: "分段线性与整流非线性",
  },
  {
    id: "exponential",
    name: "指数与正值",
    icon: "ℯ",
    desc: "ELU、Softplus、指数型",
  },
  { id: "smooth", name: "平滑自门控", icon: "◌", desc: "GELU、SiLU、Mish 等" },
  {
    id: "periodic",
    name: "周期 / 径向基",
    icon: "〰",
    desc: "Sine、Snake、RBF、小波",
  },
  {
    id: "adaptive",
    name: "可学习与自适应",
    icon: "⟡",
    desc: "参数化、样条与 KAN",
  },
  { id: "gated", name: "门控网络结构", icon: "⊗", desc: "GLU、GEGLU、SwiGLU" },
  {
    id: "vector",
    name: "向量与概率",
    icon: "▥",
    desc: "Softmax、Sparsemax、Entmax",
  },
  {
    id: "complex",
    name: "复值激活",
    icon: "◉",
    desc: "实部、虚部、模长与相位",
  },
  {
    id: "spiking",
    name: "脉冲与量化",
    icon: "⌇",
    desc: "阶跃、替代梯度与 STE",
  },
];
const sigmoid = (x) =>
  x >= 0 ? 1 / (1 + Math.exp(-x)) : Math.exp(x) / (1 + Math.exp(x));
const softplus = (x) =>
  x > 35 ? x : x < -35 ? Math.exp(x) : Math.log1p(Math.exp(x));
function erf(x) {
  let s = x < 0 ? -1 : 1;
  let a = Math.abs(x),
    t = 1 / (1 + 0.3275911 * a);
  let y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-a * a);
  return s * y;
}
const gelu = (x) => 0.5 * x * (1 + erf(x / Math.SQRT2));
const silu = (x) => x * sigmoid(x);
const relu = (x) => Math.max(0, x);
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const sg = (x) => (x > 0 ? 1 : x < 0 ? -1 : 0);
const fm = (x, k = 3) =>
  Number.isFinite(x) ? Number(x.toFixed(k)).toString() : String(x);
const P = (label, min, max, step, value, key) => ({
  label,
  min,
  max,
  step,
  value,
  key,
});
const CATALOG = [];
function add(cat, id, name, formula, desc, fn = null, o = {}) {
  CATALOG.push({
    cat,
    id,
    name,
    formula,
    desc,
    fn,
    kind: fn ? "scalar" : o.kind || "structure",
    year: o.year || "",
    tags: o.tags || [],
    props: o.props || [],
    usage: o.usage || "",
    params: o.params || [],
    code: o.code || "",
    lab: o.lab || null,
    note: o.note || "",
    order: CATALOG.length,
  });
}
// 1. Classical and early neuron responses.
add(
  "classic",
  "identity",
  "Identity / Linear",
  "f(x) = x",
  "恒等映射，不引入非线性；常用于无界实值回归的输出层。",
  (x) => x,
  {
    year: "—",
    props: ["单调", "平滑", "无界"],
    usage: "回归输出",
    code: "nn.Identity()",
  },
);
add(
  "classic",
  "step",
  "Binary Step",
  "f(x) = 1[x ≥ 0]",
  "二值阈值神经元。不可用普通反向传播直接训练。",
  (x) => (x >= 0 ? 1 : 0),
  {
    year: "1943",
    props: ["不连续", "输出 {0,1}"],
    usage: "历史感知机、阈值电路",
    note: "跳跃点处没有经典导数；实验台的数值差分仅用于示意。",
  },
);
add(
  "classic",
  "sign",
  "Sign / Bipolar Step",
  "f(x) = sign(x)",
  "将实值映射为 −1、0、1。二值网络中常结合 STE。",
  sg,
  { year: "1950s", props: ["不连续", "有界"], usage: "二值网络" },
);
add(
  "classic",
  "linear-slope",
  "Scaled Linear",
  "f(x) = a x",
  "线性的可调尺度形式，单独使用不产生非线性。",
  (x, p) => p.a * x,
  {
    params: [P("斜率 a", -2, 3, 0.1, 1.4, "a")],
    props: ["平滑", "无界"],
    usage: "对照基线",
  },
);
add(
  "classic",
  "abs",
  "Absolute Value",
  "f(x) = |x|",
  "在原点形成尖点，保留输入幅度而丢失符号。",
  (x) => Math.abs(x),
  { props: ["非负", "原点不可导"], usage: "距离与特征变换" },
);
add(
  "classic",
  "quadratic",
  "Quadratic",
  "f(x) = x²",
  "二次响应；会放大大幅输入，训练时需要尺度控制。",
  (x) => x * x,
  { props: ["平滑", "非负"], usage: "多项式特征" },
);
add(
  "classic",
  "cubic",
  "Cubic",
  "f(x) = x³",
  "奇函数，保留符号并强化较大幅度变化。",
  (x) => x * x * x,
  { props: ["平滑", "单调"], usage: "多项式特征" },
);
add(
  "classic",
  "bent-identity",
  "Bent Identity",
  "f(x) = x + (√(x²+1) − 1)/2",
  "近似恒等但带有轻微平滑非线性。",
  (x) => x + 0.5 * (Math.sqrt(x * x + 1) - 1),
  { props: ["平滑", "无界"], usage: "平滑恒等替代" },
);
add(
  "classic",
  "saturating-linear",
  "Saturating Linear",
  "f(x) = clip(x, 0, 1)",
  "分段线性且有界，过大的正输入进入饱和区。",
  (x) => clamp(x, 0, 1),
  { props: ["有界", "分段线性"], usage: "历史神经元模型" },
);
// 2. Sigmoidal/saturating.
add(
  "sigmoid",
  "sigmoid",
  "Sigmoid / Logistic",
  "f(x) = 1 / (1 + e⁻ˣ)",
  "经典 S 型激活；导数最大仅为 1/4，易在两端饱和。",
  sigmoid,
  {
    year: "1980s",
    props: ["平滑", "单调", "(0,1)"],
    usage: "二分类输出、LSTM/GRU 门控",
    code: "nn.Sigmoid()",
  },
);
add(
  "sigmoid",
  "tanh",
  "Tanh",
  "f(x) = tanh(x)",
  "零中心 S 型函数，导数在原点为 1，但大幅输入时仍饱和。",
  Math.tanh,
  {
    year: "1980s",
    props: ["平滑", "零中心", "有界"],
    usage: "RNN 状态、输出约束",
    code: "nn.Tanh()",
  },
);
add(
  "sigmoid",
  "bipolar-sigmoid",
  "Bipolar Sigmoid",
  "f(x) = 2σ(a x) − 1",
  "Sigmoid 的双极形式，可调整过渡区的锐度。",
  (x, p) => 2 * sigmoid(p.a * x) - 1,
  {
    params: [P("陡峭度 a", 0.2, 4, 0.1, 1, "a")],
    props: ["平滑", "有界"],
    usage: "早期前馈网络",
  },
);
add(
  "sigmoid",
  "arctan",
  "Arctan",
  "f(x) = arctan(x)",
  "平滑单调函数，以较缓慢的速度接近上下界。",
  Math.atan,
  { props: ["平滑", "有界", "单调"], usage: "替代 S 型函数" },
);
add(
  "sigmoid",
  "softsign",
  "Softsign",
  "f(x) = x / (1 + |x|)",
  "与 Tanh 形态相近，尾部呈有理函数衰减。",
  (x) => x / (1 + Math.abs(x)),
  {
    props: ["连续可导", "有界"],
    usage: "RNN 和平滑隐层",
    code: "nn.Softsign()",
  },
);
add(
  "sigmoid",
  "erf",
  "Erf",
  "f(x) = erf(x)",
  "高斯误差函数构造的奇对称 S 型响应。",
  erf,
  { props: ["平滑", "有界"], usage: "概率与平滑激活" },
);
add(
  "sigmoid",
  "gompertz",
  "Gompertz",
  "f(x) = exp(−exp(−x))",
  "不对称的 S 型函数，GoLU 使用它作为门控。",
  (x) => Math.exp(-Math.exp(-x)),
  { props: ["平滑", "不对称", "有界"], usage: "非对称门控" },
);
add(
  "sigmoid",
  "hard-sigmoid",
  "Hard Sigmoid",
  "f(x) = clip(x/6 + 1/2, 0, 1)",
  "Sigmoid 的分段线性近似，有利于部分轻量设备。",
  (x) => clamp(x / 6 + 0.5, 0, 1),
  {
    props: ["分段线性", "有界"],
    usage: "移动端门控",
    code: "nn.Hardsigmoid()",
  },
);
add(
  "sigmoid",
  "hard-tanh",
  "Hardtanh",
  "f(x) = clip(x, −1, 1)",
  "Tanh 的分段线性限幅近似。",
  (x) => clamp(x, -1, 1),
  { props: ["有界", "分段线性"], usage: "限幅与量化", code: "nn.Hardtanh()" },
);
add(
  "sigmoid",
  "tanhshrink",
  "Tanhshrink",
  "f(x) = x − tanh(x)",
  "保留大幅输入的近线性部分，抑制接近零的响应。",
  (x) => x - Math.tanh(x),
  { props: ["平滑", "奇函数"], usage: "特征收缩", code: "nn.Tanhshrink()" },
);
add(
  "sigmoid",
  "logsigmoid",
  "LogSigmoid",
  "f(x) = log(σ(x))",
  "稳定对数似然计算中常见的函数形式。",
  (x) => -softplus(-x),
  { props: ["平滑", "输出非正"], usage: "对数概率", code: "nn.LogSigmoid()" },
);
// 3. Rectified functions.
add(
  "rectifier",
  "relu",
  "ReLU",
  "f(x) = max(0, x)",
  "正半轴梯度恒为 1；负区为 0，存在死神经元风险。",
  relu,
  {
    year: "2010",
    props: ["正半轴不饱和", "原点不可导"],
    usage: "CNN、MLP",
    code: "nn.ReLU()",
  },
);
add(
  "rectifier",
  "leaky-relu",
  "Leaky ReLU",
  "f(x) = max(x, a x)",
  "负输入保留小斜率，改善完全零梯度的问题。",
  (x, p) => Math.max(x, p.a * x),
  {
    year: "2013",
    params: [P("负半轴斜率 a", 0.01, 0.5, 0.01, 0.05, "a")],
    props: ["分段线性", "无界"],
    usage: "CNN、MLP",
    code: "nn.LeakyReLU(negative_slope=0.05)",
  },
);
add(
  "rectifier",
  "prelu",
  "PReLU",
  "f(x) = x (x≥0), a x (x<0)",
  "与 Leaky ReLU 类似，但 a 是训练中可学习参数。",
  (x, p) => (x >= 0 ? x : p.a * x),
  {
    year: "2015",
    params: [P("可学习斜率 a", -0.5, 1, 0.05, 0.25, "a")],
    props: ["参数可学习", "分段线性"],
    usage: "深层整流网络",
    code: "nn.PReLU()",
  },
);
add(
  "rectifier",
  "rrelu",
  "RReLU",
  "f(x) = x (x≥0), a x (x<0)",
  "训练时随机抽取负区斜率；此图使用固定示例均值。",
  (x, p) => (x >= 0 ? x : p.a * x),
  {
    year: "2015",
    params: [P("示例斜率 a", 0.05, 0.33, 0.01, 0.2, "a")],
    props: ["训练时随机化"],
    usage: "正则化",
    code: "nn.RReLU()",
  },
);
add(
  "rectifier",
  "relu6",
  "ReLU6",
  "f(x) = min(max(0,x), 6)",
  "上界为 6 的整流函数，早期移动网络常用。",
  (x) => clamp(x, 0, 6),
  { props: ["分段线性", "有界"], usage: "MobileNet、量化", code: "nn.ReLU6()" },
);
add(
  "rectifier",
  "clipped-relu",
  "Clipped ReLU",
  "f(x) = clip(x, 0, c)",
  "将 ReLU 正区截断在可调的上界。",
  (x, p) => clamp(x, 0, p.c),
  {
    params: [P("上限 c", 1, 8, 0.25, 3, "c")],
    props: ["分段线性", "有界"],
    usage: "限幅激活",
  },
);
add(
  "rectifier",
  "threshold-relu",
  "Thresholded ReLU",
  "f(x) = x · 1[x > θ]",
  "阈值可调，通常在阈值处不连续。",
  (x, p) => (x > p.theta ? x : 0),
  {
    params: [P("阈值 θ", 0, 3, 0.1, 1, "theta")],
    props: ["阈值激活"],
    usage: "稀疏响应",
    code: "nn.Threshold(threshold=1.0, value=0)",
  },
);
add(
  "rectifier",
  "squared-relu",
  "Squared ReLU",
  "f(x) = max(0,x)²",
  "二次整流：正区放大大输入，但导数也随输入增长。",
  (x) => relu(x) ** 2,
  { year: "2021", props: ["非负", "正区二次"], usage: "Primer 等架构变体" },
);
add(
  "rectifier",
  "repu",
  "RePU",
  "f(x) = max(0,x)ᵖ",
  "整流幂函数，p 为正整数时具备分段多项式性质。",
  (x, p) => relu(x) ** p.p,
  {
    params: [P("整数次数 p", 2, 4, 1, 3, "p")],
    props: ["高阶非线性", "非负"],
    usage: "高阶近似与 PINN 研究",
  },
);
add(
  "rectifier",
  "starrelu",
  "StarReLU",
  "f(x) = s·max(0,x)² + b",
  "为 Squared ReLU 添加可学习尺度和偏置。",
  (x, p) => p.s * relu(x) ** 2 + p.b,
  {
    year: "2022",
    params: [
      P("缩放 s", 0.1, 1.5, 0.05, 0.7, "s"),
      P("偏置 b", -1, 1, 0.1, -0.1, "b"),
    ],
    props: ["可学习", "分段二次"],
    usage: "MetaFormer 系列研究",
  },
);
add(
  "rectifier",
  "srelu",
  "SReLU",
  "f(x) = { tₗ+aₗ(x−tₗ), x<tₗ; x, tₗ≤x≤tᵣ; tᵣ+aᵣ(x−tᵣ), x>tᵣ }",
  "分段线性且阈值、斜率均可学习；图示固定阈值。",
  (x, p) =>
    x < -1 ? -1 + p.left * (x + 1) : x > 1 ? 1 + p.right * (x - 1) : x,
  {
    year: "2015",
    params: [
      P("左斜率 aₗ", -1, 1, 0.1, 0.2, "left"),
      P("右斜率 aᵣ", 0, 3, 0.1, 1.4, "right"),
    ],
    props: ["可学习折点", "分段线性"],
    usage: "灵活响应形状",
  },
);
add(
  "rectifier",
  "apl",
  "APL (illustrative)",
  "f(x) = ReLU(x) + Σ aₖ·ReLU(−x+bₖ)",
  "自适应分段线性单元；图示采用两组固定折点权重。",
  (x) => relu(x) + 0.45 * relu(-x + 1.2) - 0.25 * relu(-x - 1.2),
  {
    year: "2014",
    props: ["多折点", "可学习家族"],
    usage: "分段线性逼近",
    note: "图中权重与折点仅为演示配置，不代表已训练模型。",
  },
);
add(
  "rectifier",
  "maxout",
  "Maxout (illustrative)",
  "f(x) = maxₖ(wₖx+bₖ)",
  "多个可学习仿射函数的最大值；图示使用三条仿射分支。",
  (x) => Math.max(0.7 * x + 0.2, -0.35 * x + 0.65, 1.3 * x - 1.8),
  {
    year: "2013",
    props: ["分段线性", "凸函数"],
    usage: "可学习分段线性层",
    note: "Maxout 原本是包含多组权重的层，这里只可视化一维切片。",
  },
);
add(
  "rectifier",
  "softshrink",
  "Softshrink",
  "f(x) = sign(x)·max(|x|−λ,0)",
  "连续软阈值，在零附近生成精确零响应。",
  (x, p) => sg(x) * relu(Math.abs(x) - p.l),
  {
    params: [P("阈值 λ", 0.1, 3, 0.1, 1, "l")],
    props: ["稀疏", "连续"],
    usage: "稀疏表示、去噪",
    code: "nn.Softshrink(lambd=1.0)",
  },
);
add(
  "rectifier",
  "hardshrink",
  "Hardshrink",
  "f(x) = x · 1[|x| > λ]",
  "小幅输入直接归零；在阈值处不连续。",
  (x, p) => (Math.abs(x) > p.l ? x : 0),
  {
    params: [P("阈值 λ", 0.1, 3, 0.1, 1, "l")],
    props: ["稀疏", "不连续"],
    usage: "阈值压缩",
    code: "nn.Hardshrink(lambd=1.0)",
  },
);
add(
  "rectifier",
  "flexrelu",
  "Flexible ReLU",
  "f(x) = max(0,x) + b",
  "可学习偏置改变输出基准，不同于阈值平移。",
  (x, p) => relu(x) + p.b,
  {
    params: [P("偏置 b", -2, 2, 0.1, 0.4, "b")],
    props: ["可学习偏置", "分段线性"],
    usage: "研究型整流变体",
  },
);
add(
  "rectifier",
  "crelu",
  "CReLU",
  "CReLU(x) = [ReLU(x), ReLU(−x)]",
  "双通道拼接结构，分别保留正、负方向的整流响应。",
  null,
  {
    year: "2016",
    kind: "structure",
    lab: "gating",
    props: ["维度扩展", "非标量"],
    usage: "卷积网络特征拼接",
  },
);
// 4. Exponential and positive activation.
add(
  "exponential",
  "softplus",
  "Softplus",
  "f(x) = log(1+eˣ)",
  "平滑 ReLU 近似；严格为正，适合非负参数输出。",
  softplus,
  {
    year: "2000s",
    props: ["平滑", "严格正", "单调"],
    usage: "方差、标准差输出",
    code: "nn.Softplus()",
  },
);
add(
  "exponential",
  "elu",
  "ELU",
  "f(x) = x (x>0), a(eˣ−1) (x≤0)",
  "负区指数饱和，允许小幅负响应。",
  (x, p) => (x > 0 ? x : p.a * Math.expm1(x)),
  {
    year: "2015",
    params: [P("形状参数 a", 0.2, 2, 0.1, 1, "a")],
    props: ["负区饱和", "正区线性"],
    usage: "前馈与卷积网络",
    code: "nn.ELU(alpha=1.0)",
  },
);
add(
  "exponential",
  "celu",
  "CELU",
  "f(x) = x (x>0), a(eˣᐟᵃ−1) (x≤0)",
  "对 ELU 进行连续可微的参数化。",
  (x, p) => (x > 0 ? x : p.a * Math.expm1(x / p.a)),
  {
    year: "2017",
    params: [P("参数 a", 0.2, 2, 0.1, 1, "a")],
    props: ["一阶连续", "正区线性"],
    usage: "平滑 ELU 替代",
    code: "nn.CELU(alpha=1.0)",
  },
);
add(
  "exponential",
  "selu",
  "SELU",
  "f(x) = λ·ELUₐ(x)",
  "特定 α、λ 与初始化条件共同构成自归一化机制。",
  (x) => 1.050700987 * (x > 0 ? x : 1.673263242 * Math.expm1(x)),
  {
    year: "2017",
    props: ["自归一化条件", "负区饱和"],
    usage: "Self-Normalizing Networks",
    code: "nn.SELU()",
  },
);
add(
  "exponential",
  "exp",
  "Exponential",
  "f(x) = eˣ",
  "始终正值，但大输入时可能数值爆炸。",
  (x) => Math.exp(x),
  { props: ["严格正", "单调"], usage: "正值变换（注意溢出）" },
);
add(
  "exponential",
  "isru",
  "ISRU",
  "f(x) = x / √(1+a x²)",
  "快速平滑饱和函数，类似 Tanh 的有界响应。",
  (x, p) => x / Math.sqrt(1 + p.a * x * x),
  {
    year: "2017",
    params: [P("曲率 a", 0.2, 3, 0.1, 1, "a")],
    props: ["有界", "平滑"],
    usage: "循环网络等",
  },
);
add(
  "exponential",
  "isrlu",
  "ISRLU",
  "f(x) = x (x≥0), x/√(1+a x²) (x<0)",
  "正区线性，负区采用 ISRU 型饱和。",
  (x, p) => (x >= 0 ? x : x / Math.sqrt(1 + p.a * x * x)),
  {
    params: [P("曲率 a", 0.2, 3, 0.1, 1, "a")],
    props: ["正区线性", "负区饱和"],
    usage: "ELU 近似替代",
  },
);
add(
  "exponential",
  "pelu",
  "PELU (representative)",
  "f(x) = a·x/b (x≥0), a(eˣᐟᵇ−1) (x<0)",
  "指数整流函数的可学习参数化版本。",
  (x, p) => (x >= 0 ? (p.a * x) / p.b : p.a * Math.expm1(x / p.b)),
  {
    year: "2017",
    params: [
      P("缩放 a", 0.4, 2, 0.1, 1, "a"),
      P("尺度 b", 0.3, 2, 0.1, 1, "b"),
    ],
    props: ["参数可学习", "平滑负区"],
    usage: "可调指数整流",
  },
);
add(
  "exponential",
  "elish",
  "ELiSH",
  "f(x) = x·σ(x) (x≥0); (eˣ−1)·σ(x) (x<0)",
  "结合指数型负分支与 Sigmoid 门控。",
  (x) => (x >= 0 ? x * sigmoid(x) : Math.expm1(x) * sigmoid(x)),
  { year: "2018", props: ["门控", "平滑分段"], usage: "搜索型激活研究" },
);
add(
  "exponential",
  "tanh-exp",
  "TanhExp",
  "f(x) = x·tanh(eˣ)",
  "平滑非单调自门控形式。",
  (x) => x * Math.tanh(Math.exp(x)),
  { year: "2020", props: ["平滑", "非单调"], usage: "平滑非线性研究" },
);
// 5. Smooth self-gated modern functions.
add(
  "smooth",
  "gelu",
  "GELU",
  "f(x) = x·Φ(x)",
  "使用标准正态分布 CDF 做软门控。",
  gelu,
  {
    year: "2016",
    props: ["平滑", "非单调", "自门控"],
    usage: "BERT、ViT、Transformer FFN",
    code: "nn.GELU()",
  },
);
add(
  "smooth",
  "silu",
  "SiLU / Swish-1",
  "f(x) = x·σ(x)",
  "最常用的 Swish 特例；平滑、非单调，保留少量负响应。",
  silu,
  {
    year: "2017",
    props: ["平滑", "非单调", "自门控"],
    usage: "CNN、LLM 门控分支",
    code: "nn.SiLU()",
  },
);
add(
  "smooth",
  "swish",
  "Swish-β",
  "f(x) = x·σ(βx)",
  "通过 β 调节门控锐度；β 增大时逐渐逼近 ReLU。",
  (x, p) => x * sigmoid(p.beta * x),
  {
    year: "2017",
    params: [P("门控锐度 β", 0.1, 6, 0.1, 1.5, "beta")],
    props: ["平滑", "可调门控"],
    usage: "激活搜索、CNN",
  },
);
add(
  "smooth",
  "mish",
  "Mish",
  "f(x) = x·tanh(log(1+eˣ))",
  "使用 Softplus 与 Tanh 组合产生平滑非单调曲线。",
  (x) => x * Math.tanh(softplus(x)),
  {
    year: "2019",
    props: ["平滑", "非单调"],
    usage: "图像分类、目标检测",
    code: "nn.Mish()",
  },
);
add(
  "smooth",
  "hardswish",
  "Hard-Swish",
  "f(x) = x·ReLU6(x+3)/6",
  "SiLU 的分段多项式近似，用于部分高效移动网络。",
  (x) => (x * clamp(x + 3, 0, 6)) / 6,
  {
    year: "2019",
    props: ["分段多项式", "计算友好"],
    usage: "MobileNetV3",
    code: "nn.Hardswish()",
  },
);
add(
  "smooth",
  "eswish",
  "E-Swish",
  "f(x) = βx·σ(x)",
  "对 SiLU 输出进行可调尺度缩放。",
  (x, p) => p.beta * x * sigmoid(x),
  {
    year: "2018",
    params: [P("尺度 β", 0.25, 3, 0.05, 1.5, "beta")],
    props: ["平滑", "可学习尺度"],
    usage: "自门控变体",
  },
);
add(
  "smooth",
  "dsilu",
  "dSiLU",
  "f(x) = σ(x) + x·σ(x)(1−σ(x))",
  "直接将 SiLU 的一阶导函数作为激活。",
  (x) => sigmoid(x) + x * sigmoid(x) * (1 - sigmoid(x)),
  { year: "2017", props: ["平滑", "可出现负值"], usage: "强化学习相关研究" },
);
add(
  "smooth",
  "lisht",
  "LiSHT",
  "f(x) = x·tanh(x)",
  "双侧近似线性且输出非负的乘积函数。",
  (x) => x * Math.tanh(x),
  { year: "2019", props: ["平滑", "偶函数", "非负"], usage: "研究型平滑激活" },
);
add(
  "smooth",
  "golu",
  "GoLU",
  "f(x) = x·exp(−exp(−x))",
  "使用不对称 Gompertz 门控的自门控函数。",
  (x) => x * Math.exp(-Math.exp(-x)),
  { year: "2025", props: ["平滑", "非对称门控"], usage: "研究型激活（2025）" },
);
add(
  "smooth",
  "serf",
  "Serf",
  "f(x) = x·erf(log(1+eˣ))",
  "结合 Erf 与 Softplus 的平滑门控函数。",
  (x) => x * erf(softplus(x)),
  { year: "2021", props: ["平滑", "非单调"], usage: "研究型激活" },
);
add(
  "smooth",
  "hardmish",
  "Hard-Mish (approx.)",
  "f(x) = x·clip((x+2)/2,0,1)",
  "展示一种分段线性门控近似；非精确 Mish 本身。",
  (x) => x * clamp((x + 2) / 2, 0, 1),
  {
    props: ["分段多项式", "计算友好"],
    usage: "硬化近似研究",
    note: "不同文献可能采用不同的 Hard-Mish 近似约定。",
  },
);
add(
  "smooth",
  "smu",
  "SMU (illustrative)",
  "f(x) = (x + √(x²+a²)) / 2",
  "用平滑最大值思想近似 ReLU；此图为平滑整流的示例形式。",
  (x, p) => 0.5 * (x + Math.sqrt(x * x + p.a * p.a)),
  {
    year: "2021",
    params: [P("平滑尺度 a", 0.1, 3, 0.1, 1, "a")],
    props: ["平滑整流", "示例形式"],
    usage: "平滑最大值家族",
    note: "演示的是 smooth-max 构型，不代表具体 SMU 论文的完整参数化定义。",
  },
);
// 6. Periodic / local basis.
add(
  "periodic",
  "sine",
  "Sine",
  "f(x) = sin(x)",
  "周期激活，适合振荡、高频信号的函数表示。",
  Math.sin,
  { props: ["周期", "平滑", "有界"], usage: "隐式表示、信号建模" },
);
add(
  "periodic",
  "cosine",
  "Cosine",
  "f(x) = cos(x)",
  "与 Sine 相差相位，具有周期性响应。",
  Math.cos,
  { props: ["周期", "平滑", "有界"], usage: "频率特征" },
);
add(
  "periodic",
  "siren",
  "SIREN Sine",
  "f(x) = sin(ω₀x)",
  "引入频率尺度 ω₀，需与合适初始化配合。",
  (x, p) => Math.sin(p.omega * x),
  {
    year: "2020",
    params: [P("频率 ω₀", 0.5, 12, 0.5, 4, "omega")],
    props: ["周期", "频率可调"],
    usage: "隐式场、PDE",
  },
);
add(
  "periodic",
  "snake",
  "Snake",
  "f(x) = x + sin²(ax) / a",
  "线性趋势与周期扰动叠加，a 控制振荡频率。",
  (x, p) => x + Math.sin(p.a * x) ** 2 / p.a,
  {
    year: "2020",
    params: [P("周期参数 a", 0.25, 5, 0.25, 1.5, "a")],
    props: ["周期扰动", "无界"],
    usage: "音频、时序、周期信号",
  },
);
add(
  "periodic",
  "gcu",
  "GCU / xCos",
  "f(x) = x·cos(x)",
  "振荡幅度随输入增大。",
  (x) => x * Math.cos(x),
  { year: "2020", props: ["振荡", "无界"], usage: "周期性函数逼近" },
);
add(
  "periodic",
  "gaussian",
  "Gaussian RBF",
  "f(x) = exp(−γ(x−c)²)",
  "局部响应核，中心 c 附近最大。",
  (x, p) => Math.exp(-p.gamma * (x - p.c) ** 2),
  {
    year: "1990s",
    params: [
      P("宽度 γ", 0.1, 2, 0.1, 0.6, "gamma"),
      P("中心 c", -3, 3, 0.25, 0, "c"),
    ],
    props: ["局部响应", "非负"],
    usage: "RBF 网络、局部特征",
  },
);
add(
  "periodic",
  "laplacian",
  "Laplacian RBF",
  "f(x) = exp(−|x−c|/b)",
  "指数型局部核，在中心处存在尖点。",
  (x, p) => Math.exp(-Math.abs(x - p.c) / p.b),
  {
    params: [
      P("尺度 b", 0.3, 3, 0.1, 1, "b"),
      P("中心 c", -2, 2, 0.25, 0, "c"),
    ],
    props: ["局部响应", "非负"],
    usage: "核特征",
  },
);
add(
  "periodic",
  "inverse-quad",
  "Inverse Quadratic",
  "f(x) = 1 / (1 + γx²)",
  "尾部比 Gaussian 更厚的局部基函数。",
  (x, p) => 1 / (1 + p.gamma * x * x),
  {
    params: [P("曲率 γ", 0.1, 3, 0.1, 1, "gamma")],
    props: ["局部响应", "有界"],
    usage: "RBF 网络",
  },
);
add(
  "periodic",
  "inverse-mq",
  "Inverse Multiquadric",
  "f(x) = 1 / √(x²+c²)",
  "经典径向基函数家族成员。",
  (x, p) => 1 / Math.sqrt(x * x + p.c * p.c),
  {
    params: [P("尺度 c", 0.5, 3, 0.1, 1, "c")],
    props: ["局部响应", "正值"],
    usage: "核逼近",
  },
);
add(
  "periodic",
  "morlet",
  "Morlet-type Wavelet",
  "f(x) = e⁻ˣ²ᐟ² cos(ωx)",
  "局部高斯包络内的周期振荡，此处展示实值 Morlet 型。",
  (x, p) => Math.exp((-x * x) / 2) * Math.cos(p.omega * x),
  {
    params: [P("频率 ω", 1, 10, 0.5, 5, "omega")],
    props: ["局部振荡", "平滑"],
    usage: "小波特征",
  },
);
add(
  "periodic",
  "mexican-hat",
  "Mexican Hat",
  "f(x) = (1−x²)e⁻ˣ²ᐟ²",
  "二阶高斯导数形状，具备正负局部响应。",
  (x) => (1 - x * x) * Math.exp((-x * x) / 2),
  { props: ["局部波形", "平滑"], usage: "小波网络" },
);
add(
  "periodic",
  "gabor",
  "Gabor-type",
  "f(x) = e⁻ᵞˣ² cos(ωx)",
  "组合高斯局部包络与正弦波。",
  (x, p) => Math.exp(-p.gamma * x * x) * Math.cos(p.omega * x),
  {
    params: [
      P("包络 γ", 0.05, 1, 0.05, 0.25, "gamma"),
      P("频率 ω", 1, 10, 0.5, 4, "omega"),
    ],
    props: ["时频局部化"],
    usage: "频率与纹理建模",
  },
);
add(
  "periodic",
  "sinc",
  "Sinc",
  "f(x) = sin(πx)/(πx), f(0)=1",
  "信号处理中常见的核函数。",
  (x) => (Math.abs(x) < 1e-10 ? 1 : Math.sin(Math.PI * x) / (Math.PI * x)),
  { props: ["振荡", "衰减"], usage: "信号与插值" },
);
// 7. Adaptive and trainable.
add(
  "adaptive",
  "acon",
  "ACON-C",
  "f(x) = (p₁−p₂)xσ(β(p₁−p₂)x)+p₂x",
  "通过 p₁、p₂、β 学习激活/非激活的平滑转换。",
  (x, p) => (p.p1 - p.p2) * x * sigmoid(p.beta * (p.p1 - p.p2) * x) + p.p2 * x,
  {
    year: "2021",
    params: [
      P("p₁", -0.5, 2, 0.1, 1, "p1"),
      P("p₂", -0.5, 1, 0.1, 0, "p2"),
      P("β", 0.2, 6, 0.2, 1, "beta"),
    ],
    props: ["参数可学习", "门控"],
    usage: "自适应整流",
  },
);
add(
  "adaptive",
  "pau",
  "PAU (illustrative)",
  "f(x) = (a₀+a₁x+a₂x²)/(1+|b₁x+b₂x²|)",
  "Padé 有理函数激活；展示简单的可调分子分母。",
  (x, p) =>
    (p.a0 + p.a1 * x + 0.2 * x * x) / (1 + Math.abs(p.b1 * x + 0.08 * x * x)),
  {
    year: "2020",
    params: [
      P("a₀", -1, 1, 0.1, 0, "a0"),
      P("a₁", -1, 2, 0.1, 1, "a1"),
      P("b₁", -0.8, 0.8, 0.1, 0.2, "b1"),
    ],
    props: ["有理函数", "可学习"],
    usage: "可调曲线形状",
    note: "原始 PAU 可学习更多多项式系数，此处为缩减示例。",
  },
);
add(
  "adaptive",
  "abu",
  "ABU (illustrative)",
  "f(x) = w₁·ReLU(x) + w₂·Tanh(x) + w₃·SiLU(x)",
  "组合多种基础激活，权重可以在网络训练中学习。",
  (x, p) => p.w * relu(x) + (1 - p.w) * (0.5 * Math.tanh(x) + 0.5 * silu(x)),
  {
    params: [P("ReLU 权重 w", 0, 1, 0.05, 0.5, "w")],
    props: ["可学习混合"],
    usage: "激活函数集成",
    note: "图示是简化权重混合；真实 ABU 可能学习多个权重。",
  },
);
add(
  "adaptive",
  "dy-tanh",
  "Dynamic Tanh",
  "f(x) = tanh(αx) · γ + β",
  "使用可学习输入尺度与仿射变换，在部分架构中用来替代归一化层。",
  (x, p) => Math.tanh(p.alpha * x) * p.gamma + p.beta,
  {
    year: "2025",
    params: [
      P("输入尺度 α", 0.2, 3, 0.1, 1, "alpha"),
      P("输出缩放 γ", 0.2, 2, 0.1, 1, "gamma"),
      P("输出偏置 β", -1, 1, 0.1, 0, "beta"),
    ],
    props: ["可学习", "有界（固定参数）"],
    usage: "无归一化 Transformer 研究",
  },
);
add(
  "adaptive",
  "parametric-sine",
  "Parametric Sine",
  "f(x) = a·sin(ωx + φ)",
  "幅度、频率和相位均可学习的周期激活。",
  (x, p) => p.a * Math.sin(p.omega * x + p.phase),
  {
    params: [
      P("幅度 a", 0.2, 3, 0.1, 1, "a"),
      P("频率 ω", 0.5, 8, 0.5, 2, "omega"),
      P("相位 φ", -3.14, 3.14, 0.1, 0, "phase"),
    ],
    props: ["周期", "参数可学习"],
    usage: "可调周期表示",
  },
);
add(
  "adaptive",
  "adaptive-poly",
  "Polynomial Mixture",
  "f(x) = a·x + b·x² + c·x³",
  "教学型参数化多项式激活，演示函数形状学习。",
  (x, p) => p.a * x + p.b * x * x + p.c * x * x * x,
  {
    params: [
      P("a", -1, 2, 0.1, 0.8, "a"),
      P("b", -0.5, 0.5, 0.05, 0.1, "b"),
      P("c", -0.2, 0.2, 0.02, 0.04, "c"),
    ],
    props: ["可学习", "无界"],
    usage: "多项式基研究",
    note: "此为通用示意函数，不代表某篇论文的统一命名。",
  },
);
add(
  "adaptive",
  "spline",
  "Spline Activation / KAN",
  "φ(x) = Σ cₖ Bₖ(x)；KAN 中函数位于边上",
  "让基函数的系数可训练；KAN 将可学习的一元函数配置在连接边上。",
  null,
  {
    year: "2024",
    kind: "structure",
    lab: "learn",
    props: ["可学习样条", "结构方法"],
    usage: "KAN、函数逼近",
  },
);
add(
  "adaptive",
  "dyrelu",
  "Dynamic ReLU / DyReLU",
  "f(x; context) = maxₖ[aₖ(context)x+bₖ(context)]",
  "激活形状取决于上下文输入，无法用单一固定曲线完整描述。",
  null,
  {
    year: "2020",
    kind: "structure",
    lab: "learn",
    props: ["输入相关", "动态参数"],
    usage: "动态视觉网络",
  },
);
add(
  "adaptive",
  "meta-acon",
  "Meta-ACON",
  "β = g(context), ACON(x;β)",
  "门控控制参数由上下文特征动态生成。",
  null,
  {
    year: "2021",
    kind: "structure",
    lab: "learn",
    props: ["输入相关", "动态门控"],
    usage: "动态 CNN",
  },
);
add(
  "adaptive",
  "frelu-funnel",
  "FReLU / Funnel",
  "f(x) = max(x, T(x))；T 包含空间上下文",
  "利用空间卷积产生条件化的二维特征响应。",
  null,
  {
    year: "2020",
    kind: "structure",
    lab: "learn",
    props: ["空间上下文"],
    usage: "图像卷积网络",
  },
);
add(
  "adaptive",
  "kernel-activation",
  "KAF / Kernel Activation",
  "f(x) = Σ aₖ K(x,dₖ)",
  "使用核函数基组合形成可学习非线性。",
  null,
  {
    kind: "structure",
    lab: "learn",
    props: ["核展开", "可学习"],
    usage: "可学习函数逼近",
  },
);
// 8. Gated blocks: not scalar activations.
add(
  "gated",
  "glu",
  "GLU",
  "GLU(x) = σ(Wg·x) ⊙ (Wv·x)",
  "通过 Sigmoid 门控另一条线性投影分支。",
  null,
  {
    year: "2016",
    lab: "gating",
    props: ["门控模块", "乘性交互"],
    usage: "卷积序列模型、Transformer",
  },
);
add(
  "gated",
  "bilinear",
  "Bilinear Gate",
  "f(x) = (Wg·x) ⊙ (Wv·x)",
  "没有额外非线性的双投影乘法。",
  null,
  {
    year: "2020",
    lab: "gating",
    props: ["乘性交互"],
    usage: "Transformer FFN 对照",
  },
);
add(
  "gated",
  "reglu",
  "ReGLU",
  "f(x) = ReLU(Wg·x) ⊙ (Wv·x)",
  "ReLU 作为门控分支的非线性。",
  null,
  { year: "2020", lab: "gating", props: ["门控模块"], usage: "门控 FFN" },
);
add(
  "gated",
  "geglu",
  "GEGLU",
  "f(x) = GELU(Wg·x) ⊙ (Wv·x)",
  "GELU 门控的前馈结构。",
  null,
  {
    year: "2020",
    lab: "gating",
    props: ["平滑门控"],
    usage: "Transformer FFN",
  },
);
add(
  "gated",
  "swiglu",
  "SwiGLU",
  "f(x) = SiLU(Wg·x) ⊙ (Wv·x)",
  "现代 LLM 常见的门控 FFN；不仅是单一标量激活。",
  null,
  {
    year: "2020",
    lab: "gating",
    props: ["SiLU 门控", "乘性交互"],
    usage: "LLaMA、PaLM 等",
  },
);
add(
  "gated",
  "gtu",
  "GTU",
  "f(x) = tanh(Wv·x) ⊙ σ(Wg·x)",
  "Tanh 值分支和 Sigmoid 门控分支组合。",
  null,
  { year: "2016", lab: "gating", props: ["门控模块"], usage: "序列模型" },
);
add(
  "gated",
  "swilu",
  "SwiLU (paper-specific)",
  "f(x,y) = W₂[y ⊙ SiLU(W₁x)]",
  "某些论文中指结合外部表示 y 的 SiLU 门控结构；具体定义依论文。",
  null,
  {
    year: "2025",
    lab: "gating",
    props: ["论文特定命名"],
    usage: "记忆层门控",
    note: "SwiLU 不是所有论文中统一定义的独立标量激活函数。",
  },
);
// 9. Vector/probability operators.
add(
  "vector",
  "softmax",
  "Softmax",
  "pᵢ = exp(zᵢ/τ) / Σⱼ exp(zⱼ/τ)",
  "将向量映射为和为 1 的非负概率。",
  null,
  {
    year: "1980s",
    kind: "vector",
    lab: "prob",
    props: ["向量映射", "概率分布"],
    usage: "多分类、注意力",
  },
);
add(
  "vector",
  "logsoftmax",
  "LogSoftmax",
  "ℓᵢ = log Softmax(z)ᵢ",
  "稳定计算归一化的对数概率。",
  null,
  { kind: "vector", lab: "prob", props: ["对数概率"], usage: "NLL 损失" },
);
add(
  "vector",
  "softmin",
  "Softmin",
  "pᵢ = Softmax(−z)ᵢ",
  "较小输入对应较大权重。",
  null,
  { kind: "vector", lab: "prob", props: ["向量映射"], usage: "距离权重" },
);
add(
  "vector",
  "sparsemax",
  "Sparsemax",
  "p = argmin_{p∈Δ} ||p−z||² / 2",
  "欧氏投影到概率单纯形，可产生精确零概率。",
  null,
  {
    year: "2016",
    kind: "vector",
    lab: "prob",
    props: ["稀疏概率", "向量映射"],
    usage: "稀疏注意力",
  },
);
add(
  "vector",
  "entmax",
  "Entmax-1.5",
  "pᵢ = [max(0, zᵢ/2 − τ)]²",
  "α=1.5 的 Entmax；Softmax 与 Sparsemax 之间的稀疏机制。",
  null,
  {
    year: "2019",
    kind: "vector",
    lab: "prob",
    props: ["稀疏概率", "向量映射"],
    usage: "稀疏注意力",
  },
);
add(
  "vector",
  "gumbel-softmax",
  "Gumbel-Softmax",
  "p = Softmax((z + g)/τ)",
  "通过 Gumbel 噪声构造可微的离散类别近似。",
  null,
  {
    year: "2016",
    kind: "vector",
    lab: "prob",
    props: ["随机采样", "可微近似"],
    usage: "离散潜变量",
  },
);
add(
  "vector",
  "hardmax",
  "Hardmax / Argmax",
  "pᵢ = 1[i = argmaxⱼ zⱼ]",
  "确定性选择最大分数的类别；通常不可直接正常反传。",
  null,
  { kind: "vector", lab: "prob", props: ["离散", "不可微"], usage: "推理决策" },
);
// 10. Complex activation functions.
add(
  "complex",
  "split-relu",
  "Split-ReLU",
  "f(z) = ReLU(Re z) + i ReLU(Im z)",
  "实部和虚部分别进行整流。",
  null,
  {
    kind: "complex",
    lab: "complex",
    props: ["复值", "逐分量"],
    usage: "复值网络",
  },
);
add(
  "complex",
  "split-tanh",
  "Split-Tanh",
  "f(z) = tanh(Re z) + i tanh(Im z)",
  "实部和虚部分别应用 Tanh。",
  null,
  {
    kind: "complex",
    lab: "complex",
    props: ["复值", "逐分量"],
    usage: "复值 RNN",
  },
);
add(
  "complex",
  "modrelu",
  "modReLU",
  "f(z) = ReLU(|z|+b)·z/|z|",
  "调节复数模长并尽量保留相位；原点需特别定义。",
  null,
  {
    year: "2016",
    kind: "complex",
    lab: "complex",
    props: ["复值", "模长门控"],
    usage: "复值循环网络",
  },
);
add(
  "complex",
  "zrelu",
  "zReLU",
  "f(z) = z (arg z ∈[0,π/2]); 其他为 0",
  "按照相位象限进行选择。",
  null,
  {
    year: "2016",
    kind: "complex",
    lab: "complex",
    props: ["复值", "相位筛选"],
    usage: "复值网络",
  },
);
add(
  "complex",
  "cardioid",
  "Cardioid",
  "f(z) = ½(1+cos(arg z))·z",
  "用相位控制输出幅度，形成心形方向响应。",
  null,
  { kind: "complex", lab: "complex", props: ["相位门控"], usage: "复值重建" },
);
add(
  "complex",
  "a-cardioid",
  "A-Cardioid",
  "f(z) = ½(1+cos(arg z+φ))·z",
  "添加相位偏置以改变响应方向。",
  null,
  { kind: "complex", lab: "complex", props: ["相位可调"], usage: "复值模型" },
);
// 11. Spiking/quantization.
add(
  "spiking",
  "spike-step",
  "Spike / Heaviside",
  "s = 1[u > θ]",
  "膜电位超过阈值时发放二值脉冲。",
  null,
  {
    year: "1943",
    kind: "spike",
    lab: "spike",
    props: ["时间状态", "硬阈值"],
    usage: "SNN",
  },
);
add(
  "spiking",
  "lif",
  "LIF Neuron",
  "uₜ ← λuₜ₋₁ + Iₜ − reset",
  "漏积分发放神经元，属于动态机制而非单一静态函数。",
  null,
  {
    kind: "spike",
    lab: "spike",
    props: ["有状态", "时间动态"],
    usage: "脉冲网络",
  },
);
add(
  "spiking",
  "sigmoid-surrogate",
  "Sigmoid Surrogate",
  "∂s/∂u ≈ k·σ(k(u−θ))(1−σ(k(u−θ)))",
  "用平滑 Sigmoid 导数替代不可微阶跃的反向梯度。",
  null,
  { kind: "spike", lab: "spike", props: ["替代梯度"], usage: "SNN 训练" },
);
add(
  "spiking",
  "atan-surrogate",
  "Arctan Surrogate",
  "∂s/∂u ≈ (k/π)/(1+(k(u−θ))²)",
  "用反正切导数提供较厚尾部的梯度。",
  null,
  { kind: "spike", lab: "spike", props: ["替代梯度"], usage: "SNN 训练" },
);
add(
  "spiking",
  "triangular-surrogate",
  "Triangle Surrogate",
  "∂s/∂u ≈ max(0,1−|u−θ|/w)/w",
  "局部三角形的分段线性替代梯度。",
  null,
  {
    kind: "spike",
    lab: "spike",
    props: ["替代梯度", "局部"],
    usage: "SNN 训练",
  },
);
add(
  "spiking",
  "ste",
  "Straight-Through Estimator",
  "forward = sign(x), backward ≈ identity",
  "前向采用离散量化，反向人为指定近似梯度。",
  null,
  {
    kind: "spike",
    lab: "spike",
    props: ["量化", "近似反传"],
    usage: "二值网络",
  },
);
add(
  "spiking",
  "binarytanh",
  "BinaryTanh",
  "forward = sign(x); 常配剪裁型反向梯度",
  "二值输出激活；具体训练规则依实现。",
  null,
  {
    kind: "spike",
    lab: "spike",
    props: ["量化", "离散"],
    usage: "量化神经网络",
  },
);
// ---------------- Application state / reusable rendering ----------------
const $ = (selector) => root.querySelector(selector);
const $$ = (selector) => [...root.querySelectorAll(selector)];
const find = (id) => CATALOG.find((f) => f.id === id);
const st = {
  view: "explore",
  category: "all",
  kind: "all",
  sort: "recommended",
  search: "",
  focus: "silu",
  compare: ["relu", "gelu", "silu"],
  plotMode: "function",
  domain: 6,
  lab: "gating",
  params: {},
  favorites: new Set(),
  labState: {
    gate: "silu",
    a: 1.25,
    b: 2.0,
    temp: 1.0,
    logits: [2, 1.4, -0.5, -1.4],
    complex: "modrelu",
    bias: -0.4,
    phase: 0,
    theta: 0.5,
    k: 4,
    surrogate: "sigmoid",
    knots: [-2, -0.9, 0.2, 1.2, 2.3],
  },
};
const darkChartColors = ["#64e6c3", "#f5b778", "#ad9df5", "#80c9f0"];
const lightChartColors = ["#087d69", "#a35213", "#6650b5", "#206c9d"];
const chartColors = () =>
  atlas.dataset.theme === "dark" ? darkChartColors : lightChartColors;
function safeStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}
function safeStorageSet(key, val) {
  try {
    localStorage.setItem(key, val);
  } catch (e) {}
}
function initPrefs() {
  try {
    const saved = JSON.parse(safeStorageGet("atlas-favorites") || "[]");
    if (Array.isArray(saved))
      st.favorites = new Set(saved.filter((id) => find(id)));
  } catch {}
}

function syncTheme() {
  atlas.dataset.theme =
    document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function scrollToSection(section) {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  section.scrollIntoView({
    behavior: reducedMotion ? "instant" : "smooth",
    block: "start",
  });
}

function setSidebar(open, restoreFocus = false) {
  atlas.toggleAttribute("data-sidebar-open", open);
  const menu = $("#mobileMenuBtn");
  menu.setAttribute("aria-expanded", String(open));
  $(".sidebar-backdrop").hidden = !open;
  if (open) $("#mainNav .active").focus();
  if (restoreFocus) menu.focus({ preventScroll: true });
}
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}
function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function currentParams(f) {
  let defaults = {};
  (f.params || []).forEach((p) => (defaults[p.key] = p.value));
  return { ...defaults, ...(st.params[f.id] || {}) };
}
function setFocus(id, options = {}) {
  const item = find(id);
  if (!item) return;
  st.focus = id;
  if (item.fn) {
    if (!st.compare.includes(id)) {
      if (st.compare.length >= 4) st.compare.shift();
      st.compare.push(id);
    }
    if (options.showLab === true) changeView("lab");
  }
  renderStudio();
  renderCatalog();
  if (options.scroll !== false && item.fn) scrollToSection($("#explorer"));
}
function toggleCompare(id) {
  if (st.compare.includes(id)) {
    if (st.compare.length === 1) {
      toast("至少保留一条曲线");
      return;
    }
    st.compare = st.compare.filter((x) => x !== id);
    if (st.focus === id) st.focus = st.compare[st.compare.length - 1];
  } else {
    if (st.compare.length >= 4) st.compare.shift();
    st.compare.push(id);
    st.focus = id;
  }
  renderStudio();
  renderCatalog();
}
function changeView(name) {
  st.view = name;
  $$(".view").forEach((v) =>
    v.classList.toggle("active", v.id === "view-" + name),
  );
  $$(".nav-link").forEach((b) =>
    b.classList.toggle("active", b.dataset.view === name),
  );
  const names = {
    explore: "函数探索",
    lab: "机制实验室",
    timeline: "发展时间线",
    guide: "选型指南",
  };
  $("#breadcrumbText").textContent = names[name] || names.explore;
  setSidebar(false, atlas.hasAttribute("data-sidebar-open"));
  if (name === "lab") setLab(st.lab);
  if (name === "timeline") renderTimeline();
  if (name === "guide") renderGuide();
  atlas.scrollIntoView({ block: "start", behavior: "instant" });
}
function gotoCategory(cat) {
  st.category = cat;
  changeView("explore");
  renderCategories();
  renderCatalog();
  setTimeout(() => scrollToSection($("#catalog")), 10);
}
function renderCategories() {
  let out = `<button class="category-link ${st.category === "all" ? "active" : ""}" data-category="all"><span class="category-icon" style="--category-color:var(--accent)">∑</span><span class="category-label">所有类别</span><span class="category-count">${CATALOG.length}</span></button>`;
  CATEGORIES.slice(1).forEach((c) => {
    let n = CATALOG.filter((f) => f.cat === c.id).length;
    out += `<button class="category-link ${st.category === c.id ? "active" : ""}" data-category="${c.id}"><span class="category-icon" style="--category-color:${COLORS[c.id]}">${c.icon}</span><span class="category-label">${c.name}</span><span class="category-count">${n}</span></button>`;
  });
  $("#categoryNav").innerHTML = out;
  $$(".category-link").forEach((x) =>
    x.addEventListener("click", () => gotoCategory(x.dataset.category)),
  );
}
function renderHero() {
  let svg = $("#heroSVG"),
    x0 = 31,
    x1 = 468,
    y0 = 14,
    y1 = 249,
    sx = (x) => x0 + ((x + 4) / 8) * (x1 - x0),
    sy = (y) => y1 - ((y + 1.55) / 6.4) * (y1 - y0);
  let lines = "";
  for (let x = -4; x <= 4; x++) {
    let X = sx(x);
    lines += `<line x1="${X}" y1="${y0}" x2="${X}" y2="${y1}" stroke="var(--grid)" stroke-width=".65" />`;
  }
  for (let y = -1; y <= 4; y++) {
    let Y = sy(y);
    lines += `<line x1="${x0}" y1="${Y}" x2="${x1}" y2="${Y}" stroke="var(--grid)" stroke-width=".65" />`;
  }
  lines += `<line x1="${x0}" y1="${sy(0)}" x2="${x1}" y2="${sy(0)}" stroke="var(--plot-label)" stroke-opacity=".42"/><line x1="${sx(0)}" y1="${y0}" x2="${sx(0)}" y2="${y1}" stroke="var(--plot-label)" stroke-opacity=".42"/>`;
  let funcs = [
    { fn: silu, color: "var(--accent)", w: 3.2 },
    { fn: Math.tanh, color: "var(--purple)", w: 2.4 },
    { fn: relu, color: "var(--amber)", w: 2.4 },
  ];
  for (const f of funcs) {
    let p = "";
    for (let i = 0; i <= 260; i++) {
      const x = -4 + (8 * i) / 260;
      p +=
        (i ? "L" : "M") + sx(x).toFixed(2) + " " + sy(f.fn(x)).toFixed(2) + " ";
    }
    lines += `<path d="${p}" fill="none" stroke="${f.color}" stroke-width="${f.w}" stroke-linejoin="round" stroke-linecap="round" opacity=".95"/>`;
  }
  svg.innerHTML =
    lines +
    `<circle cx="${sx(-1.28)}" cy="${sy(silu(-1.28))}" r="4.5" fill="var(--accent)" stroke="var(--bg)" stroke-width="3"/><text x="${x1 - 8}" y="${y1 + 22}" text-anchor="end" font-size="10" fill="var(--plot-label)">x →</text>`;
}
function renderStats() {
  $("#statTotal").textContent = CATALOG.length;
  $("#statCats").textContent = CATEGORIES.length - 1;
  $("#statPlots").textContent = CATALOG.filter((f) => f.fn).length;
}
function fmt(x, d = 2) {
  if (!Number.isFinite(x)) return "—";
  if (Math.abs(x) < 1e-8) return "0";
  if (Math.abs(x) >= 10000 || Math.abs(x) < 0.001) return x.toExponential(1);
  return Number(x.toFixed(d)).toString();
}
function evalF(f, x) {
  try {
    let val = f.fn(x, currentParams(f));
    return Number.isFinite(val) ? val : NaN;
  } catch (e) {
    return NaN;
  }
}
function deriv(f, x) {
  if (["step", "sign", "threshold-relu", "hardshrink"].includes(f.id))
    return NaN;
  let h = 0.00012 * (1 + Math.abs(x));
  return (evalF(f, x + h) - evalF(f, x - h)) / (2 * h);
}
function renderLegend() {
  let out = "";
  st.compare.forEach((id, i) => {
    const f = find(id);
    out += `<div class="legend-item ${st.focus === id ? "focused" : ""}"><i class="legend-color" style="background:${chartColors()[i]}"></i><button class="legend-focus" data-focus="${id}" title="设为主函数">${escapeHtml(f.name)}</button><button class="legend-remove" data-remove="${id}" title="移除对比">×</button></div>`;
  });
  $("#compareLegend").innerHTML = out;
  $$(".legend-focus").forEach(
    (b) =>
      (b.onclick = () => {
        st.focus = b.dataset.focus;
        renderStudio();
        renderCatalog();
      }),
  );
  $$(".legend-remove").forEach(
    (b) => (b.onclick = () => toggleCompare(b.dataset.remove)),
  );
}
function niceTick(n) {
  if (Math.abs(n) < 1e-6) return "0";
  return Math.abs(n) >= 1000
    ? n.toExponential(1)
    : Number(
        n.toFixed(Math.abs(n) >= 10 ? 0 : Math.abs(n) >= 1 ? 1 : 2),
      ).toString();
}
function graphSvg(kind, h = 350) {
  const W = 840,
    H = h,
    L = 56,
    R = 24,
    T = kind === "derivative" ? 26 : 24,
    B = 37,
    iw = W - L - R,
    ih = H - T - B;
  let xMin = -st.domain,
    xMax = st.domain;
  const funcs = st.compare.map(find).filter((f) => f?.fn);
  let values = [];
  for (const f of funcs) {
    for (let i = 0; i <= 320; i++) {
      let x = xMin + ((xMax - xMin) * i) / 320,
        v = kind === "derivative" ? deriv(f, x) : evalF(f, x);
      if (Number.isFinite(v) && Math.abs(v) < 1e10) values.push(v);
    }
  }
  let lo, hi;
  if (!values.length) {
    lo = -1;
    hi = 1;
  } else {
    values.sort((a, b) => a - b);
    lo = values[Math.floor(values.length * 0.02)];
    hi = values[Math.floor((values.length - 1) * 0.98)];
    lo = Math.min(lo, 0);
    hi = Math.max(hi, 0);
    if (hi - lo < 0.4) {
      let mid = (hi + lo) / 2;
      lo = mid - 0.35;
      hi = mid + 0.35;
    }
    let pad = (hi - lo) * 0.12;
    lo -= pad;
    hi += pad;
  }
  const sx = (x) => L + ((x - xMin) / (xMax - xMin)) * iw,
    sy = (y) => T + ((hi - y) / (hi - lo)) * ih;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" class="plot-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${kind === "function" ? "激活函数曲线" : "数值导数曲线"}"><defs><clipPath id="plotClip-${kind}"><rect x="${L}" y="${T}" width="${iw}" height="${ih}"/></clipPath></defs>`;
  for (let i = 0; i <= 5; i++) {
    let xx = xMin + ((xMax - xMin) * i) / 5,
      px = sx(xx);
    s += `<line x1="${px}" y1="${T}" x2="${px}" y2="${H - B}" stroke="var(--grid)" stroke-width="1"/><text x="${px}" y="${H - 13}" fill="var(--plot-label)" font-size="12" text-anchor="middle">${niceTick(xx)}</text>`;
  }
  for (let i = 0; i <= 4; i++) {
    let v = lo + ((hi - lo) * i) / 4,
      py = sy(v);
    s += `<line x1="${L}" y1="${py}" x2="${W - R}" y2="${py}" stroke="var(--grid)" stroke-width="1"/><text x="${L - 11}" y="${py + 3.8}" fill="var(--plot-label)" font-size="11" text-anchor="end">${niceTick(v)}</text>`;
  }
  if (xMin < 0 && xMax > 0)
    s += `<line x1="${sx(0)}" y1="${T}" x2="${sx(0)}" y2="${H - B}" stroke="var(--plot-label)" stroke-opacity=".5" stroke-dasharray="4 5" />`;
  if (lo < 0 && hi > 0)
    s += `<line x1="${L}" y1="${sy(0)}" x2="${W - R}" y2="${sy(0)}" stroke="var(--plot-label)" stroke-opacity=".5" stroke-dasharray="4 5"/>`;
  s += `<text x="${L + 5}" y="${T - 9}" fill="var(--plot-label)" font-size="12" font-weight="600">${kind === "function" ? "f(x)" : "f′(x) · numerical"}</text>`;
  funcs.forEach((f, j) => {
    let p = "",
      open = false;
    for (let i = 0; i <= 500; i++) {
      const x = xMin + ((xMax - xMin) * i) / 500,
        v = kind === "derivative" ? deriv(f, x) : evalF(f, x);
      if (!Number.isFinite(v) || Math.abs(v) > 1e12) {
        open = false;
        continue;
      }
      p += (open ? "L" : "M") + sx(x).toFixed(2) + "," + sy(v).toFixed(2) + " ";
      open = true;
    }
    s += `<path d="${p}" stroke="${chartColors()[j]}" fill="none" stroke-width="${f.id === st.focus ? 3 : 2.3}" opacity="${f.id === st.focus ? 1 : 0.78}" stroke-linecap="round" stroke-linejoin="round" clip-path="url(#plotClip-${kind})"/>`;
  });
  s += `<line class="hover-crosshair" x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" stroke="var(--text)" opacity="0" stroke-dasharray="3 5" stroke-width="1.2" pointer-events="none"/><rect class="plot-hitbox" x="${L}" y="${T}" width="${iw}" height="${ih}" fill="transparent" style="cursor:crosshair"/><text x="${W - R}" y="${H - 13}" fill="var(--plot-label)" font-size="12" text-anchor="end">x</text></svg>`;
  return s;
}
function plotPointerHandlers() {
  const wrap = $("#plotWrap"),
    tooltip = $("#plotTooltip");
  wrap.querySelectorAll(".plot-svg").forEach((svg) => {
    let over = (e) => {
      let rect = svg.getBoundingClientRect(),
        vx = ((e.clientX - rect.left) / rect.width) * 840;
      if (vx < 56 || vx > 816) {
        tooltip.hidden = true;
        svg.querySelector(".hover-crosshair").style.opacity = 0;
        return;
      }
      let x = -st.domain + ((vx - 56) / (840 - 56 - 24)) * st.domain * 2,
        mode = svg.getAttribute("aria-label").includes("导数")
          ? "derivative"
          : "function";
      let content = `<strong>x = ${fmt(x, 3)}</strong>`;
      st.compare.forEach((id, i) => {
        let f = find(id),
          y = mode === "derivative" ? deriv(f, x) : evalF(f, x);
        content += `<div class="tip-row"><span><i class="tip-line" style="background:${chartColors()[i]}"></i>${escapeHtml(f.name)}</span><b>${fmt(y, 3)}</b></div>`;
      });
      tooltip.innerHTML = content;
      tooltip.hidden = false;
      let r2 = wrap.getBoundingClientRect(),
        left = clamp(e.clientX - r2.left + 16, 8, r2.width - 200),
        top = clamp(e.clientY - r2.top - 15, 10, r2.height - 120);
      tooltip.style.left = left + "px";
      tooltip.style.top = top + "px";
      let line = svg.querySelector(".hover-crosshair");
      line.setAttribute("x1", vx);
      line.setAttribute("x2", vx);
      line.style.opacity = 0.65;
    };
    svg.addEventListener("pointermove", over);
    svg.addEventListener("pointerleave", () => {
      tooltip.hidden = true;
      svg.querySelector(".hover-crosshair").style.opacity = 0;
    });
  });
}
function renderGraph() {
  const target = $("#plotContent");
  target.innerHTML =
    st.plotMode === "both"
      ? graphSvg("function", 270) + graphSvg("derivative", 225)
      : graphSvg(st.plotMode, 350);
  $("#domainLabel").textContent = "−" + st.domain + " ~ +" + st.domain;
  plotPointerHandlers();
}
function renderInspector() {
  let f = find(st.focus) || find("silu"),
    cat = CATEGORIES.find((c) => c.id === f.cat),
    color = COLORS[f.cat];
  const params = f.params || [];
  let out = `<div class="inspect-header"><div><div class="inspect-category" style="color:${color}">${escapeHtml(cat.name)} / ${f.fn ? "SCALAR FUNCTION" : "NON-SCALAR MECHANISM"}</div><h3 class="inspect-name">${escapeHtml(f.name)}</h3></div><span class="inspect-year">${escapeHtml(f.year || "常见形式")}</span></div><div class="formula-box">${escapeHtml(f.formula)}</div><p class="inspect-desc">${escapeHtml(f.desc)}</p><div class="prop-chips">${f.props.map((p) => `<span>${escapeHtml(p)}</span>`).join("")}</div>`;
  if (f.fn) {
    if (params.length) {
      out += `<div class="inspector-divider"></div><div class="param-head">LIVE PARAMETERS / 实时调参</div>`;
      let curr = currentParams(f);
      for (const p of params)
        out += `<div class="param-control"><div class="param-label"><span>${escapeHtml(p.label)}</span><strong id="p-value-${p.key}">${fmt(curr[p.key], 3)}</strong></div><input type="range" data-param="${p.key}" min="${p.min}" max="${p.max}" step="${p.step}" value="${curr[p.key]}" aria-label="${escapeHtml(p.label)}"/></div>`;
    } else {
      out += `<div class="inspector-divider"></div><div class="param-head">固定参数 / 无可调形状参数</div>`;
    }
    out += `<p class="inspect-note">典型应用：${escapeHtml(f.usage || "神经网络研究")}。导数曲线采用数值差分；不连续点不具有经典导数。</p>`;
  } else {
    out += `<div class="inspector-divider"></div><div class="param-head">STRUCTURAL ACTIVATION / 结构型机制</div><p class="inspect-note">该条目不是 ℝ→ℝ 的普通标量函数，真实行为由多维输入、参数矩阵、复数或时间状态决定。建议进入专属实验室。</p><button class="inspect-lab-link" id="openFocusLab">在机制实验室交互演示 ↗</button>`;
  }
  if (f.note)
    out += `<div class="inspector-divider"></div><p class="inspect-note">${escapeHtml(f.note)}</p>`;
  $("#inspectorContent").innerHTML = out;
  $$("#inspectorContent input[data-param]").forEach((inp) =>
    inp.addEventListener("input", () => {
      let k = inp.dataset.param,
        v = Number(inp.value);
      st.params[f.id] = { ...(st.params[f.id] || {}), [k]: v };
      let label = $("#p-value-" + k);
      if (label) label.textContent = fmt(v, 3);
      renderGraph();
    }),
  );
  $("#openFocusLab")?.addEventListener("click", () => {
    st.lab = f.lab || "gating";
    changeView("lab");
  });
}
function renderStudio() {
  renderLegend();
  renderGraph();
  renderInspector();
}
function tinySparkline(f) {
  if (!f.fn)
    return `<div class="struct-mark" style="--category-color:${COLORS[f.cat]}"><span class="struct-node">x</span><span class="struct-arrow">→</span><span class="struct-node">${f.kind === "vector" ? "p" : f.kind === "complex" ? "ℂ" : f.kind === "spike" ? "s" : "⊗"}</span></div>`;
  const w = 160,
    h = 51,
    values = [];
  for (let i = 0; i <= 45; i++) {
    let x = -3 + (6 * i) / 45,
      v = evalF(f, x);
    if (Number.isFinite(v)) values.push([i, v]);
  }
  if (!values.length) return "";
  let a = values.map((x) => x[1]).sort((a, b) => a - b),
    lo = a[Math.floor(a.length * 0.03)],
    hi = a[Math.floor((a.length - 1) * 0.97)];
  if (Math.abs(hi - lo) < 0.01) {
    lo -= 1;
    hi += 1;
  }
  let pad = (hi - lo) * 0.12;
  lo -= pad;
  hi += pad;
  let s = values
    .map(
      ([i, v], idx) =>
        (idx ? "L" : "M") +
        ((i / 45) * w).toFixed(1) +
        " " +
        (h - 4 - ((v - lo) / (hi - lo)) * (h - 8)).toFixed(1),
    )
    .join(" ");
  let zeroY = h - 4 - ((0 - lo) / (hi - lo)) * (h - 8);
  return `<div class="sparkline"><svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><line x1="0" y1="${zeroY}" x2="${w}" y2="${zeroY}" stroke="var(--grid)" stroke-width="1"/><path d="${s}" fill="none" stroke="${COLORS[f.cat]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;
}
function prepareSpecial(f) {
  st.focus = f.id;
  st.lab = f.lab || "gating";
  const gates = {
    glu: "sigmoid",
    bilinear: "identity",
    reglu: "relu",
    geglu: "gelu",
    swiglu: "silu",
    gtu: "tanh",
    swilu: "silu",
  };
  if (gates[f.id]) st.labState.gate = gates[f.id];
  if (f.cat === "complex") st.labState.complex = f.id;
  const surrogates = {
    "sigmoid-surrogate": "sigmoid",
    "atan-surrogate": "atan",
    "triangular-surrogate": "triangle",
    ste: "ste",
    binarytanh: "ste",
  };
  if (surrogates[f.id]) st.labState.surrogate = surrogates[f.id];
}
function renderCatalog() {
  let filtered = CATALOG.filter((f) => {
    if (st.category !== "all" && f.cat !== st.category) return false;
    if (st.kind === "scalar" && !f.fn) return false;
    if (st.kind === "special" && f.fn) return false;
    if (st.kind === "favorite" && !st.favorites.has(f.id)) return false;
    let q = st.search.trim().toLowerCase();
    if (
      q &&
      !`${f.name} ${f.cat} ${f.formula} ${f.desc} ${f.usage} ${CATEGORIES.find((c) => c.id === f.cat).name} ${f.tags.join(" ")}`
        .toLowerCase()
        .includes(q)
    )
      return false;
    return true;
  });
  if (st.sort === "alpha")
    filtered.sort((a, b) => a.name.localeCompare(b.name, "en"));
  if (st.sort === "year")
    filtered.sort(
      (a, b) =>
        Number.parseInt(a.year || "9999") - Number.parseInt(b.year || "9999"),
    );
  $("#catalogCount").textContent =
    `${filtered.length} 个结果 / 共 ${CATALOG.length} 项 · ${st.category === "all" ? "全部家族" : CATEGORIES.find((c) => c.id === st.category)?.name}`;
  $("#emptyState").hidden = filtered.length > 0;
  const html = filtered
    .map(
      (f) =>
        `<article class="function-card ${st.focus === f.id ? "selected" : ""}" data-id="${f.id}" tabindex="0" role="button" aria-label="查看 ${escapeHtml(f.name)}"><div class="func-card-top"><span class="func-index"># ${String(f.order + 1).padStart(3, "0")} ${f.year ? "· " + escapeHtml(f.year) : ""}</span><button class="favorite-btn ${st.favorites.has(f.id) ? "active" : ""}" data-fav="${f.id}" title="${st.favorites.has(f.id) ? "取消收藏" : "收藏"}" aria-label="收藏 ${escapeHtml(f.name)}">${st.favorites.has(f.id) ? "★" : "☆"}</button></div><h3>${escapeHtml(f.name)}</h3><div class="func-type">${escapeHtml(CATEGORIES.find((c) => c.id === f.cat).name)}</div><div class="sparkline-row">${tinySparkline(f)}</div><div class="card-formula" title="${escapeHtml(f.formula)}">${escapeHtml(f.formula)}</div><p class="card-desc">${escapeHtml(f.desc)}</p><div class="card-foot"><span class="card-kind">${f.fn ? "● 一维标量" : "◇ " + (f.kind === "vector" ? "概率算子" : f.kind === "complex" ? "复值函数" : f.kind === "spike" ? "脉冲机制" : "网络模块")}</span><span class="card-action">${f.fn ? (st.compare.includes(f.id) ? "已加入曲线 ↗" : "加入对比 ↗") : "查看机制 ↗"}</span></div></article>`,
    )
    .join("");
  $("#catalogGrid").innerHTML = html;
  $$(".function-card").forEach((card) => {
    const id = card.dataset.id;
    let handler = () => {
      const f = find(id);
      if (f.fn) {
        setFocus(id, { scroll: true });
      } else {
        prepareSpecial(f);
        changeView("lab");
      }
    };
    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-fav]")) return;
      handler();
    });
    card.addEventListener("keydown", (e) => {
      if (e.target === card && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        handler();
      }
    });
  });
  $$("[data-fav]").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      let id = b.dataset.fav;
      if (st.favorites.has(id)) st.favorites.delete(id);
      else st.favorites.add(id);
      safeStorageSet("atlas-favorites", JSON.stringify([...st.favorites]));
      renderCatalog();
    }),
  );
}
async function copyText(s) {
  try {
    await navigator.clipboard.writeText(s);
    toast("已复制到剪贴板");
  } catch (e) {
    const focused = root.activeElement;
    const ta = document.createElement("textarea");
    ta.value = s;
    ta.style.cssText = "position:fixed;inset:0 auto auto 0;opacity:0";
    root.append(ta);
    ta.select();
    try {
      toast(document.execCommand("copy") ? "已复制到剪贴板" : "浏览器未允许复制代码");
    } finally {
      ta.remove();
      focused?.focus({ preventScroll: true });
    }
  }
}
function copyCode() {
  const f = find(st.focus),
    code = f.code
      ? `import torch.nn as nn\nactivation = ${f.code}`
      : `# ${f.name}\n# ${f.formula}\n# 请参考原论文或在 PyTorch 中手动实现。`;
  copyText(code);
}
function exportSvg() {
  let svgList = $$("#plotContent .plot-svg");
  if (!svgList.length) return;
  let heights = svgList.length === 1 ? [350] : [270, 225],
    offset = 0;
  let svgBody = svgList
    .map((el, i) => {
      let inner = `<svg x="0" y="${offset}" width="840" height="${heights[i]}" viewBox="0 0 840 ${heights[i]}">${el.innerHTML}</svg>`;
      offset += heights[i] + (i < svgList.length - 1 ? 10 : 0);
      return inner;
    })
    .join("");
  let h = offset,
    dark = atlas.dataset.theme === "dark";
  let content = `<svg xmlns="http://www.w3.org/2000/svg" width="840" height="${h}" viewBox="0 0 840 ${h}"><style>:root{--grid:${dark ? "#273447" : "#dde5e8"};--plot-label:${dark ? "#889aa9" : "#718593"};--text:${dark ? "#edf3f5" : "#12212b"};} text{font-family:Arial,sans-serif}</style><rect width="840" height="${h}" fill="${dark ? "#111a28" : "#ffffff"}"/>${svgBody}</svg>`;
  saveBlob(
    new Blob([content], { type: "image/svg+xml;charset=utf-8" }),
    "activation-atlas-" + st.plotMode + ".svg",
  );
  toast("当前曲线已导出为 SVG");
}
function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function exportCsv() {
  const names = st.compare.map((id) => find(id).name),
    head = [
      "x",
      ...names.map((n) => n + " f(x)"),
      ...names.map((n) => n + " f'(x)"),
    ];
  const rows = [head.map((q) => '"' + q.replaceAll('"', '""') + '"').join(",")];
  for (let i = 0; i <= 500; i++) {
    let x = -st.domain + (2 * st.domain * i) / 500,
      values = st.compare.map((id) => evalF(find(id), x)),
      gradients = st.compare.map((id) => deriv(find(id), x));
    rows.push(
      [x, ...values, ...gradients]
        .map((v) => (Number.isFinite(v) ? String(v) : ""))
        .join(","),
    );
  }
  saveBlob(
    new Blob(["\ufeff" + rows.join("\r\n")], {
      type: "text/csv;charset=utf-8",
    }),
    "activation-atlas-curves.csv",
  );
  toast("501 个采样点与导数已导出为 CSV");
}
function setPlotMode(mode) {
  st.plotMode = mode;
  for (const button of $$("#plotModes button")) {
    const active = button.dataset.mode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  }
}

function revealCatalogSearch() {
  changeView("explore");
  $("#catalogSearch").focus({ preventScroll: true });
  scrollToSection($("#catalog"));
}

function showSources() {
  changeView("guide");
  scrollToSection($("#sources"));
}

function wireGlobal() {
  initPrefs();
  syncTheme();
  const siteHeader = document.querySelector(".site-header");
  const updateHeaderHeight = () =>
    atlas.style.setProperty(
      "--atlas-header-height",
      `${siteHeader.offsetHeight}px`,
    );
  updateHeaderHeight();
  new ResizeObserver(updateHeaderHeight).observe(siteHeader);
  new MutationObserver(() => {
    syncTheme();
    renderLegend();
    renderGraph();
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  renderHero();
  renderStats();
  renderCategories();
  renderStudio();
  renderCatalog();

  for (const button of $$(".nav-link")) {
    button.onclick = () => changeView(button.dataset.view);
  }
  $("#brandLink").onclick = (event) => {
    event.preventDefault();
    changeView("explore");
  };
  $("#jumpExplorer").onclick = () => scrollToSection($("#explorer"));
  $("#jumpLab").onclick = () => changeView("lab");
  $("#mobileMenuBtn").onclick = () =>
    setSidebar(!atlas.hasAttribute("data-sidebar-open"));
  $(".sidebar-backdrop").onclick = () => setSidebar(false, true);
  matchMedia("(max-width: 820px)").addEventListener("change", () =>
    setSidebar(false),
  );
  $("#sourceShortcut").onclick = (event) => {
    event.preventDefault();
    showSources();
  };
  $("#searchTrigger").onclick = revealCatalogSearch;
  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) return;
    if (event.key === "Escape") {
      if (atlas.hasAttribute("data-sidebar-open")) setSidebar(false, true);
      else if (root.activeElement === $("#catalogSearch"))
        $("#catalogSearch").blur();
    }
    if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey)
      return;
    const target = event.composedPath()[0];
    if (
      target instanceof HTMLElement &&
      (target.matches("input, select, textarea") || target.isContentEditable)
    )
      return;
    event.preventDefault();
    revealCatalogSearch();
  });

  $("#catalogSearch").addEventListener("input", (event) => {
    st.search = event.target.value;
    renderCatalog();
  });
  for (const button of $$(".filter-btn")) {
    button.onclick = () => {
      st.kind = button.dataset.kind;
      for (const filter of $$(".filter-btn"))
        filter.classList.toggle("active", filter === button);
      renderCatalog();
    };
  }
  $("#sortSelect").onchange = (event) => {
    st.sort = event.target.value;
    renderCatalog();
  };
  $("#clearFilters").onclick = () => {
    st.category = "all";
    st.kind = "all";
    st.sort = "recommended";
    st.search = "";
    $("#catalogSearch").value = "";
    $("#sortSelect").value = "recommended";
    for (const button of $$(".filter-btn"))
      button.classList.toggle("active", button.dataset.kind === "all");
    renderCategories();
    renderCatalog();
  };
  for (const button of $$("#plotModes button")) {
    button.onclick = () => {
      setPlotMode(button.dataset.mode);
      renderGraph();
    };
  }
  $("#domainSlider").oninput = (event) => {
    st.domain = Number(event.target.value);
    renderGraph();
  };
  $("#resetCompare").onclick = () => {
    st.compare = ["relu", "gelu", "silu"];
    st.focus = "silu";
    st.params = {};
    st.domain = 6;
    $("#domainSlider").value = "6";
    setPlotMode("function");
    renderStudio();
    renderCatalog();
    toast("曲线与参数已重置");
  };
  $("#exportSvg").onclick = exportSvg;
  $("#exportCsv").onclick = exportCsv;
  $("#copyPytorch").onclick = copyCode;
  $("#timelineExplore").onclick = () => changeView("explore");
  const syncHash = () => {
    if (location.hash === "#sources") showSources();
  };
  window.addEventListener("hashchange", syncHash);
  syncHash();
}
// ---------------- Interactive mechanism laboratories ----------------
const LAB_INFO = {
  gating: "GLU 门控",
  prob: "概率向量",
  complex: "复值激活",
  spike: "脉冲与替代梯度",
  learn: "可学习函数",
};
function setLab(name) {
  st.lab = name;
  $$("#labTabs button").forEach((b) =>
    b.classList.toggle("active", b.dataset.lab === name),
  );
  renderLab();
}
function labSlider(id, prop) {
  const el = $("#" + id);
  if (!el) return;
  el.addEventListener("input", (e) => {
    st.labState[prop] = Number(e.target.value);
    updateLab();
  });
}
function labSelect(id, prop) {
  const el = $("#" + id);
  if (!el) return;
  el.addEventListener("change", (e) => {
    st.labState[prop] = e.target.value;
    updateLab();
  });
}
function labHTML(main, controls) {
  $("#labContent").innerHTML =
    `<div class="lab-layout"><div class="lab-main">${main}</div><aside class="lab-controls">${controls}</aside></div>`;
}
function simpleSvg(
  fn,
  {
    xMin = -4,
    xMax = 4,
    yMin = -2,
    yMax = 3,
    height = 218,
    color = "var(--accent)",
    label = "f(x)",
    extra = null,
  } = {},
) {
  const W = 670,
    H = height,
    L = 44,
    R = 22,
    T = 25,
    B = 35,
    w = W - L - R,
    h = H - T - B,
    sx = (x) => L + ((x - xMin) / (xMax - xMin)) * w,
    sy = (y) => T + ((yMax - y) / (yMax - yMin)) * h;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" class="spike-plot" viewBox="0 0 ${W} ${H}"><defs><clipPath id="labClip"><rect x="${L}" y="${T}" width="${w}" height="${h}"/></clipPath></defs>`;
  for (let i = 0; i <= 4; i++) {
    let x = xMin + ((xMax - xMin) * i) / 4,
      y = yMin + ((yMax - yMin) * i) / 4;
    s += `<line x1="${sx(x)}" y1="${T}" x2="${sx(x)}" y2="${H - B}" stroke="var(--grid)"/><line x1="${L}" y1="${sy(y)}" x2="${W - R}" y2="${sy(y)}" stroke="var(--grid)"/><text x="${sx(x)}" y="${H - 12}" fill="var(--plot-label)" text-anchor="middle" font-size="11">${niceTick(x)}</text><text x="${L - 8}" y="${sy(y) + 4}" fill="var(--plot-label)" text-anchor="end" font-size="11">${niceTick(y)}</text>`;
  }
  if (yMin < 0 && yMax > 0)
    s += `<line x1="${L}" y1="${sy(0)}" x2="${W - R}" y2="${sy(0)}" stroke="var(--plot-label)" opacity=".45"/>`;
  s += `<text x="${L + 8}" y="18" font-size="12" fill="var(--plot-label)">${escapeHtml(label)}</text>`;
  let path = "";
  for (let i = 0; i <= 380; i++) {
    let x = xMin + ((xMax - xMin) * i) / 380,
      y = fn(x);
    if (!Number.isFinite(y)) continue;
    path += (i ? "L" : "M") + sx(x).toFixed(2) + "," + sy(y).toFixed(2) + " ";
  }
  s += `<path d="${path}" fill="none" stroke="${color}" stroke-width="3" clip-path="url(#labClip)" stroke-linejoin="round"/>`;
  if (extra) {
    let q = "";
    for (let i = 0; i <= 380; i++) {
      let x = xMin + ((xMax - xMin) * i) / 380,
        y = extra(x);
      q += (i ? "L" : "M") + sx(x).toFixed(2) + "," + sy(y).toFixed(2) + " ";
    }
    s += `<path d="${q}" fill="none" stroke="var(--purple)" stroke-width="2" stroke-dasharray="6 5" clip-path="url(#labClip)"/>`;
  }
  return s + "</svg>";
}
function renderLab() {
  if (st.view !== "lab") return;
  $$("#labTabs button").forEach((b) =>
    b.classList.toggle("active", b.dataset.lab === st.lab),
  );
  switch (st.lab) {
    case "gating":
      renderGating();
      break;
    case "prob":
      renderProbability();
      break;
    case "complex":
      renderComplex();
      break;
    case "spike":
      renderSpiking();
      break;
    case "learn":
      renderLearn();
      break;
  }
}
function renderGating() {
  const s = st.labState;
  labHTML(
    `<div class="mini-kicker">LAB 01 / MULTIPLICATIVE GATING</div><h2>让一条分支控制另一条分支</h2><p>真实 GLU 系列使用两组不同的线性投影。这里直接操纵两条分支的预激活值 a、b，观察门控函数 g(a) 与 b 相乘的效果。</p><div class="lab-equation" id="gateEquation">gate(a) × b = output</div><div class="flow-diagram"><div class="flow-node"><strong>门控预激活 a</strong><b id="flowA">—</b><span class="sub">a = Wg·x</span></div><div class="flow-symbol">→</div><div class="flow-node"><strong id="flowGateName">g(a)</strong><b id="flowG">—</b><span class="sub">非线性门控</span></div><div class="flow-symbol">×</div><div class="flow-node"><strong>数值分支 b</strong><b id="flowB">—</b><span class="sub">b = Wv·x</span></div></div><div class="result-banner">逐元素输出：<strong id="gateOutput">—</strong> <span id="gateNote"></span></div><div style="margin-top:24px" id="gatePlot"></div><div class="result-banner" id="creluResult" style="margin-top:16px"></div>`,
    `<div class="mini-kicker">CONTROL PANEL</div><h3>调整分支</h3><p>比较 GLU、ReGLU、GEGLU、SwiGLU 对相同输入的门控响应。</p><div class="lab-control"><label>门控函数 <strong>g</strong></label><select id="gateType"><option value="sigmoid">Sigmoid / GLU</option><option value="relu">ReLU / ReGLU</option><option value="gelu">GELU / GEGLU</option><option value="silu">SiLU / SwiGLU</option><option value="tanh">Tanh / GTU-like</option><option value="identity">Identity / Bilinear</option></select></div><div class="lab-control"><label>门控输入 a <strong id="gateAVal"></strong></label><input id="gateA" type="range" min="-5" max="5" step="0.05" value="${s.a}"/></div><div class="lab-control"><label>数值分支 b <strong id="gateBVal"></strong></label><input id="gateB" type="range" min="-5" max="5" step="0.05" value="${s.b}"/></div><div class="inspector-divider"></div><p>对应 FFN 通常还会包含下投影 Wdown。门控值不一定在 0 和 1 之间，例如 SiLU 与 GELU 可产生小幅负值，ReLU 则无上界。</p>`,
  );
  $("#gateType").value = s.gate;
  labSelect("gateType", "gate");
  labSlider("gateA", "a");
  labSlider("gateB", "b");
  updateGating();
}
function gateFn(x, type) {
  return { sigmoid, gelu, silu, relu, tanh: Math.tanh, identity: (x) => x }[
    type
  ](x);
}
function updateGating() {
  let s = st.labState,
    fn = (x) => gateFn(x, s.gate),
    v = fn(s.a) * s.b;
  $("#gateAVal").textContent = fmt(s.a);
  $("#gateBVal").textContent = fmt(s.b);
  $("#flowA").textContent = fmt(s.a, 3);
  $("#flowGateName").textContent =
    s.gate === "identity" ? "g(a)=a" : "g(a) = " + s.gate.toUpperCase() + "(a)";
  $("#flowG").textContent = fmt(fn(s.a), 3);
  $("#flowB").textContent = fmt(s.b, 3);
  $("#gateOutput").textContent = fmt(v, 4);
  $("#gateEquation").textContent =
    `${s.gate.toUpperCase()}(${fmt(s.a)}) × (${fmt(s.b)}) = ${fmt(v, 4)}`;
  $("#gateNote").textContent =
    Math.abs(fn(s.a)) < 0.15
      ? " · 当前门控近似关闭"
      : fn(s.a) < 0
        ? " · 门控符号可翻转分支"
        : " · 门控与数值分支共同决定输出";
  $("#gatePlot").innerHTML = simpleSvg((x) => fn(x) * s.b, {
    label: "Output = gate(a) × b，b 固定，横轴为 a",
    yMin: -Math.max(2, Math.abs(s.b) * 5),
    yMax: Math.max(2, Math.abs(s.b) * 5),
  });
  $("#creluResult").innerHTML =
    `<strong>CReLU 补充</strong>：CReLU(a) = [ReLU(a), ReLU(−a)]；当前 a=${fmt(s.a)}，输出 [${fmt(relu(s.a))}, ${fmt(relu(-s.a))}]。它是正负通道拼接，不属于 GLU 乘法门控。`;
}
function softmax(arr, temp = 1) {
  let z = arr.map((x) => x / temp),
    m = Math.max(...z),
    v = z.map((x) => Math.exp(x - m)),
    su = v.reduce((a, b) => a + b, 0);
  return v.map((x) => x / su);
}
function sparsemax(arr) {
  let z = [...arr],
    u = [...z].sort((a, b) => b - a),
    c = 0,
    k = 1;
  for (let j = 0; j < u.length; j++) {
    c += u[j];
    if (u[j] > (c - 1) / (j + 1)) k = j + 1;
  }
  let tau = (u.slice(0, k).reduce((a, b) => a + b, 0) - 1) / k;
  return z.map((x) => Math.max(0, x - tau));
}
function entmax15(arr) {
  let z = arr.map((x) => x * 0.5);
  let low = Math.min(...z) - 2,
    high = Math.max(...z);
  for (let k = 0; k < 90; k++) {
    let mid = (low + high) / 2,
      s = z.reduce((a, b) => a + Math.max(0, b - mid) ** 2, 0);
    if (s > 1) low = mid;
    else high = mid;
  }
  let tau = (low + high) / 2;
  return z.map((x) => Math.max(0, x - tau) ** 2);
}
function hardmax(arr) {
  let max = Math.max(...arr),
    idx = arr.indexOf(max);
  return arr.map((_, i) => (i === idx ? 1 : 0));
}
function renderProbability() {
  const s = st.labState;
  labHTML(
    `<div class="mini-kicker">LAB 02 / PROBABILITY SIMPLEX</div><h2>同一组 Logits，不同的概率分配</h2><p>Softmax 保留所有非零概率；Sparsemax 和 Entmax 可以赋予某些选项恰好为零的权重。下方同时展示六种常见向量变换。</p><div class="lab-equation">p = normalize(z / T) ; Σ pᵢ = 1</div><div id="probResults"></div>`,
    `<div class="mini-kicker">CONTROL PANEL</div><h3>修改四个 Logits</h3><p>调整分数间隔与温度，观察概率是否更尖锐、稀疏或发生最大类别切换。</p><div id="logitSliders"></div><div class="lab-control"><label>温度 T <strong id="tempVal"></strong></label><input id="tempRange" type="range" min="0.25" max="3" step="0.05" value="${s.temp}"/></div><button id="randomizeLogits" class="outline-btn">↻ 随机生成分数</button><div class="inspector-divider"></div><p>LogSoftmax 产生对数概率，不再满足数值和等于 1。Gumbel-Softmax 含随机扰动，右侧“示例采样”使用固定扰动方便复现。</p>`,
  );
  $("#logitSliders").innerHTML = s.logits
    .map(
      (v, i) =>
        `<div class="lab-control"><label>类别 ${String.fromCharCode(65 + i)} <strong id="logitVal${i}">${fmt(v)}</strong></label><input type="range" data-logit="${i}" min="-4" max="4" step="0.1" value="${v}" /></div>`,
    )
    .join("");
  $$("[data-logit]").forEach(
    (inp) =>
      (inp.oninput = () => {
        st.labState.logits[Number(inp.dataset.logit)] = Number(inp.value);
        updateProbability();
      }),
  );
  labSlider("tempRange", "temp");
  $("#randomizeLogits").onclick = () => {
    st.labState.logits = st.labState.logits.map(
      () => Math.round((Math.random() * 7 - 3.5) * 10) / 10,
    );
    renderProbability();
  };
  updateProbability();
}
function updateProbability() {
  let s = st.labState;
  for (let i = 0; i < 4; i++) $("#logitVal" + i).textContent = fmt(s.logits[i]);
  $("#tempVal").textContent = fmt(s.temp);
  let v = s.logits.map((x) => x / s.temp),
    methods = [
      {
        name: "Softmax",
        a: softmax(s.logits, s.temp),
        color: "var(--accent)",
        note: "每一项均严格 > 0",
      },
      {
        name: "Sparsemax",
        a: sparsemax(v),
        color: "var(--purple)",
        note: "欧氏投影 · 可精确为 0",
      },
      {
        name: "Entmax-1.5",
        a: entmax15(v),
        color: "var(--amber)",
        note: "介于 Softmax 与 Sparsemax 之间的 α-Entmax",
      },
      {
        name: "Softmin",
        a: softmax(
          s.logits.map((x) => -x),
          s.temp,
        ),
        color: "var(--blue)",
        note: "越小的 logit 权重越大",
      },
      {
        name: "Hardmax",
        a: hardmax(s.logits),
        color: "var(--red)",
        note: "确定性单点选择 · 不可直接正常反传",
      },
      {
        name: "Gumbel-Softmax（固定噪声）",
        a: softmax(
          s.logits.map((x, i) => x + [0.35, -0.65, 0.85, -0.25][i]),
          s.temp,
        ),
        color: "var(--muted)",
        note: "这里展示一次固定的 Gumbel 型扰动示例（非实时随机采样）",
      },
    ];
  $("#probResults").innerHTML =
    methods
      .map(
        (m) =>
          `<div class="prob-row"><div class="prob-title">${m.name}</div><div class="prob-bars">${m.a.map((p, i) => `<div class="prob-bar-line"><span>类别 ${String.fromCharCode(65 + i)}</span><div class="prob-track"><div class="prob-fill" style="width:${clamp(p * 100, 0, 100)}%;background:${m.color}"></div></div><strong>${(p * 100).toFixed(1)}%</strong></div>`).join("")}</div><div class="prob-meta">${m.note} · 零权重 ${m.a.filter((x) => x < 1e-7).length}/4 · 合计 ${fmt(
            m.a.reduce((x, y) => x + y, 0),
            5,
          )}</div></div>`,
      )
      .join("") +
    `<div class="result-banner" style="margin-top:8px"><strong>LogSoftmax（对数概率）</strong>：${softmax(
      s.logits,
      s.temp,
    )
      .map(
        (p, i) =>
          String.fromCharCode(65 + i) +
          " = " +
          fmt(Math.log(Math.max(1e-300, p)), 3),
      )
      .join("　 /　 ")}。其输出不是百分比，数值相加不等于 1。</div>`;
}
function renderComplex() {
  const s = st.labState;
  labHTML(
    `<div class="mini-kicker">LAB 03 / COMPLEX PLANE</div><h2>二维复平面上的激活区域</h2><p>颜色表示输出的复数相位（argument），亮度表示输出模长。移动参数，观察哪些象限被截断、哪些方向被放大。</p><div class="lab-equation" id="complexFormula">f(z) = ReLU(|z| + b) · z/|z|</div><canvas id="complexCanvas" class="complex-canvas" width="540" height="360" aria-label="复值激活函数平面热图"></canvas><div class="complex-legend">横轴为 Re(z)，纵轴为 Im(z)；输出为零的区域接近黑色。图中采用相位色相编码和幅度亮度编码。</div><div id="complexHover" class="result-banner" style="margin-top:18px">移动鼠标到平面上，读取复数输入与输出。</div>`,
    `<div class="mini-kicker">CONTROL PANEL</div><h3>选择复值激活</h3><p>这些激活的输入为 z ∈ ℂ，并不能在普通一维 f(x) 曲线中完整呈现。</p><div class="lab-control"><label>变换方式 <strong>f(z)</strong></label><select id="complexType"><option value="modrelu">modReLU</option><option value="zrelu">zReLU</option><option value="split-relu">Split-ReLU</option><option value="split-tanh">Split-Tanh</option><option value="cardioid">Cardioid</option><option value="a-cardioid">A-Cardioid</option></select></div><div class="lab-control"><label>模长偏置 b <strong id="biasVal"></strong></label><input id="complexBias" type="range" min="-2" max="2" step="0.05" value="${s.bias}"/></div><div class="lab-control"><label>相位偏置 φ <strong id="phaseVal"></strong></label><input id="complexPhase" type="range" min="-3.14" max="3.14" step="0.05" value="${s.phase}"/></div><div class="inspector-divider"></div><p>modReLU 在 z=0 处单独定义为 0，避免除以 0；本实验默认该约定。</p>`,
  );
  $("#complexType").value = s.complex;
  labSelect("complexType", "complex");
  labSlider("complexBias", "bias");
  labSlider("complexPhase", "phase");
  const cv = $("#complexCanvas");
  cv.addEventListener("pointermove", (e) => {
    let r = cv.getBoundingClientRect(),
      x = ((e.clientX - r.left) / r.width) * cv.width,
      y = ((e.clientY - r.top) / r.height) * cv.height,
      a = -3 + (6 * x) / cv.width,
      b = 2 - (4 * y) / cv.height,
      o = complexFn(a, b);
    $("#complexHover").textContent =
      `输入 z = ${fmt(a, 3)} ${b >= 0 ? "+" : "−"} ${fmt(Math.abs(b), 3)}i  →  输出 f(z) = ${fmt(o[0], 3)} ${o[1] >= 0 ? "+" : "−"} ${fmt(Math.abs(o[1]), 3)}i  |f(z)| = ${fmt(Math.hypot(...o), 3)}`;
  });
  updateComplex();
}
function complexFn(a, b) {
  const s = st.labState,
    r = Math.hypot(a, b),
    ang = Math.atan2(b, a);
  switch (s.complex) {
    case "split-relu":
      return [relu(a), relu(b)];
    case "split-tanh":
      return [Math.tanh(a), Math.tanh(b)];
    case "modrelu": {
      let m = relu(r + s.bias),
        q = r > 1e-9 ? m / r : 0;
      return [a * q, b * q];
    }
    case "zrelu":
      return a >= 0 && b >= 0 ? [a, b] : [0, 0];
    case "cardioid": {
      let w = 0.5 * (1 + Math.cos(ang));
      return [a * w, b * w];
    }
    case "a-cardioid": {
      let w = 0.5 * (1 + Math.cos(ang + s.phase));
      return [a * w, b * w];
    }
    default:
      return [a, b];
  }
}
function updateComplex() {
  let s = st.labState;
  $("#biasVal").textContent = fmt(s.bias);
  $("#phaseVal").textContent = fmt(s.phase);
  $("#complexBias").parentElement.style.opacity =
    s.complex === "modrelu" ? 1 : 0.35;
  $("#complexPhase").parentElement.style.opacity =
    s.complex === "a-cardioid" ? 1 : 0.35;
  const cv = $("#complexCanvas"),
    ctx = cv.getContext("2d"),
    W = cv.width,
    H = cv.height,
    px = 3;
  ctx.clearRect(0, 0, W, H);
  for (let j = 0; j < H; j += px) {
    for (let i = 0; i < W; i += px) {
      let a = -3 + (6 * i) / W,
        b = 2 - (4 * j) / H,
        [u, v] = complexFn(a, b),
        r = Math.hypot(u, v),
        ang = Math.atan2(v, u),
        h = (((ang + Math.PI) / (2 * Math.PI)) * 360 + 30) % 360,
        l = 8 + 52 * (1 - Math.exp(-r / 1.8));
      ctx.fillStyle = `hsl(${h.toFixed(2)}, 73%, ${l.toFixed(2)}%)`;
      ctx.fillRect(i, j, px, px);
    }
  }
  ctx.strokeStyle = "rgba(255,255,255,.45)";
  ctx.setLineDash([3, 4]);
  ctx.beginPath();
  ctx.moveTo(W / 2, 0);
  ctx.lineTo(W / 2, H);
  ctx.moveTo(0, H / 2);
  ctx.lineTo(W, H / 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = "12px sans-serif";
  ctx.fillStyle = "rgba(255,255,255,.85)";
  ctx.fillText("Im(z) ↑", W / 2 + 9, 16);
  ctx.fillText("Re(z) →", W - 72, H / 2 + 17);
  const f = {
    modrelu: "f(z) = ReLU(|z|+b) · z/|z|",
    zrelu: "f(z) = z if arg(z)∈[0,π/2], else 0",
    "split-relu": "f(z) = ReLU(Re z) + i·ReLU(Im z)",
    "split-tanh": "f(z) = tanh(Re z) + i·tanh(Im z)",
    cardioid: "f(z) = (1 + cos(arg z))/2 · z",
    "a-cardioid": "f(z) = (1 + cos(arg z + φ))/2 · z",
  };
  $("#complexFormula").textContent = f[s.complex];
}
function renderSpiking() {
  const s = st.labState;
  labHTML(
    `<div class="mini-kicker">LAB 04 / SPIKING AND SURROGATE GRADIENTS</div><h2>前向硬阈值，反向使用平滑梯度</h2><p>脉冲发放是离散的，阶跃函数在大多数位置的导数为零。Surrogate Gradient 在反向传播时使用易训练的替代函数。</p><div class="lab-equation">forward: s = 1[u &gt; θ]　/　backward: ds/du ≈ g(u−θ)</div><div id="spikePlot" class="spike-plots"></div><div class="result-banner">不同替代梯度并不改变这里的前向脉冲输出，它只改变训练时梯度的传播方式。</div>`,
    `<div class="mini-kicker">CONTROL PANEL</div><h3>调节发放与梯度</h3><p>改变阈值会平移尖点；改变 k 会改变梯度集中程度。</p><div class="lab-control"><label>替代梯度 <strong>g</strong></label><select id="surrogateType"><option value="sigmoid">Sigmoid derivative</option><option value="atan">Arctan / Cauchy</option><option value="triangle">Triangular</option><option value="ste">STE (clipped)</option></select></div><div class="lab-control"><label>膜电位阈值 θ <strong id="thetaVal"></strong></label><input id="spikeTheta" type="range" min="-2" max="2" step="0.05" value="${s.theta}"/></div><div class="lab-control"><label>陡峭度 k <strong id="kVal"></strong></label><input id="spikeK" type="range" min="0.5" max="10" step="0.25" value="${s.k}"/></div><div class="inspector-divider"></div><p>真实 LIF/SNN 还要模拟跨时间的膜电位积分与发放后重置，本实验只聚焦于阈值与替代梯度。</p>`,
  );
  $("#surrogateType").value = s.surrogate;
  labSelect("surrogateType", "surrogate");
  labSlider("spikeTheta", "theta");
  labSlider("spikeK", "k");
  updateSpiking();
}
function surrogateDerivative(x) {
  const s = st.labState,
    u = x - s.theta,
    k = s.k;
  if (s.surrogate === "sigmoid") {
    let q = sigmoid(k * u);
    return k * q * (1 - q);
  }
  if (s.surrogate === "atan") return k / Math.PI / (1 + (k * u) ** 2);
  if (s.surrogate === "triangle") return k * Math.max(0, 1 - Math.abs(k * u));
  if (s.surrogate === "ste") return Math.abs(u) < 1 ? 1 : 0;
  return 0;
}
function updateSpiking() {
  const s = st.labState;
  $("#thetaVal").textContent = fmt(s.theta);
  $("#kVal").textContent = fmt(s.k);
  $("#spikePlot").innerHTML =
    simpleSvg((x) => (x > s.theta ? 1 : 0), {
      label: "Forward: spike = 1[u > θ]",
      yMin: -0.2,
      yMax: 1.2,
      height: 200,
    }) +
    simpleSvg(surrogateDerivative, {
      label: "Backward: surrogate derivative g(u−θ)",
      yMin: 0,
      yMax: Math.max(1, 2.8 * s.k),
      height: 200,
      color: "var(--purple)",
    });
}
function renderLearn() {
  let s = st.labState;
  labHTML(
    `<div class="mini-kicker">LAB 05 / TRAINABLE NONLINEARITY</div><h2>如果激活函数本身也能学习？</h2><p>拖动五个节点的高度，看看一元函数形状如何改变。这是简化的<strong>可学习分段折线</strong>示例，并非真正的 B-spline 或完整 KAN 实现。</p><div class="lab-equation">φ(x) = piecewise-linear interpolation of (xₖ, cₖ)</div><div id="learnPlot"></div><div class="result-banner" style="margin-top:18px">KAN 中的函数通常位于网络<strong>连接边</strong>而不是普通节点上。真实样条激活还包含样条基、控制点系数和训练规则。</div>`,
    `<div class="mini-kicker">CONTROL PANEL</div><h3>调整五个控制点</h3><p>改变 cₖ 而保持 xₖ 不变。尝试做出单调、非单调或近似周期形状。</p><div id="knotSliders" class="knot-grid"></div><div class="inspector-divider"></div><button id="knotsLinear" class="outline-btn">线性</button> <button id="knotsWavy" class="outline-btn">振荡</button> <button id="knotsReset" class="outline-btn">重置</button><div class="inspector-divider"></div><p>绿色为可学习折线，紫色虚线是固定 SiLU 参照。两者属于不同形式的非线性，图示不暗示 KAN 性能优于 MLP。</p>`,
  );
  $("#knotSliders").innerHTML = s.knots
    .map(
      (v, i) =>
        `<div class="lab-control"><label>x=${[-4, -2, 0, 2, 4][i]} <strong id="knotVal${i}">${fmt(v)}</strong></label><input type="range" data-knot="${i}" min="-4" max="4" step="0.1" value="${v}" aria-label="控制点 ${i + 1} 的高度" /></div>`,
    )
    .join("");
  $$("[data-knot]").forEach(
    (inp) =>
      (inp.oninput = () => {
        st.labState.knots[+inp.dataset.knot] = +inp.value;
        updateLearn();
      }),
  );
  $("#knotsLinear").onclick = () => {
    st.labState.knots = [-4, -2, 0, 2, 4];
    renderLearn();
  };
  $("#knotsWavy").onclick = () => {
    st.labState.knots = [0, 2, -2, 2, 0];
    renderLearn();
  };
  $("#knotsReset").onclick = () => {
    st.labState.knots = [-2, -0.9, 0.2, 1.2, 2.3];
    renderLearn();
  };
  updateLearn();
}
function learnFn(x) {
  const xs = [-4, -2, 0, 2, 4],
    ys = st.labState.knots;
  let i = 0;
  while (i < xs.length - 2 && x > xs[i + 1]) i++;
  let t = (x - xs[i]) / (xs[i + 1] - xs[i]);
  return ys[i] * (1 - t) + ys[i + 1] * t;
}
function updateLearn() {
  st.labState.knots.forEach((v, i) => {
    $("#knotVal" + i).textContent = fmt(v);
  });
  $("#learnPlot").innerHTML = simpleSvg(learnFn, {
    label: "Trainable piecewise-linear φ(x) / baseline SiLU (dashed)",
    yMin: -4.5,
    yMax: 4.5,
    height: 350,
    extra: silu,
  });
}
function updateLab() {
  if (st.lab === "gating") updateGating();
  if (st.lab === "prob") updateProbability();
  if (st.lab === "complex") updateComplex();
  if (st.lab === "spike") updateSpiking();
  if (st.lab === "learn") updateLearn();
}
// ---------------- Historical timeline / applied guide ----------------
const TIMELINE = [
  {
    year: "1943–1958",
    title: "二值神经元与感知机",
    desc: "阈值、阶跃与符号函数将神经元理解为离散决策单元；缺乏平滑梯度，难以直接依靠反向传播训练。",
    items: ["step", "sign"],
  },
  {
    year: "1980s",
    title: "反向传播与平滑 S 型函数",
    desc: "Sigmoid、Tanh 成为可微神经网络的经典选择，但深层训练会受到激活饱和与梯度衰减影响。",
    items: ["sigmoid", "tanh"],
  },
  {
    year: "1990s–2000s",
    title: "局部核与平滑整流的前奏",
    desc: "RBF 网络、Softplus、Arctan 与多种阈值函数扩展了可学习的非线性函数形式。",
    items: ["gaussian", "softplus"],
  },
  {
    year: "2010–2012",
    title: "ReLU 在深度学习中普及",
    desc: "正区不饱和与较低算子成本推动深层 CNN 训练；同时暴露死神经元和负区信息丢失问题。",
    items: ["relu"],
  },
  {
    year: "2013–2015",
    title: "整流函数的快速分化",
    desc: "Maxout、Leaky ReLU、PReLU、SReLU 将非线性形状从固定截断拓展为多个分段或可学习参数。",
    items: ["maxout", "leaky-relu", "prelu", "srelu"],
  },
  {
    year: "2015–2017",
    title: "指数、平滑和自归一化",
    desc: "ELU、SELU 与 GELU 探索负区响应、激活统计稳定性和连续的概率软门控。",
    items: ["elu", "selu", "gelu"],
  },
  {
    year: "2016–2018",
    title: "乘法门控与自动激活搜索",
    desc: "GLU 引入双分支乘性交互；Swish/SiLU 与自适应门控推动平滑激活函数受到关注。",
    items: ["glu", "silu", "swish"],
  },
  {
    year: "2019–2021",
    title: "结构门控与周期表示",
    desc: "Mish、Hard-Swish、SIREN、Snake、SwiGLU、GEGLU 提供更加多样的形状与架构归纳偏置。",
    items: ["mish", "siren", "snake", "swiglu", "geglu"],
  },
  {
    year: "2021–2024",
    title: "高阶整流与可学习函数",
    desc: "Squared ReLU、StarReLU、PAU 和 KAN 展示了多项式、有理函数与样条非线性的研究潜力。",
    items: ["squared-relu", "starrelu", "pau", "spline"],
  },
  {
    year: "2025–2026",
    title: "归一化替代与新型非对称门控",
    desc: "Dynamic Tanh、GoLU 等探索不同的架构角色与门控形态，仍需审慎检验真实任务收益。",
    items: ["dy-tanh", "golu"],
  },
];
const GUIDE = [
  {
    icon: "⌘",
    title: "普通 MLP / 表格数据",
    desc: "从 ReLU、SiLU 和 GELU 开始，比较精度、速度与不同随机种子的稳定性。",
    ids: ["relu", "silu", "gelu"],
  },
  {
    icon: "▧",
    title: "CNN / 视觉网络",
    desc: "ReLU 是坚实基线；SiLU 和 Hard-Swish 可在特定网络中尝试。",
    ids: ["relu", "silu", "hardswish"],
  },
  {
    icon: "⊗",
    title: "Transformer / LLM FFN",
    desc: "比较 GELU FFN 与 SwiGLU / GEGLU 门控 FFN；必须控制参数量。",
    ids: ["gelu", "swiglu", "geglu"],
  },
  {
    icon: "⌁",
    title: "时间序列 / 高频特征",
    desc: "优先考虑 SiLU、GELU；周期激活可作为受控实验，而不是默认选择。",
    ids: ["silu", "gelu", "snake"],
  },
  {
    icon: "≈",
    title: "波动率 / 正值参数输出",
    desc: "输出层常用 Softplus 保证严格正值；隐藏层仍可选任意合适激活。",
    ids: ["softplus", "elu"],
  },
  {
    icon: "◉",
    title: "隐式表示 / PDE",
    desc: "Tanh、Softplus、Sine/SIREN 适合用于研究高阶导数或连续信号的结构。",
    ids: ["tanh", "siren", "softplus"],
  },
  {
    icon: "▥",
    title: "概率输出 / 稀疏注意力",
    desc: "多分类概率 Softmax；希望精确零权重时研究 Sparsemax 或 Entmax。",
    ids: ["softmax", "sparsemax", "entmax"],
  },
  {
    icon: "⟡",
    title: "可学习非线性研究",
    desc: "试验 PReLU、ACON、PAU 或 KAN 类方法；额外参数与推理开销不可忽略。",
    ids: ["prelu", "acon", "pau", "spline"],
  },
];
const REFERENCES = [
  [
    "Kunc & Kléma (2024) · Three Decades of Activations: A Comprehensive Survey of 400 Activation Functions",
    "https://arxiv.org/abs/2402.09092",
    "大规模综述；用于了解更多历史变体",
  ],
  [
    "Nair & Hinton (2010) · Rectified Linear Units Improve Restricted Boltzmann Machines",
    "https://www.cs.toronto.edu/~fritz/absps/reluICML.pdf",
    "ReLU 早期现代应用的重要论文",
  ],
  [
    "He et al. (2015) · Delving Deep into Rectifiers",
    "https://arxiv.org/abs/1502.01852",
    "PReLU 与深层网络初始化",
  ],
  [
    "Hendrycks & Gimpel (2016) · Gaussian Error Linear Units",
    "https://arxiv.org/abs/1606.08415",
    "GELU 原始论文",
  ],
  [
    "Ramachandran et al. (2017) · Searching for Activation Functions",
    "https://arxiv.org/abs/1710.05941",
    "Swish 自动搜索",
  ],
  [
    "Clevert et al. (2015/2016) · Fast and Accurate Deep Network Learning by ELUs",
    "https://arxiv.org/abs/1511.07289",
    "ELU 原始研究",
  ],
  [
    "Klambauer et al. (2017) · Self-Normalizing Neural Networks",
    "https://arxiv.org/abs/1706.02515",
    "SELU 的统计稳定条件",
  ],
  [
    "Shazeer (2020) · GLU Variants Improve Transformer",
    "https://arxiv.org/abs/2002.05202",
    "GEGLU、SwiGLU 与门控 FFN",
  ],
  [
    "Sitzmann et al. (2020) · Implicit Neural Representations with Periodic Activation Functions",
    "https://arxiv.org/abs/2006.09661",
    "SIREN 与高频表示",
  ],
  [
    "Ziyin et al. (2020) · Neural Networks Fail to Learn Periodic Functions",
    "https://arxiv.org/abs/2006.08195",
    "Snake 与周期外推",
  ],
  [
    "Misra (2019) · Mish: A Self Regularized Non-Monotonic Activation Function",
    "https://arxiv.org/abs/1908.08681",
    "Mish 原始研究",
  ],
  [
    "Martins & Astudillo (2016) · From Softmax to Sparsemax",
    "https://arxiv.org/abs/1602.02068",
    "Sparsemax 概率映射",
  ],
  [
    "Peters et al. (2019) · Sparse Sequence-to-Sequence Models",
    "https://arxiv.org/abs/1905.05702",
    "Entmax 家族",
  ],
  [
    "Liu et al. (2024) · KAN: Kolmogorov-Arnold Networks",
    "https://arxiv.org/abs/2404.19756",
    "边函数与样条型激活",
  ],
  [
    "Transformers without Normalization (2025)",
    "https://arxiv.org/abs/2503.10622",
    "Dynamic Tanh 用于归一化替代",
  ],
  [
    "Das et al. (2025) · Gompertz Linear Units: Leveraging Asymmetry",
    "https://arxiv.org/abs/2502.03654",
    "GoLU 不对称门控的原始研究",
  ],
  [
    "PyTorch Activation Functions — Official Documentation",
    "https://pytorch.org/docs/stable/nn.html#non-linear-activations-weighted-sum-nonlinearity",
    "标准函数的官方接口",
  ],
];
function renderTimeline() {
  if ($("#timelineRail").dataset.built === "yes") return;
  $("#timelineRail").innerHTML = TIMELINE.map(
    (m) =>
      `<article class="timeline-item"><div class="timeline-year">${m.year}</div><h3>${m.title}</h3><p>${m.desc}</p><div class="timeline-buttons">${m.items.map((id) => `<button data-open-func="${id}">${escapeHtml(find(id).name)} ↗</button>`).join("")}</div></article>`,
  ).join("");
  $("#timelineRail").dataset.built = "yes";
  $$("#timelineRail [data-open-func]").forEach(
    (b) => (b.onclick = () => openFromOutside(b.dataset.openFunc)),
  );
}
function openFromOutside(id) {
  let f = find(id);
  if (f.fn) {
    changeView("explore");
    setFocus(id, { scroll: true });
  } else {
    prepareSpecial(f);
    changeView("lab");
  }
}
function renderGuide() {
  if ($("#guideCards").dataset.built === "yes") return;
  $("#guideCards").innerHTML = GUIDE.map(
    (g) =>
      `<article class="guide-card"><div class="task-icon">${g.icon}</div><h3>${g.title}</h3><p>${g.desc}</p><div class="choices">${g.ids.map((id) => `<button data-guide-func="${id}">${escapeHtml(find(id).name)} ↗</button>`).join("")}</div></article>`,
  ).join("");
  $("#references").innerHTML = REFERENCES.map(
    (r, i) =>
      `<div class="reference-item"><span class="reference-number">${String(i + 1).padStart(2, "0")}</span><div><a href="${escapeHtml(r[1])}" target="_blank" rel="noopener noreferrer">${escapeHtml(r[0])} ↗</a><p>${escapeHtml(r[2])}</p></div></div>`,
  ).join("");
  $("#guideCards").dataset.built = "yes";
  $$("[data-guide-func]").forEach(
    (b) => (b.onclick = () => openFromOutside(b.dataset.guideFunc)),
  );
}
function initialize() {
  wireGlobal();
  $$("#labTabs button").forEach(
    (b) => (b.onclick = () => setLab(b.dataset.lab)),
  );
}
initialize();
