import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'
import { useContent } from '../hooks/useContent'

const stats = [
  { value: '8+',    label: 'Years Behind The Decks' },
  { value: '4',     label: 'Genres Mastered' },
  { value: 'Oslo',  label: 'Based In Norway' },
  { value: 'KlubN', label: 'Resident DJ' },
]

export default function About() {
  const content = useContent()

  return (
    <section id="about" className="bg-dip-dark py-16 md:py-20 px-8 md:px-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        <Reveal>
          <p className="label mb-8">The Artist</p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* Left — quote + stats */}
          <div>
            <Reveal delay={0.1}>
              <blockquote className="font-display italic text-4xl md:text-5xl text-dip-rose leading-tight mb-8">
                "Dance Floor<br />is Too Smooth."
              </blockquote>
            </Reveal>

            <RevealGroup className="grid grid-cols-2 gap-2.5">
              {stats.map(stat => (
                <RevealItem
                  key={stat.label}
                  className="p-4 border border-dip-rose/15 bg-dip-card group hover:border-dip-red/30 transition-colors"
                >
                  <div
                    className="font-display text-3xl mb-1 group-hover:opacity-90 transition-opacity"
                    style={{ background: 'linear-gradient(135deg, #E63020, #D44040)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm font-heading font-bold tracking-[0.1em] uppercase text-dip-text-muted leading-tight">
                    {stat.label}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* Right — bio */}
          <Reveal delay={0.15}>
            <h2 className="font-display text-5xl md:text-6xl text-dip-cream leading-none mb-5">
              <span className="sr-only">About Davis "DiP"</span>
              <span aria-hidden="true">
                DAVIS<br />
                <span style={{ background: 'linear-gradient(135deg, #E63020, #BF2D1E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DiP</span>
              </span>
            </h2>

            <p className="text-dip-cream/70 font-body font-light leading-relaxed text-base">
              {content.bio}
            </p>

            <p className="text-dip-cream/55 font-body font-light leading-relaxed text-sm mt-4">
              {content.bio2}
            </p>

            <div className="divider mt-8 mb-5" />

            <div className="flex items-center gap-5 flex-wrap">
              <a
                href="https://instagram.com/dj_dip"
                target="_blank"
                rel="noreferrer"
                className="label inline-flex items-center min-h-[44px] hover:text-dip-cream transition-colors"
              >
                @dj_dip
              </a>
              <span className="w-px h-4 bg-dip-rose/20" aria-hidden="true" />
              <a
                href="https://instagram.com/klub_n_oslo"
                target="_blank"
                rel="noreferrer"
                className="label inline-flex items-center min-h-[44px] hover:text-dip-cream transition-colors"
              >
                @klub_n_oslo
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
