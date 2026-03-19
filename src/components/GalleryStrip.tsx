import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface GalleryItem { filename: string; url: string }

export default function GalleryStrip() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [images, setImages] = useState<GalleryItem[]>([])

  useEffect(() => {
    fetch('/admin-api/gallery')
      .then(r => r.ok ? r.json() : [])
      .then((data: GalleryItem[]) => setImages(data))
      .catch(() => {})
  }, [])

  if (images.length === 0) return null

  // Duplicate for seamless loop — need at least enough to fill the strip twice
  const repeated = images.length < 6
    ? [...images, ...images, ...images, ...images]
    : [...images, ...images]

  return (
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
        {/* Edge fades */}
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
          {repeated.map((img, i) => (
            <div
              key={`${img.filename}-${i}`}
              className="flex-shrink-0 w-64 h-44 rounded-xl overflow-hidden bg-dip-card"
            >
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
