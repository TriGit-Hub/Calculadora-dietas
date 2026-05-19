"use strict";
// ─────────────────────────────────────────────────────────────────────────────
// Schemas Zod para validación del endpoint POST /api/nutricion/crear-menu
// ─────────────────────────────────────────────────────────────────────────────
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearMenuSchema = exports.OpcionesSchema = exports.DistribucionComidasSchema = exports.IntercambiosSchema = void 0;
const zod_1 = require("zod");
// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
/** Entero no negativo */
const intercambioField = zod_1.z
    .number({ required_error: 'Campo requerido', invalid_type_error: 'Debe ser un número' })
    .int('Debe ser un número entero')
    .min(0, 'No puede ser negativo');
/** Porcentaje: número positivo entre 0 y 100 */
const porcentajeField = zod_1.z
    .number({ required_error: 'Campo requerido', invalid_type_error: 'Debe ser un número' })
    .min(0, 'El porcentaje no puede ser negativo')
    .max(100, 'El porcentaje no puede superar 100');
// ─────────────────────────────────────────────────────────────────────────────
// Schema de intercambios requeridos
// ─────────────────────────────────────────────────────────────────────────────
exports.IntercambiosSchema = zod_1.z.object({
    lecheEntera: intercambioField,
    lecheSemi: intercambioField,
    lecheDes: intercambioField,
    vegetales: intercambioField,
    frutas: intercambioField,
    cereales: intercambioField,
    carnesMagras: intercambioField,
    carnesSemi: intercambioField,
    carnesGordas: intercambioField,
    grasas: intercambioField,
});
// ─────────────────────────────────────────────────────────────────────────────
// Schema de distribución de comidas
// La suma debe ser exactamente 100%
// ─────────────────────────────────────────────────────────────────────────────
exports.DistribucionComidasSchema = zod_1.z
    .object({
    desayuno: porcentajeField,
    colacionAM: porcentajeField,
    almuerzo: porcentajeField,
    colacionPM: porcentajeField,
    cena: porcentajeField,
})
    .refine((d) => {
    const suma = d.desayuno + d.colacionAM + d.almuerzo + d.colacionPM + d.cena;
    // Tolerancia de ±0.01 para manejar errores de punto flotante
    return Math.abs(suma - 100) < 0.01;
}, {
    message: 'Los porcentajes de distribucionComidas deben sumar exactamente 100',
    path: ['distribucionComidas'],
});
// ─────────────────────────────────────────────────────────────────────────────
// Schema de opciones
// ─────────────────────────────────────────────────────────────────────────────
exports.OpcionesSchema = zod_1.z.object({
    numDias: zod_1.z
        .number({ required_error: 'Campo requerido', invalid_type_error: 'Debe ser un número' })
        .int('Debe ser un número entero')
        .min(1, 'Mínimo 1 día')
        .max(30, 'Máximo 30 días'),
    excluirAlimentos: zod_1.z
        .array(zod_1.z.string())
        .default([]),
});
// ─────────────────────────────────────────────────────────────────────────────
// Schema completo del request
// ─────────────────────────────────────────────────────────────────────────────
exports.CrearMenuSchema = zod_1.z.object({
    intercambiosRequeridos: exports.IntercambiosSchema,
    distribucionComidas: exports.DistribucionComidasSchema,
    opciones: exports.OpcionesSchema,
});
//# sourceMappingURL=menuValidator.js.map