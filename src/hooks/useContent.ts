import { useEffect, useState } from 'react'

/* ------------------------------------------------------------------ *
 * Shared content interfaces
 *
 * These are the single source of truth for every editable section.
 * Public components import these (no local re-declaration) and the
 * admin UI builds its payload against the same shapes. The admin
 * server (admin-server/server.js) does NOT enforce a schema — it just
 * writes the posted JSON to data/content.json — so adding fields here
 * requires NO server change.
 * ------------------------------------------------------------------ */

export interface TracklistEntry {
  time: string
  title: string
}

export interface Mix {
  id: string
  title: string
  venue: string
  genreTags: string[]
  /** Optional — only shown when supplied (no fabricated specs). */
  duration?: string
  bpm?: string
  /** A set has EITHER a SoundCloud URL or a YouTube URL (YouTube takes priority). */
  soundcloudUrl?: string
  youtubeUrl?: string
  tracklist: TracklistEntry[]
}

export interface DjEvent {
  /** ISO date, e.g. '2026-06-14'. Used for sort + past-hiding. */
  date: string
  venue: string
  city: string
  /** Optional ticket / RSVP URL. Omit for free-entry / DM-only nights. */
  ticketUrl?: string
  /** Optional status label, e.g. 'Free entry' / 'Sold out'. */
  status?: string
  /* --- Optional rich display fields (also ingested via /admin-api/ingest/events) --- */
  /** Event/night name, shown as the row title. Falls back to `venue`. */
  title?: string
  /** Door/set time, e.g. '22:00–03:00'. */
  time?: string
  /** Genre line, e.g. 'Afrobeats · HipHop · Amapiano'. */
  genre?: string
  /** Price / entry note. */
  price?: string
  /** Short description line. */
  description?: string
  /** Poster image URL. */
  imageUrl?: string
  /** Street address. */
  address?: string
  /** Country. */
  country?: string
}

export interface Reel {
  id: string
  /** Self-hosted clip, e.g. '/reels/klubn-night.mp4'. */
  src: string
  /** Poster image (WebP/AVIF/jpg). */
  poster: string
  /** Accessible description of the clip. */
  caption: string
}

export interface ProofItem {
  /** Venue / promoter name — always present, used as text wordmark + alt. */
  name: string
  /** Optional logo path, e.g. '/logos/klubn.svg'. Falls back to the name. */
  logo?: string
}

export interface Quote {
  text: string
  attribution: string
}

export interface Genre {
  num: string
  name: string
  desc: string
}

export interface Highlight {
  venue: string
  event: string
  tags: string[]
  featured: boolean
}

export interface Content {
  bio: string
  bio2: string
  stages: string[]
  /** Chip list (Hero) — string[]. Distinct from the `genreCards` below. */
  genres: string[]
  contact: { email: string; phone: string }
  social: { instagram: string; soundcloud: string; tiktok: string }

  /* --- Rebuilt, fully-editable sections (all optional) --- */
  mixes?: Mix[]
  events?: DjEvent[]
  reels?: Reel[]
  proof?: ProofItem[]
  quote?: Quote | null
  epkAvailable?: boolean
  /** {num,name,desc} cards for the Genres section — new key to avoid clashing with `genres` chips. */
  genreCards?: Genre[]
  highlights?: Highlight[]
}

export const DEFAULTS: Content = {
  bio: 'With over eight years behind the decks and a deep understanding of club dynamics, DJ DiP delivers prime-time, high-energy sets rooted in Hip-Hop/R&B, Afrobeat, Dancehall, and Amapiano — shaped into a seamless Urban Sound Fusion through intentional genre bridges, mature BPM control, and production-led transitions.',
  bio2: 'Peak-hour specialist. Event Architect. Concept Builder. Resident DJ at KlubN Oslo.',
  // Real venue roster (verified from Instagram @_dj_dip, Jun 2026).
  stages: ['KlubN — Resident', 'Amaru Oslo', 'Gamla Beat Bar', 'Dattera til Hagen', 'Brød & Sirkus', 'Kulturhuset i Oslo'],
  genres: ['HipHop & RnB', 'Afrobeats', 'Amapiano', 'Shatta', 'Dancehall', 'Afro-House', 'Gqom', '2000s Throwback'],
  contact: { email: '2djdip@gmail.com', phone: '+47 967 36 112' },
  // IG handle is "_dj_dip" (leading underscore) — the bare "dj_dip" link 404s.
  social: { instagram: '_dj_dip', soundcloud: 'bukenya-davis', tiktok: '_dj_dip' },

  // Mixes: only the verified YouTube set (DJ DiP's klubn.no profile / KlubN
  // channel). One real recording — nothing more promised, nothing fabricated.
  mixes: [
    {
      id: 'oldschool-2000s-throwback',
      title: '2000s All-Hits Throwback — HipHop & RnB',
      venue: 'Old School Vibe · Brød & Sirkus',
      genreTags: ['HipHop & RnB', '2000s', 'Dancehall'],
      youtubeUrl: 'https://www.youtube.com/watch?v=yijEi-zr6Ws',
      tracklist: [],
    },
  ],
  // Events: only UPCOMING dates ship live (Social Sync ingest/events rule;
  // Dates.tsx auto-hides past). Seeded with the verified next public night.
  events: [
    {
      date: '2026-07-18',
      venue: 'Amaru Oslo',
      city: 'Oslo',
      ticketUrl: 'https://klubn.no',
      status: 'Early bird out now',
      title: 'Dopamine Series',
      time: '22:00–03:00',
      genre: 'Afrobeats · HipHop · Amapiano',
      description: "Oslo's biggest summer night — a curated DJ lineup with a surprise international headliner. Youngs Nede · ID 20.",
    },
  ],
  reels: [],
  // Real venue credits (verified from IG) — text wordmarks, no fabricated logos.
  proof: [
    { name: 'KlubN' },
    { name: 'Amaru Oslo' },
    { name: 'Dattera til Hagen' },
    { name: 'Brød & Sirkus' },
    { name: 'Kulturhuset i Oslo' },
    { name: 'Gamla Beat Bar' },
  ],
  quote: null,
  epkAvailable: false,

  // Seeded with the CURRENT hardcoded values so the site looks identical
  // until the artist edits them in admin.
  genreCards: [
    { num: '01', name: 'HipHop & RnB', desc: 'Urban pulse — the foundation of every set.' },
    { num: '02', name: 'Afrobeats', desc: 'Rhythms that move continents.' },
    { num: '03', name: 'Amapiano', desc: 'Log drums, late-night soul.' },
    { num: '04', name: 'Shatta', desc: 'High-energy Caribbean heat.' },
    { num: '05', name: 'Dancehall', desc: 'Heavy riddims, peak-hour bounce.' },
    { num: '06', name: 'Afro-House', desc: 'Deep, hypnotic, four-to-the-floor.' },
    { num: '07', name: 'Gqom', desc: 'Raw South-African low-end.' },
    { num: '08', name: '2000s Throwback', desc: 'Nostalgic singalong classics.' },
  ],
  // Residency / stages roster — venues verified from Instagram @_dj_dip (Jun 2026).
  highlights: [
    { venue: 'KlubN', event: 'Resident DJ · Event Architect · Concept Builder', tags: ['Urban Sound Fusion', 'Oslo'], featured: true },
    { venue: 'Amaru Oslo', event: 'Dopamine Series · Content Party', tags: ['Afrobeats', 'HipHop & RnB', 'Amapiano'], featured: false },
    { venue: 'Gamla Beat Bar', event: 'Backyard Sessions', tags: ['HipHop & RnB', 'Shatta', 'Afrobeats'], featured: false },
    { venue: 'Dattera til Hagen', event: '17. Mai Feiring', tags: ['HipHop & RnB', 'Afrobeats', 'Dancehall'], featured: false },
    { venue: 'Brød & Sirkus', event: 'Old School Vibe — Throwback Set', tags: ['HipHop & RnB', '2000s', 'Dancehall'], featured: false },
    { venue: 'Kulturhuset i Oslo', event: 'Musikkens Dag', tags: ['HipHop & RnB', 'Afrobeats', 'Singalong'], featured: false },
  ],
}

export function useContent(): Content {
  const [content, setContent] = useState<Content>(DEFAULTS)

  useEffect(() => {
    fetch('/admin-api/content')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (!d) return
        setContent({
          bio: d.bio || DEFAULTS.bio,
          bio2: d.bio2 || DEFAULTS.bio2,
          stages: d.stages?.length ? d.stages : DEFAULTS.stages,
          genres: d.genres?.length ? d.genres : DEFAULTS.genres,
          contact: {
            email: d.contact?.email || DEFAULTS.contact.email,
            phone: d.contact?.phone || DEFAULTS.contact.phone,
          },
          social: {
            instagram: d.social?.instagram || DEFAULTS.social.instagram,
            soundcloud: d.social?.soundcloud || DEFAULTS.social.soundcloud,
            tiktok: d.social?.tiktok || DEFAULTS.social.tiktok,
          },
          // New sections: use stored value when present (including a stored
          // empty array, which is a meaningful "cleared" state), else default.
          mixes: Array.isArray(d.mixes) ? d.mixes : DEFAULTS.mixes,
          events: Array.isArray(d.events) ? d.events : DEFAULTS.events,
          reels: Array.isArray(d.reels) ? d.reels : DEFAULTS.reels,
          proof: Array.isArray(d.proof) ? d.proof : DEFAULTS.proof,
          quote: d.quote === undefined ? DEFAULTS.quote : d.quote,
          epkAvailable: typeof d.epkAvailable === 'boolean' ? d.epkAvailable : DEFAULTS.epkAvailable,
          // genreCards/highlights fall back to the SEEDED defaults so the site
          // looks identical until they are edited (never blank).
          genreCards: d.genreCards?.length ? d.genreCards : DEFAULTS.genreCards,
          highlights: d.highlights?.length ? d.highlights : DEFAULTS.highlights,
        })
      })
      .catch(() => {})
  }, [])

  return content
}
