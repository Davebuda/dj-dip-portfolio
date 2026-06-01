import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'
import { useContent } from '../hooks/useContent'

/**
 * Social Proof (#trusted) — deliberately SMALL.
 *
 * A quiet credibility strip: venue / promoter names (or logos when supplied) +
 * at most ONE short pull-quote. Not a hero section, no carousel, no star ratings.
 *
 * Honest by default: ships with NO fabricated testimonials. `proof`/`quote`
 * come from the content store (src/hooks/useContent.ts) and default to
 * empty/null — the honest empty-state renders until the artist adds real ones.
 * If only names exist (no logo files yet), they render as text wordmarks.
 * Logos are uploaded via the admin gallery flow.
 */

export default function SocialProof() {
  const { proof = [], quote = null } = useContent()
  const hasProof = proof.length > 0

  if (!hasProof) {
    // HONEST empty-state — small and quiet, no fabricated credibility.
    return (
      <section
        id="trusted"
        className="bg-dip-card py-12 md:py-14 px-8 md:px-16 overflow-x-hidden border-t border-dip-rose/10"
      >
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
            <p className="label">Trusted by</p>
            <p className="font-body font-light text-sm text-dip-text-muted leading-relaxed">
              Venue and promoter credits will appear here.
            </p>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section
      id="trusted"
      className="bg-dip-card py-12 md:py-14 px-8 md:px-16 overflow-x-hidden border-t border-dip-rose/10"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-6">
          <p className="label">Trusted by</p>
        </Reveal>

        <RevealGroup
          stagger={0.05}
          className="flex flex-wrap items-center gap-x-8 gap-y-4 md:gap-x-12"
        >
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
                <span className="font-heading font-bold text-base tracking-wide text-dip-text-muted hover:text-dip-cream transition-colors">
                  {item.name}
                </span>
              )}
            </RevealItem>
          ))}
        </RevealGroup>

        {quote && quote.text && (
          <Reveal delay={0.1} className="mt-8 max-w-2xl">
            <blockquote className="border-l-2 border-dip-red/50 pl-5">
              <p className="font-body text-lg text-dip-cream/90 leading-relaxed italic">
                “{quote.text}”
              </p>
              <footer className="mt-2 font-mono text-xs text-dip-text-muted not-italic">
                — {quote.attribution}
              </footer>
            </blockquote>
          </Reveal>
        )}
      </div>
    </section>
  )
}
