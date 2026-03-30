import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const events = [
  {
    venue: 'KlubN',
    event: 'Resident DJ · Event Architect · Concept Builder',
    tags: ['Urban Sound Fusion', 'Oslo'],
    featured: true,
  },
  {
    venue: 'Gamba Beat Bar',
    event: 'Content Party',
    tags: ['HipHop & RnB', 'Shatta', 'Afrobeats'],
    featured: false,
  },
  {
    venue: "Kiki's House",
    event: 'Club Night',
    tags: ['HipHop & RnB', 'Dancehall', 'Afrobeats'],
    featured: false,
  },
  {
    venue: 'Old School Vibe',
    event: 'Throwback Night',
    tags: ['HipHop & RnB', 'Dancehall', 'Afrobeats'],
    featured: false,
  },
  {
    venue: 'Faksen Bar',
    event: 'Amapiano Scene',
    tags: ['Amapiano', 'Afro-House', 'Gqom'],
    featured: false,
  },
  {
    venue: 'Faksen Bar',
    event: 'Content Party',
    tags: ['HipHop & RnB', 'Shatta', 'Afrobeats'],
    featured: false,
  },
]

export default function Highlights() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="events" ref={ref} className="bg-dip-card py-20 md:py-28 px-8 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="label mb-4"
        >
          Highlights
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-display font-black text-dip-cream leading-none mb-12"
          style={{ fontSize: 'clamp(4rem, 14vw, 11rem)', letterSpacing: '-0.04em' }}
        >
          STAGES
        </motion.h2>

        <div>
          {events.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.06 * i }}
              className={`group flex flex-col md:flex-row md:items-center justify-between py-6 border-b transition-all duration-300 ${
                ev.featured
                  ? 'border-dip-yellow/40 hover:border-dip-yellow/70'
                  : 'border-dip-rose/10 hover:border-dip-rose/30'
              }`}
            >
              <div className="flex items-center gap-6">
                <span
                  className={`font-mono text-base leading-none w-8 shrink-0 transition-colors duration-300 ${
                    ev.featured ? 'text-dip-yellow' : 'text-dip-red/25 group-hover:text-dip-red/60'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p
                    className={`font-heading font-bold text-base md:text-xl transition-colors duration-300 ${
                      ev.featured ? 'text-white' : 'text-dip-cream group-hover:text-white'
                    }`}
                  >
                    {ev.venue}
                    {ev.featured && (
                      <span
                        className="ml-3 inline-block text-[10px] font-heading font-bold tracking-[0.2em] uppercase px-2.5 py-0.5 align-middle"
                        style={{
                          color: '#EAE600',
                          border: '1px solid rgba(234,230,0,0.5)',
                          background: 'rgba(234,230,0,0.06)',
                        }}
                      >
                        Resident
                      </span>
                    )}
                  </p>
                  <p className="text-dip-muted font-body font-light text-sm mt-0.5">
                    {ev.event}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3 md:mt-0 ml-[56px] md:ml-0">
                {ev.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[11px] font-heading font-bold tracking-wide text-dip-rose/75 bg-dip-rose/[0.07] border border-dip-rose/20 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
