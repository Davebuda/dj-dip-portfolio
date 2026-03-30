import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useContent } from '../hooks/useContent'

const stats = [
  { value: '8+',    label: 'Years Behind The Decks' },
  { value: '4',     label: 'Genres Mastered' },
  { value: 'Oslo',  label: 'Based In Norway' },
  { value: 'KlubN', label: 'Resident DJ' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const content = useContent()

  return (
    <section id="about" ref={ref} className="bg-dip-dark py-20 md:py-28 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="label mb-10"
        >
          The Artist
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Left — quote + stats */}
          <div>
            <motion.blockquote
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="font-script leading-tight mb-10"
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 6rem)',
                color: '#D44040',
              }}
            >
              &ldquo;Dance Floor<br />is Too Smooth.&rdquo;
            </motion.blockquote>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.08 }}
                  className="p-5 border border-dip-rose/15 bg-dip-card group hover:border-dip-red/35 transition-colors relative overflow-hidden"
                >
                  {/* Subtle yellow accent on hover */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-dip-yellow/0 via-dip-yellow/30 to-dip-yellow/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div
                    className="font-display font-black mb-2 group-hover:opacity-90 transition-opacity leading-none"
                    style={{
                      fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                      background: 'linear-gradient(135deg, #E63020, #D44040)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
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
            <h2
              className="font-display font-black text-dip-cream leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', letterSpacing: '-0.04em' }}
            >
              DAVIS<br />
              <span style={{ background: 'linear-gradient(135deg, #E63020, #BF2D1E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DiP</span>
            </h2>

            <p className="text-dip-cream/70 font-body font-light leading-relaxed text-base">
              {content.bio}
            </p>

            <p className="text-dip-cream/55 font-body font-light leading-relaxed text-sm mt-4">
              {content.bio2}
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
