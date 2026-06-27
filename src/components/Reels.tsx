import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { FaTiktok } from 'react-icons/fa6'
import Reveal from './ui/Reveal'
import { useContent, type Reel } from '../hooks/useContent'

/**
 * Reels / Video (#reels)
 *
 * A horizontal snap-scroll rail of 9:16 video cards. Each card is a self-hosted
 * short mp4 with a poster image; the in-view card autoplays muted (one at a time
 * via IntersectionObserver), tap toggles play/pause. Reduced-motion / no-JS →
 * static poster only, no autoplay.
 *
 * Overflow safety (learned from the gallery 2403px blowout): the rail lives in a
 * `w-full overflow-x-auto` track and each card has a clamped, viewport-relative
 * max-width so the TRACK scrolls but the SECTION never pushes the page wider than
 * the viewport at 375px. The section itself is `overflow-x-hidden`.
 *
 * Honest by default: ships with NO fabricated reels. The `REELS` placeholder
 * array is empty — renders a truthful empty-state until the artist supplies real
 * clips. The `Reel` interface + `reels` field live in src/hooks/useContent.ts;
 * read via `const { reels = [] } = useContent()`. Clip/poster URLs are supplied
 * through the admin gallery upload flow (public/uploads or public/reels/).
 */

const CARD_W = 240 // px — 9:16 card; height derived via aspect-[9/16]

function ReelCard({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()
  const [playing, setPlaying] = useState(false)

  // Autoplay the card while it is in view (muted), pause when it leaves.
  // Disabled entirely under reduced-motion — poster only.
  useEffect(() => {
    const el = videoRef.current
    if (!el || reduceMotion) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          el.play().then(() => setPlaying(true)).catch(() => {})
        } else {
          el.pause()
          setPlaying(false)
        }
      },
      { threshold: [0, 0.6, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduceMotion])

  const toggle = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      el.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      el.pause()
      setPlaying(false)
    }
  }

  return (
    <li className="snap-start shrink-0" style={{ width: CARD_W, maxWidth: '78vw' }}>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause: ${reel.caption}` : `Play: ${reel.caption}`}
        className="tile group block w-full aspect-[9/16] relative focus:outline-none focus-visible:ring-2 focus-visible:ring-dip-red"
      >
        <video
          ref={videoRef}
          src={reel.src}
          poster={reel.poster}
          width={CARD_W}
          height={Math.round((CARD_W * 16) / 9)}
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/45 transition-colors">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white text-base ml-1" aria-hidden="true">▶</span>
            </div>
          </div>
        )}
      </button>
      <p className="mt-2 font-body font-light text-xs text-dip-text-muted leading-snug px-1">
        {reel.caption}
      </p>
    </li>
  )
}

export default function Reels() {
  const { social, reels = [] } = useContent()
  const hasReels = reels.length > 0

  return (
    <section id="reels" className="ed-section overflow-x-hidden" aria-labelledby="reels-t">
      <div className="ed-wrap mb-[clamp(2.5rem,5vw,4rem)]">
        <div className="sec-head !mb-0">
          <span className="sec-num" aria-hidden="true">06</span>
          <h2 className="sec-title" id="reels-t">In <i>Motion</i></h2>
          <p className="sec-kicker label">Floor energy, captured.</p>
        </div>
      </div>

      {hasReels ? (
        // overflow-x-auto on the TRACK (not the page); section is overflow-x-hidden.
        <div className="w-full overflow-x-auto overflow-y-hidden">
          <ul className="flex gap-4 snap-x snap-mandatory list-none m-0 px-8 md:px-16 pb-2 w-max">
            {reels.map(reel => (
              <ReelCard key={reel.id} reel={reel} />
            ))}
          </ul>
        </div>
      ) : (
        // HONEST empty-state — no fabricated reels.
        <div className="ed-wrap">
          <Reveal>
            <div className="presskit !rounded-[var(--r-lg)] max-w-2xl text-center items-center">
              <p className="font-display text-3xl md:text-4xl text-dip-cream leading-tight mb-4">
                Clips coming soon.
              </p>
              <p className="font-body font-light text-dip-text-muted text-base leading-relaxed mb-8">
                Short sets and floor moments will live here. For now, the full
                feed is on TikTok.
              </p>
              <a
                href={`https://tiktok.com/@${social.tiktok}`}
                target="_blank"
                rel="noreferrer"
                className="btn-brand inline-flex items-center gap-2 text-sm"
              >
                <FaTiktok aria-hidden="true" className="w-4 h-4" />
                Watch on TikTok
              </a>
            </div>
          </Reveal>
        </div>
      )}
    </section>
  )
}
