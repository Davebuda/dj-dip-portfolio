import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '8+',    label: 'Years Behind The Decks' },
  { value: '4',     label: 'Genres Mastered' },
  { value: 'Oslo',  label: 'Based In Norway' },
  { value: 'KlubN', label: 'Resident DJ' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="bg-dip-dark py-16 md:py-20 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="label mb-8"
        >
          The Artist
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* Left — quote + stats */}
          <div>
            <motion.blockquote
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="font-script text-4xl md:text-5xl text-dip-rose leading-tight mb-8"
            >
              "Dance Floor<br />is Too Smooth."
            </motion.blockquote>

            <div className="grid grid-cols-2 gap-2.5">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.08 }}
                  className="p-4 border border-dip-rose/15 bg-dip-card group hover:border-dip-red/30 transition-colors"
                >
                  <div
                    className="font-display text-3xl mb-1 group-hover:opacity-90 transition-opacity"
                    style={{ background: 'linear-gradient(135deg, #E63020, #D44040)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-heading font-bold tracking-[0.12em] uppercase text-dip-muted leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <h2 className="font-display text-5xl md:text-6xl text-dip-cream leading-none mb-5">
              DAVIS<br />
              <span style={{ background: 'linear-gradient(135deg, #E63020, #BF2D1E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DiP</span>
            </h2>

            <p className="text-dip-cream/70 font-body font-light leading-relaxed text-base">
              With over eight years behind the decks and a deep understanding of club dynamics,
              DJ DiP (Davis) delivers prime-time, high-energy sets rooted in Hip-Hop/R&B,
              Afrobeat, Dancehall, and Amapiano — shaped into Urban Sound Fusion through
              seamless transitions, mature pacing, and production.
            </p>

            <p className="text-dip-cream/40 font-body font-light leading-relaxed text-sm mt-4">
              Intentional genre + BPM bridges that stay smooth. Peak-hour control: from loose
              to controlled energy. Production-led transitions for maximum crowd impact.
              This isn't just mixing — it's sound direction.
            </p>

            <div className="divider mt-8 mb-5" />

            <div className="flex items-center gap-5 flex-wrap">
              <a
                href="https://instagram.com/dj_dip"
                target="_blank"
                rel="noreferrer"
                className="label hover:text-dip-cream transition-colors"
              >
                @dj_dip
              </a>
              <span className="w-px h-4 bg-dip-rose/20" />
              <a
                href="https://instagram.com/klub_n_oslo"
                target="_blank"
                rel="noreferrer"
                className="label hover:text-dip-cream transition-colors"
              >
                @klub_n_oslo
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
