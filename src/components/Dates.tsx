import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'
import { useContent, type DjEvent } from '../hooks/useContent'

/**
 * Upcoming Gigs / Dates (#dates) — "Marquee Bill" layout.
 *
 * An asymmetric 12-col magazine grid (md+) where visual WEIGHT encodes show
 * priority: the soonest upcoming show is a full-width HERO, remaining shows
 * fall into smaller offset blocks of varying span. Below md the grid reflows
 * to a single full-width column in source order (featured first).
 *
 * Auto-sorts ascending by date and AUTO-HIDES past events (compared to today),
 * so the section never reads stale.
 *
 * Honest by default: ships with NO fabricated dates. `useContent().events`
 * defaults to an empty array — until the artist supplies real dates (via the
 * content store / admin), this renders a truthful empty-state, never fake gigs.
 *
 * DEGRADATION (the data is sparse):
 *  - no imageUrl  → typographic-poster fallback (big title + DM-Mono date on a
 *                   dip-card / subtle dip-red gradient). Never a broken <img>.
 *  - no ticketUrl → "DM to attend" instead of the ticket pill.
 *  - 0 upcoming   → the honest "Dates announced soon" empty-state + IG CTA.
 *
 * CONTENT-STORE SWAP PATH: `useContent()` exposes `events?: DjEvent[]`. The
 * extra display fields used by this layout (title / time / genre / price /
 * description / imageUrl / address / country) are ingested by the admin server
 * (POST /admin-api/ingest/events) and modelled here as `BillEvent` — an
 * extension of the shared `DjEvent` type, so the shared type stays untouched.
 */

/**
 * The shared `DjEvent` (date, venue, city, ticketUrl?, status?) plus the
 * optional rich display fields the Marquee Bill renders. Kept local so the
 * canonical `DjEvent` in useContent.ts is not modified. All extras are optional
 * and individually degraded — sparse data still renders intentionally.
 */
type BillEvent = DjEvent & {
  title?: string
  time?: string
  genre?: string
  price?: string
  description?: string
  imageUrl?: string
  address?: string
  country?: string
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

/** Day + month (existing output preserved) plus year for the bill's date stamps. */
function formatDate(iso: string): { day: string; month: string; year: string } {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return { day: '--', month: '---', year: '----' }
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: MONTHS[d.getMonth()],
    year: String(d.getFullYear()),
  }
}

function upcoming(events: BillEvent[]): BillEvent[] {
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

function hasImg(ev: BillEvent): boolean {
  return typeof ev.imageUrl === 'string' && ev.imageUrl.trim() !== ''
}

/** Use the title when present, else fall back to the venue so a block is never empty. */
function titleOf(ev: BillEvent): string {
  return ev.title?.trim() || ev.venue
}

/* ------------------------------------------------------------------ *
 * Count-aware layout plan
 *
 * Drives md+ col/row spans from index + total count so the bill looks
 * composed at every size and never leaves dangling empty cells:
 *   1   → hero only (contained, no secondary blocks)
 *   2   → hero + one wide secondary (full width)
 *   3   → hero + two half-width blocks
 *   4   → hero + secondary(7) + two stacked tertiary(5)
 *   5+  → hero + secondary(7) + two tertiary(5) + wide bottom blocks
 * Each block carries its own `variant` (visual weight) + md grid-column span.
 * Below md every block is forced to a single full-width column via `col-span-1`.
 * ------------------------------------------------------------------ */

type Variant = 'hero' | 'secImg' | 'tertiary' | 'bottom'

interface BillSlot {
  ev: BillEvent
  variant: Variant
  /** Tailwind md+ column span class (mobile is always full-width). */
  colClass: string
}

function buildPlan(events: BillEvent[]): BillSlot[] {
  if (events.length === 0) return []

  const slots: BillSlot[] = [
    // [0] Hero — always full width.
    { ev: events[0], variant: 'hero', colClass: 'md:col-span-12' },
  ]
  const rest = events.slice(1)
  if (rest.length === 0) return slots

  // Special-case small counts so the row reads as intentional (no orphans).
  if (rest.length === 1) {
    // 2 total → one wide secondary spanning the full width.
    slots.push({ ev: rest[0], variant: 'secImg', colClass: 'md:col-span-12' })
    return slots
  }
  if (rest.length === 2) {
    // 3 total → two half-width blocks.
    slots.push({ ev: rest[0], variant: 'secImg', colClass: 'md:col-span-6' })
    slots.push({ ev: rest[1], variant: 'tertiary', colClass: 'md:col-span-6' })
    return slots
  }

  // 4+ total: the first row after the hero is an asymmetric 7/5 pair; every
  // block after that flows as 6/6 pairs, with a lone trailing block widening
  // to full width. This guarantees EVERY row sums to 12 — no orphaned/empty
  // cells at any event count (the 7/5/5 shape previously left a 7-col gap).
  slots.push({ ev: rest[0], variant: 'secImg', colClass: 'md:col-span-7' })
  slots.push({ ev: rest[1], variant: 'tertiary', colClass: 'md:col-span-5' })

  const tail = rest.slice(2)
  tail.forEach((ev, i) => {
    const isLastOdd = i === tail.length - 1 && tail.length % 2 === 1
    slots.push({
      ev,
      variant: 'bottom',
      colClass: isLastOdd ? 'md:col-span-12' : 'md:col-span-6',
    })
  })

  return slots
}

/* ------------------------------------------------------------------ *
 * EventBlock — the one card, four visual weights.
 * `hero` is the headline poster; `secImg` a mid-weight image/typo block;
 * `tertiary` a compact card; `bottom` a wide typographic block.
 * Image-absent + ticket-absent are handled per-variant.
 * ------------------------------------------------------------------ */

function TicketCta({ ev, size }: { ev: BillEvent; size: 'lg' | 'sm' | 'link' }) {
  const label = size === 'lg' ? 'Get tickets' : 'Tickets'
  if (!ev.ticketUrl) {
    if (size === 'lg') {
      return (
        <span className="inline-flex items-center justify-center font-heading font-bold uppercase tracking-wide text-xs text-dip-text-muted border border-dip-rose/30 rounded-full px-5 min-h-[44px]">
          DM to attend
        </span>
      )
    }
    return (
      <span className="font-mono text-xs tracking-wider uppercase text-dip-text-muted">
        DM to attend
      </span>
    )
  }
  if (size === 'lg') {
    return (
      <a
        href={ev.ticketUrl}
        target="_blank"
        rel="noreferrer"
        className="btn-brand text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-dip-red"
      >
        {label}
      </a>
    )
  }
  if (size === 'sm') {
    return (
      <a
        href={ev.ticketUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center font-heading font-bold text-xs tracking-wide uppercase text-dip-cream border border-dip-rose/30 hover:border-dip-red hover:text-dip-red rounded-full px-4 min-h-[36px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dip-red"
      >
        {label}
      </a>
    )
  }
  return (
    <a
      href={ev.ticketUrl}
      target="_blank"
      rel="noreferrer"
      className="font-mono text-xs tracking-wider uppercase text-dip-red hover:text-dip-cream underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dip-red"
    >
      {label} →
    </a>
  )
}

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null
  return (
    <span className="inline-block font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 border border-dip-rose/40 text-dip-rose bg-dip-rose/5 rounded-sm">
      {status}
    </span>
  )
}

function MetaLine({ ev }: { ev: BillEvent }) {
  return (
    <p className="font-mono text-dip-text-muted text-xs tracking-wider mb-1 truncate">
      {ev.venue} — {ev.city}
    </p>
  )
}

function EventBlock({ slot }: { slot: BillSlot }) {
  const { ev, variant } = slot
  const { day, month, year } = formatDate(ev.date)
  const img = hasImg(ev)
  const title = titleOf(ev)

  /* ---- HERO ---- */
  if (variant === 'hero') {
    return (
      <div className={`relative overflow-hidden rounded-sm min-h-[380px] md:min-h-[420px] ${img ? 'bg-dip-black' : 'bg-dip-card'}`}>
        {img ? (
          <>
            <img
              src={ev.imageUrl}
              alt={title}
              width={1200}
              height={800}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dip-black via-dip-black/55 to-dip-black/15" />
          </>
        ) : (
          // Typographic-poster fallback — big numeral + subtle dip-red gradient.
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-dip-red/10 to-transparent pointer-events-none" />
            <span
              aria-hidden="true"
              className="absolute top-1/2 -right-2 -translate-y-1/2 font-display font-bold leading-none text-dip-red/[0.06] select-none pointer-events-none"
              style={{ fontSize: '10rem' }}
            >
              {day}
            </span>
          </>
        )}

        <div className="relative z-10 flex h-full flex-col justify-end p-6">
          <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
            <div className="min-w-0 flex-1">
              {ev.status ? <div className="mb-2"><StatusBadge status={ev.status} /></div> : null}
              <MetaLine ev={ev} />
              <h3 className="font-display text-dip-cream leading-none tracking-tight mb-2 text-4xl md:text-5xl lg:text-6xl">
                {title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="font-mono text-dip-red leading-none text-5xl tracking-tight">{day}</span>
                <div className="leading-none">
                  <div className="font-mono text-dip-cream text-lg">{month}</div>
                  <div className="font-mono text-dip-text-muted text-xs tracking-widest">
                    {year}
                    {ev.time ? ` · ${ev.time}` : ''}
                  </div>
                </div>
                {ev.genre ? <span className="label text-dip-text-muted">{ev.genre}</span> : null}
                {ev.price ? <span className="font-mono text-dip-cream text-sm">{ev.price}</span> : null}
              </div>
              {ev.description ? (
                <p className="font-body font-light text-dip-text-muted text-sm leading-relaxed max-w-xl mb-4 md:mb-0">
                  {ev.description}
                </p>
              ) : null}
            </div>
            <div className="shrink-0">
              <TicketCta ev={ev} size="lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ---- SECONDARY (image or typo, mid-weight) ---- */
  if (variant === 'secImg') {
    return (
      <div className={`group relative overflow-hidden rounded-sm min-h-[220px] md:min-h-[260px] transition-shadow duration-300 hover:shadow-red-md ${img ? 'bg-dip-black' : 'bg-dip-card'}`}>
        {img ? (
          <>
            <img
              src={ev.imageUrl}
              alt={title}
              width={1200}
              height={800}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dip-black via-dip-black/30 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-dip-red/10 to-transparent pointer-events-none" />
            <span
              aria-hidden="true"
              className="absolute top-1/2 -right-2 -translate-y-1/2 font-display font-bold leading-none text-dip-red/[0.06] select-none pointer-events-none"
              style={{ fontSize: '7rem' }}
            >
              {day}
            </span>
          </>
        )}
        <div className="relative z-10 flex h-full flex-col justify-end p-6">
          <span className="block w-10 h-0.5 bg-dip-red mb-3" />
          <MetaLine ev={ev} />
          <h3 className="font-display text-dip-cream text-3xl md:text-4xl leading-none tracking-tight mb-2">
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="font-mono text-dip-red text-2xl leading-none">{day} {month}</span>
            {ev.time ? <span className="font-mono text-dip-text-muted text-xs">{ev.time}</span> : null}
            {ev.genre ? <span className="label text-dip-text-muted text-[11px]">{ev.genre}</span> : null}
            {ev.price ? <span className="font-mono text-dip-cream text-xs">{ev.price}</span> : null}
          </div>
          <div className="flex items-center gap-3">
            <TicketCta ev={ev} size="sm" />
            {ev.status ? <StatusBadge status={ev.status} /> : null}
          </div>
        </div>
      </div>
    )
  }

  /* ---- TERTIARY (compact card) ---- */
  if (variant === 'tertiary') {
    return (
      <div className="group relative overflow-hidden rounded-sm min-h-[120px] bg-dip-card transition-shadow duration-300 hover:shadow-red-md">
        <div className="absolute inset-0 bg-gradient-to-br from-dip-rose/[0.14] via-dip-red/[0.05] to-transparent pointer-events-none" />
        <div className="relative z-10 flex h-full flex-col justify-center p-5">
          <p className="font-mono text-dip-text-muted text-[10px] tracking-wider uppercase mb-1.5 truncate">
            {ev.venue} · {ev.city}
          </p>
          <h3 className="font-display text-dip-cream text-xl md:text-2xl leading-none tracking-tight mb-1">
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="font-mono text-dip-red font-medium text-xl leading-none">{day} {month}</span>
            {ev.time ? <span className="font-mono text-dip-text-muted text-[10px]">{ev.time}</span> : null}
            {ev.genre ? <span className="label text-dip-text-muted text-[10px]">{ev.genre}</span> : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <TicketCta ev={ev} size="link" />
            {ev.status ? <StatusBadge status={ev.status} /> : null}
          </div>
        </div>
      </div>
    )
  }

  /* ---- BOTTOM (wide typographic block) ---- */
  return (
    <div className="group relative overflow-hidden rounded-sm min-h-[160px] md:min-h-[180px] bg-dip-card transition-shadow duration-300 hover:shadow-red-md">
      <div className="absolute inset-0 bg-gradient-to-br from-dip-red/10 to-transparent pointer-events-none" />
      <span
        aria-hidden="true"
        className="absolute top-1/2 -right-2 -translate-y-1/2 font-display font-bold leading-none text-dip-red/[0.06] select-none pointer-events-none"
        style={{ fontSize: '6rem' }}
      >
        {day}
      </span>
      <div className="relative z-10 flex h-full flex-col justify-center p-6">
        <span className="block w-10 h-0.5 bg-dip-red mb-3" />
        <p className="font-mono text-dip-text-muted text-[10px] tracking-wider uppercase mb-1.5 truncate">
          {ev.venue} — {ev.city}
        </p>
        <h3 className="font-display text-dip-cream text-2xl md:text-3xl leading-none tracking-tight mb-2">
          {title}
        </h3>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="font-mono text-dip-red text-2xl leading-none tracking-tight">{day} {month}</span>
          <div className="leading-tight">
            <div className="font-mono text-dip-text-muted text-[10px] tracking-wider uppercase">
              {ev.time || ''}{ev.time && ev.genre ? ' · ' : ''}{ev.genre || ''}
            </div>
            {ev.price ? <div className="font-mono text-dip-cream text-[11px] mt-0.5">{ev.price}</div> : null}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TicketCta ev={ev} size="link" />
          {ev.status ? <StatusBadge status={ev.status} /> : null}
        </div>
      </div>
    </div>
  )
}

export default function Dates() {
  const { social, events: allEvents = [] } = useContent()
  const events = upcoming(allEvents as BillEvent[])
  const hasDates = events.length > 0
  const plan = buildPlan(events)

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
          <RevealGroup
            stagger={0.06}
            className="grid grid-cols-1 md:grid-cols-12 gap-1.5 auto-rows-auto"
          >
            {plan.map((slot, i) => (
              <RevealItem
                key={`${slot.ev.date}-${slot.ev.venue}-${i}`}
                className={`min-w-0 ${slot.colClass}`}
              >
                <EventBlock slot={slot} />
              </RevealItem>
            ))}
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
