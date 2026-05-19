"use strict";
// ─────────────────────────────────────────────────────────────────────────────
// Servicio de generación de menús
// Porta la lógica completa de construirMenuDia / generarMenuMultiDia
// desde src/utils/alimentos.js a TypeScript puro
// ─────────────────────────────────────────────────────────────────────────────
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarMenu = generarMenu;
exports.generarMenuMultiDia = generarMenuMultiDia;
const alimentos_1 = require("../data/alimentos");
const distribucionService_1 = require("./distribucionService");
// ─────────────────────────────────────────────────────────────────────────────
// Selección de alimento del pool con prioridades de variedad
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Selecciona un alimento del pool ya filtrado, respetando:
 *   P1: no excluido, no usado ya en esta comida, no reciente en días previos
 *   P2: no excluido, no usado en esta comida
 *   P3: no excluido
 *   P4: cualquiera del pool
 */
function seleccionarDesdePool(pool, excluidos, usadosEnComida, recientes) {
    if (pool.length === 0)
        return null;
    let disponibles = pool.filter((a) => !excluidos.has(a.id) && !usadosEnComida.has(a.id) && !recientes.has(a.id));
    if (disponibles.length === 0) {
        disponibles = pool.filter((a) => !excluidos.has(a.id) && !usadosEnComida.has(a.id));
    }
    if (disponibles.length === 0) {
        disponibles = pool.filter((a) => !excluidos.has(a.id));
    }
    if (disponibles.length === 0) {
        disponibles = pool;
    }
    return disponibles[Math.floor(Math.random() * disponibles.length)] ?? null;
}
// ─────────────────────────────────────────────────────────────────────────────
// Construcción del menú de un día
// ─────────────────────────────────────────────────────────────────────────────
function construirMenuDia(intercambios, distribucionComidas, excluidos, historialSets, recetasDB) {
    // Distribuir cada categoría solo entre las comidas donde está permitida
    const distribucion = new Map();
    for (const cat of alimentos_1.CATEGORIAS_ORDEN) {
        const total = intercambios[cat] ?? 0;
        if (total > 0) {
            distribucion.set(cat, (0, distribucionService_1.distribuirConFiltro)(total, distribucionComidas, cat));
        }
    }
    const menu = {};
    for (const comida of alimentos_1.COMIDAS_ORDEN) {
        const items = [];
        const categoriasAsignadas = new Set();
        let proteinaPrincipalAsignada = false;
        let basePrincipalAsignada = false;
        // Categorías con porciones > 0 para esta comida
        const catPorciones = new Map();
        for (const cat of alimentos_1.CATEGORIAS_ORDEN) {
            const dist = distribucion.get(cat);
            const p = dist?.[comida] ?? 0;
            if (p > 0)
                catPorciones.set(cat, p);
        }
        // Leche/yogurt: solo un ítem por comida, consolidando porciones de las 3 categorías de leche
        let lecheAsignada = false;
        const totalPorcionesLeche = alimentos_1.CATS_LECHE.reduce((s, cat) => s + (catPorciones.get(cat) ?? 0), 0);
        // ── FASE 1: Receta-primero ─────────────────────────────────────────────
        if (recetasDB !== null && catPorciones.size > 0) {
            const comidaKey = (comida === 'colacionAM' || comida === 'colacionPM')
                ? 'colacion'
                : comida;
            // Obtener candidatas de recetas, mezclar aleatoriamente para variedad
            const candidatas = [...(recetasDB[comidaKey] ?? [])];
            for (let i = candidatas.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = candidatas[i];
                candidatas[i] = candidatas[j] ?? candidatas[i];
                candidatas[j] = temp;
            }
            // Ordenar por especificidad (más ingredientes primero)
            candidatas.sort((a, b) => b.ingredientes.length - a.ingredientes.length);
            for (const receta of candidatas) {
                const ingInfo = receta.ingredientes.map((id) => ({
                    id,
                    cat: alimentos_1.ID_A_CATEGORIA[id],
                }));
                // Validar: cada ingrediente debe tener categoría conocida
                if (ingInfo.some(({ cat }) => cat === undefined))
                    continue;
                // Validar: dos ingredientes no pueden pertenecer a la misma categoría
                const catsReceta = ingInfo.map(({ cat }) => cat);
                const catsUnicas = new Set(catsReceta);
                if (catsUnicas.size !== catsReceta.length)
                    continue;
                // Regla: máximo una proteína principal por comida
                const tieneProteinaPrincipal = ingInfo.some(({ id }) => alimentos_1.PROTEINAS_PRINCIPALES_IDS.has(id));
                if (proteinaPrincipalAsignada && tieneProteinaPrincipal)
                    continue;
                // Regla: máximo una base principal por comida
                const tieneBasePrincipal = ingInfo.some(({ id }) => alimentos_1.BASES_PRINCIPALES_IDS.has(id));
                if (basePrincipalAsignada && tieneBasePrincipal)
                    continue;
                const valida = ingInfo.every(({ id, cat }) => {
                    if (!cat)
                        return false;
                    return (catPorciones.has(cat) &&
                        !categoriasAsignadas.has(cat) &&
                        !excluidos.has(id) &&
                        (0, distribucionService_1.poolParaComida)(cat, comida).some((a) => a.id === id));
                });
                if (!valida)
                    continue;
                // Asignar receta: fijar el alimento específico de cada categoría
                for (const { id, cat } of ingInfo) {
                    if (!cat)
                        continue;
                    const porciones = catPorciones.get(cat) ?? 1;
                    const alimento = alimentos_1.ALIMENTOS[cat].find((a) => a.id === id);
                    if (!alimento)
                        continue;
                    items.push({
                        id,
                        categoria: cat,
                        nombre: alimento.nombre,
                        cantidad: porciones > 1 ? `${porciones} × ${alimento.cantidad}` : alimento.cantidad,
                        porciones,
                        CHO: alimento.CHO * porciones,
                        CHON: alimento.CHON * porciones,
                        COOH: alimento.COOH * porciones,
                        kcal: alimento.kcal * porciones,
                        _receta: receta.nombre,
                    });
                    categoriasAsignadas.add(cat);
                }
                if (tieneProteinaPrincipal)
                    proteinaPrincipalAsignada = true;
                if (tieneBasePrincipal)
                    basePrincipalAsignada = true;
                if (ingInfo.some(({ cat }) => cat !== undefined && alimentos_1.CATS_LECHE.includes(cat))) {
                    lecheAsignada = true;
                }
            }
        }
        // ── FASE 2: Categorías restantes individualmente ───────────────────────
        const usadosEnComida = new Set(items.map((i) => i.id));
        for (const cat of alimentos_1.CATEGORIAS_ORDEN) {
            if (!catPorciones.has(cat) || categoriasAsignadas.has(cat))
                continue;
            let porciones = catPorciones.get(cat) ?? 0;
            let pool = (0, distribucionService_1.poolParaComida)(cat, comida);
            // Regla: máximo una leche/yogurt por comida; primera categoría de leche absorbe todas las porciones
            if (alimentos_1.CATS_LECHE.includes(cat)) {
                if (lecheAsignada)
                    continue;
                porciones = totalPorcionesLeche;
            }
            // Regla: si ya hay proteína principal, solo quedan quesos/lácteos proteicos
            if (proteinaPrincipalAsignada &&
                (cat === 'carnesMagras' || cat === 'carnesSemi' || cat === 'carnesGordas')) {
                pool = pool.filter((a) => !alimentos_1.PROTEINAS_PRINCIPALES_IDS.has(a.id));
            }
            // Regla: si ya hay base principal, solo quedan acompañamientos energéticos
            if (basePrincipalAsignada && cat === 'cereales') {
                pool = pool.filter((a) => !alimentos_1.BASES_PRINCIPALES_IDS.has(a.id));
            }
            const recientes = historialSets.get(cat) ?? new Set();
            const alimento = seleccionarDesdePool(pool, excluidos, usadosEnComida, recientes);
            if (!alimento)
                continue;
            usadosEnComida.add(alimento.id);
            items.push({
                id: alimento.id,
                categoria: cat,
                nombre: alimento.nombre,
                cantidad: porciones > 1 ? `${porciones} × ${alimento.cantidad}` : alimento.cantidad,
                porciones,
                CHO: alimento.CHO * porciones,
                CHON: alimento.CHON * porciones,
                COOH: alimento.COOH * porciones,
                kcal: alimento.kcal * porciones,
            });
            if (alimentos_1.PROTEINAS_PRINCIPALES_IDS.has(alimento.id))
                proteinaPrincipalAsignada = true;
            if (alimentos_1.BASES_PRINCIPALES_IDS.has(alimento.id))
                basePrincipalAsignada = true;
            if (alimentos_1.CATS_LECHE.includes(cat))
                lecheAsignada = true;
        }
        menu[comida] = items;
    }
    // Calcular totales del día
    const totales = { CHO: 0, CHON: 0, COOH: 0, kcal: 0 };
    for (const items of Object.values(menu)) {
        for (const item of items) {
            totales.CHO += item.CHO;
            totales.CHON += item.CHON;
            totales.COOH += item.COOH;
            totales.kcal += item.kcal;
        }
    }
    return {
        menu: menu,
        totales,
    };
}
// ─────────────────────────────────────────────────────────────────────────────
// API pública
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Genera el menú de un solo día (sin historial).
 */
function generarMenu(intercambios, distribucionComidas, excluidos = new Set(), recetasDB = alimentos_1.RECETAS) {
    return construirMenuDia(intercambios, distribucionComidas, excluidos, new Map(), recetasDB);
}
/**
 * Genera menús para múltiples días, manteniendo un historial de alimentos
 * usados para evitar repeticiones (ventana de 3 días).
 */
function generarMenuMultiDia(intercambios, distribucionComidas, excluidos = new Set(), numDias = 1, recetasDB = alimentos_1.RECETAS) {
    const historial = new Map();
    const VENTANA = Math.min(3, Math.max(numDias - 1, 0));
    const MAX_POR_CAT = VENTANA * alimentos_1.COMIDAS_ORDEN.length;
    return Array.from({ length: numDias }, (_, index) => {
        // Construir Sets de recientes desde el historial actual
        const historialSets = new Map();
        historial.forEach((ids, cat) => historialSets.set(cat, new Set(ids)));
        const { menu, totales } = construirMenuDia(intercambios, distribucionComidas, excluidos, historialSets, recetasDB);
        // Actualizar historial con los alimentos usados en este día
        const todosItems = Object.values(menu).flat();
        for (const item of todosItems) {
            if (!historial.has(item.categoria)) {
                historial.set(item.categoria, []);
            }
            const arr = historial.get(item.categoria);
            arr.push(item.id);
            while (arr.length > MAX_POR_CAT)
                arr.shift();
        }
        return {
            dia: index + 1,
            menu,
            totales,
        };
    });
}
//# sourceMappingURL=menuService.js.map