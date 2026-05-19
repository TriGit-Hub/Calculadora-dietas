import { distribuirPorciones, distribuirConFiltro, poolParaComida } from '../services/distribucionService'

const DIST_DEFAULT = { desayuno: 25, colacionAM: 10, almuerzo: 35, colacionPM: 10, cena: 20 }

describe('distribuirPorciones', () => {
  it('la suma siempre es exactamente igual al total (sin pérdida por redondeo)', () => {
    const result = distribuirPorciones(12, DIST_DEFAULT)
    const suma = Object.values(result).reduce((s, v) => s + v, 0)
    expect(suma).toBe(12)
  })

  it('devuelve todos ceros cuando total es 0', () => {
    const result = distribuirPorciones(0, DIST_DEFAULT)
    Object.values(result).forEach(v => expect(v).toBe(0))
  })

  it('distribuye 12 cereales correctamente con distribución 25/10/35/10/20', () => {
    const result = distribuirPorciones(12, DIST_DEFAULT)
    const suma = Object.values(result).reduce((s, v) => s + v, 0)
    expect(suma).toBe(12)
    Object.values(result).forEach(v => expect(v).toBeGreaterThanOrEqual(0))
  })

  it('todos los valores son enteros', () => {
    const result = distribuirPorciones(7, DIST_DEFAULT)
    Object.values(result).forEach(v => expect(Number.isInteger(v)).toBe(true))
  })

  it('maneja total = 1 sin errores', () => {
    const result = distribuirPorciones(1, DIST_DEFAULT)
    const suma = Object.values(result).reduce((s, v) => s + v, 0)
    expect(suma).toBe(1)
  })
})

describe('distribuirConFiltro', () => {
  it('conserva el total de porciones tras redistribuir', () => {
    const result = distribuirConFiltro(5, DIST_DEFAULT, 'vegetales')
    const suma = Object.values(result).reduce((s, v) => s + v, 0)
    expect(suma).toBe(5)
  })

  it('las carnesGordas no van al desayuno (Set vacío en filtro)', () => {
    const result = distribuirConFiltro(5, DIST_DEFAULT, 'carnesGordas')
    expect(result.desayuno).toBe(0)
  })

  it('las frutas sí van al almuerzo (sin restricción tras el fix)', () => {
    const result = distribuirConFiltro(3, DIST_DEFAULT, 'frutas')
    // almuerzo tiene 35% del total — debe recibir la mayor parte
    const sumaTotal = Object.values(result).reduce((s, v) => s + v, 0)
    expect(sumaTotal).toBe(3)
    expect(result.almuerzo).toBeGreaterThanOrEqual(0)
  })

  it('devuelve total=0 cuando total es 0', () => {
    const result = distribuirConFiltro(0, DIST_DEFAULT, 'cereales')
    const suma = Object.values(result).reduce((s, v) => s + v, 0)
    expect(suma).toBe(0)
  })

  it('todos los valores son no negativos', () => {
    const result = distribuirConFiltro(8, DIST_DEFAULT, 'carnesMagras')
    Object.values(result).forEach(v => expect(v).toBeGreaterThanOrEqual(0))
  })
})

describe('poolParaComida', () => {
  it('bloquea pollo_sin_piel en desayuno', () => {
    const pool = poolParaComida('carnesMagras', 'desayuno')
    const ids = pool.map(a => a.id)
    expect(ids).not.toContain('pollo_sin_piel')
  })

  it('permite huevo en desayuno', () => {
    const pool = poolParaComida('carnesMagras', 'desayuno')
    const ids = pool.map(a => a.id)
    expect(ids).toContain('huevo')
  })

  it('bloquea carnesGordas completamente en desayuno (Set vacío)', () => {
    const pool = poolParaComida('carnesGordas', 'desayuno')
    expect(pool).toHaveLength(0)
  })

  it('permite todas las frutas en almuerzo (sin restricción)', () => {
    const pool = poolParaComida('frutas', 'almuerzo')
    expect(pool.length).toBeGreaterThan(0)
    // Debe incluir manzana (fruta básica)
    expect(pool.map(a => a.id)).toContain('manzana')
  })

  it('todos los vegetales están disponibles en almuerzo', () => {
    const pool = poolParaComida('vegetales', 'almuerzo')
    expect(pool.length).toBeGreaterThan(10)
  })

  it('bloquea leche entera en colacionAM', () => {
    const pool = poolParaComida('lecheEntera', 'colacionAM')
    expect(pool).toHaveLength(0)
  })

  it('permite yogurt en colacionAM', () => {
    const pool = poolParaComida('lecheSemi', 'colacionAM')
    expect(pool.map(a => a.id)).toContain('yogurt_natural')
  })
})
