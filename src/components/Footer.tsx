export default function Footer() {
  return (
    <footer className="bg-dip-black py-10 px-8 md:px-16 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <span
          className="font-display font-black tracking-tight"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #E63020, #D44040)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          DJ DiP
        </span>

        <p className="font-body text-xs text-dip-muted/40 tracking-[0.2em] uppercase text-center">
          © {new Date().getFullYear()} DJ DiP · Urban Sound Fusion · Oslo, Norway
        </p>

        <div className="flex gap-6">
          <a
            href="https://instagram.com/dj_dip"
            target="_blank"
            rel="noreferrer"
            className="font-heading font-bold text-xs tracking-[0.15em] uppercase text-dip-muted/50 hover:text-dip-rose transition-colors"
          >
            Instagram
          </a>
          <a
            href="mailto:2djdip@gmail.com"
            className="font-heading font-bold text-xs tracking-[0.15em] uppercase text-dip-muted/50 hover:text-dip-rose transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
