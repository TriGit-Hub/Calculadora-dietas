"use strict";
// ─────────────────────────────────────────────────────────────────────────────
// Entry point — Express app
// ─────────────────────────────────────────────────────────────────────────────
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const menuRoutes_1 = __importDefault(require("./routes/menuRoutes"));
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const app = (0, express_1.default)();
// ── Middleware ───────────────────────────────────────────────────────────────
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
    optionsSuccessStatus: 204,
}));
app.use(express_1.default.json({ limit: '100kb' }));
// ── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
// ── API routes ───────────────────────────────────────────────────────────────
app.use('/api/nutricion', menuRoutes_1.default);
// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: 'Endpoint no encontrado',
        },
    });
});
// ── Global error handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
    console.error('[server] Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: {
            code: 'INTERNAL_ERROR',
            message: 'Error interno del servidor',
        },
    });
});
// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`[server] Backend corriendo en http://localhost:${PORT}`);
    console.log(`[server] POST http://localhost:${PORT}/api/nutricion/crear-menu`);
});
exports.default = app;
//# sourceMappingURL=index.js.map