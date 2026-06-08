import { useEffect, useState } from 'react'
import type { ArchiveItem } from '../hooks/useContent'

/**
 * Admin · Past Shows approval queue (Gate ②)
 *
 * Lists ONLY archive items with reviewStatus === 'suggested' (pending ingest
 * drafts). Approve flips them to 'published' (then they render publicly);
 * Decline removes them entirely. Both actions hit the bearer-auth'd server
 * routes and refresh the list — exactly mirroring AdminGallery's token flow.
 */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export default function AdminArchive() {
  const [items, setItems] = useState<ArchiveItem[]>([])
  const [loading, setLoading] = useState(true)
  const [acting, setActing] = useState<string | null>(null)
  const [msg, setMsg] = useState('')
  const token = sessionStorage.getItem('admin-token')

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/admin-api/content')
      if (res.ok) {
        const data: { archive?: ArchiveItem[] } = await res.json()
        const archive = Array.isArray(data.archive) ? data.archive : []
        setItems(archive.filter(i => i.reviewStatus === 'suggested'))
      }
    } catch {
      setMsg('Could not load suggestions.')
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function approve(id: string) {
    setActing(id)
    setMsg('')
    try {
      const res = await fetch(`/admin-api/archive/${id}/approve`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) { await load(); setMsg('Show published.') }
      else setMsg('Approve failed.')
    } catch { setMsg('Approve error.') }
    setActing(null)
  }

  async function decline(id: string) {
    if (!confirm('Decline and delete this suggestion?')) return
    setActing(id)
    setMsg('')
    try {
      const res = await fetch(`/admin-api/archive/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) { await load(); setMsg('Suggestion removed.') }
      else setMsg('Decline failed.')
    } catch { setMsg('Decline error.') }
    setActing(null)
  }

  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <p className="label mb-2">Moderation</p>
      <h1 className="font-display text-5xl text-dip-cream mb-8">Archive</h1>
      <p className="font-body text-sm text-dip-muted/60 mb-8">
        Pending past-show suggestions. Approve to publish them on the site, or decline to remove them.
      </p>

      {msg && <p className="text-dip-rose font-body text-sm mb-6">{msg}</p>}

      {loading ? (
        <p className="font-body text-dip-muted text-center py-16">Loading…</p>
      ) : items.length === 0 ? (
        <p className="font-body text-dip-muted text-center py-16">No pending suggestions.</p>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-dip-card flex items-center justify-center">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-dip-muted/40 text-xs font-body">No image</span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-heading font-bold text-base text-dip-cream truncate">
                  {item.title}
                </p>
                <p className="font-body text-sm text-dip-muted truncate">
                  {formatDate(item.date)}
                  {item.venue ? ` · ${item.venue}` : ''}
                  {item.city ? ` · ${item.city}` : ''}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => approve(item.id)}
                  disabled={acting === item.id}
                  className="font-heading font-bold text-xs tracking-wide text-green-300 border border-green-500/40 hover:border-green-400 hover:text-green-200 rounded-full px-4 py-2 transition-colors disabled:opacity-40"
                >
                  {acting === item.id ? '…' : 'Approve'}
                </button>
                <button
                  type="button"
                  onClick={() => decline(item.id)}
                  disabled={acting === item.id}
                  className="font-heading font-bold text-xs tracking-wide text-red-400/80 hover:text-red-300 border border-red-500/30 hover:border-red-400 rounded-full px-4 py-2 transition-colors disabled:opacity-40"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="font-body text-sm text-dip-muted/40 mt-6">
        {items.length} pending suggestion{items.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
