import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'

/**
 * Social Proof (#trusted) — deliberately SMALL.
 *
 * A quiet credibility strip: venue / promoter names (or logos when supplied) +
 * at most ONE short pull-quote. Not a hero section, no carousel, no star ratings.
 *
 * Honest by default: ships with NO fabricated testimonials. `PROOF` is the
 * placeholder array — empty ships the honest empty-state. If only names exist
 * (no logo files yet), they render as text wordmarks. We never invent a quote.
 *
 * CONTENT-STORE SWAP PATH (mirrors Mixes/Dates/Reels): add `proof[]` to
 * Content/DEFAULTS in src/hooks/useContent.ts and swap the local `PROOF`
 * constant. Optional logo files go in public/logos/ and populate `logo`.
 */

export interface ProofItem {
  /** Venue / promoter name — always present, used as the text wordmark + alt. */
  name: string
  /** Optional logo path, e.g. '/logos/klubn.svg'. Falls back to the name text. */
  logo?: string
}

// Intentionally empty until the artist supplies real venues/logos.
const PROOF: ProofItem[] = []

// At most one short, REAL quote. Empty until a genuine quote is provided —
// never fabricated.
const QUOTE: { text: string; attribution: string } | null = null

export default function SocialProof() {
  const hasProof = PROOF.length > 0

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
          {PROOF.map(item => (
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

        {QUOTE && (
          <Reveal delay={0.1} className="mt-8 max-w-2xl">
            <blockquote className="border-l-2 border-dip-red/50 pl-5">
              <p className="font-body text-lg text-dip-cream/90 leading-relaxed italic">
                “{QUOTE.text}”
              </p>
              <footer className="mt-2 font-mono text-xs text-dip-text-muted not-italic">
                — {QUOTE.attribution}
              </footer>
            </blockquote>
          </Reveal>
        )}
      </div>
    </section>
  )
}
