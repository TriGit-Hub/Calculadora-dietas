// ─────────────────────────────────────────────────────────────────────────────
// Rutas: /api/nutricion
// ─────────────────────────────────────────────────────────────────────────────

import { Router } from 'express'
import { crearMenuHandler } from '../controllers/menuController'

const router = Router()

/**
 * POST /api/nutricion/crear-menu
 *
 * Genera uno o varios menús diarios basados en intercambios nutricionales.
 *
 * Body: CrearMenuInput
 * Response: CrearMenuOutput | ErrorOutput
 */
router.post('/crear-menu', crearMenuHandler)

export default router
