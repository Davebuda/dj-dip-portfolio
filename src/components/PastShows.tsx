import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'
import { useContent, type ArchiveItem } from '../hooks/useContent'

/**
 * Past Shows / Archive (#archive)
 *
 * Renders the moderated past-shows archive: only items with
 * reviewStatus === 'published' ever appear here — 'suggested' (pending)
 * items live exclusively in the admin approval queue and never render
 * publicly. Sorted newest-first by date.
 *
 * Honest by default: when there are no published items the section renders
 * nothing (no fabricated history, no empty shell), mirroring how the other
 * sections refuse to invent content.
 */

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

function formatDate(iso: string): { day: string; month: string; year: string } {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return { day: '--', month: '---', year: '----' }
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: MONTHS[d.getMonth()],
    year: String(d.getFullYear()),
  }
}

function published(items: ArchiveItem[]): ArchiveItem[] {
  // Public surface: published-only, newest-first. Suggested items never leak.
  return items
    .filter(item => item.reviewStatus === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function PastShows() {
  const { archive = [] } = useContent()
  const shows = published(archive)

  // Honest empty-state: no published past shows → render nothing.
  if (shows.length === 0) return null

  return (
    <section
      id="archive"
      className="bg-dip-black py-16 md:py-20 px-8 md:px-16 overflow-x-hidden border-t border-dip-rose/10"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 mb-10">
          <div className="flex items-baseline gap-4">
            <p className="label">Archive</p>
            <h2 className="font-display text-5xl md:text-6xl text-dip-cream leading-none">
              PAST SHOWS
            </h2>
          </div>
          <p className="text-dip-text-muted font-body font-light text-sm max-w-xs sm:text-right leading-relaxed">
            A look back at past nights.
          </p>
        </Reveal>

        <RevealGroup
          stagger={0.06}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {shows.map(show => {
            const { day, month, year } = formatDate(show.date)
            return (
              <RevealItem
                key={show.id}
                className="group flex flex-col rounded-2xl border border-dip-rose/10 bg-dip-card overflow-hidden hover:border-dip-rose/30 transition-colors duration-300"
              >
                {show.imageUrl && (
                  <div className="aspect-[4/3] overflow-hidden bg-dip-dark">
                    <img
                      src={show.imageUrl}
                      alt={`${show.title} — ${show.venue}, ${show.city}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-3 p-6">
                  {/* Date block */}
                  <div className="flex items-baseline gap-2 font-mono leading-none text-dip-red shrink-0">
                    <span className="text-2xl md:text-3xl">{day}</span>
                    <span className="text-sm tracking-wide text-dip-text-muted">
                      {month} {year}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-dip-cream group-hover:text-white transition-colors">
                    {show.title}
                  </h3>

                  <p className="font-body font-light text-sm text-dip-text-muted">
                    {show.venue}
                    {show.city ? ` · ${show.city}` : ''}
                  </p>

                  {show.description && (
                    <p className="font-body font-light text-sm text-dip-cream/70 leading-relaxed">
                      {show.description}
                    </p>
                  )}

                  {show.tags && show.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {show.tags.map(tag => (
                        <span
                          key={tag}
                          className="font-heading font-bold text-[11px] tracking-wide uppercase text-dip-rose/90 bg-dip-red/[0.1] border border-dip-red/[0.28] rounded-full px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {show.ticketUrl && (
                    <a
                      href={show.ticketUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center self-start font-heading font-bold text-xs tracking-[0.16em] uppercase text-dip-cream border border-dip-rose/30 hover:border-dip-red hover:text-dip-red rounded-full px-5 min-h-[44px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dip-red"
                    >
                      Details
                    </a>
                  )}
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
