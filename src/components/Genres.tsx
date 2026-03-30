import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const genres = [
  {
    num: '01',
    name: 'HipHop & RnB',
    desc: 'Heavy basslines, smooth transitions, and the pulse of urban culture. The foundation of every set.',
    accent: '#E63020',
  },
  {
    num: '02',
    name: 'Afrobeats',
    desc: 'Afrobeats rhythms that connect continents and move dance floors. High energy, deep roots.',
    accent: '#EAE600',
  },
  {
    num: '03',
    name: 'Shatta',
    desc: 'High-energy dancehall vibes rooted in Caribbean culture. The crowd never stops moving.',
    accent: '#FF8C42',
  },
  {
    num: '04',
    name: 'Amapiano',
    desc: 'Log drums, soulful piano, and the spirit of South African nightlife. Deep, late-night energy.',
    accent: '#4DE0D0',
  },
]

export default function Genres() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="sound" ref={ref} className="bg-dip-black py-28 md:py-36 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="label mb-4"
            >
              The Sound
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-dip-cream leading-none"
              style={{ fontSize: 'clamp(5rem, 14vw, 12rem)', letterSpacing: '-0.04em' }}
            >
              GENRES
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="hidden md:block text-dip-muted font-body font-light text-base max-w-[260px] text-right leading-relaxed"
          >
            Fusing top genres into a single, cohesive Urban Club Sound
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/[0.04]">
          {genres.map((genre, i) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              className="bg-dip-dark p-10 md:p-14 group hover:bg-dip-card transition-colors duration-300 cursor-default relative overflow-hidden"
              style={{ borderTop: `3px solid ${genre.accent}22` }}
            >
              {/* Accent top bar on hover */}
              <div
                className="absolute top-0 left-0 w-0 h-[3px] group-hover:w-full transition-all duration-500"
                style={{ background: genre.accent }}
              />

              <div className="flex items-start justify-between mb-6">
                <span
                  className="font-mono leading-none transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(4rem, 10vw, 7rem)',
                    color: `${genre.accent}28`,
                  }}
                >
                  <span className="group-hover:opacity-70 transition-opacity duration-300 block"
                    style={{ color: genre.accent }}>
                    {genre.num}
                  </span>
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full mt-4 transition-all duration-300 group-hover:scale-125"
                  style={{ background: `${genre.accent}55`, boxShadow: `0 0 12px ${genre.accent}40` }}
                />
              </div>
              <h3
                className="font-display font-black text-dip-cream tracking-tighter mb-4 leading-none group-hover:text-white transition-colors"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
              >
                {genre.name}
              </h3>
              <p className="text-dip-muted font-body font-light leading-relaxed text-base group-hover:text-dip-cream/60 transition-colors duration-300">
                {genre.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
