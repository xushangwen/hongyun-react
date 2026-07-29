import { parse } from '@babel/parser'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const contactSource = readFileSync(
  resolve(import.meta.dirname, '../../src/pages/ContactPage.jsx'),
  'utf8',
)

function literal(node) {
  if (!node) return undefined
  if (node.type === 'StringLiteral' || node.type === 'NumericLiteral' || node.type === 'BooleanLiteral') {
    return node.value
  }
  if (node.type === 'NullLiteral') return null
  if (node.type === 'ArrayExpression') return node.elements.map(literal)
  if (node.type === 'ObjectExpression') {
    return Object.fromEntries(node.properties.map((property) => [
      property.key.name || property.key.value,
      literal(property.value),
    ]))
  }
  throw new Error(`contact page migration does not support ${node.type}`)
}

function findVariable(node, name) {
  if (!node || typeof node !== 'object') return null
  if (node.type === 'VariableDeclarator' && node.id?.name === name) return node.init
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        const found = findVariable(item, name)
        if (found) return found
      }
    } else if (value && typeof value === 'object') {
      const found = findVariable(value, name)
      if (found) return found
    }
  }
  return null
}

const ast = parse(contactSource, { sourceType: 'module', plugins: ['jsx'] })
const legacyJobs = literal(findVariable(ast, 'jobListings'))
const richTextList = (items) => [{
  type: 'list',
  format: 'unordered',
  children: items.map((text) => ({
    type: 'list-item',
    children: [{ type: 'text', text }],
  })),
}]

export const contactPageContent = {
  title: '联系我们',
  hero: {
    subtitle: '专业团队随时为您提供技术支持与商务咨询',
    desktopMedia: {
      __media: true,
      sourcePath: '/src/assets/img/DJI_20250418104522_0160_D-copy.webp',
      alt: '红运机械生产基地',
    },
    mediaType: 'image',
    imagePosition: 'center',
    overlay: 'dark',
    showScrollIndicator: true,
  },
  inquiryTabLabel: '技术咨询',
  joinTabLabel: '加入我们',
  infoTabLabel: '联系方式',
  inquiryPanel: {
    tagline: '专注混合工艺\n三十年技术积淀',
    items: [
      { label: '响应时效', value: '24小时内技术团队回复' },
      { label: '服务热线', value: '400 915 3366', valueType: 'phone' },
      { label: '商务邮箱', value: 'hy@gzhy.cn', valueType: 'email' },
    ],
    background: {
      __media: true,
      sourcePath: '/src/assets/img/CleanShot 2026-03-13 at 12.57.12@2x.webp',
      alt: '红运机械技术咨询',
    },
  },
  industryOptions: [
    '新能源行业 / 锂电池', '固态电池', '化工行业 / 涂料', '制胶 / 密封胶',
    '食品', '医药', '化妆品', '电子材料', '其他行业',
  ].map((label, order) => ({ label, value: label, order })),
  contactCards: [
    {
      title: '服务热线', iconKey: 'phone',
      items: [
        { label: '全国客服', value: '400 915 3366', valueType: 'phone' },
        { label: '常州基地', value: '0519-86886896', valueType: 'phone' },
        { label: '广州基地', value: '020-34881055', valueType: 'phone' },
      ],
    },
    {
      title: '公司地址', iconKey: 'address',
      items: [
        { label: '江苏红运智能装备有限公司', value: '江苏省常州市武进高新区南湖西路8-8号' },
        { label: '广州红尚机械制造有限公司', value: '广州市南沙区东涌镇同裕街40号' },
      ],
    },
    {
      title: '商务邮箱', iconKey: 'email',
      items: [{ label: '商务合作', value: 'hy@gzhy.cn', valueType: 'email' }],
    },
    {
      title: '工作时间', iconKey: 'time',
      items: [
        { label: '周一至周五', value: '08:30 - 17:30' },
        { label: '周末/节假日', value: '技术支持热线照常服务' },
      ],
    },
  ],
  offices: [
    {
      label: '常州基地', name: '江苏红运智能装备有限公司',
      address: '江苏省常州市武进高新区南湖西路8-8号',
      longitude: 119.959147, latitude: 31.617021,
    },
    {
      label: '广州基地', name: '广州红尚机械制造有限公司',
      address: '广州市南沙区东涌镇同裕街40号',
      longitude: 113.449059, latitude: 22.843914,
    },
  ],
  talentTitle: '人才理念',
  talentDescription: '人才是红运机械最核心的竞争优势。我们广纳贤才、培育匠心，以开放包容的文化激发每位员工的无限潜能，共同书写高端装备制造的新篇章。',
  talentValues: [
    {
      title: '以人为本，尊重个体',
      description: '员工是企业最宝贵的财富。我们致力于为每一位成员创造公平、尊重的成长环境，倾听每份声音，释放每种个性与创造力。',
      iconKey: 'people',
      image: { __media: true, sourcePath: '/src/assets/img/talent-value-01.webp', alt: '以人为本' },
    },
    {
      title: '持续学习，共同成长',
      description: '构建完善的人才培育体系，提供多维度的培训与发展机会，鼓励员工持续学习、勇于创新，与企业同频共振，携手成长。',
      iconKey: 'learning',
      image: { __media: true, sourcePath: '/src/assets/img/talent-value-02.webp', alt: '持续学习' },
    },
    {
      title: '利他原则，协作共赢',
      description: '秉承“利他”工作理念，以团队整体利益为先，相互支持、协作共赢，在开放包容的组织氛围中激发每个人的潜能，共同成就更好的红运。',
      iconKey: 'collaboration',
      image: { __media: true, sourcePath: '/src/assets/img/talent-value-03.webp', alt: '协作共赢' },
    },
  ],
  jobsTitle: '开放职位',
  jobsDescription: '加入红运，与顶尖团队共同推动全球高端装备制造的技术革新。',
  jobListings: legacyJobs.map((job, order) => ({
    legacyKey: job.id,
    title: job.title,
    department: job.dept,
    location: job.location,
    employmentType: job.type,
    tag: job.tag,
    responsibilities: richTextList(job.responsibilities),
    requirements: richTextList(job.requirements),
    salary: job.salary,
    headcount: job.headcount,
    visible: true,
    order,
  })),
  resumeTitle: '简历投递',
  resumeDescription: '填写以下信息直接提交您的申请，HR 团队将在 3 个工作日内与您联系。',
  recruitmentPanel: {
    tagline: '加入红运\n共创装备制造未来',
    items: [
      { label: '招聘邮箱', value: 'recruit@gzhy.cn', valueType: 'email' },
      { label: '响应时效', value: '3 个工作日内回复' },
      { label: '工作时间', value: '周一至周五 09:00 – 17:30' },
    ],
    background: {
      __media: true,
      sourcePath: '/src/assets/img/IMG_4784.webp',
      alt: '加入红运',
    },
  },
  seo: {
    metaTitle: '联系我们｜红运机械',
    metaDescription: '联系红运机械技术团队，获取混合、分散与制浆系统咨询，或查看加入红运的开放职位。',
    noIndex: false,
  },
}
