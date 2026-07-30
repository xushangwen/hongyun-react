import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import SeoManager from './components/SeoManager'
import { LenisProvider } from './context/LenisContext'
import CmsDetailProvider from './context/CmsDetailProvider'
import { useScrollReveal } from './hooks/useScrollReveal'
import HomePage from './pages/HomePage'

// 路由级懒加载：首页随主包加载，其余页面按需拆分为独立 chunk，缩小首屏体积
const AboutPage = lazy(() => import('./pages/AboutPage'))
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductCategoryPage = lazy(() => import('./pages/ProductCategoryPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const SolutionDetailPage = lazy(() => import('./pages/SolutionDetailPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const DualPlanetaryMixerPage = lazy(() => import('./pages/DualPlanetaryMixerPage'))
const CirculationPulpingPage = lazy(() => import('./pages/CirculationPulpingPage'))
const PDPulpingPage = lazy(() => import('./pages/PDPulpingPage'))
const PipelinePulpingPage = lazy(() => import('./pages/PipelinePulpingPage'))
const TwinScrewPulpingPage = lazy(() => import('./pages/TwinScrewPulpingPage'))
const DryPowderMixerPage = lazy(() => import('./pages/DryPowderMixerPage'))
const HighSpeedDisperserPage = lazy(() => import('./pages/HighSpeedDisperserPage'))
const TwinScrewPulperPage = lazy(() => import('./pages/TwinScrewPulperPage'))
const KneaderPage = lazy(() => import('./pages/KneaderPage'))
const PipelineDisperserPage = lazy(() => import('./pages/PipelineDisperserPage'))
const CpDisperserPage = lazy(() => import('./pages/CpDisperserPage'))
const CpTankAPage = lazy(() => import('./pages/CpTankAPage'))
const CpTankBPage = lazy(() => import('./pages/CpTankBPage'))
const WetElectrodeSystemPage = lazy(() => import('./pages/WetElectrodeSystemPage'))
const SsbDryMixerPage = lazy(() => import('./pages/SsbDryMixerPage'))
const SsbFeederPage = lazy(() => import('./pages/SsbFeederPage'))
const SsbExtruderPage = lazy(() => import('./pages/SsbExtruderPage'))
const SsbCoaterPage = lazy(() => import('./pages/SsbCoaterPage'))
const SsbPipelineMixerPage = lazy(() => import('./pages/SsbPipelineMixerPage'))
const SsbMultiMixerPage = lazy(() => import('./pages/SsbMultiMixerPage'))
const SsbHighPressureWasherPage = lazy(() => import('./pages/SsbHighPressureWasherPage'))
const SprayNozzlePage = lazy(() => import('./pages/SprayNozzlePage'))
const NewsListPage = lazy(() => import('./pages/NewsListPage'))
const NewsDetailPage = lazy(() => import('./pages/NewsDetailPage'))
const ChemicalAutoProductionPage = lazy(() => import('./pages/ChemicalAutoProductionPage'))
const ChemicalProductDetailPage = lazy(() => import('./pages/ChemicalProductDetailPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))

function App() {
  useScrollReveal()

  return (
    <BrowserRouter>
      <CmsDetailProvider>
      <LenisProvider>
      <ScrollToTop />
      <SeoManager />
      <Layout>
        <Suspense fallback={<div style={{ minHeight: '70vh' }} aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/new-energy/circulation-pulping" element={<CirculationPulpingPage />} />
          <Route path="/solutions/new-energy/pd-pulping" element={<PDPulpingPage />} />
          <Route path="/solutions/new-energy/pipeline-pulping" element={<PipelinePulpingPage />} />
          <Route path="/solutions/new-energy/twin-screw-pulping" element={<TwinScrewPulpingPage />} />
          <Route path="/solutions/solid-state-battery/dry-powder-mixer" element={<DryPowderMixerPage />} />
          <Route path="/solutions/solid-state-battery/wet-electrode-system" element={<WetElectrodeSystemPage />} />
          <Route path="/solutions/chemical/auto-production" element={<ChemicalAutoProductionPage />} />
          <Route path="/solutions/:industryId/:solutionId" element={<SolutionDetailPage />} />
          <Route path="/products" element={<Navigate to="/products/new-energy" replace />} />
          <Route path="/products/:categoryId" element={<ProductCategoryPage />} />
          <Route path="/products/new-energy/dual-planetary-mixer"     element={<DualPlanetaryMixerPage variant="production" />} />
          <Route path="/products/new-energy/dual-planetary-mixer-mid" element={<DualPlanetaryMixerPage variant="mid" />} />
          <Route path="/products/new-energy/dual-planetary-mixer-lab" element={<DualPlanetaryMixerPage variant="lab" />} />
          <Route path="/products/new-energy/high-speed-disperser" element={<HighSpeedDisperserPage />} />
          <Route path="/products/new-energy/kneader" element={<KneaderPage />} />
          <Route path="/products/new-energy/pipeline-disperser" element={<PipelineDisperserPage />} />
          <Route path="/products/new-energy/cp-disperser" element={<CpDisperserPage />} />
          <Route path="/products/new-energy/cp-tank-a" element={<CpTankAPage />} />
          <Route path="/products/new-energy/cp-tank-b" element={<CpTankBPage />} />
          <Route path="/products/new-energy/twin-screw-pulper" element={<TwinScrewPulperPage />} />
          <Route path="/products/solid-state-battery/dual-planetary-mixer" element={<DualPlanetaryMixerPage variant="production" />} />
          <Route path="/products/solid-state-battery/dry-electrode-mixer" element={<SsbDryMixerPage />} />
          <Route path="/products/solid-state-battery/electromagnetic-feeder" element={<SsbFeederPage />} />
          <Route path="/products/solid-state-battery/twin-screw-dry-extruder" element={<SsbExtruderPage />} />
          <Route path="/products/solid-state-battery/solid-electrolyte-coater" element={<SsbCoaterPage />} />
          <Route path="/products/solid-state-battery/ssb-pipeline-mixer" element={<SsbPipelineMixerPage />} />
          <Route path="/products/solid-state-battery/ssb-multi-mixer" element={<SsbMultiMixerPage />} />
          <Route path="/products/auxiliary/ssb-high-pressure-washer" element={<SsbHighPressureWasherPage />} />
          <Route path="/products/auxiliary/spray-nozzle" element={<SprayNozzlePage />} />
          <Route path="/products/chemical/:productId" element={<ChemicalProductDetailPage />} />
          <Route path="/products/:categoryId/:productId" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/news" element={<NewsListPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </Layout>
      </LenisProvider>
      </CmsDetailProvider>
    </BrowserRouter>
  )
}

export default App
