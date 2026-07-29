# 红运官网后端 CMS 整体方案

> 版本：V1.2  
> 日期：2026-07-28  
> 范围：产品、行业方案、新闻三大内容模块，以及支撑它们的分类、案例、技术数据、媒体、SEO、表单和发布流程。  
> 原则：首期接入不改变当前前端内容、页面结构和视觉样式。

V1.2 修订内容：在逐个复核当前全部产品、行业方案和新闻详情页后，补齐首屏、功能项、设备卡、复杂案例章节、证据网格、原始图表数据、复杂表格、询盘上下文和迁移来源优先级；将现有 TSI 数据图表从后续能力提升为首期能力，并明确可见占位内容的迁移规则。

## 1. 结论

红运官网不适合采用“每种详情页一套固定模板”，也不适合只给产品或行业方案增加一个大富文本字段。

推荐模型是：

1. **稳定主实体**：产品、行业方案、新闻只保存列表与检索必需的稳定字段。
2. **可编排内容区块**：详情页按实际需要组合图文、视频、特点、设备、参数表、案例、图表等区块；内容少的页面只放一两个区块，内容多的页面可以继续扩展。
3. **结构化技术数据**：规格表、实验数据、图表数据不能塞进富文本，使用可校验、可复用的数据集。
4. **受控特殊渲染器**：极少数特别复杂的实验/验证页面允许使用有版本、有数据结构的特殊区块，但不允许 CMS 输入任意 HTML、JSX 或 CSS。
5. **前端渲染注册表**：CMS 只决定内容和区块顺序，现有 React 组件决定最终视觉，首期因此可以保持所有页面内容和样式不变。

技术架构建议沿用 aohong 新后端的整体蓝图，并吸收 DCPT 已验证的 BFF、安全和 DTO 做法：

- Strapi 5 Community，实施时锁定精确版本，不使用浮动版本
- Node.js 20 LTS、pnpm 9.15.9 workspace
- MySQL 8 生产库，SQLite 仅本地开发
- 独立 Nitro/H3 BFF，复用 aohong/DCPT 的 Nuxt Server API 编程模型，同时保留当前 Vite React
- Nginx、PM2
- 对象存储/CDN
- 浏览器只访问同源 `/api/*`，不直接访问 Strapi
- Strapi 仅监听 `127.0.0.1:1337`

版本基线：

| 项目 | 选择 |
| --- | --- |
| Node.js | 20 LTS |
| pnpm | 9.15.9 |
| Strapi | 以 DCPT 当前 5.51.0 为候选基线，完成 CMS build/start、迁移和依赖审计后冻结 lockfile |
| BFF | 独立 Nitro/H3；从 DCPT 当前 lockfile 提取兼容版本并锁定 |
| 数据库 | MySQL 8 |

aohong 当前的 Strapi 5.48.1、Nuxt 3.13.1 和 DCPT 当前的 Strapi 5.51.0、Nuxt 4.4.8 不能在红运项目中混装。红运主要复用 aohong 的工程蓝图、数据迁移和 CMS 配置思路，BFF 安全与 DTO 复用 DCPT 做法，最终依赖只保留一套经过构建、启动和审计验证的精确版本。

## 2. 现有内容审查

### 2.1 产品详情页

当前产品列表包含 30 个分类展示位，但不是 30 个完全独立的产品。例如双行星动力混合机同时出现在新能源、固态电池和化工分类。因此产品和分类不能继续采用 aohong/DCPT 当前的单一 `manyToOne` 关系。

| 页面类型 | 当前条目 | 实际内容结构 |
| --- | --- | --- |
| 系列/多型号复杂页 | 双行星动力混合机生产型、中试型、实验型 | 介绍视频、三视图、特点、复杂型号参数表、多个客户案例 |
| 带技术验证页 | 捏合机 | 介绍、三视图、流体仿真、黏度/剪切应力图表、13 列参数 |
| 标准参数页 | 高速分散机、管线分散机、CP 分散机、干法电极混合机 | 介绍、三视图、特点或参数表，但表头完全不同 |
| 简版详情页 | CP 罐 A/B、双螺杆制浆机、电磁给料机、多功能混合机 | 图片、要点、部分三视图，部分参数待补 |
| 极简详情页 | 双螺杆干法挤出机、固态电解质涂布机、固态管线混合机、高压清洗机、喷嘴 | 只有标题、图片和少量说明 |
| 化工通用页 | 往复式混合机、双柱行星机、蝶式混合机、行星动力混合机、立式捏合机、压料机、翻缸机、洗桶机、反应釜、储罐 | 多数只有主图与标题，少数有三视图 |
| 通用兜底页 | 其他历史或隐藏条目 | 固定“介绍/部件/参数/CTA”结构，只适合作为迁移来源，不适合作为未来 CMS 模型 |

关键发现：

- 一个产品可以属于多个分类，而且在不同分类中排序、推荐状态可能不同。
- 三个双行星产品是同一系列的不同型号范围，存在共享资料和共享参数数据。
- 参数表从 5、6、8、13 列到分组表头都有，不能使用固定 `label/value/unit` 规格组件。
- “三视图”“普通画廊”“实验结果图”看起来都是图片，但业务语义不同，后台编辑体验也应不同。
- 当前部分内容是“待补充/暂无参数”，CMS 必须允许不添加对应区块，而不是生成空栏目。

### 2.2 行业方案详情页

当前公开路由有 7 个重点方案：

| 行业方案 | 内容复杂度 | 特有内容 |
| --- | --- | --- |
| PD 制浆 | 高 | 视频、三视图、特点、核心设备、20 行型号参数、3 组客户案例 |
| 循环制浆 | 很高 | 核心设备、参数、来料、流变、稳定性、SEM 等验证材料 |
| 管线制浆 | 极高 | 磷酸铁锂/NCA/石墨三套材料体系，TSI、稳定性、流变、SEM 等大量结果 |
| 双螺杆制浆 | 极高 | 正负极验证、稳定性表、TSI、流变、SEM、EDS 能谱数据 |
| 干法电极系统 | 中高 | 优势、3 台核心设备、13 列参数 |
| 湿法电极系统 | 中 | 复合系统图片、特点/设备/参数/案例部分待补 |
| 化工自动生产线 | 中高 | 视频、6 个特点、11 台核心设备、视频案例 |

另有通用方案页及隐藏行业数据。通用页可以继续作为历史内容迁移来源，但不能成为所有方案的强制模板。

关键发现：

- 行业方案不仅是普通介绍页，本质上还承担“系统方案 + 关联设备 + 技术验证 + 客户案例”的知识载体。
- 同一产品和同一参数数据会在产品页、方案页重复出现；例如 PD 方案和双行星设备存在共享型号信息。
- 管线制浆和双螺杆制浆中的实验材料远超普通富文本能力。
- 行业、方案、产品是三个不同概念：行业是导航分类，方案是可发布详情实体，产品是被方案引用的设备。

### 2.3 新闻详情页

当前新闻已经实际使用：

- 普通段落
- 加粗段落
- 小节标题
- 单图
- 图片轮播
- 引用

因此新闻也不应退化为单个富文本字段，否则图片轮播、引用样式和未来专题内容会丢失。新闻可使用比产品/方案更精简的一组内容区块。

## 3. 总体系统架构

```text
Browser
  │
  ├─ 静态页面与资源 ─────────────────┐
  │                                │
  └─ /api/cms/*                    │
                 │                 │
              Nginx                │
          ┌──────┴──────┐          │
          │             │          │
      React/Vite    Nitro/H3 BFF    │
                        │           │
                  127.0.0.1:1337    │
                        │           │
                    Strapi 5 ─── MySQL 8
                        │
                  对象存储/CDN
```

建议仓库最终整理为：

```text
hongyun-platform/
  apps/
    web/                 # 现有 React/Vite 前端，不重做视觉
    api/                 # Nitro/H3 BFF，同源 API、DTO、缓存、表单
    cms/                 # Strapi 5
  packages/
    contracts/           # 前后端共享 TypeScript 类型与 Zod 校验
  scripts/
    migration/           # 现有 JSX/data 文件到 CMS 的幂等迁移
  docs/
```

如果暂时不移动前端仓库，也可以先建立 `hongyun-backend`，内部保留 `apps/api`、`apps/cms` 和 `packages/contracts`；架构原则不变。

### 为什么需要独立 BFF

当前前端是 Vite React，不具备 Nuxt 的服务端路由。单独的 Nitro/H3 BFF 用来复刻 aohong/DCPT 的正确边界：

- 隐藏 Strapi 地址、Token 和内部字段。
- 把 Strapi 数据转换为前端稳定 DTO。
- 精确 populate 所需关系，避免全量展开和慢查询。
- 对动态区块进行白名单过滤和运行时校验。
- 承担表单校验、限流、蜜罐、文件检查。
- 提供缓存、超时、错误语义和后续预览能力。

前端不能直接访问 Strapi，也不能把 Strapi Token 打进 Vite 环境变量。

Hono 本身也能胜任，但它不是 aohong/DCPT 当前显式使用的 BFF 层。为降低学习、测试和迁移成本，V1.2 选定 Nitro/H3，不再把 Hono 作为默认方案。

## 4. CMS 信息架构

后台一级菜单保持业务人员容易理解的三个主模块：

1. **产品中心**
2. **行业方案**
3. **新闻中心**

支撑数据放在“内容资源”和“系统设置”中，不与三大主模块争夺一级认知：

- 产品分类
- 产品系统分组
- 行业分类
- 新闻分类
- 客户/技术案例
- 技术数据集
- URL 别名
- 媒体资源
- 首页、关于我们、合作伙伴、全球布局
- 导航、页脚、SEO 与站点设置
- 留资/简历记录

### 4.1 产品 `product`

稳定字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | 产品名称 |
| `slug` | UID | 产品唯一标识，不依赖中文名称 |
| `model` | string optional | 型号或系列简称 |
| `summary` | text optional | 列表摘要 |
| `cover` | media | 列表主图 |
| `hero` | component | 详情首屏配置，包含标题、副标题、桌面/移动媒体和受控展示参数 |
| `placements` | relation | 分类展示位，见下文 |
| `family` | relation optional | 产品系列 |
| `relatedProducts` | relation | 相关产品 |
| `sections` | dynamic zone | 详情内容区块 |
| `seo` | component | SEO |
| `legacyKey` | string | 迁移幂等键 |
| `urlAliases` | relation | 一个产品可对应多个现有路径 |
| `order` | integer | 无分类上下文时的默认排序 |
| `publishedAt` | system | Strapi Draft & Publish |

红运产品列表实际存在“分类 → 系统分组 → 产品”的三级结构。新增 `product-group`：

| 字段 | 说明 |
| --- | --- |
| `name` / `slug` | 系统分组名称与标识 |
| `category` | 所属产品分类 |
| `relatedSolution` | 可选，对应行业方案 |
| `order` | 分类中的顺序 |
| `visible` | 是否在产品列表显示 |

例如新能源分类下的“双行星动力制浆系统、高效管线式制浆系统、高速循环制浆系统、双螺杆连续制浆系统”，以及固态电池下的干法/湿法工艺设备。化工和辅助设备当前不分组，展示位的 `group` 允许为空。

产品与分类之间使用中间实体 `product-placement`，不要只用 many-to-many：

| 字段 | 说明 |
| --- | --- |
| `product` | 关联产品 |
| `category` | 关联分类 |
| `group` | 可选，关联产品系统分组 |
| `order` | 该分类中的排序 |
| `featured` | 是否重点展示 |
| `displayNameOverride` | 极少数分类下需要不同展示名时使用 |
| `coverOverride` | 极少数分类下需要不同列表图时使用 |
| `imageFit` | `contain` / `cover`，保持当前设备图展示方式 |
| `imagePosition` | 受控枚举，不允许输入 CSS |
| `cardVariant` | 受控枚举，用于现有卡片尺寸差异 |

这样可正确表达双行星混合机跨新能源、固态电池、化工展示，保留分类内系统分组、独立排序和现有图片呈现方式。

### 4.2 产品系列 `product-family`

用于管理生产型、中试型、实验型等共享资料：

- `name`
- `slug`
- `summary`
- `sharedMedia`
- `sharedDatasets`
- `products`

系列不是必须展示为独立前台页面。普通产品不需要关联系列。双行星系列等真正共享大量资料的产品才使用，避免为了“统一”而增加所有产品的编辑负担。

### 4.3 URL 别名 `url-alias`

单个 `legacyPath` 无法覆盖同一产品的多个有效入口。统一使用 URL 别名实体：

| 字段 | 说明 |
| --- | --- |
| `path` | 完整站内路径，全局唯一 |
| `targetType` | product / solution / article / page |
| `product` / `solution` / `article` | 三个可选关系中必须且只能填写一个 |
| `pageKey` | `targetType=page` 时使用的受控页面标识 |
| `locale` | 路径所属语言 |
| `canonical` | 是否为规范地址；同一目标同一语言只能有一个 |
| `redirectCode` | 不再直接展示时使用 301/302 |
| `active` | 是否启用 |

发布校验必须保证只存在一个目标关系。数据库迁移增加 `path + locale` 唯一索引，不能只依赖 Strapi 表单校验。BFF 使用完整路径解析目标、分类上下文、面包屑和 canonical。双行星产品可以保留新能源与固态电池两个现有入口，新闻继续兼容当前 `/news/:id`。

### 4.4 行业 `industry`

行业只负责导航、列表和聚合：

- `name`
- `slug`
- `summary`
- `cover`
- `icon`
- `order`
- `solutions`
- `seo`
- `urlAliases`

例如：新能源、固态电池、化工，以及未来启用的胶黏剂、烟火药、食品、医药、化妆品、电子等。

### 4.5 行业方案 `solution`

方案才是详情页实体：

| 字段 | 说明 |
| --- | --- |
| `name` / `slug` | 名称与唯一标识 |
| `industry` | 所属行业 |
| `summary` / `cover` / `hero` | 列表和首屏 |
| `equipment` | 有序关联核心产品 |
| `relatedSolutions` | 相关方案 |
| `sections` | 详情内容区块 |
| `seo` | SEO |
| `legacyKey` / `urlAliases` | 迁移和现有 URL |

核心设备使用 `solution-equipment` 中间实体，而不是普通产品卡关系：

| 字段 | 说明 |
| --- | --- |
| `solution` / `product` | 所属方案与可选产品关系 |
| `order` / `visible` | 排序和显示状态 |
| `titleOverride` / `summaryOverride` | 当前方案语境下的标题、摘要覆盖 |
| `mediaOverride` / `altOverride` | 临时设备或方案专用图片 |
| `features` | 当前页实际存在的要点列表 |
| `paragraphs` | 带可选小标题的设备说明段落 |
| `showProductLink` | 是否显示“查看产品” |
| `imageFit` / `imagePosition` / `mediaSize` | 白名单展示参数 |
| `cardVariant` | 映射现有设备横卡、竖卡等受控渲染器 |

编辑规则采用“产品关系优先、显式覆盖兜底”：已建立产品时默认读取产品名称和图片；只在当前方案确实有专用文案或图片时填写覆盖值。CMS 不保存现有代码里的 `imgStyle`、组件名或 CSS。发布产品变更时，后台必须列出会受影响的方案设备卡。

### 4.6 新闻 `article`

- `title`
- `slug`
- `category`
- `excerpt`
- `cover`
- `publishedDate`
- `author` optional
- `blocks`
- `featured`
- `seo`
- `legacyId` / `urlAliases`

新闻列表和详情使用不同 DTO，列表接口绝不返回正文区块。

新闻分类 `article-category` 独立管理：

- `name`
- `slug`
- `description`
- `order`
- `seo`

### 4.7 案例 `case-study`

案例应成为可复用实体，而不是复制到每个产品和方案正文：

- `title`、`slug`
- `caseType`：客户案例 / 项目案例 / 技术验证
- `summary`、`cover`
- `relatedProducts`
- `relatedSolutions`
- `customerName` optional
- `confidentialityLevel`
- `sections`
- `publishedDate`
- `seo`

这可以承载 PD、循环、管线、双螺杆页面中的客户和实验验证资料，并允许同一案例同时出现在产品页与方案页。

复杂技术案例不能在 Strapi Component 内再嵌套任意 Dynamic Zone。为适配管线制浆的 LFP/NCA/石墨和双螺杆的正极/负极层级，增加 `case-chapter` Collection Type：

| 字段 | 说明 |
| --- | --- |
| `caseStudy` | 所属案例 |
| `title` / `slug` | 章节名与稳定标识 |
| `summary` | 材料体系或验证章节说明 |
| `order` / `visible` | 排序和显示状态 |
| `sections` | 本章节顶层 Dynamic Zone |

最终层级固定为“案例 → 有序章节 → 有序区块”，不做无限嵌套。PD 产品页和 PD 方案页当前相同的 3 组案例应引用同一批 `case-study`，不复制图片和文案。

### 4.8 技术数据集 `technical-dataset`

用于复用和校验复杂表格/图表：

- `title`
- `kind`：`spec-table` / `experiment-table` / `chart-data` / `eds-data`
- `schemaVersion`
- `columns` JSON
- `headerGroups` JSON optional
- `rows` JSON
- `chartConfig` JSON optional
- `unitNotes`
- `sourceFile` optional
- `legacyKey`
- `version`
- Content Type 选项 `draftAndPublish: true`

选择 JSON 不是为了方便随意填写，而是因为当前表格列数、分组表头和数据类型确实不固定。每个 `kind + schemaVersion` 必须在 BFF/CMS 生命周期中通过 Zod 校验：

- 列 ID 唯一
- 每行只引用合法列
- 必填值完整
- 数字/文本类型正确
- 分组表头引用的列存在
- 图表横纵轴长度一致
- 表格 `rowSpan/colSpan` 不越界，分组表头和行分组合法
- 图表 series 长度、数值范围、单位、基准线和颜色令牌合法

业务文案、图片和关系仍使用强类型字段，不应全部塞进 JSON。

JSON 只是存储格式，不直接作为日常编辑界面。首期必须同时提供：

- CSV/XLSX 导入、模板下载和导出
- 导入前列映射、单位检查和错误预览
- CMS 内只读表格预览
- 小数据量的可视化单元格编辑
- 保存、发布前的同一套 Zod 校验

`content.data-table` 不只关联数据集，还保存 `datasetView`：

- `includedRowKeys` 或受控筛选条件
- 列显示顺序
- 列标题覆盖
- 当前引用的数据集版本
- 表头层级、行分组、合计/高亮行和脚注显示规则

现有表格需要完整支持：

- 多级/分组表头、`rowSpan`、`colSpan`
- 中英文双行标题 `label/subLabel`
- 普通、高亮、合计三种受控单元格/行角色
- 单元格单位、说明和空值显示符
- 移动端仍按现有顺序横向滚动，CMS 不决定 CSS

`kind=chart-data` 首期即启用，不放到 P2。结构至少包含：

- `chartType`：柱状图/折线图等白名单
- `categories` / `groups`
- `series[]`：稳定 key、标签、颜色令牌和数值
- `xAxis` / `yAxis`：单位、最小值、最大值、刻度
- `benchmark` / `threshold` optional
- `caption` / `rendererVariant`

管线制浆和双螺杆制浆当前代码中的 TSI 原始数组必须迁入该数据集，由现有 React 图表渲染器消费；颜色只允许设计令牌 key，不允许任意 CSS 色值。

这样双行星生产型、中试型、实验型可以引用同一个型号数据集，但只展示各自型号范围。

技术数据集更新不能绕过页面审核。发布数据集时必须：

1. 找出所有引用产品、方案和案例。
2. 生成影响清单供发布人确认。
3. 发布后失效所有关联详情、列表、搜索和 sitemap 缓存。
4. 记录数据集版本，支持回滚到上一发布版本。

### 4.9 基础内容

基础内容不与三大业务模块混在一起，但必须纳入首期模型：

| Content Type | 类型 | 主要内容 |
| --- | --- | --- |
| `site-setting` | Single Type | 公司名称、电话、邮箱、地址、备案、默认 SEO |
| `home-page` | Single Type | 轮播、品牌介绍、重点产品/方案、合作伙伴引用 |
| `about-page` | Single Type | 企业介绍、发展历程、荣誉、全球布局引用 |
| `navigation` | Single Type | 主导航、页脚导航及受控内部链接 |
| `form-setting` | Single Type | 询盘行业选项、联系说明和响应时效 |
| `partner` | Collection Type | 合作伙伴名称、Logo、顺序 |
| `global-presence` | Collection Type | 国家/地区、坐标、展示信息 |

首页与关于我们首期只迁移当前已确认内容，不借 CMS 接入之机改写文案或调整前端结构。

## 5. 详情页区块设计

### 5.1 页面首屏与媒体

产品和方案主实体使用 `shared.page-hero`：

| 字段 | 说明 |
| --- | --- |
| `titleOverride` | 为空时使用实体名称 |
| `subtitle` | 当前页面副标题 |
| `desktopMedia` / `mobileMedia` | 桌面和可选移动端背景 |
| `mediaType` | image / video |
| `imagePosition` | 白名单位置或焦点 |
| `overlay` | none / light / dark 等受控枚举 |
| `showScrollIndicator` | 是否保留现有下滑提示 |

媒体项统一包含 `media`、`alt`、`caption/label`、`role`、`imageFit`、`imagePosition` 和可选 `aspectVariant`。三视图、普通画廊、案例图和复合设备图因此共享媒体基础字段，但仍通过语义化区块区分，不能只看“都是图片”就混成一个媒体数组。

### 5.2 通用内容区块

| 区块 | 用途 |
| --- | --- |
| `content.rich-text` | 普通说明、段落、小标题、引用 |
| `content.media-text` | 图文介绍，支持媒体左右布局 |
| `content.video` | 产品/方案视频、封面、字幕和说明 |
| `content.media-gallery` | 普通画廊、三视图、轮播；用受控 `variant` 区分 |
| `content.feature-grid` | 产品特点、方案优势 |
| `content.data-table` | 关联技术数据集，展示参数或实验表 |
| `content.equipment-grid` | 行业方案中的核心设备 |
| `content.case-list` | 关联一个或多个案例 |
| `content.cta` | 默认使用全站 CTA，仅在需要时覆盖 |

每个区块都有少量公共控制字段：

- `internalName`：后台识别名
- `anchor`：页面锚点
- `visible`
- `eyebrow` / `title`
- `layoutVariant`：从白名单选择
- `theme`：从白名单选择

区块顺序由 Dynamic Zone 自身顺序决定。CMS 不得输入 Tailwind 类名、CSS、JSX 或脚本。

`content.feature-grid` 的功能项必须结构化：

- `iconKey`：映射前端现有 SVG 图标注册表；后台不存 SVG/React 组件名
- `iconMedia`：只有当前内容实际使用图片图标时填写
- `title`
- `description`
- `bullets[]`：管线制浆等页面当前存在的嵌套要点
- `order`

`iconKey` 与 `iconMedia` 二选一。区块的 `columns/layoutVariant` 只使用与现有页面对应的白名单值，保证接入 CMS 后不改变布局。

新闻正文使用精简且明确的 `article.blocks`：段落、加粗段落、小节标题、单图、有序图片轮播和引用。标题级别、引用署名、图片 alt/caption 都是结构化字段，不使用一个巨大富文本吞掉轮播。

### 5.3 技术证据区块

| 区块 | 用途 |
| --- | --- |
| `technical.chart-gallery` | TSI、流变、稳定性、SEM 等图片型结果 |
| `technical.metric-chart` | 关联 `chart-data`，渲染当前已有 TSI 等原始数据图 |
| `technical.simulation-gallery` | 捏合机流体仿真等内容 |
| `technical.report-section` | 实验背景、过程、结果、结论的结构化章节 |
| `technical.evidence-grid` | 组合图片、图表、表格、文字和 SEM/EDS 证据卡 |

材料体系不再做可递归嵌套的 `technical.material-system`，而是用 `case-chapter` 表达 LFP/NCA/石墨或正极/负极，再在章节内使用上述区块。

`technical.evidence-grid` 用来还原管线/双螺杆页面中一行多列、图表与图片混排的证据区域。网格项仅允许以下类型：

- 单图、双图
- 指标图表
- 数据表
- 文字/要点
- SEM/EDS 组合

每项保存标题、说明、媒体/数据集关系、`span`（1/2/3）和受控 `layoutVariant`。它解决真实的复合排版，但仍不允许任意 HTML 或 CSS。

### 5.4 特殊页面逃生口

管线制浆和双螺杆制浆目前存在非常特殊的技术验证排版。若首期通用区块无法 1:1 还原，可增加：

```text
special.renderer
  rendererKey: enum
  schemaVersion: integer
  payload: JSON
```

允许的 `rendererKey` 由代码白名单控制，例如：

- `pipeline-material-validation-v1`
- `twin-screw-validation-v1`

每个 key 都有独立 Zod schema 和现有 React 渲染组件。它是迁移逃生口，不是日常编辑方式；禁止使用“任意 HTML”代替。

经过本轮逐页复核，绝大多数复杂内容已经可以由 `case-chapter + evidence-grid + metric-chart + data-table` 表达。`special.renderer` 只在截图回归证明仍无法 1:1 还原时启用，不能成为管线/双螺杆页面的默认建模方式。

## 6. 页面不是模板，而是内容配置

建议在 CMS 中提供三个“编辑预设”，帮助运营创建内容，但不限制最终结构：

- **极简型**：首图 + 介绍
- **标准型**：介绍 + 画廊 + 特点 + 参数
- **研究型**：介绍 + 设备 + 参数 + 案例/技术验证

预设只是在创建时插入推荐区块，不是前端固定模板。编辑者可以删除、增加、排序，页面不会因缺少某一块而出现空标题或“待补充”占位。

因此：

- 喷嘴可只有首图。
- 挤出机可只有首图和 4 个要点。
- 双行星可以拥有完整规格和案例。
- 管线制浆可以拥有多个材料体系和数十个实验区块。

它们仍由同一个详情 API 和渲染注册表驱动。

## 7. BFF API 设计

建议前台只依赖以下稳定接口：

```text
GET  /api/cms/product-categories
GET  /api/cms/products?category=&group=&page=&pageSize=
GET  /api/cms/products/:slug?category=

GET  /api/cms/industries
GET  /api/cms/industries/:slug/solutions
GET  /api/cms/solutions/:slug

GET  /api/cms/news?category=&page=&pageSize=
GET  /api/cms/news/:idOrSlug

GET  /api/cms/search?q=&types=&page=&pageSize=
GET  /api/cms/resolve?path=
GET  /sitemap.xml

POST /api/cms/contact
POST /api/cms/resume
```

继续保留当前前端已经调用的 `/api/cms/contact` 和 `/api/cms/resume`，不为了路径整洁修改现有前端调用。

详情 DTO 共享基础外壳，但不能强行统一所有业务字段：

```ts
type BaseDetailDto = {
  documentId: string
  slug: string
  title: string
  summary?: string
  hero: PageHeroDto
  breadcrumbs: BreadcrumbDto[]
  sections: SectionDto[]
  seo: SeoDto
  canonicalPath: string
  updatedAt: string
}

type ProductDetailDto = BaseDetailDto & {
  kind: 'product'
  categoryContext?: CategoryContextDto
  placements: ProductPlacementDto[]
  family?: ProductFamilySummaryDto
  relatedProducts: ProductCardDto[]
}

type SolutionDetailDto = BaseDetailDto & {
  kind: 'solution'
  industry: IndustrySummaryDto
  equipment: SolutionEquipmentDto[]
  relatedSolutions: SolutionCardDto[]
}

type ArticleDetailDto = BaseDetailDto & {
  kind: 'article'
  category: ArticleCategoryDto
  publishedDate: string
  author?: string
  previous?: ArticleNavDto
  next?: ArticleNavDto
  related: ArticleCardDto[]
}
```

`sections` 是带判别字段的联合类型：

```ts
type SectionDto =
  | { type: 'rich-text'; /* ... */ }
  | { type: 'media-text'; /* ... */ }
  | { type: 'video'; /* ... */ }
  | { type: 'media-gallery'; /* ... */ }
  | { type: 'feature-grid'; /* ... */ }
  | { type: 'data-table'; /* ... */ }
  | { type: 'metric-chart'; /* ... */ }
  | { type: 'evidence-grid'; /* ... */ }
  | { type: 'equipment-grid'; /* ... */ }
  | { type: 'case-list'; /* ... */ }
  | { type: 'special-renderer'; /* ... */ }
```

BFF 负责：

- slug、完整 path、搜索词、分页、locale 参数校验
- 仅 populate 接口需要的字段
- 媒体 URL、alt、尺寸标准化
- Strapi Dynamic Zone 到稳定 DTO 的转换
- 未知区块拒绝或安全忽略并记录日志
- 5 秒读取超时、8 秒写入超时
- 正确区分 404、参数错误、CMS 不可用；CMS 502 不能伪装成空列表
- 列表短缓存、详情较长缓存、ETag/Last-Modified
- Strapi 发布 webhook 主动失效缓存

`product-categories` 返回适合当前产品列表页的嵌套 DTO：

```text
category
  groups[]
    placements[]
  ungroupedPlacements[]
```

搜索首期覆盖产品、行业方案和新闻。它必须与 CMS 同步，不能继续依赖打包进前端的本地数组，也不能等到 P2，否则 CMS 新发布的内容无法被搜索。

新闻详情接口由 BFF 一次性计算上一篇、下一篇和相关阅读，避免前端为了侧栏下载全部新闻正文。

产品/方案详情页的技术询盘要记录用户是从哪一页提交，而不是只保存固定的 `technical-inquiry`：

```ts
type InquiryContext = {
  contextType: 'product' | 'solution' | 'page'
  contextDocumentId?: string
  contextPath: string
  referrer?: string
  utm?: Record<string, string>
}
```

前端只提交当前 path 和可选 documentId；BFF 通过 URL 别名重新解析目标并保存标题快照，不能相信浏览器自行提交的产品/方案名称。行业下拉选项、联系说明和响应时效放入 `form-setting` Single Type，DTO 保持与当前表单 UI 一致，首期不改变字段和样式。

### 7.1 缓存依赖

缓存不能只按当前 URL 删除。发布 webhook 需要维护以下依赖规则：

- 产品变化：清理产品详情、所属分类、所属方案设备卡、搜索、sitemap。
- 产品系统分组/展示位变化：清理对应产品分类和导航聚合。
- 行业方案变化：清理方案详情、行业列表、关联产品页、搜索、sitemap。
- 新闻变化：清理新闻列表、当前文章、相邻文章、相关阅读、搜索、sitemap。
- 案例/技术数据集变化：清理所有引用它们的产品、方案和案例。
- 站点设置/导航变化：清理全部使用全局数据的页面缓存。

首期可以采用“按内容域批量清理”换取正确性，不必一开始实现复杂缓存依赖图。发布 webhook 使用独立密钥、时间戳和签名，拒绝重放请求。

## 8. 发布、权限与安全

### 8.1 发布

- 产品、方案、新闻、案例开启 `draftAndPublish`
- 技术数据集开启 `draftAndPublish`，产品系统分组和展示位随其关联内容一起校验
- 默认中文，预留 Strapi 原生 i18n；英文未就绪时不强制上线
- 提供预览 URL，只允许带签名、短时效预览令牌
- 发布前校验：
  - slug 唯一，URL 别名满足 `path + locale` 唯一
  - 必需主图及 alt
  - 关联对象存在且已发布
  - 表格列/行匹配
  - 案例章节顺序和证据网格引用完整
  - 功能项 `iconKey/iconMedia` 合法且媒体 alt 完整
  - 原始图表 series、坐标轴、单位和颜色令牌通过 schema 校验
  - 特殊 renderer payload 版本正确
  - 不存在空区块和失效媒体

Strapi Community 首期不依赖 Enterprise Review Workflows。角色和流程按 Community 能力设计：

- Content Editor：录入和修改草稿，不持有生产服务 Token。
- Publisher：人工确认内容清单后发布/下线。
- Administrator：模型、权限、备份和系统配置。

审核动作首期采用“草稿预览链接 + 线下确认记录”。如果以后采购 Strapi Enterprise，再启用 Reviewer 阶段、Review Workflows、按阶段 RBAC、内容历史或批量 Release；Community 方案不能把这些付费能力作为上线前提。

### 8.2 Strapi 边界

- Strapi 监听 `127.0.0.1:1337`
- 后台管理路径通过 Nginx、HTTPS、IP/VPN 或额外认证保护
- CORS 使用明确 allowlist
- 前台浏览器不持有 Strapi Token
- Public Role 最小化；推荐读写都由 BFF 的不同服务 Token 完成
- 表单写 Token 与内容读 Token 分离

### 8.3 表单和文件

沿用 DCPT 更严格的方式：

- Public Role 不开放联系表单、简历记录的 create
- BFF 校验字段、蜜罐、IP/指纹限流、请求体大小
- 简历检查 MIME、扩展名、文件签名与大小
- 简历文件放私有对象存储，不进入公开媒体库
- 后台只保存私有文件 key 和业务记录，下载使用短时签名 URL
- 日志不记录完整手机号、邮箱、简历内容和 Token

简历与个人信息增加以下强制策略：

- 保存期限由业务确认，默认建议 180 天；到期自动删除数据库记录和私有文件。
- 后台列表默认掩码显示手机号和邮箱。
- 只有授权招聘人员可生成简历下载签名 URL。
- 下载、删除和延期保留必须写入审计记录。
- 文件上传后进入隔离区，恶意文件扫描通过后才可供后台下载。
- 删除数据库记录必须通过同一服务同步删除对象存储文件，定期扫描孤儿文件。
- 备份中的个人信息按同样保存期限滚动过期。

### 8.4 i18n 规则

- 中文 `zh` 为默认语言；英文 `en` 只有完成翻译并通过预览后才发布。
- 产品、方案、新闻、案例的名称、摘要、正文区块和 SEO 按语言本地化。
- 产品型号、技术数据数值和媒体文件默认跨语言复用；单位标题、列标题和说明按语言本地化。
- URL 别名带 `locale`，每个目标每种语言只能有一个 canonical。
- 前台请求不自动把缺失英文正文回退为中文，避免英文页面混入中文；返回明确的 404 或未发布状态。
- BFF 缓存键必须包含 locale。

## 9. 数据迁移方案

### 阶段 0：建立内容映射清单

为每个现有路由建立：

- `legacyKey`
- `urlAliases`
- 目标实体
- 分类、系统分组和展示位
- 区块顺序
- 媒体清单
- 图片 `contain/cover`、位置和卡片变体
- 关联产品/方案/案例
- 数据来源文件与校验摘要
- 实际命中的 React 页面组件和来源优先级
- 可见占位内容的处理决定与确认人

客户已确认的产品数据作为迁移真值，不改文案事实。迁移来源必须按当前路由真实命中顺序确定：

1. `App.jsx` 的路由先后顺序决定某个 URL 实际使用哪个详情组件。
2. 产品列表、系统分组、排序和展示位以 `productCategories.js` 为准。
3. 已有专用产品/方案详情组件时，以专用组件内当前可见内容为详情真值。
4. 化工 10 个通用产品以 `ChemicalProductDetailPage` 的当前数据为准。
5. `ProductDetailPage`、`SolutionDetailPage` 中被专用路由遮蔽的重复数据不合并；未公开条目只可迁为草稿，业务确认后才能发布。
6. 新闻以 `newsData.js` 及当前新闻详情渲染规则为准。

代码注释、TODO 和不可见开发标注不迁入 CMS。页面上当前可见的占位内容则逐项处理，不能一刀切：

- “待补特点/参数/案例”等明显未完成栏目：首期不创建区块，或保存为隐藏草稿，不发布空栏目。
- 喷嘴缺少正式图片：允许产品只有标题和空媒体，前端继续使用现有缺图回退；不能把代码占位图当正式素材上传。
- 化工自动生产线“请联系我们获取规格”等具备真实业务含义的可见内容：迁为 `content.cta/callout`，不能按 TODO 丢弃。
- 每一项例外写入迁移决定清单，截图验收时确认页面可见内容与当前线上基线一致。

### 阶段 1：搭建 CMS、BFF、contracts

- 复用 aohong 的 Strapi 5、数据库、环境配置、PM2/Nginx、i18n、SEO 和 bootstrap 思路
- 复用 DCPT 的显式 populate、DTO 映射、超时、slug 校验和表单安全
- 新增红运专属动态区块、产品系统分组、分类展示位、URL 别名、案例和技术数据集

### 阶段 2：先迁列表数据

先迁：

- 产品分类、产品系统分组、行业和新闻分类
- 产品/方案/新闻稳定字段
- 基础内容
- 封面、slug、排序、URL 别名和图片展示参数

并逐条对比现有列表页，确保数量、顺序、标题、图片、链接完全一致。

### 阶段 3：迁详情内容

按风险从低到高：

1. 极简产品
2. 标准产品
3. 新闻
4. 普通行业方案
5. 双行星/PD
6. 循环/管线/双螺杆复杂技术页

迁移脚本使用 Strapi 5 Document Service API，以 `legacyKey` 幂等 upsert；每条内容记录源文件校验摘要，重复执行不会制造副本。

复杂技术数据不直接从 JSX 文本正则解析后发布。先转换为版本化迁移清单 JSON/CSV，经列数、行数、媒体存在性和抽样人工对比后，再写入 CMS。

### 阶段 4：前端双读与逐页切换

- 新增区块渲染注册表，直接复用当前 React 组件和 className
- 保留当前 `/api/cms/contact`、`/api/cms/resume` 和所有公开页面路径
- 开发环境支持 CMS/本地数据双读
- CMS 失败时的本地回退只用于迁移期，并记录错误
- 逐路由做截图、文案、表格、媒体和交互对比
- 对 Hero 背景位置、三视图标签、表格合并单元格、图表刻度、证据网格跨列和询盘来源做专项对比
- 验收一页，切换一页；不一次性替换全部详情

### 阶段 5：上线

- 数据库备份与恢复演练
- 对象存储备份和生命周期策略
- 健康检查、结构化日志、错误告警
- CMS 内容冻结窗口和最终增量迁移
- 回滚开关保留一个发布周期
- 明确数据库与媒体的 RPO/RTO；首期建议 RPO 不超过 24 小时、RTO 不超过 4 小时

## 10. 推荐实施优先级

### P0：上线前必须

- Strapi/BFF 私网边界与 Token 隔离
- 产品分类、系统分组、展示位完整关系
- 产品跨分类 `product-placement`
- 产品/方案/新闻稳定模型
- URL 别名、canonical 和完整路径解析
- 动态区块与前端渲染注册表
- Hero、功能项、设备卡和媒体展示参数
- 复杂表格与现有原始图表的导入、预览、校验和版本发布
- `case-chapter` 与 `technical.evidence-grid`，覆盖材料体系和复合证据排版
- 迁移来源优先级清单与可见占位内容决定清单
- 现有表单 API、搜索、新闻上下篇/相关阅读和 sitemap
- 图片 `contain/cover` 等展示参数
- 表单限流、校验、私有简历文件
- 简历保存期限、访问审计、恶意文件扫描和自动删除
- Community 可执行的草稿/发布流程
- 自动备份和恢复验证

### P1：首期应完成

- 产品系列
- 案例复用
- 技术数据集复用
- 草稿预览
- CMS 发布 webhook 缓存失效
- 首页、关于我们、合作伙伴、全球布局和全局设置迁移
- 全量迁移脚本和逐页视觉回归

### P2：内容运营成熟后

- Strapi Enterprise 审核工作流（仅采购后）
- 英文内容批量运营
- 尚未结构化的历史图片型图表逐步补录原始数据
- 内容审核通知
- 独立全文搜索索引；首期先使用数据库查询
- 内容使用关系和失效媒体检查后台

## 11. 不建议的做法

- 不给每个产品/方案单独创建一个 Strapi Content Type。
- 不把整个详情页保存成一段 HTML。
- 不使用一个固定规格组件强行容纳所有参数表。
- 不让 CMS 保存 React 组件名、className 或任意 CSS。
- 不把全部字段塞进一个无 schema 的 JSON。
- 不让业务人员直接维护大型原始 JSON 表格。
- 不按分类复制同一个产品。
- 不用单个 `legacyPath` 表达多个有效入口。
- 不在产品页和方案页重复维护同一客户案例/技术数据。
- 不让浏览器直接访问 Strapi。
- 不把 Strapi Enterprise 审核能力当作 Community 版默认功能。
- 不因为当前某页内容少，就给它补齐虚构的“标准模块”。

## 12. 最终建议

首期目标不是把所有页面“模板化”，而是把已有真实内容完整迁移成可管理、可复用、可校验的数据，同时保持当前前端呈现不变。

最合适的边界是：

- **产品/行业方案/新闻**负责内容主体和发布生命周期；
- **产品系统分组/展示位**负责保持当前列表层级、排序和图片呈现；
- **URL 别名**负责现有路径、分类上下文、canonical 和重定向；
- **内容区块**负责页面长短与顺序差异；
- **案例/技术数据集**负责跨页面复用；
- **受控特殊渲染器**负责极少数无法通用化的复杂实验排版；
- **BFF contracts**负责让 CMS 可以继续演进，而不把 Strapi 数据结构直接泄漏给前端。

V1.2 既继承 aohong 新后端的工程骨架，也吸收 DCPT 的安全边界，同时逐页覆盖红运现有三级产品列表、多路径详情、异构技术数据、复杂技术案例、新闻关联内容和 Community 版发布限制。完成 Schema 设计时应以本版本为准。

## 13. 逐条迁移矩阵

以下矩阵用于证明模型覆盖了当前每一个产品展示位。括号中的区块是首期按现有页面迁入的内容，不代表以后必须一直存在。

### 13.1 新能源行业

| 系统分组 | 产品 | 路由 slug | 首期区块组合 |
| --- | --- | --- | --- |
| 双行星动力制浆系统 | 生产型双行星动力混合机 | `dual-planetary-mixer` | 视频图文、三视图、特点、共享型号参数、3 组案例 |
| 双行星动力制浆系统 | 中试型双行星动力混合机 | `dual-planetary-mixer-mid` | 视频图文、三视图、特点、共享型号参数、3 组案例 |
| 双行星动力制浆系统 | 实验型双行星动力混合机 | `dual-planetary-mixer-lab` | 视频图文、三视图、特点、共享型号参数、3 组案例 |
| 高效管线式制浆系统 | 管线捏合罐 | `kneader` | 图文、三视图、流体仿真、13 列参数 |
| 高效管线式制浆系统 | 管线式高速分散机 | `high-speed-disperser` | 图文、三视图、6 列参数 |
| 高效管线式制浆系统 | 管线分散罐 | `pipeline-disperser` | 图文、三视图、13 列参数 |
| 高速循环制浆系统 | 高速循环高速分散机 | `cp-disperser` | 图文、三视图、8 列参数 |
| 高速循环制浆系统 | 高速循环循环罐 A | `cp-tank-a` | 图文要点、三视图 |
| 高速循环制浆系统 | 高速循环循环罐 B | `cp-tank-b` | 图文要点、两张视图 |
| 双螺杆连续制浆系统 | 双螺杆制浆机 | `twin-screw-pulper` | 图文要点、两张视图；当前无正式参数区块 |

### 13.2 固态电池

| 系统分组 | 产品 | 路由 slug | 首期区块组合 |
| --- | --- | --- | --- |
| 干法电极制浆工艺设备 | 干法电极粉体高速混合机 | `dry-electrode-mixer` | 图文、三视图、13 列参数 |
| 干法电极制浆工艺设备 | 电磁给料机 | `electromagnetic-feeder` | 图文要点、两张视图 |
| 干法电极制浆工艺设备 | 双螺杆干法电极连续挤出机 | `twin-screw-dry-extruder` | 主图、4 个要点 |
| 干法电极制浆工艺设备 | 固态电解质包覆机 | `solid-electrolyte-coater` | 主图、6 个要点 |
| 湿法电极制备工艺设备 | 双行星动力混合机 | `dual-planetary-mixer` | 关联现有产品，不复制；创建固态分类展示位 |
| 湿法电极制备工艺设备 | 管线式混合机 | `ssb-pipeline-mixer` | 主图；当前不创建空三视图区块 |

### 13.3 化工行业

| 产品 | 路由 slug | 首期区块组合 |
| --- | --- | --- |
| 双行星动力混合机 | `dual-planetary-mixer` | 关联现有产品，不复制；创建化工分类展示位 |
| 多功能混合机 | `multi-mixer` | 主图、两张视图；保留现有 `/products/solid-state-battery/ssb-multi-mixer` 详情路径，不迁入代码占位说明 |
| 往复式混合机 | `reciprocating-mixer` | 主图 |
| 双立柱行星混合机 | `dual-column-planetary` | 主图 |
| 行星蝶式混合机 | `butterfly-mixer` | 主图 |
| 行星动力混合机 | `planetary-power-mixer` | 主图 |
| 立式捏合机 | `vertical-kneader` | 主图、两张视图 |
| 压料机 | `press-machine` | 主图、两张视图 |
| 倾倒机 | `tilting-machine` | 主图 |
| 洗桶机 | `barrel-washer` | 主图 |
| 反应釜 | `reactor` | 主图 |
| 储罐 | `storage-tank` | 主图 |

化工产品当前内容少是有效业务状态。首期不为它们制造虚假的介绍、参数和案例区块。

### 13.4 辅助设备

| 产品 | 路由 slug | 首期区块组合 |
| --- | --- | --- |
| 高压清洗机 | `ssb-high-pressure-washer` | 主图、两段说明；不创建空三视图区块 |
| 高压喷淋嘴 | `spray-nozzle` | 当前只有标题和缺图回退；CMS 媒体可为空，不虚构详情 |

### 13.5 行业方案

| 行业 | 方案 | 首期区块组合 |
| --- | --- | --- |
| 新能源 | PD 制浆系统 | 视频图文、三视图、特点、核心设备、共享型号参数、3 组案例 |
| 新能源 | 高效管线式制浆系统 | 视频图文、三视图、特点、核心设备、3 套材料体系验证 |
| 新能源 | 高速循环制浆系统 | 视频图文、三视图、特点、核心设备、参数、技术验证案例 |
| 新能源 | 双螺杆连续制浆系统 | 视频图文、三视图、特点、参数、正负极验证、EDS 等结果 |
| 固态电池 | 干法电极成套设备解决方案 | 图文、三视图、3 个优势、3 台核心设备、参数 |
| 固态电池 | 湿法电极成套设备解决方案 | 复合图文、现有设备；不迁入待补特点/参数/案例 |
| 化工 | 全自动生产系统 | 视频图文、6 个特点、11 台核心设备、视频案例 |

当前通用数据中还有制胶、火工药剂、食品、医药、化妆品、电子材料等行业方案。它们可迁为草稿，但是否公开应以当前正式导航和客户确认结果为准，迁移脚本不能因为代码里存在数据就自动发布。

## 14. CMS 编辑示例

以“高速循环制浆系统”为例，运营人员看到的不是几十个技术字段，而是一条有序区块列表：

```text
高速循环制浆系统
  1. 方案介绍（图文 + 视频）
  2. 三视图（媒体画廊）
  3. 产品特点（特点网格）
  4. 核心设备（关联产品）
  5. 技术参数（关联数据集）
  6. 客户验证案例（关联案例）
     6.1 来料说明
     6.2 流变结果
     6.3 稳定性结果
     6.4 SEM 图
```

以“高压喷淋嘴”为例，区块列表可以为空，只使用产品稳定字段中的标题和主图。前端根据有无区块渲染，不显示空栏目。

这使后台编辑复杂度跟随真实内容，而不是跟随一套最大模板。

## 15. 本轮逐页覆盖复核

### 15.1 产品详情覆盖结论

| 页面/产品组 | 现有特殊结构 | CMS 落点 |
| --- | --- | --- |
| 双行星生产/中试/实验型 | 共用大表但展示不同型号范围，均有三视图和 3 组相同案例 | `product-family` + 同一规格数据集的 3 个 `datasetView` + 复用案例 |
| 高速、管线、CP 分散机、干法混合机 | 表头分别不同，不能共用固定规格字段 | 独立 `spec-table` 数据集 + 通用 `data-table` |
| 捏合机 | 黏度、剪切应力仿真图片组和文字说明 | `simulation-gallery` + `evidence-grid` + 规格数据集 |
| CP 罐 A/B、给料机、多功能混合机 | 内容短、视图数量不一致 | 可选 `media-text`、`media-gallery`；不存在的区块不创建 |
| 挤出机、包覆机、管线混合机、清洗机、喷嘴 | 极少内容或缺图 | 主实体 + 可选要点；不强制参数、特点、案例 |
| 化工 10 个通用产品 | 多数只有主图，少数有两张视图 | 同一产品模型的极简区块组合，不创建化工专用 Content Type |
| 通用兜底产品 | 含与专用页冲突的旧数据和未公开行业 | 仅迁未被专用路由覆盖的内容，默认草稿，禁止自动合并/发布 |

30 个列表展示位都可由 `product-placement` 表达；跨新能源、固态和化工重复出现的双行星产品只建立一个 `product`。详情 URL 的分类差异由 `url-alias + categoryContext` 处理。

### 15.2 行业方案逐页覆盖结论

| 当前正式路由 | 必须保留的结构 | CMS 组合 |
| --- | --- | --- |
| `/solutions/new-energy/pd-pulping` | 视频、三视图、特点、设备、完整规格表、3 组案例 | Hero + video/media + feature-grid + equipment-grid + data-table + case-list |
| `/solutions/new-energy/circulation-pulping` | 来料、流变、稳定性、SEM 等连续证据 | 基础区块 + case-study/chapter + evidence-grid |
| `/solutions/new-energy/pipeline-pulping` | LFP/NCA/石墨三套材料体系、原始 TSI 图表、图片/表格混排 | 1 个技术案例 + 3 个 case-chapter + metric-chart/data-table/evidence-grid |
| `/solutions/new-energy/twin-screw-pulping` | 正负极验证、分组表头稳定性表、TSI、EDS 表和 SEM | 正负极 case-chapter + 复杂 data-table + metric-chart + evidence-grid |
| `/solutions/solid-state-battery/dry-powder-mixer` | 3 台设备各有图片、要点和说明，13 列参数 | 丰富 `solution-equipment` + data-table |
| `/solutions/solid-state-battery/wet-electrode-system` | 两设备复合首图、部分内容尚未完成 | media-text/equipment-grid；未完成栏目隐藏或不创建 |
| `/solutions/chemical/auto-production` | 视频、6 个特点、11 台设备、规格联系提示、视频案例 | video + feature-grid + 丰富设备关系 + callout + case video |

这 7 个正式方案无需“每页一个模板”，也无需把整页降级为特殊 renderer。只有截图回归出现当前通用模型无法表达的排版时，才启用版本化逃生口。

### 15.3 新闻覆盖结论

现有新闻的段落、加粗段落、小节标题、单图、图片轮播和引用均由精简 article blocks 覆盖。上一篇、下一篇和相关阅读属于 BFF 派生数据，不由编辑人员手工维护；列表接口不返回正文。

### 15.4 上线前强制验收清单

每个当前正式详情路由至少完成以下自动或人工断言：

- 标题、副标题、正文、要点和顺序一致
- 图片/视频数量、alt、三视图标签和背景焦点一致
- 表头层级、列数、行数、合并单元格、单位和高亮一致
- 原始图表 series、刻度、颜色令牌、图例和数值一致
- 设备卡顺序、图片、要点、说明和链接状态一致
- 案例/章节顺序、证据网格跨列和图文组合一致
- 空数据不会产生空标题或“模板占位”栏目
- 列表进入详情、旧 URL、canonical、上一篇/下一篇和询盘提交正常
- 桌面与移动端截图差异在批准范围内，控制台无错误

只有对应路由通过上述验收，才从本地数据切换到 CMS；因此可以逐页上线和逐页回滚。

### 15.5 最终风险复核

修订后的方案没有发现阻断三大模块实施的模型缺口，剩余风险主要来自实施过程：

1. **数据迁移误源**：专用页面与通用兜底数据有重复或冲突，必须执行来源优先级清单。
2. **复杂表格录入错误**：必须先导入、校验、预览，再发布，不能让运营直接编辑大型 JSON。
3. **关系内容联动**：产品、案例或数据集更新可能改变多个页面，发布前必须生成影响清单。
4. **视觉漂移**：CMS 只保存受控 `rendererVariant` 和内容；现有 React 组件、className 和响应式规则继续决定样式。
5. **Strapi 嵌套限制**：复杂材料体系必须使用 `case-chapter` Collection Type，不能尝试在 Component 内无限嵌套 Dynamic Zone。

据此，后端可以进入 Schema 字段级设计和迁移清单生成阶段；不需要先改动任何现有前端内容或样式。
