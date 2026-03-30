import { motion } from 'framer-motion'
import { FaInstagram, FaSoundcloud, FaTiktok } from 'react-icons/fa6'
import { useContent } from '../hooks/useContent'

const TICKER_ITEMS = [
  'HipHop & RnB', '✦', 'Afrobeats', '✦', 'Shatta', '✦',
  'Amapiano', '✦', 'Urban Sound Fusion', '✦', 'Oslo Norway', '✦',
  'Nightlife Energy', '✦', '8+ Years Behind The Decks', '✦',
]

export default function Hero() {
  const content = useContent()
  const { email, phone } = content.contact
  const { instagram, soundcloud, tiktok } = content.social

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Dark overlay over the fixed backdrop */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 90% at 50% 45%, transparent 20%, rgba(8,8,8,0.85) 68%)',
        }}
      />

      {/* Ambient red glow — bottom-left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-dip-red/[0.12] blur-[120px] rounded-full pointer-events-none" />
      {/* Ambient yellow glow — top-right */}
      <div className="absolute top-0 right-0 w-[400px] h-[250px] bg-dip-yellow/[0.08] blur-[100px] rounded-full pointer-events-none" />

      {/* Ghost "DiP" watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[45vw] leading-none text-white/[0.02]">DiP</span>
      </div>

      {/* ── Content ── */}
      <div className="relative flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-6 md:px-14 pt-28 pb-6">

        {/* ── Main 2-column layout ── */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 items-stretch">

          {/* ── LEFT — Portrait + name ── */}
          <div className="flex flex-col z-10">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="relative overflow-hidden h-[500px] md:h-[620px]"
              style={{
                border: '1px solid rgba(234,230,0,0.18)',
                borderBottom: '3px solid #E63020',
              }}
            >
              <img
                src="/images/dip-portrait.png"
                alt="DJ DiP"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/[0.06] pointer-events-none" />
              <div
                className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.7), transparent)' }}
              />

              {/* Yellow corner accent — top-right */}
              <div className="absolute top-0 right-0 z-20 pointer-events-none">
                <div style={{ width: 52, height: 3, background: '#EAE600' }} />
                <div style={{ width: 3, height: 52, background: '#EAE600', marginLeft: 'auto' }} />
              </div>

              {/* Spinning text ring */}
              <div className="absolute top-5 right-5 z-20 pointer-events-none">
                <svg viewBox="0 0 120 120" className="w-24 h-24 animate-spin" style={{ animationDuration: '22s' }}>
                  <path id="circle" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" fill="none" />
                  <text style={{ fontSize: '10px', fontFamily: 'Cabinet Grotesk', letterSpacing: '3px', fill: 'rgba(212,64,64,0.45)' }}>
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
              {/* DJ — stroke outline */}
              <div className="leading-[0.82]">
                <span
                  className="font-display font-black block select-none"
                  style={{
                    fontSize: 'clamp(4.5rem, 12vw, 9rem)',
                    WebkitTextStroke: '2.5px #E63020',
                    color: 'transparent',
                    letterSpacing: '-0.04em',
                  }}
                >
                  DJ
                </span>
              </div>
              {/* DiP — gradient fill */}
              <div className="leading-[0.82]">
                <span
                  className="font-display font-black block"
                  style={{
                    fontSize: 'clamp(4.5rem, 12vw, 9rem)',
                    background: 'linear-gradient(135deg, #E63020 0%, #BF2D1E 55%, #D44040 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.04em',
                  }}
                >
                  DiP
                </span>
              </div>
              {/* DAVIS — white, wide tracking */}
              <div className="mt-2 leading-none">
                <span
                  className="font-display font-black text-white block"
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 5rem)',
                    letterSpacing: '0.22em',
                  }}
                >
                  DAVIS
                </span>
              </div>
              <p className="label mt-5">Resident DJ · KlubN · Oslo, Norway</p>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-5 mt-4"
            >
              <a href={`mailto:${email}`} className="flex items-center gap-2 font-body text-sm text-dip-muted hover:text-dip-rose transition-colors">
                <span className="text-dip-red">✉</span> {email}
              </a>
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-2 font-body text-sm text-dip-muted hover:text-dip-rose transition-colors">
                <span className="text-dip-red">✆</span> {phone}
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex items-center gap-4 mt-auto pt-8"
            >
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 rounded-2xl transition-transform duration-300 hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45, #FFDC80)', boxShadow: '0 4px 20px rgba(193,53,132,0.5)' }}
              >
                <FaInstagram className="text-white w-7 h-7" />
              </a>
              <a
                href={`https://soundcloud.com/${soundcloud}`}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 rounded-2xl transition-transform duration-300 hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #E63020, #8B1A10)', boxShadow: '0 4px 20px rgba(230,48,32,0.5)' }}
              >
                <FaSoundcloud className="text-white w-7 h-7" />
              </a>
              <a
                href={`https://tiktok.com/@${tiktok}`}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 rounded-2xl transition-transform duration-300 hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #010101, #1a1a2e)', boxShadow: '0 4px 20px rgba(105,201,208,0.4)', border: '1px solid rgba(105,201,208,0.3)' }}
              >
                <FaTiktok className="text-white w-7 h-7" />
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT — Glass bio card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="glass-card liquid-glass rounded-2xl p-8 md:p-10 flex flex-col gap-7 z-10"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="label">Urban Sound Fusion · Press Kit</p>
                <div className="flex items-center gap-3 text-dip-muted">
                  <span className="w-4 h-px bg-dip-rose/40" />
                  <span className="font-heading font-bold text-xs tracking-widest uppercase">Oslo</span>
                </div>
              </div>
              <h2
                className="font-display font-black text-dip-cream leading-none"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 6.5rem)', letterSpacing: '-0.04em' }}
              >
                DAVIS<br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #E63020 0%, #BF2D1E 55%, #D44040 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  &ldquo;DiP&rdquo;
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
                    className="font-display font-black leading-none"
                    style={{
                      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                      background: 'linear-gradient(135deg, #E63020, #D44040)',
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
              <p className="font-body font-light text-dip-cream/75 text-base leading-relaxed">{content.bio}</p>
              <p className="font-body font-light text-dip-cream/55 text-sm leading-relaxed mt-3">{content.bio2}</p>
            </div>

            {/* Key Stages */}
            <div>
              <p className="label mb-4">Key Stages</p>
              <ul className="space-y-2.5">
                {content.stages.map((v, i) => (
                  <li key={v} className="flex items-center gap-3">
                    <span className="font-mono text-xs text-dip-red/55">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-body text-sm text-dip-cream/75">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Genre tags */}
            <div>
              <p className="label mb-4">Genres</p>
              <div className="flex flex-wrap gap-2">
                {content.genres.map(g => (
                  <span
                    key={g}
                    className="font-heading font-bold text-[11px] tracking-wide uppercase text-dip-rose/90 bg-dip-red/[0.1] border border-dip-red/[0.28] rounded-full px-4 py-1.5"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Booking CTAs */}
            <div className="mt-auto">
              <div className="divider mb-6" />
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={`mailto:${email}`} className="btn-brand flex-1 text-center text-sm">
                  Email For Booking →
                </a>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn-outline flex-1 text-center text-sm">
                  {phone}
                </a>
              </div>
              <div className="flex items-center justify-between mt-5">
                <span className="font-script text-3xl text-dip-rose/55">Davis DiP</span>
                <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer" className="label hover:text-dip-cream transition-colors">
                  @{instagram}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Genre ticker strip ── */}
      <div className="relative z-20 w-full border-t border-white/[0.07] overflow-hidden bg-black/50 backdrop-blur-sm">
        <div className="genre-ticker whitespace-nowrap py-3">
          {[0, 1, 2, 3].flatMap(k =>
            TICKER_ITEMS.map((item, i) => (
              <span
                key={`${k}-${i}`}
                className={`inline-block px-5 font-heading font-bold text-[10px] tracking-[0.3em] uppercase ${
                  item === '✦' ? 'text-dip-red/60' : 'text-white/40'
                }`}
              >
                {item}
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
