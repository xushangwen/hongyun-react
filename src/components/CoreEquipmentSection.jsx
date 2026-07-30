import React from 'react'
import { useCmsDetail } from '../context/useCmsDetail'

function RichTextChildren({ children = [] }) {
  return children.map((node, index) => {
    const key = `${node.type || 'text'}-${index}`
    if (node.type === 'link') {
      return (
        <a key={key} href={node.url}>
          <RichTextChildren children={node.children} />
        </a>
      )
    }
    if (node.type !== 'text') {
      return <RichTextChildren key={key} children={node.children} />
    }
    let content = node.text
    if (node.bold) content = <strong>{content}</strong>
    if (node.italic) content = <em>{content}</em>
    if (node.underline) content = <u>{content}</u>
    if (node.strikethrough) content = <s>{content}</s>
    return <React.Fragment key={key}>{content}</React.Fragment>
  })
}

function EquipmentFeatureContent({ value }) {
  if (!Array.isArray(value) || value.length === 0) return null
  return value.map((block, index) => {
    const key = `${block.type}-${index}`
    if (block.type === 'list') {
      const List = block.format === 'ordered' ? 'ol' : 'ul'
      return (
        <List className="cp-core-device-features" key={key}>
          {(block.children || []).map((item, itemIndex) => (
            <li key={`${key}-${itemIndex}`}>
              <RichTextChildren children={item.children} />
            </li>
          ))}
        </List>
      )
    }
    if (block.type === 'heading') {
      return (
        <h4 className="cp-core-device-desc-title" key={key}>
          <RichTextChildren children={block.children} />
        </h4>
      )
    }
    if (block.type === 'quote') {
      return (
        <blockquote className="cp-core-device-feature-quote" key={key}>
          <RichTextChildren children={block.children} />
        </blockquote>
      )
    }
    return (
      <p className="cp-core-device-desc-para" key={key}>
        <RichTextChildren children={block.children} />
      </p>
    )
  })
}

/**
 * devices: Array<{
 *   name: string
 *   img: string
 *   imgAlt?: string
 *   features?: string[]          // 要点列表
 *   paragraphs?: { title: string, text: string }[]  // 标题+段落
 *   imgStyle?: object            // 单项图片内联样式覆盖（如 maxHeight）
 * }>
 */
function cmsDevice(item) {
  const product = item.product || {}
  const features = (item.features || [])
    .map((feature) => feature.text || feature.title || feature.description)
    .filter(Boolean)
  const paragraphs = (item.paragraphs || [])
    .map((paragraph) => ({
      title: paragraph.title || '',
      text: paragraph.text || paragraph.value || '',
    }))
    .filter((paragraph) => paragraph.text)
  if (!features.length && !paragraphs.length && item.summaryOverride) {
    paragraphs.push({ title: '', text: item.summaryOverride })
  }
  return {
    name: item.name || item.titleOverride || product.name || '核心设备',
    img: item.image?.url || item.mediaOverride?.url || product.cover?.url,
    imgAlt: item.alt || item.altOverride || item.name || item.titleOverride || product.name,
    featureContent: item.featureContent || [],
    features,
    paragraphs,
  }
}

export default function CoreEquipmentSection({
  devices = [],
  layoutVariant = 'detailed',
  grayBg = false,
}) {
  const { detail, status } = useCmsDetail()
  const section = detail?.sections?.find(
    (item) => item.__component === 'content.equipment-grid',
  )
  if (status === 'ready' && section?.visible === false) return null

  const cmsDevices = (section?.items || []).map(cmsDevice).filter((item) => item.img)
  const resolvedDevices = cmsDevices.length ? cmsDevices : devices
  const resolvedLayout = section?.layoutVariant || layoutVariant
  const title = section?.title || '核心设备'
  if (!resolvedDevices.length) return null

  if (resolvedLayout === 'cards') {
    return (
      <section className={`page-section${grayBg ? ' page-section--gray' : ''}`}>
        <div className="page-container">
          <p className="section-en-label fade-up">Core Equipment</p>
          <h2 className="section-heading section-heading--center fade-up">{title}</h2>
          <div className="chem-eq-grid fade-up fade-up-delay-1">
            {resolvedDevices.map((device, index) => (
              <article className="chem-eq-card" key={`${device.name}-${index}`}>
                <div className="chem-eq-img-wrap">
                  <img
                    src={device.img}
                    alt={device.imgAlt ?? device.name}
                    className="chem-eq-img"
                    loading="lazy"
                  />
                </div>
                <p className="chem-eq-name">{device.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`page-section${grayBg ? ' page-section--gray' : ''}`}>
      <div className="page-container">
        <p className="section-en-label fade-up">Core Equipment</p>
        <h2 className="section-heading section-heading--center fade-up">{title}</h2>

        <div className="cp-core-section">
          {resolvedDevices.map((device, i) => (
            <React.Fragment key={`${device.name}-${i}`}>
              {i > 0 && <hr className="cp-core-divider" />}
              <div className={`cp-core-device-row${i % 2 ? ' cp-core-device-row--reverse' : ''} fade-up fade-up-delay-1`}>
                <div className="cp-core-device-img-wrap">
                  <img
                    src={device.img}
                    alt={device.imgAlt ?? device.name}
                    className="cp-core-device-img"
                    style={device.imgStyle}
                    loading="lazy"
                  />
                </div>
                <div className="cp-core-device-info">
                  <div className="cp-core-device-badge">
                    <h3 className="cp-core-device-name">{device.name}</h3>
                  </div>
                  <div className="cp-core-device-divider" />

                  {device.featureContent?.length > 0 ? (
                    <div className="cp-core-device-feature-content">
                      <EquipmentFeatureContent value={device.featureContent} />
                    </div>
                  ) : device.features?.length > 0 && (
                    <ul className="cp-core-device-features">
                      {device.features.map((f, j) => <li key={j}>{f}</li>)}
                    </ul>
                  )}

                  {device.paragraphs?.map((p, j) => (
                    <div key={j}>
                      {p.title && <h4 className="cp-core-device-desc-title">{p.title}</h4>}
                      <p className="cp-core-device-desc-para">{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
