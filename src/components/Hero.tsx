import Reveal from './ui/Reveal'
import { FaInstagram, FaSoundcloud, FaTiktok } from 'react-icons/fa6'
import { useContent } from '../hooks/useContent'

/** Split a stage string like "KlubN — Resident" into { name, tag }. */
function splitStage(s: string): { name: string; tag?: string } {
  const parts = s.split(/\s+[—-]\s+/)
  if (parts.length >= 2) return { name: parts[0].trim(), tag: parts.slice(1).join(' — ').trim() }
  return { name: s.trim() }
}

export default function Hero() {
  const content = useContent()
  const { email, phone } = content.contact
  const { instagram, soundcloud, tiktok } = content.social
  const telHref = `tel:${phone.replace(/\s/g, '')}`

  return (
    <section className="ed-section relative overflow-hidden pt-24" aria-labelledby="hero-name">
      <span id="top" className="absolute -top-20" aria-hidden="true" />

      {/* Ghost "DiP" watermark */}
      <div className="ghost" aria-hidden="true"><span>DiP</span></div>

      <div className="ed-wrap">
        <div className="hero-grid">

          {/* ── Portrait column ── */}
          <Reveal className="portrait-card">
            <div className="portrait">
              <img
                src="/images/dip-portrait.png"
                alt="DJ DiP — Davis, Oslo DJ and event architect"
                width={1581}
                height={1219}
                fetchPriority="high"
              />
              <span className="tag">Live · KlubN Oslo</span>
              <div className="spin-ring" aria-hidden="true">
                <svg viewBox="0 0 120 120">
                  <defs>
                    <path id="ringpath" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" fill="none" />
                  </defs>
                  <text>
                    <textPath href="#ringpath" startOffset="0">
                      URBAN · SOUND · FUSION · OSLO ·{' '}
                    </textPath>
                  </text>
                </svg>
                <div className="hub"><b /></div>
              </div>
            </div>

            <div className="lockup">
              <div className="lk-kicker">
                <span className="pulse" aria-hidden="true" />
                <span className="label label-red">Resident · KlubN · Oslo</span>
              </div>

              {/* The page's single, readable <h1>. Accessible name reads
                  "DJ DiP — Davis"; the visual glyphs are aria-hidden. */}
              <h1 id="hero-name" className="name">
                <span className="sr-only">DJ DiP — Davis. Resident DJ at KlubN, Oslo.</span>
                <span className="dj" aria-hidden="true">DJ D<i>i</i>P</span>
                <span className="davis" aria-hidden="true">DAVIS</span>
              </h1>

              <p className="tagline">
                <b>Urban Sound Fusion.</b> Peak-hour sets built on intentional genre bridges and
                production-led transitions.
              </p>

              <div className="contact-row">
                <a className="chip" href={`mailto:${email}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  {email}
                </a>
                <a className="chip" href={telHref}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                  {phone}
                </a>
              </div>

              <div className="socials">
                <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer" aria-label={`Instagram @${instagram}`}>
                  <FaInstagram aria-hidden="true" />
                </a>
                <a href={`https://soundcloud.com/${soundcloud}`} target="_blank" rel="noreferrer" aria-label={`SoundCloud ${soundcloud}`}>
                  <FaSoundcloud aria-hidden="true" />
                </a>
                <a href={`https://tiktok.com/@${tiktok}`} target="_blank" rel="noreferrer" aria-label={`TikTok @${tiktok}`}>
                  <FaTiktok aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* ── Press kit column ── */}
          <Reveal delay={0.12} className="presskit" aria-label="Press kit">
            <div className="pk-head">
              <div className="pk-mark">DAVIS <i>DiP</i></div>
              <div className="pk-label">Press Kit · 2026</div>
            </div>

            <div className="pk-stats">
              <div className="pk-stat"><b>8<em>+</em></b><span>Years</span></div>
              <div className="pk-stat"><b>{content.genres.length}</b><span>Genres</span></div>
              <div className="pk-stat"><b>N<em>O</em></b><span>Based</span></div>
            </div>

            <p className="pk-bio">{content.bio}</p>

            <div className="pk-stages">
              <h4>Key Stages</h4>
              <ol className="list-none m-0 p-0">
                {content.stages.map((s, i) => {
                  const { name, tag } = splitStage(s)
                  return (
                    <li key={s} className="ks-row">
                      <span className="ks-name"><em>{String(i + 1).padStart(2, '0')}</em>{name}</span>
                      {tag && <span className="ks-tag">{tag}</span>}
                    </li>
                  )
                })}
              </ol>
            </div>

            <div className="genres-chips">
              {content.genres.map(g => (
                <span key={g} className="gchip">{g}</span>
              ))}
            </div>

            <div className="pk-cta">
              <a className="btn-brand" href={`mailto:${email}`}>Email booking</a>
              <a className="btn-outline" href={telHref}>{phone}</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
