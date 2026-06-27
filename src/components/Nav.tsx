import { useState, useEffect } from 'react'

// Only sections that actually render — no dead links. Capped at 6 for 375px.
// Tech Rider is reachable from the Booking section / footer, not primary nav.
const links = [
  { label: 'Sound',   href: '#sound',   num: '01' },
  { label: 'Mixes',   href: '#mixes',   num: '02' },
  { label: 'Dates',   href: '#dates',   num: '03' },
  { label: 'Reels',   href: '#reels',   num: '04' },
  { label: 'Gallery', href: '#gallery', num: '05' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`ed-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="ed-wrap flex items-center justify-between h-16">
        {/* Brand */}
        <a href="#top" className="brand" aria-label="DJ DiP — home">
          D<i>i</i>P<span className="dot">.</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-[clamp(1rem,2.4vw,2.1rem)]" aria-label="Primary">
          {links.map(link => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a href="#book" className="btn-brand !min-h-[44px] px-5 py-2">
            Book the set
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg border border-[color:var(--stroke)] text-dip-cream"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="relative block w-5">
            <span className={`block h-0.5 w-5 bg-dip-cream transition-all ${menuOpen ? 'rotate-45 translate-y-[3px]' : '-translate-y-1'}`} />
            <span className={`block h-0.5 w-5 bg-dip-cream transition-all mt-1 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden border-t border-[color:var(--line)] bg-[color:var(--ink-2)]"
          aria-label="Mobile"
        >
          <ul className="list-none m-0 p-0">
            {[...links, { label: 'Book the set', href: '#book', num: '→' }].map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-6 py-4 min-h-[44px] font-display text-2xl font-medium text-dip-cream border-t border-[color:var(--line)] first:border-t-0 active:bg-[color:var(--ink-3)]"
                >
                  {link.label}
                  <span className="font-mono text-xs text-dip-text-muted">{link.num}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
