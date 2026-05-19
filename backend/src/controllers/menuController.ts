// ─────────────────────────────────────────────────────────────────────────────
// Controller: POST /api/nutricion/crear-menu
// ─────────────────────────────────────────────────────────────────────────────

import type { Request, Response } from 'express'
import { ZodError } from 'zod'
import { CrearMenuSchema } from '../validators/menuValidator'
import { generarMenuMultiDia } from '../services/menuService'
import type { CategoriaAlimento } from '../types/alimentos.types'
import type { ApiResponse } from '../types/menu.types'
import { RECETAS } from '../data/alimentos'

export function crearMenuHandler(req: Request, res: Response): void {
  // ── Validación con Zod ───────────────────────────────────────────────────
  const parseResult = CrearMenuSchema.safeParse(req.body)

  if (!parseResult.success) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Los datos de entrada no son válidos',
        details: parseResult.error.flatten(),
      },
    }
    res.status(400).json(response)
    return
  }

  const { intercambiosRequeridos, distribucionComidas, opciones } = parseResult.data

  try {
    // ── Convertir excluirAlimentos a Set ────────────────────────────────────
    const excluidos = new Set<string>(opciones.excluirAlimentos)

    // ── Preparar el mapa de intercambios tipado ──────────────────────────────
    const intercambios: Record<CategoriaAlimento, number> = {
      lecheEntera:  intercambiosRequeridos.lecheEntera,
      lecheSemi:    intercambiosRequeridos.lecheSemi,
      lecheDes:     intercambiosRequeridos.lecheDes,
      vegetales:    intercambiosRequeridos.vegetales,
      frutas:       intercambiosRequeridos.frutas,
      cereales:     intercambiosRequeridos.cereales,
      carnesMagras: intercambiosRequeridos.carnesMagras,
      carnesSemi:   intercambiosRequeridos.carnesSemi,
      carnesGordas: intercambiosRequeridos.carnesGordas,
      grasas:       intercambiosRequeridos.grasas,
    }

    // ── Generar menús ────────────────────────────────────────────────────────
    const menus = generarMenuMultiDia(
      intercambios,
      distribucionComidas,
      excluidos,
      opciones.numDias,
      RECETAS
    )

    const response: ApiResponse = {
      success: true,
      data: { menus },
    }

    res.status(200).json(response)
  } catch (err) {
    if (err instanceof ZodError) {
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Error de validación interna',
          details: err.flatten(),
        },
      }
      res.status(400).json(response)
      return
    }

    console.error('[menuController] Error inesperado:', err)

    const response: ApiResponse = {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Error interno del servidor al generar el menú',
      },
    }
    res.status(500).json(response)
  }
}
