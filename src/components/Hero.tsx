import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{
        backgroundImage: 'url(/images/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 28%',
      }}
    >
      {/* Dark base overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 90% at 50% 45%, transparent 20%, rgba(8,8,8,0.85) 70%)',
        }}
      />

      {/* Ambient red glow bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-dip-red/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Ghost name */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[40vw] leading-none text-white/[0.03]">DiP</span>
      </div>

      <div className="relative flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-6 md:px-14 pt-20 pb-10">

        {/* ── Top bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <span className="w-5 h-px bg-dip-rose" />
            <span className="label">Oslo, Norway</span>
          </div>
          <span className="label hidden md:block">Urban Sound Fusion · Press Kit</span>
          <a href="#book" className="btn-brand text-xs px-5 py-2.5">
            Book Now
          </a>
        </motion.div>

        {/* ── Main 2-column layout ── */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 items-stretch">

          {/* ── LEFT — Portrait photo + name ── */}
          <div className="flex flex-col z-10">

            {/* Photo card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative overflow-hidden flex-1 min-h-[420px] md:min-h-[520px]"
              style={{
                background: 'rgba(8,8,8,0.3)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <img
                src="/images/dip-portrait.png"
                alt="DJ DiP"
                className="w-full h-full object-cover object-top"
              />

              {/* Subtle gradient over photo bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.7), transparent)' }}
              />

              {/* Spinning circular text */}
              <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <svg viewBox="0 0 120 120" className="w-24 h-24 animate-spin" style={{ animationDuration: '20s' }}>
                  <path id="circle" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" fill="none" />
                  <text style={{ fontSize: '10px', fontFamily: 'Cabinet Grotesk', letterSpacing: '3px', fill: 'rgba(196,147,138,0.4)' }}>
                    <textPath href="#circle">URBAN · SOUND · FUSION · OSLO · DJ · DiP ·</textPath>
                  </text>
                </svg>
              </div>
            </motion.div>

            {/* Name below photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-4"
            >
              <div className="flex items-baseline gap-4 leading-none">
                <span className="font-display text-[14vw] md:text-[7vw] lg:text-[6vw] text-white leading-none">DJ</span>
                <span
                  className="font-display text-[14vw] md:text-[7vw] lg:text-[6vw] leading-none"
                  style={{
                    background: 'linear-gradient(135deg, #E63020 0%, #BF2D1E 50%, #C4938A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  DiP
                </span>
              </div>
              <p className="label mt-2">Resident DJ · KlubN Oslo</p>
            </motion.div>

            {/* Bottom contact row */}
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

          {/* ── RIGHT — Large glass bio card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="glass-card liquid-glass p-8 md:p-10 flex flex-col gap-8 z-10"
          >
            {/* Header */}
            <div>
              <p className="label mb-4">Urban Sound Fusion · Press Kit</p>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-dip-cream leading-tight">
                DAVIS<br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #E63020 0%, #BF2D1E 60%, #C4938A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  "DiP"
                </span>
              </h2>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/[0.06]">
              {[
                { val: '8+', lab: 'Years' },
                { val: '4',  lab: 'Genres' },
                { val: 'NO', lab: 'Oslo' },
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
                  <div className="text-sm font-heading text-dip-muted mt-1 tracking-wider uppercase">{s.lab}</div>
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
              <p className="font-body font-light text-dip-cream/40 text-sm leading-relaxed mt-4">
                Peak-hour specialist. Event Architect. Concept Builder. Resident DJ at KlubN Oslo.
                This isn't just mixing — it's sound direction.
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

            {/* Setup */}
            <div>
              <p className="label mb-4">Setup</p>
              <div className="flex flex-wrap gap-2">
                {['Serato Native', 'CDJ 3000', 'DJM 3-11', 'RANE ONE', 'XDJ-RZ', 'DDJ REV 7'].map(t => (
                  <span
                    key={t}
                    className="font-heading font-bold text-xs tracking-wide uppercase text-dip-rose/70 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Booking CTA */}
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
              <div className="flex items-center justify-between mt-4">
                <span className="font-script text-3xl text-dip-rose/60">Davis DiP</span>
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
