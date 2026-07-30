/* global document, MutationObserver */
import './admin.css'
import hongyunLogo from './assets/hongyun-admin-logo.svg'
import zhHans from './translations/zh-Hans.js'

const ADMIN_TITLE = '红运后台管理系统'
const PRODUCT_LIST_COLUMNS = ['id', 'name', 'cover', 'categoryNames', 'systemNames']
const PRODUCT_LIST_COLUMNS_MIGRATION = 'HONGYUN_PRODUCT_LIST_COLUMNS_V3'

const brandingTranslations = {
  'Auth.form.welcome.title': '欢迎登录红运后台管理系统',
  'Auth.form.welcome.subtitle': '请使用管理员账号登录',
  'Auth.form.button.login': '登录管理后台',
  'Auth.form.email.label': '管理员账号',
  'Auth.form.email.placeholder': '请输入管理员邮箱',
  'global.password': '密码',
  'Auth.form.password.label': '密码',
  'Auth.form.password.placeholder': '请输入密码',
  'Auth.form.password.hide-password': '隐藏密码',
  'Auth.form.password.show-password': '显示密码',
  'Auth.form.rememberMe.label': '保持登录',
  'Auth.link.forgot-password': '忘记密码？',
  'Auth.form.error.invalid': '管理员账号或密码不正确',
  'Auth.form.error.ratelimit': '登录尝试次数过多，请稍后再试',
  'Auth.components.Oops.text': '当前账号已被停用',
  'Auth.components.Oops.text.admin': '如有疑问，请联系系统管理员',
  'Auth.components.Oops.title': '暂时无法登录',
  'app.containers.AuthPage.ForgotPasswordSuccess.title': '重置邮件已发送',
  'app.containers.AuthPage.ForgotPasswordSuccess.text.email':
    '密码重置邮件可能需要几分钟才能送达',
  'app.containers.AuthPage.ForgotPasswordSuccess.text.contact-admin':
    '如未收到邮件，请联系系统管理员',
}

const COLLECTION_TYPE_ORDER = [
  ['api::product.product', '产品中心'],
  ['api::product-category.product-category', '产品行业（第一级）'],
  ['api::product-group.product-group', '产品系统（第二级）'],
  ['api::product-family.product-family', '产品系列'],
  ['api::solution.solution', '行业方案'],
  ['api::industry.industry', '行业分类'],
  ['api::article.article', '新闻中心'],
  ['api::article-category.article-category', '新闻分类'],
  ['api::case-study.case-study', '客户与技术案例'],
  ['api::case-chapter.case-chapter', '案例章节'],
  ['api::contact-submission.contact-submission', '联系与询盘记录'],
  ['api::resume-submission.resume-submission', '简历记录'],
  ['api::partner.partner', '合作伙伴'],
  ['api::global-presence.global-presence', '全球布局'],
  ['api::technical-dataset.technical-dataset', '共享技术数据（高级）'],
  ['api::url-alias.url-alias', 'URL 别名'],
  ['api::solution-equipment.solution-equipment', '方案核心设备'],
  ['api::access-audit-log.access-audit-log', '敏感数据访问审计'],
]

const SINGLE_TYPE_LABELS = [
  '表单设置',
  '导航设置',
  '关于我们',
  '联系我们页面',
  '首页模块',
  '全站联系方式与品牌',
]

const cmsSchemas = import.meta.glob('../api/**/content-types/**/schema.json', {
  eager: true,
  import: 'default',
})

const SYSTEM_FIELD_LABELS = {
  id: 'ID',
  documentId: '文档 ID',
  createdAt: '创建时间',
  updatedAt: '更新时间',
  publishedAt: '发布时间',
  createdBy: '创建人',
  updatedBy: '更新人',
  locale: '语言',
  localizations: '其他语言版本',
}

const CUSTOM_FIELD_LABELS = {
  'api::product.product': {
    name: '产品名称',
    slug: '网址标识',
    model: '产品型号',
    categories: '所属行业（第一级，可多选）',
    groups: '所属系统（第二级，可多选）',
    cover: '封面',
    categoryNames: '所属行业',
    systemNames: '所属系统',
    placements: '旧目录关系（系统）',
  },
  'api::product-category.product-category': {
    name: '行业名称',
    slug: '行业网址标识',
    summary: '行业说明',
    groups: '下属产品系统',
    placements: '下属产品目录条目',
  },
  'api::product-group.product-group': {
    name: '系统名称',
    slug: '系统网址标识',
    category: '所属行业（第一级）',
    placements: '系统下的产品条目',
  },
  'api::product-placement.product-placement': {
    category: '所属行业（第一级）',
    group: '所属系统（第二级，可不选）',
    product: '产品条目（第三级）',
    displayNameOverride: '前端展示名称',
    order: '同级排序',
  },
  'api::home-page.home-page': {
    title: '页面名称',
    heroSlides: '01 首屏轮播（视频 + 大标题 + 小标题）',
    newsSection: '02 新闻动态',
    aboutSection: '03 关于红运',
    researchSection: '04 研发创新',
    partnerSection: '05 合作客户（共用 Logo 数据集）',
    contactSection: '06 项目咨询',
    sections: '历史迁移区块（高级，一般无需编辑）',
  },
  'api::site-setting.site-setting': {
    companyName: '公司名称',
    logo: '通用 Logo（兼容）',
    headerLogo: '页头横版 Logo',
    footerLogo: '页脚竖版 Logo',
    phone: '全国统一商务热线',
    email: '商务邮箱',
    addresses: '公司地址',
    icp: 'ICP备案号',
    copyright: '页脚版权文字',
    defaultSeo: '全站默认 SEO',
  },
  'api::form-setting.form-setting': {
    industryOptions: '行业选项',
    positionOptions: '职位选项',
    contactCopy: '联系提示语',
    responseTime: '响应时间',
    retentionDays: '数据保留天数',
  },
}

const contentTypeTranslations = Object.fromEntries(
  [...COLLECTION_TYPE_ORDER.map(([, label]) => label), ...SINGLE_TYPE_LABELS].map((label) => [
    label,
    label,
  ]),
)

const contentTypeFieldTranslations = Object.values(cmsSchemas).reduce((translations, schema) => {
  const singularName = schema?.info?.singularName
  if (!singularName) return translations

  const uid = `api::${singularName}.${singularName}`
  const customLabels = CUSTOM_FIELD_LABELS[uid] ?? {}
  const fieldNames = new Set([
    ...Object.keys(schema.attributes ?? {}),
    ...Object.keys(SYSTEM_FIELD_LABELS),
  ])

  fieldNames.forEach((fieldName) => {
    translations[`content-manager.content-types.${uid}.${fieldName}`] =
      customLabels[fieldName] ?? SYSTEM_FIELD_LABELS[fieldName] ?? fieldName
  })

  return translations
}, {})

const migrateProductListColumns = () => {
  const storage = globalThis.localStorage
  if (!storage || storage.getItem(PRODUCT_LIST_COLUMNS_MIGRATION) === 'done') return

  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index)
    if (!key?.startsWith('STRAPI_LIST_VIEW_DISPLAYED_HEADERS:api::product.product:')) continue
    storage.setItem(key, JSON.stringify(PRODUCT_LIST_COLUMNS))
  }

  storage.setItem(PRODUCT_LIST_COLUMNS_MIGRATION, 'done')
}

export default {
  config: {
    auth: {
      logo: hongyunLogo,
    },
    menu: {
      logo: hongyunLogo,
    },
    locales: ['zh-Hans'],
    notifications: {
      releases: false,
    },
    tutorials: false,
    translations: {
      'zh-Hans': {
        ...zhHans,
        ...brandingTranslations,
        ...contentTypeTranslations,
        ...contentTypeFieldTranslations,
      },
      en: {
        ...brandingTranslations,
        ...contentTypeTranslations,
        ...contentTypeFieldTranslations,
      },
    },
  },
  register(app) {
    globalThis.localStorage?.setItem('strapi-admin-language', 'zh-Hans')
    globalThis.localStorage?.setItem('STRAPI_THEME', 'light')
    migrateProductListColumns()

    app.customFields.register({
      name: 'structured-json',
      type: 'json',
      intlLabel: {
        id: 'hongyun.structured-json.label',
        defaultMessage: '可视化结构数据',
      },
      intlDescription: {
        id: 'hongyun.structured-json.description',
        defaultMessage: '用普通输入框编辑结构化内容',
      },
      components: {
        Input: async () =>
          import('./components/StructuredJsonInput.jsx').then((module) => ({
            default: module.default,
          })),
      },
    })
    app.customFields.register({
      name: 'legacy-path',
      type: 'string',
      intlLabel: {
        id: 'hongyun.legacy-path.label',
        defaultMessage: '历史资源标识',
      },
      intlDescription: {
        id: 'hongyun.legacy-path.description',
        defaultMessage: '仅用于兼容原页面资源，日常维护请使用媒体上传字段',
      },
      components: {
        Input: async () =>
          import('./components/LegacyPathInput.jsx').then((module) => ({
            default: module.default,
          })),
      },
    })
  },
  bootstrap() {
    const applyAdminTitle = () => {
      if (document.title !== ADMIN_TITLE) {
        document.title = ADMIN_TITLE
      }
    }
    const hideVendorEntries = () => {
      document
        .querySelectorAll(
          [
            "a[href*='strapi.io']",
            "a[href*='strapi.cloud']",
            "a[href*='cloud.strapi']",
            "a[href*='/billing']",
            "a[href*='/pricing']",
            "a[href*='purchase-audit']",
            "a[href*='purchase-content-history']",
            "a[href*='purchase-single-sign-on']",
          ].join(','),
        )
        .forEach((element) => {
          element.style.setProperty('display', 'none', 'important')
          element.setAttribute('aria-hidden', 'true')
        })
    }

    applyAdminTitle()
    hideVendorEntries()
    new MutationObserver(applyAdminTitle).observe(document.head, {
      childList: true,
      subtree: true,
    })
    new MutationObserver(hideVendorEntries).observe(document.body, {
      childList: true,
      subtree: true,
    })

  },
}
