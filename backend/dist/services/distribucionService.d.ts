import type { CategoriaAlimento, DistribucionComidas, TipoComida } from '../types/alimentos.types';
import type { DistribucionPorCategoria } from '../types/menu.types';
import { ALIMENTOS } from '../data/alimentos';
/**
 * Devuelve el pool de alimentos válidos para una categoría en un tiempo de comida.
 * - Si la categoría no tiene filtro definido para esa comida: todos los alimentos.
 * - Si el Set del filtro está vacío: categoría bloqueada, retorna [].
 * - Si el Set tiene IDs: solo los alimentos con esos IDs.
 */
export declare function poolParaComida(categoria: CategoriaAlimento, comida: TipoComida): typeof ALIMENTOS[CategoriaAlimento];
/**
 * Distribuye `total` porciones entre las comidas usando el método de mayor residuo.
 * Garantiza que la suma de las porciones asignadas sea exactamente `total`.
 */
export declare function distribuirPorciones(total: number, subDist: Partial<Record<TipoComida, number>>): Record<TipoComida, number>;
/**
 * Distribuye porciones de una categoría solo entre las comidas donde tiene
 * alimentos válidos. Redistribuye el porcentaje de comidas bloqueadas
 * proporcionalmente entre las comidas permitidas.
 */
export declare function distribuirConFiltro(total: number, distribucionComidas: DistribucionComidas, categoria: CategoriaAlimento): DistribucionPorCategoria;
//# sourceMappingURL=distribucionService.d.ts.map