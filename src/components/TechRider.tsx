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
    <section id="tech-rider" className="ed-section" aria-labelledby="tech-t">
      <div className="ed-wrap">
        <Reveal className="sec-head">
          <span className="sec-num" aria-hidden="true">08</span>
          <h2 className="sec-title" id="tech-t">Tech <i>Rider</i></h2>
          <p className="sec-kicker label">Preferred setup. Alternatives accepted — confirm in advance.</p>
        </Reveal>

        <RevealGroup className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-[color:var(--line)] border border-[color:var(--line)]">
          {gear.map(item => (
            <RevealItem
              key={item.category}
              className="bg-[color:var(--ink)] p-6 md:p-7 hover:bg-[color:var(--ink-3)] transition-colors duration-300"
            >
              <p className="label mb-4">{item.category}</p>
              <ul className="space-y-2.5 list-none p-0 m-0">
                {item.items.map(eq => (
                  <li key={eq} className="font-body font-light text-dip-cream/80 text-sm flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-dip-red" aria-hidden="true" />
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
