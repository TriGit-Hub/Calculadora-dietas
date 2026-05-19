// ─────────────────────────────────────────────────────────────────────────────
// Tipos base del sistema de intercambios nutricionales
// ─────────────────────────────────────────────────────────────────────────────

export type CategoriaAlimento =
  | 'lecheEntera'
  | 'lecheSemi'
  | 'lecheDes'
  | 'vegetales'
  | 'frutas'
  | 'cereales'
  | 'carnesMagras'
  | 'carnesSemi'
  | 'carnesGordas'
  | 'grasas'

export type TipoComida =
  | 'desayuno'
  | 'colacionAM'
  | 'almuerzo'
  | 'colacionPM'
  | 'cena'

export interface Alimento {
  id: string
  nombre: string
  cantidad: string
  CHO: number
  CHON: number
  COOH: number
  kcal: number
}

export type BaseAlimentos = Record<CategoriaAlimento, Alimento[]>

export type FiltroComida = Partial<Record<CategoriaAlimento, Set<string>>>

export type FiltrosComida = Record<TipoComida, FiltroComida>

export interface Intercambios {
  lecheEntera: number
  lecheSemi: number
  lecheDes: number
  vegetales: number
  frutas: number
  cereales: number
  carnesMagras: number
  carnesSemi: number
  carnesGordas: number
  grasas: number
}

export interface DistribucionComidas {
  desayuno: number
  colacionAM: number
  almuerzo: number
  colacionPM: number
  cena: number
}
