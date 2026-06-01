import Reveal from './ui/Reveal'
import BookingForm from './BookingForm'
import { useContent } from '../hooks/useContent'

/**
 * EPK download state.
 * Set EPK_AVAILABLE to true and drop the PDF at public/epk/dj-dip-epk.pdf once
 * the press kit exists. Until then we render an honest "coming soon" disabled
 * state — never a link to a 404.
 */
const EPK_AVAILABLE = false
const EPK_HREF = '/epk/dj-dip-epk.pdf'

export default function Booking() {
  const { contact: { email, phone } } = useContent()

  return (
    <section id="book" className="relative py-20 px-8 md:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-dip-dark" />
      <div className="absolute inset-0 bg-gradient-to-br from-dip-red/10 via-transparent to-dip-rose/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-dip-red/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <span className="font-display text-[14rem] md:text-[20rem] text-white/[0.02] leading-none">DiP</span>
      </div>

      <div className="relative max-w-2xl mx-auto text-center">

        <Reveal>
          <p className="label mb-6">Get In Touch</p>
          <h2 className="font-display text-5xl md:text-7xl text-dip-cream leading-none">
            LET'S CREATE
          </h2>
          <p className="font-display italic text-3xl md:text-5xl text-dip-rose mt-2">
            something unforgettable
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 glass-card rounded-2xl p-6 md:p-8">
          <BookingForm />
        </Reveal>

        {/* EPK download — real link when the PDF exists, honest disabled state otherwise. */}
        <Reveal delay={0.15} className="mt-6">
          {EPK_AVAILABLE ? (
            <a
              href={EPK_HREF}
              download
              className="btn-outline w-full sm:w-auto text-sm px-8 min-h-[44px] gap-2"
            >
              Download Press Kit (EPK)
              <span aria-hidden="true">↓</span>
            </a>
          ) : (
            <div className="inline-flex flex-col items-center gap-1">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="btn-outline w-full sm:w-auto text-sm px-8 min-h-[44px] opacity-50 cursor-not-allowed"
              >
                Press Kit (EPK) — Coming Soon
              </button>
              <span className="font-mono text-xs text-dip-text-muted">Full EPK PDF in preparation.</span>
            </div>
          )}
        </Reveal>

        {/* Direct-contact fallback to the form's mailto compose. */}
        <Reveal delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-8">
          <a
            href={`mailto:${email}`}
            className="btn-brand w-full sm:w-auto text-sm px-8 min-h-[44px] group"
          >
            Email Directly
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline-block" aria-hidden="true">→</span>
          </a>
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="btn-outline w-full sm:w-auto text-sm px-8 min-h-[44px]"
          >
            {phone}
          </a>
        </Reveal>

        <Reveal delay={0.3} className="flex items-center justify-center gap-6">
          <a href="https://instagram.com/dj_dip" target="_blank" rel="noreferrer" className="label inline-flex items-center min-h-[44px] hover:text-dip-cream transition-colors">
            @dj_dip
          </a>
          <span className="w-px h-4 bg-dip-rose/20" aria-hidden="true" />
          <a href="https://instagram.com/klub_n_oslo" target="_blank" rel="noreferrer" className="label inline-flex items-center min-h-[44px] hover:text-dip-cream transition-colors">
            @klub_n_oslo
          </a>
        </Reveal>
      </div>
    </section>
  )
}
