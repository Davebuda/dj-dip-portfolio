import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'
import { useContent, type DjEvent } from '../hooks/useContent'

/**
 * 03 — Upcoming dates. Editorial bill: hairline-ruled rows, stroked-display day
 * numerals, DM-Mono meta, restrained red status pills.
 *
 * Auto-sorts ascending by date and AUTO-HIDES past events, so the section never
 * reads stale. Honest by default: ships with NO fabricated dates — until the
 * artist supplies real ones, a truthful empty-state + IG CTA renders.
 *
 * Reads the canonical `DjEvent` (useContent.ts), which carries the optional
 * rich display fields (title/time/genre/price/description/…) also ingested via
 * POST /admin-api/ingest/events. Every supplied field is surfaced.
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

function upcoming(events: DjEvent[]): DjEvent[] {
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  return events
    .filter(ev => {
      const t = new Date(ev.date).getTime()
      return !Number.isNaN(t) && t >= startOfToday.getTime()
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

function titleOf(ev: DjEvent): string {
  return ev.title?.trim() || ev.venue
}

function StatusPill({ status }: { status?: string }) {
  if (!status) return null
  const cls = /resident/i.test(status) ? 'resident' : /free/i.test(status) ? 'free' : 'res'
  return <span className={`status ${cls}`}>{status}</span>
}

function DateRow({ ev, first }: { ev: DjEvent; first: boolean }) {
  const { day, month, year } = formatDate(ev.date)
  const title = titleOf(ev)
  const meta = [ev.venue, ev.city, ev.time].filter(Boolean).join(' · ')

  return (
    <article className={`date-row ${ev.imageUrl ? 'has-poster' : ''} ${first ? 'first' : ''}`}>
      {ev.imageUrl && (
        <div className="date-poster">
          <img src={ev.imageUrl} alt={`${title} — event poster`} loading="lazy" decoding="async" />
        </div>
      )}
      <div className="date-body">
        <div className="date-kicker">{month} {day} · {year}</div>
        <h3 className="date-title">{title}</h3>
        <div className="date-meta">
          {meta}
          {ev.genre && <span className="m-genre">{ev.genre}</span>}
        </div>
        {ev.description && <p className="date-desc">{ev.description}</p>}
        <div className="date-actions">
          <StatusPill status={ev.status} />
          {ev.ticketUrl ? (
            <a
              href={ev.ticketUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs tracking-wider uppercase text-dip-red hover:text-dip-cream underline underline-offset-4 transition-colors inline-flex items-center min-h-[44px]"
            >
              Tickets →
            </a>
          ) : (
            <span className="font-mono text-xs tracking-wider uppercase text-dip-text-muted">
              DM to attend
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Dates() {
  const { events: allEvents = [] } = useContent()
  const events = upcoming(allEvents)
  // Nothing upcoming → the section doesn't appear at all (no "announced soon").
  if (events.length === 0) return null

  return (
    <section id="dates" className="ed-section" aria-labelledby="dates-t">
      <div className="ed-wrap">
        <Reveal className="sec-head">
          <span className="sec-num" aria-hidden="true">03</span>
          <h2 className="sec-title" id="dates-t">Upcoming <i>dates</i></h2>
          <p className="sec-kicker label">Catch the set live across the Oslo circuit.</p>
        </Reveal>

        <RevealGroup stagger={0.06}>
          {events.map((ev, i) => (
            <RevealItem key={`${ev.date}-${ev.venue}-${i}`}>
              <DateRow ev={ev} first={i === 0} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
