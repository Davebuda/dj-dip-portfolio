import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Dark overlay over the fixed backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Radial vignette — keeps centre bright, fades edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 90% at 50% 45%, transparent 20%, rgba(8,8,8,0.82) 68%)',
        }}
      />

      {/* Ambient red glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] bg-dip-red/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Ghost "DiP" watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[45vw] leading-none text-white/[0.025]">DiP</span>
      </div>

      {/* ── Content ── */}
      <div className="relative flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-6 md:px-14 pt-28 pb-10">

        {/* ── Main 2-column layout ── */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 items-stretch">

          {/* ── LEFT — Portrait photo + name ── */}
          <div className="flex flex-col z-10">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="relative overflow-hidden h-[480px] md:h-[580px]"
              style={{
                background: 'rgba(8,8,8,0.25)',
                backdropFilter: 'blur(2px)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <img
                src="/images/dip-portrait.png"
                alt="DJ DiP"
                className="w-full h-full object-cover object-center"
              />

              {/* Darkening overlay +8% */}
              <div className="absolute inset-0 bg-black/[0.08] pointer-events-none" />

              {/* Bottom fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.65), transparent)' }}
              />

              {/* Spinning text ring */}
              <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <svg viewBox="0 0 120 120" className="w-24 h-24 animate-spin" style={{ animationDuration: '22s' }}>
                  <path id="circle" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" fill="none" />
                  <text style={{ fontSize: '10px', fontFamily: 'Cabinet Grotesk', letterSpacing: '3px', fill: 'rgba(196,147,138,0.38)' }}>
                    <textPath href="#circle">URBAN · SOUND · FUSION · OSLO · DJ · DiP ·</textPath>
                  </text>
                </svg>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-5"
            >
              {/* DJ DiP — one colour, big */}
              <div className="leading-[0.9]">
                <span
                  className="font-display text-[18vw] md:text-[9vw] lg:text-[8vw] leading-none"
                  style={{
                    background: 'linear-gradient(135deg, #E63020 0%, #BF2D1E 55%, #C4938A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  DJ DiP
                </span>
              </div>
              {/* DAVIS */}
              <div className="leading-[0.9] mt-1">
                <span className="font-display text-[14vw] md:text-[7vw] lg:text-[6.2vw] text-white leading-none">
                  DAVIS
                </span>
              </div>
              <p className="label mt-4">Resident DJ · KlubN · Oslo, Norway</p>
            </motion.div>

            {/* Contact row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-5 mt-4"
            >
              <a href="mailto:2djdip@gmail.com" className="flex items-center gap-2 font-body text-sm text-dip-muted hover:text-dip-rose transition-colors">
                <span className="text-dip-red">✉</span> 2djdip@gmail.com
              </a>
              <a href="tel:+4796736112" className="flex items-center gap-2 font-body text-sm text-dip-muted hover:text-dip-rose transition-colors">
                <span className="text-dip-red">✆</span> +47 967 36 112
              </a>
              <a href="https://instagram.com/dj_dip" target="_blank" rel="noreferrer" className="font-body text-sm text-dip-muted hover:text-dip-rose transition-colors">
                @dj_dip
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT — Glass bio card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="glass-card liquid-glass p-8 md:p-10 flex flex-col gap-7 z-10"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="label">Urban Sound Fusion · Press Kit</p>
                <div className="flex items-center gap-3 text-dip-muted">
                  <span className="w-4 h-px bg-dip-rose/40" />
                  <span className="font-heading font-bold text-xs tracking-widest uppercase">Oslo</span>
                </div>
              </div>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-dip-cream leading-tight">
                DAVIS<br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #E63020 0%, #BF2D1E 55%, #C4938A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  "DiP"
                </span>
              </h2>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/[0.06]">
              {[
                { val: '8+', lab: 'Years' },
                { val: '4',  lab: 'Genres' },
                { val: 'NO', lab: 'Based' },
              ].map(s => (
                <div key={s.lab}>
                  <div
                    className="font-display text-5xl leading-none"
                    style={{
                      background: 'linear-gradient(135deg, #E63020, #C4938A)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {s.val}
                  </div>
                  <div className="text-sm font-heading font-bold text-dip-muted mt-1 tracking-wider uppercase">{s.lab}</div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div>
              <p className="label mb-3">Biography</p>
              <p className="font-body font-light text-dip-cream/65 text-base leading-relaxed">
                With over eight years behind the decks and a deep understanding of club dynamics,
                DJ DiP delivers prime-time, high-energy sets rooted in Hip-Hop/R&B, Afrobeat,
                Dancehall, and Amapiano — shaped into a seamless Urban Sound Fusion through
                intentional genre bridges, mature BPM control, and production-led transitions.
              </p>
              <p className="font-body font-light text-dip-cream/38 text-sm leading-relaxed mt-3">
                Peak-hour specialist. Event Architect. Concept Builder. Resident DJ at KlubN Oslo.
              </p>
            </div>

            {/* Genres + Key Stages */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="label mb-4">Genres</p>
                <ul className="space-y-2.5">
                  {['HipHop & RnB', 'Afrobeats', 'Shatta', 'Amapiano'].map((g, i) => (
                    <li key={g} className="flex items-center gap-3">
                      <span className="font-mono text-xs text-dip-red/40">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-body text-sm text-dip-cream/70">{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label mb-4">Key Stages</p>
                <ul className="space-y-2.5">
                  {['KlubN — Resident', 'Gamba Beat Bar', "Kiki's House", 'Faksen Bar', 'Old School Vibe'].map((v, i) => (
                    <li key={v} className="flex items-center gap-3">
                      <span className="font-mono text-xs text-dip-red/40">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-body text-xs text-dip-cream/60">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Setup tags */}
            <div>
              <p className="label mb-4">Setup</p>
              <div className="flex flex-wrap gap-2">
                {['Serato Native', 'CDJ 3000', 'DJM 3-11', 'RANE ONE', 'XDJ-RZ', 'DDJ REV 7'].map(t => (
                  <span
                    key={t}
                    className="font-heading font-bold text-xs tracking-wide uppercase text-dip-rose/65 bg-white/[0.04] border border-white/[0.07] px-3 py-1.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Booking CTAs */}
            <div className="mt-auto">
              <div className="divider mb-6" />
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="mailto:2djdip@gmail.com" className="btn-brand flex-1 text-center text-sm py-3.5">
                  Email For Booking →
                </a>
                <a href="tel:+4796736112" className="btn-outline flex-1 text-center text-sm py-3.5">
                  +47 967 36 112
                </a>
              </div>
              <div className="flex items-center justify-between mt-5">
                <span className="font-script text-3xl text-dip-rose/55">Davis DiP</span>
                <a href="https://instagram.com/dj_dip" target="_blank" rel="noreferrer" className="label hover:text-dip-cream transition-colors">
                  @dj_dip
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
