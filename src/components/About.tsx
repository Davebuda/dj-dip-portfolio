import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '8+',    label: 'Years Behind The Decks' },
  { value: '4',     label: 'Genres Mastered' },
  { value: 'Oslo',  label: 'Based In Norway' },
  { value: 'KlubN', label: 'Resident DJ' },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, delay },
})

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="bg-dip-dark py-28 md:py-36 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">

        <motion.p {...fade()} className="label mb-16">
          The Artist
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left — quote + stats */}
          <div>
            <motion.blockquote
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="font-script text-6xl md:text-7xl text-dip-rose leading-tight mb-14"
            >
              "Dance Floor<br />is Too Smooth."
            </motion.blockquote>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.08 }}
                  className="p-6 border border-dip-rose/15 bg-dip-card group hover:border-dip-red/30 transition-colors"
                >
                  <div
                    className="font-display text-5xl mb-1.5 group-hover:opacity-90 transition-opacity"
                    style={{ background: 'linear-gradient(135deg, #E63020, #C4938A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm font-heading font-bold tracking-[0.12em] uppercase text-dip-muted leading-tight">
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
            <h2 className="font-display text-8xl md:text-[10rem] text-dip-cream leading-none mb-8">
              DAVIS<br />
              <span style={{ background: 'linear-gradient(135deg, #E63020, #BF2D1E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DiP</span>
            </h2>

            <p className="text-dip-cream/65 font-body font-light leading-relaxed text-lg">
              With over eight years behind the decks and a deep understanding of club dynamics,
              DJ DiP (Davis) delivers prime-time, high-energy sets rooted in Hip-Hop/R&B,
              Afrobeat, Dancehall, and Amapiano — shaped into Urban Sound Fusion through
              seamless transitions, mature pacing, and production.
            </p>

            <p className="text-dip-cream/40 font-body font-light leading-relaxed text-base mt-5">
              Intentional genre + BPM bridges that stay smooth. Peak-hour control: from loose
              to controlled energy. Production-led transitions for maximum crowd impact.
              This isn't just mixing — it's sound direction.
            </p>

            <div className="divider mt-10 mb-6" />

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
