import Reveal from './ui/Reveal'
import BookingForm from './BookingForm'
import { useContent } from '../hooks/useContent'

/**
 * Booking band — "Bring the fusion to your night."
 *
 * EPK download state: the `epkAvailable` flag is editable in admin. Toggle it on
 * (and drop the PDF at public/epk/dj-dip-epk.pdf) once the press kit exists.
 * Until then we render an honest disabled state — never a link to a 404.
 */
const EPK_HREF = '/epk/dj-dip-epk.pdf'

export default function Booking() {
  const { contact: { email, phone }, epkAvailable = false } = useContent()
  const telHref = `tel:${phone.replace(/\s/g, '')}`

  return (
    <section id="book" className="ed-section" aria-labelledby="book-t">
      <div className="ed-wrap">
        <Reveal className="booking">
          <span className="ghost-b" aria-hidden="true">DiP</span>

          <div className="booking-in">
            <div>
              <span className="label label-red">Booking</span>
              <h2 id="book-t" className="booking-title mt-4">Bring the <i>fusion</i> to your night.</h2>
              <p className="mt-5 text-[color:var(--muted)] text-[1.04rem] leading-relaxed max-w-[44ch]">
                Clubs, concepts, brand events across Oslo and beyond — DiP builds the set around
                your room, your crowd, and your peak hour. Tell me the date.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a className="book-line" href={`mailto:${email}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                <div className="min-w-0">
                  <div className="k">Email</div>
                  <div className="v">{email}</div>
                </div>
              </a>
              <a className="book-line" href={telHref}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
                <div className="min-w-0">
                  <div className="k">Phone</div>
                  <div className="v">{phone}</div>
                </div>
              </a>

              {/* EPK — real link when the PDF exists, honest disabled state otherwise. */}
              {epkAvailable ? (
                <a href={EPK_HREF} download className="btn-outline w-full">
                  Download Press Kit (EPK)
                  <span aria-hidden="true">↓</span>
                </a>
              ) : (
                <div className="flex flex-col gap-1">
                  <button type="button" disabled aria-disabled="true" className="btn-outline w-full opacity-50 cursor-not-allowed">
                    Press Kit (EPK) — Coming Soon
                  </button>
                  <span className="font-mono text-xs text-dip-text-muted">Full EPK PDF in preparation.</span>
                </div>
              )}
            </div>
          </div>

          {/* Booking enquiry form — real validation + mailto delivery. */}
          <div className="relative z-[2] mt-10 pt-8 border-t border-[color:var(--line)]">
            <p className="label mb-5">Or send the brief</p>
            <BookingForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
