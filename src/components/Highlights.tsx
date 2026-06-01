import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'

const events = [
  {
    venue: 'KlubN',
    event: 'Resident DJ · Event Architect · Concept Builder',
    tags: ['Urban Sound Fusion', 'Oslo'],
    featured: true,
  },
  {
    venue: 'Gamba Beat Bar',
    event: 'Content Party',
    tags: ['HipHop & RnB', 'Shatta', 'Afrobeats'],
    featured: false,
  },
  {
    venue: "Kiki's House",
    event: 'Club Night',
    tags: ['HipHop & RnB', 'Dancehall', 'Afrobeats'],
    featured: false,
  },
  {
    venue: 'Old School Vibe',
    event: 'Throwback Night',
    tags: ['HipHop & RnB', 'Dancehall', 'Afrobeats'],
    featured: false,
  },
  {
    venue: 'Faksen Bar',
    event: 'Amapiano Scene',
    tags: ['Amapiano', 'Afro-House', 'Gqom'],
    featured: false,
  },
  {
    venue: 'Faksen Bar',
    event: 'Content Party',
    tags: ['HipHop & RnB', 'Shatta', 'Afrobeats'],
    featured: false,
  },
]

export default function Highlights() {
  return (
    <section id="stages" className="bg-dip-card py-16 md:py-20 px-8 md:px-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        <Reveal className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 mb-8">
          <div className="flex items-baseline gap-4">
            <p className="label">Residencies</p>
            <h2 className="font-display text-5xl md:text-6xl text-dip-cream leading-none">
              STAGES
            </h2>
          </div>
          <p className="text-dip-text-muted font-body font-light text-sm max-w-xs sm:text-right leading-relaxed">
            Resident sets · club nights · private events.
          </p>
        </Reveal>

        <RevealGroup stagger={0.06}>
          {events.map((ev, i) => (
            <RevealItem
              key={`${ev.venue}-${i}`}
              className={`group flex flex-col md:flex-row md:items-center justify-between py-5 border-b transition-all duration-300 ${
                ev.featured
                  ? 'border-dip-red/40 hover:border-dip-red'
                  : 'border-dip-rose/10 hover:border-dip-rose/30'
              }`}
            >
              <div className="flex items-center gap-5">
                <span
                  className={`font-mono text-base leading-none w-8 transition-colors duration-300 ${
                    ev.featured ? 'text-dip-red' : 'text-dip-red/25 group-hover:text-dip-red/60'
                  }`}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p
                    className={`font-heading font-bold text-base md:text-lg transition-colors duration-300 ${
                      ev.featured ? 'text-white' : 'text-dip-cream group-hover:text-white'
                    }`}
                  >
                    {ev.venue}
                    {ev.featured && (
                      <span className="ml-3 inline-block text-[11px] font-heading font-bold tracking-[0.16em] uppercase text-dip-red border border-dip-red/50 px-2 py-0.5 align-middle">
                        Resident
                      </span>
                    )}
                  </p>
                  <p className="text-dip-text-muted font-body font-light text-sm mt-0.5">
                    {ev.event}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3 md:mt-0 ml-[52px] md:ml-0">
                {ev.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[11px] font-heading font-bold tracking-wide text-dip-rose/75 bg-dip-rose/[0.07] border border-dip-rose/20 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
