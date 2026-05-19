// ─────────────────────────────────────────────────────────────────────────────
// Entry point — Express app
// ─────────────────────────────────────────────────────────────────────────────

import express from 'express'
import cors from 'cors'
import menuRoutes from './routes/menuRoutes'

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001

const app = express()

// ── Middleware ───────────────────────────────────────────────────────────────

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
    optionsSuccessStatus: 204,
  })
)

app.use(express.json({ limit: '100kb' }))

// ── Health check ─────────────────────────────────────────────────────────────

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── API routes ───────────────────────────────────────────────────────────────

app.use('/api/nutricion', menuRoutes)

// ── 404 handler ──────────────────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint no encontrado',
    },
  })
})

// ── Global error handler ─────────────────────────────────────────────────────

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[server] Unhandled error:', err)
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Error interno del servidor',
    },
  })
})

// ── Start ─────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`[server] Backend corriendo en http://localhost:${PORT}`)
  console.log(`[server] POST http://localhost:${PORT}/api/nutricion/crear-menu`)
})

export default app
