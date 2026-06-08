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
  duration: string
  bpm: string
  soundcloudUrl: string
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

export interface ArchiveItem {
  id: string
  title: string
  /** ISO date, e.g. '2025-11-22'. Used for date-desc sort. */
  date: string
  venue: string
  city: string
  /** Optional ticket / event URL. */
  ticketUrl?: string
  /** Local re-hosted image path (e.g. '/gallery/<file>'), never a raw IG URL. */
  imageUrl: string
  description?: string
  tags?: string[]
  /** Gate-② lifecycle: 'suggested' = pending (admin-only), 'published' = public. */
  reviewStatus: 'suggested' | 'published'
  sourcePostId: string
  sourcePlatform: string
  createdAt: string
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
  /** Past Shows / Archive items. Public renders only reviewStatus==='published'. */
  archive?: ArchiveItem[]
}

export const DEFAULTS: Content = {
  bio: 'With over eight years behind the decks and a deep understanding of club dynamics, DJ DiP delivers prime-time, high-energy sets rooted in Hip-Hop/R&B, Afrobeat, Dancehall, and Amapiano — shaped into a seamless Urban Sound Fusion through intentional genre bridges, mature BPM control, and production-led transitions.',
  bio2: 'Peak-hour specialist. Event Architect. Concept Builder. Resident DJ at KlubN Oslo.',
  stages: ['KlubN — Resident', 'Gamba Beat Bar', "Kiki's House", 'Faksen Bar', 'Old School Vibe', 'Oslo Street Foods - Dopamine'],
  genres: ['HipHop & RnB', 'Afrobeats', 'Shatta', 'Amapiano', 'Dancehall'],
  contact: { email: '2djdip@gmail.com', phone: '+47 967 36 112' },
  social: { instagram: 'dj_dip', soundcloud: 'bukenya-davis', tiktok: 'dj_dip' },

  // Honest-by-default: empty arrays render the truthful empty-states.
  mixes: [],
  events: [],
  reels: [],
  proof: [],
  quote: null,
  epkAvailable: false,
  archive: [],

  // Seeded with the CURRENT hardcoded values so the site looks identical
  // until the artist edits them in admin.
  genreCards: [
    { num: '01', name: 'HipHop & RnB', desc: 'Urban pulse — the foundation of every set.' },
    { num: '02', name: 'Afrobeats', desc: 'Rhythms that move continents.' },
    { num: '03', name: 'Shatta', desc: 'High-energy Caribbean dancehall.' },
    { num: '04', name: 'Amapiano', desc: 'Log drums, late-night soul.' },
  ],
  highlights: [
    { venue: 'KlubN', event: 'Resident DJ · Event Architect · Concept Builder', tags: ['Urban Sound Fusion', 'Oslo'], featured: true },
    { venue: 'Gamba Beat Bar', event: 'Content Party', tags: ['HipHop & RnB', 'Shatta', 'Afrobeats'], featured: false },
    { venue: "Kiki's House", event: 'Club Night', tags: ['HipHop & RnB', 'Dancehall', 'Afrobeats'], featured: false },
    { venue: 'Old School Vibe', event: 'Throwback Night', tags: ['HipHop & RnB', 'Dancehall', 'Afrobeats'], featured: false },
    { venue: 'Faksen Bar', event: 'Amapiano Scene', tags: ['Amapiano', 'Afro-House', 'Gqom'], featured: false },
    { venue: 'Faksen Bar', event: 'Content Party', tags: ['HipHop & RnB', 'Shatta', 'Afrobeats'], featured: false },
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
          // Stored empty array is a meaningful "no items" state, else default [].
          archive: Array.isArray(d.archive) ? d.archive : DEFAULTS.archive,
        })
      })
      .catch(() => {})
  }, [])

  return content
}
