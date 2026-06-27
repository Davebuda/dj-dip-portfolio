import { useContent } from '../hooks/useContent'

export default function Footer() {
  const { contact: { email, phone }, social } = useContent()
  const telHref = `tel:${phone.replace(/\s/g, '')}`

  return (
    <footer className="relative z-[2] border-t border-[color:var(--line)] pt-[clamp(3rem,6vw,5rem)] pb-10 mt-[clamp(2rem,5vw,4rem)]">
      <div className="ed-wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-mark">DAVIS <i>DiP</i></div>
            <p className="foot-tag">DJ DiP — Davis · Resident DJ, KlubN Oslo. Urban Sound Fusion.</p>
          </div>
          <nav className="foot-social" aria-label="Social and contact">
            <a href={`https://instagram.com/${social.instagram}`} target="_blank" rel="noopener noreferrer">Instagram · @{social.instagram}</a>
            <a href={`https://soundcloud.com/${social.soundcloud}`} target="_blank" rel="noopener noreferrer">SoundCloud · {social.soundcloud}</a>
            <a href={`https://tiktok.com/@${social.tiktok}`} target="_blank" rel="noopener noreferrer">TikTok · @{social.tiktok}</a>
            <a href={`mailto:${email}`}>{email}</a>
            <a href={telHref}>{phone}</a>
          </nav>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} DJ DiP — Davis. All rights reserved.</span>
          <span className="built"><span className="dot" aria-hidden="true" />Built in Oslo ✶</span>
        </div>
      </div>
    </footer>
  )
}
