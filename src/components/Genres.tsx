import Reveal from './ui/Reveal'
import { useContent } from '../hooks/useContent'

/**
 * 01 — The Sound. Editorial flat-grid of genre cells (from `genreCards`,
 * editable in admin) led in by a hover-pausing genre marquee built from the
 * `genres` chip list. Seeded with the original values so it looks identical
 * until edited; falls back to [] only when a stored value is explicitly empty.
 */
export default function Genres() {
  const { genreCards = [], genres = [] } = useContent()

  // Marquee items: genre names + the fusion line, duplicated once for a
  // seamless loop. Decorative — aria-hidden.
  const marquee = [...genres, 'Urban Sound Fusion']

  return (
    <section id="sound" className="ed-section" aria-labelledby="sound-t">
      {/* Genre marquee (full-bleed band) */}
      <div className="marquee mb-[clamp(2.5rem,5vw,4rem)]" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map(copy =>
            marquee.map((g, i) => (
              <span key={`${copy}-${g}-${i}`} className={i % 2 === 1 ? 'out' : undefined}>
                {g}
              </span>
            )),
          )}
        </div>
      </div>

      <div className="ed-wrap">
        <Reveal className="sec-head">
          <span className="sec-num" aria-hidden="true">01</span>
          <h2 className="sec-title" id="sound-t">The <i>Sound</i></h2>
          <p className="sec-kicker label">Genres fused into one seamless thread — bridged by intent, not accident.</p>
        </Reveal>

        <Reveal className="genres">
          {genreCards.map((g, i) => {
            const wide = genreCards.length % 2 === 1 && i === genreCards.length - 1
            return (
              <article key={g.name} className={`genre ${wide ? 'wide' : ''}`}>
                <span className="gbar" aria-hidden="true" />
                <span className="gnum">{g.num}</span>
                <div>
                  <h3>{g.name}</h3>
                  <p>{g.desc}</p>
                </div>
              </article>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
