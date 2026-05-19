// Base de datos de recetas por tipo de comida
// Cada receta lista los IDs de ingredientes de alimentos.js que la componen
// El sistema intenta casar los alimentos seleccionados con estas recetas

export const RECETAS = {

  desayuno: [
    // ── 3 ingredientes (más específicas, se evalúan primero) ──────────────
    { nombre: "Omelette con queso y tomate",        ingredientes: ["huevo", "queso_fresco",  "tomate_crudo"] },
    { nombre: "Omelette con queso procesado",       ingredientes: ["huevo", "queso_kraft",   "aceite"] },
    { nombre: "Huevos revueltos con queso y cebolla", ingredientes: ["huevo", "queso_kraft", "cebolla_cruda"] },
    { nombre: "Huevos con tomate y cebolla",        ingredientes: ["huevo", "tomate_crudo",  "cebolla_cruda"] },
    { nombre: "Tortilla con huevo y queso",         ingredientes: ["tortilla_taco", "huevo", "queso_fresco"] },
    { nombre: "Pan con huevo y queso",              ingredientes: ["pan_caja", "huevo",      "queso_kraft"] },
    { nombre: "Pan con aguacate y huevo",           ingredientes: ["pan_caja", "aguacate",   "huevo"] },
    { nombre: "Pan con mantequilla y jalea",        ingredientes: ["pan_caja", "mantequilla","jalea"] },
    { nombre: "Pan con queso y tomate",             ingredientes: ["pan_caja", "queso_fresco","tomate_crudo"] },
    { nombre: "Yogurt con granola y banana",        ingredientes: ["yogurt_natural", "granola", "guineo"] },
    { nombre: "Yogurt con granola y fresas",        ingredientes: ["yogurt_natural", "granola", "fresas"] },
    { nombre: "Yogurt con granola y mango",         ingredientes: ["yogurt_natural", "granola", "mango_maduro"] },
    { nombre: "Cereal con leche y banana",          ingredientes: ["cereal_simple", "leche_semi_fluida", "guineo"] },
    { nombre: "Granola con leche y fresas",         ingredientes: ["granola", "leche_entera_fluida", "fresas"] },
    { nombre: "Granola con leche descremada y banana", ingredientes: ["granola", "leche_fluida_desc", "guineo"] },
    { nombre: "Pan con maní y banana",              ingredientes: ["pan_caja", "mani",       "guineo"] },
    { nombre: "Pancake con fresas y crema",         ingredientes: ["pancake",  "fresas",     "crema_espesa"] },
    { nombre: "Pancake con banana y miel",          ingredientes: ["pancake",  "guineo",     "jalea"] },
    { nombre: "Bollo con queso y tomate",           ingredientes: ["pan_bollo","queso_fresco","tomate_crudo"] },
    // ── 2 ingredientes ────────────────────────────────────────────────────
    // Huevo + algo
    { nombre: "Huevos con queso fresco",            ingredientes: ["huevo", "queso_fresco"] },
    { nombre: "Huevos con queso procesado",         ingredientes: ["huevo", "queso_kraft"] },
    { nombre: "Huevos con aguacate",                ingredientes: ["huevo", "aguacate"] },
    { nombre: "Huevos con tomate",                  ingredientes: ["huevo", "tomate_crudo"] },
    { nombre: "Huevos con cebolla",                 ingredientes: ["huevo", "cebolla_cruda"] },
    { nombre: "Omelette con mantequilla",           ingredientes: ["huevo", "mantequilla"] },
    { nombre: "Omelette clásico",                   ingredientes: ["huevo", "aceite"] },
    // Requesón + algo
    { nombre: "Requesón con manzana",               ingredientes: ["requeson", "manzana"] },
    { nombre: "Requesón con fresas",                ingredientes: ["requeson", "fresas"] },
    { nombre: "Requesón con granola",               ingredientes: ["requeson", "granola"] },
    // Pan/Bollo/Tortilla + algo
    { nombre: "Pan con huevo",                      ingredientes: ["pan_caja", "huevo"] },
    { nombre: "Pan con queso fresco",               ingredientes: ["pan_caja", "queso_fresco"] },
    { nombre: "Pan con queso procesado",            ingredientes: ["pan_caja", "queso_kraft"] },
    { nombre: "Pan con aguacate",                   ingredientes: ["pan_caja", "aguacate"] },
    { nombre: "Pan con mantequilla",                ingredientes: ["pan_caja", "mantequilla"] },
    { nombre: "Pan con margarina",                  ingredientes: ["pan_caja", "margarina"] },
    { nombre: "Pan con queso crema",                ingredientes: ["pan_caja", "queso_crema"] },
    { nombre: "Pan con jalea",                      ingredientes: ["pan_caja", "jalea"] },
    { nombre: "Pan con maní",                       ingredientes: ["pan_caja", "mani"] },
    { nombre: "Pan con crema",                      ingredientes: ["pan_caja", "crema_espesa"] },
    { nombre: "Bollo con mantequilla",              ingredientes: ["pan_bollo", "mantequilla"] },
    { nombre: "Bollo con queso",                    ingredientes: ["pan_bollo", "queso_fresco"] },
    { nombre: "Tortilla con huevo",                 ingredientes: ["tortilla_taco", "huevo"] },
    { nombre: "Tortilla con queso",                 ingredientes: ["tortilla_taco", "queso_fresco"] },
    // Yogurt + algo
    { nombre: "Yogurt con granola",                 ingredientes: ["yogurt_natural", "granola"] },
    { nombre: "Yogurt con fresas",                  ingredientes: ["yogurt_natural", "fresas"] },
    { nombre: "Yogurt con mango",                   ingredientes: ["yogurt_natural", "mango_maduro"] },
    { nombre: "Yogurt con piña",                    ingredientes: ["yogurt_natural", "pina"] },
    { nombre: "Yogurt con papaya",                  ingredientes: ["yogurt_natural", "papaya"] },
    { nombre: "Yogurt con manzana",                 ingredientes: ["yogurt_natural", "manzana"] },
    { nombre: "Yogurt con banana",                  ingredientes: ["yogurt_natural", "guineo"] },
    { nombre: "Yogurt con ciruela",                 ingredientes: ["yogurt_natural", "ciruela"] },
    { nombre: "Yogurt con kiwi",                    ingredientes: ["yogurt_natural", "kiwi"] },
    { nombre: "Yogurt con naranja",                 ingredientes: ["yogurt_natural", "naranja"] },
    // Granola/Cereal + leche
    { nombre: "Granola con leche entera",           ingredientes: ["granola", "leche_entera_fluida"] },
    { nombre: "Granola con leche semidescremada",   ingredientes: ["granola", "leche_semi_fluida"] },
    { nombre: "Granola con leche descremada",       ingredientes: ["granola", "leche_fluida_desc"] },
    { nombre: "Granola con leche en polvo",         ingredientes: ["granola", "leche_polvo_desc"] },
    { nombre: "Cereal con leche entera",            ingredientes: ["cereal_simple", "leche_entera_fluida"] },
    { nombre: "Cereal con leche semidescremada",    ingredientes: ["cereal_simple", "leche_semi_fluida"] },
    { nombre: "Cereal con leche descremada",        ingredientes: ["cereal_simple", "leche_fluida_desc"] },
    { nombre: "Cereal azucarado con leche",         ingredientes: ["cereal_azucarado", "leche_semi_fluida"] },
    { nombre: "Cereal azucarado con leche descremada", ingredientes: ["cereal_azucarado", "leche_fluida_desc"] },
    // Batidos (leche + fruta)
    { nombre: "Batido de banana",                   ingredientes: ["leche_entera_fluida", "guineo"] },
    { nombre: "Batido de fresa",                    ingredientes: ["leche_entera_fluida", "fresas"] },
    { nombre: "Batido de piña",                     ingredientes: ["leche_entera_fluida", "pina"] },
    { nombre: "Batido de manzana",                  ingredientes: ["leche_entera_fluida", "manzana"] },
    { nombre: "Batido de papaya",                   ingredientes: ["leche_entera_fluida", "papaya"] },
    { nombre: "Batido de mango",                    ingredientes: ["leche_entera_fluida", "mango_maduro"] },
    { nombre: "Leche semidescremada con banana",    ingredientes: ["leche_semi_fluida", "guineo"] },
    { nombre: "Leche semidescremada con fresas",    ingredientes: ["leche_semi_fluida", "fresas"] },
    { nombre: "Batido descremado de banana",        ingredientes: ["leche_fluida_desc", "guineo"] },
    { nombre: "Batido descremado de fresa",         ingredientes: ["leche_fluida_desc", "fresas"] },
    { nombre: "Batido descremado de papaya",        ingredientes: ["leche_fluida_desc", "papaya"] },
    { nombre: "Batido descremado de mango",         ingredientes: ["leche_fluida_desc", "mango_maduro"] },
    { nombre: "Batido descremado de manzana",       ingredientes: ["leche_fluida_desc", "manzana"] },
    // Pancake + algo
    { nombre: "Pancake con banana",                 ingredientes: ["pancake", "guineo"] },
    { nombre: "Pancake con fresas",                 ingredientes: ["pancake", "fresas"] },
    { nombre: "Pancake con yogurt",                 ingredientes: ["pancake", "yogurt_natural"] },
    { nombre: "Pancake con jalea",                  ingredientes: ["pancake", "jalea"] },
    { nombre: "Pancake con mantequilla",            ingredientes: ["pancake", "mantequilla"] },
  ],

  colacion: [
    { nombre: "Yogurt con granola",                 ingredientes: ["yogurt_natural", "granola"] },
    { nombre: "Yogurt con fresas",                  ingredientes: ["yogurt_natural", "fresas"] },
    { nombre: "Yogurt con mango",                   ingredientes: ["yogurt_natural", "mango_maduro"] },
    { nombre: "Fruta con maní",                     ingredientes: ["manzana", "mani"] },
    { nombre: "Naranja con maní",                   ingredientes: ["naranja", "mani"] },
    { nombre: "Guineo con maní",                    ingredientes: ["guineo", "mani"] },
    { nombre: "Pan con maní",                       ingredientes: ["pan_caja", "mani"] },
    { nombre: "Pan con aguacate",                   ingredientes: ["pan_caja", "aguacate"] },
    { nombre: "Galletas con queso",                 ingredientes: ["galletas_saladas", "queso_fresco"] },
    { nombre: "Galletas con maní",                  ingredientes: ["galletas_saladas", "mani"] },
    { nombre: "Fruta con semillas de marañón",      ingredientes: ["manzana", "semilla_maranon"] },
    { nombre: "Fresas con yogurt",                  ingredientes: ["fresas", "yogurt_natural"] },
  ],

  almuerzo: [
    // 3 ingredientes
    { nombre: "Arroz con pollo y brócoli",          ingredientes: ["arroz", "pollo_sin_piel", "brocoli_cocido"] },
    { nombre: "Arroz con pollo y zanahoria",        ingredientes: ["arroz", "pollo_sin_piel", "zanahoria_cocida"] },
    { nombre: "Arroz con pollo y espinaca",         ingredientes: ["arroz", "pollo_sin_piel", "espinaca_cocida"] },
    { nombre: "Arroz con pollo y ejotes",           ingredientes: ["arroz", "pollo_sin_piel", "ejotes_cocidos"] },
    { nombre: "Arroz con pollo y repollo",          ingredientes: ["arroz", "pollo_sin_piel", "repollo_cocido"] },
    { nombre: "Arroz con carne y tomate",           ingredientes: ["arroz", "res_magro", "tomate_crudo"] },
    { nombre: "Arroz con carne y brócoli",          ingredientes: ["arroz", "res_magro", "brocoli_cocido"] },
    { nombre: "Arroz con atún y tomate",            ingredientes: ["arroz", "atun_agua", "tomate_crudo"] },
    { nombre: "Arroz con huevo y tomate",           ingredientes: ["arroz", "huevo", "tomate_crudo"] },
    { nombre: "Arroz con huevo y queso",            ingredientes: ["arroz", "huevo", "queso_fresco"] },
    { nombre: "Arroz con pescado y tomate",         ingredientes: ["arroz", "pescado_filete", "tomate_crudo"] },
    { nombre: "Arroz con queso fresco",              ingredientes: ["arroz", "queso_fresco"] },
    { nombre: "Pasta con pollo y queso",            ingredientes: ["pasta", "pollo_sin_piel", "queso_fresco"] },
    { nombre: "Pasta con pollo y tomate",           ingredientes: ["pasta", "pollo_sin_piel", "tomate_crudo"] },
    { nombre: "Pasta con pollo y zanahoria",        ingredientes: ["pasta", "pollo_sin_piel", "zanahoria_cocida"] },
    { nombre: "Pasta con atún y tomate",            ingredientes: ["pasta", "atun_agua", "tomate_crudo"] },
    { nombre: "Pollo con arroz y aguacate",         ingredientes: ["pollo_sin_piel", "arroz", "aguacate"] },
    // 2 ingredientes
    { nombre: "Arroz con pollo",                    ingredientes: ["arroz", "pollo_sin_piel"] },
    { nombre: "Arroz con carne",                    ingredientes: ["arroz", "res_magro"] },
    { nombre: "Arroz con atún",                     ingredientes: ["arroz", "atun_agua"] },
    { nombre: "Arroz con pescado",                  ingredientes: ["arroz", "pescado_filete"] },
    { nombre: "Arroz con huevo",                    ingredientes: ["arroz", "huevo"] },
    { nombre: "Arroz con aguacate y tomate",         ingredientes: ["arroz", "aguacate", "tomate_crudo"] },
    { nombre: "Arroz con aguacate",                 ingredientes: ["arroz", "aguacate"] },
    { nombre: "Pasta con pollo",                    ingredientes: ["pasta", "pollo_sin_piel"] },
    { nombre: "Pasta con atún",                     ingredientes: ["pasta", "atun_agua"] },
    { nombre: "Pasta con pescado",                  ingredientes: ["pasta", "pescado_filete"] },
    { nombre: "Pasta con queso",                    ingredientes: ["pasta", "queso_fresco"] },
    { nombre: "Pasta con mantequilla",              ingredientes: ["pasta", "mantequilla"] },
    { nombre: "Pasta con queso crema",              ingredientes: ["pasta", "queso_crema"] },
    { nombre: "Pasta con tomate",                   ingredientes: ["pasta", "tomate_crudo"] },
    { nombre: "Pasta con zanahoria",                ingredientes: ["pasta", "zanahoria_cocida"] },
    { nombre: "Pollo con zanahoria",                ingredientes: ["pollo_sin_piel", "zanahoria_cocida"] },
    { nombre: "Pollo con brócoli",                  ingredientes: ["pollo_sin_piel", "brocoli_cocido"] },
    { nombre: "Pollo con espinaca",                 ingredientes: ["pollo_sin_piel", "espinaca_cocida"] },
    { nombre: "Pollo con repollo",                  ingredientes: ["pollo_sin_piel", "repollo_cocido"] },
    { nombre: "Pollo con ejotes",                   ingredientes: ["pollo_sin_piel", "ejotes_cocidos"] },
    { nombre: "Pollo con papa",                     ingredientes: ["pollo_sin_piel", "papa"] },
    { nombre: "Pollo con yuca",                     ingredientes: ["pollo_sin_piel", "yuca"] },
    { nombre: "Pollo con aguacate",                 ingredientes: ["pollo_sin_piel", "aguacate"] },
    { nombre: "Ensalada de pollo",                  ingredientes: ["pollo_sin_piel", "lechuga_cruda"] },
    { nombre: "Ensalada de atún",                   ingredientes: ["atun_agua", "lechuga_cruda"] },
    { nombre: "Carne con papa",                     ingredientes: ["res_magro", "papa"] },
    { nombre: "Carne con zanahoria",                ingredientes: ["res_magro", "zanahoria_cocida"] },
    { nombre: "Frijoles con queso",                 ingredientes: ["frijoles", "queso_fresco"] },
    { nombre: "Yuca con pollo",                     ingredientes: ["yuca", "pollo_sin_piel"] },
    { nombre: "Papa con pollo",                     ingredientes: ["papa", "pollo_sin_piel"] },
    { nombre: "Camote con pollo",                   ingredientes: ["camote", "pollo_sin_piel"] },
    { nombre: "Plátano con pollo",                  ingredientes: ["platano", "pollo_sin_piel"] },
  ],

  cena: [
    // 3 ingredientes
    { nombre: "Huevos con tomate y queso",          ingredientes: ["huevo", "tomate_crudo", "queso_fresco"] },
    { nombre: "Pollo con ensalada mixta",           ingredientes: ["pollo_sin_piel", "lechuga_cruda", "tomate_crudo"] },
    { nombre: "Atún con lechuga y pepino",          ingredientes: ["atun_agua", "lechuga_cruda", "pepino_crudo"] },
    { nombre: "Pescado con ensalada mixta",         ingredientes: ["pescado_filete", "lechuga_cruda", "tomate_crudo"] },
    { nombre: "Ensalada de aguacate y tomate",      ingredientes: ["aguacate", "tomate_crudo", "lechuga_cruda"] },
    { nombre: "Pollo con aguacate y espinaca",      ingredientes: ["pollo_sin_piel", "aguacate", "espinaca_cocida"] },
    { nombre: "Atún con aguacate y tomate",         ingredientes: ["atun_agua", "aguacate", "tomate_crudo"] },
    { nombre: "Pescado con brócoli y aguacate",     ingredientes: ["pescado_filete", "brocoli_cocido", "aguacate"] },
    { nombre: "Pollo con zanahoria y aguacate",     ingredientes: ["pollo_sin_piel", "zanahoria_cocida", "aguacate"] },
    { nombre: "Huevos con espinaca y queso",        ingredientes: ["huevo", "espinaca_cocida", "queso_fresco"] },
    // 2 ingredientes
    { nombre: "Ensalada de pollo",                  ingredientes: ["pollo_sin_piel", "lechuga_cruda"] },
    { nombre: "Pollo con espinaca",                 ingredientes: ["pollo_sin_piel", "espinaca_cocida"] },
    { nombre: "Pollo con tomate",                   ingredientes: ["pollo_sin_piel", "tomate_crudo"] },
    { nombre: "Pollo con pepino",                   ingredientes: ["pollo_sin_piel", "pepino_crudo"] },
    { nombre: "Pollo con brócoli",                  ingredientes: ["pollo_sin_piel", "brocoli_cocido"] },
    { nombre: "Pollo con aguacate",                 ingredientes: ["pollo_sin_piel", "aguacate"] },
    { nombre: "Pollo con zanahoria",                ingredientes: ["pollo_sin_piel", "zanahoria_cocida"] },
    { nombre: "Ensalada de atún",                   ingredientes: ["atun_agua", "lechuga_cruda"] },
    { nombre: "Atún con tomate",                    ingredientes: ["atun_agua", "tomate_crudo"] },
    { nombre: "Atún con pepino",                    ingredientes: ["atun_agua", "pepino_crudo"] },
    { nombre: "Atún con aguacate",                  ingredientes: ["atun_agua", "aguacate"] },
    { nombre: "Pescado con ensalada",               ingredientes: ["pescado_filete", "lechuga_cruda"] },
    { nombre: "Pescado con tomate",                 ingredientes: ["pescado_filete", "tomate_crudo"] },
    { nombre: "Pescado con pepino",                 ingredientes: ["pescado_filete", "pepino_crudo"] },
    { nombre: "Huevos con espinaca",                ingredientes: ["huevo", "espinaca_cocida"] },
    { nombre: "Huevos con tomate",                  ingredientes: ["huevo", "tomate_crudo"] },
    { nombre: "Huevos con queso",                   ingredientes: ["huevo", "queso_kraft"] },
    { nombre: "Huevos con aguacate",                ingredientes: ["huevo", "aguacate"] },
    { nombre: "Huevos con cebolla",                 ingredientes: ["huevo", "cebolla_cruda"] },
    { nombre: "Huevos con queso fresco",            ingredientes: ["huevo", "queso_fresco"] },
    { nombre: "Pan con queso",                      ingredientes: ["pan_caja", "queso_fresco"] },
    { nombre: "Pan con aguacate",                   ingredientes: ["pan_caja", "aguacate"] },
    { nombre: "Pan con queso crema",                ingredientes: ["pan_caja", "queso_crema"] },
    { nombre: "Pan con maní",                       ingredientes: ["pan_caja", "mani"] },
    { nombre: "Pan con mantequilla",                ingredientes: ["pan_caja", "mantequilla"] },
    { nombre: "Pan con margarina",                  ingredientes: ["pan_caja", "margarina"] },
    { nombre: "Tortilla con pollo",                 ingredientes: ["tortilla_taco", "pollo_sin_piel"] },
    { nombre: "Tortilla con queso",                 ingredientes: ["tortilla_taco", "queso_fresco"] },
    { nombre: "Queso con tomate",                   ingredientes: ["queso_fresco", "tomate_crudo"] },
    { nombre: "Queso con aguacate",                 ingredientes: ["queso_fresco", "aguacate"] },
    { nombre: "Queso con pepino",                   ingredientes: ["queso_fresco", "pepino_crudo"] },
    { nombre: "Ensalada de aguacate",               ingredientes: ["aguacate", "tomate_crudo"] },
    { nombre: "Ensalada de pepino",                 ingredientes: ["pepino_crudo", "tomate_crudo"] },
    { nombre: "Ensalada simple",                    ingredientes: ["lechuga_cruda", "tomate_crudo"] },
  ],
}

// Íconos sugeridos por tipo de plato (heurístico por palabras clave en el nombre)
const ICONOS_RECETA = [
  { patron: /omelette|huevo/i,       icono: '🍳' },
  { patron: /batido|leche/i,         icono: '🥤' },
  { patron: /yogurt/i,               icono: '🍶' },
  { patron: /ensalada/i,             icono: '🥗' },
  { patron: /arroz/i,                icono: '🍚' },
  { patron: /pasta/i,                icono: '🍝' },
  { patron: /pan|bollo|tortilla/i,   icono: '🍞' },
  { patron: /pancake/i,              icono: '🥞' },
  { patron: /pollo/i,                icono: '🍗' },
  { patron: /pescado|atún/i,         icono: '🐟' },
  { patron: /carne|res/i,            icono: '🥩' },
  { patron: /fruta|manzana|fresa|banana|mango|piña|papaya/i, icono: '🍓' },
  { patron: /frijoles/i,             icono: '🫘' },
  { patron: /granola|cereal/i,       icono: '🥣' },
]

export function iconoDeReceta(nombre) {
  for (const { patron, icono } of ICONOS_RECETA) {
    if (patron.test(nombre)) return icono
  }
  return '🍽️'
}

function recetaDesdeComponentes(recetaNombre, componentes) {
  return {
    esReceta:     true,
    recetaNombre,
    icono:        iconoDeReceta(recetaNombre),
    componentes,
    CHO:  componentes.reduce((s, i) => s + i.CHO,  0),
    CHON: componentes.reduce((s, i) => s + i.CHON, 0),
    COOH: componentes.reduce((s, i) => s + i.COOH, 0),
    kcal: componentes.reduce((s, i) => s + i.kcal, 0),
  }
}

/**
 * Agrupa los items de una comida en recetas.
 * Prioridad 1: items con tag _receta (asignados por generación receta-primero).
 * Prioridad 2: match perfecto contra la base de recetas (fallback).
 * Resto: items individuales.
 */
export function agruparEnRecetas(items, tipoComida) {
  const resultado = []

  // ── P1: agrupar por tag _receta (garantizado por generación receta-primero) ─
  const tagMap  = new Map() // recetaNombre → item[]
  const sinTag  = []
  for (const item of items) {
    if (item._receta) {
      if (!tagMap.has(item._receta)) tagMap.set(item._receta, [])
      tagMap.get(item._receta).push(item)
    } else {
      sinTag.push(item)
    }
  }
  for (const [nombre, componentes] of tagMap) {
    resultado.push(recetaDesdeComponentes(nombre, componentes))
  }

  // ── P2: match por ID en items sin tag (fallback) ───────────────────────────
  const comidaKey = (tipoComida === 'colacionAM' || tipoComida === 'colacionPM') ? 'colacion' : tipoComida
  const recetasComida = RECETAS[comidaKey] || []
  const disponibles = new Set(sinTag.map(i => i.id))
  const porId = Object.fromEntries(sinTag.map(i => [i.id, i]))
  const usados = new Set()

  const ordenadas = [...recetasComida].sort((a, b) => b.ingredientes.length - a.ingredientes.length)
  for (const receta of ordenadas) {
    const presentes = receta.ingredientes.filter(id => disponibles.has(id) && !usados.has(id))
    if (presentes.length !== receta.ingredientes.length) continue
    const componentes = presentes.map(id => porId[id])
    resultado.push(recetaDesdeComponentes(receta.nombre, componentes))
    presentes.forEach(id => usados.add(id))
  }

  // Ingredientes que no formaron parte de ninguna receta
  for (const item of sinTag) {
    if (!usados.has(item.id)) {
      resultado.push({ esReceta: false, ...item })
    }
  }

  return resultado
}
