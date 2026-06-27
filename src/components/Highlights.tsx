import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'
import { useContent } from '../hooks/useContent'

/**
 * 04 — Stages & residencies. Editorial flat-grid roster (from `highlights`,
 * editable in admin). Seeded with the original venues so the section looks
 * identical until edited; falls back to [] only if a stored value is empty.
 */
export default function Highlights() {
  const { highlights: events = [] } = useContent()

  return (
    <section id="stages" className="ed-section" aria-labelledby="stages-t">
      <div className="ed-wrap">
        <Reveal className="sec-head">
          <span className="sec-num" aria-hidden="true">04</span>
          <h2 className="sec-title" id="stages-t">Stages &amp; <i>residencies</i></h2>
          <p className="sec-kicker label">A roster built across Oslo's club floors.</p>
        </Reveal>

        <RevealGroup stagger={0.05} className="stages">
          {events.map((ev, i) => (
            <RevealItem
              key={`${ev.venue}-${i}`}
              className={`stage ${ev.featured ? 'primary' : ''}`}
            >
              <span className="idx" aria-hidden="true">
                {ev.featured ? '★ Resident' : String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="vn">{ev.venue}</div>
                <div className="role">
                  {ev.event}
                  {ev.tags.length > 0 && (
                    <span className="chips">{ev.tags.join(' · ')}</span>
                  )}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
