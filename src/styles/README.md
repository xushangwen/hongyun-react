# 样式架构说明

## 📁 目录结构

```
src/styles/
├── base/                    # 基础层
│   ├── fonts.css           # 字体声明（HarmonyOS Sans SC, DIN Pro）
│   ├── variables.css       # CSS 变量（颜色、圆角、布局）
│   ├── reset.css           # Reset + 基础样式
│   └── responsive.css      # 响应式样式（1024px/768px/480px）
│
├── components/              # 组件层（可跨页面复用）
│   ├── header.css          # Header + Dropdown + Search
│   ├── mobile-menu.css     # 移动端汉堡菜单
│   ├── footer.css          # Footer
│   └── buttons.css         # Fixed Side Buttons
│
├── sections/                # 页面区块（首页专用）
│   ├── hero.css            # Hero 轮播
│   ├── about.css           # 关于我们
│   ├── strength.css        # 核心实力
│   ├── partners.css        # 合作伙伴
│   ├── contact.css         # 联系我们
│   └── news.css            # 新闻动态
│
├── pages/                   # 页面级样式（预留）
│   └── (未来页面样式)
│
└── main.css                 # 入口文件（@import 所有模块）
```

---

## 🎯 使用指南

### 新增页面样式

**示例：创建产品详情页**

1. 创建页面样式文件：
```css
/* src/styles/pages/product-detail.css */
.product-detail {
  padding: 80px 0;
}

.product-hero {
  /* ... */
}
```

2. 在页面组件中引入：
```jsx
// src/pages/ProductDetail.jsx
import '../styles/base/fonts.css'
import '../styles/base/variables.css'
import '../styles/base/reset.css'
import '../styles/components/header.css'
import '../styles/components/footer.css'
import '../styles/pages/product-detail.css'
import '../styles/base/responsive.css'
```

**或者**创建页面专用入口文件：
```css
/* src/styles/product-detail-page.css */
@import './base/fonts.css';
@import './base/variables.css';
@import './base/reset.css';
@import './components/header.css';
@import './components/footer.css';
@import './pages/product-detail.css';
@import './base/responsive.css';
```

---

### 修改现有样式

**场景 1：修改 Header 颜色**
- 直接编辑 `components/header.css`
- 所有引用该组件的页面自动生效

**场景 2：调整响应式断点**
- 编辑 `base/responsive.css`
- 全站响应式统一更新

**场景 3：新增 CSS 变量**
- 在 `base/variables.css` 中添加
- 所有模块可直接使用

---

## 🔧 响应式断点

定义在 `base/responsive.css`：

- **Tablet**: `@media (max-width: 1024px)`
- **Mobile**: `@media (max-width: 768px)`
- **Small Mobile**: `@media (max-width: 480px)`

每个断点包含：
- Header/Footer 调整
- 各 Section 布局变化
- 字号/间距缩放

---

## 📦 复用组件

以下组件可在任意页面复用：

| 组件 | 文件 | 说明 |
|------|------|------|
| Header | `components/header.css` | 包含导航、下拉菜单、搜索 |
| Footer | `components/footer.css` | 包含导航、联系方式、社交图标 |
| Mobile Menu | `components/mobile-menu.css` | 移动端汉堡菜单 |
| Fixed Buttons | `components/buttons.css` | 右侧固定按钮（返回顶部/微信） |

---

## ⚠️ 注意事项

1. **不要直接修改 `style.css.backup`**  
   这是旧文件备份，仅供参考

2. **新增样式优先考虑复用**  
   - 通用组件 → `components/`
   - 页面区块 → `sections/` 或 `pages/`
   - 全局变量 → `base/variables.css`

3. **响应式样式集中管理**  
   所有断点统一在 `base/responsive.css`，避免分散

4. **CSS 变量命名规范**  
   - 颜色：`--hy-red`, `--zinc-400`
   - 间距：`--spacing-*`（未来扩展）
   - 圆角：`--rounded-*`

---

## 🚀 性能优化

- Vite 自动处理 `@import`，生产环境会合并压缩
- 按需加载：不同页面可引入不同模块组合
- 未使用的样式不会影响性能（Tree-shaking）

---

## 📝 迁移记录

**2026-03-10**
- 从单文件 `style.css` (3257 行) 拆分为模块化架构
- 保留原文件为 `style.css.backup`
- 创建 `main.css` 作为新入口
- 更新 `src/main.jsx` 引用路径
