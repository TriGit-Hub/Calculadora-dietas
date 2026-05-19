"use strict";
// ─────────────────────────────────────────────────────────────────────────────
// Controller: POST /api/nutricion/crear-menu
// ─────────────────────────────────────────────────────────────────────────────
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearMenuHandler = crearMenuHandler;
const zod_1 = require("zod");
const menuValidator_1 = require("../validators/menuValidator");
const menuService_1 = require("../services/menuService");
const alimentos_1 = require("../data/alimentos");
function crearMenuHandler(req, res) {
    // ── Validación con Zod ───────────────────────────────────────────────────
    const parseResult = menuValidator_1.CrearMenuSchema.safeParse(req.body);
    if (!parseResult.success) {
        const response = {
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Los datos de entrada no son válidos',
                details: parseResult.error.flatten(),
            },
        };
        res.status(400).json(response);
        return;
    }
    const { intercambiosRequeridos, distribucionComidas, opciones } = parseResult.data;
    try {
        // ── Convertir excluirAlimentos a Set ────────────────────────────────────
        const excluidos = new Set(opciones.excluirAlimentos);
        // ── Preparar el mapa de intercambios tipado ──────────────────────────────
        const intercambios = {
            lecheEntera: intercambiosRequeridos.lecheEntera,
            lecheSemi: intercambiosRequeridos.lecheSemi,
            lecheDes: intercambiosRequeridos.lecheDes,
            vegetales: intercambiosRequeridos.vegetales,
            frutas: intercambiosRequeridos.frutas,
            cereales: intercambiosRequeridos.cereales,
            carnesMagras: intercambiosRequeridos.carnesMagras,
            carnesSemi: intercambiosRequeridos.carnesSemi,
            carnesGordas: intercambiosRequeridos.carnesGordas,
            grasas: intercambiosRequeridos.grasas,
        };
        // ── Generar menús ────────────────────────────────────────────────────────
        const menus = (0, menuService_1.generarMenuMultiDia)(intercambios, distribucionComidas, excluidos, opciones.numDias, alimentos_1.RECETAS);
        const response = {
            success: true,
            data: { menus },
        };
        res.status(200).json(response);
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            const response = {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Error de validación interna',
                    details: err.flatten(),
                },
            };
            res.status(400).json(response);
            return;
        }
        console.error('[menuController] Error inesperado:', err);
        const response = {
            success: false,
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Error interno del servidor al generar el menú',
            },
        };
        res.status(500).json(response);
    }
}
//# sourceMappingURL=menuController.js.map