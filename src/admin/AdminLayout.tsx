import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const nav = [
  { to: '/builder/dashboard', label: 'Dashboard' },
  { to: '/builder/gallery',   label: 'Gallery' },
  { to: '/builder/content',   label: 'Content' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('admin-token')

  useEffect(() => {
    if (!token) navigate('/builder')
  }, [token, navigate])

  function logout() {
    sessionStorage.removeItem('admin-token')
    navigate('/builder')
  }

  return (
    <div className="min-h-screen bg-dip-black flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-dip-dark border-r border-white/[0.06] flex flex-col">
        <div className="p-6 border-b border-white/[0.06]">
          <img src="/images/dip-logo.png" alt="DJ DiP" className="h-12 object-contain" />
          <p className="label mt-3 text-dip-muted/60">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {nav.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-full font-heading font-bold text-sm tracking-wide transition-colors ${
                  isActive
                    ? 'bg-dip-red/20 text-dip-red'
                    : 'text-dip-muted hover:text-dip-cream hover:bg-white/[0.04]'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/[0.06]">
          <a
            href="/"
            target="_blank"
            className="block px-4 py-2.5 rounded-full font-heading font-bold text-sm text-dip-muted hover:text-dip-cream hover:bg-white/[0.04] transition-colors"
          >
            View Site ↗
          </a>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2.5 rounded-full font-heading font-bold text-sm text-dip-muted hover:text-dip-rose hover:bg-white/[0.04] transition-colors mt-1"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
