const images = [
  '/images/gallery/109d4f51-c8d6-4774-9ccb-ee1b4549b46d.jpg',
  '/images/gallery/1ceadf56-22f4-4ffd-a9d0-cf70b46f21df.jpg',
  '/images/gallery/5ba4650a-c55b-4804-8e8a-d30e3c2cf265.jpg',
  '/images/gallery/752d80c8-6e2e-4af0-8544-98108bbab5fa.jpg',
  '/images/gallery/87705e9b-de73-4f18-bc06-fa2ea61ad4ad.jpg',
  '/images/gallery/8e39e7af-9f21-4d03-adc9-fc146fe094a3.jpg',
  '/images/gallery/99abec8a-1363-4e1d-b327-b60e35ce5b67.jpg',
  '/images/gallery/b69c3576-6931-4bea-bae0-c9859c7aa750.jpg',
  '/images/gallery/bb1f9178-7168-4b4f-8726-e3d7b81900a0.jpg',
  '/images/gallery/c9944a7a-3c83-4d27-b8af-c85dab8df88b.jpg',
  '/images/gallery/d3cdcef1-94b1-45f6-9477-977ea046f136.jpg',
  '/images/gallery/e69d0890-5c43-412e-b660-201a4d3eb86a.jpg',
  '/images/gallery/e6b81c00-95af-4ec7-a2e8-1df005d31add.jpg',
  '/images/gallery/ec4b814a-e0d1-47e3-9838-6b29485ed5da.jpg',
]

export default function Gallery() {
  // Duplicate for seamless loop
  const strip = [...images, ...images]

  return (
    <section className="bg-dip-black py-10 overflow-hidden">

      {/* Section label */}
      <p className="label text-center mb-6">KlubN · Gallery</p>

      {/* Scrolling strip */}
      <div className="relative">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #080808, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #080808, transparent)' }} />

        {/* Track */}
        <div
          className="flex gap-3"
          style={{
            width: 'max-content',
            animation: 'gallery-scroll 40s linear infinite',
          }}
        >
          {strip.map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-56 h-72 overflow-hidden rounded-xl"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <img
                src={src}
                alt={`KlubN ${(i % images.length) + 1}`}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
