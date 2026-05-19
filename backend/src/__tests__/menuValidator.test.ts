import { CrearMenuSchema, IntercambiosSchema, DistribucionComidasSchema } from '../validators/menuValidator'

const PAYLOAD_VALIDO = {
  intercambiosRequeridos: {
    lecheEntera: 0, lecheSemi: 2, lecheDes: 0,
    vegetales: 5, frutas: 3, cereales: 12,
    carnesMagras: 6, carnesSemi: 5, carnesGordas: 0, grasas: 2,
  },
  distribucionComidas: {
    desayuno: 25, colacionAM: 10, almuerzo: 35, colacionPM: 10, cena: 20,
  },
  opciones: { numDias: 1, excluirAlimentos: [] },
}

describe('CrearMenuSchema', () => {
  it('acepta un payload completamente válido', () => {
    const result = CrearMenuSchema.safeParse(PAYLOAD_VALIDO)
    expect(result.success).toBe(true)
  })

  it('rechaza cuando la distribución no suma 100', () => {
    const payload = {
      ...PAYLOAD_VALIDO,
      distribucionComidas: { desayuno: 30, colacionAM: 10, almuerzo: 35, colacionPM: 10, cena: 20 },
    }
    const result = CrearMenuSchema.safeParse(payload)
    expect(result.success).toBe(false)
  })

  it('rechaza cuando falta distribucionComidas', () => {
    const { distribucionComidas: _, ...sinDist } = PAYLOAD_VALIDO
    const result = CrearMenuSchema.safeParse(sinDist)
    expect(result.success).toBe(false)
  })

  it('rechaza cuando falta intercambiosRequeridos', () => {
    const { intercambiosRequeridos: _, ...sinInterc } = PAYLOAD_VALIDO
    const result = CrearMenuSchema.safeParse(sinInterc)
    expect(result.success).toBe(false)
  })

  it('excluirAlimentos tiene default [] si se omite', () => {
    const payload = { ...PAYLOAD_VALIDO, opciones: { numDias: 1 } }
    const result = CrearMenuSchema.safeParse(payload)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.opciones.excluirAlimentos).toEqual([])
    }
  })
})

describe('IntercambiosSchema', () => {
  it('rechaza intercambio negativo', () => {
    const result = IntercambiosSchema.safeParse({
      ...PAYLOAD_VALIDO.intercambiosRequeridos,
      cereales: -1,
    })
    expect(result.success).toBe(false)
  })

  it('rechaza intercambio no entero', () => {
    const result = IntercambiosSchema.safeParse({
      ...PAYLOAD_VALIDO.intercambiosRequeridos,
      frutas: 2.5,
    })
    expect(result.success).toBe(false)
  })

  it('acepta todos los intercambios en cero', () => {
    const ceros = Object.fromEntries(
      Object.keys(PAYLOAD_VALIDO.intercambiosRequeridos).map(k => [k, 0])
    )
    const result = IntercambiosSchema.safeParse(ceros)
    expect(result.success).toBe(true)
  })
})

describe('DistribucionComidasSchema', () => {
  it('acepta distribución que suma exactamente 100', () => {
    const result = DistribucionComidasSchema.safeParse(PAYLOAD_VALIDO.distribucionComidas)
    expect(result.success).toBe(true)
  })

  it('rechaza distribución que suma 99', () => {
    const result = DistribucionComidasSchema.safeParse(
      { desayuno: 25, colacionAM: 10, almuerzo: 34, colacionPM: 10, cena: 20 }
    )
    expect(result.success).toBe(false)
  })

  it('rechaza porcentaje mayor a 100', () => {
    const result = DistribucionComidasSchema.safeParse(
      { desayuno: 110, colacionAM: 0, almuerzo: 0, colacionPM: 0, cena: 0 }
    )
    expect(result.success).toBe(false)
  })

  it('rechaza porcentaje negativo', () => {
    const result = DistribucionComidasSchema.safeParse(
      { desayuno: -5, colacionAM: 35, almuerzo: 35, colacionPM: 20, cena: 15 }
    )
    expect(result.success).toBe(false)
  })
})
