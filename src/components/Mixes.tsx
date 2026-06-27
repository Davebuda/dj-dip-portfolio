import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FaYoutube } from 'react-icons/fa6'
import Reveal from './ui/Reveal'
import { useContent, type Mix } from '../hooks/useContent'

/**
 * 02 — Recorded sets.
 *
 * Honest by default: ships with NO fabricated sets and promises nothing more
 * than what actually exists. Currently that is ONE verified recording — DJ DiP's
 * YouTube set (from his klubn.no profile / the KlubN channel) — rendered as a
 * single featured player. No "more coming" copy, no fake mixes.
 *
 * A set carries EITHER a `youtubeUrl` (a real video embed) or a `soundcloudUrl`
 * (the SoundCloud HTML5 Widget API for real play/pause + waveform). With one
 * mix the set list is omitted; with several, an editorial set list drives the
 * player.
 */

/* ── YouTube ─────────────────────────────────────────────────────────── */

function youTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
  return m ? m[1] : null
}

function YouTubeMix({ mix }: { mix: Mix }) {
  const id = mix.youtubeUrl ? youTubeId(mix.youtubeUrl) : null

  return (
    <div className="presskit !rounded-[var(--r-lg)] gap-6">
      <div className="pk-head">
        <div>
          <h3 className="mix-title">{mix.title}</h3>
          <p className="font-mono text-xs text-dip-text-muted mt-1">{mix.venue}</p>
        </div>
        {(mix.duration || mix.bpm) && (
          <div className="text-right font-mono text-xs text-dip-text-muted leading-relaxed shrink-0">
            {mix.duration && <div>{mix.duration}</div>}
            {mix.bpm && <div className="text-dip-rose">{mix.bpm} BPM</div>}
          </div>
        )}
      </div>

      {id ? (
        <div className="relative w-full mt-6 rounded-xl overflow-hidden border border-white/[0.08]" style={{ aspectRatio: '16 / 9' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
            title={`YouTube — ${mix.title}`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        // URL we couldn't parse — link out rather than show a broken embed.
        <a href={mix.youtubeUrl} target="_blank" rel="noreferrer" className="btn-brand mt-6">
          <FaYoutube aria-hidden="true" className="w-5 h-5" /> Watch on YouTube
        </a>
      )}

      <div className="mix-tags mt-5">
        {mix.genreTags.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      {mix.youtubeUrl && (
        <a
          href={mix.youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className="label inline-flex items-center gap-2 hover:text-dip-cream transition-colors min-h-[44px] mt-1"
        >
          <FaYoutube aria-hidden="true" className="w-4 h-4 text-dip-red" /> Watch on YouTube →
        </a>
      )}
    </div>
  )
}

/* ── SoundCloud ──────────────────────────────────────────────────────── */

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

const WAVE_BARS = 32

function Waveform({ playing }: { playing: boolean }) {
  const reduceMotion = useReducedMotion()
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

function SoundCloudMix({ mix }: { mix: Mix }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<SCWidget | null>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [tracklistOpen, setTracklistOpen] = useState(false)

  const embedSrc =
    `https://w.soundcloud.com/player/?url=${encodeURIComponent(mix.soundcloudUrl ?? '')}` +
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
    <div className="presskit !rounded-[var(--r-lg)] gap-6">
      <div className="pk-head">
        <div>
          <h3 className="mix-title">{mix.title}</h3>
          <p className="font-mono text-xs text-dip-text-muted mt-1">{mix.venue}</p>
        </div>
        {(mix.duration || mix.bpm) && (
          <div className="text-right font-mono text-xs text-dip-text-muted leading-relaxed shrink-0">
            {mix.duration && <div>{mix.duration}</div>}
            {mix.bpm && <div className="text-dip-rose">{mix.bpm} BPM</div>}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button
          type="button"
          onClick={toggle}
          disabled={!ready}
          aria-label={playing ? `Pause ${mix.title}` : `Play ${mix.title}`}
          className={`play-btn ${playing ? 'on' : ''}`}
        >
          {playing ? (
            <svg viewBox="0 0 12 14" width="14" height="14" fill="currentColor" aria-hidden="true"><rect x="0" y="0" width="4" height="14" /><rect x="8" y="0" width="4" height="14" /></svg>
          ) : (
            <svg viewBox="0 0 12 14" width="14" height="14" fill="currentColor" aria-hidden="true" style={{ marginLeft: 2 }}><path d="M0 0l12 7-12 7z" /></svg>
          )}
        </button>
        <Waveform playing={playing} />
      </div>

      <div className="mix-tags mt-5">
        {mix.genreTags.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <iframe
        ref={iframeRef}
        title={`SoundCloud player — ${mix.title}`}
        width="100%"
        height="120"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={embedSrc}
        className="rounded-xl w-full mt-5"
      />

      {mix.tracklist.length > 0 && (
        <div className="mt-5">
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
                className="overflow-hidden mt-3 space-y-2 list-none p-0"
              >
                {mix.tracklist.map((t, i) => (
                  <li key={i} className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-dip-rose w-12 shrink-0">{t.time}</span>
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

function MixPlayer({ mix }: { mix: Mix }) {
  return mix.youtubeUrl ? <YouTubeMix mix={mix} /> : <SoundCloudMix mix={mix} />
}

/* ── Section ─────────────────────────────────────────────────────────── */

export default function Mixes() {
  const { mixes = [] } = useContent()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = mixes.find(m => m.id === selectedId) ?? mixes[0] ?? null
  const single = mixes.length === 1

  return (
    <section id="mixes" className="ed-section" aria-labelledby="mixes-t">
      <div className="ed-wrap">
        <Reveal className="sec-head">
          <span className="sec-num" aria-hidden="true">02</span>
          <h2 className="sec-title" id="mixes-t">Recorded <i>set</i></h2>
          <p className="sec-kicker label">Production-led transitions, mature BPM control.</p>
        </Reveal>

        {mixes.length === 0 ? null : single ? (
          // ONE verified set — a single featured player. Nothing more promised.
          <Reveal className="max-w-3xl">
            {selected && <MixPlayer mix={selected} />}
          </Reveal>
        ) : (
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-12 items-start">
            <Reveal>
              <ul className="list-none m-0 p-0">
                {mixes.map((mix, i) => {
                  const active = mix.id === selected?.id
                  return (
                    <li key={mix.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(mix.id)}
                        aria-pressed={active}
                        className={`mix-row ${i === 0 ? 'first' : ''} ${active ? 'active' : ''}`}
                      >
                        <span className={`play-btn ${active ? 'on' : ''}`} aria-hidden="true">
                          <svg viewBox="0 0 12 14" width="14" height="14" fill="currentColor" style={{ marginLeft: 2 }}><path d="M0 0l12 7-12 7z" /></svg>
                        </span>
                        <span className="min-w-0">
                          <span className="mix-title block truncate">{mix.title}</span>
                          <span className="mix-tags">
                            {mix.genreTags.map(tag => <span key={tag}>{tag}</span>)}
                          </span>
                        </span>
                        {mix.duration && <span className="mix-spec">{mix.duration}<small>Duration</small></span>}
                        {mix.bpm && <span className="mix-bpm">{mix.bpm}<small>BPM</small></span>}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              {selected && <MixPlayer mix={selected} />}
            </Reveal>
          </div>
        )}
      </div>
    </section>
  )
}
