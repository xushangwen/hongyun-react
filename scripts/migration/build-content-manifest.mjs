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

const dualPlanetaryVariantKeyBySlug = {
  'dual-planetary-mixer': 'production',
  'dual-planetary-mixer-mid': 'mid',
  'dual-planetary-mixer-lab': 'lab',
}
function jsxElementName(node) {
  return node?.openingElement?.name?.type === 'JSXIdentifier'
    ? node.openingElement.name.name
    : ''
}

function jsxAttributeValue(node, attributeName, env) {
  const attribute = node?.openingElement?.attributes?.find((item) =>
    item.type === 'JSXAttribute' && item.name?.name === attributeName)
  if (!attribute?.value) return ''
  if (attribute.value.type === 'StringLiteral') return attribute.value.value
  if (attribute.value.type === 'JSXExpressionContainer') {
    return evaluate(attribute.value.expression, env)
  }
  return ''
}

function jsxPlainText(node, env) {
  const parts = []
  walk(node, (item) => {
    if (item.type === 'JSXText') {
      parts.push(item.value)
      return
    }
    if (item.type !== 'JSXExpressionContainer') return
    const value = evaluate(item.expression, env)
    if (typeof value === 'string' || typeof value === 'number') parts.push(String(value))
  })
  return normalizeText(parts.join(' '))
}

function extractIntroSummary(relativePath, slug) {
  const { env, ast } = staticEnvironment(relativePath)
  if (relativePath.endsWith('/DualPlanetaryMixerPage.jsx')) {
    const variantKey = dualPlanetaryVariantKeyBySlug[slug]
    const variant = env.VARIANTS?.[variantKey]
    return [variant?.intro1, variant?.intro2].filter(Boolean).join('\n\n')
  }

  let introSection = null
  walk(ast.program, (node) => {
    if (introSection || node.type !== 'JSXElement' || jsxElementName(node) !== 'section') return
    const className = jsxAttributeValue(node, 'className', env)
    if (typeof className === 'string' && className.includes('pdm-intro-section')) introSection = node
  })
  if (!introSection) return ''

  const paragraphs = []
  const bullets = []
  walk(introSection, (node) => {
    if (node.type !== 'JSXElement') return
    const tagName = jsxElementName(node)
    if (!['p', 'li'].includes(tagName)) return
    const text = jsxPlainText(node, env)
    if (!text || /待补充/.test(text)) return
    if (tagName === 'li') bullets.push(text)
    else paragraphs.push(text)
  })
  return [
    ...paragraphs,
    ...(bullets.length ? [bullets.map((item) => `• ${item}`).join('\n')] : []),
  ].join('\n\n')
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

function pagePresentation(relativePaths, slug, title) {
  let hero = null
  let views = []

  for (const relativePath of relativePaths) {
    const { env, ast } = staticEnvironment(relativePath)
    const imports = {}
    for (const statement of ast.program.body) {
      if (statement.type !== 'ImportDeclaration') continue
      for (const specifier of statement.specifiers) imports[specifier.local.name] = statement.source.value
    }
    const evaluationEnv = { ...imports, ...env }

    if (!views.length) {
      views = env.productMap?.[slug]?.views
        || env.VARIANTS?.[dualPlanetaryVariantKeyBySlug[slug]]?.views
        || []
    }

    walk(ast.program, (node) => {
      if (node.type !== 'JSXElement') return
      const elementName = jsxElementName(node)
      if (elementName === 'PageHero' && !hero) {
        const sourceValue = jsxAttributeValue(node, 'bgImage', evaluationEnv)
        const resolved = resolveMediaPath(relativePath, sourceValue, imports)
        if (resolved) {
          hero = {
            __media: true,
            ...resolved,
            alt: `${title} Hero`,
          }
        }
      }
      if (elementName === 'ProductThreeView' && !views.length) {
        const value = jsxAttributeValue(node, 'views', evaluationEnv)
        if (Array.isArray(value)) views = value
      }
    })

    if (hero && views.length) break
  }

  const viewItems = views
    .map((view, index) => {
      const relativePath = relativePaths.find((path) => {
        const { env } = staticEnvironment(path)
        return resolveMediaPath(path, view.src, env)
      }) || relativePaths[0]
      const { env, ast } = staticEnvironment(relativePath)
      const imports = {}
      for (const statement of ast.program.body) {
        if (statement.type !== 'ImportDeclaration') continue
        for (const specifier of statement.specifiers) imports[specifier.local.name] = statement.source.value
      }
      const resolved = resolveMediaPath(relativePath, view.src, { ...imports, ...env })
      if (!resolved) return null
      return {
        ...resolved,
        label: view.label || `视图 ${index + 1}`,
        alt: `${title}${view.label || `视图 ${index + 1}`}`,
        role: 'gallery',
        imageFit: 'contain',
        imagePosition: 'center',
        aspectVariant: 'auto',
      }
    })
    .filter(Boolean)

  return { hero, views: viewItems }
}

function alignedDetailSections(sections, presentation) {
  const aligned = sections.filter((section) => section.__component !== 'content.media-gallery')
  if (presentation.views.length) {
    aligned.push({
      __component: 'content.media-gallery',
      internalName: '三视图',
      visible: true,
      title: '三视图',
      variant: 'three-view',
      items: presentation.views,
      layoutVariant: 'three-column',
    })
  }
  return aligned
}

function pageEquipment(relativePath) {
  const { env, ast } = staticEnvironment(relativePath)
  const imports = {}
  for (const statement of ast.program.body) {
    if (statement.type !== 'ImportDeclaration') continue
    for (const specifier of statement.specifiers) imports[specifier.local.name] = statement.source.value
  }
  const evaluationEnv = { ...imports, ...env }
  let devices = env.coreEquipment || env.coreDevices || []
  if (!devices.length) {
    walk(ast.program, (node) => {
      if (devices.length || node.type !== 'JSXElement' || jsxElementName(node) !== 'CoreEquipmentSection') return
      const value = jsxAttributeValue(node, 'devices', evaluationEnv)
      if (Array.isArray(value)) devices = value
    })
  }

  return devices
    .map((device, index) => {
      const media = resolveMediaPath(relativePath, device.img, evaluationEnv)
      if (!device.name || !media) return null
      return {
        name: device.name,
        image: {
          __media: true,
          ...media,
          alt: device.imgAlt || device.name,
        },
        alt: device.imgAlt || device.name,
        features: (device.features || []).map((feature, featureIndex) => ({
          text: feature,
          order: featureIndex,
        })),
        featureContent: device.features?.length
          ? [{
              type: 'list',
              format: 'unordered',
              children: device.features.map((feature) => ({
                type: 'list-item',
                children: [{ type: 'text', text: feature }],
              })),
            }]
          : [],
        paragraphs: (device.paragraphs || []).map((paragraph, paragraphIndex) => ({
          title: paragraph.title || '',
          text: paragraph.text || '',
          order: paragraphIndex,
        })),
        imageFit: 'contain',
        imagePosition: 'center',
      }
    })
    .filter(Boolean)
}

function alignedSolutionSections(sections, presentation, equipmentItems, solutionSlug) {
  const output = alignedDetailSections(
    sections.filter((section) => (
      section.__component !== 'content.rich-text'
      && !(
        section.__component === 'content.data-table'
        && /:(features|coreEquipment)$/.test(section.datasetKey || '')
      )
    )),
    presentation,
  )
  if (equipmentItems.length) {
    output.push({
      __component: 'content.equipment-grid',
      internalName: '核心设备',
      visible: true,
      title: '核心设备',
      items: equipmentItems,
      equipmentKeys: [],
      layoutVariant: solutionSlug === 'auto-production' ? 'cards' : 'detailed',
    })
  }
  const priority = {
    'content.media-gallery': 10,
    'content.feature-grid': 20,
    'content.equipment-grid': 30,
    'content.data-table': 40,
    'special.renderer': 50,
  }
  return output
    .map((section, index) => ({ section, index }))
    .sort((a, b) => (
      (priority[a.section.__component] || 60) - (priority[b.section.__component] || 60)
      || a.index - b.index
    ))
    .map(({ section }) => section)
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

const datasetNameLabels = {
  aboutNavItems: '导航条目',
  certifications: '资质证书',
  coreEquipment: '核心设备',
  cultureItems: '企业文化',
  features: '产品特点',
  globalBranches: '全球布局',
  introStats: '企业简介数据',
  rndImages: '研发图片',
  slides: '首页轮播',
  statsData: '首页数据',
  strengthStats: '企业实力数据',
  timelineData: '发展历程',
}

function datasetTitle(name, title) {
  if (name === 'modelParams' || name === 'allModels') return `${title}型号参数`
  return `${title}${datasetNameLabels[name] || '数据表'}`
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
                title: datasetTitle(name, title),
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
  const tableColumnLabels = {
    model: '型号', liftType: '升降方式', workVol: '工作容积（L）', designVol: '设计容积（L）',
    tankDim: '料缸尺寸（mm）', mixerMotor: '搅拌电机功率（kW）', revSpeed: '公转速度（rpm）',
    ownSpeed: '自转速度（rpm）', dissolverKW: '分散功率（kW）', dissolverType: '分散电机',
    dissolverRPM: '分散转速（rpm）', dissolverLinear: '分散线速度（m/s）', weight: '重量',
    dimension: '外形尺寸', vol: '容积（L）', id: '内径（mm）', h: '高度（mm）', len: '长度（mm）',
    ratio: '长径比', kw: '电机功率（kW）', rpm: '转速（rpm）', v: '线速度（m/s）',
    gap: '间距（mm）', mixKw: '搅拌功率（kW）', mixRpm: '搅拌转速（rpm）',
    slurryV: '浆料线速度（m/s）', dispKw: '分散功率（kW）', rotorDia: '转子直径（mm）',
    dispRpm: '分散转速（rpm）', lineV: '线速度（m/s）', scrapeKw: '刮壁功率（kW）',
    scrapeRpm: '刮壁转速（rpm）', sideKw: '侧分散功率（kW）', sideRpm: '侧分散转速（rpm）',
    sideV: '侧分散线速度（m/s）', output: '产量', cycleTime: '循环时间', processTime: '处理时间',
    batch: '批次', flow: '流量', flowRate: '流量', batchVol: '批次容积',
    motorKW: '电机功率（kW）', linearSpeed: '线速度（m/s）', motor: '电机功率',
    diameter: '直径', speed: '速度', title: '名称', desc: '说明',
  }
  for (const dataset of datasets) {
    sections.push({
      __component: 'content.data-table',
      internalName: dataset.title,
      visible: true,
      title: dataset.title,
      datasetKey: dataset.legacyKey,
      columns: dataset.columns.map((column) => ({
        ...column,
        label: !column.label || column.label === column.id
          ? tableColumnLabels[column.id] || column.id
          : column.label,
      })),
      headerGroups: dataset.headerGroups,
      rows: dataset.rows,
      unitNotes: dataset.unitNotes,
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

const { env: legacyProductEnv } = staticEnvironment('src/pages/ProductDetailPage.jsx')
const legacyProductSummarySource = {
  'reciprocating-mixer': ['chemical', 'reciprocating-mixer'],
  'dual-column-planetary': ['chemical', 'dual-planetary-stirrer'],
  'butterfly-mixer': ['chemical', 'planetary-butterfly'],
  'planetary-power-mixer': ['chemical', 'chem-dual-planetary'],
  'vertical-kneader': ['chemical', 'vertical-kneader'],
  'press-machine': ['chemical', 'press-dumper'],
  'tilting-machine': ['chemical', 'press-dumper'],
  'barrel-washer': ['chemical', 'barrel-washer'],
  reactor: ['chemical', 'reactor-tank'],
  'storage-tank': ['chemical', 'reactor-tank'],
}

function legacyProductSummary(slug) {
  const [categoryId, productId] = legacyProductSummarySource[slug] ?? []
  return legacyProductEnv.productMap?.[categoryId]?.products?.[productId]?.intro ?? ''
}

const categories = []
const groups = []
const productsBySlug = new Map()
const productLegacyMediaSectionsBySlug = new Map()
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
        const pagePaths = productPageMap[item.slug] ?? ['src/pages/ProductDetailPage.jsx']
        const page = extractPage(pagePaths, item.slug, item.name)
        const summary = pagePaths
          .map((relativePath) => extractIntroSummary(relativePath, item.slug))
          .find(Boolean) || legacyProductSummary(item.slug)
        const legacyMediaSections = page.sections.filter(
          (section) => section.__component === 'content.media-gallery',
        )
        productLegacyMediaSectionsBySlug.set(item.slug, legacyMediaSections)
        const presentation = pagePresentation(pagePaths, item.slug, item.name)
        const sections = alignedDetailSections(
          page.sections.filter((section) => section.__component !== 'content.rich-text'),
          presentation,
        )
        technicalDatasets.push(...page.datasets)
        productsBySlug.set(item.slug, {
          name: item.name,
          slug: item.slug,
          summary,
          coverPath: item.image ?? null,
          hero: {
            titleOverride: item.name,
            subtitle: '',
            ...(presentation.hero
              ? {
                  desktopMedia: presentation.hero,
                  mobileMedia: presentation.hero,
                }
              : {}),
            mediaType: 'image',
            imagePosition: 'center',
            overlay: 'dark',
            showScrollIndicator: true,
          },
          sections,
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
const solutionLegacySectionsBySlug = new Map()
const solutions = solutionCatalog.map(([industrySlug, name, solutionSlug, file], index) => {
  const page = extractPage([file], solutionSlug, name)
  const presentation = pagePresentation([file], solutionSlug, name)
  const equipmentItems = pageEquipment(file)
  const summary = extractIntroSummary(file, solutionSlug)
  const coverPath = presentation.hero?.sourcePath || presentation.views[0]?.sourcePath || null
  solutionLegacySectionsBySlug.set(solutionSlug, page.sections)
  technicalDatasets.push(...page.datasets)
  const path = `/solutions/${industrySlug}/${solutionSlug}`
  aliases.push({
    path, targetType: 'solution', targetKey: `solution:${solutionSlug}`, localeCode: 'zh',
    canonical: true, redirectCode: 'none', active: true, categoryContext: industrySlug,
  })
  return {
    name, slug: solutionSlug, industryKey: `industry:${industrySlug}`, summary, coverPath,
    hero: {
      titleOverride: name, subtitle: '', mediaType: 'image', imagePosition: 'center',
      ...(presentation.hero
        ? { desktopMedia: presentation.hero, mobileMedia: presentation.hero }
        : {}),
      overlay: 'dark', showScrollIndicator: true,
    },
    sections: alignedSolutionSections(page.sections, presentation, equipmentItems, solutionSlug),
    order: index, legacyKey: `solution:${solutionSlug}`,
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
    sections: productLegacyMediaSectionsBySlug.get('dual-planetary-mixer') ?? [],
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
    sections: solutionLegacySectionsBySlug.get('circulation-pulping') ?? [],
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
    sections: solutionLegacySectionsBySlug.get('pipeline-pulping') ?? [],
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
    sections: solutionLegacySectionsBySlug.get('twin-screw-pulping') ?? [],
    legacyKey: 'case:twin-screw-pulping-validation',
  },
  {
    title: '盛龙全自动生产系统项目案例',
    slug: 'auto-production-shenglong-project',
    caseType: 'project',
    summary: '化工全自动生产系统的项目现场案例，展示从设备集成到实际运行的整体交付效果。',
    confidentialityLevel: 'public',
    relatedProductKeys: [],
    relatedSolutionKeys: ['solution:auto-production'],
    sections: [
      {
        __component: 'content.video',
        internalName: '盛龙项目案例视频',
        visible: true,
        title: '盛龙项目案例',
        video: {
          label: '盛龙项目案例视频',
          sourcePath: '/assets/videos/shenglong-case.webm',
          alt: '盛龙项目案例',
          role: 'video',
        },
        poster: {
          label: '盛龙项目案例封面',
          sourcePath: '/assets/videos/shenglong-case-poster.webp',
          alt: '盛龙项目案例',
          role: 'cover',
        },
      },
    ],
    legacyKey: 'case:auto-production-shenglong-project',
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
