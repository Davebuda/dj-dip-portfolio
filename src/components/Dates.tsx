import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'
import { useContent, type DjEvent } from '../hooks/useContent'

/**
 * Upcoming Gigs / Dates (#dates)
 *
 * A dated agenda list: big DM-Mono date block · venue + city · ticket link.
 * Auto-sorts ascending by date and AUTO-HIDES past events (compared to today),
 * so the section never reads stale.
 *
 * Honest by default: ships with NO fabricated dates. The `EVENTS` placeholder
 * array below is intentionally empty — until the artist supplies real dates
 * (via the content store / admin, see swap path below), this renders a truthful
 * empty-state, never fake gigs.
 *
 * CONTENT-STORE SWAP PATH (mirrors Mixes.tsx):
 *   `useContent()` does not yet expose `events`. When the admin server / content
 *   API adds an `events[]` field, extend the `Content` interface + `DEFAULTS` in
 *   src/hooks/useContent.ts (the `DjEvent` interface + `events` field now live
 *   there) and read it via `const { events = [] } = useContent()`. Empty array
 *   renders the honest empty-state.
 */

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

function formatDate(iso: string): { day: string; month: string } {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return { day: '--', month: '---' }
  return { day: String(d.getDate()).padStart(2, '0'), month: MONTHS[d.getMonth()] }
}

function upcoming(events: DjEvent[]): DjEvent[] {
  // Hide anything before today (local midnight) and sort soonest-first.
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  return events
    .filter(ev => {
      const t = new Date(ev.date).getTime()
      return !Number.isNaN(t) && t >= startOfToday.getTime()
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export default function Dates() {
  const { social, events: allEvents = [] } = useContent()
  const events = upcoming(allEvents)
  const hasDates = events.length > 0

  return (
    <section
      id="dates"
      className="bg-dip-black py-16 md:py-20 px-8 md:px-16 overflow-x-hidden border-t border-dip-rose/10"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 mb-10">
          <div className="flex items-baseline gap-4">
            <p className="label">Live</p>
            <h2 className="font-display text-5xl md:text-6xl text-dip-cream leading-none">
              DATES
            </h2>
          </div>
          <p className="text-dip-text-muted font-body font-light text-sm max-w-xs sm:text-right leading-relaxed">
            Where to catch the next set.
          </p>
        </Reveal>

        {hasDates ? (
          <RevealGroup stagger={0.06}>
            {events.map((ev, i) => {
              const { day, month } = formatDate(ev.date)
              const featured = i === 0
              return (
                <RevealItem
                  key={`${ev.date}-${ev.venue}-${i}`}
                  className={`group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-5 border-b transition-colors duration-300 ${
                    featured
                      ? 'border-dip-red/40 hover:border-dip-red'
                      : 'border-dip-rose/10 hover:border-dip-rose/30'
                  }`}
                >
                  {/* Date block */}
                  <div
                    className={`flex items-baseline gap-2 font-mono leading-none shrink-0 ${
                      featured ? 'text-dip-red' : 'text-dip-cream'
                    }`}
                  >
                    <span className="text-3xl md:text-4xl">{day}</span>
                    <span className="text-sm tracking-wide text-dip-text-muted">{month}</span>
                  </div>

                  {/* Venue + city */}
                  <div className="min-w-0 flex-1">
                    <p className="font-heading font-bold text-base md:text-lg text-dip-cream group-hover:text-white transition-colors truncate">
                      {ev.venue}
                    </p>
                    <p className="font-body font-light text-sm text-dip-text-muted">
                      {ev.city}
                      {ev.status ? ` · ${ev.status}` : ''}
                    </p>
                  </div>

                  {/* Ticket link */}
                  {ev.ticketUrl ? (
                    <a
                      href={ev.ticketUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 inline-flex items-center justify-center font-heading font-bold text-xs tracking-[0.16em] uppercase text-dip-cream border border-dip-rose/30 hover:border-dip-red hover:text-dip-red rounded-full px-5 min-h-[44px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dip-red"
                    >
                      Tickets
                    </a>
                  ) : (
                    <span className="shrink-0 font-mono text-xs text-dip-text-muted self-center sm:self-auto">
                      DM to attend
                    </span>
                  )}
                </RevealItem>
              )
            })}
          </RevealGroup>
        ) : (
          // HONEST empty-state — no fabricated dates.
          <Reveal>
            <div className="border border-dashed border-dip-rose/20 rounded-2xl p-10 md:p-14 text-center max-w-2xl">
              <p className="font-display text-3xl md:text-4xl text-dip-cream leading-tight mb-4">
                Dates announced soon.
              </p>
              <p className="font-body font-light text-dip-text-muted text-base leading-relaxed mb-8">
                Upcoming club nights and residencies will be listed here. Follow
                along to know when and where to catch the next set.
              </p>
              <a
                href={`https://instagram.com/${social.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="btn-brand inline-flex items-center gap-2 text-sm"
              >
                Follow @{social.instagram}
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
