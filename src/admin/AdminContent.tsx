import { useEffect, useRef, useState } from 'react'
import {
  DEFAULTS,
  type Content,
  type Mix,
  type TracklistEntry,
  type DjEvent,
  type Reel,
  type ProofItem,
  type Genre,
  type Highlight,
} from '../hooks/useContent'

/* ------------------------------------------------------------------ *
 * Admin · Content editor
 *
 * Edits the SAME `Content` shape consumed by useContent(). The admin server
 * writes the posted JSON verbatim to data/content.json with no schema, so the
 * Save handler simply POSTs the full Content object (existing fields + every
 * new section). No server change was required to add these fields.
 *
 * Local state mirrors `Content` but keeps the simple list fields (stages,
 * genres) as newline strings for the textarea UX, exactly as before.
 * ------------------------------------------------------------------ */

type ScalarForm = {
  bio: string
  bio2: string
  stages: string
  genres: string
  email: string
  phone: string
  instagram: string
  soundcloud: string
  tiktok: string
}

const SCALAR_DEFAULTS: ScalarForm = {
  bio: DEFAULTS.bio,
  bio2: DEFAULTS.bio2,
  stages: DEFAULTS.stages.join('\n'),
  genres: DEFAULTS.genres.join('\n'),
  email: DEFAULTS.contact.email,
  phone: DEFAULTS.contact.phone,
  instagram: DEFAULTS.social.instagram,
  soundcloud: DEFAULTS.social.soundcloud,
  tiktok: DEFAULTS.social.tiktok,
}

/** Shared input styling (matches the existing form). */
const INPUT_PILL =
  'w-full bg-white/[0.06] border border-white/10 rounded-full px-4 py-3 text-dip-cream font-body text-sm focus:outline-none focus:border-dip-red/60 transition-colors'
const INPUT_AREA =
  'w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-dip-cream font-body text-sm focus:outline-none focus:border-dip-red/60 transition-colors resize-none'
const SECTION = 'glass-card rounded-2xl p-6 space-y-5'
const SECTION_TITLE = 'font-heading font-bold text-dip-cream text-base tracking-wide'
const SUBTLE = 'font-body text-xs text-dip-muted/60'
const ADD_BTN =
  'inline-flex items-center gap-1 text-xs font-heading font-bold tracking-wide text-dip-rose border border-dip-rose/30 hover:border-dip-red hover:text-dip-red rounded-full px-4 py-2 transition-colors'
const REMOVE_BTN =
  'shrink-0 text-xs font-heading font-bold text-red-400/80 hover:text-red-300 border border-red-500/30 hover:border-red-400 rounded-full px-3 py-1.5 transition-colors'
const ROW = 'rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3'

/**
 * Upload a single file via the existing gallery multipart endpoint and return
 * the public URL. Reuses AdminGallery's exact flow (POST FormData field
 * `images`, response `{filename,url}[]`).
 */
async function uploadToGallery(file: File, token: string | null): Promise<string | null> {
  const fd = new FormData()
  fd.append('images', file)
  try {
    const res = await fetch('/admin-api/gallery', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    })
    if (!res.ok) return null
    const data: Array<{ filename: string; url: string }> = await res.json()
    return data[0]?.url ?? null
  } catch {
    return null
  }
}

/** Small labelled text input. */
function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="label mb-1.5 block">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className={INPUT_PILL}
      />
    </div>
  )
}

/** Upload control bound to a single URL string field. */
function UploadField({
  label,
  value,
  onChange,
  accept,
  token,
}: {
  label: string
  value: string
  onChange: (url: string) => void
  accept: string
  token: string | null
}) {
  const ref = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    const url = await uploadToGallery(file, token)
    setBusy(false)
    if (url) onChange(url)
    if (ref.current) ref.current.value = ''
  }

  return (
    <div>
      <label className="label mb-1.5 block">{label}</label>
      <div className="flex items-center gap-3">
        <input
          value={value}
          placeholder="URL or upload →"
          onChange={e => onChange(e.target.value)}
          className={INPUT_PILL}
        />
        <input ref={ref} type="file" accept={accept} className="hidden" onChange={pick} />
        <button type="button" onClick={() => ref.current?.click()} className={ADD_BTN}>
          {busy ? '…' : 'Upload'}
        </button>
      </div>
    </div>
  )
}

export default function AdminContent() {
  const token = sessionStorage.getItem('admin-token')

  const [scalars, setScalars] = useState<ScalarForm>(SCALAR_DEFAULTS)
  const [mixes, setMixes] = useState<Mix[]>(DEFAULTS.mixes ?? [])
  const [events, setEvents] = useState<DjEvent[]>(DEFAULTS.events ?? [])
  const [reels, setReels] = useState<Reel[]>(DEFAULTS.reels ?? [])
  const [proof, setProof] = useState<ProofItem[]>(DEFAULTS.proof ?? [])
  const [quote, setQuote] = useState<{ text: string; attribution: string }>({ text: '', attribution: '' })
  const [epkAvailable, setEpkAvailable] = useState<boolean>(DEFAULTS.epkAvailable ?? false)
  const [genreCards, setGenreCards] = useState<Genre[]>(DEFAULTS.genreCards ?? [])
  const [highlights, setHighlights] = useState<Highlight[]>(DEFAULTS.highlights ?? [])

  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/admin-api/content')
      .then(r => (r.ok ? r.json() : null))
      .then((d: Partial<Content> | null) => {
        if (!d) return
        setScalars({
          bio: d.bio ?? SCALAR_DEFAULTS.bio,
          bio2: d.bio2 ?? SCALAR_DEFAULTS.bio2,
          stages: (d.stages ?? DEFAULTS.stages).join('\n'),
          genres: (d.genres ?? DEFAULTS.genres).join('\n'),
          email: d.contact?.email ?? SCALAR_DEFAULTS.email,
          phone: d.contact?.phone ?? SCALAR_DEFAULTS.phone,
          instagram: d.social?.instagram ?? SCALAR_DEFAULTS.instagram,
          soundcloud: d.social?.soundcloud ?? SCALAR_DEFAULTS.soundcloud,
          tiktok: d.social?.tiktok ?? SCALAR_DEFAULTS.tiktok,
        })
        if (Array.isArray(d.mixes)) setMixes(d.mixes)
        if (Array.isArray(d.events)) setEvents(d.events)
        if (Array.isArray(d.reels)) setReels(d.reels)
        if (Array.isArray(d.proof)) setProof(d.proof)
        if (d.quote && typeof d.quote === 'object') setQuote({ text: d.quote.text ?? '', attribution: d.quote.attribution ?? '' })
        if (typeof d.epkAvailable === 'boolean') setEpkAvailable(d.epkAvailable)
        // Seeded sections: only override defaults when a stored, non-empty value exists.
        if (d.genreCards?.length) setGenreCards(d.genreCards)
        if (d.highlights?.length) setHighlights(d.highlights)
      })
      .catch(() => {})
  }, [])

  function dirty() {
    setSaved(false)
  }

  async function save() {
    setSaving(true)
    const trimmedQuote = quote.text.trim()
    const payload: Content = {
      bio: scalars.bio,
      bio2: scalars.bio2,
      stages: scalars.stages.split('\n').map(s => s.trim()).filter(Boolean),
      genres: scalars.genres.split('\n').map(s => s.trim()).filter(Boolean),
      contact: { email: scalars.email, phone: scalars.phone },
      social: { instagram: scalars.instagram, soundcloud: scalars.soundcloud, tiktok: scalars.tiktok },
      mixes,
      events,
      reels,
      proof,
      quote: trimmedQuote ? { text: trimmedQuote, attribution: quote.attribution.trim() } : null,
      epkAvailable,
      genreCards,
      highlights,
    }
    const res = await fetch('/admin-api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    setSaved(res.ok)
  }

  /* ---- typed array helpers ---- */
  function patch<T>(list: T[], i: number, next: Partial<T>): T[] {
    return list.map((item, idx) => (idx === i ? { ...item, ...next } : item))
  }
  function removeAt<T>(list: T[], i: number): T[] {
    return list.filter((_, idx) => idx !== i)
  }

  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <p className="label mb-2">Edit</p>
      <h1 className="font-display text-5xl text-dip-cream mb-10">Content</h1>

      <div className="space-y-10">
        {/* Bio */}
        <section className={SECTION}>
          <p className={SECTION_TITLE}>Biography</p>
          <div>
            <label className="label mb-2 block">Main bio paragraph</label>
            <textarea value={scalars.bio} rows={4} className={INPUT_AREA}
              onChange={e => { setScalars(f => ({ ...f, bio: e.target.value })); dirty() }} />
          </div>
          <div>
            <label className="label mb-2 block">Tagline (smaller text)</label>
            <textarea value={scalars.bio2} rows={2} className={INPUT_AREA}
              onChange={e => { setScalars(f => ({ ...f, bio2: e.target.value })); dirty() }} />
          </div>
        </section>

        {/* Lists */}
        <section className={SECTION}>
          <p className={SECTION_TITLE}>Lists</p>
          <div>
            <label className="label mb-2 block">Key Stages (one per line)</label>
            <textarea value={scalars.stages} rows={6} className={INPUT_AREA}
              onChange={e => { setScalars(f => ({ ...f, stages: e.target.value })); dirty() }} />
          </div>
          <div>
            <label className="label mb-2 block">Genre chips (one per line)</label>
            <textarea value={scalars.genres} rows={5} className={INPUT_AREA}
              onChange={e => { setScalars(f => ({ ...f, genres: e.target.value })); dirty() }} />
          </div>
        </section>

        {/* Contact */}
        <section className={SECTION}>
          <p className={SECTION_TITLE}>Contact</p>
          <TextInput label="Email" value={scalars.email} onChange={v => { setScalars(f => ({ ...f, email: v })); dirty() }} />
          <TextInput label="Phone" value={scalars.phone} onChange={v => { setScalars(f => ({ ...f, phone: v })); dirty() }} />
        </section>

        {/* Social */}
        <section className={SECTION}>
          <p className={SECTION_TITLE}>Social Handles</p>
          <TextInput label="Instagram (without @)" value={scalars.instagram} onChange={v => { setScalars(f => ({ ...f, instagram: v })); dirty() }} />
          <TextInput label="SoundCloud username" value={scalars.soundcloud} onChange={v => { setScalars(f => ({ ...f, soundcloud: v })); dirty() }} />
          <TextInput label="TikTok (without @)" value={scalars.tiktok} onChange={v => { setScalars(f => ({ ...f, tiktok: v })); dirty() }} />
        </section>

        {/* Mixes */}
        <section className={SECTION}>
          <div className="flex items-center justify-between">
            <p className={SECTION_TITLE}>Mixes</p>
            <button type="button" className={ADD_BTN}
              onClick={() => { setMixes(m => [...m, { id: `mix-${Date.now()}`, title: '', venue: '', bpm: '', duration: '', soundcloudUrl: '', genreTags: [], tracklist: [] }]); dirty() }}>
              + Add mix
            </button>
          </div>
          <p className={SUBTLE}>Empty list shows the honest “Sets dropping soon” state on the site.</p>
          {mixes.length === 0 && <p className={SUBTLE}>No mixes yet.</p>}
          {mixes.map((mix, i) => (
            <div key={mix.id} className={ROW}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-dip-red/70">Mix {String(i + 1).padStart(2, '0')}</span>
                <button type="button" className={REMOVE_BTN} onClick={() => { setMixes(m => removeAt(m, i)); dirty() }}>Remove</button>
              </div>
              <TextInput label="Title" value={mix.title} onChange={v => { setMixes(m => patch(m, i, { title: v })); dirty() }} />
              <TextInput label="Venue" value={mix.venue} onChange={v => { setMixes(m => patch(m, i, { venue: v })); dirty() }} />
              <div className="grid grid-cols-2 gap-3">
                <TextInput label="BPM" value={mix.bpm} onChange={v => { setMixes(m => patch(m, i, { bpm: v })); dirty() }} />
                <TextInput label="Duration" value={mix.duration} placeholder="e.g. 62:14" onChange={v => { setMixes(m => patch(m, i, { duration: v })); dirty() }} />
              </div>
              <TextInput label="SoundCloud URL" value={mix.soundcloudUrl} onChange={v => { setMixes(m => patch(m, i, { soundcloudUrl: v })); dirty() }} />
              <div>
                <label className="label mb-1.5 block">Genre tags (one per line)</label>
                <textarea value={mix.genreTags.join('\n')} rows={3} className={INPUT_AREA}
                  onChange={e => { setMixes(m => patch(m, i, { genreTags: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })); dirty() }} />
              </div>
              {/* Tracklist sub-editor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="label">Tracklist</span>
                  <button type="button" className={ADD_BTN}
                    onClick={() => { setMixes(m => patch(m, i, { tracklist: [...mix.tracklist, { time: '', title: '' }] })); dirty() }}>
                    + Track
                  </button>
                </div>
                {mix.tracklist.map((t: TracklistEntry, ti) => (
                  <div key={ti} className="flex items-center gap-2">
                    <input value={t.time} placeholder="0:00"
                      onChange={e => { setMixes(m => patch(m, i, { tracklist: patch(mix.tracklist, ti, { time: e.target.value }) })); dirty() }}
                      className={`${INPUT_PILL} w-24 shrink-0`} />
                    <input value={t.title} placeholder="Track title"
                      onChange={e => { setMixes(m => patch(m, i, { tracklist: patch(mix.tracklist, ti, { title: e.target.value }) })); dirty() }}
                      className={INPUT_PILL} />
                    <button type="button" className={REMOVE_BTN}
                      onClick={() => { setMixes(m => patch(m, i, { tracklist: removeAt(mix.tracklist, ti) })); dirty() }}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Dates */}
        <section className={SECTION}>
          <div className="flex items-center justify-between">
            <p className={SECTION_TITLE}>Dates</p>
            <button type="button" className={ADD_BTN}
              onClick={() => { setEvents(ev => [...ev, { date: '', venue: '', city: '', ticketUrl: '', status: '' }]); dirty() }}>
              + Add date
            </button>
          </div>
          <p className={SUBTLE}>Past dates auto-hide on the site. Empty shows “Dates announced soon”.</p>
          {events.length === 0 && <p className={SUBTLE}>No dates yet.</p>}
          {events.map((ev, i) => (
            <div key={i} className={ROW}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-dip-red/70">Date {String(i + 1).padStart(2, '0')}</span>
                <button type="button" className={REMOVE_BTN} onClick={() => { setEvents(list => removeAt(list, i)); dirty() }}>Remove</button>
              </div>
              <TextInput label="Date" type="date" value={ev.date} onChange={v => { setEvents(list => patch(list, i, { date: v })); dirty() }} />
              <TextInput label="Venue" value={ev.venue} onChange={v => { setEvents(list => patch(list, i, { venue: v })); dirty() }} />
              <TextInput label="City" value={ev.city} onChange={v => { setEvents(list => patch(list, i, { city: v })); dirty() }} />
              <TextInput label="Ticket URL (optional)" value={ev.ticketUrl ?? ''} onChange={v => { setEvents(list => patch(list, i, { ticketUrl: v })); dirty() }} />
              <TextInput label="Status (optional)" value={ev.status ?? ''} placeholder="Free entry · Sold out" onChange={v => { setEvents(list => patch(list, i, { status: v })); dirty() }} />
            </div>
          ))}
        </section>

        {/* Reels */}
        <section className={SECTION}>
          <div className="flex items-center justify-between">
            <p className={SECTION_TITLE}>Reels</p>
            <button type="button" className={ADD_BTN}
              onClick={() => { setReels(r => [...r, { id: `reel-${Date.now()}`, src: '', poster: '', caption: '' }]); dirty() }}>
              + Add reel
            </button>
          </div>
          <p className={SUBTLE}>Upload the clip + poster via the buttons (reuses the gallery upload). Empty shows “Clips coming soon”.</p>
          {reels.length === 0 && <p className={SUBTLE}>No reels yet.</p>}
          {reels.map((reel, i) => (
            <div key={reel.id} className={ROW}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-dip-red/70">Reel {String(i + 1).padStart(2, '0')}</span>
                <button type="button" className={REMOVE_BTN} onClick={() => { setReels(r => removeAt(r, i)); dirty() }}>Remove</button>
              </div>
              <TextInput label="Caption" value={reel.caption} onChange={v => { setReels(r => patch(r, i, { caption: v })); dirty() }} />
              <UploadField label="Clip (mp4/webm)" accept="video/*" token={token} value={reel.src}
                onChange={url => { setReels(r => patch(r, i, { src: url })); dirty() }} />
              <UploadField label="Poster image" accept="image/*" token={token} value={reel.poster}
                onChange={url => { setReels(r => patch(r, i, { poster: url })); dirty() }} />
            </div>
          ))}
        </section>

        {/* Social proof */}
        <section className={SECTION}>
          <div className="flex items-center justify-between">
            <p className={SECTION_TITLE}>Social Proof</p>
            <button type="button" className={ADD_BTN}
              onClick={() => { setProof(p => [...p, { name: '', logo: '' }]); dirty() }}>
              + Add venue
            </button>
          </div>
          <p className={SUBTLE}>Names render as wordmarks; logos are optional (upload). Empty shows the quiet placeholder.</p>
          {proof.length === 0 && <p className={SUBTLE}>No venues yet.</p>}
          {proof.map((item, i) => (
            <div key={i} className={ROW}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-dip-red/70">Venue {String(i + 1).padStart(2, '0')}</span>
                <button type="button" className={REMOVE_BTN} onClick={() => { setProof(p => removeAt(p, i)); dirty() }}>Remove</button>
              </div>
              <TextInput label="Name" value={item.name} onChange={v => { setProof(p => patch(p, i, { name: v })); dirty() }} />
              <UploadField label="Logo (optional)" accept="image/*" token={token} value={item.logo ?? ''}
                onChange={url => { setProof(p => patch(p, i, { logo: url })); dirty() }} />
            </div>
          ))}
          <div className="pt-2 border-t border-white/10 space-y-3">
            <p className="label">Pull-quote (optional, at most one)</p>
            <div>
              <label className="label mb-2 block">Quote text</label>
              <textarea value={quote.text} rows={3} className={INPUT_AREA}
                onChange={e => { setQuote(q => ({ ...q, text: e.target.value })); dirty() }} />
            </div>
            <TextInput label="Attribution" value={quote.attribution} placeholder="Name, Venue" onChange={v => { setQuote(q => ({ ...q, attribution: v })); dirty() }} />
            <p className={SUBTLE}>Leave the text empty to hide the quote entirely.</p>
          </div>
        </section>

        {/* EPK */}
        <section className={SECTION}>
          <p className={SECTION_TITLE}>Press Kit (EPK)</p>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={epkAvailable}
              onChange={e => { setEpkAvailable(e.target.checked); dirty() }}
              className="w-5 h-5 accent-dip-red" />
            <span className="font-body text-sm text-dip-cream">EPK available for download</span>
          </label>
          <p className={SUBTLE}>
            When enabled, the booking section links to <code>/epk/dj-dip-epk.pdf</code>. Place the PDF at
            <code> public/epk/dj-dip-epk.pdf</code> (or upload it via the Gallery and adjust the path).
          </p>
        </section>

        {/* Genre cards */}
        <section className={SECTION}>
          <div className="flex items-center justify-between">
            <p className={SECTION_TITLE}>Genre Cards</p>
            <button type="button" className={ADD_BTN}
              onClick={() => { setGenreCards(g => [...g, { num: String(g.length + 1).padStart(2, '0'), name: '', desc: '' }]); dirty() }}>
              + Add card
            </button>
          </div>
          <p className={SUBTLE}>The “The Sound · GENRES” band. Seeded with the current four.</p>
          {genreCards.map((g, i) => (
            <div key={i} className={ROW}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-dip-red/70">Card {String(i + 1).padStart(2, '0')}</span>
                <button type="button" className={REMOVE_BTN} onClick={() => { setGenreCards(list => removeAt(list, i)); dirty() }}>Remove</button>
              </div>
              <div className="grid grid-cols-[5rem_1fr] gap-3">
                <TextInput label="No." value={g.num} onChange={v => { setGenreCards(list => patch(list, i, { num: v })); dirty() }} />
                <TextInput label="Name" value={g.name} onChange={v => { setGenreCards(list => patch(list, i, { name: v })); dirty() }} />
              </div>
              <div>
                <label className="label mb-2 block">Description</label>
                <textarea value={g.desc} rows={2} className={INPUT_AREA}
                  onChange={e => { setGenreCards(list => patch(list, i, { desc: e.target.value })); dirty() }} />
              </div>
            </div>
          ))}
        </section>

        {/* Residencies / Highlights */}
        <section className={SECTION}>
          <div className="flex items-center justify-between">
            <p className={SECTION_TITLE}>Residencies (Stages)</p>
            <button type="button" className={ADD_BTN}
              onClick={() => { setHighlights(h => [...h, { venue: '', event: '', tags: [], featured: false }]); dirty() }}>
              + Add row
            </button>
          </div>
          <p className={SUBTLE}>The “STAGES” list. Seeded with the current venues.</p>
          {highlights.map((h, i) => (
            <div key={i} className={ROW}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-dip-red/70">Row {String(i + 1).padStart(2, '0')}</span>
                <button type="button" className={REMOVE_BTN} onClick={() => { setHighlights(list => removeAt(list, i)); dirty() }}>Remove</button>
              </div>
              <TextInput label="Venue" value={h.venue} onChange={v => { setHighlights(list => patch(list, i, { venue: v })); dirty() }} />
              <TextInput label="Event / role" value={h.event} onChange={v => { setHighlights(list => patch(list, i, { event: v })); dirty() }} />
              <div>
                <label className="label mb-1.5 block">Tags (one per line)</label>
                <textarea value={h.tags.join('\n')} rows={3} className={INPUT_AREA}
                  onChange={e => { setHighlights(list => patch(list, i, { tags: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })); dirty() }} />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={h.featured}
                  onChange={e => { setHighlights(list => patch(list, i, { featured: e.target.checked })); dirty() }}
                  className="w-5 h-5 accent-dip-red" />
                <span className="font-body text-sm text-dip-cream">Featured (Resident badge)</span>
              </label>
            </div>
          ))}
        </section>

        <div className="flex items-center gap-4 pb-12">
          <button onClick={save} disabled={saving} className="btn-brand text-sm px-10">
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          {saved && <span className="font-body text-sm text-green-400">Saved ✓</span>}
        </div>
      </div>
    </div>
  )
}
