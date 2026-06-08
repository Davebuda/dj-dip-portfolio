import { useState, useEffect } from 'react'

// Only sections that actually render — no dead links. Capped at 6 for 375px.
// Tech Rider is reachable from the Booking section / footer, not primary nav.
const links = [
  { label: 'Sound',   href: '#sound' },
  { label: 'Mixes',   href: '#mixes' },
  { label: 'Dates',   href: '#dates' },
  { label: 'Archive', href: '#archive' },
  { label: 'Reels',   href: '#reels' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Book',    href: '#book' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-dip-black/90 backdrop-blur-md border-b border-white/[0.06]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display text-3xl tracking-wide text-dip-cream hover:text-dip-rose transition-colors">
          DJ DiP
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="font-heading font-bold text-sm tracking-[0.2em] uppercase text-dip-text-muted hover:text-dip-cream transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#book"
          className="hidden md:inline-flex btn-brand text-sm px-6 py-2.5"
        >
          Book Now
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col items-center justify-center gap-1.5 w-11 h-11"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-px bg-dip-cream transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-dip-cream transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-dip-cream transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dip-dark/98 backdrop-blur-md border-t border-white/[0.06] px-6 py-8 flex flex-col gap-6">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-heading font-bold text-base tracking-[0.2em] uppercase text-dip-text-muted hover:text-dip-cream transition-colors flex items-center min-h-[44px]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setMenuOpen(false)}
            className="mt-2 btn-brand text-sm text-center"
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  )
}
