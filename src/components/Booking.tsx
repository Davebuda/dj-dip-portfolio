import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Booking() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="book" ref={ref} className="relative py-40 px-8 md:px-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dip-dark" />
      <div className="absolute inset-0 bg-gradient-to-br from-dip-red/15 via-transparent to-dip-rose/8" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dip-red/8 blur-[160px] rounded-full pointer-events-none" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="font-display text-[18rem] md:text-[28rem] text-white/[0.02] leading-none">DiP</span>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="label mb-8"
        >
          Get In Touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="font-display text-6xl md:text-[9rem] text-dip-cream leading-none"
        >
          LET'S CREATE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="font-script text-4xl md:text-6xl text-dip-rose mt-2 mb-14"
        >
          something unforgettable
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <a
            href="mailto:2djdip@gmail.com"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-dip-red px-10 py-4 text-white font-body font-semibold tracking-[0.2em] uppercase text-xs hover:bg-dip-red-dark transition-colors duration-300 group"
          >
            Email For Booking
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          <a
            href="tel:+4796736112"
            className="w-full sm:w-auto inline-flex items-center justify-center border border-dip-rose/30 text-dip-rose px-10 py-4 font-body font-semibold tracking-[0.2em] uppercase text-xs hover:border-dip-rose hover:text-dip-cream transition-all duration-300"
          >
            +47 967 36 112
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-6"
        >
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
        </motion.div>
      </div>
    </section>
  )
}
