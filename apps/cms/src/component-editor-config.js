'use strict'

const COMPONENT_ITEM_CONFIGS = {
  'content.equipment-grid': {
    mainField: 'title',
    labels: {
      title: '模块标题',
      visible: '前台显示',
      items: '核心设备',
      layoutVariant: '排版方式',
      internalName: '内部区块名称（系统）',
      equipmentKeys: '旧设备关联 Key（系统）',
    },
    edit: [
      [{ name: 'title', size: 8 }, { name: 'visible', size: 4 }],
      [{ name: 'items', size: 12 }],
      [{ name: 'layoutVariant', size: 6 }],
    ],
  },
  'content.data-table': {
    mainField: 'title',
    labels: {
      title: '数据表标题',
      visible: '前台显示',
      rows: '表格内容（可直接粘贴 Excel）',
      columns: '列设置（通常无需调整）',
      unitNotes: '单位与补充说明',
      headerGroups: '分组表头（高级）',
      layoutVariant: '显示方式（高级）',
      datasetView: '显示设置（高级）',
      internalName: '内部区块名称（系统）',
      datasetKey: '旧数据关联 Key（系统）',
    },
    edit: [
      [{ name: 'title', size: 8 }, { name: 'visible', size: 4 }],
      [{ name: 'rows', size: 12 }],
      [{ name: 'unitNotes', size: 12 }],
      [{ name: 'headerGroups', size: 12 }],
      [{ name: 'layoutVariant', size: 6 }, { name: 'datasetView', size: 6 }],
    ],
  },
  'shared.feature-item': {
    mainField: 'title',
    labels: {
      title: '特点名称',
      description: '特点说明',
      iconMedia: '特点图标',
      iconKey: '图标键（系统）',
      bullets: '补充要点',
      order: '排序',
    },
    edit: [
      [{ name: 'title', size: 6 }, { name: 'description', size: 6 }],
      [{ name: 'iconMedia', size: 6 }, { name: 'iconKey', size: 6 }],
      [{ name: 'bullets', size: 12 }],
      [{ name: 'order', size: 4 }],
    ],
  },
  'shared.equipment-item': {
    mainField: 'name',
    labels: {
      name: '设备名称',
      image: '设备图片',
      alt: '图片替代文本',
      featureContent: '设备特点（富文本）',
      features: '旧版设备特点（系统）',
      paragraphs: '详细说明',
      imageFit: '图片适配',
      imagePosition: '图片位置',
    },
    edit: [
      [{ name: 'name', size: 8 }, { name: 'image', size: 4 }],
      [{ name: 'featureContent', size: 12 }],
      [{ name: 'paragraphs', size: 12 }],
      [{ name: 'alt', size: 6 }, { name: 'imageFit', size: 3 }, { name: 'imagePosition', size: 3 }],
    ],
  },
  'shared.media-item': {
    mainField: 'label',
    labels: {
      label: '媒体名称',
      role: '媒体用途',
      media: '图片 / 视频',
      alt: '替代文本（SEO / 无障碍）',
      caption: '说明文字',
      imageFit: '图片适配',
      imagePosition: '图片位置',
      aspectVariant: '画面比例',
      sourcePath: '历史源路径（系统）',
    },
    edit: [
      [{ name: 'label', size: 6 }, { name: 'role', size: 6 }],
      [{ name: 'media', size: 12 }],
      [{ name: 'alt', size: 6 }, { name: 'caption', size: 6 }],
      [
        { name: 'imageFit', size: 4 },
        { name: 'imagePosition', size: 4 },
        { name: 'aspectVariant', size: 4 },
      ],
      [{ name: 'sourcePath', size: 12 }],
    ],
  },
  'shared.text-item': {
    mainField: 'text',
    labels: {
      text: '内容',
      title: '标题（可选）',
      label: '标签（可选）',
      value: '值（可选）',
      order: '排序',
    },
    edit: [
      [{ name: 'text', size: 12 }],
      [{ name: 'title', size: 6 }, { name: 'label', size: 6 }],
      [{ name: 'value', size: 8 }, { name: 'order', size: 4 }],
    ],
  },
  'shared.evidence-item': {
    mainField: 'title',
    labels: {
      title: '证据名称',
      kind: '证据类型',
      description: '证据说明',
      mediaItems: '媒体内容',
      datasetKey: '数据集 Key',
      span: '所占列数',
      layoutVariant: '布局方式',
    },
    edit: [
      [{ name: 'title', size: 6 }, { name: 'kind', size: 6 }],
      [{ name: 'description', size: 12 }],
      [{ name: 'mediaItems', size: 12 }],
      [{ name: 'datasetKey', size: 6 }, { name: 'layoutVariant', size: 3 }, { name: 'span', size: 3 }],
    ],
  },
  'contact.info-item': {
    mainField: 'label',
    labels: {
      label: '信息名称',
      value: '信息内容',
      valueType: '内容类型',
    },
    edit: [
      [{ name: 'label', size: 6 }, { name: 'valueType', size: 6 }],
      [{ name: 'value', size: 12 }],
    ],
  },
}

const CONTENT_TYPE_CONFIGS = {
  'api::home-page.home-page': {
    mainField: 'title',
    labels: {
      title: '页面名称',
      heroSlides: '01 首屏轮播（视频 + 大标题 + 小标题）',
      newsSection: '02 新闻动态',
      aboutSection: '03 关于红运',
      researchSection: '04 研发创新',
      partnerSection: '05 合作客户（共用 Logo 数据集）',
      contactSection: '06 项目咨询',
      seo: 'SEO 设置',
      sections: '旧首页迁移数据（已停用）',
      sourceChecksum: '来源校验（系统）',
    },
    list: ['title', 'updatedAt', 'publishedAt'],
    edit: [
      [{ name: 'title', size: 12 }],
      [{ name: 'heroSlides', size: 12 }],
      [{ name: 'newsSection', size: 12 }],
      [{ name: 'aboutSection', size: 12 }],
      [{ name: 'researchSection', size: 12 }],
      [{ name: 'partnerSection', size: 12 }],
      [{ name: 'contactSection', size: 12 }],
      [{ name: 'seo', size: 12 }],
    ],
  },
  'api::product.product': {
    mainField: 'name',
    labels: {
      name: '产品名称',
      model: '产品型号',
      categories: '所属行业（第一级，可多选）',
      groups: '所属系统（第二级，可多选）',
      categoryNames: '所属行业',
      systemNames: '所属系统',
      summary: '产品简介',
      cover: '封面',
      hero: '产品页首屏',
      family: '所属产品系列',
      relatedProducts: '相关产品',
      sections: '产品详情模块',
      seo: 'SEO 设置',
      slug: '网址标识',
      order: '默认排序',
      legacyKey: '内部关联 Key（系统）',
      sourceChecksum: '来源校验（系统）',
      placements: '旧目录关系（系统）',
    },
    list: ['id', 'name', 'cover', 'categoryNames', 'systemNames'],
    hiddenListFields: ['categories', 'groups'],
    edit: [
      [{ name: 'name', size: 8 }, { name: 'model', size: 4 }],
      [{ name: 'categories', size: 6 }, { name: 'groups', size: 6 }],
      [{ name: 'summary', size: 12 }],
      [{ name: 'cover', size: 6 }, { name: 'hero', size: 6 }],
      [{ name: 'sections', size: 12 }],
      [{ name: 'family', size: 6 }, { name: 'relatedProducts', size: 6 }],
      [{ name: 'seo', size: 12 }],
      [{ name: 'slug', size: 8 }, { name: 'order', size: 4 }],
    ],
  },
  'api::technical-dataset.technical-dataset': {
    mainField: 'title',
    labels: {
      title: '数据名称',
      kind: '数据类型',
      rows: '数据内容（支持 Excel / CSV）',
      columns: '列设置',
      headerGroups: '分组表头（可选）',
      chartConfig: '图表设置（仅图表数据）',
      unitNotes: '单位与补充说明',
      sourceFile: '源文件（可选）',
      schemaVersion: '结构版本（系统）',
      legacyKey: '内部关联 Key（系统）',
      version: '内容版本（系统）',
      sourceChecksum: '来源校验（系统）',
    },
    list: ['title', 'kind', 'updatedAt'],
    edit: [
      [{ name: 'title', size: 8 }, { name: 'kind', size: 4 }],
      [{ name: 'rows', size: 12 }],
      [{ name: 'columns', size: 12 }],
      [{ name: 'unitNotes', size: 6 }, { name: 'sourceFile', size: 6 }],
      [{ name: 'headerGroups', size: 12 }],
      [{ name: 'chartConfig', size: 12 }],
    ],
  },
}

async function configureComponentItemEditors(strapi) {
  const store = strapi.store({ type: 'plugin', name: 'content_manager' })
  let updated = 0

  for (const [uid, desired] of Object.entries(COMPONENT_ITEM_CONFIGS)) {
    const key = `configuration_components::${uid}`
    const current = await store.get({ key })
    if (!current) continue

    const next = structuredClone(current)
    next.settings.mainField = desired.mainField
    next.settings.defaultSortBy = desired.mainField
    next.layouts.edit = desired.edit

    for (const [field, label] of Object.entries(desired.labels)) {
      const metadata = next.metadatas?.[field]
      if (!metadata) continue
      metadata.edit.label = label
      metadata.list.label = label
    }

    for (const field of desired.hiddenListFields ?? []) {
      const metadata = next.metadatas?.[field]
      if (!metadata) continue
      metadata.list.visible = false
    }

    if (JSON.stringify(next) === JSON.stringify(current)) continue
    await store.set({ key, value: next })
    updated += 1
  }

  if (updated) {
    strapi.log.info(`[bootstrap] 已优化 ${updated} 类内容组件的后台名称与字段布局`)
  }

  let contentTypesUpdated = 0
  for (const [uid, desired] of Object.entries(CONTENT_TYPE_CONFIGS)) {
    const key = `configuration_content_types::${uid}`
    const current = await store.get({ key })
    if (!current) continue

    const next = structuredClone(current)
    next.settings.mainField = desired.mainField
    next.settings.defaultSortBy = desired.mainField
    next.layouts.list = desired.list
    next.layouts.edit = desired.edit

    for (const [field, label] of Object.entries(desired.labels)) {
      const metadata = next.metadatas?.[field]
      if (!metadata) continue
      metadata.edit.label = label
      metadata.list.label = label
    }

    if (JSON.stringify(next) === JSON.stringify(current)) continue
    await store.set({ key, value: next })
    contentTypesUpdated += 1
  }

  if (contentTypesUpdated) {
    strapi.log.info(`[bootstrap] 已优化 ${contentTypesUpdated} 类高级内容的数据编辑布局`)
  }
}

module.exports = {
  COMPONENT_ITEM_CONFIGS,
  CONTENT_TYPE_CONFIGS,
  configureComponentItemEditors,
}
