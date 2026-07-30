const apiBase = (process.env.API_BASE_URL || 'http://127.0.0.1:3001').replace(/\/$/, '')

async function json(path) {
  const response = await fetch(`${apiBase}${path}`)
  if (!response.ok) throw new Error(`${path} -> ${response.status}`)
  return response.json()
}

function collectMedia(value, urls = new Set()) {
  if (Array.isArray(value)) value.forEach((item) => collectMedia(item, urls))
  else if (value && typeof value === 'object') {
    if (
      typeof value.url === 'string'
      && (/\/uploads\//.test(value.url) || /\/api\/cms\/media\//.test(value.url))
    ) {
      urls.add(value.url)
    }
    Object.values(value).forEach((item) => collectMedia(item, urls))
  }
  return urls
}

const categories = await json('/api/cms/product-categories?locale=zh')
const placements = categories.flatMap((category) => [
  ...(category.ungroupedPlacements || []),
  ...(category.groups || []).flatMap((group) => group.placements || []),
])
const productRoutes = [...new Set(placements.map((placement) => placement.path))]
const productDetails = []
for (const path of productRoutes) {
  const resolved = await json(`/api/cms/resolve?locale=zh&path=${encodeURIComponent(path)}`)
  const category = path.split('/')[2]
  const slug = resolved.product?.slug
  if (!slug) throw new Error(`${path} 未解析到产品`)
  const detail = await json(`/api/cms/products/${slug}?locale=zh&category=${category}`)
  const hasRenderableContent = detail.summary
    || detail.cover
    || detail.hero
    || detail.sections?.length
  if (!detail.title || !hasRenderableContent) throw new Error(`${path} 缺少可渲染详情`)
  productDetails.push(detail)
}

const industries = await json('/api/cms/industries?locale=zh')
const solutionDetails = []
for (const industry of industries) {
  const response = await json(`/api/cms/industries/${industry.slug}/solutions?locale=zh`)
  for (const solution of response.list || []) {
    const detail = await json(`/api/cms/solutions/${solution.slug}?locale=zh`)
    if (!detail.title || !detail.sections?.length) throw new Error(`${solution.slug} 缺少可渲染详情`)
    solutionDetails.push(detail)
  }
}

const news = await json('/api/cms/news?locale=zh&pageSize=100')
const articleDetails = []
for (const article of news.list || []) {
  const detail = await json(`/api/cms/news/${article.slug}?locale=zh`)
  if (!detail.title || !detail.sections?.length) throw new Error(`${article.slug} 缺少新闻正文`)
  articleDetails.push(detail)
}

const about = await json('/api/cms/about?locale=zh')
const contact = await json('/api/cms/contact?locale=zh')
const mediaUrls = collectMedia([
  categories,
  productDetails,
  solutionDetails,
  news,
  articleDetails,
  about,
  contact,
])
const failures = []
for (const mediaUrl of mediaUrls) {
  const response = await fetch(new URL(mediaUrl, apiBase))
  if (!response.ok) failures.push(`${response.status} ${mediaUrl}`)
}
if (failures.length) throw new Error(`媒体读取失败:\n${failures.join('\n')}`)

console.log(`✓ 产品分类 ${categories.length}`)
console.log(`✓ 产品前端路径 ${productRoutes.length} / 唯一产品 ${new Set(productDetails.map((item) => item.documentId)).size}`)
console.log(`✓ 含结构化区块的产品 ${new Set(productDetails.filter((item) => item.sections?.length).map((item) => item.documentId)).size}`)
console.log(`✓ 解决方案 ${solutionDetails.length}`)
console.log(`✓ 新闻 ${news.list?.length || 0}`)
console.log(`✓ BFF 深层媒体 ${mediaUrls.size}`)
console.log('✅ 本地 CMS → BFF → 前端数据契约验证通过')
