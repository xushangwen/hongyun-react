function blockText(node) {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  if (!Array.isArray(node.children)) return ''
  return node.children.map(blockText).join('')
}

export function getAboutDatasetRows(detail, key, fallback = []) {
  const rows = detail?.datasets?.[`about:dataset:${key}`]?.rows
  return Array.isArray(rows) && rows.length ? rows : fallback
}

export function getAboutMediaItems(detail) {
  return (detail?.sections || [])
    .filter((section) => section.__component === 'content.media-gallery' && section.visible !== false)
    .flatMap((section) => section.items || [])
    .map((item) => ({
      ...item,
      src: item.media?.url || item.sourcePath || '',
      alt: item.alt || item.media?.alt || item.label || '',
    }))
    .filter((item) => item.src)
}

export function findAboutMedia(items, pattern, fallback = '') {
  const item = items.find((candidate) => pattern.test(candidate.sourcePath || candidate.src))
  return item?.src || fallback
}

export function filterAboutMedia(items, pattern, fallback = []) {
  const matches = items
    .filter((candidate) => pattern.test(candidate.sourcePath || candidate.src))
    .map((item) => ({ src: item.src, alt: item.alt, label: item.label || item.alt }))
  return matches.length ? matches : fallback
}

export function getAboutRichTextRange(detail, start, end, fallback = []) {
  const section = (detail?.sections || []).find(
    (item) => item.__component === 'content.rich-text' && item.visible !== false,
  )
  const paragraphs = (section?.body || []).map(blockText).map((text) => text.trim()).filter(Boolean)
  const startIndex = paragraphs.indexOf(start)
  if (startIndex < 0) return fallback
  const endIndex = end ? paragraphs.indexOf(end, startIndex + 1) : paragraphs.length
  const result = paragraphs.slice(startIndex + 1, endIndex < 0 ? paragraphs.length : endIndex)
  return result.length ? result : fallback
}

export function getAboutFeatureItems(detail, titles, fallback = []) {
  const wanted = new Set(titles)
  const items = (detail?.sections || [])
    .filter((section) => section.__component === 'content.feature-grid' && section.visible !== false)
    .flatMap((section) => section.items || [])
    .filter((item) => wanted.has(item.title))
  return items.length === titles.length
    ? titles.map((title) => items.find((item) => item.title === title))
    : fallback
}

export function groupAboutPartners(partners, fallbackGroups) {
  if (!Array.isArray(partners) || !partners.length) return fallbackGroups
  const groups = new Map(fallbackGroups.map((group) => [group.id, { ...group, items: [] }]))

  partners.forEach((partner) => {
    const match = /^partner:([^:]+):/.exec(partner.legacyKey || '')
    const group = match ? groups.get(match[1]) : null
    if (!group) return
    group.items.push({
      name: partner.name,
      alt: partner.logo?.alt || partner.name,
      logo: partner.logo?.url || '',
      textOnly: !partner.logo?.url,
    })
  })

  const resolved = [...groups.values()].filter((group) => group.items.length)
  return resolved.length ? resolved : fallbackGroups
}
