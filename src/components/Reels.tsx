import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { FaTiktok } from 'react-icons/fa6'
import Reveal from './ui/Reveal'
import { useContent } from '../hooks/useContent'

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
 * clips. CONTENT-STORE SWAP PATH mirrors Mixes/Dates: add `reels[]` to
 * Content/DEFAULTS in src/hooks/useContent.ts, then swap `REELS` for
 * `const { reels } = useContent()`. Drop the mp4/poster files in public/reels/.
 */

export interface Reel {
  id: string
  /** Self-hosted clip, e.g. '/reels/klubn-night.mp4'. */
  src: string
  /** Poster image (WebP/AVIF/jpg), e.g. '/reels/klubn-night.webp'. */
  poster: string
  /** Accessible description of the clip. */
  caption: string
}

// Intentionally empty until the artist supplies real clips.
const REELS: Reel[] = []

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
        className="group block w-full aspect-[9/16] rounded-2xl overflow-hidden bg-dip-card relative focus:outline-none focus-visible:ring-2 focus-visible:ring-dip-red"
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
  const { social } = useContent()
  const hasReels = REELS.length > 0

  return (
    <section id="reels" className="bg-dip-black py-16 md:py-20 overflow-x-hidden border-t border-dip-rose/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
          <div className="flex items-baseline gap-4">
            <p className="label">Motion</p>
            <h2 className="font-display text-5xl md:text-6xl text-dip-cream leading-none">
              REELS
            </h2>
          </div>
          <p className="text-dip-text-muted font-body font-light text-sm max-w-xs sm:text-right leading-relaxed">
            Floor energy, captured.
          </p>
        </div>
      </div>

      {hasReels ? (
        // overflow-x-auto on the TRACK (not the page); section is overflow-x-hidden.
        <div className="w-full overflow-x-auto overflow-y-hidden">
          <ul className="flex gap-4 snap-x snap-mandatory list-none m-0 px-8 md:px-16 pb-2 w-max">
            {REELS.map(reel => (
              <ReelCard key={reel.id} reel={reel} />
            ))}
          </ul>
        </div>
      ) : (
        // HONEST empty-state — no fabricated reels.
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <Reveal>
            <div className="border border-dashed border-dip-rose/20 rounded-2xl p-10 md:p-14 text-center max-w-2xl">
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
