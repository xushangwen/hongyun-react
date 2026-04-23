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
        <h1 className="page-hero-title">{title || '追求完美 做到极致'}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
        <div className="page-hero-divider" />
      </div>
      {!noScroll && (
        <div className="page-hero-scroll" aria-hidden="true">
          <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path d="M12 7V10" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
            <path d="M15.5 19.5L18 22L20.5 19.5" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
            <path d="M15.5 14.5L18 12L20.5 14.5" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
            <path d="M12 1C16.9706 1 21 5.02944 21 10V10.7598L18.8633 8.62305C18.2235 5.41656 15.3946 3 12 3C8.13401 3 5 6.13401 5 10V14C5 17.866 8.13401 21 12 21C12.2442 21 12.4852 20.9862 12.7227 20.9619L14.4268 22.666C13.6536 22.8821 12.8399 23 12 23C7.02944 23 3 18.9706 3 14V10C3 5.02944 7.02944 1 12 1Z" fill="currentColor" />
          </svg>
        </div>
      )}
    </section>
  )
}
