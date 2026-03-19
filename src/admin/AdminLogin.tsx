import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/admin-api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      })
      if (res.ok) {
        const { token } = await res.json()
        sessionStorage.setItem('admin-token', token)
        navigate('/admin/dashboard')
      } else {
        setError('Wrong password.')
      }
    } catch {
      setError('Could not reach server.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-dip-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <img src="/images/dip-logo.png" alt="DJ DiP" className="h-20 mx-auto mb-8 object-contain" />
        <h1 className="font-display text-3xl text-dip-cream text-center mb-2">Admin</h1>
        <p className="label text-center mb-8">Portfolio Management</p>

        <form onSubmit={handleLogin} className="glass-card rounded-2xl p-8 space-y-5">
          <div>
            <label className="label mb-2 block">Password</label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              className="w-full bg-white/[0.06] border border-white/10 rounded-full px-4 py-3 text-dip-cream font-body text-sm focus:outline-none focus:border-dip-red/60 transition-colors"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>
          {error && <p className="text-dip-red font-body text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-brand w-full text-sm justify-center"
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <p className="text-dip-muted/40 text-xs text-center mt-6 font-body">
          DJ DiP · Portfolio CMS
        </p>
      </div>
    </div>
  )
}
