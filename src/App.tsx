import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Genres from './components/Genres'
import Mixes from './components/Mixes'
import Highlights from './components/Highlights'
import GalleryStrip from './components/GalleryStrip'
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
      <main>
        <Hero />
        <About />
        <Genres />
        <Mixes />
        <GalleryStrip />
        <Highlights />
        <TechRider />
        <Booking />
      </main>
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
      <Route path="/builder" element={<AdminLogin />} />
      <Route path="/builder" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="gallery"   element={<AdminGallery />} />
        <Route path="content"   element={<AdminContent />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
