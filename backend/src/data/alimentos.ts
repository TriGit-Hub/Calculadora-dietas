// ─────────────────────────────────────────────────────────────────────────────
// Base de datos completa de alimentos por categoría de intercambio
// 109 alimentos portados desde src/utils/alimentos.js
// ─────────────────────────────────────────────────────────────────────────────

import type { BaseAlimentos, CategoriaAlimento, FiltroComida, FiltrosComida } from '../types/alimentos.types'

export const ALIMENTOS: BaseAlimentos = {
  lecheEntera: [
    { id: 'leche_entera_fluida', nombre: 'Leche Fluida Entera',          cantidad: '1 taza',  CHO: 12, CHON: 8, COOH: 8, kcal: 150 },
  ],
  lecheSemi: [
    { id: 'yogurt_natural',      nombre: 'Yogurt Natural',               cantidad: '8 oz',    CHO: 12, CHON: 8, COOH: 5, kcal: 120 },
    { id: 'leche_semi_fluida',   nombre: 'Leche Semidescremada',         cantidad: '1 taza',  CHO: 12, CHON: 8, COOH: 5, kcal: 120 },
  ],
  lecheDes: [
    { id: 'leche_polvo_desc',    nombre: 'Leche en Polvo Descremada',    cantidad: '4 cdas',  CHO: 12, CHON: 8, COOH: 0, kcal: 100 },
    { id: 'leche_fluida_desc',   nombre: 'Leche Fluida Descremada',      cantidad: '1 taza',  CHO: 12, CHON: 8, COOH: 0, kcal: 100 },
  ],

  vegetales: [
    { id: 'zanahoria_cocida',  nombre: 'Zanahoria Cocida',      cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'brocoli_cocido',    nombre: 'Brócoli Cocido',        cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'guisquil_cocido',   nombre: 'Güisquil Cocido',       cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'ejotes_cocidos',    nombre: 'Ejotes Cocidos',        cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'ayote_cocido',      nombre: 'Ayote Cocido',          cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'coliflor_cocida',   nombre: 'Coliflor Cocida',       cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'berenjena_cocida',  nombre: 'Berenjena Cocida',      cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'piptanes_cocidos',  nombre: 'Piptanes Cocidos',      cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'espinaca_cocida',   nombre: 'Espinaca Cocida',       cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'repollo_cocido',    nombre: 'Repollo Cocido',        cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'zuquini_cocido',    nombre: 'Zuquini Cocido',        cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'tomate_crudo',      nombre: 'Tomate Crudo',          cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'remolacha_cruda',   nombre: 'Remolacha Cruda',       cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'lechuga_cruda',     nombre: 'Lechuga Cruda',         cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'apio_crudo',        nombre: 'Apio Crudo',            cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'pepino_crudo',      nombre: 'Pepino Crudo',          cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'zanahoria_cruda',   nombre: 'Zanahoria Cruda',       cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'rabano_crudo',      nombre: 'Rábano Crudo',          cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'cebolla_cruda',     nombre: 'Cebolla Cruda',         cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'palmito_crudo',     nombre: 'Palmito Crudo',         cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'acelga_cruda',      nombre: 'Acelga Cruda',          cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'jugo_vegetales',    nombre: 'Jugo de Vegetales',     cantidad: '½ taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'chile_dulce',       nombre: 'Chile Dulce/Pimiento',  cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
    { id: 'chipilin_cocido',   nombre: 'Chipilín Cocido',       cantidad: '1 taza',  CHO: 5, CHON: 2, COOH: 0, kcal: 25 },
  ],

  frutas: [
    { id: 'manzana',         nombre: 'Manzana',              cantidad: '1 unidad',      CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'guineo',          nombre: 'Guineo',               cantidad: '½ unidad',      CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'melon',           nombre: 'Melón',                cantidad: '1 taza',        CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'uvas',            nombre: 'Uvas',                 cantidad: '17 unidades',   CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'mango_maduro',    nombre: 'Mango Maduro',         cantidad: '½ unidad',      CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'naranja',         nombre: 'Naranja',              cantidad: '1 unidad',      CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'ciruela',         nombre: 'Ciruela',              cantidad: '2 unidades',    CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'guayaba',         nombre: 'Guayaba Pequeña',      cantidad: '1 unidad',      CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'frutos_secos',    nombre: 'Frutos Secos',         cantidad: '¼ taza',        CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'jocotes',         nombre: 'Jocotes',              cantidad: '3 unidades',    CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'fresas',          nombre: 'Fresas',               cantidad: '1¼ taza',       CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'kiwi',            nombre: 'Kiwi',                 cantidad: '1 unidad',      CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'mamey',           nombre: 'Mamey',                cantidad: '½ unidad',      CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'nances',          nombre: 'Nances',               cantidad: '20 unidades',   CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'maranon_japones', nombre: 'Marañón Japonés',      cantidad: '3 unidades',    CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'papaya',          nombre: 'Papaya',               cantidad: '1 taza',        CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'sandia',          nombre: 'Sandía',               cantidad: '1¼ taza',       CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'pina',            nombre: 'Piña',                 cantidad: '¾ taza',        CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'agua_coco',       nombre: 'Agua de Coco',         cantidad: '1 taza',        CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'jugo_naranja',    nombre: 'Jugo de Naranja',      cantidad: '½ taza',        CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'anona',           nombre: 'Anona',                cantidad: '⅛ unidad',      CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'mamones',         nombre: 'Mamones',              cantidad: '22 unidades',   CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'mandarina',       nombre: 'Mandarina Pequeña',    cantidad: '2 unidades',    CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'guanabana',       nombre: 'Guanábana',            cantidad: '¼ unidad',      CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'nispero',         nombre: 'Níspero',              cantidad: '1 unidad',      CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'jalea',           nombre: 'Jalea o Mermelada',    cantidad: '1 cdta',        CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'durazno',         nombre: 'Durazno',              cantidad: '1 unidad',      CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
    { id: 'moras',           nombre: 'Moras',                cantidad: '¾ taza',        CHO: 15, CHON: 0, COOH: 0, kcal: 60 },
  ],

  cereales: [
    { id: 'cereal_azucarado',    nombre: 'Cereal Azucarado',              cantidad: '½ taza',           CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'cereal_simple',       nombre: 'Cereal Simple',                 cantidad: '¾ taza',           CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'avena_cocida',        nombre: 'Avena Cocida',                  cantidad: '½ taza',           CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'tortilla_maiz',       nombre: 'Tortilla de Maíz',              cantidad: '1 unidad',         CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'pasta',               nombre: 'Pasta Cocida',                  cantidad: '½ taza',           CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'arroz',               nombre: 'Arroz Cocido',                  cantidad: '½ taza',           CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'pancake',             nombre: 'Pancake',                       cantidad: '1 unidad',         CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'granola',             nombre: 'Granola',                       cantidad: '¼ taza',           CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'frijoles',            nombre: 'Frijoles / Arvejas / Lentejas', cantidad: '¼ taza',           CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'pan_bollo',           nombre: 'Pan Bollo',                     cantidad: '1 unidad pequeña', CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'pan_caja',            nombre: 'Pan de Caja',                   cantidad: '1 unidad',         CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'tortilla_taco',       nombre: 'Tortilla para Taco',            cantidad: '2 unidades',       CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'galletas_animalitos', nombre: 'Galletas Animalitos',           cantidad: '8 unidades',       CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'galletas_saladas',    nombre: 'Galletas Saladas',              cantidad: '3 unidades',       CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'palomitas_maiz',      nombre: 'Palomitas de Maíz Caseras',     cantidad: '3 tazas',          CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'papa',                nombre: 'Papa Cocida',                   cantidad: '½ taza',           CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'camote',              nombre: 'Camote Cocido',                 cantidad: '½ taza',           CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'yuca',                nombre: 'Yuca Cocida',                   cantidad: '¼ taza',           CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
    { id: 'platano',             nombre: 'Plátano Cocido',                cantidad: '¼ taza',           CHO: 15, CHON: 2, COOH: 1, kcal: 80 },
  ],

  carnesMagras: [
    { id: 'huevo',            nombre: 'Huevo',             cantidad: '1 huevo',  CHO: 0, CHON: 7, COOH: 3, kcal: 55 },
    { id: 'claras_huevo',     nombre: 'Claras de Huevo',   cantidad: '3 claras', CHO: 0, CHON: 7, COOH: 3, kcal: 55 },
    { id: 'pollo_sin_piel',   nombre: 'Pollo Sin Piel',    cantidad: '1 oz',     CHO: 0, CHON: 7, COOH: 3, kcal: 55 },
    { id: 'parmesano',        nombre: 'Queso Parmesano',   cantidad: '2 cdas',   CHO: 0, CHON: 7, COOH: 3, kcal: 55 },
    { id: 'mozzarella',       nombre: 'Queso Mozzarella',  cantidad: '1 oz',     CHO: 0, CHON: 7, COOH: 3, kcal: 55 },
    { id: 'requeson',         nombre: 'Requesón',          cantidad: '¼ taza',   CHO: 0, CHON: 7, COOH: 3, kcal: 55 },
  ],

  carnesSemi: [
    { id: 'queso_kraft',      nombre: 'Queso Procesado',   cantidad: '1 lasca',  CHO: 0, CHON: 7, COOH: 5, kcal: 75 },
    { id: 'atun_agua',        nombre: 'Atún en Agua',      cantidad: '¼ taza',   CHO: 0, CHON: 7, COOH: 5, kcal: 75 },
    { id: 'pescado_filete',   nombre: 'Filete de Pescado', cantidad: '1 oz',     CHO: 0, CHON: 7, COOH: 5, kcal: 75 },
    { id: 'queso_fresco',     nombre: 'Queso Fresco',      cantidad: '1 oz',     CHO: 0, CHON: 7, COOH: 5, kcal: 75 },
    { id: 'res_magro',        nombre: 'Res Corte Magro',   cantidad: '1 oz',     CHO: 0, CHON: 7, COOH: 5, kcal: 75 },
    { id: 'sardinas_agua',    nombre: 'Sardinas en Agua',  cantidad: '¼ taza',   CHO: 0, CHON: 7, COOH: 5, kcal: 75 },
  ],

  carnesGordas: [
    { id: 'chorizo',          nombre: 'Chorizo',            cantidad: '1 oz', CHO: 0, CHON: 7, COOH: 8, kcal: 100 },
    { id: 'salchicha_res',    nombre: 'Salchicha de Res',   cantidad: '1 oz', CHO: 0, CHON: 7, COOH: 8, kcal: 100 },
    { id: 'costilla_res',     nombre: 'Costilla de Res',    cantidad: '1 oz', CHO: 0, CHON: 7, COOH: 8, kcal: 100 },
    { id: 'pollo_con_piel',   nombre: 'Pollo Con Piel',     cantidad: '1 oz', CHO: 0, CHON: 7, COOH: 8, kcal: 100 },
    { id: 'cerdo_costilla',   nombre: 'Costilla de Cerdo',  cantidad: '1 oz', CHO: 0, CHON: 7, COOH: 8, kcal: 100 },
  ],

  grasas: [
    { id: 'mantequilla',      nombre: 'Mantequilla',          cantidad: '1 cdta',      CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: 'margarina',        nombre: 'Margarina',            cantidad: '1 cdta',      CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: 'aceite',           nombre: 'Aceite',               cantidad: '1 cdta',      CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: 'mayonesa',         nombre: 'Mayonesa',             cantidad: '1 cdta',      CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: 'tocino',           nombre: 'Tocino',               cantidad: '1 tira',      CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: 'aguacate',         nombre: 'Aguacate',             cantidad: '¼ unidad',    CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: 'crema_espesa',     nombre: 'Crema Espesa',         cantidad: '1 cda',       CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: 'queso_crema',      nombre: 'Queso Crema',          cantidad: '1 cda',       CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: 'crema_rala',       nombre: 'Crema Rala',           cantidad: '1½ cda',      CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: 'quesillo',         nombre: 'Quesillo',             cantidad: '1 oz',        CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: 'mani',             nombre: 'Maní',                 cantidad: '10 unidades', CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: 'semilla_maranon',  nombre: 'Semilla de Marañón',   cantidad: '6 unidades',  CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: 'aderezo_light',    nombre: 'Aderezo Light',        cantidad: '2 cdas',      CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: 'aceitunas_negras', nombre: 'Aceitunas Negras',     cantidad: '8 unidades',  CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: 'aceituna_verde',   nombre: 'Aceituna Verde',       cantidad: '10 unidades', CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
    { id: 'coco_rallado',     nombre: 'Coco Rallado',         cantidad: '2 cdas',      CHO: 0, CHON: 0, COOH: 5, kcal: 45 },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Mapa inverso: id de alimento → categoría
// ─────────────────────────────────────────────────────────────────────────────

export const ID_A_CATEGORIA: Record<string, CategoriaAlimento> = Object.fromEntries(
  (Object.entries(ALIMENTOS) as [CategoriaAlimento, typeof ALIMENTOS[CategoriaAlimento]][]).flatMap(
    ([cat, foods]) => foods.map((f) => [f.id, cat] as [string, CategoriaAlimento])
  )
)

// ─────────────────────────────────────────────────────────────────────────────
// Filtros por tiempo de comida
// Categoría presente con Set vacío → bloqueada en esa comida
// Categoría ausente → todos sus alimentos permitidos
// ─────────────────────────────────────────────────────────────────────────────

const _F: FiltrosComida = {
  desayuno: {
    cereales: new Set([
      'cereal_azucarado', 'cereal_simple', 'avena_cocida', 'pancake', 'granola',
      'pan_bollo', 'pan_caja', 'tortilla_taco', 'tortilla_maiz',
      'galletas_animalitos', 'galletas_saladas',
    ]),
    carnesMagras: new Set(['huevo', 'claras_huevo', 'parmesano', 'mozzarella', 'requeson']),
    carnesSemi:   new Set(['queso_kraft', 'queso_fresco']),
    carnesGordas: new Set(),
    vegetales:    new Set(['tomate_crudo', 'cebolla_cruda']),
    // lecheEntera, lecheSemi, lecheDes, frutas, grasas: sin restricción
  },
  colacionAM: {
    cereales:     new Set(['pan_caja', 'pan_bollo', 'galletas_saladas', 'galletas_animalitos', 'granola']),
    carnesMagras: new Set(),
    carnesSemi:   new Set(),
    carnesGordas: new Set(),
    vegetales:    new Set(),
    lecheEntera:  new Set(),
    lecheSemi:    new Set(['yogurt_natural']),
    lecheDes:     new Set(),
    grasas:       new Set(['aguacate', 'mani', 'semilla_maranon']),
    // frutas: sin restricción
  },
  almuerzo: {
    cereales:    new Set(['arroz', 'pasta', 'papa', 'camote', 'yuca', 'platano', 'frijoles', 'tortilla_taco']),
    lecheEntera: new Set(),
    lecheSemi:   new Set(),
    lecheDes:    new Set(),
    grasas:      new Set([
      'aceite', 'mantequilla', 'margarina', 'mayonesa', 'aguacate',
      'aderezo_light', 'aceitunas_negras', 'aceituna_verde',
      'crema_espesa', 'crema_rala', 'quesillo', 'tocino',
    ]),
    // carnesMagras, carnesSemi, carnesGordas, vegetales, frutas: sin restricción
  },
  cena: {
    cereales:     new Set(['arroz', 'pasta', 'papa', 'frijoles', 'pan_caja', 'tortilla_taco']),
    carnesMagras: new Set(['huevo', 'claras_huevo', 'pollo_sin_piel', 'mozzarella', 'requeson', 'parmesano']),
    carnesSemi:   new Set(['atun_agua', 'pescado_filete', 'sardinas_agua', 'queso_fresco', 'queso_kraft']),
    carnesGordas: new Set(),
    lecheEntera:  new Set(),
    lecheSemi:    new Set(['yogurt_natural']),
    lecheDes:     new Set(),
    frutas:       new Set(),
    grasas:       new Set([
      'aceite', 'aguacate', 'mani', 'aceitunas_negras',
      'aceituna_verde', 'aderezo_light', 'semilla_maranon',
    ]),
    // vegetales: sin restricción
  },
  // colacionPM comparte las mismas reglas que colacionAM
  colacionPM: {} as FiltroComida,
}

// Asignar colacionPM = colacionAM (misma referencia)
_F.colacionPM = _F.colacionAM

export const FILTROS_COMIDA: FiltrosComida = _F

// ─────────────────────────────────────────────────────────────────────────────
// Constantes de orden y agrupación
// ─────────────────────────────────────────────────────────────────────────────

export const COMIDAS_ORDEN: readonly ['desayuno', 'colacionAM', 'almuerzo', 'colacionPM', 'cena'] = [
  'desayuno', 'colacionAM', 'almuerzo', 'colacionPM', 'cena',
] as const

export const CATEGORIAS_ORDEN: readonly CategoriaAlimento[] = [
  'lecheEntera', 'lecheSemi', 'lecheDes',
  'vegetales', 'frutas', 'cereales',
  'carnesMagras', 'carnesSemi', 'carnesGordas',
  'grasas',
] as const

export const CATS_LECHE: readonly CategoriaAlimento[] = ['lecheEntera', 'lecheSemi', 'lecheDes'] as const

/**
 * Proteínas principales: solo una permitida por comida (almuerzo/cena).
 * Pollo, res, pescado, atún, sardinas, huevo, carnes grasas.
 * Los quesos NO son proteína principal y pueden coexistir.
 */
export const PROTEINAS_PRINCIPALES_IDS: ReadonlySet<string> = new Set([
  'huevo', 'claras_huevo', 'pollo_sin_piel',
  'atun_agua', 'pescado_filete', 'res_magro', 'sardinas_agua',
  'chorizo', 'salchicha_res', 'costilla_res', 'pollo_con_piel', 'cerdo_costilla',
])

/**
 * Bases principales: carbohidrato estructural del plato.
 * Solo una permitida por comida.
 * Granola, cereal y frijoles son acompañamiento energético, no base principal.
 */
export const BASES_PRINCIPALES_IDS: ReadonlySet<string> = new Set([
  'arroz', 'pasta', 'papa', 'camote', 'yuca', 'platano',
  'pan_bollo', 'pan_caja', 'tortilla_taco', 'pancake',
])

// ─────────────────────────────────────────────────────────────────────────────
// Base de datos de recetas (portada desde src/utils/recetas.js)
// ─────────────────────────────────────────────────────────────────────────────

export interface Receta {
  nombre: string
  ingredientes: string[]
}

export type RecetasDB = {
  desayuno: Receta[]
  colacion: Receta[]
  almuerzo: Receta[]
  cena: Receta[]
}

export const RECETAS: RecetasDB = {
  desayuno: [
    // 3 ingredientes
    { nombre: 'Omelette con queso y tomate',              ingredientes: ['huevo', 'queso_fresco',  'tomate_crudo'] },
    { nombre: 'Omelette con queso procesado',             ingredientes: ['huevo', 'queso_kraft',   'aceite'] },
    { nombre: 'Huevos revueltos con queso y cebolla',     ingredientes: ['huevo', 'queso_kraft',   'cebolla_cruda'] },
    { nombre: 'Huevos con tomate y cebolla',              ingredientes: ['huevo', 'tomate_crudo',  'cebolla_cruda'] },
    { nombre: 'Tortilla con huevo y queso',               ingredientes: ['tortilla_taco', 'huevo', 'queso_fresco'] },
    { nombre: 'Pan con huevo y queso',                    ingredientes: ['pan_caja', 'huevo',      'queso_kraft'] },
    { nombre: 'Pan con aguacate y huevo',                 ingredientes: ['pan_caja', 'aguacate',   'huevo'] },
    { nombre: 'Pan con mantequilla y jalea',              ingredientes: ['pan_caja', 'mantequilla','jalea'] },
    { nombre: 'Pan con queso y tomate',                   ingredientes: ['pan_caja', 'queso_fresco','tomate_crudo'] },
    { nombre: 'Yogurt con granola y banana',              ingredientes: ['yogurt_natural', 'granola', 'guineo'] },
    { nombre: 'Yogurt con granola y fresas',              ingredientes: ['yogurt_natural', 'granola', 'fresas'] },
    { nombre: 'Yogurt con granola y mango',               ingredientes: ['yogurt_natural', 'granola', 'mango_maduro'] },
    { nombre: 'Cereal con leche y banana',                ingredientes: ['cereal_simple', 'leche_semi_fluida', 'guineo'] },
    { nombre: 'Granola con leche y fresas',               ingredientes: ['granola', 'leche_entera_fluida', 'fresas'] },
    { nombre: 'Granola con leche descremada y banana',    ingredientes: ['granola', 'leche_fluida_desc', 'guineo'] },
    { nombre: 'Pan con maní y banana',                    ingredientes: ['pan_caja', 'mani',       'guineo'] },
    { nombre: 'Pancake con fresas y crema',               ingredientes: ['pancake',  'fresas',     'crema_espesa'] },
    { nombre: 'Pancake con banana y miel',                ingredientes: ['pancake',  'guineo',     'jalea'] },
    { nombre: 'Bollo con queso y tomate',                 ingredientes: ['pan_bollo','queso_fresco','tomate_crudo'] },
    // 2 ingredientes
    { nombre: 'Huevos con queso fresco',                  ingredientes: ['huevo', 'queso_fresco'] },
    { nombre: 'Huevos con queso procesado',               ingredientes: ['huevo', 'queso_kraft'] },
    { nombre: 'Huevos con aguacate',                      ingredientes: ['huevo', 'aguacate'] },
    { nombre: 'Huevos con tomate',                        ingredientes: ['huevo', 'tomate_crudo'] },
    { nombre: 'Huevos con cebolla',                       ingredientes: ['huevo', 'cebolla_cruda'] },
    { nombre: 'Omelette con mantequilla',                  ingredientes: ['huevo', 'mantequilla'] },
    { nombre: 'Omelette clásico',                         ingredientes: ['huevo', 'aceite'] },
    { nombre: 'Requesón con manzana',                     ingredientes: ['requeson', 'manzana'] },
    { nombre: 'Requesón con fresas',                      ingredientes: ['requeson', 'fresas'] },
    { nombre: 'Requesón con granola',                     ingredientes: ['requeson', 'granola'] },
    { nombre: 'Pan con huevo',                            ingredientes: ['pan_caja', 'huevo'] },
    { nombre: 'Pan con queso fresco',                     ingredientes: ['pan_caja', 'queso_fresco'] },
    { nombre: 'Pan con queso procesado',                  ingredientes: ['pan_caja', 'queso_kraft'] },
    { nombre: 'Pan con aguacate',                         ingredientes: ['pan_caja', 'aguacate'] },
    { nombre: 'Pan con mantequilla',                      ingredientes: ['pan_caja', 'mantequilla'] },
    { nombre: 'Pan con margarina',                        ingredientes: ['pan_caja', 'margarina'] },
    { nombre: 'Pan con queso crema',                      ingredientes: ['pan_caja', 'queso_crema'] },
    { nombre: 'Pan con jalea',                            ingredientes: ['pan_caja', 'jalea'] },
    { nombre: 'Pan con maní',                             ingredientes: ['pan_caja', 'mani'] },
    { nombre: 'Pan con crema',                            ingredientes: ['pan_caja', 'crema_espesa'] },
    { nombre: 'Bollo con mantequilla',                    ingredientes: ['pan_bollo', 'mantequilla'] },
    { nombre: 'Bollo con queso',                          ingredientes: ['pan_bollo', 'queso_fresco'] },
    { nombre: 'Tortilla con huevo',                       ingredientes: ['tortilla_taco', 'huevo'] },
    { nombre: 'Tortilla con queso',                       ingredientes: ['tortilla_taco', 'queso_fresco'] },
    { nombre: 'Yogurt con granola',                       ingredientes: ['yogurt_natural', 'granola'] },
    { nombre: 'Yogurt con fresas',                        ingredientes: ['yogurt_natural', 'fresas'] },
    { nombre: 'Yogurt con mango',                         ingredientes: ['yogurt_natural', 'mango_maduro'] },
    { nombre: 'Yogurt con piña',                          ingredientes: ['yogurt_natural', 'pina'] },
    { nombre: 'Yogurt con papaya',                        ingredientes: ['yogurt_natural', 'papaya'] },
    { nombre: 'Yogurt con manzana',                       ingredientes: ['yogurt_natural', 'manzana'] },
    { nombre: 'Yogurt con banana',                        ingredientes: ['yogurt_natural', 'guineo'] },
    { nombre: 'Yogurt con ciruela',                       ingredientes: ['yogurt_natural', 'ciruela'] },
    { nombre: 'Yogurt con kiwi',                          ingredientes: ['yogurt_natural', 'kiwi'] },
    { nombre: 'Yogurt con naranja',                       ingredientes: ['yogurt_natural', 'naranja'] },
    { nombre: 'Granola con leche entera',                 ingredientes: ['granola', 'leche_entera_fluida'] },
    { nombre: 'Granola con leche semidescremada',         ingredientes: ['granola', 'leche_semi_fluida'] },
    { nombre: 'Granola con leche descremada',             ingredientes: ['granola', 'leche_fluida_desc'] },
    { nombre: 'Granola con leche en polvo',               ingredientes: ['granola', 'leche_polvo_desc'] },
    { nombre: 'Cereal con leche entera',                  ingredientes: ['cereal_simple', 'leche_entera_fluida'] },
    { nombre: 'Cereal con leche semidescremada',          ingredientes: ['cereal_simple', 'leche_semi_fluida'] },
    { nombre: 'Cereal con leche descremada',              ingredientes: ['cereal_simple', 'leche_fluida_desc'] },
    { nombre: 'Cereal azucarado con leche',               ingredientes: ['cereal_azucarado', 'leche_semi_fluida'] },
    { nombre: 'Cereal azucarado con leche descremada',    ingredientes: ['cereal_azucarado', 'leche_fluida_desc'] },
    { nombre: 'Batido de banana',                         ingredientes: ['leche_entera_fluida', 'guineo'] },
    { nombre: 'Batido de fresa',                          ingredientes: ['leche_entera_fluida', 'fresas'] },
    { nombre: 'Batido de piña',                           ingredientes: ['leche_entera_fluida', 'pina'] },
    { nombre: 'Batido de manzana',                        ingredientes: ['leche_entera_fluida', 'manzana'] },
    { nombre: 'Batido de papaya',                         ingredientes: ['leche_entera_fluida', 'papaya'] },
    { nombre: 'Batido de mango',                          ingredientes: ['leche_entera_fluida', 'mango_maduro'] },
    { nombre: 'Leche semidescremada con banana',          ingredientes: ['leche_semi_fluida', 'guineo'] },
    { nombre: 'Leche semidescremada con fresas',          ingredientes: ['leche_semi_fluida', 'fresas'] },
    { nombre: 'Batido descremado de banana',              ingredientes: ['leche_fluida_desc', 'guineo'] },
    { nombre: 'Batido descremado de fresa',               ingredientes: ['leche_fluida_desc', 'fresas'] },
    { nombre: 'Batido descremado de papaya',              ingredientes: ['leche_fluida_desc', 'papaya'] },
    { nombre: 'Batido descremado de mango',               ingredientes: ['leche_fluida_desc', 'mango_maduro'] },
    { nombre: 'Batido descremado de manzana',             ingredientes: ['leche_fluida_desc', 'manzana'] },
    { nombre: 'Pancake con banana',                       ingredientes: ['pancake', 'guineo'] },
    { nombre: 'Pancake con fresas',                       ingredientes: ['pancake', 'fresas'] },
    { nombre: 'Pancake con yogurt',                       ingredientes: ['pancake', 'yogurt_natural'] },
    { nombre: 'Pancake con jalea',                        ingredientes: ['pancake', 'jalea'] },
    { nombre: 'Pancake con mantequilla',                  ingredientes: ['pancake', 'mantequilla'] },
  ],

  colacion: [
    { nombre: 'Yogurt con granola',            ingredientes: ['yogurt_natural', 'granola'] },
    { nombre: 'Yogurt con fresas',             ingredientes: ['yogurt_natural', 'fresas'] },
    { nombre: 'Yogurt con mango',              ingredientes: ['yogurt_natural', 'mango_maduro'] },
    { nombre: 'Fruta con maní',                ingredientes: ['manzana', 'mani'] },
    { nombre: 'Naranja con maní',              ingredientes: ['naranja', 'mani'] },
    { nombre: 'Guineo con maní',               ingredientes: ['guineo', 'mani'] },
    { nombre: 'Pan con maní',                  ingredientes: ['pan_caja', 'mani'] },
    { nombre: 'Pan con aguacate',              ingredientes: ['pan_caja', 'aguacate'] },
    { nombre: 'Galletas con queso',            ingredientes: ['galletas_saladas', 'queso_fresco'] },
    { nombre: 'Galletas con maní',             ingredientes: ['galletas_saladas', 'mani'] },
    { nombre: 'Fruta con semillas de marañón', ingredientes: ['manzana', 'semilla_maranon'] },
    { nombre: 'Fresas con yogurt',             ingredientes: ['fresas', 'yogurt_natural'] },
  ],

  almuerzo: [
    // 3 ingredientes
    { nombre: 'Arroz con pollo y brócoli',     ingredientes: ['arroz', 'pollo_sin_piel', 'brocoli_cocido'] },
    { nombre: 'Arroz con pollo y zanahoria',   ingredientes: ['arroz', 'pollo_sin_piel', 'zanahoria_cocida'] },
    { nombre: 'Arroz con pollo y espinaca',    ingredientes: ['arroz', 'pollo_sin_piel', 'espinaca_cocida'] },
    { nombre: 'Arroz con pollo y ejotes',      ingredientes: ['arroz', 'pollo_sin_piel', 'ejotes_cocidos'] },
    { nombre: 'Arroz con pollo y repollo',     ingredientes: ['arroz', 'pollo_sin_piel', 'repollo_cocido'] },
    { nombre: 'Arroz con carne y tomate',      ingredientes: ['arroz', 'res_magro', 'tomate_crudo'] },
    { nombre: 'Arroz con carne y brócoli',     ingredientes: ['arroz', 'res_magro', 'brocoli_cocido'] },
    { nombre: 'Arroz con atún y tomate',       ingredientes: ['arroz', 'atun_agua', 'tomate_crudo'] },
    { nombre: 'Arroz con huevo y tomate',      ingredientes: ['arroz', 'huevo', 'tomate_crudo'] },
    { nombre: 'Arroz con huevo y queso',       ingredientes: ['arroz', 'huevo', 'queso_fresco'] },
    { nombre: 'Arroz con pescado y tomate',    ingredientes: ['arroz', 'pescado_filete', 'tomate_crudo'] },
    { nombre: 'Arroz con queso fresco',        ingredientes: ['arroz', 'queso_fresco'] },
    { nombre: 'Pasta con pollo y queso',       ingredientes: ['pasta', 'pollo_sin_piel', 'queso_fresco'] },
    { nombre: 'Pasta con pollo y tomate',      ingredientes: ['pasta', 'pollo_sin_piel', 'tomate_crudo'] },
    { nombre: 'Pasta con pollo y zanahoria',   ingredientes: ['pasta', 'pollo_sin_piel', 'zanahoria_cocida'] },
    { nombre: 'Pasta con atún y tomate',       ingredientes: ['pasta', 'atun_agua', 'tomate_crudo'] },
    { nombre: 'Pollo con arroz y aguacate',    ingredientes: ['pollo_sin_piel', 'arroz', 'aguacate'] },
    // 2 ingredientes
    { nombre: 'Arroz con pollo',               ingredientes: ['arroz', 'pollo_sin_piel'] },
    { nombre: 'Arroz con carne',               ingredientes: ['arroz', 'res_magro'] },
    { nombre: 'Arroz con atún',                ingredientes: ['arroz', 'atun_agua'] },
    { nombre: 'Arroz con pescado',             ingredientes: ['arroz', 'pescado_filete'] },
    { nombre: 'Arroz con huevo',               ingredientes: ['arroz', 'huevo'] },
    { nombre: 'Arroz con aguacate y tomate',   ingredientes: ['arroz', 'aguacate', 'tomate_crudo'] },
    { nombre: 'Arroz con aguacate',            ingredientes: ['arroz', 'aguacate'] },
    { nombre: 'Pasta con pollo',               ingredientes: ['pasta', 'pollo_sin_piel'] },
    { nombre: 'Pasta con atún',                ingredientes: ['pasta', 'atun_agua'] },
    { nombre: 'Pasta con pescado',             ingredientes: ['pasta', 'pescado_filete'] },
    { nombre: 'Pasta con queso',               ingredientes: ['pasta', 'queso_fresco'] },
    { nombre: 'Pasta con mantequilla',         ingredientes: ['pasta', 'mantequilla'] },
    { nombre: 'Pasta con queso crema',         ingredientes: ['pasta', 'queso_crema'] },
    { nombre: 'Pasta con tomate',              ingredientes: ['pasta', 'tomate_crudo'] },
    { nombre: 'Pasta con zanahoria',           ingredientes: ['pasta', 'zanahoria_cocida'] },
    { nombre: 'Pollo con zanahoria',           ingredientes: ['pollo_sin_piel', 'zanahoria_cocida'] },
    { nombre: 'Pollo con brócoli',             ingredientes: ['pollo_sin_piel', 'brocoli_cocido'] },
    { nombre: 'Pollo con espinaca',            ingredientes: ['pollo_sin_piel', 'espinaca_cocida'] },
    { nombre: 'Pollo con repollo',             ingredientes: ['pollo_sin_piel', 'repollo_cocido'] },
    { nombre: 'Pollo con ejotes',              ingredientes: ['pollo_sin_piel', 'ejotes_cocidos'] },
    { nombre: 'Pollo con papa',                ingredientes: ['pollo_sin_piel', 'papa'] },
    { nombre: 'Pollo con yuca',                ingredientes: ['pollo_sin_piel', 'yuca'] },
    { nombre: 'Pollo con aguacate',            ingredientes: ['pollo_sin_piel', 'aguacate'] },
    { nombre: 'Ensalada de pollo',             ingredientes: ['pollo_sin_piel', 'lechuga_cruda'] },
    { nombre: 'Ensalada de atún',              ingredientes: ['atun_agua', 'lechuga_cruda'] },
    { nombre: 'Carne con papa',                ingredientes: ['res_magro', 'papa'] },
    { nombre: 'Carne con zanahoria',           ingredientes: ['res_magro', 'zanahoria_cocida'] },
    { nombre: 'Frijoles con queso',            ingredientes: ['frijoles', 'queso_fresco'] },
    { nombre: 'Yuca con pollo',                ingredientes: ['yuca', 'pollo_sin_piel'] },
    { nombre: 'Papa con pollo',                ingredientes: ['papa', 'pollo_sin_piel'] },
    { nombre: 'Camote con pollo',              ingredientes: ['camote', 'pollo_sin_piel'] },
    { nombre: 'Plátano con pollo',             ingredientes: ['platano', 'pollo_sin_piel'] },
  ],

  cena: [
    // 3 ingredientes
    { nombre: 'Huevos con tomate y queso',        ingredientes: ['huevo', 'tomate_crudo', 'queso_fresco'] },
    { nombre: 'Pollo con ensalada mixta',          ingredientes: ['pollo_sin_piel', 'lechuga_cruda', 'tomate_crudo'] },
    { nombre: 'Atún con lechuga y pepino',         ingredientes: ['atun_agua', 'lechuga_cruda', 'pepino_crudo'] },
    { nombre: 'Pescado con ensalada mixta',        ingredientes: ['pescado_filete', 'lechuga_cruda', 'tomate_crudo'] },
    { nombre: 'Ensalada de aguacate y tomate',     ingredientes: ['aguacate', 'tomate_crudo', 'lechuga_cruda'] },
    { nombre: 'Pollo con aguacate y espinaca',     ingredientes: ['pollo_sin_piel', 'aguacate', 'espinaca_cocida'] },
    { nombre: 'Atún con aguacate y tomate',        ingredientes: ['atun_agua', 'aguacate', 'tomate_crudo'] },
    { nombre: 'Pescado con brócoli y aguacate',    ingredientes: ['pescado_filete', 'brocoli_cocido', 'aguacate'] },
    { nombre: 'Pollo con zanahoria y aguacate',    ingredientes: ['pollo_sin_piel', 'zanahoria_cocida', 'aguacate'] },
    { nombre: 'Huevos con espinaca y queso',       ingredientes: ['huevo', 'espinaca_cocida', 'queso_fresco'] },
    // 2 ingredientes
    { nombre: 'Ensalada de pollo',                 ingredientes: ['pollo_sin_piel', 'lechuga_cruda'] },
    { nombre: 'Pollo con espinaca',                ingredientes: ['pollo_sin_piel', 'espinaca_cocida'] },
    { nombre: 'Pollo con tomate',                  ingredientes: ['pollo_sin_piel', 'tomate_crudo'] },
    { nombre: 'Pollo con pepino',                  ingredientes: ['pollo_sin_piel', 'pepino_crudo'] },
    { nombre: 'Pollo con brócoli',                 ingredientes: ['pollo_sin_piel', 'brocoli_cocido'] },
    { nombre: 'Pollo con aguacate',                ingredientes: ['pollo_sin_piel', 'aguacate'] },
    { nombre: 'Pollo con zanahoria',               ingredientes: ['pollo_sin_piel', 'zanahoria_cocida'] },
    { nombre: 'Ensalada de atún',                  ingredientes: ['atun_agua', 'lechuga_cruda'] },
    { nombre: 'Atún con tomate',                   ingredientes: ['atun_agua', 'tomate_crudo'] },
    { nombre: 'Atún con pepino',                   ingredientes: ['atun_agua', 'pepino_crudo'] },
    { nombre: 'Atún con aguacate',                 ingredientes: ['atun_agua', 'aguacate'] },
    { nombre: 'Pescado con ensalada',              ingredientes: ['pescado_filete', 'lechuga_cruda'] },
    { nombre: 'Pescado con tomate',                ingredientes: ['pescado_filete', 'tomate_crudo'] },
    { nombre: 'Pescado con pepino',                ingredientes: ['pescado_filete', 'pepino_crudo'] },
    { nombre: 'Huevos con espinaca',               ingredientes: ['huevo', 'espinaca_cocida'] },
    { nombre: 'Huevos con tomate',                 ingredientes: ['huevo', 'tomate_crudo'] },
    { nombre: 'Huevos con queso',                  ingredientes: ['huevo', 'queso_kraft'] },
    { nombre: 'Huevos con aguacate',               ingredientes: ['huevo', 'aguacate'] },
    { nombre: 'Huevos con cebolla',                ingredientes: ['huevo', 'cebolla_cruda'] },
    { nombre: 'Huevos con queso fresco',           ingredientes: ['huevo', 'queso_fresco'] },
    { nombre: 'Pan con queso',                     ingredientes: ['pan_caja', 'queso_fresco'] },
    { nombre: 'Pan con aguacate',                  ingredientes: ['pan_caja', 'aguacate'] },
    { nombre: 'Pan con queso crema',               ingredientes: ['pan_caja', 'queso_crema'] },
    { nombre: 'Pan con maní',                      ingredientes: ['pan_caja', 'mani'] },
    { nombre: 'Pan con mantequilla',               ingredientes: ['pan_caja', 'mantequilla'] },
    { nombre: 'Pan con margarina',                 ingredientes: ['pan_caja', 'margarina'] },
    { nombre: 'Tortilla con pollo',                ingredientes: ['tortilla_taco', 'pollo_sin_piel'] },
    { nombre: 'Tortilla con queso',                ingredientes: ['tortilla_taco', 'queso_fresco'] },
    { nombre: 'Queso con tomate',                  ingredientes: ['queso_fresco', 'tomate_crudo'] },
    { nombre: 'Queso con aguacate',                ingredientes: ['queso_fresco', 'aguacate'] },
    { nombre: 'Queso con pepino',                  ingredientes: ['queso_fresco', 'pepino_crudo'] },
    { nombre: 'Ensalada de aguacate',              ingredientes: ['aguacate', 'tomate_crudo'] },
    { nombre: 'Ensalada de pepino',                ingredientes: ['pepino_crudo', 'tomate_crudo'] },
    { nombre: 'Ensalada simple',                   ingredientes: ['lechuga_cruda', 'tomate_crudo'] },
  ],
}
