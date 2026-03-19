export default function Footer() {
  return (
    <footer className="bg-dip-black py-8 px-8 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-xl tracking-widest text-dip-muted/60">DJ DiP</span>

        <p className="text-xs font-body font-light text-dip-muted/30 tracking-[0.2em] uppercase text-center">
          © {new Date().getFullYear()} DJ DiP · Urban Sound Fusion · Oslo, Norway
        </p>

        <div className="flex gap-6">
          <a
            href="https://instagram.com/dj_dip"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-body font-medium tracking-[0.2em] uppercase text-dip-muted/40 hover:text-dip-rose transition-colors"
          >
            Instagram
          </a>
          <a
            href="mailto:2djdip@gmail.com"
            className="text-xs font-body font-medium tracking-[0.2em] uppercase text-dip-muted/40 hover:text-dip-rose transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
