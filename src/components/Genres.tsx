import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const genres = [
  {
    num: '01',
    name: 'HipHop & RnB',
    desc: 'Heavy basslines, smooth transitions, and the pulse of urban culture. The foundation of every set.',
  },
  {
    num: '02',
    name: 'Afrobeats',
    desc: 'Afrobeats rhythms that connect continents and move dance floors. High energy, deep roots.',
  },
  {
    num: '03',
    name: 'Shatta',
    desc: 'High-energy dancehall vibes rooted in Caribbean culture. The crowd never stops moving.',
  },
  {
    num: '04',
    name: 'Amapiano',
    desc: 'Log drums, soulful piano, and the spirit of South African nightlife. Deep, late-night energy.',
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
              className="font-display text-8xl md:text-[10rem] text-dip-cream leading-none"
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

        <div className="grid md:grid-cols-2 gap-px bg-dip-rose/10">
          {genres.map((genre, i) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              className="bg-dip-dark p-10 md:p-14 group hover:bg-dip-card transition-colors duration-300 cursor-default"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-6xl text-dip-red/25 group-hover:text-dip-red/55 transition-colors duration-300 leading-none">
                  {genre.num}
                </span>
                <span className="w-2 h-2 rounded-full bg-dip-rose/40 mt-3 group-hover:bg-dip-rose transition-colors duration-300" />
              </div>
              <h3 className="font-display text-5xl md:text-6xl text-dip-cream tracking-tight mb-5 leading-tight group-hover:text-white transition-colors">
                {genre.name}
              </h3>
              <p className="text-dip-muted font-body font-light leading-relaxed text-base">
                {genre.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
