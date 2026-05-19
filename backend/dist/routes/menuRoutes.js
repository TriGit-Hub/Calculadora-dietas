"use strict";
// ─────────────────────────────────────────────────────────────────────────────
// Rutas: /api/nutricion
// ─────────────────────────────────────────────────────────────────────────────
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menuController_1 = require("../controllers/menuController");
const router = (0, express_1.Router)();
/**
 * POST /api/nutricion/crear-menu
 *
 * Genera uno o varios menús diarios basados en intercambios nutricionales.
 *
 * Body: CrearMenuInput
 * Response: CrearMenuOutput | ErrorOutput
 */
router.post('/crear-menu', menuController_1.crearMenuHandler);
exports.default = router;
//# sourceMappingURL=menuRoutes.js.map