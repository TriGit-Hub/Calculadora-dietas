// ─────────────────────────────────────────────────────────────────────────────
// Schemas Zod para validación del endpoint POST /api/nutricion/crear-menu
// ─────────────────────────────────────────────────────────────────────────────

import { z } from 'zod'

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Entero no negativo */
const intercambioField = z
  .number({ required_error: 'Campo requerido', invalid_type_error: 'Debe ser un número' })
  .int('Debe ser un número entero')
  .min(0, 'No puede ser negativo')

/** Porcentaje: número positivo entre 0 y 100 */
const porcentajeField = z
  .number({ required_error: 'Campo requerido', invalid_type_error: 'Debe ser un número' })
  .min(0, 'El porcentaje no puede ser negativo')
  .max(100, 'El porcentaje no puede superar 100')

// ─────────────────────────────────────────────────────────────────────────────
// Schema de intercambios requeridos
// ─────────────────────────────────────────────────────────────────────────────

export const IntercambiosSchema = z.object({
  lecheEntera:  intercambioField,
  lecheSemi:    intercambioField,
  lecheDes:     intercambioField,
  vegetales:    intercambioField,
  frutas:       intercambioField,
  cereales:     intercambioField,
  carnesMagras: intercambioField,
  carnesSemi:   intercambioField,
  carnesGordas: intercambioField,
  grasas:       intercambioField,
})

// ─────────────────────────────────────────────────────────────────────────────
// Schema de distribución de comidas
// La suma debe ser exactamente 100%
// ─────────────────────────────────────────────────────────────────────────────

export const DistribucionComidasSchema = z
  .object({
    desayuno:    porcentajeField,
    colacionAM:  porcentajeField,
    almuerzo:    porcentajeField,
    colacionPM:  porcentajeField,
    cena:        porcentajeField,
  })
  .refine(
    (d) => {
      const suma = d.desayuno + d.colacionAM + d.almuerzo + d.colacionPM + d.cena
      // Tolerancia de ±0.01 para manejar errores de punto flotante
      return Math.abs(suma - 100) < 0.01
    },
    {
      message: 'Los porcentajes de distribucionComidas deben sumar exactamente 100',
      path: ['distribucionComidas'],
    }
  )

// ─────────────────────────────────────────────────────────────────────────────
// Schema de opciones
// ─────────────────────────────────────────────────────────────────────────────

export const OpcionesSchema = z.object({
  numDias: z
    .number({ required_error: 'Campo requerido', invalid_type_error: 'Debe ser un número' })
    .int('Debe ser un número entero')
    .min(1, 'Mínimo 1 día')
    .max(30, 'Máximo 30 días'),

  excluirAlimentos: z
    .array(z.string())
    .default([]),
})

// ─────────────────────────────────────────────────────────────────────────────
// Schema completo del request
// ─────────────────────────────────────────────────────────────────────────────

export const CrearMenuSchema = z.object({
  intercambiosRequeridos: IntercambiosSchema,
  distribucionComidas:    DistribucionComidasSchema,
  opciones:               OpcionesSchema,
})

export type CrearMenuInput = z.infer<typeof CrearMenuSchema>
