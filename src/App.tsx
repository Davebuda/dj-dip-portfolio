import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Highlights from './components/Highlights'
import TechRider from './components/TechRider'
import Booking from './components/Booking'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="overflow-x-hidden">
      {/* ── Fixed photo backdrop — stays pinned, content scrolls over it ── */}
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
