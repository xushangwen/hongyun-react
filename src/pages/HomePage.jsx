import { useEffect, useState } from 'react'
import HeroCarousel from '../components/HeroCarousel'
import NewsSection from '../components/NewsSection'
import AboutSection from '../components/AboutSection'
import StrengthSection from '../components/StrengthSection'
import PartnersSection from '../components/PartnersSection'
import ContactSection from '../components/ContactSection'
import { getCmsHome } from '../services/cmsApi'

export default function HomePage() {
  const [content, setContent] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    getCmsHome(controller.signal)
      .then(setContent)
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.warn('[CMS] 首页内容读取失败，继续使用本地默认内容')
        }
      })
    return () => controller.abort()
  }, [])

  return (
    <>
      <HeroCarousel key={content?.updatedAt || 'local-home'} cmsSlides={content?.heroSlides} />
      {content?.newsSection?.visible !== false && (
        <NewsSection title={content?.newsSection?.title} />
      )}
      {content?.aboutSection?.visible !== false && (
        <AboutSection content={content?.aboutSection} />
      )}
      {content?.researchSection?.visible !== false && (
        <StrengthSection content={content?.researchSection} />
      )}
      {content?.partnerSection?.visible !== false && (
        <PartnersSection content={content?.partnerSection} cmsPartners={content?.partners} />
      )}
      {content?.contactSection?.visible !== false && (
        <ContactSection content={content?.contactSection} />
      )}
    </>
  )
}
