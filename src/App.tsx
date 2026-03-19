import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Genres from './components/Genres'
import Highlights from './components/Highlights'
import TechRider from './components/TechRider'
import Booking from './components/Booking'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <Hero />
      <About />
      <Genres />
      <Highlights />
      <TechRider />
      <Booking />
      <Footer />
    </div>
  )
}
