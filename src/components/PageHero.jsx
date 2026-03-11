export default function PageHero({ title, subtitle, deco }) {
  return (
    <section className="page-hero">
      <div className="page-hero-bg">
        <div className="page-hero-placeholder" />
      </div>
      <div className="page-hero-overlay" />
      <div className="page-hero-content">
        <h1 className="page-hero-title">{title || '追求完美 做到极致'}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
      </div>
      {deco && <span className="page-hero-deco">{deco}</span>}
    </section>
  )
}
