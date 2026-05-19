// Medical adaptation rules for Salvadoran menus

export const CONDICIONES_MEDICAS = {
  diabetes:     { label: 'Diabetes',       icono: '🩸', colorActivo: 'bg-blue-500 text-white',   colorBadge: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700' },
  hipertension: { label: 'Hipertensión',   icono: '❤️', colorActivo: 'bg-red-500 text-white',    colorBadge: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-700' },
  dislipidemia: { label: 'Dislipidemia',   icono: '🫀', colorActivo: 'bg-orange-500 text-white', colorBadge: 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-700' },
  bajo_grasas:  { label: 'Bajo en Grasas', icono: '⚖️', colorActivo: 'bg-green-600 text-white',  colorBadge: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700' },
}

export const ALERGIAS_CONFIG = {
  gluten:   { label: 'Gluten',    icono: '🌾', alternativa: 'Tortillas de maíz o arroz' },
  lacteos:  { label: 'Lácteos',   icono: '🥛', alternativa: 'Leche vegetal o eliminado' },
  huevo:    { label: 'Huevo',     icono: '🥚', alternativa: 'Frijoles como fuente proteica' },
  mariscos: { label: 'Mariscos',  icono: '🐟', alternativa: 'Pollo o legumbres' },
}

// ── Substitution rules per condition ────────────────────────────────────────
// patron: regex matched against alimento name (case-insensitive)
// nuevoNombre: optional name replacement
// nuevaPrep: optional prep replacement (string or fn(originalPrep) => string)
// excluir: exclude item entirely
// nota: reason shown in UI

const REGLAS_SUSTITUCIONES = [

  // ── DIABETES ──────────────────────────────────────────────────────────────
  {
    condicion: 'diabetes',
    patron: /arroz\s*(blanco|cocido|al lado|aparte|en la sopa|casamiento)/i,
    nuevoNombre: 'Arroz integral',
    nuevaPrep: (p) => p?.replace(/blanco/i, 'integral') || 'Cocido',
    nota: 'Integral → menor índice glucémico',
  },
  {
    condicion: 'diabetes',
    patron: /plátano\s*maduro\s*frito/i,
    nuevoNombre: 'Plátano verde',
    nuevaPrep: () => 'Cocido en agua (no frito)',
    nota: 'Plátano verde cocido → bajo IG',
  },
  {
    condicion: 'diabetes',
    patron: /miel|mermelada/i,
    nuevoNombre: 'Stevia en polvo',
    nuevaPrep: () => 'Endulzante sin calorías',
    nota: 'Sin azúcar añadida',
  },
  {
    condicion: 'diabetes',
    patron: /sandía/i,
    nuevoNombre: 'Fresas',
    nuevaPrep: () => 'Frescas',
    nota: 'Fresas → menor IG que sandía',
  },
  {
    condicion: 'diabetes',
    patron: /guineo|banano/i,
    nuevoNombre: 'Manzana verde',
    nuevaPrep: () => 'Fresca',
    nota: 'Manzana verde → menor IG que guineo',
  },
  {
    condicion: 'diabetes',
    patron: /piña/i,
    nuevoNombre: 'Melón',
    nuevaPrep: () => 'Fresco',
    nota: 'Melón → menor índice glucémico',
  },
  {
    condicion: 'diabetes',
    patron: /pan de caja|tostadas?\s*francesas?/i,
    nuevoNombre: 'Pan integral',
    nuevaPrep: () => 'Tostado',
    nota: 'Pan integral → bajo IG',
  },
  {
    condicion: 'diabetes',
    patron: /cereal\s*simple/i,
    nuevoNombre: 'Avena cocida',
    nuevaPrep: () => 'Sin azúcar, con canela',
    nota: 'Avena → control glucémico',
  },
  {
    condicion: 'diabetes',
    patron: /galletas\s*animalitos/i,
    nuevoNombre: 'Galletas integrales',
    nuevaPrep: () => 'Sin azúcar',
    nota: 'Galletas integrales → menor IG',
  },

  // ── HIPERTENSIÓN ──────────────────────────────────────────────────────────
  {
    condicion: 'hipertension',
    patron: /curtido\s*de\s*repollo|repollo\s*curtido|curtido/i,
    nuevaPrep: () => 'Solo vinagre, SIN SAL',
    nota: 'Curtido sin sal → reduce sodio',
  },
  {
    condicion: 'hipertension',
    patron: /chorizo|salchicha|embutido|salami|jamón/i,
    excluir: true,
    nota: 'Embutidos prohibidos en hipertensión',
  },
  {
    condicion: 'hipertension',
    patron: /queso\s*fresco|queso\s*mozzarella|queso\s*parmesano|queso\s*en\s*pupusas/i,
    nuevaPrep: (p) => (p || '') + ', bajo en sodio',
    nota: 'Queso bajo en sodio',
  },

  // ── DISLIPIDEMIA ──────────────────────────────────────────────────────────
  {
    condicion: 'dislipidemia',
    patron: /plátano\s*maduro\s*frito/i,
    nuevaPrep: () => 'Al horno sin aceite',
    nota: 'Sin fritura → reduce grasas saturadas',
  },
  {
    condicion: 'dislipidemia',
    patron: /huevos?\s*fritos?/i,
    nuevoNombre: 'Huevo + claras',
    nuevaPrep: () => 'Revueltos sin aceite (1 entero + 2 claras)',
    nota: '1 yema máx/día → reduce colesterol',
  },
  {
    condicion: 'dislipidemia',
    patron: /crema\s*salvadoreña|crema/i,
    nuevoNombre: 'Yogurt griego',
    nuevaPrep: () => 'Descremado 0%',
    nota: 'Yogurt 0% → reduce grasa saturada',
  },
  {
    condicion: 'dislipidemia',
    patron: /mantequilla/i,
    nuevoNombre: 'Aceite de oliva',
    nuevaPrep: () => '½ cdta mínimo',
    nota: 'Grasa insaturada → reduce saturadas',
  },
  {
    condicion: 'dislipidemia',
    patron: /chicharrón/i,
    excluir: true,
    nota: 'Chicharrón prohibido en dislipidemia',
  },

  // ── BAJO EN GRASAS ────────────────────────────────────────────────────────
  {
    condicion: 'bajo_grasas',
    patron: /plátano\s*maduro\s*frito/i,
    nuevaPrep: () => 'Al horno sin aceite',
    nota: 'Sin fritura → reduce grasas totales',
  },
  {
    condicion: 'bajo_grasas',
    patron: /huevos?\s*fritos?/i,
    nuevoNombre: 'Claras de huevo',
    nuevaPrep: () => 'Revueltas sin aceite',
    nota: 'Solo claras → reduce grasas',
  },
  {
    condicion: 'bajo_grasas',
    patron: /crema\s*salvadoreña|crema/i,
    nuevoNombre: 'Yogurt descremado',
    nuevaPrep: () => 'Natural sin grasa',
    nota: 'Sin grasa saturada',
  },
  {
    condicion: 'bajo_grasas',
    patron: /mantequilla/i,
    nuevoNombre: 'Spray antiadherente',
    nuevaPrep: () => 'Mínimo',
    nota: 'Reduce grasas totales',
  },
  {
    condicion: 'bajo_grasas',
    patron: /^aceite$/i,
    nuevaPrep: (p) => (p || '') + ' (spray antiadherente, mínimo)',
    nota: 'Mínimo aceite → reduce grasas',
  },
  {
    condicion: 'bajo_grasas',
    patron: /chicharrón/i,
    excluir: true,
    nota: 'Prohibido en dieta baja en grasas',
  },
]

// ── Allergy exclusion patterns ───────────────────────────────────────────────

const PATRONES_ALERGIAS = {
  gluten:   /pan de caja|tostadas?\s*france|pancakes|pasta\s*cocida|cereal\s*simple|galletas\s*animalitos/i,
  lacteos:  /queso|crema|yogurt|leche|café con leche/i,
  huevo:    /huevo|omelette|claras?\s*de\s*huevo/i,
  mariscos: /pescado|atún|sardina|camarón/i,
}

// ── Core adaptation functions ────────────────────────────────────────────────

function adaptarAlimento(alimento, condiciones, alergias) {
  let r = { ...alimento, modificaciones: [] }

  // Allergy check first (exclusion overrides everything)
  for (const alergia of alergias) {
    const patron = PATRONES_ALERGIAS[alergia]
    if (patron && patron.test(alimento.alimento)) {
      const cfg = ALERGIAS_CONFIG[alergia]
      return {
        ...r,
        excluido: true,
        razonExclusion: `Alergia a ${cfg.label}`,
        alternativa: cfg.alternativa,
        modificaciones: [`Excluido — alergia a ${cfg.label}`],
      }
    }
  }

  // Condition substitutions
  for (const condicion of condiciones) {
    const subs = REGLAS_SUSTITUCIONES.filter(s => s.condicion === condicion)
    for (const sub of subs) {
      if (!sub.patron.test(alimento.alimento)) continue

      if (sub.excluir) {
        return {
          ...r,
          excluido: true,
          razonExclusion: sub.nota,
          modificaciones: [sub.nota],
        }
      }

      r = { ...r, modificado: true }
      if (sub.nuevoNombre) r.alimento = sub.nuevoNombre
      if (sub.nuevaPrep) {
        r.preparacion = typeof sub.nuevaPrep === 'function'
          ? sub.nuevaPrep(alimento.preparacion)
          : sub.nuevaPrep
      }
      r.modificaciones = [...r.modificaciones, sub.nota]
    }
  }

  // Hypertension: add "sin sal" to all cooked (non-fruit, non-dessert) items
  if (condiciones.includes('hipertension') && !r.excluido) {
    const esFruta  = r.categoria === 'frutas'
    const esPostre = /de postre|fresca$|fresco$|natural$/i.test(r.preparacion || '')
    const yaTiene  = /sin sal/i.test(r.preparacion || '')

    if (!esFruta && !esPostre && !yaTiene) {
      r = {
        ...r,
        preparacion: (r.preparacion || '') + ', sin sal',
        modificado: true,
        modificaciones: [...r.modificaciones, 'Sin sal (hipertensión)'],
      }
    }
  }

  return r
}

function adaptarComida(comida, condiciones, alergias) {
  const alimentosAdaptados = comida.alimentos.map(a =>
    adaptarAlimento(a, condiciones, alergias)
  )
  const nMod = alimentosAdaptados.filter(a => a.modificado || a.excluido).length
  return { ...comida, alimentos: alimentosAdaptados, itemsAdaptados: nMod }
}

export function adaptarMenuDia(menuDia, condiciones, alergias) {
  if (!condiciones.length && !alergias.length) return menuDia
  return {
    ...menuDia,
    desayuno: adaptarComida(menuDia.desayuno, condiciones, alergias),
    almuerzo: adaptarComida(menuDia.almuerzo, condiciones, alergias),
    cena:     adaptarComida(menuDia.cena,     condiciones, alergias),
    adaptado: true,
  }
}

export function adaptarRefrigerio(refrigerio, condiciones, alergias) {
  if (!condiciones.length && !alergias.length) return refrigerio
  const result = adaptarComida(refrigerio, condiciones, alergias)
  return { ...result, adaptado: true }
}
