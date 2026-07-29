import './admin.css'
import zhHans from './translations/zh-Hans.js'

export default {
  config: {
    locales: ['zh-Hans'],
    translations: {
      'zh-Hans': zhHans,
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
}
