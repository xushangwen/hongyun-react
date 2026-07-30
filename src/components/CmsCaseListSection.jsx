import { useCmsDetail } from '../context/useCmsDetail'

function casePreview(caseStudy) {
  const galleryItems = []
  for (const section of caseStudy?.sections || []) {
    if (section.__component !== 'content.media-gallery') continue
    galleryItems.push(...(section.items || []))
  }
  const isImage = (item) => {
    const media = item?.media || item?.image
    return media?.url && !media.mime?.startsWith('video/')
  }
  const preferred = galleryItems.find((item) => (
    isImage(item)
    && (item.role === 'case' || /(?:^|[/_-])case(?:[/_.-]|$)/i.test(item.sourcePath || ''))
  ))
  if (preferred) return preferred.media || preferred.image
  if (caseStudy?.cover?.url) return caseStudy.cover
  const fallback = galleryItems.find(isImage)
  return fallback?.media || fallback?.image || null
}

export default function CmsCaseListSection({
  children,
  fallbackTitle = '客户案例',
  grayBg = false,
}) {
  const { detail, status } = useCmsDetail()
  const section = detail?.sections?.find((item) => item.__component === 'content.case-list')

  if (status === 'ready' && (!section || section.visible === false)) return null
  if (!section && !children) return null

  const caseKeys = Array.isArray(section?.caseKeys) ? section.caseKeys : []
  const linkedCases = caseKeys.map((key) => detail?.cases?.[key]).filter(Boolean)
  const title = section?.title || fallbackTitle

  return (
    <section className={`page-section${grayBg ? ' page-section--gray' : ''}`}>
      <div className="page-container">
        <p className="section-en-label fade-up">Case</p>
        <h2 className="section-heading section-heading--center fade-up">{title}</h2>

        {linkedCases.length > 0 && (
          <div className="cms-case-intros fade-up fade-up-delay-1">
            {linkedCases.map((caseStudy) => {
              const preview = casePreview(caseStudy)
              return (
                <article className="cms-case-intro" key={caseStudy.documentId || caseStudy.legacyKey}>
                  {preview?.url && (
                    <img
                      className="cms-case-intro-image"
                      src={preview.url}
                      alt={preview.alt || caseStudy.title}
                      loading="lazy"
                    />
                  )}
                  <div className="cms-case-intro-content">
                    <h3>{caseStudy.title}</h3>
                    {caseStudy.summary && <p>{caseStudy.summary}</p>}
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {children}
      </div>
    </section>
  )
}
