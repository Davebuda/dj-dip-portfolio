import { useEffect, useRef, useState } from 'react'

interface GalleryItem { filename: string; url: string }

function isVideo(filename: string) {
  return /\.(mp4|mov|webm|ogg)$/i.test(filename)
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [msg, setMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const token = sessionStorage.getItem('admin-token')

  async function load() {
    const res = await fetch('/admin-api/gallery', { headers: { Authorization: `Bearer ${token}` } })
    if (res.ok) setImages(await res.json())
  }

  useEffect(() => { load() }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files?.length) return
    setUploading(true)
    setMsg('')
    const fd = new FormData()
    Array.from(files).forEach(f => fd.append('images', f))
    try {
      const res = await fetch('/admin-api/gallery', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      })
      if (res.ok) { await load(); setMsg(`${files.length} photo(s) uploaded.`) }
      else setMsg('Upload failed.')
    } catch { setMsg('Upload error.') }
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  async function handleDelete(filename: string) {
    if (!confirm('Delete this photo?')) return
    setDeleting(filename)
    await fetch(`/admin-api/gallery/${filename}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    await load()
    setDeleting(null)
  }

  return (
    <div className="p-8 md:p-12">
      <p className="label mb-2">Media</p>
      <h1 className="font-display text-5xl text-dip-cream mb-8">Gallery</h1>

      {/* Upload zone */}
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-dip-red/30 hover:border-dip-red/60 rounded-2xl p-12 text-center cursor-pointer transition-colors mb-8 group"
      >
        <input ref={inputRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleUpload} />
        <div className="text-4xl mb-3 text-dip-red/40 group-hover:text-dip-red/70 transition-colors">↑</div>
        <p className="font-heading font-bold text-dip-cream/60 group-hover:text-dip-cream transition-colors">
          {uploading ? 'Uploading…' : 'Click to upload photos'}
        </p>
        <p className="font-body text-sm text-dip-muted/40 mt-1">JPG, PNG, WebP, MP4, MOV, WebM · max 500 MB each</p>
      </div>

      {msg && <p className="text-dip-rose font-body text-sm mb-6">{msg}</p>}

      {/* Grid */}
      {images.length === 0 ? (
        <p className="font-body text-dip-muted text-center py-16">No photos yet. Upload some above.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map(img => (
            <div key={img.filename} className="group relative aspect-square rounded-xl overflow-hidden bg-dip-card">
              {isVideo(img.filename) ? (
                <video
                  src={img.url}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  src={img.url}
                  alt={img.filename}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              {isVideo(img.filename) && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-white text-sm ml-0.5">▶</span>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <button
                  onClick={() => handleDelete(img.filename)}
                  disabled={deleting === img.filename}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-500 text-white text-xs font-heading font-bold px-3 py-1.5 rounded-full"
                >
                  {deleting === img.filename ? '…' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="font-body text-sm text-dip-muted/40 mt-6">{images.length} photo{images.length !== 1 ? 's' : ''} in gallery</p>
    </div>
  )
}
