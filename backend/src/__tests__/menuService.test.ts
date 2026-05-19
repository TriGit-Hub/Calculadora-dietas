import { generarMenu, generarMenuMultiDia } from '../services/menuService'
import { PROTEINAS_PRINCIPALES_IDS } from '../data/alimentos'

const INTERCAMBIOS_BASE = {
  lecheEntera: 0,
  lecheSemi: 2,
  lecheDes: 0,
  vegetales: 4,
  frutas: 3,
  cereales: 10,
  carnesMagras: 4,
  carnesSemi: 4,
  carnesGordas: 0,
  grasas: 2,
}

const DIST_DEFAULT = { desayuno: 25, colacionAM: 10, almuerzo: 35, colacionPM: 10, cena: 20 }

describe('generarMenu', () => {
  it('genera un menú con las 5 comidas definidas', () => {
    const { menu } = generarMenu(INTERCAMBIOS_BASE, DIST_DEFAULT)
    expect(menu).toHaveProperty('desayuno')
    expect(menu).toHaveProperty('colacionAM')
    expect(menu).toHaveProperty('almuerzo')
    expect(menu).toHaveProperty('colacionPM')
    expect(menu).toHaveProperty('cena')
  })

  it('el desayuno no contiene proteínas principales de almuerzo (pollo/res/pescado)', () => {
    for (let i = 0; i < 5; i++) {
      const { menu } = generarMenu(INTERCAMBIOS_BASE, DIST_DEFAULT)
      const protDesayuno = menu.desayuno.filter(item =>
        ['pollo_sin_piel', 'res_magro', 'pescado_filete', 'atun_agua', 'sardinas_agua'].includes(item.id)
      )
      expect(protDesayuno).toHaveLength(0)
    }
  })

  it('cada comida tiene como máximo una proteína principal', () => {
    for (let i = 0; i < 5; i++) {
      const { menu } = generarMenu(INTERCAMBIOS_BASE, DIST_DEFAULT)
      const comidas = ['desayuno', 'colacionAM', 'almuerzo', 'colacionPM', 'cena'] as const
      comidas.forEach(comida => {
        const proteinas = menu[comida].filter(item => PROTEINAS_PRINCIPALES_IDS.has(item.id))
        expect(proteinas.length).toBeLessThanOrEqual(1)
      })
    }
  })

  it('los totales coinciden con la suma de los items de todas las comidas', () => {
    const { menu, totales } = generarMenu(INTERCAMBIOS_BASE, DIST_DEFAULT)
    const items = Object.values(menu).flat()
    const sumaKcal = items.reduce((s, i) => s + i.kcal, 0)
    const sumaCHO  = items.reduce((s, i) => s + i.CHO,  0)
    const sumaCHON = items.reduce((s, i) => s + i.CHON, 0)
    const sumaCOOH = items.reduce((s, i) => s + i.COOH, 0)
    expect(totales.kcal).toBe(sumaKcal)
    expect(totales.CHO).toBe(sumaCHO)
    expect(totales.CHON).toBe(sumaCHON)
    expect(totales.COOH).toBe(sumaCOOH)
  })

  it('excluye alimentos correctamente', () => {
    const excluidos = new Set(['arroz', 'pasta', 'papa'])
    for (let i = 0; i < 5; i++) {
      const { menu } = generarMenu(INTERCAMBIOS_BASE, DIST_DEFAULT, excluidos)
      const items = Object.values(menu).flat()
      const excluido = items.find(item => excluidos.has(item.id))
      expect(excluido).toBeUndefined()
    }
  })

  it('cada item tiene los campos requeridos', () => {
    const { menu } = generarMenu(INTERCAMBIOS_BASE, DIST_DEFAULT)
    Object.values(menu).flat().forEach(item => {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('nombre')
      expect(item).toHaveProperty('categoria')
      expect(item).toHaveProperty('cantidad')
      expect(item).toHaveProperty('porciones')
      expect(item).toHaveProperty('CHO')
      expect(item).toHaveProperty('CHON')
      expect(item).toHaveProperty('COOH')
      expect(item).toHaveProperty('kcal')
      expect(item.porciones).toBeGreaterThan(0)
      expect(item.kcal).toBeGreaterThan(0)
    })
  })

  it('los totales son números positivos cuando hay intercambios', () => {
    const { totales } = generarMenu(INTERCAMBIOS_BASE, DIST_DEFAULT)
    expect(totales.kcal).toBeGreaterThan(0)
    expect(totales.CHO).toBeGreaterThanOrEqual(0)
    expect(totales.CHON).toBeGreaterThanOrEqual(0)
    expect(totales.COOH).toBeGreaterThanOrEqual(0)
  })
})

describe('generarMenuMultiDia', () => {
  it('genera el número correcto de días', () => {
    const menus = generarMenuMultiDia(INTERCAMBIOS_BASE, DIST_DEFAULT, new Set(), 7)
    expect(menus).toHaveLength(7)
  })

  it('los días van numerados de 1 a N en orden', () => {
    const menus = generarMenuMultiDia(INTERCAMBIOS_BASE, DIST_DEFAULT, new Set(), 5)
    menus.forEach((m, idx) => {
      expect(m.dia).toBe(idx + 1)
    })
  })

  it('cada día tiene la estructura correcta (menu + totales)', () => {
    const menus = generarMenuMultiDia(INTERCAMBIOS_BASE, DIST_DEFAULT, new Set(), 3)
    menus.forEach(m => {
      expect(m).toHaveProperty('dia')
      expect(m).toHaveProperty('menu')
      expect(m).toHaveProperty('totales')
      expect(m.menu).toHaveProperty('desayuno')
      expect(m.menu).toHaveProperty('almuerzo')
    })
  })

  it('genera 1 día correctamente', () => {
    const menus = generarMenuMultiDia(INTERCAMBIOS_BASE, DIST_DEFAULT, new Set(), 1)
    expect(menus).toHaveLength(1)
    expect(menus[0].dia).toBe(1)
  })
})
