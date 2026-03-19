import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const gear = [
  { category: 'Software',     items: ['Serato Native'] },
  { category: 'Mixers',       items: ['DJM 3-11'] },
  { category: 'CDJ Players',  items: ['CDJ 3000', 'CDJ 2000NX5'] },
  { category: 'All-In-One',   items: ['XDJ-RZ', 'XDJ-RX', 'DDJ REV 5', 'DDJ REV 7', 'DDJ REV 10'] },
  { category: 'Controllers',  items: ['RANE ONE', 'DSJ 1000SRT'] },
  { category: 'Peripherals',  items: ['Professional Headphones', 'Booth Monitor'] },
]

export default function TechRider() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="tech-rider" ref={ref} className="bg-dip-black py-16 md:py-20 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="label mb-3"
        >
          Technical
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl text-dip-cream leading-none"
          >
            TECH RIDER
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
            className="hidden md:block text-dip-muted font-body font-light text-sm max-w-[220px] text-right leading-relaxed"
          >
            Preferred setup for optimal performance. Alternatives accepted — always confirm in advance.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-dip-rose/10">
          {gear.map((item, i) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              className="bg-dip-dark p-5 md:p-6 hover:bg-dip-card transition-colors duration-300"
            >
              <p className="label mb-3">{item.category}</p>
              <ul className="space-y-2">
                {item.items.map(eq => (
                  <li key={eq} className="font-body font-light text-dip-cream/75 text-sm flex items-center gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #E63020, #BF2D1E)' }}
                    />
                    {eq}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
