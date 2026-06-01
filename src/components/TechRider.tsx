import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'

const gear = [
  { category: 'Software',     items: ['Serato Native'] },
  { category: 'Mixers',       items: ['DJM 3-11'] },
  { category: 'CDJ Players',  items: ['CDJ 3000', 'CDJ 2000NX5'] },
  { category: 'All-In-One',   items: ['XDJ-RZ', 'XDJ-RX', 'DDJ REV 5', 'DDJ REV 7', 'DDJ REV 10'] },
  { category: 'Controllers',  items: ['RANE ONE', 'DSJ 1000SRT'] },
  { category: 'Peripherals',  items: ['Professional Headphones', 'Booth Monitor'] },
]

export default function TechRider() {
  return (
    <section id="tech-rider" className="bg-dip-black py-16 md:py-20 px-8 md:px-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <Reveal>
            <p className="label mb-3">Technical</p>
            <h2 className="font-display text-5xl md:text-6xl text-dip-cream leading-none">
              TECH RIDER
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="hidden md:block max-w-[220px]">
            <p className="text-dip-text-muted font-body font-light text-sm text-right leading-relaxed">
              Preferred setup for optimal performance. Alternatives accepted — always confirm in advance.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-dip-rose/10">
          {gear.map(item => (
            <RevealItem
              key={item.category}
              className="bg-dip-dark p-5 md:p-6 hover:bg-dip-card transition-colors duration-300"
            >
              <p className="label mb-3">{item.category}</p>
              <ul className="space-y-2">
                {item.items.map(eq => (
                  <li key={eq} className="font-body font-light text-dip-cream/75 text-sm flex items-center gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #E63020, #BF2D1E)' }}
                      aria-hidden="true"
                    />
                    {eq}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
