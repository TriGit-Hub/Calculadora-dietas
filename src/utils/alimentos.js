// Base de datos completa de alimentos por categoría de intercambio
export const ALIMENTOS = {
  lecheEntera: [
    { id: "leche_entera_fluida", nombre: "Leche Fluida Entera", cantidad: "1 taza", CHO: 12, CHON: 8, COOH: 8, kcal: 150 },
  ],
  lecheSemi: [
    { id: "yogurt_natural", nombre: "Yogurt Natural", cantidad: "8 oz", CHO: 12, CHON: 8, COOH: 5, kcal: 120 },
    { id: "leche_semi_fluida", nombre: "Leche Semidescremada", cantidad: "1 taza", CHO: 12, CHON: 8, COOH: 5, kcal: 120 },
  ],
  lecheDes: [
    { id: "leche_polvo_desc", nombre: "Leche en Polvo Descremada", cantidad: "4 cdas", CHO: 12, CHON: 8, COOH: 0, kcal: 100 },
    { id: "leche_fluida_desc", nombre: "Leche Fluida Descremada", cantidad: "1 taza", CHO: 12, CHON: 8, COOH: 0, kcal: 100 },
  ],

  vegetales: [
    { id: "zanahoria_cocida",  nombre: "Zanahoria Cocida",    cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "brocoli_cocido",    nombre: "Brócoli Cocido",      cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "guisquil_cocido",   nombre: "Güisquil Cocido",     cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "ejotes_cocidos",    nombre: "Ejotes Cocidos",      cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "ayote_cocido",      nombre: "Ayote Cocido",        cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "coliflor_cocida",   nombre: "Coliflor Cocida",     cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "berenjena_cocida",  nombre: "Berenjena Cocida",    cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "piptanes_cocidos",  nombre: "Piptanes Cocidos",    cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "espinaca_cocida",   nombre: "Espinaca Cocida",     cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "repollo_cocido",    nombre: "Repollo Cocido",      cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "zuquini_cocido",    nombre: "Zuquini Cocido",      cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "tomate_crudo",      nombre: "Tomate Crudo",        cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "remolacha_cruda",   nombre: "Remolacha Cruda",     cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "lechuga_cruda",     nombre: "Lechuga Cruda",       cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "apio_crudo",        nombre: "Apio Crudo",          cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "pepino_crudo",      nombre: "Pepino Crudo",        cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "zanahoria_cruda",   nombre: "Zanahoria Cruda",     cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "rabano_crudo",      nombre: "Rábano Crudo",        cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "cebolla_cruda",     nombre: "Cebolla Cruda",       cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "palmito_crudo",     nombre: "Palmito Crudo",       cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "acelga_cruda",      nombre: "Acelga Cruda",        cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "jugo_vegetales",    nombre: "Jugo de Vegetales",   cantidad: "½ taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "chile_dulce",       nombre: "Chile Dulce/Pimiento", cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: "chipilin_cocido",   nombre: "Chipilín Cocido",     cantidad: "1 taza",  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
  ],

  frutas: [
    { id: "manzana",         nombre: "Manzana",              cantidad: "1 unidad",         CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "guineo",          nombre: "Guineo",               cantidad: "½ unidad",         CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "melon",           nombre: "Melón",                cantidad: "1 taza",           CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "uvas",            nombre: "Uvas",                 cantidad: "17 unidades",      CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "mango_maduro",    nombre: "Mango Maduro",         cantidad: "½ unidad",         CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "naranja",         nombre: "Naranja",              cantidad: "1 unidad",         CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "ciruela",         nombre: "Ciruela",              cantidad: "2 unidades",       CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "guayaba",         nombre: "Guayaba Pequeña",      cantidad: "1 unidad",         CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "frutos_secos",    nombre: "Frutos Secos",         cantidad: "¼ taza",           CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "jocotes",         nombre: "Jocotes",              cantidad: "3 unidades",       CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "fresas",          nombre: "Fresas",               cantidad: "1¼ taza",          CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "kiwi",            nombre: "Kiwi",                 cantidad: "1 unidad",         CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "mamey",           nombre: "Mamey",                cantidad: "½ unidad",         CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "nances",          nombre: "Nances",               cantidad: "20 unidades",      CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "maranon_japones", nombre: "Marañón Japonés",      cantidad: "3 unidades",       CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "papaya",          nombre: "Papaya",               cantidad: "1 taza",           CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "sandia",          nombre: "Sandía",               cantidad: "1¼ taza",          CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "pina",            nombre: "Piña",                 cantidad: "¾ taza",           CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "agua_coco",       nombre: "Agua de Coco",         cantidad: "1 taza",           CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "jugo_naranja",    nombre: "Jugo de Naranja",      cantidad: "½ taza",           CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "anona",           nombre: "Anona",                cantidad: "⅛ unidad",         CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "mamones",         nombre: "Mamones",              cantidad: "22 unidades",      CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "mandarina",       nombre: "Mandarina Pequeña",    cantidad: "2 unidades",       CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "guanabana",       nombre: "Guanábana",            cantidad: "¼ unidad",         CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "nispero",         nombre: "Níspero",              cantidad: "1 unidad",         CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "jalea",           nombre: "Jalea o Mermelada",    cantidad: "1 cdta",           CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "durazno",         nombre: "Durazno",              cantidad: "1 unidad",         CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: "moras",           nombre: "Moras",                cantidad: "¾ taza",           CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
  ],

  cereales: [
    { id: "cereal_azucarado",    nombre: "Cereal Azucarado",         cantidad: "½ taza",          CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "cereal_simple",       nombre: "Cereal Simple",            cantidad: "¾ taza",          CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "avena_cocida",        nombre: "Avena Cocida",             cantidad: "½ taza",          CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "tortilla_maiz",       nombre: "Tortilla de Maíz",         cantidad: "1 unidad",        CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "pasta",               nombre: "Pasta Cocida",             cantidad: "½ taza",          CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "arroz",               nombre: "Arroz Cocido",             cantidad: "½ taza",          CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "pancake",             nombre: "Pancake",                  cantidad: "1 unidad",        CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "granola",             nombre: "Granola",                  cantidad: "¼ taza",          CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "frijoles",            nombre: "Frijoles / Arvejas / Lentejas", cantidad: "¼ taza",     CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "pan_bollo",           nombre: "Pan Bollo",                cantidad: "1 unidad pequeña",CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "pan_caja",            nombre: "Pan de Caja",              cantidad: "1 unidad",        CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "tortilla_taco",       nombre: "Tortilla para Taco",       cantidad: "2 unidades",      CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "galletas_animalitos", nombre: "Galletas Animalitos",      cantidad: "8 unidades",      CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "galletas_saladas",    nombre: "Galletas Saladas",         cantidad: "3 unidades",      CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "palomitas_maiz",      nombre: "Palomitas de Maíz Caseras",cantidad: "3 tazas",         CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "papa",                nombre: "Papa Cocida",              cantidad: "½ taza",          CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "camote",              nombre: "Camote Cocido",            cantidad: "½ taza",          CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "yuca",                nombre: "Yuca Cocida",              cantidad: "¼ taza",          CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: "platano",             nombre: "Plátano Cocido",           cantidad: "¼ taza",          CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
  ],

  carnesMagras: [
    { id: "huevo",            nombre: "Huevo",                cantidad: "1 huevo",    CHO: 0, CHON: 7, COOH: 3, kcal: 55 },
    { id: "claras_huevo",     nombre: "Claras de Huevo",      cantidad: "3 claras",   CHO: 0, CHON: 7, COOH: 3, kcal: 55 },
    { id: "pollo_sin_piel",   nombre: "Pollo Sin Piel",       cantidad: "1 oz",       CHO: 0, CHON: 7, COOH: 3, kcal: 55 },
    { id: "parmesano",        nombre: "Queso Parmesano",      cantidad: "2 cdas",     CHO: 0, CHON: 7, COOH: 3, kcal: 55 },
    { id: "mozzarella",       nombre: "Queso Mozzarella",     cantidad: "1 oz",       CHO: 0, CHON: 7, COOH: 3, kcal: 55 },
    { id: "requeson",         nombre: "Requesón",             cantidad: "¼ taza",     CHO: 0, CHON: 7, COOH: 3, kcal: 55 },
  ],

  carnesSemi: [
    { id: "queso_kraft",      nombre: "Queso Procesado",      cantidad: "1 lasca",    CHO: 0, CHON: 7, COOH: 5, kcal: 75 },
    { id: "atun_agua",        nombre: "Atún en Agua",         cantidad: "¼ taza",     CHO: 0, CHON: 7, COOH: 5, kcal: 75 },
    { id: "pescado_filete",   nombre: "Filete de Pescado",    cantidad: "1 oz",       CHO: 0, CHON: 7, COOH: 5, kcal: 75 },
    { id: "queso_fresco",     nombre: "Queso Fresco",         cantidad: "1 oz",       CHO: 0, CHON: 7, COOH: 5, kcal: 75 },
    { id: "res_magro",        nombre: "Res Corte Magro",      cantidad: "1 oz",       CHO: 0, CHON: 7, COOH: 5, kcal: 75 },
    { id: "sardinas_agua",    nombre: "Sardinas en Agua",     cantidad: "¼ taza",     CHO: 0, CHON: 7, COOH: 5, kcal: 75 },
  ],

  carnesGordas: [
    { id: "chorizo",          nombre: "Chorizo",              cantidad: "1 oz",       CHO: 0, CHON: 7, COOH: 8, kcal: 100 },
    { id: "salchicha_res",    nombre: "Salchicha de Res",     cantidad: "1 oz",       CHO: 0, CHON: 7, COOH: 8, kcal: 100 },
    { id: "costilla_res",     nombre: "Costilla de Res",      cantidad: "1 oz",       CHO: 0, CHON: 7, COOH: 8, kcal: 100 },
    { id: "pollo_con_piel",   nombre: "Pollo Con Piel",       cantidad: "1 oz",       CHO: 0, CHON: 7, COOH: 8, kcal: 100 },
    { id: "cerdo_costilla",   nombre: "Costilla de Cerdo",    cantidad: "1 oz",       CHO: 0, CHON: 7, COOH: 8, kcal: 100 },
  ],

  grasas: [
    { id: "mantequilla",      nombre: "Mantequilla",          cantidad: "1 cdta",       CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: "margarina",        nombre: "Margarina",            cantidad: "1 cdta",       CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: "aceite",           nombre: "Aceite",               cantidad: "1 cdta",       CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: "mayonesa",         nombre: "Mayonesa",             cantidad: "1 cdta",       CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: "tocino",           nombre: "Tocino",               cantidad: "1 tira",       CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: "aguacate",         nombre: "Aguacate",             cantidad: "¼ unidad",     CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: "crema_espesa",     nombre: "Crema Espesa",         cantidad: "1 cda",        CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: "queso_crema",      nombre: "Queso Crema",          cantidad: "1 cda",        CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: "crema_rala",       nombre: "Crema Rala",           cantidad: "1½ cda",       CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: "quesillo",         nombre: "Quesillo",             cantidad: "1 oz",         CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: "mani",             nombre: "Maní",                 cantidad: "10 unidades",  CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: "semilla_maranon",  nombre: "Semilla de Marañón",   cantidad: "6 unidades",   CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: "aderezo_light",    nombre: "Aderezo Light",        cantidad: "2 cdas",       CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: "aceitunas_negras", nombre: "Aceitunas Negras",     cantidad: "8 unidades",   CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: "aceituna_verde",   nombre: "Aceituna Verde",       cantidad: "10 unidades",  CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: "coco_rallado",     nombre: "Coco Rallado",         cantidad: "2 cdas",       CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
  ],
}

// Mapa inverso: id de alimento → categoría (para lookup desde recetas)
export const ID_A_CATEGORIA = Object.fromEntries(
  Object.entries(ALIMENTOS).flatMap(([cat, foods]) => foods.map(f => [f.id, cat]))
)

// Nombres para mostrar en UI
export const CATEGORIA_NOMBRES = {
  lecheEntera:  'Leche Entera',
  lecheSemi:    'Leche Semi',
  lecheDes:     'Leche Descremada',
  vegetales:    'Vegetales',
  frutas:       'Frutas',
  cereales:     'Cereales',
  carnesMagras: 'Carnes Magras',
  carnesSemi:   'Carnes Semi',
  carnesGordas: 'Carnes Grasas',
  grasas:       'Grasas',
}

// Grupos de categorías para la UI de exclusión
export const GRUPOS_EXCLUSION = [
  { label: 'Leches',   categorias: ['lecheEntera', 'lecheSemi', 'lecheDes'] },
  { label: 'Vegetales', categorias: ['vegetales'] },
  { label: 'Frutas',   categorias: ['frutas'] },
  { label: 'Cereales', categorias: ['cereales'] },
  { label: 'Carnes',   categorias: ['carnesMagras', 'carnesSemi', 'carnesGordas'] },
  { label: 'Grasas',   categorias: ['grasas'] },
]

// ─────────────────────────────────────────────────────────────────────────────
// FILTROS POR TIEMPO DE COMIDA
// Si una categoría aparece con Set vacío → no se usa en esa comida
// Si una categoría no aparece → todos sus alimentos están permitidos
// ─────────────────────────────────────────────────────────────────────────────
const _F = {
  desayuno: {
    cereales:     ['cereal_azucarado','cereal_simple','avena_cocida','pancake','granola','pan_bollo','pan_caja','tortilla_taco','tortilla_maiz','galletas_animalitos','galletas_saladas'],
    carnesMagras: ['huevo','claras_huevo','parmesano','mozzarella','requeson'],
    carnesSemi:   ['queso_kraft','queso_fresco'],
    carnesGordas: [],
    vegetales:    ['tomate_crudo', 'cebolla_cruda'],
    // leche*, frutas, grasas: sin restricción
  },
  colacionAM: {
    cereales:     ['pan_caja','pan_bollo','galletas_saladas','galletas_animalitos','granola'],
    carnesMagras: [],
    carnesSemi:   [],
    carnesGordas: [],
    vegetales:    [],
    lecheEntera:  [],
    lecheSemi:    ['yogurt_natural'],
    lecheDes:     [],
    grasas:       ['aguacate','mani','semilla_maranon'],
    // frutas: sin restricción
  },
  almuerzo: {
    cereales:     ['arroz','pasta','papa','camote','yuca','platano','frijoles','tortilla_taco'],
    lecheEntera:  [],
    lecheSemi:    [],
    lecheDes:     [],
    // frutas: sin restricción (permitidas como postre)
    grasas:       ['aceite','mantequilla','margarina','mayonesa','aguacate','aderezo_light','aceitunas_negras','aceituna_verde','crema_espesa','crema_rala','quesillo','tocino'],
    // carnes*, vegetales: sin restricción
  },
  cena: {
    cereales:     ['arroz','pasta','papa','frijoles','pan_caja','tortilla_taco'],
    carnesMagras: ['huevo','claras_huevo','pollo_sin_piel','mozzarella','requeson','parmesano'],
    carnesSemi:   ['atun_agua','pescado_filete','sardinas_agua','queso_fresco','queso_kraft'],
    carnesGordas: [],
    lecheEntera:  [],
    lecheSemi:    ['yogurt_natural'],
    lecheDes:     [],
    frutas:       [],
    grasas:       ['aceite','aguacate','mani','aceitunas_negras','aceituna_verde','aderezo_light','semilla_maranon'],
    // vegetales: sin restricción
  },
}
// colacionPM = mismas reglas que AM
_F.colacionPM = _F.colacionAM

// Convierte arrays a Sets para búsqueda O(1)
const FILTROS_COMIDA = Object.fromEntries(
  Object.entries(_F).map(([comida, cats]) => [
    comida,
    Object.fromEntries(Object.entries(cats).map(([cat, ids]) => [cat, new Set(ids)])),
  ])
)

// ─────────────────────────────────────────────────────────────────────────────
// FUNCIONES BASE
// ─────────────────────────────────────────────────────────────────────────────

// Devuelve el pool de alimentos válidos para una categoría en una comida concreta
function poolParaComida(categoria, comida) {
  const pool = ALIMENTOS[categoria]
  if (!pool || pool.length === 0) return []

  const filtroComida = FILTROS_COMIDA[comida]
  if (!filtroComida || !(categoria in filtroComida)) return pool // sin restricción

  const permitidos = filtroComida[categoria]
  if (permitidos.size === 0) return [] // categoría bloqueada en esta comida

  return pool.filter(a => permitidos.has(a.id))
}

// Distribuye `total` porciones usando el método de mayor residuo (garantiza suma == total)
function distribuirPorciones(total, subDist) {
  if (total === 0) return Object.fromEntries(Object.keys(subDist).map(k => [k, 0]))
  const items = Object.keys(subDist).map(c => {
    const exacto = total * (subDist[c] / 100)
    return { comida: c, piso: Math.floor(exacto), fraccion: exacto - Math.floor(exacto) }
  })
  let restante = total - items.reduce((s, x) => s + x.piso, 0)
  items.sort((a, b) => b.fraccion - a.fraccion)
  for (let i = 0; i < restante; i++) items[i].piso += 1
  return Object.fromEntries(items.map(x => [x.comida, x.piso]))
}

// Distribuye solo entre las comidas donde la categoría tiene alimentos válidos.
// Redistribuye el porcentaje de comidas bloqueadas entre las comidas permitidas.
function distribuirConFiltro(total, distribucionComidas, categoria) {
  if (total === 0) return Object.fromEntries(Object.keys(distribucionComidas).map(k => [k, 0]))

  const permitidas = Object.keys(distribucionComidas).filter(
    c => poolParaComida(categoria, c).length > 0
  )

  if (permitidas.length === 0) {
    // Sin restricción definida → distribuir normalmente
    return distribuirPorciones(total, distribucionComidas)
  }

  // Construir sub-distribución solo para comidas permitidas y re-normalizar a 100%
  let totalPct = permitidas.reduce((s, c) => s + (distribucionComidas[c] || 0), 0)
  if (totalPct === 0) totalPct = 100

  const subDist = {}
  for (const c of permitidas) subDist[c] = ((distribucionComidas[c] || 0) / totalPct) * 100

  const parcial = distribuirPorciones(total, subDist)

  return Object.fromEntries(
    Object.keys(distribucionComidas).map(c => [c, parcial[c] ?? 0])
  )
}

// Selecciona un alimento del pool ya filtrado, respetando historial y exclusiones
function seleccionarDesdPool(pool, excluidos, usadosEnComida, recientes) {
  if (pool.length === 0) return null

  // P1: no excluido, no usado en esta comida, no reciente en días previos
  let disponibles = pool.filter(a => !excluidos.has(a.id) && !usadosEnComida.has(a.id) && !recientes.has(a.id))
  if (disponibles.length === 0) disponibles = pool.filter(a => !excluidos.has(a.id) && !usadosEnComida.has(a.id))
  if (disponibles.length === 0) disponibles = pool.filter(a => !excluidos.has(a.id))
  if (disponibles.length === 0) disponibles = pool

  return disponibles[Math.floor(Math.random() * disponibles.length)]
}

const COMIDAS_ORDEN = ['desayuno', 'colacionAM', 'almuerzo', 'colacionPM', 'cena']

const CATEGORIAS_ORDEN = [
  'lecheEntera', 'lecheSemi', 'lecheDes',
  'vegetales', 'frutas', 'cereales',
  'carnesMagras', 'carnesSemi', 'carnesGordas',
  'grasas',
]

// Proteínas principales: solo una permitida por comida (pollo, res, pescado, atún, huevo)
// Los quesos NO son proteína principal y pueden coexistir con una proteína principal
const PROTEINAS_PRINCIPALES_IDS = new Set([
  'huevo', 'claras_huevo', 'pollo_sin_piel',
  'atun_agua', 'pescado_filete', 'res_magro', 'sardinas_agua',
  'chorizo', 'salchicha_res', 'costilla_res', 'pollo_con_piel', 'cerdo_costilla',
])

// ── REGLA: ningún ingrediente suelto — toda asignación individual recibe un nombre de preparación ──
// Vegetales: cocinados → "Guarnición al Vapor"; crudos → "Ensalada Fresca"
function prepVegetal(id) {
  if (id === 'jugo_vegetales') return 'Jugo de Vegetales'
  return id.includes('_cocid') ? 'Guarnición al Vapor' : 'Ensalada Fresca'
}

// Proteínas: nombre de preparación por defecto cuando no entran en ninguna receta de FASE 1
const PREP_PROTEINA = {
  huevo:          'Huevos Revueltos',
  claras_huevo:   'Claras a la Plancha',
  pollo_sin_piel: 'Pollo a la Plancha',
  atun_agua:      'Atún al Natural',
  pescado_filete: 'Filete a la Plancha',
  res_magro:      'Carne a la Plancha',
  sardinas_agua:  'Sardinas al Natural',
  chorizo:        'Chorizo Salteado',
  salchicha_res:  'Salchichas Cocidas',
  costilla_res:   'Costillas de Res',
  pollo_con_piel: 'Pollo al Horno',
  cerdo_costilla: 'Costillas de Cerdo',
}

// Bases principales: solo una permitida por comida (carbohidrato estructural del plato)
// Granola, cereal, frijoles son acompañamiento energético, no base principal
const BASES_PRINCIPALES_IDS = new Set([
  'arroz', 'pasta', 'papa', 'camote', 'yuca', 'platano',
  'pan_bollo', 'pan_caja', 'tortilla_taco', 'pancake',
])

// recetasDB se pasa desde GeneradorMenu para evitar importación circular
function construirMenuDia(listaIntercambios, distribucionComidas, excluidos, historialSets, recetasDB) {
  // Distribuir cada categoría solo entre las comidas donde está permitida
  const distribucion = {}
  CATEGORIAS_ORDEN.forEach(cat => {
    const total = listaIntercambios[cat] || 0
    if (total > 0) distribucion[cat] = distribuirConFiltro(total, distribucionComidas, cat)
  })

  const menu = {}
  COMIDAS_ORDEN.forEach(comida => {
    const items = []
    const categoriasAsignadas = new Set()
    let proteinaPrincipalAsignada = false
    let basePrincipalAsignada = false

    // Categorías con porciones > 0 para esta comida
    const catPorciones = new Map()
    CATEGORIAS_ORDEN.forEach(cat => {
      const p = distribucion[cat]?.[comida] || 0
      if (p > 0) catPorciones.set(cat, p)
    })

    // Leche/yogurt: solo un ítem por comida, consolidando porciones de las 3 categorías
    const CATS_LECHE = ['lecheEntera', 'lecheSemi', 'lecheDes']
    let lecheAsignada = false
    const totalPorcionesLeche = CATS_LECHE.reduce((s, cat) => s + (catPorciones.get(cat) || 0), 0)

    // ── FASE 1: Receta-primero ─────────────────────────────────────────────
    if (recetasDB && catPorciones.size > 0) {
      const comidaKey = (comida === 'colacionAM' || comida === 'colacionPM') ? 'colacion' : comida
      const candidatas = [...(recetasDB[comidaKey] || [])]

      // Mezclar aleatoriamente para variedad, luego ordenar por especificidad
      for (let i = candidatas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[candidatas[i], candidatas[j]] = [candidatas[j], candidatas[i]]
      }
      candidatas.sort((a, b) => b.ingredientes.length - a.ingredientes.length)

      for (const receta of candidatas) {
        const ingInfo = receta.ingredientes.map(id => ({ id, cat: ID_A_CATEGORIA[id] }))

        // Validar: cada ingrediente debe tener categoría disponible, sin conflictos
        const catsReceta = ingInfo.map(i => i.cat)
        const catsUnicas = new Set(catsReceta)
        if (catsUnicas.size !== catsReceta.length) continue // dos ingredientes de la misma cat

        // Regla: máximo una proteína principal por comida
        const tieneProteinaPrincipal = ingInfo.some(i => PROTEINAS_PRINCIPALES_IDS.has(i.id))
        if (proteinaPrincipalAsignada && tieneProteinaPrincipal) continue

        // Regla: máximo una base principal por comida
        const tieneBasePrincipal = ingInfo.some(i => BASES_PRINCIPALES_IDS.has(i.id))
        if (basePrincipalAsignada && tieneBasePrincipal) continue

        const valida = ingInfo.every(({ id, cat }) =>
          cat &&
          catPorciones.has(cat) &&
          !categoriasAsignadas.has(cat) &&
          !excluidos.has(id) &&
          poolParaComida(cat, comida).some(a => a.id === id)
        )
        if (!valida) continue

        // Asignar receta: fijar el alimento específico de cada categoría
        for (const { id, cat } of ingInfo) {
          const porciones = catPorciones.get(cat)
          const alimento = ALIMENTOS[cat].find(a => a.id === id)
          if (!alimento) continue
          items.push({
            id, categoria: cat,
            nombre:   alimento.nombre,
            cantidad: `${porciones > 1 ? porciones + ' × ' : ''}${alimento.cantidad}`,
            porciones,
            CHO:  alimento.CHO  * porciones,
            CHON: alimento.CHON * porciones,
            COOH: alimento.COOH * porciones,
            kcal: alimento.kcal * porciones,
            _receta: receta.nombre,
          })
          categoriasAsignadas.add(cat)
        }

        if (tieneProteinaPrincipal) proteinaPrincipalAsignada = true
        if (tieneBasePrincipal) basePrincipalAsignada = true
        if (ingInfo.some(i => CATS_LECHE.includes(i.cat))) lecheAsignada = true
      }
    }

    // ── FASE 2: Categorías restantes individualmente ───────────────────────
    const usadosEnComida = new Set(items.map(i => i.id))
    CATEGORIAS_ORDEN.forEach(cat => {
      if (!catPorciones.has(cat) || categoriasAsignadas.has(cat)) return
      let porciones = catPorciones.get(cat)
      let pool = poolParaComida(cat, comida)

      // Regla: máximo una leche/yogurt por comida; primera categoría de leche absorbe todas las porciones
      if (CATS_LECHE.includes(cat)) {
        if (lecheAsignada) return
        porciones = totalPorcionesLeche
      }

      // Regla: si ya hay proteína principal, solo quedan quesos/lácteos proteicos
      if (proteinaPrincipalAsignada && ['carnesMagras', 'carnesSemi', 'carnesGordas'].includes(cat)) {
        pool = pool.filter(a => !PROTEINAS_PRINCIPALES_IDS.has(a.id))
      }
      // Regla: si ya hay base principal, solo quedan acompañamientos energéticos (granola, cereal, frijoles)
      if (basePrincipalAsignada && cat === 'cereales') {
        pool = pool.filter(a => !BASES_PRINCIPALES_IDS.has(a.id))
      }

      const recientes = historialSets.get(cat) || new Set()
      const alimento = seleccionarDesdPool(pool, excluidos, usadosEnComida, recientes)
      if (!alimento) return
      usadosEnComida.add(alimento.id)

      // Regla: ningún ingrediente suelto — asignar nombre de preparación
      let _receta
      if (cat === 'vegetales') {
        _receta = prepVegetal(alimento.id)
      } else if (PROTEINAS_PRINCIPALES_IDS.has(alimento.id) && PREP_PROTEINA[alimento.id]) {
        _receta = PREP_PROTEINA[alimento.id]
      }

      items.push({
        id: alimento.id, categoria: cat,
        nombre:   alimento.nombre,
        cantidad: `${porciones > 1 ? porciones + ' × ' : ''}${alimento.cantidad}`,
        porciones,
        CHO:  alimento.CHO  * porciones,
        CHON: alimento.CHON * porciones,
        COOH: alimento.COOH * porciones,
        kcal: alimento.kcal * porciones,
        ...(_receta && { _receta }),
      })

      if (PROTEINAS_PRINCIPALES_IDS.has(alimento.id)) proteinaPrincipalAsignada = true
      if (BASES_PRINCIPALES_IDS.has(alimento.id)) basePrincipalAsignada = true
      if (CATS_LECHE.includes(cat)) lecheAsignada = true
    })

    menu[comida] = items
  })

  const totales = { CHO: 0, CHON: 0, COOH: 0, kcal: 0 }
  Object.values(menu).flat().forEach(item => {
    totales.CHO  += item.CHO
    totales.CHON += item.CHON
    totales.COOH += item.COOH
    totales.kcal += item.kcal
  })

  return { menu, totales }
}

export function generarMenu(listaIntercambios, distribucionComidas, excluidos = new Set(), recetasDB = null) {
  return construirMenuDia(listaIntercambios, distribucionComidas, excluidos, new Map(), recetasDB)
}

export function generarMenuMultiDia(listaIntercambios, distribucionComidas, excluidos = new Set(), numDias = 1, recetasDB = null) {
  const historial = new Map()
  const VENTANA = Math.min(3, Math.max(numDias - 1, 0))
  const MAX_POR_CAT = VENTANA * COMIDAS_ORDEN.length

  return Array.from({ length: numDias }, () => {
    const historialSets = new Map()
    historial.forEach((ids, cat) => historialSets.set(cat, new Set(ids)))

    const { menu, totales } = construirMenuDia(listaIntercambios, distribucionComidas, excluidos, historialSets, recetasDB)

    Object.values(menu).flat().forEach(item => {
      if (!historial.has(item.categoria)) historial.set(item.categoria, [])
      const arr = historial.get(item.categoria)
      arr.push(item.id)
      while (arr.length > MAX_POR_CAT) arr.shift()
    })

    return { dia: historial.size > 0 ? undefined : 1, menu, totales }
  }).map((d, i) => ({ ...d, dia: i + 1 }))
}
