import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

interface GalleryItem { filename: string; url: string }

function isVideo(filename: string) {
  return /\.(mp4|mov|webm|ogg)$/i.test(filename)
}

export default function GalleryStrip() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [items, setItems] = useState<GalleryItem[]>([])
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  useEffect(() => {
    fetch('/admin-api/gallery')
      .then(r => r.ok ? r.json() : [])
      .then((data: GalleryItem[]) => setItems(data))
      .catch(() => {})
  }, [])

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox])

  if (items.length === 0) return null

  const repeated = items.length < 6
    ? [...items, ...items, ...items, ...items]
    : [...items, ...items]

  return (
    <>
      <section id="gallery" ref={ref} className="bg-dip-black py-16 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-16 mb-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="label mb-3"
          >
            Media
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl text-dip-cream leading-none"
          >
            GALLERY
          </motion.h2>
        </div>

        {/* Scrolling strip */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #080808, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #080808, transparent)' }} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="flex gap-3 gallery-scroll"
            style={{ width: 'max-content' }}
          >
            {repeated.map((item, i) => (
              <div
                key={`${item.filename}-${i}`}
                onClick={() => setLightbox(item)}
                className="flex-shrink-0 w-64 h-44 rounded-xl overflow-hidden bg-dip-card cursor-pointer relative group"
              >
                {isVideo(item.filename) ? (
                  <>
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-white text-base ml-1">▶</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={item.url}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-6 text-white/50 hover:text-white text-3xl leading-none transition-colors z-10"
              onClick={() => setLightbox(null)}
            >
              ✕
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
                  alt=""
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
