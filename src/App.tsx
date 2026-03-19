import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Highlights from './components/Highlights'
import TechRider from './components/TechRider'
import Booking from './components/Booking'
import Footer from './components/Footer'
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import AdminGallery from './admin/AdminGallery'
import AdminContent from './admin/AdminContent'

function Portfolio() {
  return (
    <div className="overflow-x-hidden">
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url(/images/bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />
      <Nav />
      <Hero />
      <About />
      <Highlights />
      <TechRider />
      <Booking />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Public portfolio */}
      <Route path="/" element={<Portfolio />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="gallery"   element={<AdminGallery />} />
        <Route path="content"   element={<AdminContent />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
