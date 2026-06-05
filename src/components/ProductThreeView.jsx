/* 产品三视图横向画廊：主图 + 侧视图等多角度渲染图并排展示 */
export default function ProductThreeView({ views = [] }) {
  if (!views.length) return null
  return (
    <div className="three-view-gallery fade-up fade-up-delay-1">
      {views.map((v, i) => (
        <figure className="three-view-item" key={i}>
          <div className="three-view-imgwrap">
            <img src={v.src} alt={v.label} loading="lazy" />
          </div>
          <figcaption className="three-view-caption">{v.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}
