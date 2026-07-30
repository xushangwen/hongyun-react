import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const cmsRoot = resolve(root, 'apps/cms')

function write(relativePath, content) {
  const file = resolve(root, relativePath)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, `${content.trim()}\n`)
}

function writeJson(relativePath, value) {
  write(relativePath, JSON.stringify(value, null, 2))
}

const localized = { pluginOptions: { i18n: { localized: true } } }
const nonLocalized = { pluginOptions: { i18n: { localized: false } } }
const requiredLocalized = { required: true, ...localized }
const requiredString = { type: 'string', required: true }
const requiredLocalizedString = { type: 'string', ...requiredLocalized }
const slug = {
  type: 'uid',
  targetField: 'name',
  required: true,
  ...nonLocalized,
}
const order = { type: 'integer', default: 0, ...nonLocalized }
const visible = { type: 'boolean', default: true, ...nonLocalized }
const legacyKey = { type: 'string', unique: true, required: true, ...nonLocalized }
const media = (multiple = false, localizedMedia = false) => ({
  type: 'media',
  multiple,
  allowedTypes: ['images', 'videos', 'files'],
  ...(localizedMedia ? localized : nonLocalized),
})
const image = (multiple = false, localizedMedia = false) => ({
  ...media(multiple, localizedMedia),
  allowedTypes: ['images'],
})
const relation = (relationType, target) => ({
  type: 'relation',
  relation: relationType,
  target,
  ...nonLocalized,
})
const component = (name, repeatable = false, isLocalized = true) => ({
  type: 'component',
  repeatable,
  component: name,
  ...(isLocalized ? localized : nonLocalized),
})
const structuredJson = (editorMode, extra = {}) => ({
  type: 'customField',
  customField: 'global::structured-json',
  options: { editorMode },
  ...extra,
})
const legacyPath = {
  type: 'customField',
  customField: 'global::legacy-path',
}

const componentSchemas = {
  'shared.seo': {
    collectionName: 'components_shared_seos',
    info: { displayName: 'SEO' },
    attributes: {
      metaTitle: { type: 'string' },
      metaDescription: { type: 'text' },
      keywords: { type: 'text' },
      ogImage: image(false, true),
      canonicalOverride: { type: 'string' },
      noIndex: { type: 'boolean', default: false },
    },
  },
  'shared.page-hero': {
    collectionName: 'components_shared_page_heroes',
    info: { displayName: '页面首屏' },
    attributes: {
      titleOverride: { type: 'string' },
      subtitle: { type: 'text' },
      desktopMedia: media(false, true),
      mobileMedia: media(false, true),
      mediaType: { type: 'enumeration', enum: ['image', 'video'], default: 'image' },
      imagePosition: { type: 'enumeration', enum: ['center', 'top', 'bottom', 'left', 'right'], default: 'center' },
      overlay: { type: 'enumeration', enum: ['none', 'light', 'dark'], default: 'dark' },
      showScrollIndicator: { type: 'boolean', default: true },
    },
  },
  'shared.media-item': {
    collectionName: 'components_shared_media_items',
    info: { displayName: '媒体项' },
    attributes: {
      label: { type: 'string' },
      media: media(false, true),
      alt: { type: 'string' },
      caption: { type: 'text' },
      role: { type: 'enumeration', enum: ['cover', 'hero', 'three-view', 'gallery', 'case', 'diagram', 'chart', 'video', 'other'], default: 'other' },
      imageFit: { type: 'enumeration', enum: ['contain', 'cover'], default: 'cover' },
      imagePosition: { type: 'enumeration', enum: ['center', 'top', 'bottom', 'left', 'right'], default: 'center' },
      aspectVariant: { type: 'enumeration', enum: ['auto', 'square', 'landscape', 'portrait', 'wide'], default: 'auto' },
      sourcePath: legacyPath,
    },
  },
  'shared.text-item': {
    collectionName: 'components_shared_text_items',
    info: { displayName: '文本项' },
    attributes: {
      text: { type: 'text' },
      title: { type: 'string' },
      label: { type: 'string' },
      value: { type: 'string' },
      order,
    },
  },
  'shared.equipment-item': {
    collectionName: 'components_shared_equipment_items',
    info: { displayName: '核心设备条目' },
    attributes: {
      name: { type: 'string', required: true },
      image: image(false, true),
      alt: { type: 'string' },
      features: component('shared.text-item', true),
      featureContent: { type: 'blocks', ...localized },
      paragraphs: component('shared.text-item', true),
      imageFit: { type: 'enumeration', enum: ['contain', 'cover'], default: 'contain' },
      imagePosition: { type: 'enumeration', enum: ['center', 'top', 'bottom', 'left', 'right'], default: 'center' },
    },
  },
  'shared.feature-item': {
    collectionName: 'components_shared_feature_items',
    info: { displayName: '功能特点' },
    attributes: {
      title: { type: 'string', required: true },
      description: { type: 'text' },
      iconKey: { type: 'string' },
      iconMedia: image(false, true),
      bullets: component('shared.text-item', true),
      order,
    },
  },
  'shared.evidence-item': {
    collectionName: 'components_shared_evidence_items',
    info: { displayName: '证据项' },
    attributes: {
      title: { type: 'string' },
      kind: { type: 'enumeration', enum: ['single-image', 'double-image', 'metric-chart', 'data-table', 'text', 'sem-eds'], required: true },
      description: { type: 'text' },
      mediaItems: component('shared.media-item', true),
      datasetKey: { type: 'string' },
      span: { type: 'integer', min: 1, max: 3, default: 1 },
      layoutVariant: { type: 'enumeration', enum: ['default', 'stacked', 'side-by-side', 'wide'], default: 'default' },
    },
  },
  'content.rich-text': {
    collectionName: 'components_content_rich_texts',
    info: {
      displayName: '页面正文（迁移文案）',
      description: '保存原页面迁入的段落文案；已拆成专用字段的内容优先编辑专用字段',
    },
    attributes: {
      internalName: requiredString,
      anchor: { type: 'string' },
      visible,
      eyebrow: { type: 'string' },
      title: { type: 'string' },
      body: { type: 'blocks' },
      layoutVariant: { type: 'enumeration', enum: ['default', 'narrow', 'wide'], default: 'default' },
      theme: { type: 'enumeration', enum: ['light', 'dark', 'muted'], default: 'light' },
    },
  },
  'content.media-text': {
    collectionName: 'components_content_media_texts',
    info: { displayName: '图文介绍' },
    attributes: {
      internalName: requiredString,
      anchor: { type: 'string' },
      visible,
      eyebrow: { type: 'string' },
      title: { type: 'string' },
      body: { type: 'blocks' },
      mediaItems: component('shared.media-item', true),
      layoutVariant: { type: 'enumeration', enum: ['media-left', 'media-right', 'media-top'], default: 'media-right' },
      theme: { type: 'enumeration', enum: ['light', 'dark', 'muted'], default: 'light' },
    },
  },
  'content.video': {
    collectionName: 'components_content_videos',
    info: { displayName: '视频' },
    attributes: {
      internalName: requiredString,
      visible,
      title: { type: 'string' },
      video: component('shared.media-item'),
      poster: component('shared.media-item'),
      description: { type: 'text' },
      captions: {
        type: 'media',
        multiple: false,
        allowedTypes: ['files'],
        pluginOptions: { i18n: { localized: true } },
      },
    },
  },
  'content.media-gallery': {
    collectionName: 'components_content_media_galleries',
    info: { displayName: '媒体画廊' },
    attributes: {
      internalName: requiredString,
      anchor: { type: 'string' },
      visible,
      title: { type: 'string' },
      variant: { type: 'enumeration', enum: ['gallery', 'three-view', 'carousel', 'case'], default: 'gallery' },
      items: component('shared.media-item', true),
      layoutVariant: { type: 'enumeration', enum: ['grid', 'slider', 'three-column', 'stacked'], default: 'grid' },
    },
  },
  'content.feature-grid': {
    collectionName: 'components_content_feature_grids',
    info: { displayName: '特点网格' },
    attributes: {
      internalName: requiredString,
      anchor: { type: 'string' },
      visible,
      eyebrow: { type: 'string' },
      title: { type: 'string' },
      items: component('shared.feature-item', true),
      columns: { type: 'integer', min: 1, max: 6, default: 3 },
      layoutVariant: { type: 'enumeration', enum: ['cards', 'icons', 'numbered', 'compact'], default: 'cards' },
    },
  },
  'content.data-table': {
    collectionName: 'components_content_data_tables',
    info: { displayName: '数据表' },
    attributes: {
      internalName: { type: 'string', required: true, default: '产品参数表' },
      visible,
      title: { type: 'string', required: true },
      datasetKey: { type: 'string' },
      columns: structuredJson('columns', localized),
      headerGroups: structuredJson('header-groups', localized),
      rows: structuredJson('rows', localized),
      unitNotes: { type: 'text' },
      datasetView: structuredJson('dataset-view'),
      layoutVariant: { type: 'enumeration', enum: ['default', 'scroll', 'compact', 'grouped'], default: 'scroll' },
    },
  },
  'content.equipment-grid': {
    collectionName: 'components_content_equipment_grids',
    info: { displayName: '核心设备' },
    attributes: {
      internalName: requiredString,
      visible,
      title: { type: 'string' },
      items: component('shared.equipment-item', true),
      equipmentKeys: structuredJson('string-list', { required: false }),
      layoutVariant: { type: 'enumeration', enum: ['cards', 'horizontal', 'detailed'], default: 'cards' },
    },
  },
  'content.case-list': {
    collectionName: 'components_content_case_lists',
    info: { displayName: '案例列表' },
    attributes: {
      internalName: requiredString,
      visible,
      title: { type: 'string' },
      caseKeys: structuredJson('string-list', { required: true }),
      layoutVariant: { type: 'enumeration', enum: ['cards', 'chapters', 'carousel'], default: 'cards' },
    },
  },
  'content.cta': {
    collectionName: 'components_content_ctas',
    info: { displayName: '行动号召' },
    attributes: {
      internalName: requiredString,
      visible,
      title: { type: 'string' },
      text: { type: 'text' },
      buttonLabel: { type: 'string' },
      targetPath: { type: 'string' },
      variant: { type: 'enumeration', enum: ['default', 'contact', 'inquiry', 'callout'], default: 'default' },
    },
  },
  'technical.chart-gallery': {
    collectionName: 'components_technical_chart_galleries',
    info: { displayName: '技术图表画廊' },
    attributes: {
      internalName: requiredString,
      visible,
      title: { type: 'string' },
      items: component('shared.media-item', true),
    },
  },
  'technical.metric-chart': {
    collectionName: 'components_technical_metric_charts',
    info: { displayName: '指标图表' },
    attributes: {
      internalName: requiredString,
      visible,
      title: { type: 'string' },
      datasetKey: { type: 'string', required: true },
      layoutVariant: { type: 'enumeration', enum: ['line', 'bar', 'scatter', 'multi-axis'], default: 'line' },
    },
  },
  'technical.simulation-gallery': {
    collectionName: 'components_technical_simulation_galleries',
    info: { displayName: '仿真结果' },
    attributes: {
      internalName: requiredString,
      visible,
      title: { type: 'string' },
      summary: { type: 'text' },
      items: component('shared.media-item', true),
    },
  },
  'technical.report-section': {
    collectionName: 'components_technical_report_sections',
    info: { displayName: '技术报告章节' },
    attributes: {
      internalName: requiredString,
      visible,
      title: { type: 'string' },
      background: { type: 'blocks' },
      process: { type: 'blocks' },
      result: { type: 'blocks' },
      conclusion: { type: 'blocks' },
    },
  },
  'technical.evidence-grid': {
    collectionName: 'components_technical_evidence_grids',
    info: { displayName: '技术证据网格' },
    attributes: {
      internalName: requiredString,
      visible,
      title: { type: 'string' },
      items: component('shared.evidence-item', true),
      columns: { type: 'integer', min: 1, max: 3, default: 3 },
    },
  },
  'special.renderer': {
    collectionName: 'components_special_renderers',
    info: { displayName: '受控特殊渲染器' },
    attributes: {
      internalName: requiredString,
      visible,
      rendererKey: {
        type: 'enumeration',
        enum: ['pipeline-material-validation-v1', 'twin-screw-validation-v1'],
        required: true,
      },
      schemaVersion: { type: 'integer', min: 1, required: true },
      payload: { type: 'json', required: true },
    },
  },
  'article.paragraph': {
    collectionName: 'components_article_paragraphs',
    info: { displayName: '新闻段落' },
    attributes: {
      text: { type: 'text', required: true },
      bold: { type: 'boolean', default: false },
    },
  },
  'article.section-title': {
    collectionName: 'components_article_section_titles',
    info: { displayName: '新闻小节标题' },
    attributes: { text: requiredString },
  },
  'article.image': {
    collectionName: 'components_article_images',
    info: { displayName: '新闻图片' },
    attributes: {
      image: image(false, true),
      sourcePath: legacyPath,
      alt: { type: 'string', required: true },
      caption: { type: 'text' },
    },
  },
  'article.carousel': {
    collectionName: 'components_article_carousels',
    info: { displayName: '新闻图片轮播' },
    attributes: { images: component('shared.media-item', true) },
  },
  'article.quote': {
    collectionName: 'components_article_quotes',
    info: { displayName: '新闻引用' },
    attributes: {
      text: { type: 'text', required: true },
      author: { type: 'string' },
    },
  },
}

for (const [uid, schema] of Object.entries(componentSchemas)) {
  const [folder, name] = uid.split('.')
  writeJson(`apps/cms/src/components/${folder}/${name}.json`, schema)
}

const sections = {
  type: 'dynamiczone',
  components: [
    'content.rich-text',
    'content.media-text',
    'content.video',
    'content.media-gallery',
    'content.feature-grid',
    'content.data-table',
    'content.equipment-grid',
    'content.case-list',
    'content.cta',
    'technical.chart-gallery',
    'technical.metric-chart',
    'technical.simulation-gallery',
    'technical.report-section',
    'technical.evidence-grid',
    'special.renderer',
  ],
  ...localized,
}

const contentTypes = {
  'product-category': {
    kind: 'collectionType',
    displayName: '产品分类',
    pluralName: 'product-categories',
    attributes: {
      name: requiredLocalizedString, slug, summary: { type: 'text', ...localized },
      cover: image(false, true), iconKey: { type: 'string', ...nonLocalized }, order, visible,
      seo: component('shared.seo'), legacyKey,
    },
  },
  'product-group': {
    kind: 'collectionType',
    displayName: '产品系统分组',
    pluralName: 'product-groups',
    attributes: {
      name: requiredLocalizedString, slug,
      category: relation('manyToOne', 'api::product-category.product-category'),
      relatedSolution: relation('oneToOne', 'api::solution.solution'), order, visible, legacyKey,
    },
  },
  product: {
    kind: 'collectionType',
    displayName: '产品中心',
    pluralName: 'products',
    draftAndPublish: true,
    attributes: {
      name: requiredLocalizedString, slug, model: { type: 'string', ...nonLocalized },
      summary: { type: 'text', ...localized }, cover: image(false, true),
      hero: component('shared.page-hero'), family: relation('manyToOne', 'api::product-family.product-family'),
      relatedProducts: relation('manyToMany', 'api::product.product'), sections,
      seo: component('shared.seo'), legacyKey, order, sourceChecksum: { type: 'string', ...nonLocalized },
    },
  },
  'product-placement': {
    kind: 'collectionType',
    displayName: '产品展示位',
    pluralName: 'product-placements',
    attributes: {
      product: relation('manyToOne', 'api::product.product'),
      category: relation('manyToOne', 'api::product-category.product-category'),
      group: relation('manyToOne', 'api::product-group.product-group'),
      order, featured: { type: 'boolean', default: false, ...nonLocalized },
      displayNameOverride: { type: 'string', ...localized }, coverOverride: image(false, true),
      imageFit: { type: 'enumeration', enum: ['contain', 'cover'], default: 'cover', ...nonLocalized },
      imagePosition: { type: 'enumeration', enum: ['center', 'top', 'bottom', 'left', 'right'], default: 'center', ...nonLocalized },
      cardVariant: { type: 'enumeration', enum: ['default', 'wide', 'compact'], default: 'default', ...nonLocalized },
      legacyKey,
    },
  },
  'product-family': {
    kind: 'collectionType',
    displayName: '产品系列',
    pluralName: 'product-families',
    draftAndPublish: true,
    attributes: {
      name: requiredLocalizedString, slug, summary: { type: 'text', ...localized },
      sharedMedia: media(true, true), sharedDatasetKeys: structuredJson('string-list', nonLocalized),
      legacyKey,
    },
  },
  industry: {
    kind: 'collectionType',
    displayName: '行业分类',
    pluralName: 'industries',
    draftAndPublish: true,
    attributes: {
      name: requiredLocalizedString, slug, summary: { type: 'text', ...localized },
      cover: image(false, true), iconKey: { type: 'string', ...nonLocalized }, order, visible,
      seo: component('shared.seo'), legacyKey,
    },
  },
  solution: {
    kind: 'collectionType',
    displayName: '行业方案',
    pluralName: 'solutions',
    draftAndPublish: true,
    attributes: {
      name: requiredLocalizedString, slug,
      industry: relation('manyToOne', 'api::industry.industry'),
      summary: { type: 'text', ...localized }, cover: image(false, true),
      hero: component('shared.page-hero'), relatedSolutions: relation('manyToMany', 'api::solution.solution'),
      sections, seo: component('shared.seo'), legacyKey, order,
      sourceChecksum: { type: 'string', ...nonLocalized },
    },
  },
  'solution-equipment': {
    kind: 'collectionType',
    displayName: '方案核心设备',
    pluralName: 'solution-equipments',
    attributes: {
      solution: relation('manyToOne', 'api::solution.solution'),
      product: relation('manyToOne', 'api::product.product'),
      order, visible, titleOverride: { type: 'string', ...localized },
      summaryOverride: { type: 'text', ...localized }, mediaOverride: image(false, true),
      altOverride: { type: 'string', ...localized }, features: component('shared.feature-item', true),
      paragraphs: component('shared.text-item', true), showProductLink: { type: 'boolean', default: true, ...nonLocalized },
      imageFit: { type: 'enumeration', enum: ['contain', 'cover'], default: 'contain', ...nonLocalized },
      imagePosition: { type: 'enumeration', enum: ['center', 'top', 'bottom', 'left', 'right'], default: 'center', ...nonLocalized },
      mediaSize: { type: 'enumeration', enum: ['small', 'medium', 'large'], default: 'medium', ...nonLocalized },
      cardVariant: { type: 'enumeration', enum: ['horizontal', 'vertical', 'detailed'], default: 'vertical', ...nonLocalized },
      legacyKey,
    },
  },
  'article-category': {
    kind: 'collectionType',
    displayName: '新闻分类',
    pluralName: 'article-categories',
    attributes: {
      name: requiredLocalizedString, slug, description: { type: 'text', ...localized },
      order, seo: component('shared.seo'), legacyKey,
    },
  },
  article: {
    kind: 'collectionType',
    displayName: '新闻中心',
    pluralName: 'articles',
    draftAndPublish: true,
    attributes: {
      title: { type: 'string', required: true, ...localized },
      slug: { ...slug, targetField: 'title' },
      category: relation('manyToOne', 'api::article-category.article-category'),
      excerpt: { type: 'text', ...localized }, cover: image(false, true),
      publishedDate: { type: 'date', required: true, ...nonLocalized },
      author: { type: 'string', ...localized },
      blocks: {
        type: 'dynamiczone',
        components: ['article.paragraph', 'article.section-title', 'article.image', 'article.carousel', 'article.quote'],
        ...localized,
      },
      featured: { type: 'boolean', default: false, ...nonLocalized },
      seo: component('shared.seo'), legacyKey, order,
      sourceChecksum: { type: 'string', ...nonLocalized },
    },
  },
  'case-study': {
    kind: 'collectionType',
    displayName: '客户与技术案例',
    pluralName: 'case-studies',
    draftAndPublish: true,
    attributes: {
      title: { type: 'string', required: true, ...localized }, slug: { ...slug, targetField: 'title' },
      caseType: { type: 'enumeration', enum: ['customer', 'project', 'technical-validation'], required: true, ...nonLocalized },
      summary: { type: 'text', ...localized }, cover: image(false, true),
      relatedProducts: relation('manyToMany', 'api::product.product'),
      relatedSolutions: relation('manyToMany', 'api::solution.solution'),
      customerName: { type: 'string', ...localized },
      confidentialityLevel: { type: 'enumeration', enum: ['public', 'anonymous', 'private'], default: 'public', ...nonLocalized },
      sections, publishedDate: { type: 'date', ...nonLocalized },
      seo: component('shared.seo'), legacyKey,
    },
  },
  'case-chapter': {
    kind: 'collectionType',
    displayName: '案例章节',
    pluralName: 'case-chapters',
    draftAndPublish: true,
    attributes: {
      caseStudy: relation('manyToOne', 'api::case-study.case-study'),
      title: { type: 'string', required: true, ...localized }, slug: { ...slug, targetField: 'title' },
      summary: { type: 'text', ...localized }, order, visible, sections, legacyKey,
    },
  },
  'technical-dataset': {
    kind: 'collectionType',
    displayName: '共享技术数据（高级）',
    pluralName: 'technical-datasets',
    draftAndPublish: true,
    attributes: {
      title: { type: 'string', required: true, ...localized },
      kind: { type: 'enumeration', enum: ['spec-table', 'experiment-table', 'chart-data', 'eds-data'], default: 'spec-table', required: true, ...nonLocalized },
      schemaVersion: { type: 'integer', min: 1, default: 1, required: true, ...nonLocalized },
      columns: structuredJson('columns', { required: true, ...localized }),
      headerGroups: structuredJson('header-groups', localized),
      rows: structuredJson('rows', { required: true, ...nonLocalized }),
      chartConfig: structuredJson('chart-config', localized), unitNotes: { type: 'text', ...localized },
      sourceFile: media(false), legacyKey,
      version: { type: 'integer', min: 1, default: 1, ...nonLocalized },
      sourceChecksum: { type: 'string', ...nonLocalized },
    },
  },
  'url-alias': {
    kind: 'collectionType',
    displayName: 'URL 别名',
    pluralName: 'url-aliases',
    attributes: {
      path: { type: 'string', required: true, ...nonLocalized },
      targetType: { type: 'enumeration', enum: ['product', 'solution', 'article', 'page'], required: true, ...nonLocalized },
      targetKey: { type: 'string', required: true, ...nonLocalized },
      product: relation('manyToOne', 'api::product.product'),
      solution: relation('manyToOne', 'api::solution.solution'),
      article: relation('manyToOne', 'api::article.article'),
      pageKey: { type: 'enumeration', enum: ['home', 'about', 'products', 'solutions', 'news', 'contact'], ...nonLocalized },
      localeCode: { type: 'enumeration', enum: ['zh', 'en'], default: 'zh', required: true, ...nonLocalized },
      canonical: { type: 'boolean', default: true, ...nonLocalized },
      redirectCode: { type: 'enumeration', enum: ['none', 'permanent-301', 'temporary-302'], default: 'none', ...nonLocalized },
      active: { type: 'boolean', default: true, ...nonLocalized },
      categoryContext: { type: 'string', ...nonLocalized },
      uniqueKey: { type: 'string', required: true, unique: true, ...nonLocalized },
      legacyKey,
    },
  },
  partner: {
    kind: 'collectionType',
    displayName: '合作伙伴',
    pluralName: 'partners',
    attributes: {
      name: { type: 'string', required: true, ...localized }, logo: image(false, true),
      website: { type: 'string', ...nonLocalized }, order, visible, legacyKey,
    },
  },
  'global-presence': {
    kind: 'collectionType',
    displayName: '全球布局',
    pluralName: 'global-presences',
    attributes: {
      name: { type: 'string', required: true, ...localized },
      countryCode: { type: 'string', required: true, ...nonLocalized },
      longitude: { type: 'decimal', required: true, ...nonLocalized },
      latitude: { type: 'decimal', required: true, ...nonLocalized },
      summary: { type: 'text', ...localized }, order, visible, legacyKey,
    },
  },
  'contact-submission': {
    kind: 'collectionType',
    displayName: '联系与询盘记录',
    pluralName: 'contact-submissions',
    attributes: {
      name: requiredString, company: { type: 'string' }, phoneMasked: requiredString,
      emailMasked: { type: 'string' }, phoneEncrypted: { type: 'text', private: true },
      emailEncrypted: { type: 'text', private: true }, message: { type: 'text', required: true, private: true },
      contextType: { type: 'enumeration', enum: ['product', 'solution', 'page'], default: 'page' },
      contextDocumentId: { type: 'string' }, contextPath: requiredString,
      contextTitleSnapshot: { type: 'string' }, referrer: { type: 'string' },
      utm: { type: 'json' }, status: { type: 'enumeration', enum: ['new', 'processing', 'closed', 'spam'], default: 'new' },
      expiresAt: { type: 'datetime', required: true }, fingerprintHash: { type: 'string', private: true },
    },
  },
  'resume-submission': {
    kind: 'collectionType',
    displayName: '简历记录',
    pluralName: 'resume-submissions',
    attributes: {
      name: requiredString, phoneMasked: requiredString, emailMasked: { type: 'string' },
      phoneEncrypted: { type: 'text', private: true }, emailEncrypted: { type: 'text', private: true },
      position: requiredString, privateFileKey: { type: 'string', required: true },
      originalFilename: { type: 'string' }, mime: { type: 'string' },
      size: { type: 'biginteger', private: true },
      scanStatus: { type: 'enumeration', enum: ['pending', 'clean', 'blocked', 'error'], default: 'pending' },
      status: { type: 'enumeration', enum: ['new', 'reviewing', 'closed', 'deleted'], default: 'new' },
      expiresAt: { type: 'datetime', required: true }, retainedUntil: { type: 'datetime' },
    },
  },
  'access-audit-log': {
    kind: 'collectionType',
    displayName: '敏感数据访问审计',
    pluralName: 'access-audit-logs',
    attributes: {
      actor: requiredString, action: { type: 'enumeration', enum: ['download', 'delete', 'extend-retention'], required: true },
      targetType: { type: 'enumeration', enum: ['resume', 'contact'], required: true },
      targetDocumentId: requiredString, reason: { type: 'text' },
      occurredAt: { type: 'datetime', required: true }, ipHash: { type: 'string', private: true },
    },
  },
  'site-setting': {
    kind: 'singleType',
    displayName: '站点设置',
    pluralName: 'site-settings',
    attributes: {
      companyName: requiredLocalizedString, logo: image(false, true), phone: { type: 'string', ...localized },
      email: { type: 'email', ...localized }, addresses: component('shared.text-item', true),
      icp: { type: 'string', ...localized }, defaultSeo: component('shared.seo'),
    },
  },
  'home-page': {
    kind: 'singleType',
    displayName: '首页',
    pluralName: 'home-pages',
    draftAndPublish: true,
    attributes: {
      title: requiredLocalizedString, hero: component('shared.page-hero'),
      sections, seo: component('shared.seo'), sourceChecksum: { type: 'string', ...nonLocalized },
    },
  },
  'about-page': {
    kind: 'singleType',
    displayName: '关于我们',
    pluralName: 'about-pages',
    draftAndPublish: true,
    attributes: {
      title: requiredLocalizedString, hero: component('shared.page-hero'),
      sections, seo: component('shared.seo'), sourceChecksum: { type: 'string', ...nonLocalized },
    },
  },
  navigation: {
    kind: 'singleType',
    displayName: '导航设置',
    pluralName: 'navigations',
    attributes: {
      headerItems: structuredJson('navigation', { required: true, ...localized }),
      footerItems: structuredJson('navigation', { required: true, ...localized }),
    },
  },
  'form-setting': {
    kind: 'singleType',
    displayName: '表单设置',
    pluralName: 'form-settings',
    attributes: {
      industryOptions: structuredJson('options', { required: true, ...localized }),
      positionOptions: structuredJson('options', localized),
      contactCopy: { type: 'text', ...localized },
      responseTime: { type: 'string', ...localized },
      retentionDays: { type: 'integer', default: 180, min: 1, ...nonLocalized },
    },
  },
}

function schemaFor(name, config) {
  const { kind, displayName, pluralName, draftAndPublish = false, attributes } = config
  const singularName = name
  return {
    kind,
    collectionName: `hongyun_${pluralName.replaceAll('-', '_')}`,
    info: { singularName, pluralName, displayName, description: '' },
    options: { draftAndPublish },
    pluginOptions: { i18n: { localized: true } },
    attributes,
  }
}

for (const [name, config] of Object.entries(contentTypes)) {
  const uid = `api::${name}.${name}`
  writeJson(`apps/cms/src/api/${name}/content-types/${name}/schema.json`, schemaFor(name, config))
  const factoryName = config.kind === 'singleType' ? 'createCoreController' : 'createCoreController'
  write(`apps/cms/src/api/${name}/controllers/${name}.js`, `'use strict';\nconst { factories } = require('@strapi/strapi');\nmodule.exports = factories.${factoryName}('${uid}');`)
  write(`apps/cms/src/api/${name}/routes/${name}.js`, `'use strict';\nconst { factories } = require('@strapi/strapi');\nmodule.exports = factories.createCoreRouter('${uid}');`)
  write(`apps/cms/src/api/${name}/services/${name}.js`, `'use strict';\nconst { factories } = require('@strapi/strapi');\nmodule.exports = factories.createCoreService('${uid}');`)
}

writeJson('apps/cms/package.json', {
  name: '@hongyun/cms',
  version: '0.1.0',
  private: true,
  description: '红运官网 Strapi CMS',
  scripts: {
    build: 'strapi build',
    console: 'strapi console',
    develop: 'strapi develop',
    start: 'strapi start',
    seed: 'node scripts/seed.js',
    'seed:sync': 'node scripts/seed.js --sync-existing',
    tokens: 'node scripts/setup-api-tokens.js',
    'resume:scan': 'node scripts/process-resumes.js',
    'retention:cleanup': 'node scripts/retention-cleanup.js',
    verify: 'node scripts/verify.js',
  },
  dependencies: {
    '@strapi/plugin-users-permissions': '5.51.0',
    '@strapi/strapi': '5.51.0',
    '@strapi/utils': '5.51.0',
    'better-sqlite3': '12.11.1',
    mysql2: '3.22.5',
    react: '18.3.1',
    'react-dom': '18.3.1',
    'react-router-dom': '6.30.3',
    'styled-components': '6.1.19',
    zod: '3.25.76',
  },
  engines: { node: '>=20.0.0 <=26.x.x', npm: '>=6.0.0' },
})

write('apps/cms/jsconfig.json', JSON.stringify({
  compilerOptions: { checkJs: false, target: 'ES2021', moduleResolution: 'node' },
  include: ['src/**/*.js', 'config/**/*.js', 'scripts/**/*.js'],
}, null, 2))

write('apps/cms/public/robots.txt', 'User-agent: *\nDisallow: /')
write('apps/cms/public/uploads/.gitkeep', '')
write('apps/cms/.gitignore', '.cache\n.tmp\nbuild\nnode_modules\n.env\npublic/uploads/*\n!public/uploads/.gitkeep')

console.log(`CMS scaffold generated in ${cmsRoot}`)
