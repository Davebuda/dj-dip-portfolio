import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [galleryCount, setGalleryCount] = useState<number | null>(null)
  const token = sessionStorage.getItem('admin-token')

  useEffect(() => {
    fetch('/admin-api/gallery', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setGalleryCount(Array.isArray(d) ? d.length : 0))
      .catch(() => setGalleryCount(0))
  }, [token])

  const cards = [
    { label: 'Gallery Photos', value: galleryCount ?? '…', href: '/builder/gallery', action: 'Manage →' },
    { label: 'Bio & Content',  value: 'Edit',               href: '/builder/content', action: 'Open →' },
    { label: 'Live Site',      value: 'djdip.no',           href: '/',              action: 'View ↗', external: true },
  ]

  return (
    <div className="p-8 md:p-12">
      <p className="label mb-2">Overview</p>
      <h1 className="font-display text-5xl text-dip-cream mb-10">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {cards.map(c => (
          <a
            key={c.label}
            href={c.href}
            target={c.external ? '_blank' : undefined}
            rel={c.external ? 'noreferrer' : undefined}
            className="glass-card rounded-2xl p-6 hover:border-dip-red/30 transition-colors group"
          >
            <p className="label mb-3">{c.label}</p>
            <div
              className="font-display text-4xl mb-4"
              style={{ background: 'linear-gradient(135deg, #E63020, #D44040)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {c.value}
            </div>
            <p className="font-heading font-bold text-sm text-dip-muted group-hover:text-dip-cream transition-colors">
              {c.action}
            </p>
          </a>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6">
        <p className="label mb-4">Quick Guide</p>
        <ul className="space-y-3 font-body text-sm text-dip-cream/60">
          <li className="flex gap-3"><span className="text-dip-red">→</span> <strong className="text-dip-cream/80">Gallery:</strong> Upload photos that appear in the gallery section of the site.</li>
          <li className="flex gap-3"><span className="text-dip-red">→</span> <strong className="text-dip-cream/80">Content:</strong> Edit bio text, key stages, genres, contact info and social links.</li>
          <li className="flex gap-3"><span className="text-dip-red">→</span> <strong className="text-dip-cream/80">All changes</strong> take effect immediately — no redeploy needed.</li>
        </ul>
      </div>
    </div>
  )
}
