import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import SolutionsPage from './pages/SolutionsPage'
import ProductsPage from './pages/ProductsPage'
import ContactPage from './pages/ContactPage'
import SolutionDetailPage from './pages/SolutionDetailPage'
import ProductDetailPage from './pages/ProductDetailPage'
import DualPlanetaryMixerPage from './pages/DualPlanetaryMixerPage'
import CirculationPulpingPage from './pages/CirculationPulpingPage'
import SmartControlPage from './pages/SmartControlPage'
import PneumaticConveyingPage from './pages/PneumaticConveyingPage'
import MeteringDosingPage from './pages/MeteringDosingPage'
import AgitationPulpingPage from './pages/AgitationPulpingPage'
import UnpackingFeedingPage from './pages/UnpackingFeedingPage'
import DustCleaningPage from './pages/DustCleaningPage'
import NewsListPage from './pages/NewsListPage'
import NewsDetailPage from './pages/NewsDetailPage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/new-energy/circulation-pulping" element={<CirculationPulpingPage />} />
          <Route path="/solutions/new-energy/smart-control" element={<SmartControlPage />} />
          <Route path="/solutions/new-energy/pneumatic-conveying" element={<PneumaticConveyingPage />} />
          <Route path="/solutions/new-energy/metering-dosing" element={<MeteringDosingPage />} />
          <Route path="/solutions/new-energy/agitation-pulping" element={<AgitationPulpingPage />} />
          <Route path="/solutions/new-energy/unpacking-feeding" element={<UnpackingFeedingPage />} />
          <Route path="/solutions/new-energy/dust-cleaning" element={<DustCleaningPage />} />
          <Route path="/solutions/:industryId/:solutionId" element={<SolutionDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new-energy/dual-planetary-mixer" element={<DualPlanetaryMixerPage />} />
          <Route path="/products/:categoryId/:productId" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/news" element={<NewsListPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
