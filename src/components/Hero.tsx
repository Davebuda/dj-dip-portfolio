import { motion } from 'framer-motion'

const venues = ['KlubN — Resident', 'Gamba Beat Bar', "Kiki's House", 'Faksen Bar', 'Old School Vibe']
const genres = ['HipHop & RnB', 'Afrobeats', 'Shatta', 'Amapiano']

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-dip-black overflow-hidden flex flex-col">

      {/* Ghost name — massive background text */}
      <div className="absolute inset-0 flex flex-col justify-start pt-16 pl-6 md:pl-14 pointer-events-none select-none">
        <span className="font-display text-[28vw] leading-[0.82] text-white/[0.03]">DJ</span>
        <span className="font-display text-[28vw] leading-[0.82] text-white/[0.03]">DiP</span>
      </div>

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-dip-red/8 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-6 md:px-14 pt-20 pb-10">

        {/* ── Top bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <span className="w-5 h-px bg-dip-rose" />
            <span className="label">Oslo, Norway</span>
          </div>
          <span className="label hidden md:block">Urban Sound Fusion · Press Kit</span>
          <a
            href="#book"
            className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-dip-red border border-dip-red/40 px-4 py-2 hover:bg-dip-red hover:text-white transition-all duration-300"
          >
            Book Now
          </a>
        </motion.div>

        {/* ── Main 3-column layout ── */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[260px_1fr_200px] lg:grid-cols-[300px_1fr_220px] gap-6 items-stretch">

          {/* ── LEFT — Cards ── */}
          <div className="flex flex-col gap-4 z-10">

            {/* Name — visible on mobile, ghost on desktop */}
            <div className="md:hidden mb-2">
              <h1 className="font-display text-[22vw] leading-none text-dip-cream">DJ</h1>
              <h1 className="font-display text-[22vw] leading-none text-dip-red">DiP</h1>
            </div>

            {/* THE SOUND */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-dip-dark border border-white/5 p-6"
            >
              <p className="label mb-3">The Sound</p>
              <h3 className="font-display text-3xl text-dip-cream mb-4 leading-tight">
                URBAN<br />FUSION
              </h3>
              <div className="flex gap-4 mb-4">
                <div>
                  <div className="font-display text-3xl text-dip-red leading-none">8+</div>
                  <div className="text-xs text-dip-muted font-body tracking-wider mt-1">Years</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-dip-red leading-none">4</div>
                  <div className="text-xs text-dip-muted font-body tracking-wider mt-1">Genres</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-dip-red leading-none">NO</div>
                  <div className="text-xs text-dip-muted font-body tracking-wider mt-1">Oslo</div>
                </div>
              </div>
              <p className="text-dip-cream/50 font-body font-light text-xs leading-relaxed">
                Prime-time, high-energy sets rooted in Hip-Hop/R&B, Afrobeat, Dancehall & Amapiano. Seamless transitions, mature pacing.
              </p>
            </motion.div>

            {/* BOOKING */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="bg-dip-dark border border-white/5 p-6"
            >
              <p className="label mb-3">Booking</p>
              <h3 className="font-display text-3xl text-dip-cream mb-4 leading-tight">
                BOOK<br />DJ DiP
              </h3>
              <a
                href="mailto:2djdip@gmail.com"
                className="block text-xs font-body font-semibold tracking-[0.15em] uppercase text-dip-rose hover:text-dip-cream transition-colors mb-2"
              >
                2djdip@gmail.com →
              </a>
              <a
                href="tel:+4796736112"
                className="block text-xs font-body text-dip-muted hover:text-dip-rose transition-colors"
              >
                +47 967 36 112
              </a>
            </motion.div>

            {/* KEY STAGES */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="bg-dip-dark border border-white/5 p-6 flex-1"
            >
              <p className="label mb-4">Key Stages</p>
              <ul className="space-y-2.5">
                {venues.map((v, i) => (
                  <li key={v} className="flex items-center gap-3">
                    <span className="font-display text-sm text-dip-red/40 w-5">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-xs font-body text-dip-cream/60">{v}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ── CENTER — Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="relative flex items-end justify-center overflow-hidden hidden md:flex"
          >
            {/* Desktop name behind photo */}
            <div className="absolute inset-0 flex flex-col items-start justify-start pt-0 pl-4 pointer-events-none select-none">
              <span className="font-display text-[14vw] leading-[0.85] text-white/[0.06]">DJ</span>
              <span className="font-display text-[14vw] leading-[0.85] text-dip-red/10">DiP</span>
            </div>

            {/* Photo */}
            <img
              src="/images/hero.png"
              alt="DJ DiP"
              className="relative z-10 w-full max-w-[480px] object-cover object-top"
              style={{ maskImage: 'linear-gradient(to top, transparent 0%, black 25%)', WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 25%)' }}
            />

            {/* Circular text */}
            <div className="absolute top-1/4 right-12 z-20 pointer-events-none">
              <svg viewBox="0 0 120 120" className="w-24 h-24 animate-spin" style={{ animationDuration: '20s' }}>
                <path id="circle" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" fill="none" />
                <text className="fill-dip-rose/40" style={{ fontSize: '10px', fontFamily: 'Space Grotesk', letterSpacing: '3px' }}>
                  <textPath href="#circle">URBAN · SOUND · FUSION · OSLO · DJ · DiP ·</textPath>
                </text>
              </svg>
            </div>
          </motion.div>

          {/* ── RIGHT — Genres + History ── */}
          <div className="flex flex-col gap-4 z-10">

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden md:block"
            >
              <p className="label text-right mb-1">Resident DJ</p>
              <p className="label text-right">KlubN · Oslo</p>
            </motion.div>

            {/* Genres / Skills */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="bg-dip-dark border border-white/5 p-6"
            >
              <p className="label mb-4">Genres</p>
              <ul className="space-y-3">
                {genres.map((g, i) => (
                  <li key={g} className="flex items-center justify-between">
                    <span className="font-display text-xs text-dip-red/30">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-body font-light text-xs text-dip-cream/70 text-right">{g}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tech */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="bg-dip-dark border border-white/5 p-6"
            >
              <p className="label mb-4">Setup</p>
              <ul className="space-y-1.5">
                {['Serato Native', 'CDJ 3000', 'DJM 3-11', 'RANE ONE'].map(t => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-dip-red/60 flex-shrink-0" />
                    <span className="text-xs font-body text-dip-cream/50">{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Stage history */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="bg-dip-dark border border-white/5 p-6 flex-1"
            >
              <p className="label mb-4">Stage History</p>
              <div className="space-y-4">
                <div>
                  <p className="font-display text-sm text-dip-red leading-none">RESIDENT DJ</p>
                  <p className="text-xs font-body text-dip-cream/70 mt-1">KlubN — Oslo</p>
                  <p className="text-xs font-body text-dip-muted/60 mt-0.5">Event Architect · Concept Builder</p>
                </div>
                <div className="divider" />
                <div>
                  <p className="font-display text-sm text-dip-red/70 leading-none">AMAPIANO SCENE</p>
                  <p className="text-xs font-body text-dip-cream/50 mt-1">Faksen Bar — Oslo</p>
                </div>
                <div>
                  <p className="font-display text-sm text-dip-red/70 leading-none">CONTENT PARTY</p>
                  <p className="text-xs font-body text-dip-cream/50 mt-1">Gamba Beat Bar</p>
                </div>
                <div>
                  <p className="font-display text-sm text-dip-red/70 leading-none">OLD SCHOOL VIBE</p>
                  <p className="text-xs font-body text-dip-cream/50 mt-1">Oslo</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom contact bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8 pt-6 border-t border-white/5"
        >
          <div className="flex flex-wrap items-center gap-6">
            <a href="mailto:2djdip@gmail.com" className="text-xs font-body text-dip-muted hover:text-dip-rose transition-colors flex items-center gap-2">
              <span className="text-dip-red">✉</span> 2djdip@gmail.com
            </a>
            <a href="tel:+4796736112" className="text-xs font-body text-dip-muted hover:text-dip-rose transition-colors flex items-center gap-2">
              <span className="text-dip-red">✆</span> +47 967 36 112
            </a>
            <a href="https://instagram.com/dj_dip" target="_blank" rel="noreferrer" className="text-xs font-body text-dip-muted hover:text-dip-rose transition-colors">
              @dj_dip
            </a>
          </div>
          <span className="font-script text-2xl text-dip-rose/60">Davis DiP</span>
        </motion.div>
      </div>
    </section>
  )
}
