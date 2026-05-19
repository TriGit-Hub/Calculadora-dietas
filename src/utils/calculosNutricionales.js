export const TABLA_INTERCAMBIOS = {
  lecheEntera: { nombre: "Leche Entera", CHO_por_porcion: 12, CHON_por_porcion: 8, COOH_por_porcion: 8, KCAL_por_porcion: 150 },
  lecheSemi: { nombre: "Leche Semidescremada", CHO_por_porcion: 12, CHON_por_porcion: 8, COOH_por_porcion: 5, KCAL_por_porcion: 120 },
  lecheDes: { nombre: "Leche Descremada", CHO_por_porcion: 12, CHON_por_porcion: 8, COOH_por_porcion: 0, KCAL_por_porcion: 100 },
  vegetales: { nombre: "Vegetales", CHO_por_porcion: 5, CHON_por_porcion: 2, COOH_por_porcion: 0, KCAL_por_porcion: 25 },
  frutas: { nombre: "Frutas", CHO_por_porcion: 15, CHON_por_porcion: 0, COOH_por_porcion: 0, KCAL_por_porcion: 60 },
  cereales: { nombre: "Cereales", CHO_por_porcion: 15, CHON_por_porcion: 2, COOH_por_porcion: 1, KCAL_por_porcion: 80 },
  carnesMagras: { nombre: "Carnes Magras", CHO_por_porcion: 0, CHON_por_porcion: 7, COOH_por_porcion: 3, KCAL_por_porcion: 55 },
  carnesSemi: { nombre: "Carnes Semigrasas", CHO_por_porcion: 0, CHON_por_porcion: 7, COOH_por_porcion: 5, KCAL_por_porcion: 75 },
  carnesGordas: { nombre: "Carnes Grasas", CHO_por_porcion: 0, CHON_por_porcion: 7, COOH_por_porcion: 8, KCAL_por_porcion: 100 },
  grasas: { nombre: "Grasas", CHO_por_porcion: 0, CHON_por_porcion: 0, COOH_por_porcion: 5, KCAL_por_porcion: 45 },
}

export const ORDEN_INTERCAMBIOS = ['lecheEntera', 'lecheSemi', 'lecheDes', 'vegetales', 'frutas', 'cereales', 'carnesMagras', 'carnesSemi', 'carnesGordas', 'grasas']

export function interpretarIMC(imc) {
  if (imc < 18.5) return { texto: 'BAJO PESO', nivel: 'bajo' }
  if (imc <= 24.9) return { texto: 'NORMAL', nivel: 'normal' }
  if (imc <= 29.9) return { texto: 'SOBREPESO', nivel: 'elevado' }
  if (imc <= 34.9) return { texto: 'OBESIDAD I', nivel: 'alto' }
  if (imc <= 39.9) return { texto: 'OBESIDAD II', nivel: 'muy_alto' }
  return { texto: 'OBESIDAD III', nivel: 'muy_alto' }
}

export function interpretarGrasaVisceral(gv) {
  if (gv <= 9) return { texto: 'NORMAL', nivel: 'normal' }
  if (gv <= 14) return { texto: 'ALTO', nivel: 'elevado' }
  return { texto: 'MUY ALTO', nivel: 'muy_alto' }
}

export function interpretarPorcentajeMusculo(p, sexo, edad) {
  if (sexo === 'FEMENINO') {
    if (edad >= 18 && edad <= 39) {
      if (p < 24.3) return { texto: 'BAJO', nivel: 'bajo' }
      if (p <= 30.3) return { texto: 'NORMAL', nivel: 'normal' }
      if (p <= 35.3) return { texto: 'ELEVADO', nivel: 'elevado' }
      return { texto: 'MUY ELEVADO', nivel: 'muy_alto' }
    }
    if (edad >= 40 && edad <= 59) {
      if (p < 24.1) return { texto: 'BAJO', nivel: 'bajo' }
      if (p <= 30.1) return { texto: 'NORMAL', nivel: 'normal' }
      if (p <= 35.1) return { texto: 'ELEVADO', nivel: 'elevado' }
      return { texto: 'MUY ELEVADO', nivel: 'muy_alto' }
    }
    if (edad >= 60 && edad <= 80) {
      if (p < 23.9) return { texto: 'BAJO', nivel: 'bajo' }
      if (p <= 29.9) return { texto: 'NORMAL', nivel: 'normal' }
      if (p <= 34.9) return { texto: 'ELEVADO', nivel: 'elevado' }
      return { texto: 'MUY ELEVADO', nivel: 'muy_alto' }
    }
  }
  if (sexo === 'MASCULINO') {
    if (edad >= 18 && edad <= 39) {
      if (p < 33.3) return { texto: 'BAJO', nivel: 'bajo' }
      if (p <= 39.3) return { texto: 'NORMAL', nivel: 'normal' }
      if (p <= 44.0) return { texto: 'ELEVADO', nivel: 'elevado' }
      return { texto: 'MUY ELEVADO', nivel: 'muy_alto' }
    }
    if (edad >= 40 && edad <= 59) {
      if (p < 33.1) return { texto: 'BAJO', nivel: 'bajo' }
      if (p <= 39.1) return { texto: 'NORMAL', nivel: 'normal' }
      if (p <= 43.8) return { texto: 'ELEVADO', nivel: 'elevado' }
      return { texto: 'MUY ELEVADO', nivel: 'muy_alto' }
    }
    if (edad >= 60 && edad <= 80) {
      if (p < 32.9) return { texto: 'BAJO', nivel: 'bajo' }
      if (p <= 38.9) return { texto: 'NORMAL', nivel: 'normal' }
      if (p <= 43.6) return { texto: 'ELEVADO', nivel: 'elevado' }
      return { texto: 'MUY ELEVADO', nivel: 'muy_alto' }
    }
  }
  return { texto: 'N/A', nivel: 'normal' }
}

export function interpretarPorcentajeGrasa(p, sexo, edad) {
  if (sexo === 'FEMENINO') {
    if (edad >= 20 && edad <= 39) {
      if (p < 21.0) return { texto: 'BAJO', nivel: 'bajo' }
      if (p <= 32.9) return { texto: 'NORMAL', nivel: 'normal' }
      if (p <= 38.9) return { texto: 'ELEVADO', nivel: 'elevado' }
      return { texto: 'MUY ELEVADO', nivel: 'muy_alto' }
    }
    if (edad >= 40 && edad <= 59) {
      if (p < 23.0) return { texto: 'BAJO', nivel: 'bajo' }
      if (p <= 33.9) return { texto: 'NORMAL', nivel: 'normal' }
      if (p <= 39.9) return { texto: 'ELEVADO', nivel: 'elevado' }
      return { texto: 'MUY ELEVADO', nivel: 'muy_alto' }
    }
    if (edad >= 60 && edad <= 79) {
      if (p < 24.0) return { texto: 'BAJO', nivel: 'bajo' }
      if (p <= 35.9) return { texto: 'NORMAL', nivel: 'normal' }
      if (p <= 41.9) return { texto: 'ELEVADO', nivel: 'elevado' }
      return { texto: 'MUY ELEVADO', nivel: 'muy_alto' }
    }
  }
  if (sexo === 'MASCULINO') {
    if (edad >= 20 && edad <= 39) {
      if (p < 8.0) return { texto: 'BAJO', nivel: 'bajo' }
      if (p <= 19.9) return { texto: 'NORMAL', nivel: 'normal' }
      if (p <= 24.9) return { texto: 'ELEVADO', nivel: 'elevado' }
      return { texto: 'MUY ELEVADO', nivel: 'muy_alto' }
    }
    if (edad >= 40 && edad <= 59) {
      if (p < 11.0) return { texto: 'BAJO', nivel: 'bajo' }
      if (p <= 21.9) return { texto: 'NORMAL', nivel: 'normal' }
      if (p <= 27.9) return { texto: 'ELEVADO', nivel: 'elevado' }
      return { texto: 'MUY ELEVADO', nivel: 'muy_alto' }
    }
    if (edad >= 60 && edad <= 79) {
      if (p < 13.0) return { texto: 'BAJO', nivel: 'bajo' }
      if (p <= 24.9) return { texto: 'NORMAL', nivel: 'normal' }
      if (p <= 29.9) return { texto: 'ELEVADO', nivel: 'elevado' }
      return { texto: 'MUY ELEVADO', nivel: 'muy_alto' }
    }
  }
  return { texto: 'N/A', nivel: 'normal' }
}

export function calcularIntercambiosCereales(CHO_objetivo, intercambios) {
  const CHO_acumulado =
    (intercambios.lecheEntera * TABLA_INTERCAMBIOS.lecheEntera.CHO_por_porcion) +
    (intercambios.lecheSemi * TABLA_INTERCAMBIOS.lecheSemi.CHO_por_porcion) +
    (intercambios.lecheDes * TABLA_INTERCAMBIOS.lecheDes.CHO_por_porcion) +
    (intercambios.vegetales * TABLA_INTERCAMBIOS.vegetales.CHO_por_porcion) +
    (intercambios.frutas * TABLA_INTERCAMBIOS.frutas.CHO_por_porcion)

  const CHO_faltante = CHO_objetivo - CHO_acumulado
  return Math.floor(CHO_faltante / 15)
}

export function calcularTotalesIntercambios(intercambios) {
  const totales = { CHO: 0, CHON: 0, COOH: 0, KCAL: 0 }
  ORDEN_INTERCAMBIOS.forEach(key => {
    const cantidad = intercambios[key] || 0
    const tabla = TABLA_INTERCAMBIOS[key]
    totales.CHO += cantidad * tabla.CHO_por_porcion
    totales.CHON += cantidad * tabla.CHON_por_porcion
    totales.COOH += cantidad * tabla.COOH_por_porcion
    totales.KCAL += cantidad * tabla.KCAL_por_porcion
  })
  return totales
}

export function realizarCalculosCompletos(datos) {
  const { nombre, edad, sexo, pesoActual, talla, porcentajeMusculo, porcentajeGrasa, grasaVisceral, factorActividadFisica, distribucion, intercambios, deficitCalorico = 0 } = datos

  const tallaCM = talla * 100
  const IMC = pesoActual / (talla * talla)
  const pesoIdealMin = Math.pow(talla, 2) * 18.5
  const pesoIdealMax = Math.pow(talla, 2) * 24.9
  // Promedio entre mín y máx — base más conservadora y saludable para los cálculos
  const pesoIdealPromedio = (pesoIdealMin + pesoIdealMax) / 2

  const REE_femenino = (655.1 + (9.56 * pesoIdealPromedio) + (1.85 * tallaCM) - (4.68 * edad)) * factorActividadFisica
  const REE_masculino = (66.47 + (13.75 * pesoIdealPromedio) + (5 * tallaCM) - (6.74 * edad)) * factorActividadFisica
  const REE_seleccionado = sexo === 'FEMENINO' ? REE_femenino : REE_masculino
  // REE_efectivo es el objetivo real del plan (incluye déficit si aplica)
  const REE_efectivo = REE_seleccionado - deficitCalorico

  const pCHO = distribucion.porcentajeCHO / 100
  const pCHON = distribucion.porcentajeCHON / 100
  const pCOOH = distribucion.porcentajeCOOH / 100

  // Columnas de referencia: usan REE sin déficit
  const CHO_gramos_femenino = (REE_femenino * pCHO) / 4
  const CHO_gramos_masculino = (REE_masculino * pCHO) / 4
  const CHON_gramos_femenino = (REE_femenino * pCHON) / 4
  const CHON_gramos_masculino = (REE_masculino * pCHON) / 4
  const COOH_gramos_femenino = (REE_femenino * pCOOH) / 9
  const COOH_gramos_masculino = (REE_masculino * pCOOH) / 9

  // Columna seleccionada: usa REE_efectivo (con déficit) — base del plan real
  const CHO_gramos_seleccionado = (REE_efectivo * pCHO) / 4
  const CHON_gramos_seleccionado = (REE_efectivo * pCHON) / 4
  const COOH_gramos_seleccionado = (REE_efectivo * pCOOH) / 9

  const cerealesCalculados = calcularIntercambiosCereales(CHO_gramos_seleccionado, intercambios)

  const intercambiosFinales = { ...intercambios, cereales: cerealesCalculados }
  const totales = calcularTotalesIntercambios(intercambiosFinales)

  return {
    datosGenerales: {
      nombre, edad, sexo, pesoActual, talla, tallaCM,
      porcentajeMusculo,
      interpretacionMusculo: interpretarPorcentajeMusculo(porcentajeMusculo, sexo, edad),
      porcentajeGrasa,
      interpretacionGrasa: interpretarPorcentajeGrasa(porcentajeGrasa, sexo, edad),
      grasaVisceral,
      interpretacionGrasaVisceral: interpretarGrasaVisceral(grasaVisceral),
      factorActividadFisica,
    },
    calculosAntropometricos: {
      IMC,
      interpretacionIMC: interpretarIMC(IMC),
      pesoIdealMin,
      pesoIdealMax,
      pesoIdealPromedio,
    },
    requerimientosEnergeticos: { REE_femenino, REE_masculino, REE_seleccionado, REE_efectivo, deficitCalorico },
    distribucionNutrientes: {
      porcentajeCHO: distribucion.porcentajeCHO,
      porcentajeCHON: distribucion.porcentajeCHON,
      porcentajeCOOH: distribucion.porcentajeCOOH,
      CHO_gramos_femenino, CHO_gramos_masculino, CHO_gramos_seleccionado,
      CHO_kcal_femenino: REE_femenino * pCHO,
      CHO_kcal_masculino: REE_masculino * pCHO,
      CHO_kcal_seleccionado: REE_efectivo * pCHO,
      CHON_gramos_femenino, CHON_gramos_masculino, CHON_gramos_seleccionado,
      CHON_kcal_femenino: REE_femenino * pCHON,
      CHON_kcal_masculino: REE_masculino * pCHON,
      CHON_kcal_seleccionado: REE_efectivo * pCHON,
      COOH_gramos_femenino, COOH_gramos_masculino, COOH_gramos_seleccionado,
      COOH_kcal_femenino: REE_femenino * pCOOH,
      COOH_kcal_masculino: REE_masculino * pCOOH,
      COOH_kcal_seleccionado: REE_efectivo * pCOOH,
      totalKcal: REE_efectivo,
    },
    listaIntercambios: intercambiosFinales,
    totalesIntercambios: totales,
    margenError: { CHO: 8, CHON: 5, COOH: 3, KCAL: 100 },
  }
}
