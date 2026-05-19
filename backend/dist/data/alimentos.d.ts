import type { BaseAlimentos, CategoriaAlimento, FiltrosComida } from '../types/alimentos.types';
export declare const ALIMENTOS: BaseAlimentos;
export declare const ID_A_CATEGORIA: Record<string, CategoriaAlimento>;
export declare const FILTROS_COMIDA: FiltrosComida;
export declare const COMIDAS_ORDEN: readonly ['desayuno', 'colacionAM', 'almuerzo', 'colacionPM', 'cena'];
export declare const CATEGORIAS_ORDEN: readonly CategoriaAlimento[];
export declare const CATS_LECHE: readonly CategoriaAlimento[];
/**
 * Proteínas principales: solo una permitida por comida (almuerzo/cena).
 * Pollo, res, pescado, atún, sardinas, huevo, carnes grasas.
 * Los quesos NO son proteína principal y pueden coexistir.
 */
export declare const PROTEINAS_PRINCIPALES_IDS: ReadonlySet<string>;
/**
 * Bases principales: carbohidrato estructural del plato.
 * Solo una permitida por comida.
 * Granola, cereal y frijoles son acompañamiento energético, no base principal.
 */
export declare const BASES_PRINCIPALES_IDS: ReadonlySet<string>;
export interface Receta {
    nombre: string;
    ingredientes: string[];
}
export type RecetasDB = {
    desayuno: Receta[];
    colacion: Receta[];
    almuerzo: Receta[];
    cena: Receta[];
};
export declare const RECETAS: RecetasDB;
//# sourceMappingURL=alimentos.d.ts.map