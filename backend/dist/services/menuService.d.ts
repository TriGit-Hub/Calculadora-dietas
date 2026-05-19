import type { CategoriaAlimento, DistribucionComidas } from '../types/alimentos.types';
import type { MenuDia, ResultadoMenuDia } from '../types/menu.types';
import { type RecetasDB } from '../data/alimentos';
/**
 * Genera el menú de un solo día (sin historial).
 */
export declare function generarMenu(intercambios: Record<CategoriaAlimento, number>, distribucionComidas: DistribucionComidas, excluidos?: ReadonlySet<string>, recetasDB?: RecetasDB | null): ResultadoMenuDia;
/**
 * Genera menús para múltiples días, manteniendo un historial de alimentos
 * usados para evitar repeticiones (ventana de 3 días).
 */
export declare function generarMenuMultiDia(intercambios: Record<CategoriaAlimento, number>, distribucionComidas: DistribucionComidas, excluidos?: ReadonlySet<string>, numDias?: number, recetasDB?: RecetasDB | null): MenuDia[];
//# sourceMappingURL=menuService.d.ts.map