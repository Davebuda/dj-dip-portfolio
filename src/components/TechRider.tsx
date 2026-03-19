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
    <section id="tech-rider" ref={ref} className="bg-dip-black py-28 md:py-36 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="label mb-4"
        >
          Technical
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-7xl md:text-[9rem] text-dip-cream leading-none"
          >
            TECH<br />RIDER
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
              className="bg-dip-dark p-8 hover:bg-dip-card transition-colors duration-300"
            >
              <p className="label mb-5">{item.category}</p>
              <ul className="space-y-2.5">
                {item.items.map(eq => (
                  <li key={eq} className="font-body font-light text-dip-cream/60 text-sm flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-dip-red flex-shrink-0" />
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
