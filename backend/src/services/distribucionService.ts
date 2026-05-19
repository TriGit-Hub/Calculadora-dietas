// ─────────────────────────────────────────────────────────────────────────────
// Servicio de distribución de intercambios por tiempo de comida
// Porta la lógica de distribución de alimentos.js a TypeScript puro
// ─────────────────────────────────────────────────────────────────────────────

import type { CategoriaAlimento, DistribucionComidas, TipoComida } from '../types/alimentos.types'
import type { DistribucionPorCategoria } from '../types/menu.types'
import { ALIMENTOS, FILTROS_COMIDA } from '../data/alimentos'

/**
 * Devuelve el pool de alimentos válidos para una categoría en un tiempo de comida.
 * - Si la categoría no tiene filtro definido para esa comida: todos los alimentos.
 * - Si el Set del filtro está vacío: categoría bloqueada, retorna [].
 * - Si el Set tiene IDs: solo los alimentos con esos IDs.
 */
export function poolParaComida(
  categoria: CategoriaAlimento,
  comida: TipoComida
): typeof ALIMENTOS[CategoriaAlimento] {
  const pool = ALIMENTOS[categoria]
  if (!pool || pool.length === 0) return []

  const filtroComida = FILTROS_COMIDA[comida]
  if (!filtroComida || !(categoria in filtroComida)) return pool // sin restricción

  const permitidos = filtroComida[categoria as keyof typeof filtroComida]
  if (!permitidos) return pool

  if (permitidos.size === 0) return [] // categoría bloqueada en esta comida

  return pool.filter((a) => permitidos.has(a.id))
}

/**
 * Distribuye `total` porciones entre las comidas usando el método de mayor residuo.
 * Garantiza que la suma de las porciones asignadas sea exactamente `total`.
 */
export function distribuirPorciones(
  total: number,
  subDist: Partial<Record<TipoComida, number>>
): Record<TipoComida, number> {
  const comidas = Object.keys(subDist) as TipoComida[]

  if (total === 0) {
    return Object.fromEntries(comidas.map((k) => [k, 0])) as Record<TipoComida, number>
  }

  const items = comidas.map((c) => {
    const exacto = total * ((subDist[c] ?? 0) / 100)
    return { comida: c, piso: Math.floor(exacto), fraccion: exacto - Math.floor(exacto) }
  })

  let restante = total - items.reduce((s, x) => s + x.piso, 0)
  items.sort((a, b) => b.fraccion - a.fraccion)
  for (let i = 0; i < restante; i++) {
    items[i].piso += 1
  }

  return Object.fromEntries(items.map((x) => [x.comida, x.piso])) as Record<TipoComida, number>
}

/**
 * Distribuye porciones de una categoría solo entre las comidas donde tiene
 * alimentos válidos. Redistribuye el porcentaje de comidas bloqueadas
 * proporcionalmente entre las comidas permitidas.
 */
export function distribuirConFiltro(
  total: number,
  distribucionComidas: DistribucionComidas,
  categoria: CategoriaAlimento
): DistribucionPorCategoria {
  const todasLasComidas = Object.keys(distribucionComidas) as TipoComida[]

  if (total === 0) {
    return Object.fromEntries(
      todasLasComidas.map((k) => [k, 0])
    ) as DistribucionPorCategoria
  }

  const permitidas = todasLasComidas.filter(
    (c) => poolParaComida(categoria, c).length > 0
  )

  if (permitidas.length === 0) {
    // Sin comidas con pool válido → distribuir normalmente (sin restricción definida)
    return distribuirPorciones(total, distribucionComidas) as DistribucionPorCategoria
  }

  // Construir sub-distribución solo para comidas permitidas y re-normalizar a 100%
  let totalPct = permitidas.reduce((s, c) => s + (distribucionComidas[c] ?? 0), 0)
  if (totalPct === 0) totalPct = 100

  const subDist: Partial<Record<TipoComida, number>> = {}
  for (const c of permitidas) {
    subDist[c] = ((distribucionComidas[c] ?? 0) / totalPct) * 100
  }

  const parcial = distribuirPorciones(total, subDist)

  return Object.fromEntries(
    todasLasComidas.map((c) => [c, parcial[c] ?? 0])
  ) as DistribucionPorCategoria
}
