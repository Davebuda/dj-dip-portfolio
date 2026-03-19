import { useState, useEffect } from 'react'

const links = [
  { label: 'About',     href: '#about' },
  { label: 'Sound',     href: '#sound' },
  { label: 'Events',    href: '#events' },
  { label: 'Tech',      href: '#tech-rider' },
  { label: 'Book',      href: '#book' },
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
        scrolled
          ? 'bg-dip-black/95 backdrop-blur-md border-b border-white/5'
          : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display text-2xl tracking-widest text-dip-cream hover:text-dip-rose transition-colors">
          DJ DiP
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-body font-medium tracking-[0.25em] uppercase text-dip-muted hover:text-dip-cream transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#book"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-dip-red/60 text-dip-red text-xs font-body font-semibold tracking-[0.25em] uppercase hover:bg-dip-red hover:text-white transition-all duration-300"
        >
          Book Now
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-dip-cream transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-dip-cream transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-dip-cream transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dip-dark/98 backdrop-blur-md border-t border-white/5 px-6 py-8 flex flex-col gap-6">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-body font-medium tracking-[0.25em] uppercase text-dip-muted hover:text-dip-cream transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-block text-center px-6 py-3 bg-dip-red text-white text-xs font-body font-semibold tracking-[0.25em] uppercase"
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  )
}
