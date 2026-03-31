export default function PageHero({ title, subtitle, bgImage, bgPosition = 'center', noOverlay = false, noScroll = false }) {
  return (
    <section className="page-hero">
      <div className="page-hero-bg">
        {bgImage
          ? <img src={bgImage} alt="" className="page-hero-bg-img" loading="eager" style={{ objectPosition: bgPosition }} />
          : <div className="page-hero-placeholder" />}
      </div>
      {!noOverlay && <div className="page-hero-overlay" />}
      <div className="page-hero-content">
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
        <h1 className="page-hero-title">{title || '追求完美 做到极致'}</h1>
        <div className="page-hero-divider" />
      </div>
      {!noScroll && <div className="page-hero-scroll" aria-hidden="true" />}
    </section>
  )
}
