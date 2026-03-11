import HeroCarousel from '../components/HeroCarousel'
import NewsSection from '../components/NewsSection'
import AboutSection from '../components/AboutSection'
import StrengthSection from '../components/StrengthSection'
import PartnersSection from '../components/PartnersSection'
import ContactSection from '../components/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <NewsSection />
      <AboutSection />
      <StrengthSection />
      <PartnersSection />
      <ContactSection />
    </>
  )
}
