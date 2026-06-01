import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface GalleryItem { filename: string; url: string }

function isVideo(filename: string) {
  return /\.(mp4|mov|webm|ogg)$/i.test(filename)
}

/**
 * Static fallback sourced from public/images/gallery/*.
 * Guarantees the gallery section ALWAYS renders real content even when
 * /admin-api/gallery is empty, down, or unreachable (fixes the blank-gallery
 * + blank-section defect — this section must never return null).
 *
 * Exactly the 14 unique images that exist on disk. We never pad by duplicating
 * a single image to fake a fuller strip — the marquee duplication below is a
 * seamless-loop technique, not content padding (it is aria-hidden).
 */
const FALLBACK_ITEMS: GalleryItem[] = [
  '109d4f51-c8d6-4774-9ccb-ee1b4549b46d.jpg',
  '1ceadf56-22f4-4ffd-a9d0-cf70b46f21df.jpg',
  '5ba4650a-c55b-4804-8e8a-d30e3c2cf265.jpg',
  '752d80c8-6e2e-4af0-8544-98108bbab5fa.jpg',
  '87705e9b-de73-4f18-bc06-fa2ea61ad4ad.jpg',
  '8e39e7af-9f21-4d03-adc9-fc146fe094a3.jpg',
  '99abec8a-1363-4e1d-b327-b60e35ce5b67.jpg',
  'b69c3576-6931-4bea-bae0-c9859c7aa750.jpg',
  'bb1f9178-7168-4b4f-8726-e3d7b81900a0.jpg',
  'c9944a7a-3c83-4d27-b8af-c85dab8df88b.jpg',
  'd3cdcef1-94b1-45f6-9477-977ea046f136.jpg',
  'e69d0890-5c43-412e-b660-201a4d3eb86a.jpg',
  'e6b81c00-95af-4ec7-a2e8-1df005d31add.jpg',
  'ec4b814a-e0d1-47e3-9838-6b29485ed5da.jpg',
].map(filename => ({ filename, url: `/images/gallery/${filename}` }))

// Card intrinsic size — portrait 4:5 so live shots aren't crushed into
// landscape boxes. width/height attrs prevent layout shift (CLS).
const CARD_W = 224
const CARD_H = 280

type FetchState = 'loading' | 'ready'

export default function GalleryStrip() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [state, setState] = useState<FetchState>('loading')
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/admin-api/gallery')
      .then(r => (r.ok ? r.json() : []))
      .then((data: GalleryItem[]) => {
        if (cancelled) return
        setItems(Array.isArray(data) ? data : [])
        setState('ready')
      })
      .catch(() => {
        if (cancelled) return
        setState('ready') // fall through to the static fallback
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox])

  // Always have something to show: live items if present, otherwise the
  // static fallback. The section is NEVER returned null.
  const sourceItems = items.length > 0 ? items : FALLBACK_ITEMS
  const showSkeleton = state === 'loading' && items.length === 0

  // Seamless marquee = the unique set duplicated EXACTLY once (two copies).
  // translateX(0 -> -50%) then loops with no jump. The second copy is purely
  // decorative for the loop, so it is hidden from assistive tech.
  const renderCard = (item: GalleryItem, index: number, decorative: boolean) => (
    <li
      key={`${decorative ? 'dup' : 'orig'}-${item.filename}-${index}`}
      className="flex-shrink-0"
      aria-hidden={decorative || undefined}
    >
      <button
        type="button"
        onClick={() => setLightbox(item)}
        tabIndex={decorative ? -1 : 0}
        aria-label={decorative ? undefined : `Open gallery item ${index + 1}`}
        style={{ width: CARD_W }}
        className="block aspect-[4/5] rounded-xl overflow-hidden bg-dip-card cursor-pointer relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-dip-red"
      >
        {isVideo(item.filename) ? (
          <>
            <video
              src={item.url}
              className="w-full h-full object-cover"
              width={CARD_W}
              height={CARD_H}
              muted
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-base ml-1" aria-hidden="true">▶</span>
              </div>
            </div>
          </>
        ) : (
          // <picture> scaffold: AVIF/WebP <source> entries are added here ONLY
          // when those variants exist on disk. None exist yet, so we ship the
          // optimized JPG (no fake/404-ing sources). width/height + async
          // decode + lazy load close the CLS / responsive-image gaps.
          <picture>
            <img
              src={item.url}
              alt="DJ DiP live performance"
              width={CARD_W}
              height={CARD_H}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </picture>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
      </button>
    </li>
  )

  return (
    <>
      <section id="gallery" className="bg-dip-black py-16 md:py-20 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-16 mb-8">
          <p className="label mb-3">Media</p>
          <h2 className="font-display text-5xl md:text-6xl text-dip-cream leading-none">GALLERY</h2>
        </div>

        {/* w-full + overflow-hidden clamps the marquee track to the viewport so
            it can never blow out horizontally (the live site hit 2403px). */}
        <div className="relative w-full overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #080808, transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #080808, transparent)' }}
          />

          {showSkeleton ? (
            // Skeleton placeholder while the live feed loads — keeps the section
            // visibly populated instead of blank.
            <div className="flex gap-3 px-8 md:px-16" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  style={{ width: CARD_W }}
                  className="flex-shrink-0 aspect-[4/5] rounded-xl bg-dip-card animate-pulse"
                />
              ))}
            </div>
          ) : (
            <ul className="flex gap-3 gallery-scroll list-none m-0 p-0 w-max">
              {sourceItems.map((item, i) => renderCard(item, i, false))}
              {sourceItems.map((item, i) => renderCard(item, i, true))}
            </ul>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Close image viewer"
              className="absolute top-5 right-6 w-11 h-11 flex items-center justify-center text-white/60 hover:text-white text-3xl leading-none transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-dip-red rounded-full"
              onClick={() => setLightbox(null)}
            >
              <span aria-hidden="true">✕</span>
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="rounded-2xl overflow-hidden max-w-5xl max-h-[90vh]"
            >
              {isVideo(lightbox.filename) ? (
                <video
                  src={lightbox.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-[88vh] rounded-2xl"
                  style={{ background: '#000' }}
                />
              ) : (
                <img
                  src={lightbox.url}
                  alt="DJ DiP live performance"
                  className="max-w-full max-h-[88vh] object-contain rounded-2xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
