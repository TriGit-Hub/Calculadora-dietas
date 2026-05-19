import * as XLSX from 'xlsx'
import { CATEGORIA_NOMBRES } from './alimentos'
import { agruparEnRecetas } from './recetas'

const COMIDAS_LABELS = {
  desayuno:   'Desayuno',
  colacionAM: 'Colación A.M.',
  almuerzo:   'Almuerzo',
  colacionPM: 'Colación P.M.',
  cena:       'Cena',
}

// ── CSV ──────────────────────────────────────────────────────────────────────

function escaparCSV(val) {
  const s = String(val ?? '')
  return s.includes(',') || s.includes('"') || s.includes('\n')
    ? `"${s.replace(/"/g, '""')}"`
    : s
}

function filasDeMenu(dias) {
  const filas = []
  filas.push(['Día', 'Tiempo de Comida', 'Plato / Alimento', 'Ingredientes / Categoría', 'Cantidad', 'CHO (g)', 'Proteínas (g)', 'Grasas (g)', 'Calorías (kcal)'])

  for (const { dia, menu, totales } of dias) {
    for (const [comida, items] of Object.entries(menu)) {
      if (items.length === 0) continue
      const grupos = agruparEnRecetas(items, comida)
      const labelComida = COMIDAS_LABELS[comida] || comida

      for (const grupo of grupos) {
        if (grupo.esReceta) {
          // Fila del plato
          const ingredientesTxt = grupo.componentes
            .map(c => `${c.nombre} (${c.cantidad})`)
            .join(' + ')
          filas.push([
            dia, labelComida,
            `🍽 ${grupo.recetaNombre}`,
            ingredientesTxt, '',
            grupo.CHO, grupo.CHON, grupo.COOH, grupo.kcal,
          ])
        } else {
          // Fila de alimento individual
          filas.push([
            dia, labelComida,
            grupo.nombre,
            CATEGORIA_NOMBRES[grupo.categoria] || grupo.categoria,
            grupo.cantidad,
            grupo.CHO, grupo.CHON, grupo.COOH, grupo.kcal,
          ])
        }
      }

      // Subtotal por comida
      const cho  = items.reduce((s, i) => s + i.CHO,  0)
      const chon = items.reduce((s, i) => s + i.CHON, 0)
      const cooh = items.reduce((s, i) => s + i.COOH, 0)
      const kcal = items.reduce((s, i) => s + i.kcal, 0)
      filas.push([dia, labelComida, '▸ Subtotal', '', '', cho, chon, cooh, kcal])
    }
    // Total del día
    filas.push([dia, '★ TOTAL DEL DÍA', '', '', '',
      Math.round(totales.CHO),
      Math.round(totales.CHON),
      Math.round(totales.COOH),
      Math.round(totales.kcal),
    ])
    filas.push([])
  }
  return filas
}

export function exportarCSV(dias, nombrePaciente = '') {
  const filas = filasDeMenu(dias)
  const csv = filas.map(f => f.map(escaparCSV).join(',')).join('\r\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  descargar(blob, nombreArchivo('csv', nombrePaciente, dias.length))
}

// ── Excel ────────────────────────────────────────────────────────────────────

const COLORES = {
  encabezado:  { fgColor: { rgb: '1D6FE0' } }, // azul
  subtotal:    { fgColor: { rgb: 'E8F4FD' } }, // azul claro
  totalDia:    { fgColor: { rgb: '0F4C9A' } }, // azul oscuro
  totalTexto:  { fgColor: { rgb: 'FFFFFF' } },
  separador:   { fgColor: { rgb: 'F5F5F7' } }, // gris
}

function estiloEncabezado() {
  return {
    fill: COLORES.encabezado,
    font: { color: { rgb: 'FFFFFF' }, bold: true, sz: 11 },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: bordeDelgado(),
  }
}

function bordeDelgado() {
  const b = { style: 'thin', color: { rgb: 'D1D5DB' } }
  return { top: b, bottom: b, left: b, right: b }
}

export function exportarExcel(dias, nombrePaciente = '') {
  const wb = XLSX.utils.book_new()

  // ── Hoja: Menú completo ──────────────────────────────────────────────────
  const wsData = []
  const mergeCells = []
  let fila = 0

  // Título principal
  wsData.push([`Menú Nutricional${nombrePaciente ? ' — ' + nombrePaciente : ''}`, '', '', '', '', '', '', '', ''])
  mergeCells.push({ s: { r: fila, c: 0 }, e: { r: fila, c: 8 } })
  fila++

  // Sub-título
  const hoy = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
  wsData.push([`Generado el ${hoy} · ${dias.length} día${dias.length > 1 ? 's' : ''}`, '', '', '', '', '', '', '', ''])
  mergeCells.push({ s: { r: fila, c: 0 }, e: { r: fila, c: 8 } })
  fila++

  wsData.push([]) // espacio
  fila++

  for (const { dia, menu, totales } of dias) {
    // Cabecera del día
    wsData.push([`DÍA ${dia}`, '', '', '', '', '', '', '', ''])
    mergeCells.push({ s: { r: fila, c: 0 }, e: { r: fila, c: 8 } })
    fila++

    // Encabezados de columna
    wsData.push(['Tiempo de Comida', 'Plato / Alimento', 'Ingredientes / Categoría', 'Cantidad', 'CHO (g)', 'Proteínas (g)', 'Grasas (g)', 'Calorías (kcal)', ''])
    fila++

    for (const [comida, items] of Object.entries(menu)) {
      if (items.length === 0) continue
      const grupos = agruparEnRecetas(items, comida)

      for (const grupo of grupos) {
        if (grupo.esReceta) {
          const ingredientesTxt = grupo.componentes
            .map(c => `${c.nombre} (${c.cantidad})`)
            .join(' + ')
          wsData.push([
            COMIDAS_LABELS[comida] || comida,
            grupo.recetaNombre,
            ingredientesTxt, '',
            grupo.CHO, grupo.CHON, grupo.COOH, grupo.kcal, '',
          ])
        } else {
          wsData.push([
            COMIDAS_LABELS[comida] || comida,
            grupo.nombre,
            CATEGORIA_NOMBRES[grupo.categoria] || grupo.categoria,
            grupo.cantidad,
            grupo.CHO, grupo.CHON, grupo.COOH, grupo.kcal, '',
          ])
        }
        fila++
      }

      // Subtotal comida
      const cho  = items.reduce((s, i) => s + i.CHO,  0)
      const chon = items.reduce((s, i) => s + i.CHON, 0)
      const cooh = items.reduce((s, i) => s + i.COOH, 0)
      const kcal = items.reduce((s, i) => s + i.kcal, 0)
      wsData.push(['', 'Subtotal ' + (COMIDAS_LABELS[comida] || comida), '', '', cho, chon, cooh, kcal, ''])
      fila++
    }

    // Total del día
    wsData.push([
      'TOTAL DEL DÍA', '', '', '',
      Math.round(totales.CHO),
      Math.round(totales.CHON),
      Math.round(totales.COOH),
      Math.round(totales.kcal),
      '',
    ])
    mergeCells.push({ s: { r: fila, c: 0 }, e: { r: fila, c: 3 } })
    fila++

    wsData.push([]) // separador
    fila++
  }

  // ── Hoja resumen ─────────────────────────────────────────────────────────
  const resumenData = [
    ['Día', 'Calorías (kcal)', 'CHO (g)', 'Proteínas (g)', 'Grasas (g)'],
    ...dias.map(({ dia, totales }) => [
      `Día ${dia}`,
      Math.round(totales.kcal),
      Math.round(totales.CHO),
      Math.round(totales.CHON),
      Math.round(totales.COOH),
    ]),
  ]
  if (dias.length > 1) {
    const prom = (fn) => Math.round(dias.reduce((s, d) => s + fn(d.totales), 0) / dias.length)
    resumenData.push(['Promedio', prom(t => t.kcal), prom(t => t.CHO), prom(t => t.CHON), prom(t => t.COOH)])
  }

  const ws = XLSX.utils.aoa_to_sheet(wsData)
  ws['!merges'] = mergeCells
  ws['!cols'] = [
    { wch: 16 }, { wch: 26 }, { wch: 18 }, { wch: 20 },
    { wch: 10 }, { wch: 14 }, { wch: 12 }, { wch: 16 }, { wch: 2 },
  ]

  const wsResumen = XLSX.utils.aoa_to_sheet(resumenData)
  wsResumen['!cols'] = [{ wch: 10 }, { wch: 16 }, { wch: 12 }, { wch: 14 }, { wch: 12 }]

  XLSX.utils.book_append_sheet(wb, ws, 'Menú')
  XLSX.utils.book_append_sheet(wb, wsResumen, 'Resumen')

  XLSX.writeFile(wb, nombreArchivo('xlsx', nombrePaciente, dias.length))
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function nombreArchivo(ext, nombrePaciente, numDias) {
  const base = nombrePaciente
    ? `menu_${nombrePaciente.replace(/\s+/g, '_').toLowerCase()}`
    : 'menu_nutricional'
  const sufijo = numDias === 1 ? '1dia' : `${numDias}dias`
  return `${base}_${sufijo}.${ext}`
}

function descargar(blob, nombre) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nombre
  a.click()
  URL.revokeObjectURL(url)
}
