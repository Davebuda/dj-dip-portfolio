import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FaSoundcloud } from 'react-icons/fa6'
import Reveal from './ui/Reveal'
import { useContent } from '../hooks/useContent'

/**
 * Mixes / Music — the #1 content gap for a working DJ.
 *
 * Honest by default: ships with NO fabricated sets. Until the artist adds
 * real SoundCloud URLs + tracklists (via the content store / admin), this
 * renders a truthful empty-state, never fake mixes.
 *
 * When mixes exist: a custom-chromed set list (left) drives a bespoke player
 * panel (right) backed by the SoundCloud HTML5 Widget API for real play/pause,
 * with a stylized red waveform (decoration synced to play state, NOT true FFT)
 * and an expandable tracklist.
 */

const SC_WIDGET_SRC = 'https://w.soundcloud.com/player/api.js'

let scLoaderPromise: Promise<void> | null = null
function loadSoundCloudApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.SC) return Promise.resolve()
  if (scLoaderPromise) return scLoaderPromise
  scLoaderPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SC_WIDGET_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('SC widget failed')))
      return
    }
    const s = document.createElement('script')
    s.src = SC_WIDGET_SRC
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('SC widget failed'))
    document.head.appendChild(s)
  })
  return scLoaderPromise
}

interface TracklistEntry {
  time: string
  title: string
}

interface Mix {
  id: string
  title: string
  venue: string
  genreTags: string[]
  duration: string
  bpm: string
  soundcloudUrl: string
  tracklist: TracklistEntry[]
}

// Intentionally empty until the artist supplies real sets.
// Shape kept compatible with a future content-store `mixes[]` and a later
// swap to self-hosted mp3 excerpts.
const MIXES: Mix[] = []

const WAVE_BARS = 32

function Waveform({ playing }: { playing: boolean }) {
  const reduceMotion = useReducedMotion()
  // Static heights so SSR / reduced-motion render is stable and visible.
  const heights = useRef(
    Array.from({ length: WAVE_BARS }, (_, i) => 30 + Math.abs(Math.sin(i * 0.9)) * 60),
  )

  return (
    <div
      className="flex items-end gap-[3px] h-16 w-full"
      role="img"
      aria-label={playing ? 'Audio playing' : 'Audio paused'}
    >
      {heights.current.map((h, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-full bg-dip-red/70"
          style={{ height: `${h}%` }}
          animate={
            playing && !reduceMotion
              ? { scaleY: [1, 0.4 + Math.abs(Math.sin(i)) * 0.8, 1] }
              : { scaleY: 1 }
          }
          transition={
            playing && !reduceMotion
              ? { duration: 0.6 + (i % 5) * 0.12, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
        />
      ))}
    </div>
  )
}

function MixPlayer({ mix }: { mix: Mix }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<SCWidget | null>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [tracklistOpen, setTracklistOpen] = useState(false)

  const embedSrc =
    `https://w.soundcloud.com/player/?url=${encodeURIComponent(mix.soundcloudUrl)}` +
    '&color=%23E63020&auto_play=false&hide_related=true&show_comments=false' +
    '&show_user=true&show_reposts=false&visual=false'

  useEffect(() => {
    let cancelled = false
    setReady(false)
    setPlaying(false)
    loadSoundCloudApi()
      .then(() => {
        if (cancelled || !iframeRef.current || !window.SC) return
        const widget = window.SC.Widget(iframeRef.current)
        widgetRef.current = widget
        const { Events } = window.SC.Widget
        widget.bind(Events.READY, () => !cancelled && setReady(true))
        widget.bind(Events.PLAY, () => !cancelled && setPlaying(true))
        widget.bind(Events.PAUSE, () => !cancelled && setPlaying(false))
        widget.bind(Events.FINISH, () => !cancelled && setPlaying(false))
      })
      .catch(() => {
        /* iframe still works as a native SoundCloud player even without the API */
      })
    return () => {
      cancelled = true
      widgetRef.current = null
    }
  }, [mix.id])

  const toggle = () => {
    if (widgetRef.current) widgetRef.current.toggle()
  }

  return (
    <div className="bg-dip-dark border border-dip-rose/15 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-3xl md:text-4xl text-dip-cream leading-tight">
            {mix.title}
          </h3>
          <p className="font-body text-sm text-dip-text-muted mt-1">{mix.venue}</p>
        </div>
        <div className="text-right font-mono text-xs text-dip-text-muted leading-relaxed shrink-0">
          <div>{mix.duration}</div>
          <div className="text-dip-red">{mix.bpm} BPM</div>
        </div>
      </div>

      {/* Transport + waveform */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          disabled={!ready}
          aria-label={playing ? `Pause ${mix.title}` : `Play ${mix.title}`}
          className="shrink-0 w-14 h-14 rounded-full bg-dip-red text-white flex items-center justify-center text-xl transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-dip-cream"
        >
          <span aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
        </button>
        <Waveform playing={playing} />
      </div>

      {/* Genre tags */}
      <div className="flex flex-wrap gap-2">
        {mix.genreTags.map(tag => (
          <span
            key={tag}
            className="font-heading font-bold text-[11px] tracking-wide uppercase text-dip-rose/90 bg-dip-red/[0.1] border border-dip-red/[0.28] rounded-full px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* SoundCloud iframe — the real audio engine. Always present so the set
          plays even if the JS Widget API fails to attach. */}
      <iframe
        ref={iframeRef}
        title={`SoundCloud player — ${mix.title}`}
        width="100%"
        height="120"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={embedSrc}
        className="rounded-xl w-full"
      />

      {/* Expandable tracklist */}
      {mix.tracklist.length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setTracklistOpen(o => !o)}
            aria-expanded={tracklistOpen}
            className="label flex items-center gap-2 hover:text-dip-cream transition-colors min-h-[44px]"
          >
            Tracklist
            <span aria-hidden="true" className="text-dip-red">{tracklistOpen ? '−' : '+'}</span>
          </button>
          <AnimatePresence initial={false}>
            {tracklistOpen && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden mt-3 space-y-2"
              >
                {mix.tracklist.map((t, i) => (
                  <li key={i} className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-dip-red/70 w-12 shrink-0">{t.time}</span>
                    <span className="font-body text-sm text-dip-cream/80">{t.title}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default function Mixes() {
  const { social } = useContent()
  const [selectedId, setSelectedId] = useState(MIXES[0]?.id ?? null)
  const selected = MIXES.find(m => m.id === selectedId) ?? null
  const hasMixes = MIXES.length > 0

  return (
    <section id="mixes" className="bg-dip-black py-24 md:py-32 px-8 md:px-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <p className="label mb-4">Music</p>
          <h2 className="font-display text-7xl sm:text-8xl md:text-[9rem] text-dip-cream leading-none">
            MIXES
          </h2>
        </Reveal>

        {hasMixes ? (
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-12 items-start">
            {/* Set list */}
            <Reveal>
              <ul className="space-y-2">
                {MIXES.map((mix, i) => {
                  const active = mix.id === selectedId
                  return (
                    <li key={mix.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(mix.id)}
                        aria-pressed={active}
                        className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-dip-red ${
                          active
                            ? 'border-dip-red/50 bg-dip-red/[0.06]'
                            : 'border-dip-rose/10 hover:border-dip-rose/30 hover:bg-dip-card'
                        }`}
                      >
                        <span className="font-mono text-sm text-dip-red/70 w-8 shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-heading font-bold text-base text-dip-cream truncate">
                            {mix.title}
                          </span>
                          <span className="block font-body text-xs text-dip-text-muted truncate">
                            {mix.venue} · {mix.duration}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </Reveal>

            {/* Player */}
            <Reveal delay={0.1}>
              {selected && <MixPlayer mix={selected} />}
            </Reveal>
          </div>
        ) : (
          // HONEST empty-state — no fabricated sets.
          <Reveal>
            <div className="border border-dashed border-dip-rose/20 rounded-2xl p-10 md:p-14 text-center max-w-2xl">
              <p className="font-display text-3xl md:text-4xl text-dip-cream leading-tight mb-4">
                Sets dropping soon.
              </p>
              <p className="font-body font-light text-dip-text-muted text-base leading-relaxed mb-8">
                Signature mixes with full tracklists land here. In the meantime,
                catch the latest recordings straight from the source.
              </p>
              <a
                href={`https://soundcloud.com/${social.soundcloud}`}
                target="_blank"
                rel="noreferrer"
                className="btn-brand inline-flex items-center gap-2 text-sm"
              >
                <FaSoundcloud aria-hidden="true" className="w-5 h-5" />
                Listen on SoundCloud
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
