import { useEffect, useState } from 'react'

const DEFAULTS = {
  bio: 'With over eight years behind the decks and a deep understanding of club dynamics, DJ DiP delivers prime-time, high-energy sets rooted in Hip-Hop/R&B, Afrobeat, Dancehall, and Amapiano — shaped into a seamless Urban Sound Fusion through intentional genre bridges, mature BPM control, and production-led transitions.',
  bio2: 'Peak-hour specialist. Event Architect. Concept Builder. Resident DJ at KlubN Oslo.',
  stages: 'KlubN — Resident\nGamba Beat Bar\nKiki\'s House\nFaksen Bar\nOld School Vibe\nOslo Street Foods - Dopamine',
  genres: 'HipHop & RnB\nAfrobeats\nShatta\nAmapiano\nDancehall',
  email: '2djdip@gmail.com',
  phone: '+47 967 36 112',
  instagram: 'dj_dip',
  soundcloud: 'bukenya-davis',
  tiktok: 'dj_dip',
}

type ContentState = typeof DEFAULTS

export default function AdminContent() {
  const [form, setForm] = useState<ContentState>(DEFAULTS)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const token = sessionStorage.getItem('admin-token')

  useEffect(() => {
    fetch('/admin-api/content')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d) setForm({
          bio: d.bio ?? DEFAULTS.bio,
          bio2: d.bio2 ?? DEFAULTS.bio2,
          stages: (d.stages ?? []).join('\n'),
          genres: (d.genres ?? []).join('\n'),
          email: d.contact?.email ?? DEFAULTS.email,
          phone: d.contact?.phone ?? DEFAULTS.phone,
          instagram: d.social?.instagram ?? DEFAULTS.instagram,
          soundcloud: d.social?.soundcloud ?? DEFAULTS.soundcloud,
          tiktok: d.social?.tiktok ?? DEFAULTS.tiktok,
        })
      })
      .catch(() => {})
  }, [])

  function set(key: keyof ContentState, val: string) {
    setForm(f => ({ ...f, [key]: val }))
    setSaved(false)
  }

  async function save() {
    setSaving(true)
    const payload = {
      bio: form.bio,
      bio2: form.bio2,
      stages: form.stages.split('\n').map(s => s.trim()).filter(Boolean),
      genres: form.genres.split('\n').map(s => s.trim()).filter(Boolean),
      contact: { email: form.email, phone: form.phone },
      social: { instagram: form.instagram, soundcloud: form.soundcloud, tiktok: form.tiktok },
    }
    const res = await fetch('/admin-api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    setSaved(res.ok)
  }

  const Field = ({ label, k, textarea, rows = 3 }: { label: string; k: keyof ContentState; textarea?: boolean; rows?: number }) => (
    <div>
      <label className="label mb-2 block">{label}</label>
      {textarea ? (
        <textarea
          value={form[k]}
          onChange={e => set(k, e.target.value)}
          rows={rows}
          className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-dip-cream font-body text-sm focus:outline-none focus:border-dip-red/60 transition-colors resize-none"
        />
      ) : (
        <input
          value={form[k]}
          onChange={e => set(k, e.target.value)}
          className="w-full bg-white/[0.06] border border-white/10 rounded-full px-4 py-3 text-dip-cream font-body text-sm focus:outline-none focus:border-dip-red/60 transition-colors"
        />
      )}
    </div>
  )

  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <p className="label mb-2">Edit</p>
      <h1 className="font-display text-5xl text-dip-cream mb-10">Content</h1>

      <div className="space-y-10">
        {/* Bio */}
        <section className="glass-card rounded-2xl p-6 space-y-5">
          <p className="font-heading font-bold text-dip-cream text-base tracking-wide">Biography</p>
          <Field label="Main bio paragraph" k="bio" textarea rows={4} />
          <Field label="Tagline (smaller text)" k="bio2" textarea rows={2} />
        </section>

        {/* Lists */}
        <section className="glass-card rounded-2xl p-6 space-y-5">
          <p className="font-heading font-bold text-dip-cream text-base tracking-wide">Lists</p>
          <Field label="Key Stages (one per line)" k="stages" textarea rows={6} />
          <Field label="Genres (one per line)" k="genres" textarea rows={5} />
        </section>

        {/* Contact */}
        <section className="glass-card rounded-2xl p-6 space-y-5">
          <p className="font-heading font-bold text-dip-cream text-base tracking-wide">Contact</p>
          <Field label="Email" k="email" />
          <Field label="Phone" k="phone" />
        </section>

        {/* Social */}
        <section className="glass-card rounded-2xl p-6 space-y-5">
          <p className="font-heading font-bold text-dip-cream text-base tracking-wide">Social Handles</p>
          <Field label="Instagram (without @)" k="instagram" />
          <Field label="SoundCloud username" k="soundcloud" />
          <Field label="TikTok (without @)" k="tiktok" />
        </section>

        <div className="flex items-center gap-4">
          <button onClick={save} disabled={saving} className="btn-brand text-sm px-10">
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          {saved && <span className="font-body text-sm text-green-400">Saved ✓</span>}
        </div>
      </div>
    </div>
  )
}
