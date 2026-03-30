import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useContent } from '../hooks/useContent'

export default function Booking() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { contact: { email, phone } } = useContent()

  return (
    <section id="book" ref={ref} className="relative py-24 px-8 md:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-dip-dark" />
      <div className="absolute inset-0 bg-gradient-to-br from-dip-red/10 via-transparent to-dip-rose/5" />
      {/* Red glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-dip-red/[0.08] blur-[140px] rounded-full pointer-events-none" />
      {/* Yellow glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-dip-yellow/[0.06] blur-[120px] rounded-full pointer-events-none" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span
          className="font-display font-black text-white/[0.018] leading-none"
          style={{ fontSize: 'clamp(12rem, 30vw, 22rem)', letterSpacing: '-0.04em' }}
        >
          DiP
        </span>
      </div>

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
          className="font-display font-black text-dip-cream leading-none"
          style={{ fontSize: 'clamp(4rem, 14vw, 11rem)', letterSpacing: '-0.04em' }}
        >
          LET&rsquo;S<br />CREATE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="font-script text-dip-rose mt-3 mb-10"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          something unforgettable
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <a
            href={`mailto:${email}`}
            className="btn-brand w-full sm:w-auto text-sm px-10 group"
          >
            Email For Booking
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
          </a>
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="btn-outline w-full sm:w-auto text-sm px-10"
          >
            {phone}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-6"
        >
          <a href="https://instagram.com/dj_dip" target="_blank" rel="noreferrer" className="label hover:text-dip-cream transition-colors">
            @dj_dip
          </a>
          <span className="w-px h-4 bg-dip-rose/20" />
          <a href="https://instagram.com/klub_n_oslo" target="_blank" rel="noreferrer" className="label hover:text-dip-cream transition-colors">
            @klub_n_oslo
          </a>
        </motion.div>
      </div>
    </section>
  )
}
