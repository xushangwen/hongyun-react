import React from 'react'

/* ──────────────────────────────────────────────────────────
   BentoGallerySection — 系统展示可复用组件
   布局（非对称三栏，红/灰对角分布，互不相邻）：

     cols:  2fr      1.6fr    1fr
     row1:  main     top-sm   [RED]    ← 红色：右上角
     row2:  main     mid      mid      ← 主图跨 rows 1-2
     row3:  [GRAY]   bot      bot      ← 灰色：左下角，最宽列加宽感

   Props:
     title   string      区块标题，默认 "系统展示"
     images  string[]    最多 4 张图片 URL（不足则用占位符）
             [0]=main  [1]=top-sm  [2]=mid  [3]=bot
   ────────────────────────────────────────────────────────── */

const PlaceholderIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

function ImageCell({ area, src, alt }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || ''}
        className="bento-gallery-img"
        style={{ gridArea: area }}
        loading="lazy"
      />
    )
  }
  return (
    <div className="bento-gallery-placeholder" style={{ gridArea: area }}>
      <PlaceholderIcon />
    </div>
  )
}

export default function BentoGallerySection({ title = '系统展示', images = [], grayBg = true }) {
  return (
    <section className={`page-section${grayBg ? ' page-section--gray' : ''}`}>
      <div className="page-container">
        <h2 className="section-heading section-heading--center fade-up">{title}</h2>
        <div className="bento-gallery-grid fade-up fade-up-delay-1">
          {/* 左侧主图：跨 rows 1-2，最宽列 */}
          <ImageCell area="main"   src={images[0]} alt="系统展示主图" />
          {/* 右侧上：次图 */}
          <ImageCell area="top-sm" src={images[1]} alt="系统展示图2" />
          {/* 右上角：品牌红装饰条（无文字） */}
          <div className="bento-accent bento-accent--red" aria-hidden="true" />
          {/* 中右：拼合宽图（跨 cols 2-3） */}
          <ImageCell area="mid"    src={images[2]} alt="系统展示图3" />
          {/* 左下角：灰色装饰条，宽度 = main 列（2fr） */}
          <div className="bento-accent bento-accent--gray" aria-hidden="true" />
          {/* 底部右侧：宽图（跨 cols 2-3） */}
          <ImageCell area="bot"    src={images[3]} alt="系统展示图4" />
        </div>
      </div>
    </section>
  )
}
