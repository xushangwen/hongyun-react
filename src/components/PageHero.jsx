import { useCmsDetail } from '../context/useCmsDetail'

export default function PageHero({ title, subtitle, bgImage, bgPosition = 'center', noOverlay = false, noScroll = false }) {
  const { detail } = useCmsDetail()
  const cmsHero = detail?.hero
  const resolvedTitle = cmsHero?.titleOverride || title || detail?.title
  const resolvedSubtitle = cmsHero?.subtitle || subtitle
  const desktopMedia = cmsHero?.desktopMedia
  const mobileMedia = cmsHero?.mobileMedia
  const resolvedBgImage = desktopMedia?.url || mobileMedia?.url || bgImage
  const resolvedBgPosition = cmsHero?.imagePosition || bgPosition
  const mediaType = cmsHero?.mediaType === 'video' && (desktopMedia?.url || mobileMedia?.url)
    ? 'video'
    : 'image'
  const overlay = noOverlay ? 'none' : (cmsHero?.overlay || 'dark')
  const showScroll = !noScroll && cmsHero?.showScrollIndicator !== false

  return (
    <section className={`page-hero page-hero--overlay-${overlay}`}>
      <div className="page-hero-bg">
        {mediaType === 'video'
          ? (
              <video
                className="page-hero-bg-img"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                style={{ objectPosition: resolvedBgPosition }}
              >
                {mobileMedia?.url && <source src={mobileMedia.url} media="(max-width: 767px)" type={mobileMedia.mime || undefined} />}
                <source src={desktopMedia?.url || mobileMedia?.url} type={desktopMedia?.mime || mobileMedia?.mime || undefined} />
              </video>
            )
          : resolvedBgImage
            ? (
                <picture className="page-hero-bg-picture">
                  {mobileMedia?.url && <source media="(max-width: 767px)" srcSet={mobileMedia.url} />}
                  <img
                    src={desktopMedia?.url || mobileMedia?.url || bgImage}
                    alt=""
                    className="page-hero-bg-img"
                    loading="eager"
                    style={{ objectPosition: resolvedBgPosition }}
                  />
                </picture>
              )
          : <div className="page-hero-placeholder" />}
      </div>
      {overlay !== 'none' && <div className={`page-hero-overlay page-hero-overlay--${overlay}`} />}
      <div className="page-hero-content">
        <h1 className="page-hero-title">{resolvedTitle || '追求完美 做到极致'}</h1>
        {resolvedSubtitle && <p className="page-hero-subtitle">{resolvedSubtitle}</p>}
        <div className="page-hero-divider" />
      </div>
      {showScroll && (
        <div className="page-hero-scroll" aria-hidden="true">
          <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path d="M12 7V10" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
            <path d="M18 21.457L18 22L18 14" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
            <path d="M14.5 18.5L18 22L21.5 18.5" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
            <path d="M12 1C16.9706 1 21 5.02944 21 10V11H19V10C19 6.13401 15.866 3 12 3C8.13401 3 5 6.13401 5 10V14C5 17.866 8.13401 21 12 21H12.7588L14.7588 23H12C7.02944 23 3 18.9706 3 14V10C3 5.02944 7.02944 1 12 1Z" fill="currentColor" />
          </svg>
        </div>
      )}
    </section>
  )
}
