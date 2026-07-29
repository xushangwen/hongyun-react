import { parse } from '@babel/parser'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, extname, relative, resolve } from 'node:path'
import { contactPageContent } from './contact-page-content.mjs'

const root = resolve(import.meta.dirname, '../..')
const srcRoot = resolve(root, 'src')
const publicRoot = resolve(root, 'public')
const featureIconKeyByComponent = {
  IconDevelopment: 'development',
  IconTarget: 'target',
  IconConnect: 'connect',
  IconLeaf: 'leaf',
  IconEnergy: 'energy',
  IconProcess: 'process',
  IconQuality: 'quality',
  IconPerformance: 'performance',
  IconFilter: 'filter',
  IconLike: 'like',
  IconLaptop: 'laptop',
  IconSpeed: 'speed',
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex')
}

function readSource(relativePath) {
  return readFileSync(resolve(root, relativePath), 'utf8')
}

function parseFile(relativePath) {
  const source = readSource(relativePath)
  return {
    source,
    ast: parse(source, {
      sourceType: 'module',
      plugins: ['jsx'],
      errorRecovery: false,
    }),
  }
}

function evaluate(node, env = {}) {
  if (!node) return undefined
  if (node.type === 'StringLiteral' || node.type === 'NumericLiteral' || node.type === 'BooleanLiteral') return node.value
  if (node.type === 'NullLiteral') return null
  if (node.type === 'Identifier') return env[node.name]
  if (node.type === 'UnaryExpression' && node.operator === '-') {
    const value = evaluate(node.argument, env)
    return typeof value === 'number' ? -value : undefined
  }
  if (node.type === 'TemplateLiteral') {
    let output = ''
    for (let index = 0; index < node.quasis.length; index += 1) {
      output += node.quasis[index].value.cooked
      if (index < node.expressions.length) {
        const value = evaluate(node.expressions[index], env)
        if (value === undefined) return undefined
        output += String(value)
      }
    }
    return output
  }
  if (node.type === 'ArrayExpression') {
    return node.elements.map((element) => evaluate(element, env)).filter((value) => value !== undefined)
  }
  if (node.type === 'ObjectExpression') {
    const output = {}
    for (const property of node.properties) {
      if (property.type !== 'ObjectProperty' || property.computed) continue
      const key = property.key.name ?? property.key.value
      const value = evaluate(property.value, env)
      if (value !== undefined) output[key] = value
    }
    return output
  }
  if (node.type === 'BinaryExpression' && node.operator === '+') {
    const left = evaluate(node.left, env)
    const right = evaluate(node.right, env)
    if (left === undefined || right === undefined) return undefined
    return left + right
  }
  return undefined
}

function staticEnvironment(relativePath) {
  const { ast, source } = parseFile(relativePath)
  const env = {}
  for (const statement of ast.program.body) {
    const declaration = statement.type === 'ExportNamedDeclaration' ? statement.declaration : statement
    if (declaration?.type !== 'VariableDeclaration') continue
    for (const item of declaration.declarations) {
      if (item.id.type !== 'Identifier') continue
      const value = evaluate(item.init, env)
      if (value !== undefined) env[item.id.name] = value
    }
  }
  return { env, ast, source }
}

function walk(node, visit) {
  if (!node || typeof node !== 'object') return
  visit(node)
  for (const [key, value] of Object.entries(node)) {
    if (['loc', 'start', 'end', 'extra', 'comments', 'tokens'].includes(key)) continue
    if (Array.isArray(value)) {
      for (const item of value) walk(item, visit)
    } else if (value && typeof value === 'object' && typeof value.type === 'string') {
      walk(value, visit)
    }
  }
}

function normalizeText(value) {
  return value.replace(/\s+/g, ' ').trim()
}

function isContentText(value) {
  const text = normalizeText(value)
  if (text.length < 2) return false
  if (/^[a-z0-9_.:/@#%+\-]+$/i.test(text)) return false
  return /[\u3400-\u9fff]/u.test(text)
}

function resolveMediaPath(relativePath, sourceValue, imports) {
  const value = imports[sourceValue] ?? sourceValue
  if (typeof value !== 'string') return null
  if (value.startsWith('/')) {
    const publicFile = resolve(publicRoot, value.slice(1))
    return { sourcePath: value, sourceFile: relative(root, publicFile) }
  }
  if (value.startsWith('.')) {
    const sourceFile = resolve(dirname(resolve(root, relativePath)), value)
    return { sourcePath: `/${relative(root, sourceFile).replaceAll('\\', '/')}`, sourceFile: relative(root, sourceFile) }
  }
  return null
}

const dualPlanetaryDatasetRules = {
  'dual-planetary-mixer': (designVolume) => designVolume > 287,
  'dual-planetary-mixer-mid': (designVolume) => designVolume > 43 && designVolume <= 287,
  'dual-planetary-mixer-lab': (designVolume) => designVolume <= 43,
}

function scopeDatasetRows(key, name, rows) {
  const rule = name === 'allModels' ? dualPlanetaryDatasetRules[key] : null
  if (!rule) return rows
  return rows.filter((row) => {
    const designVolume = Number.parseFloat(row.designVol)
    return Number.isFinite(designVolume) && rule(designVolume)
  })
}

function datasetTitle(key, name, title) {
  if (name === 'allModels' && dualPlanetaryDatasetRules[key]) {
    return `${title} · 型号参数`
  }
  return `${title} · ${name}`
}

function extractPage(relativePaths, key, title) {
  const texts = []
  const mediaItems = []
  const featureItems = []
  const datasets = []
  const staticData = {}
  const featureIconKeys = new Map()
  const seenText = new Set()
  const seenMedia = new Set()
  const sourceParts = []

  for (const relativePath of relativePaths) {
    const { env, ast, source } = staticEnvironment(relativePath)
    sourceParts.push(source)
    walk(ast.program, (node) => {
      if (node.type !== 'ObjectExpression') return
      const properties = Object.fromEntries(node.properties
        .filter((property) => property.type === 'ObjectProperty' && !property.computed)
        .map((property) => [property.key.name ?? property.key.value, property.value]))
      const titleNode = properties.title
      const iconNode = properties.Icon
      if (titleNode?.type === 'StringLiteral' && iconNode?.type === 'Identifier') {
        const iconKey = featureIconKeyByComponent[iconNode.name]
        if (iconKey) featureIconKeys.set(titleNode.value, iconKey)
      }
    })
    const imports = {}
    for (const statement of ast.program.body) {
      if (statement.type !== 'ImportDeclaration') continue
      for (const specifier of statement.specifiers) imports[specifier.local.name] = statement.source.value
    }

    for (const [name, value] of Object.entries(env)) {
      const collectStaticMedia = (candidate) => {
        if (typeof candidate === 'string' && /\.(avif|webp|png|jpe?g|svg|mp4|webm)(?:[?#].*)?$/i.test(candidate)) {
          const resolved = resolveMediaPath(relativePath, candidate, imports)
          if (resolved && !seenMedia.has(resolved.sourceFile)) {
            seenMedia.add(resolved.sourceFile)
            mediaItems.push({
              ...resolved,
              alt: title,
              role: /\.(mp4|webm)$/i.test(candidate) ? 'video' : 'gallery',
              imageFit: 'contain',
              imagePosition: 'center',
              aspectVariant: 'auto',
            })
          }
          return
        }
        if (Array.isArray(candidate)) {
          candidate.forEach(collectStaticMedia)
        } else if (candidate && typeof candidate === 'object') {
          Object.values(candidate).forEach(collectStaticMedia)
        }
      }
      collectStaticMedia(value)
      if (Array.isArray(value) && value.length) {
        const objects = value.filter((item) => item && typeof item === 'object' && !Array.isArray(item))
        if (objects.length === value.length) {
          const features = objects
            .map((item, index) => ({
              title: item.title ?? item.name ?? item.label,
              iconKey: featureIconKeys.get(item.title ?? item.name ?? item.label),
              description: item.description ?? item.desc ?? item.text ?? item.summary ?? '',
              bullets: Array.isArray(item.bullets)
                ? item.bullets.map((bullet, bulletIndex) => ({ text: String(bullet), order: bulletIndex }))
                : [],
              order: index,
            }))
            .filter((item) => typeof item.title === 'string' && isContentText(item.title))
          if (features.length >= 2) featureItems.push(...features)

          const primitiveRows = objects.filter((item) =>
            Object.values(item).every((itemValue) => ['string', 'number', 'boolean'].includes(typeof itemValue) || itemValue == null))
          if (primitiveRows.length === objects.length && primitiveRows.length >= 2) {
            const columns = [...new Set(primitiveRows.flatMap((row) => Object.keys(row)))]
              .map((columnId) => ({ id: columnId, label: columnId, type: 'text' }))
            if (columns.length >= 2) {
              const rows = scopeDatasetRows(key, name, primitiveRows)
              datasets.push({
                title: datasetTitle(key, name, title),
                kind: 'spec-table',
                schemaVersion: 1,
                columns,
                rows,
                legacyKey: `${key}:dataset:${name}`,
                version: 1,
                sourceChecksum: sha256(JSON.stringify(rows)),
              })
            }
          }
        }
      }
      if (value && typeof value === 'object' && JSON.stringify(value).length < 250000) staticData[name] = value
    }

    walk(ast.program, (node) => {
      if (node.type === 'JSXText' && isContentText(node.value)) {
        const text = normalizeText(node.value)
        if (!seenText.has(text)) {
          seenText.add(text)
          texts.push(text)
        }
      }
      if (node.type === 'JSXExpressionContainer') {
        const value = evaluate(node.expression, env)
        if (typeof value === 'string' && isContentText(value)) {
          const text = normalizeText(value)
          if (!seenText.has(text)) {
            seenText.add(text)
            texts.push(text)
          }
        }
      }
      if (node.type !== 'JSXAttribute' || node.name?.type !== 'JSXIdentifier') return
      const attributeName = node.name.name
      const directValue = node.value?.type === 'StringLiteral'
        ? node.value.value
        : node.value?.type === 'JSXExpressionContainer'
          ? evaluate(node.value.expression, env)
          : undefined
      if (['title', 'subtitle', 'description', 'desc', 'label', 'caption'].includes(attributeName) &&
          typeof directValue === 'string' && isContentText(directValue)) {
        const text = normalizeText(directValue)
        if (!seenText.has(text)) {
          seenText.add(text)
          texts.push(text)
        }
      }
      if (!['src', 'image', 'poster', 'videoSrc'].includes(attributeName) || typeof directValue !== 'string') return
      const resolved = resolveMediaPath(relativePath, directValue, imports)
      if (!resolved || seenMedia.has(resolved.sourceFile)) return
      seenMedia.add(resolved.sourceFile)
      mediaItems.push({
        ...resolved,
        alt: title,
        role: attributeName === 'poster' ? 'cover' : attributeName === 'videoSrc' ? 'video' : 'gallery',
        imageFit: 'contain',
        imagePosition: 'center',
        aspectVariant: 'auto',
      })
    })

    for (const [identifier, importPath] of Object.entries(imports)) {
      if (!/\.(avif|webp|png|jpe?g|svg|mp4|webm)$/i.test(importPath)) continue
      const resolved = resolveMediaPath(relativePath, identifier, imports)
      if (!resolved || seenMedia.has(resolved.sourceFile)) continue
      seenMedia.add(resolved.sourceFile)
      mediaItems.push({
        ...resolved,
        alt: title,
        role: /\.(mp4|webm)$/i.test(importPath) ? 'video' : 'gallery',
        imageFit: 'contain',
        imagePosition: 'center',
        aspectVariant: 'auto',
      })
    }
  }

  const blocks = texts.map((text) => ({
    type: 'paragraph',
    children: [{ type: 'text', text }],
  }))
  const sections = []
  if (blocks.length) {
    sections.push({
      __component: 'content.rich-text',
      internalName: '现有页面正文',
      visible: true,
      title: '内容介绍',
      body: blocks,
      layoutVariant: 'default',
      theme: 'light',
    })
  }
  if (featureItems.length) {
    const unique = [...new Map(featureItems.map((item) => [item.title, item])).values()]
    sections.push({
      __component: 'content.feature-grid',
      internalName: '现有页面特点',
      visible: true,
      title: '产品特点',
      items: unique,
      columns: Math.min(4, Math.max(2, unique.length)),
      layoutVariant: 'cards',
    })
  }
  if (mediaItems.length) {
    sections.push({
      __component: 'content.media-gallery',
      internalName: '现有页面媒体',
      visible: true,
      title: '图片与视频',
      variant: 'gallery',
      items: mediaItems,
      layoutVariant: 'grid',
    })
  }
  for (const dataset of datasets) {
    sections.push({
      __component: 'content.data-table',
      internalName: dataset.title,
      visible: true,
      title: dataset.title,
      datasetKey: dataset.legacyKey,
      layoutVariant: 'scroll',
    })
  }
  if (['pipeline-pulping', 'twin-screw-pulping'].includes(key)) {
    sections.push({
      __component: 'special.renderer',
      internalName: '复杂技术验证排版',
      visible: true,
      rendererKey: key === 'pipeline-pulping'
        ? 'pipeline-material-validation-v1'
        : 'twin-screw-validation-v1',
      schemaVersion: 1,
      payload: staticData,
    })
  }
  return {
    sections,
    datasets,
    mediaItems,
    sourceFiles: relativePaths,
    sourceChecksum: sha256(sourceParts.join('\n')),
  }
}

const { env: productEnv } = staticEnvironment('src/data/productCategories.js')
const categoriesSource = productEnv.productCategories
if (!Array.isArray(categoriesSource)) throw new Error('无法解析 productCategories')

const productPageMap = {
  'dual-planetary-mixer': ['src/pages/DualPlanetaryMixerPage.jsx'],
  'dual-planetary-mixer-mid': ['src/pages/DualPlanetaryMixerPage.jsx'],
  'dual-planetary-mixer-lab': ['src/pages/DualPlanetaryMixerPage.jsx'],
  'high-speed-disperser': ['src/pages/HighSpeedDisperserPage.jsx'],
  kneader: ['src/pages/KneaderPage.jsx'],
  'pipeline-disperser': ['src/pages/PipelineDisperserPage.jsx'],
  'cp-disperser': ['src/pages/CpDisperserPage.jsx'],
  'cp-tank-a': ['src/pages/CpTankAPage.jsx'],
  'cp-tank-b': ['src/pages/CpTankBPage.jsx'],
  'twin-screw-pulper': ['src/pages/TwinScrewPulperPage.jsx'],
  'dry-electrode-mixer': ['src/pages/SsbDryMixerPage.jsx'],
  'electromagnetic-feeder': ['src/pages/SsbFeederPage.jsx'],
  'twin-screw-dry-extruder': ['src/pages/SsbExtruderPage.jsx'],
  'solid-electrolyte-coater': ['src/pages/SsbCoaterPage.jsx'],
  'ssb-pipeline-mixer': ['src/pages/SsbPipelineMixerPage.jsx'],
  'multi-mixer': ['src/pages/SsbMultiMixerPage.jsx'],
  'ssb-high-pressure-washer': ['src/pages/SsbHighPressureWasherPage.jsx'],
  'spray-nozzle': ['src/pages/SprayNozzlePage.jsx'],
}
const chemicalSlugs = new Set(categoriesSource.find((item) => item.id === 'chemical')?.products?.map((item) => item.slug) ?? [])
for (const slugValue of chemicalSlugs) {
  if (!productPageMap[slugValue]) productPageMap[slugValue] = ['src/pages/ChemicalProductDetailPage.jsx']
}

const categories = []
const groups = []
const productsBySlug = new Map()
const placements = []
const aliases = []
const technicalDatasets = []

for (const [categoryIndex, category] of categoriesSource.entries()) {
  categories.push({
    name: category.name,
    slug: category.id,
    summary: category.desc,
    iconKey: category.id,
    order: categoryIndex,
    visible: true,
    legacyKey: `product-category:${category.id}`,
  })
  const categoryGroups = category.systems ?? [{ name: '', slug: null, products: category.products ?? [] }]
  for (const [groupIndex, group] of categoryGroups.entries()) {
    const groupLegacyKey = group.slug ? `product-group:${category.id}:${group.slug}` : null
    if (group.slug) {
      groups.push({
        name: group.name,
        slug: `${category.id}-${group.slug}`,
        categoryKey: `product-category:${category.id}`,
        order: groupIndex,
        visible: true,
        legacyKey: groupLegacyKey,
      })
    }
    for (const [productIndex, item] of (group.products ?? []).entries()) {
      if (!productsBySlug.has(item.slug)) {
        const page = extractPage(productPageMap[item.slug] ?? ['src/pages/ProductDetailPage.jsx'], item.slug, item.name)
        technicalDatasets.push(...page.datasets)
        productsBySlug.set(item.slug, {
          name: item.name,
          slug: item.slug,
          summary: '',
          coverPath: item.image ?? null,
          hero: {
            titleOverride: item.name,
            subtitle: '',
            mediaType: 'image',
            imagePosition: 'center',
            overlay: 'dark',
            showScrollIndicator: true,
          },
          sections: page.sections,
          order: productsBySlug.size,
          legacyKey: `product:${item.slug}`,
          sourceChecksum: page.sourceChecksum,
          sourceFiles: page.sourceFiles,
        })
      }
      const path = item.customPath ?? `/products/${category.id}/${item.slug}`
      placements.push({
        productKey: `product:${item.slug}`,
        categoryKey: `product-category:${category.id}`,
        groupKey: groupLegacyKey,
        order: productIndex,
        featured: false,
        displayNameOverride: item.name,
        coverPath: item.image ?? null,
        imageFit: item.imgContain ? 'contain' : 'cover',
        imagePosition: 'center',
        cardVariant: 'default',
        legacyKey: `placement:${category.id}:${group.slug ?? 'ungrouped'}:${item.slug}`,
      })
      aliases.push({
        path,
        targetType: 'product',
        targetKey: `product:${item.slug}`,
        localeCode: 'zh',
        canonical: ![...productsBySlug.values()].some((product) => product.legacyKey === `product:${item.slug}` && aliases.some((alias) => alias.targetKey === product.legacyKey)),
        redirectCode: 'none',
        active: true,
        categoryContext: category.id,
      })
    }
  }
}

const solutionCatalog = [
  ['new-energy', 'PD 制浆系统', 'pd-pulping', 'src/pages/PDPulpingPage.jsx'],
  ['new-energy', '高效管线式制浆系统', 'pipeline-pulping', 'src/pages/PipelinePulpingPage.jsx'],
  ['new-energy', '高速循环制浆系统', 'circulation-pulping', 'src/pages/CirculationPulpingPage.jsx'],
  ['new-energy', '双螺杆连续制浆系统', 'twin-screw-pulping', 'src/pages/TwinScrewPulpingPage.jsx'],
  ['solid-state-battery', '干法电极成套设备解决方案', 'dry-powder-mixer', 'src/pages/DryPowderMixerPage.jsx'],
  ['solid-state-battery', '湿法电极成套设备解决方案', 'wet-electrode-system', 'src/pages/WetElectrodeSystemPage.jsx'],
  ['chemical', '全自动生产系统', 'auto-production', 'src/pages/ChemicalAutoProductionPage.jsx'],
]
const industryMeta = {
  'new-energy': ['新能源', '锂电池浆料制备系统解决方案'],
  'solid-state-battery': ['固态电池', '面向固态电池干法与湿法电极制备的系统方案'],
  chemical: ['化工', '高粘度与多组分物料自动化生产系统'],
}
const industries = Object.entries(industryMeta).map(([industrySlug, [name, summary]], index) => ({
  name, slug: industrySlug, summary, order: index, visible: true,
  legacyKey: `industry:${industrySlug}`,
}))
const solutions = solutionCatalog.map(([industrySlug, name, solutionSlug, file], index) => {
  const page = extractPage([file], solutionSlug, name)
  technicalDatasets.push(...page.datasets)
  const path = `/solutions/${industrySlug}/${solutionSlug}`
  aliases.push({
    path, targetType: 'solution', targetKey: `solution:${solutionSlug}`, localeCode: 'zh',
    canonical: true, redirectCode: 'none', active: true, categoryContext: industrySlug,
  })
  return {
    name, slug: solutionSlug, industryKey: `industry:${industrySlug}`, summary: '',
    hero: {
      titleOverride: name, subtitle: '', mediaType: 'image', imagePosition: 'center',
      overlay: 'dark', showScrollIndicator: true,
    },
    sections: page.sections, order: index, legacyKey: `solution:${solutionSlug}`,
    sourceChecksum: page.sourceChecksum, sourceFiles: page.sourceFiles,
  }
})

const productFamilies = [
  {
    name: '双行星动力混合机系列',
    slug: 'dual-planetary-mixer-series',
    summary: '生产型、中试型与实验型双行星动力混合机共享资料系列。',
    sharedDatasetKeys: technicalDatasets
      .filter((dataset) => dataset.legacyKey.startsWith('dual-planetary-mixer:dataset:'))
      .map((dataset) => dataset.legacyKey),
    productKeys: [
      'product:dual-planetary-mixer',
      'product:dual-planetary-mixer-mid',
      'product:dual-planetary-mixer-lab',
    ],
    legacyKey: 'product-family:dual-planetary-mixer',
  },
]
for (const product of productsBySlug.values()) {
  if (productFamilies[0].productKeys.includes(product.legacyKey)) {
    product.familyKey = productFamilies[0].legacyKey
  }
}

const cases = [
  {
    title: '双行星动力混合机客户案例',
    slug: 'dual-planetary-mixer-customer-cases',
    caseType: 'customer',
    summary: '当前双行星产品页与 PD 制浆方案共用的客户案例。',
    confidentialityLevel: 'anonymous',
    relatedProductKeys: productFamilies[0].productKeys,
    relatedSolutionKeys: ['solution:pd-pulping'],
    sections: productsBySlug.get('dual-planetary-mixer')?.sections.filter((section) => section.__component === 'content.media-gallery') ?? [],
    legacyKey: 'case:pd-shared-customer-cases',
  },
  {
    title: '高速循环制浆技术验证',
    slug: 'circulation-pulping-validation',
    caseType: 'technical-validation',
    summary: '高速循环制浆现有来料、流变、稳定性与 SEM 验证内容。',
    confidentialityLevel: 'public',
    relatedProductKeys: [],
    relatedSolutionKeys: ['solution:circulation-pulping'],
    sections: solutions.find((item) => item.slug === 'circulation-pulping')?.sections ?? [],
    legacyKey: 'case:circulation-pulping-validation',
  },
  {
    title: '高效管线式制浆材料体系验证',
    slug: 'pipeline-pulping-validation',
    caseType: 'technical-validation',
    summary: '磷酸铁锂、NCA 与石墨材料体系的现有技术验证内容。',
    confidentialityLevel: 'public',
    relatedProductKeys: [],
    relatedSolutionKeys: ['solution:pipeline-pulping'],
    sections: solutions.find((item) => item.slug === 'pipeline-pulping')?.sections ?? [],
    legacyKey: 'case:pipeline-pulping-validation',
  },
  {
    title: '双螺杆连续制浆正负极验证',
    slug: 'twin-screw-pulping-validation',
    caseType: 'technical-validation',
    summary: '双螺杆连续制浆正极、负极、稳定性、TSI、EDS 与 SEM 验证内容。',
    confidentialityLevel: 'public',
    relatedProductKeys: [],
    relatedSolutionKeys: ['solution:twin-screw-pulping'],
    sections: solutions.find((item) => item.slug === 'twin-screw-pulping')?.sections ?? [],
    legacyKey: 'case:twin-screw-pulping-validation',
  },
]
const caseChapters = [
  ['case:pipeline-pulping-validation', '磷酸铁锂体系', 'lfp', 0],
  ['case:pipeline-pulping-validation', 'NCA 体系', 'nca', 1],
  ['case:pipeline-pulping-validation', '石墨体系', 'graphite', 2],
  ['case:twin-screw-pulping-validation', '正极验证', 'positive-electrode', 0],
  ['case:twin-screw-pulping-validation', '负极验证', 'negative-electrode', 1],
].map(([caseKey, title, chapterSlug, chapterOrder]) => ({
  caseKey,
  title,
  slug: chapterSlug,
  summary: '',
  order: chapterOrder,
  visible: true,
  sections: [],
  legacyKey: `case-chapter:${caseKey.split(':').at(-1)}:${chapterSlug}`,
}))

for (const product of productsBySlug.values()) {
  if (productFamilies[0].productKeys.includes(product.legacyKey)) {
    product.sections.push({
      __component: 'content.case-list',
      internalName: '共享客户案例',
      visible: true,
      title: '客户案例',
      caseKeys: ['case:pd-shared-customer-cases'],
      layoutVariant: 'cards',
    })
  }
}
for (const solution of solutions) {
  const keys = cases.filter((item) => item.relatedSolutionKeys.includes(solution.legacyKey)).map((item) => item.legacyKey)
  if (keys.length) {
    solution.sections.push({
      __component: 'content.case-list',
      internalName: '关联案例',
      visible: true,
      title: '客户与技术案例',
      caseKeys: keys,
      layoutVariant: 'chapters',
    })
  }
}

const { env: newsEnv, source: newsSource } = staticEnvironment('src/data/newsData.js')
const newsData = newsEnv.newsData
if (!Array.isArray(newsData)) throw new Error('无法解析 newsData')
const articleCategoryNames = [...new Set(newsData.map((article) => article.category))]
const articleCategories = articleCategoryNames.map((name, index) => ({
  name,
  slug: name === '公司新闻'
    ? 'company-news'
    : name === '展会信息'
      ? 'exhibitions'
      : 'industry-news',
  description: name,
  order: index,
  legacyKey: `article-category:${name}`,
}))
const articles = newsData.map((article, index) => {
  const blocks = article.blocks.map((block) => {
    if (!block.type || block.type === 'paragraph' || block.type === 'bold_paragraph') {
      return { __component: 'article.paragraph', text: block.text, bold: block.type === 'bold_paragraph' }
    }
    if (block.type === 'section_title') return { __component: 'article.section-title', text: block.text }
    if (block.type === 'quote') return { __component: 'article.quote', text: block.text, author: block.author ?? '' }
    if (block.type === 'image') {
      const sourcePath = `/news-images/${article.id}/${block.src}`
      return { __component: 'article.image', sourcePath, alt: block.alt || article.title, caption: block.caption ?? '' }
    }
    if (block.type === 'image_carousel') {
      return {
        __component: 'article.carousel',
        images: block.images.map((image) => ({
          sourcePath: `/news-images/${article.id}/${image.src}`,
          alt: image.alt || article.title,
          caption: image.caption ?? '',
          role: 'gallery',
          imageFit: 'cover',
          imagePosition: 'center',
          aspectVariant: 'auto',
        })),
      }
    }
    throw new Error(`未知新闻区块: ${block.type}`)
  })
  const articlePath = `/news/${article.id}`
  aliases.push({
    path: articlePath, targetType: 'article', targetKey: `article:${article.id}`,
    localeCode: 'zh', canonical: true, redirectCode: 'none', active: true,
  })
  return {
    title: article.title, slug: article.id,
    categoryKey: `article-category:${article.category}`,
    excerpt: article.summary, coverPath: article.image, publishedDate: article.date,
    blocks, featured: index === 0, order: index, legacyKey: `article:${article.id}`,
    sourceChecksum: sha256(JSON.stringify(article)),
  }
})

const home = extractPage(
  [
    'src/components/HeroCarousel.jsx',
    'src/components/NewsSection.jsx',
    'src/components/AboutSection.jsx',
    'src/components/StrengthSection.jsx',
    'src/components/PartnersSection.jsx',
    'src/components/ContactSection.jsx',
  ],
  'home',
  '首页',
)
technicalDatasets.push(...home.datasets)
const about = extractPage(['src/pages/AboutPage.jsx'], 'about', '关于红运')
technicalDatasets.push(...about.datasets)

const { env: partnersEnv } = staticEnvironment('src/data/partners.js')
const partners = (partnersEnv.partnerGroupsData ?? []).flatMap((group) =>
  group.items.map((partner, index) => ({
    name: partner.name,
    logoPath: partner.logo ?? null,
    order: index,
    visible: true,
    group: group.id,
    legacyKey: `partner:${group.id}:${partner.name}`,
  })))
const { env: globalEnv } = staticEnvironment('src/data/globalPresenceCountries.js')
const globalPresences = (globalEnv.countries ?? []).map((country, index) => ({
  name: country.label,
  countryCode: `${country.region}-${index + 1}`,
  longitude: country.lng,
  latitude: country.lat,
  summary: country.region,
  order: index,
  visible: true,
  legacyKey: `global-presence:${country.label}`,
}))

for (const alias of aliases) {
  alias.uniqueKey = `${alias.localeCode}:${alias.path}`
  alias.legacyKey = alias.uniqueKey
}
const uniqueAliases = [...new Map(aliases.map((alias) => [alias.uniqueKey, alias])).values()]
const uniqueDatasetMap = new Map()
for (const dataset of technicalDatasets) uniqueDatasetMap.set(dataset.legacyKey, dataset)

const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  defaultLocale: 'zh',
  reservedLocales: ['zh', 'en'],
  source: {
    repository: root,
    routePriority: 'src/App.jsx',
    productCatalog: 'src/data/productCategories.js',
    newsCatalog: 'src/data/newsData.js',
    sourceChecksum: sha256(newsSource + JSON.stringify(categoriesSource)),
  },
  categories,
  groups,
  productFamilies,
  products: [...productsBySlug.values()],
  placements,
  industries,
  solutions,
  cases,
  caseChapters,
  articleCategories,
  articles,
  technicalDatasets: [...uniqueDatasetMap.values()],
  partners,
  globalPresences,
  aliases: uniqueAliases,
  singleTypes: {
    siteSetting: {
      companyName: '红运机械',
      phone: '400-928-5088',
      addresses: [
        { title: '常州总部', text: '江苏省常州市', order: 0 },
        { title: '广州基地', text: '广东省广州市', order: 1 },
      ],
      defaultSeo: {
        metaTitle: '红运机械｜混合、分散与制浆系统解决方案',
        metaDescription: '红运机械专注于新能源、固态电池与化工行业的混合、分散及制浆系统装备。',
        noIndex: false,
      },
    },
    homePage: {
      title: '首页',
      sections: home.sections,
      sourceChecksum: home.sourceChecksum,
    },
    aboutPage: {
      title: '关于红运',
      sections: about.sections,
      sourceChecksum: about.sourceChecksum,
    },
    contactPage: contactPageContent,
    navigation: {
      headerItems: [
        { label: '关于红运', path: '/about' },
        { label: '行业解决方案', path: '/solutions' },
        { label: '产品中心', path: '/products/new-energy' },
        { label: '新闻中心', path: '/news' },
        { label: '联系我们', path: '/contact' },
      ],
      footerItems: [
        { label: '关于红运', path: '/about' },
        { label: '产品中心', path: '/products/new-energy' },
        { label: '联系我们', path: '/contact' },
      ],
    },
    formSetting: {
      industryOptions: categories.map((category) => ({ label: category.name, value: category.slug })),
      positionOptions: [],
      contactCopy: '提交需求后，我们会尽快与您联系。',
      responseTime: '1 个工作日内',
      retentionDays: 180,
    },
  },
  migrationDecisions: [
    { key: 'visible-placeholder', decision: '不迁移待补特点、待补参数和待补案例等未完成空栏目' },
    { key: 'spray-nozzle-media', decision: '高压喷淋嘴不上传代码占位图，保留空媒体回退' },
    { key: 'chemical-contact-spec', decision: '化工自动生产线的联系获取规格文案保留为业务 CTA' },
    { key: 'english', decision: '只创建 en locale 与接口能力，不创建或发布英文正文' },
  ],
}

const outputFile = resolve(import.meta.dirname, 'content-manifest.json')
writeFileSync(outputFile, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`内容清单已生成: ${outputFile}`)
console.log(`分类 ${categories.length} / 分组 ${groups.length} / 产品 ${manifest.products.length} / 展示位 ${placements.length}`)
console.log(`行业 ${industries.length} / 方案 ${solutions.length} / 新闻 ${articles.length} / 数据集 ${manifest.technicalDatasets.length}`)
console.log(`合作伙伴 ${partners.length} / 全球布局 ${globalPresences.length} / URL ${uniqueAliases.length}`)
