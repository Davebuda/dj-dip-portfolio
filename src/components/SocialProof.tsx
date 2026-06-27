import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'
import { useContent } from '../hooks/useContent'

/**
 * 07 — On Record. A quiet editorial credibility band: venue / promoter
 * wordmarks (or logos when supplied) + at most ONE pull-quote.
 *
 * Honest by default: ships with NO fabricated testimonials. `proof`/`quote`
 * come from the content store and default to empty/null — the honest
 * empty-state renders until real ones are added. If only names exist, they
 * render as text wordmarks.
 */
export default function SocialProof() {
  const { proof = [], quote = null } = useContent()
  // No credits yet → the section doesn't appear at all.
  if (proof.length === 0) return null

  return (
    <section id="trusted" className="ed-section" aria-labelledby="trusted-t">
      <div className="ed-wrap">
        <Reveal className="sec-head">
          <span className="sec-num" aria-hidden="true">07</span>
          <h2 className="sec-title" id="trusted-t">On <i>Record</i></h2>
          <p className="sec-kicker label">Venues and promoters across the circuit.</p>
        </Reveal>

        <RevealGroup stagger={0.05} className="flex flex-wrap items-center gap-x-10 gap-y-5 md:gap-x-14">
          {proof.map(item => (
            <RevealItem key={item.name} className="flex items-center">
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.name}
                  width={120}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="h-8 w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                />
              ) : (
                <span className="font-display text-2xl md:text-3xl text-dip-text-muted hover:text-dip-cream transition-colors tracking-tight">
                  {item.name}
                </span>
              )}
            </RevealItem>
          ))}
        </RevealGroup>

        {quote && quote.text && (
          <Reveal delay={0.1} className="mt-12 max-w-3xl">
            <blockquote className="border-l border-dip-red/60 pl-6">
              <p className="font-display italic text-2xl md:text-3xl text-dip-cream leading-snug">
                “{quote.text}”
              </p>
              <footer className="mt-3 label not-italic">— {quote.attribution}</footer>
            </blockquote>
          </Reveal>
        )}
      </div>
    </section>
  )
}
