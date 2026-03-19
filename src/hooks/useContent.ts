import { useEffect, useState } from 'react'

export interface Content {
  bio: string
  bio2: string
  stages: string[]
  genres: string[]
  contact: { email: string; phone: string }
  social: { instagram: string; soundcloud: string; tiktok: string }
}

export const DEFAULTS: Content = {
  bio: 'With over eight years behind the decks and a deep understanding of club dynamics, DJ DiP delivers prime-time, high-energy sets rooted in Hip-Hop/R&B, Afrobeat, Dancehall, and Amapiano — shaped into a seamless Urban Sound Fusion through intentional genre bridges, mature BPM control, and production-led transitions.',
  bio2: 'Peak-hour specialist. Event Architect. Concept Builder. Resident DJ at KlubN Oslo.',
  stages: ['KlubN — Resident', 'Gamba Beat Bar', "Kiki's House", 'Faksen Bar', 'Old School Vibe', 'Oslo Street Foods - Dopamine'],
  genres: ['HipHop & RnB', 'Afrobeats', 'Shatta', 'Amapiano', 'Dancehall'],
  contact: { email: '2djdip@gmail.com', phone: '+47 967 36 112' },
  social: { instagram: 'dj_dip', soundcloud: 'bukenya-davis', tiktok: 'dj_dip' },
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
        })
      })
      .catch(() => {})
  }, [])

  return content
}
