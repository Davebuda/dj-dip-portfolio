import Reveal from './ui/Reveal'
import { useContent } from '../hooks/useContent'

/**
 * 00 — The Artist. Editorial two-column spread: a stroked "DiP" art block
 * paired with the bio lead + role chips. Data-driven from useContent (bio,
 * bio2); bio2 is split into the role chips.
 */
export default function About() {
  const content = useContent()
  const roles = content.bio2
    .split(/[.•]/)
    .map(r => r.trim())
    .filter(Boolean)

  return (
    <section id="about" className="ed-section" aria-labelledby="about-t">
      <div className="ed-wrap">
        <Reveal className="sec-head">
          <span className="sec-num" aria-hidden="true">00</span>
          <h2 className="sec-title" id="about-t">The <i>Artist</i></h2>
          <p className="sec-kicker label">Peak-hour specialist. Event architect. Concept builder.</p>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-art">
            <span className="floatmark" aria-hidden="true">DiP</span>
            <span className="about-meta">Oslo · Norway — Event Architect</span>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="about-lead">{content.bio}</p>
            <div className="roles">
              {roles.map(r => (
                <span key={r}>{r}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
