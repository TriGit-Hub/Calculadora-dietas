import type { CategoriaAlimento, TipoComida } from './alimentos.types';
export interface Macros {
    CHO: number;
    CHON: number;
    COOH: number;
    kcal: number;
}
export interface ItemMenu extends Macros {
    id: string;
    nombre: string;
    categoria: CategoriaAlimento;
    cantidad: string;
    porciones: number;
    _receta?: string;
}
export type ComidaMenu = Record<TipoComida, ItemMenu[]>;
export interface MenuDia {
    dia: number;
    menu: ComidaMenu;
    totales: Macros;
}
/** Map categoría → porciones por tiempo de comida */
export type DistribucionPorCategoria = Record<TipoComida, number>;
/** Resultado completo de construirMenuDia */
export interface ResultadoMenuDia {
    menu: ComidaMenu;
    totales: Macros;
}
export interface OpcionesMenu {
    numDias: number;
    excluirAlimentos: string[];
}
export interface CrearMenuInput {
    intercambiosRequeridos: {
        lecheEntera: number;
        lecheSemi: number;
        lecheDes: number;
        vegetales: number;
        frutas: number;
        cereales: number;
        carnesMagras: number;
        carnesSemi: number;
        carnesGordas: number;
        grasas: number;
    };
    distribucionComidas: {
        desayuno: number;
        colacionAM: number;
        almuerzo: number;
        colacionPM: number;
        cena: number;
    };
    opciones: OpcionesMenu;
}
export interface CrearMenuOutput {
    success: true;
    data: {
        menus: MenuDia[];
    };
}
export interface ErrorOutput {
    success: false;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
}
export type ApiResponse = CrearMenuOutput | ErrorOutput;
//# sourceMappingURL=menu.types.d.ts.map