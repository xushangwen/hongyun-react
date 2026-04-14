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
import PDPulpingPage from './pages/PDPulpingPage'
import PipelinePulpingPage from './pages/PipelinePulpingPage'
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
          <Route path="/solutions/new-energy/pd-pulping" element={<PDPulpingPage />} />
          <Route path="/solutions/new-energy/pipeline-pulping" element={<PipelinePulpingPage />} />
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
