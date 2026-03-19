import { motion } from 'framer-motion'

const genres = ['HipHop & RnB', 'Afrobeats', 'Shatta', 'Amapiano']

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: 'url(/images/hero.png)' }}
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-dip-black/85 via-dip-black/50 to-dip-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-dip-black via-transparent to-dip-black/30" />

      {/* Subtle red glow bottom-left */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-dip-red/10 blur-[120px] rounded-full" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-7xl mx-auto">

        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-6 h-px bg-dip-rose" />
          <span className="label">Oslo, Norway · Urban Sound Fusion</span>
        </motion.div>

        {/* Name — oversized editorial treatment */}
        <div className="relative leading-none select-none">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            <span className="block font-display text-[9rem] sm:text-[13rem] md:text-[17rem] text-dip-cream leading-[0.85]">
              DJ
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="relative"
          >
            <span className="block font-display text-[9rem] sm:text-[13rem] md:text-[17rem] text-dip-red leading-[0.85]">
              DiP
            </span>
            {/* Script tagline overlaid on the D */}
            <span className="absolute top-4 md:top-8 left-1 md:left-2 font-script text-3xl md:text-5xl text-dip-rose/75 pointer-events-none whitespace-nowrap">
              Top Genres As One Urban Sound
            </span>
          </motion.div>
        </div>

        {/* Genre pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="flex flex-wrap gap-2.5 mt-8"
        >
          {genres.map(g => (
            <span
              key={g}
              className="px-4 py-1.5 border border-dip-rose/30 text-dip-rose/80 text-xs font-body font-medium tracking-[0.2em] uppercase"
            >
              {g}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-8 flex items-center gap-5"
        >
          <a
            href="#book"
            className="inline-flex items-center gap-3 bg-dip-red px-8 py-4 text-white font-body font-semibold tracking-[0.2em] uppercase text-xs hover:bg-dip-red-dark transition-all duration-300 group"
          >
            Book DJ DiP
            <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </a>
          <a
            href="#about"
            className="text-xs font-body font-medium tracking-[0.2em] uppercase text-dip-muted hover:text-dip-cream transition-colors"
          >
            View Presskit ↓
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-dip-rose/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
