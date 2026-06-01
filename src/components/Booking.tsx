import Reveal from './ui/Reveal'
import { useContent } from '../hooks/useContent'

export default function Booking() {
  const { contact: { email, phone } } = useContent()

  return (
    <section id="book" className="relative py-20 px-8 md:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-dip-dark" />
      <div className="absolute inset-0 bg-gradient-to-br from-dip-red/10 via-transparent to-dip-rose/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-dip-red/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <span className="font-display text-[14rem] md:text-[20rem] text-white/[0.02] leading-none">DiP</span>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">

        <Reveal>
          <p className="label mb-6">Get In Touch</p>
          <h2 className="font-display text-5xl md:text-7xl text-dip-cream leading-none">
            LET'S CREATE
          </h2>
          <p className="font-display italic text-3xl md:text-5xl text-dip-rose mt-2">
            something unforgettable
          </p>
        </Reveal>

        <Reveal delay={0.15} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-8">
          <a
            href={`mailto:${email}`}
            className="btn-brand w-full sm:w-auto text-sm px-8 min-h-[44px] group"
          >
            Email For Booking
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline-block" aria-hidden="true">→</span>
          </a>
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="btn-outline w-full sm:w-auto text-sm px-8 min-h-[44px]"
          >
            {phone}
          </a>
        </Reveal>

        <Reveal delay={0.3} className="flex items-center justify-center gap-6">
          <a href="https://instagram.com/dj_dip" target="_blank" rel="noreferrer" className="label inline-flex items-center min-h-[44px] hover:text-dip-cream transition-colors">
            @dj_dip
          </a>
          <span className="w-px h-4 bg-dip-rose/20" aria-hidden="true" />
          <a href="https://instagram.com/klub_n_oslo" target="_blank" rel="noreferrer" className="label inline-flex items-center min-h-[44px] hover:text-dip-cream transition-colors">
            @klub_n_oslo
          </a>
        </Reveal>
      </div>
    </section>
  )
}
