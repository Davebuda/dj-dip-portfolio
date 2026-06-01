import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'
import { useContent } from '../hooks/useContent'

/**
 * The Sound — deliberately COMPACT. A tight "sound palette" band, not a hero
 * section. (Was an oversized 4-big-card block with a 10rem heading; reduced per
 * direction — genres read as a quick list, the way djkiki folds them inline.)
 *
 * Genre cards come from the content store (`genreCards`, editable in admin).
 * Seeded with the original hardcoded values so the section looks identical
 * until edited; falls back to [] only if a stored value is explicitly empty.
 */
export default function Genres() {
  const { genreCards = [] } = useContent()

  return (
    <section
      id="sound"
      className="bg-dip-black py-16 md:py-20 px-8 md:px-16 overflow-x-hidden border-t border-dip-rose/10"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 mb-10">
          <div className="flex items-baseline gap-4">
            <p className="label">The Sound</p>
            <h2 className="font-display text-3xl md:text-4xl text-dip-cream leading-none">
              GENRES
            </h2>
          </div>
          <p className="text-dip-text-muted font-body font-light text-sm max-w-xs sm:text-right leading-relaxed">
            Four genres fused into one Urban Club Sound.
          </p>
        </Reveal>

        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          {genreCards.map(g => (
            <RevealItem
              key={g.name}
              className="flex flex-col gap-1.5 border-t border-dip-rose/15 pt-4"
            >
              <span className="font-mono text-xs text-dip-red/60" aria-hidden="true">
                {g.num}
              </span>
              <h3 className="font-heading font-bold text-lg md:text-xl text-dip-cream leading-tight">
                {g.name}
              </h3>
              <p className="text-dip-text-muted font-body font-light text-sm leading-snug">
                {g.desc}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
