"use strict";
// ─────────────────────────────────────────────────────────────────────────────
// Servicio de distribución de intercambios por tiempo de comida
// Porta la lógica de distribución de alimentos.js a TypeScript puro
// ─────────────────────────────────────────────────────────────────────────────
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolParaComida = poolParaComida;
exports.distribuirPorciones = distribuirPorciones;
exports.distribuirConFiltro = distribuirConFiltro;
const alimentos_1 = require("../data/alimentos");
/**
 * Devuelve el pool de alimentos válidos para una categoría en un tiempo de comida.
 * - Si la categoría no tiene filtro definido para esa comida: todos los alimentos.
 * - Si el Set del filtro está vacío: categoría bloqueada, retorna [].
 * - Si el Set tiene IDs: solo los alimentos con esos IDs.
 */
function poolParaComida(categoria, comida) {
    const pool = alimentos_1.ALIMENTOS[categoria];
    if (!pool || pool.length === 0)
        return [];
    const filtroComida = alimentos_1.FILTROS_COMIDA[comida];
    if (!filtroComida || !(categoria in filtroComida))
        return pool; // sin restricción
    const permitidos = filtroComida[categoria];
    if (!permitidos)
        return pool;
    if (permitidos.size === 0)
        return []; // categoría bloqueada en esta comida
    return pool.filter((a) => permitidos.has(a.id));
}
/**
 * Distribuye `total` porciones entre las comidas usando el método de mayor residuo.
 * Garantiza que la suma de las porciones asignadas sea exactamente `total`.
 */
function distribuirPorciones(total, subDist) {
    const comidas = Object.keys(subDist);
    if (total === 0) {
        return Object.fromEntries(comidas.map((k) => [k, 0]));
    }
    const items = comidas.map((c) => {
        const exacto = total * ((subDist[c] ?? 0) / 100);
        return { comida: c, piso: Math.floor(exacto), fraccion: exacto - Math.floor(exacto) };
    });
    let restante = total - items.reduce((s, x) => s + x.piso, 0);
    items.sort((a, b) => b.fraccion - a.fraccion);
    for (let i = 0; i < restante; i++) {
        items[i].piso += 1;
    }
    return Object.fromEntries(items.map((x) => [x.comida, x.piso]));
}
/**
 * Distribuye porciones de una categoría solo entre las comidas donde tiene
 * alimentos válidos. Redistribuye el porcentaje de comidas bloqueadas
 * proporcionalmente entre las comidas permitidas.
 */
function distribuirConFiltro(total, distribucionComidas, categoria) {
    const todasLasComidas = Object.keys(distribucionComidas);
    if (total === 0) {
        return Object.fromEntries(todasLasComidas.map((k) => [k, 0]));
    }
    const permitidas = todasLasComidas.filter((c) => poolParaComida(categoria, c).length > 0);
    if (permitidas.length === 0) {
        // Sin comidas con pool válido → distribuir normalmente (sin restricción definida)
        return distribuirPorciones(total, distribucionComidas);
    }
    // Construir sub-distribución solo para comidas permitidas y re-normalizar a 100%
    let totalPct = permitidas.reduce((s, c) => s + (distribucionComidas[c] ?? 0), 0);
    if (totalPct === 0)
        totalPct = 100;
    const subDist = {};
    for (const c of permitidas) {
        subDist[c] = ((distribucionComidas[c] ?? 0) / totalPct) * 100;
    }
    const parcial = distribuirPorciones(total, subDist);
    return Object.fromEntries(todasLasComidas.map((c) => [c, parcial[c] ?? 0]));
}
//# sourceMappingURL=distribucionService.js.map