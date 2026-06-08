import 'dotenv/config'
import express from 'express'
import multer from 'multer'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const app = express()
const PORT = 3001
const DATA_DIR = '/data'
const GALLERY_DIR = path.join(DATA_DIR, 'gallery')
const CONTENT_FILE = path.join(DATA_DIR, 'content.json')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'djdip2024'
const N8N_SECRET = process.env.N8N_SECRET || ''

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
const upload = multer({ storage, limits: { fileSize: 500 * 1024 * 1024 } })

app.get('/admin-api/gallery', (req, res) => {
  const files = fs.existsSync(GALLERY_DIR)
    ? fs.readdirSync(GALLERY_DIR).filter(f => /\.(jpg|jpeg|png|webp|mp4|mov|webm|ogg)$/i.test(f))
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

// ── n8n ingest (separate x-n8n-secret auth, idempotent append) ────────
const readContent = () =>
  fs.existsSync(CONTENT_FILE) ? JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8')) : {}
const writeContent = (c) =>
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(c, null, 2))

const ingestAuth = (req, res, next) => {
  const provided = req.headers['x-n8n-secret']
  if (!N8N_SECRET || typeof provided !== 'string') return res.status(401).json({ error: 'Unauthorized' })
  const a = Buffer.from(provided)
  const b = Buffer.from(N8N_SECRET)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return res.status(401).json({ error: 'Unauthorized' })
  next()
}

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

// Re-host a remote image into GALLERY_DIR so IG CDN URLs don't rot. Never throws.
async function rehostImage(url) {
  if (!url || typeof url !== 'string' || !/^https?:\/\//i.test(url)) return null
  try {
    const resp = await fetch(url)
    if (!resp.ok) return null
    const buf = Buffer.from(await resp.arrayBuffer())
    let ext = path.extname(new URL(url).pathname).toLowerCase()
    if (!ext) ext = '.jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
    fs.writeFileSync(path.join(GALLERY_DIR, filename), buf)
    return `/gallery/${filename}`
  } catch {
    return null
  }
}

const ingestEvents = (req, res) => {
  const b = req.body || {}
  if (!b.title || !b.source_post_id) return res.status(400).json({ error: 'title and source_post_id are required' })
  const content = readContent()
  if (!Array.isArray(content.events)) content.events = []
  if (content.events.find(e => e.sourcePostId === b.source_post_id)) return res.status(200).json({ created: false })
  const venue = b.venue || {}
  const id = genId()
  content.events.push({
    id,
    date: b.date || '',
    venue: venue.name || '',
    city: venue.city || '',
    ticketUrl: b.ticketingUrl || undefined,
    status: b.status || undefined,
    title: b.title,
    address: venue.address || undefined,
    country: venue.country || undefined,
    price: b.price || undefined,
    description: b.description || undefined,
    imageUrl: b.imageUrl || undefined,
    sourcePostId: b.source_post_id,
    sourcePlatform: b.source_platform || undefined,
  })
  writeContent(content)
  res.status(201).json({ created: true, id })
}

const ingestMixes = (req, res) => {
  const b = req.body || {}
  if (!b.title || !b.source_post_id) return res.status(400).json({ error: 'title and source_post_id are required' })
  const content = readContent()
  if (!Array.isArray(content.mixes)) content.mixes = []
  if (content.mixes.find(m => m.sourcePostId === b.source_post_id)) return res.status(200).json({ created: false })
  const id = genId()
  content.mixes.push({
    id,
    title: b.title,
    venue: '',
    genreTags: [],
    duration: b.duration || '',
    bpm: '',
    soundcloudUrl: b.url || '',
    tracklist: [],
    source: b.source || undefined,
    url: b.url || undefined,
    thumbnailUrl: b.thumbnailUrl || undefined,
    description: b.description || undefined,
    publishedAt: b.publishedAt || undefined,
    sourcePostId: b.source_post_id,
    sourcePlatform: b.source_platform || undefined,
  })
  writeContent(content)
  res.status(201).json({ created: true, id })
}

// Past-shows / archive ingest — Gate ② draft lane (reviewStatus:'suggested', re-hosted media).
// Async handler MUST try/catch its whole body: Express 4 does NOT auto-catch async rejections.
async function ingestArchive(req, res) {
  try {
    const b = req.body || {}
    if (!b.title || !b.source_post_id) return res.status(400).json({ error: 'title and source_post_id are required' })
    const content = readContent()
    if (!Array.isArray(content.archive)) content.archive = []
    if (content.archive.find(a => a.sourcePostId === b.source_post_id)) return res.status(200).json({ created: false })
    const rehosted = await rehostImage(b.imageUrl)
    const id = genId()
    content.archive.push({
      id,
      title: b.title,
      date: b.date || '',
      venue: (b.venue && b.venue.name) || (typeof b.venue === 'string' ? b.venue : ''),
      city: (b.venue && b.venue.city) || b.city || '',
      ticketUrl: b.ticketingUrl || undefined,
      imageUrl: rehosted || '',
      description: b.description || undefined,
      tags: Array.isArray(b.tags) ? b.tags : [],
      reviewStatus: 'suggested',
      sourcePostId: b.source_post_id,
      sourcePlatform: b.source_platform || undefined,
      createdAt: new Date().toISOString(),
    })
    writeContent(content)
    res.status(201).json({ created: true, id, rehosted: rehosted !== null })
  } catch {
    res.status(500).json({ error: 'ingest failed' })
  }
}

// Registered under both prefixes (nginx proxies /admin-api/; /api/ works if a proxy rule is added)
app.post('/api/ingest/events', ingestAuth, ingestEvents)
app.post('/api/ingest/mixes', ingestAuth, ingestMixes)
app.post('/api/ingest/archive', ingestAuth, ingestArchive)
app.post('/admin-api/ingest/events', ingestAuth, ingestEvents)
app.post('/admin-api/ingest/mixes', ingestAuth, ingestMixes)
app.post('/admin-api/ingest/archive', ingestAuth, ingestArchive)

// ── Archive moderation (Gate ②, bearer auth) ─────────────────────────
const approveArchive = (req, res) => {
  const content = readContent()
  const item = Array.isArray(content.archive) ? content.archive.find(a => a.id === req.params.id) : undefined
  if (!item) return res.status(404).json({ error: 'Not found' })
  item.reviewStatus = 'published'
  writeContent(content)
  res.json({ ok: true })
}

const deleteArchive = (req, res) => {
  const content = readContent()
  if (!Array.isArray(content.archive)) return res.status(404).json({ error: 'Not found' })
  const idx = content.archive.findIndex(a => a.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  content.archive.splice(idx, 1)
  writeContent(content)
  res.json({ ok: true })
}

app.post('/api/archive/:id/approve', auth, approveArchive)
app.delete('/api/archive/:id', auth, deleteArchive)
app.post('/admin-api/archive/:id/approve', auth, approveArchive)
app.delete('/admin-api/archive/:id', auth, deleteArchive)

app.listen(PORT, () => console.log(`Admin API on :${PORT}`))
