import './admin.css'
import zhHans from './translations/zh-Hans.js'

const COLLECTION_TYPE_ORDER = [
  ['api::product.product', '产品中心'],
  ['api::product-category.product-category', '产品分类'],
  ['api::product-group.product-group', '产品系统分组'],
  ['api::product-family.product-family', '产品系列'],
  ['api::product-placement.product-placement', '产品展示位'],
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
  ['api::solution-equipment.solution-equipment', '方案核心设备（旧版）'],
  ['api::access-audit-log.access-audit-log', '敏感数据访问审计'],
]

const collectionTitleIdByUid = Object.fromEntries(
  COLLECTION_TYPE_ORDER.map(([uid], index) => [
    uid,
    `hongyun.sidebar.collection.${String(index + 1).padStart(2, '0')}`,
  ]),
)

const sidebarTranslations = Object.fromEntries(
  COLLECTION_TYPE_ORDER.map(([uid, label]) => [collectionTitleIdByUid[uid], label]),
)

export default {
  config: {
    locales: ['zh-Hans'],
    translations: {
      'zh-Hans': { ...zhHans, ...sidebarTranslations },
      en: sidebarTranslations,
    },
  },
  register(app) {
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
  bootstrap({ registerHook }) {
    registerHook(
      'Admin/CM/pages/App/mutate-collection-types-links',
      ({ ctLinks }) => ({
        ctLinks: ctLinks.map((link) => ({
          ...link,
          title: collectionTitleIdByUid[link.uid] || link.title,
        })),
      }),
    )
  },
}
