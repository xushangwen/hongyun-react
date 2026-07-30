import { useCmsDetail } from '../context/useCmsDetail'

/* 产品三视图横向画廊：主图 + 侧视图等多角度渲染图并排展示 */
export default function ProductThreeView({ views = [], layoutVariant = 'three-column' }) {
  const { detail, status } = useCmsDetail()
  const section = detail?.sections?.find((item) => (
    item.__component === 'content.media-gallery'
    && (
      item.variant === 'three-view'
      || /三视图/.test(`${item.internalName || ''} ${item.title || ''}`)
    )
  ))
  if (status === 'ready' && section?.visible === false) {
    return <span className="cms-three-view-hidden" hidden />
  }

  const cmsViews = (section?.items || [])
    .map((item, index) => ({
      src: item.media?.url || item.image?.url || item.sourcePath,
      label: item.label || item.caption || `视图 ${index + 1}`,
    }))
    .filter((item) => item.src)
  const resolvedViews = cmsViews.length ? cmsViews : views
  const resolvedLayout = section?.layoutVariant || layoutVariant
  if (!resolvedViews.length) return null

  return (
    <div
      className={`three-view-gallery three-view-gallery--${resolvedLayout} fade-up fade-up-delay-1`}
      data-layout-variant={resolvedLayout}
    >
      {resolvedViews.map((v, i) => (
        <figure className="three-view-item" key={`${v.src}-${i}`}>
          <div className="three-view-imgwrap">
            <img src={v.src} alt={v.label} loading="lazy" />
          </div>
          <figcaption className="three-view-caption">{v.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}
