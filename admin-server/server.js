import express from 'express'
import multer from 'multer'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

const app = express()
const PORT = 3001
const DATA_DIR = '/data'
const GALLERY_DIR = path.join(DATA_DIR, 'gallery')
const CONTENT_FILE = path.join(DATA_DIR, 'content.json')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'djdip2024'

// Ensure dirs exist
fs.mkdirSync(GALLERY_DIR, { recursive: true })

app.use(cors())
app.use(express.json({ limit: '2mb' }))

// ── Auth ──────────────────────────────────────────────────────────────
const sessions = new Set()

app.post('/admin-api/login', (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) {
    const token = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessions.add(token)
    res.json({ token })
  } else {
    res.status(401).json({ error: 'Wrong password' })
  }
})

const auth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token || !sessions.has(token)) return res.status(401).json({ error: 'Unauthorized' })
  next()
}

// ── Content (public read, protected write) ───────────────────────────
app.get('/admin-api/content', (req, res) => {
  if (fs.existsSync(CONTENT_FILE)) {
    res.json(JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8')))
  } else {
    res.json(null)
  }
})

app.post('/admin-api/content', auth, (req, res) => {
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(req.body, null, 2))
  res.json({ ok: true })
})

// ── Gallery ──────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: GALLERY_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`)
  },
})
const upload = multer({ storage, limits: { fileSize: 15 * 1024 * 1024 } })

app.get('/admin-api/gallery', (req, res) => {
  const files = fs.existsSync(GALLERY_DIR)
    ? fs.readdirSync(GALLERY_DIR).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    : []
  res.json(files.map(f => ({ filename: f, url: `/gallery/${f}` })))
})

app.post('/admin-api/gallery', auth, upload.array('images', 30), (req, res) => {
  res.json(req.files.map(f => ({ filename: f.filename, url: `/gallery/${f.filename}` })))
})

app.delete('/admin-api/gallery/:filename', auth, (req, res) => {
  const fp = path.join(GALLERY_DIR, path.basename(req.params.filename))
  if (fs.existsSync(fp)) { fs.unlinkSync(fp); res.json({ ok: true }) }
  else res.status(404).json({ error: 'Not found' })
})

app.listen(PORT, () => console.log(`Admin API on :${PORT}`))
