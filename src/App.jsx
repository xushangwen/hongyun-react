import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import { LenisProvider } from './context/LenisContext'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import SolutionsPage from './pages/SolutionsPage'
import ProductsPage from './pages/ProductsPage'
import ProductCategoryPage from './pages/ProductCategoryPage'
import ContactPage from './pages/ContactPage'
import SolutionDetailPage from './pages/SolutionDetailPage'
import ProductDetailPage from './pages/ProductDetailPage'
import DualPlanetaryMixerPage from './pages/DualPlanetaryMixerPage'
import CirculationPulpingPage from './pages/CirculationPulpingPage'
import PDPulpingPage from './pages/PDPulpingPage'
import PipelinePulpingPage from './pages/PipelinePulpingPage'
import TwinScrewPulpingPage from './pages/TwinScrewPulpingPage'
import DryPowderMixerPage from './pages/DryPowderMixerPage'
import HighSpeedDisperserPage from './pages/HighSpeedDisperserPage'
import KneaderPage from './pages/KneaderPage'
import PipelineDisperserPage from './pages/PipelineDisperserPage'
import CpDisperserPage from './pages/CpDisperserPage'
import CpTankAPage from './pages/CpTankAPage'
import CpTankBPage from './pages/CpTankBPage'
import NewsListPage from './pages/NewsListPage'
import NewsDetailPage from './pages/NewsDetailPage'

function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/new-energy/circulation-pulping" element={<CirculationPulpingPage />} />
          <Route path="/solutions/new-energy/pd-pulping" element={<PDPulpingPage />} />
          <Route path="/solutions/new-energy/pipeline-pulping" element={<PipelinePulpingPage />} />
          <Route path="/solutions/new-energy/twin-screw-pulping" element={<TwinScrewPulpingPage />} />
          <Route path="/solutions/solid-state-battery/dry-powder-mixer" element={<DryPowderMixerPage />} />
          <Route path="/solutions/:industryId/:solutionId" element={<SolutionDetailPage />} />
          <Route path="/products" element={<Navigate to="/products/new-energy" replace />} />
          <Route path="/products/:categoryId" element={<ProductCategoryPage />} />
          <Route path="/products/new-energy/dual-planetary-mixer" element={<DualPlanetaryMixerPage />} />
          <Route path="/products/new-energy/high-speed-disperser" element={<HighSpeedDisperserPage />} />
          <Route path="/products/new-energy/kneader" element={<KneaderPage />} />
          <Route path="/products/new-energy/pipeline-disperser" element={<PipelineDisperserPage />} />
          <Route path="/products/new-energy/cp-disperser" element={<CpDisperserPage />} />
          <Route path="/products/new-energy/cp-tank-a" element={<CpTankAPage />} />
          <Route path="/products/new-energy/cp-tank-b" element={<CpTankBPage />} />
          <Route path="/products/:categoryId/:productId" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/news" element={<NewsListPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
        </Routes>
      </Layout>
      </LenisProvider>
    </BrowserRouter>
  )
}

export default App
