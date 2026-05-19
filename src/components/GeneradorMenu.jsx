import { useState } from 'react'
import { generarMenuMultiDia, ALIMENTOS, CATEGORIA_NOMBRES, GRUPOS_EXCLUSION } from '../utils/alimentos'
import { exportarCSV, exportarExcel } from '../utils/exportMenu'
import { RECETAS, agruparEnRecetas } from '../utils/recetas'
import NutritionSummary from './NutritionSummary'
import { MENUS_SALVADORENOS, getTotalesDia } from '../data/menusSalvadorenos'
import { adaptarMenuDia, adaptarRefrigerio, CONDICIONES_MEDICAS, ALERGIAS_CONFIG } from '../data/adaptacionesMedicas'

const COMIDAS_CONFIG = {
  desayuno:   { label: 'Desayuno',       icon: '🌅', default: 25 },
  colacionAM: { label: 'Colación A.M.',  icon: '🍎', default: 10 },
  almuerzo:   { label: 'Almuerzo',       icon: '🍽️', default: 35 },
  colacionPM: { label: 'Colación P.M.',  icon: '🥜', default: 10 },
  cena:       { label: 'Cena',           icon: '🌙', default: 20 },
}

const DISTRIBUCION_DEFAULT = Object.fromEntries(
  Object.entries(COMIDAS_CONFIG).map(([k, v]) => [k, v.default])
)

const OPCIONES_DIAS = [
  { valor: 1,  label: '1 día' },
  { valor: 7,  label: '7 días (semana)' },
  { valor: 14, label: '14 días (2 semanas)' },
  { valor: 30, label: '30 días (mes)' },
]

// ── Refrigerios Salvadoreños ─────────────────────────────────────────────────

const REFRIGERIOS_AM = [
  {
    dia: 1, nombre: 'Fruta con Yogur', icono: '🍎',
    descripcion: 'Manzana fresca en cubos con yogur descremado natural',
    alimentos: [
      { categoria: 'frutas',   alimento: 'Manzana',          cantidad: '1 mediana (150g)', preparacion: 'Pelada y en cubos',   CHO: 19, CHON: 0, COOH: 0, kcal: 78 },
      { categoria: 'lecheDes', alimento: 'Yogur descremado',  cantidad: '¾ taza (150g)',    preparacion: 'Natural, sin azúcar', CHO: 8,  CHON: 8, COOH: 1, kcal: 73 },
    ],
    totales: { CHO: 27, CHON: 8, COOH: 1, kcal: 151 },
  },
  {
    dia: 2, nombre: 'Pan con Frijoles', icono: '🍞',
    descripcion: 'Pan francés tostado con frijoles parados sazonados',
    alimentos: [
      { categoria: 'cereales',  alimento: 'Pan francés',      cantidad: '1 pieza (40g)',    preparacion: 'Tostado',        CHO: 22, CHON: 4, COOH: 1, kcal: 113 },
      { categoria: 'vegetales', alimento: 'Frijoles parados', cantidad: '¼ taza (60g)',     preparacion: 'Con sal y ajo',  CHO: 8,  CHON: 3, COOH: 0, kcal: 44  },
    ],
    totales: { CHO: 30, CHON: 7, COOH: 1, kcal: 157 },
  },
  {
    dia: 3, nombre: 'Plátano y Café', icono: '🍌',
    descripcion: 'Plátano maduro con café negro sin azúcar',
    alimentos: [
      { categoria: 'frutas',   alimento: 'Plátano maduro', cantidad: '1 mediano (100g)', preparacion: 'Fresco',      CHO: 23, CHON: 1, COOH: 0, kcal: 96 },
      { categoria: 'lecheDes', alimento: 'Café negro',     cantidad: '1 taza (240ml)',   preparacion: 'Sin azúcar',  CHO: 0,  CHON: 0, COOH: 0, kcal: 2  },
    ],
    totales: { CHO: 23, CHON: 1, COOH: 0, kcal: 98 },
  },
  {
    dia: 4, nombre: 'Ensalada de Frutas', icono: '🍍',
    descripcion: 'Mix de frutas tropicales de temporada con limón',
    alimentos: [
      { categoria: 'frutas', alimento: 'Piña',   cantidad: '½ taza (80g)', preparacion: 'En cubos', CHO: 11, CHON: 0, COOH: 0, kcal: 42 },
      { categoria: 'frutas', alimento: 'Papaya', cantidad: '½ taza (75g)', preparacion: 'En cubos', CHO: 9,  CHON: 0, COOH: 0, kcal: 30 },
      { categoria: 'frutas', alimento: 'Melón',  cantidad: '½ taza (80g)', preparacion: 'En cubos', CHO: 8,  CHON: 1, COOH: 0, kcal: 27 },
    ],
    totales: { CHO: 28, CHON: 1, COOH: 0, kcal: 99 },
  },
  {
    dia: 5, nombre: 'Tortilla con Queso', icono: '🫓',
    descripcion: 'Tortilla de maíz con queso fresco artesanal',
    alimentos: [
      { categoria: 'cereales',     alimento: 'Tortilla de maíz', cantidad: '1 tortilla (30g)', preparacion: 'Caliente',      CHO: 13, CHON: 2, COOH: 1, kcal: 69 },
      { categoria: 'carnesMagras', alimento: 'Queso fresco',     cantidad: '1 onza (28g)',     preparacion: 'En rebanadas',  CHO: 1,  CHON: 6, COOH: 5, kcal: 75 },
    ],
    totales: { CHO: 14, CHON: 8, COOH: 6, kcal: 144 },
  },
  {
    dia: 6, nombre: 'Atole de Maíz', icono: '☕',
    descripcion: 'Atole criollo de maíz blanco con leche',
    alimentos: [
      { categoria: 'cereales',  alimento: 'Masa de maíz',     cantidad: '2 cdas. (30g)',  preparacion: 'Disuelto en agua', CHO: 20, CHON: 2, COOH: 1, kcal: 97 },
      { categoria: 'lecheDes',  alimento: 'Leche descremada', cantidad: '½ taza (120ml)', preparacion: 'Mezclada',         CHO: 6,  CHON: 4, COOH: 0, kcal: 41 },
    ],
    totales: { CHO: 26, CHON: 6, COOH: 1, kcal: 138 },
  },
  {
    dia: 7, nombre: 'Naranja y Nueces', icono: '🍊',
    descripcion: 'Naranja fresca con un puñado de nueces crudas',
    alimentos: [
      { categoria: 'frutas', alimento: 'Naranja', cantidad: '1 mediana (130g)', preparacion: 'Pelada',  CHO: 15, CHON: 1, COOH: 0, kcal: 62 },
      { categoria: 'grasas', alimento: 'Nueces',  cantidad: '6 mitades (15g)',  preparacion: 'Crudas',  CHO: 2,  CHON: 2, COOH: 9, kcal: 98 },
    ],
    totales: { CHO: 17, CHON: 3, COOH: 9, kcal: 160 },
  },
]

const REFRIGERIOS_PM = [
  {
    dia: 1, nombre: 'Galletas con Quesillo', icono: '🧀',
    descripcion: 'Galletas saladas con quesillo salvadoreño en tiras',
    alimentos: [
      { categoria: 'cereales',     alimento: 'Galletas saladas', cantidad: '6 galletas (20g)', preparacion: 'Sin mantequilla', CHO: 14, CHON: 2, COOH: 2, kcal: 82 },
      { categoria: 'carnesMagras', alimento: 'Quesillo',         cantidad: '1 onza (28g)',     preparacion: 'En tiras',        CHO: 1,  CHON: 7, COOH: 6, kcal: 86 },
    ],
    totales: { CHO: 15, CHON: 9, COOH: 8, kcal: 168 },
  },
  {
    dia: 2, nombre: 'Licuado de Plátano', icono: '🥤',
    descripcion: 'Licuado de plátano con leche descremada sin azúcar',
    alimentos: [
      { categoria: 'frutas',   alimento: 'Plátano maduro',   cantidad: '1 pequeño (80g)', preparacion: 'Licuado', CHO: 18, CHON: 1, COOH: 0, kcal: 73 },
      { categoria: 'lecheDes', alimento: 'Leche descremada', cantidad: '1 taza (240ml)',  preparacion: 'Fría',    CHO: 12, CHON: 8, COOH: 0, kcal: 83 },
    ],
    totales: { CHO: 30, CHON: 9, COOH: 0, kcal: 156 },
  },
  {
    dia: 3, nombre: 'Guacamole con Totopostes', icono: '🥑',
    descripcion: 'Guacamole casero con totopostes de maíz',
    alimentos: [
      { categoria: 'grasas',   alimento: 'Aguacate',   cantidad: '¼ mediano (40g)', preparacion: 'Aplastado con limón', CHO: 2,  CHON: 1, COOH: 7, kcal: 74 },
      { categoria: 'cereales', alimento: 'Totopostes', cantidad: '10 piezas (20g)', preparacion: 'Sin sal extra',       CHO: 14, CHON: 2, COOH: 2, kcal: 82 },
    ],
    totales: { CHO: 16, CHON: 3, COOH: 9, kcal: 156 },
  },
  {
    dia: 4, nombre: 'Fruta de Temporada', icono: '🥭',
    descripcion: 'Manga fresca en tajadas con chile y limón',
    alimentos: [
      { categoria: 'frutas', alimento: 'Manga', cantidad: '1 taza (165g)', preparacion: 'En tajadas con limón', CHO: 25, CHON: 1, COOH: 0, kcal: 99 },
    ],
    totales: { CHO: 25, CHON: 1, COOH: 0, kcal: 99 },
  },
  {
    dia: 5, nombre: 'Yogur con Granola', icono: '🫙',
    descripcion: 'Yogur descremado con granola artesanal sin azúcar',
    alimentos: [
      { categoria: 'lecheDes', alimento: 'Yogur descremado', cantidad: '¾ taza (150g)',  preparacion: 'Natural',    CHO: 8,  CHON: 8, COOH: 1, kcal: 73 },
      { categoria: 'cereales', alimento: 'Granola',          cantidad: '2 cdas. (20g)', preparacion: 'Sin azúcar', CHO: 14, CHON: 2, COOH: 3, kcal: 91 },
    ],
    totales: { CHO: 22, CHON: 10, COOH: 4, kcal: 164 },
  },
  {
    dia: 6, nombre: 'Mix de Nueces y Pasas', icono: '🥜',
    descripcion: 'Mezcla de almendras y uvas pasas naturales',
    alimentos: [
      { categoria: 'grasas', alimento: 'Almendras',  cantidad: '10 unidades (14g)', preparacion: 'Sin tostar', CHO: 3,  CHON: 3, COOH: 9, kcal: 81 },
      { categoria: 'frutas', alimento: 'Uvas pasas', cantidad: '1 cda. (15g)',      preparacion: 'Naturales',  CHO: 12, CHON: 0, COOH: 0, kcal: 45 },
    ],
    totales: { CHO: 15, CHON: 3, COOH: 9, kcal: 126 },
  },
  {
    dia: 7, nombre: 'Pan Integral con Aguacate', icono: '🥑',
    descripcion: 'Tostada de pan integral con aguacate y limón',
    alimentos: [
      { categoria: 'cereales', alimento: 'Pan integral', cantidad: '1 rebanada (30g)', preparacion: 'Tostado',          CHO: 13, CHON: 3, COOH: 1, kcal: 69 },
      { categoria: 'grasas',   alimento: 'Aguacate',     cantidad: '¼ mediano (40g)', preparacion: 'Untado con limón', CHO: 2,  CHON: 1, COOH: 7, kcal: 74 },
    ],
    totales: { CHO: 15, CHON: 4, COOH: 8, kcal: 143 },
  },
]

// ── Subcomponentes ───────────────────────────────────────────────────────────

function MacroBadge({ cho, chon, cooh, kcal, compact = false }) {
  const base = compact ? 'text-[9px]' : 'text-[10px]'
  return (
    <div className="flex gap-1.5 flex-wrap mt-1">
      <span className={`${base} bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full font-medium`}>C {cho}g</span>
      <span className={`${base} bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-full font-medium`}>P {chon}g</span>
      <span className={`${base} bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded-full font-medium`}>G {cooh}g</span>
      <span className={`${base} bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded-full font-medium`}>{kcal} kcal</span>
    </div>
  )
}

function ComponenteItem({ item }) {
  return (
    <div className="flex items-center gap-1.5 py-0.5">
      <span className="w-1 h-1 rounded-full bg-apple-mid/40 flex-shrink-0" />
      <span className="text-[11px] text-apple-mid dark:text-gray-400">
        <span className="font-medium text-apple-dark dark:text-gray-200">{item.nombre}</span>
        {' · '}{item.cantidad}
      </span>
    </div>
  )
}

function RecetaItem({ grupo }) {
  const [expandido, setExpandido] = useState(false)
  return (
    <div className="px-4 py-3 bg-gradient-to-r from-blue-50/60 dark:from-blue-900/20 to-transparent border-l-2 border-apple-blue">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-base leading-none">{grupo.icono}</span>
            <p className="text-sm font-semibold text-apple-dark dark:text-gray-100">{grupo.recetaNombre}</p>
          </div>
          <button
            type="button"
            onClick={() => setExpandido(v => !v)}
            className="flex items-center gap-1 mt-1 text-[11px] text-apple-blue hover:text-blue-700 dark:hover:text-blue-400 font-medium"
          >
            {expandido ? '▲ Ocultar ingredientes' : `▼ Ver ${grupo.componentes.length} ingredientes`}
          </button>
          {expandido && (
            <div className="mt-1.5 pl-1">
              {grupo.componentes.map((c, i) => (
                <ComponenteItem key={i} item={c} />
              ))}
            </div>
          )}
          <MacroBadge cho={grupo.CHO} chon={grupo.CHON} cooh={grupo.COOH} kcal={grupo.kcal} />
        </div>
        <span className="text-[10px] text-apple-blue bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 px-2 py-1 rounded-lg flex-shrink-0 mt-0.5 font-medium">
          Plato
        </span>
      </div>
    </div>
  )
}

function AlimentoItem({ item }) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="text-sm font-medium text-apple-dark dark:text-gray-100">{item.nombre}</p>
          <p className="text-xs text-apple-mid dark:text-gray-400 mt-0.5">{item.cantidad}</p>
          <MacroBadge cho={item.CHO} chon={item.CHON} cooh={item.COOH} kcal={item.kcal} />
        </div>
        <span className="text-[10px] text-apple-mid dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 px-2 py-1 rounded-lg flex-shrink-0 mt-0.5">
          {CATEGORIA_NOMBRES[item.categoria] || item.categoria}
        </span>
      </div>
    </div>
  )
}

function ComidaCard({ comida, items }) {
  const config     = COMIDAS_CONFIG[comida]
  const grupos     = agruparEnRecetas(items, comida)
  const kcalTotal  = items.reduce((s, i) => s + i.kcal, 0)
  const choTotal   = items.reduce((s, i) => s + i.CHO,  0)
  const chonTotal  = items.reduce((s, i) => s + i.CHON, 0)
  const coohTotal  = items.reduce((s, i) => s + i.COOH, 0)
  const numRecetas = grupos.filter(g => g.esReceta).length

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-apple p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{config.icon}</span>
          <h4 className="text-sm font-semibold text-apple-dark dark:text-gray-100">{config.label}</h4>
        </div>
        <p className="text-xs text-apple-mid dark:text-gray-400 italic">Sin porciones asignadas</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-apple overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-base">{config.icon}</span>
          <h4 className="text-sm font-semibold text-apple-dark dark:text-gray-100">{config.label}</h4>
          {numRecetas > 0 && (
            <span className="text-[10px] text-apple-blue bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full font-medium">
              {numRecetas} plato{numRecetas > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <span className="text-xs font-bold text-apple-blue bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full">
          {kcalTotal} kcal
        </span>
      </div>
      <div className="divide-y divide-gray-50 dark:divide-gray-700">
        {grupos.map((grupo, idx) =>
          grupo.esReceta
            ? <RecetaItem key={idx} grupo={grupo} />
            : <AlimentoItem key={idx} item={grupo} />
        )}
      </div>
      <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
        <div className="flex gap-3 flex-wrap">
          <span className="text-[10px] font-semibold text-apple-mid dark:text-gray-400">Totales:</span>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">CHO {choTotal}g</span>
          <span className="text-[10px] text-green-600 dark:text-green-400 font-medium">Prot {chonTotal}g</span>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">Grasas {coohTotal}g</span>
        </div>
      </div>
    </div>
  )
}

function PanelExcluidos({ excluidos, toggleExcluido }) {
  const [grupoActivo, setGrupoActivo] = useState(0)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-apple overflow-hidden">
      <div className="flex overflow-x-auto border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 scrollbar-hide">
        {GRUPOS_EXCLUSION.map((grupo, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setGrupoActivo(idx)}
            className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap flex-shrink-0 transition-colors border-b-2 ${
              grupoActivo === idx
                ? 'border-apple-blue text-apple-blue bg-white dark:bg-gray-800'
                : 'border-transparent text-apple-mid dark:text-gray-400 hover:text-apple-dark dark:hover:text-gray-200'
            }`}
          >
            {grupo.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {GRUPOS_EXCLUSION[grupoActivo].categorias.map(cat => (
          <div key={cat} className="mb-4 last:mb-0">
            <p className="text-[10px] font-bold text-apple-mid dark:text-gray-400 uppercase tracking-wide mb-2">
              {CATEGORIA_NOMBRES[cat]}
            </p>
            <div className="flex flex-wrap gap-2">
              {ALIMENTOS[cat]?.map(alimento => {
                const isExcluido = excluidos.has(alimento.id)
                return (
                  <button
                    key={alimento.id}
                    type="button"
                    onClick={() => toggleExcluido(alimento.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                      isExcluido
                        ? 'bg-red-50 border-red-200 text-red-400 line-through'
                        : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-apple-dark dark:text-gray-200 hover:border-apple-blue/50'
                    }`}
                  >
                    {isExcluido ? '✕' : '✓'} {alimento.nombre}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      {excluidos.size > 0 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-apple-mid dark:text-gray-400">
            {excluidos.size} alimento{excluidos.size > 1 ? 's' : ''} excluido{excluidos.size > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  )
}

function NavDias({ numDias, diaActivo, onChange }) {
  if (numDias <= 7) {
    return (
      <div className="flex overflow-x-auto gap-1 pb-1 scrollbar-hide">
        {Array.from({ length: numDias }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-colors ${
              diaActivo === i
                ? 'bg-apple-blue text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-apple-mid dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Día {i + 1}
          </button>
        ))}
      </div>
    )
  }

  const semana      = Math.floor(diaActivo / 7)
  const totalSemanas = Math.ceil(numDias / 7)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
        {Array.from({ length: totalSemanas }, (_, s) => (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s * 7)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-colors ${
              semana === s
                ? 'bg-apple-blue text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-apple-mid dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Semana {s + 1}
          </button>
        ))}
      </div>
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
        {Array.from({ length: 7 }, (_, d) => {
          const idx = semana * 7 + d
          if (idx >= numDias) return null
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-colors ${
                diaActivo === idx
                  ? 'bg-apple-blue text-white'
                  : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-apple-mid dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              D{idx + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ResumenSemanal({ menus }) {
  if (menus.length <= 1) return null
  const prom = (fn) => Math.round(menus.reduce((s, d) => s + fn(d.totales), 0) / menus.length)
  return (
    <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
      <p className="text-xs font-semibold text-apple-mid dark:text-gray-400 uppercase tracking-wide mb-3">
        Promedio diario · {menus.length} días
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Calorías',      val: prom(t => t.kcal), unit: 'kcal', color: 'text-apple-blue' },
          { label: 'Carbohidratos', val: prom(t => t.CHO),  unit: 'g',    color: 'text-blue-500 dark:text-blue-400' },
          { label: 'Proteínas',     val: prom(t => t.CHON), unit: 'g',    color: 'text-green-600 dark:text-green-400' },
          { label: 'Grasas',        val: prom(t => t.COOH), unit: 'g',    color: 'text-amber-600 dark:text-amber-400' },
        ].map(({ label, val, unit, color }) => (
          <div key={label} className="text-center">
            <p className={`text-lg font-bold ${color}`}>{val}</p>
            <p className="text-[10px] text-apple-mid dark:text-gray-400 mt-0.5">{unit} · {label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Menús Salvadoreños ───────────────────────────────────────────────────────

const COMIDAS_SV = [
  { key: 'desayuno', label: 'Desayuno', icon: '🌅' },
  { key: 'almuerzo', label: 'Almuerzo', icon: '🍽️' },
  { key: 'cena',     label: 'Cena',     icon: '🌙' },
]

const CAT_STYLE = {
  carnesMagras: { label: 'Carne Magra', cls: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700' },
  carnesSemi:   { label: 'Carne Semi',  cls: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700' },
  carnesGordas: { label: 'Carne Grasa', cls: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700' },
  cereales:     { label: 'Cereal',      cls: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700' },
  frutas:       { label: 'Fruta',       cls: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700' },
  vegetales:    { label: 'Vegetal',     cls: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-700' },
  lecheDes:     { label: 'Leche Desc.', cls: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700' },
  lecheSemi:    { label: 'Leche Semi',  cls: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:border-sky-700' },
  lecheEntera:  { label: 'Leche Ent.',  cls: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-700' },
  grasas:       { label: 'Grasa',       cls: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700' },
}

function AlimentoSvRow({ item }) {
  const style = CAT_STYLE[item.categoria] || { label: item.categoria, cls: 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600' }

  if (item.excluido) {
    return (
      <div className="flex items-start gap-2 py-2 border-b border-gray-50 dark:border-gray-700 last:border-0">
        <div className="flex-1 min-w-0 opacity-50">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border flex-shrink-0 ${style.cls}`}>{style.label}</span>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 line-through">{item.alimento}</span>
          </div>
          <p className="text-[10px] text-apple-mid dark:text-gray-500 mt-0.5 line-through">{item.cantidad}</p>
        </div>
        <div className="flex-shrink-0 flex flex-col items-end gap-0.5 max-w-[130px]">
          <span className="text-[9px] bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700 px-1.5 py-0.5 rounded font-medium whitespace-nowrap">✕ Excluido</span>
          {item.razonExclusion && <span className="text-[9px] text-red-500 dark:text-red-400 text-right leading-tight">{item.razonExclusion}</span>}
          {item.alternativa && <span className="text-[9px] text-gray-400 dark:text-gray-500 text-right leading-tight">Alt: {item.alternativa}</span>}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-start gap-2 py-2 border-b border-gray-50 dark:border-gray-700 last:border-0 ${item.modificado ? 'bg-amber-50/60 dark:bg-amber-900/10' : ''}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border flex-shrink-0 ${style.cls}`}>{style.label}</span>
          <span className={`text-xs font-medium ${item.modificado ? 'text-amber-700 dark:text-amber-400' : 'text-apple-dark dark:text-gray-200'}`}>
            {item.alimento}
          </span>
          {item.modificado && <span className="text-[9px] bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-700 px-1 py-0.5 rounded font-medium flex-shrink-0">✎</span>}
        </div>
        <p className={`text-[10px] mt-0.5 ${item.modificado ? 'text-amber-600 dark:text-amber-500' : 'text-apple-mid dark:text-gray-400'}`}>
          {item.cantidad} · {item.preparacion}
        </p>
        {item.modificado && item.modificaciones?.length > 0 && (
          <div className="mt-1 flex flex-col gap-0.5">
            {item.modificaciones.map((m, i) => (
              <span key={i} className="text-[9px] text-amber-600 dark:text-amber-500 leading-tight">→ {m}</span>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-1 flex-shrink-0 flex-wrap justify-end">
        {item.CHO  > 0 && <span className="text-[9px] bg-blue-50  dark:bg-blue-900/30  text-blue-600  dark:text-blue-400  px-1 py-0.5 rounded font-medium">C {item.CHO}g</span>}
        {item.CHON > 0 && <span className="text-[9px] bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1 py-0.5 rounded font-medium">P {item.CHON}g</span>}
        {item.COOH > 0 && <span className="text-[9px] bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-1 py-0.5 rounded font-medium">G {item.COOH}g</span>}
        <span className="text-[9px] bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1 py-0.5 rounded font-medium">{item.kcal}</span>
      </div>
    </div>
  )
}

function ComidaSvCard({ comida }) {
  const [expandido, setExpandido] = useState(false)
  const cfg = COMIDAS_SV.find(c => c.key === comida.key) || { icon: '🍴', label: comida.key }
  const alimentos = comida.data.alimentos || []

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-apple overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-base">{cfg.icon}</span>
          <h4 className="text-sm font-semibold text-apple-dark dark:text-gray-100">{cfg.label}</h4>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full font-medium">Salvadoreño</span>
          {comida.data.itemsAdaptados > 0 && (
            <span className="text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 px-2 py-0.5 rounded-full font-medium">
              ✎ {comida.data.itemsAdaptados} cambio{comida.data.itemsAdaptados > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <span className="text-xs font-bold text-apple-blue bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full">
          {comida.data.totales.kcal} kcal
        </span>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm font-semibold text-apple-dark dark:text-gray-100">{comida.data.nombre}</p>
        <p className="text-[11px] text-apple-mid dark:text-gray-400 mt-0.5">{comida.data.descripcion}</p>
        <button
          type="button"
          onClick={() => setExpandido(v => !v)}
          className="flex items-center gap-1 mt-2 text-[11px] text-apple-blue hover:text-blue-700 dark:hover:text-blue-400 font-medium"
        >
          {expandido ? '▲ Ocultar ingredientes' : `▼ Ver ${alimentos.length} ingredientes`}
        </button>
        {expandido && (
          <div className="mt-2">
            {alimentos.map((item, i) => (
              <AlimentoSvRow key={i} item={item} />
            ))}
          </div>
        )}
      </div>
      <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
        <div className="flex gap-3 flex-wrap">
          <span className="text-[10px] font-semibold text-apple-mid dark:text-gray-400">Totales:</span>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">CHO {comida.data.totales.CHO}g</span>
          <span className="text-[10px] text-green-600 dark:text-green-400 font-medium">Prot {comida.data.totales.CHON}g</span>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">Grasas {comida.data.totales.COOH}g</span>
        </div>
      </div>
    </div>
  )
}

function RefrigerioCard({ refrigerio, tipo }) {
  const [expandido, setExpandido] = useState(false)
  const cfg = tipo === 'am'
    ? { icon: '🍎', label: 'Refrigerio Mañana' }
    : { icon: '🥜', label: 'Refrigerio Tarde' }
  const alimentos = refrigerio.alimentos || []

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-apple overflow-hidden border-l-4 border-orange-400 dark:border-orange-500">
      <div className="flex items-center justify-between px-4 py-3 bg-orange-50/60 dark:bg-orange-900/10 border-b border-orange-100 dark:border-orange-900/30">
        <div className="flex items-center gap-2">
          <span className="text-base">{cfg.icon}</span>
          <h4 className="text-sm font-semibold text-apple-dark dark:text-gray-100">{cfg.label}</h4>
          <span className="text-[10px] text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 px-2 py-0.5 rounded-full font-medium border border-orange-200 dark:border-orange-700">Refrigerio</span>
        </div>
        <span className="text-xs font-bold text-apple-blue bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full">
          {refrigerio.totales.kcal} kcal
        </span>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm font-semibold text-apple-dark dark:text-gray-100">{refrigerio.icono} {refrigerio.nombre}</p>
        <p className="text-[11px] text-apple-mid dark:text-gray-400 mt-0.5">{refrigerio.descripcion}</p>
        {alimentos.length > 0 && (
          <>
            <button
              type="button"
              onClick={() => setExpandido(v => !v)}
              className="flex items-center gap-1 mt-2 text-[11px] text-apple-blue hover:text-blue-700 dark:hover:text-blue-400 font-medium"
            >
              {expandido ? '▲ Ocultar ingredientes' : `▼ Ver ${alimentos.length} ingredientes`}
            </button>
            {expandido && (
              <div className="mt-2">
                {alimentos.map((item, i) => (
                  <AlimentoSvRow key={i} item={item} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <div className="px-4 py-2.5 bg-orange-50/60 dark:bg-orange-900/10 border-t border-orange-100 dark:border-orange-900/30">
        <div className="flex gap-3 flex-wrap">
          <span className="text-[10px] font-semibold text-apple-mid dark:text-gray-400">Totales:</span>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">CHO {refrigerio.totales.CHO}g</span>
          <span className="text-[10px] text-green-600 dark:text-green-400 font-medium">Prot {refrigerio.totales.CHON}g</span>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">Grasas {refrigerio.totales.COOH}g</span>
        </div>
      </div>
    </div>
  )
}

const OPCIONES_REF = [
  { label: 'Ninguno',      am: false, pm: false },
  { label: 'Media Mañana', am: true,  pm: false },
  { label: 'Media Tarde',  am: false, pm: true  },
  { label: 'Ambos',        am: true,  pm: true  },
]

function PanelMenuSalvadoreno() {
  const [diaActivo, setDiaActivo]             = useState(0)
  const [incluyeAM, setIncluyeAM]             = useState(false)
  const [incluyePM, setIncluyePM]             = useState(false)
  const [condicionesActivas, setCondicionesActivas] = useState([])
  const [alergiasActivas, setAlergiasActivas] = useState([])
  const [mostrarAlergias, setMostrarAlergias] = useState(false)

  const menuDia = MENUS_SALVADORENOS[diaActivo]
  const refAM   = REFRIGERIOS_AM[diaActivo]
  const refPM   = REFRIGERIOS_PM[diaActivo]

  const menuAdaptado   = adaptarMenuDia(menuDia, condicionesActivas, alergiasActivas)
  const refAMAdaptado  = adaptarRefrigerio(refAM, condicionesActivas, alergiasActivas)
  const refPMAdaptado  = adaptarRefrigerio(refPM, condicionesActivas, alergiasActivas)

  const base = getTotalesDia(menuDia)
  const totalesDia = {
    CHO:  base.CHO  + (incluyeAM ? refAM.totales.CHO  : 0) + (incluyePM ? refPM.totales.CHO  : 0),
    CHON: base.CHON + (incluyeAM ? refAM.totales.CHON : 0) + (incluyePM ? refPM.totales.CHON : 0),
    COOH: base.COOH + (incluyeAM ? refAM.totales.COOH : 0) + (incluyePM ? refPM.totales.COOH : 0),
    kcal: base.kcal + (incluyeAM ? refAM.totales.kcal : 0) + (incluyePM ? refPM.totales.kcal : 0),
  }

  const opcionActiva = OPCIONES_REF.findIndex(o => o.am === incluyeAM && o.pm === incluyePM)

  const toggleCondicion = (c) => setCondicionesActivas(prev =>
    prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
  )
  const toggleAlergia = (a) => setAlergiasActivas(prev =>
    prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
  )

  const totalAdaptaciones =
    (menuAdaptado.desayuno?.itemsAdaptados || 0) +
    (menuAdaptado.almuerzo?.itemsAdaptados || 0) +
    (menuAdaptado.cena?.itemsAdaptados     || 0)

  const etiquetasActivas = [
    ...condicionesActivas.map(c => CONDICIONES_MEDICAS[c]?.label),
    ...alergiasActivas.map(a => `alergia a ${ALERGIAS_CONFIG[a]?.label}`),
  ]

  return (
    <div className="mt-4">
      {/* Selector de días */}
      <div className="flex overflow-x-auto gap-1 pb-1 scrollbar-hide mb-4">
        {MENUS_SALVADORENOS.map((m, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setDiaActivo(i)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-colors ${
              diaActivo === i
                ? 'bg-apple-blue text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-apple-mid dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Día {m.dia}
          </button>
        ))}
      </div>

      {/* Condiciones médicas */}
      <div className="mb-4">
        <p className="text-xs font-medium text-apple-mid dark:text-gray-400 mb-2">Condiciones médicas</p>
        <div className="grid grid-cols-2 gap-1.5">
          {Object.entries(CONDICIONES_MEDICAS).map(([key, cfg]) => {
            const activo = condicionesActivas.includes(key)
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleCondicion(key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activo
                    ? cfg.colorActivo
                    : 'bg-gray-50 dark:bg-gray-700/50 text-apple-mid dark:text-gray-400 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <span>{cfg.icono}</span>
                <span>{cfg.label}</span>
                {activo && <span className="ml-auto text-[10px] opacity-80">✓</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Alergias (collapsible) */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setMostrarAlergias(v => !v)}
          className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors mb-2"
        >
          <span className="text-xs font-medium text-apple-dark dark:text-gray-200">Alergias alimentarias</span>
          <div className="flex items-center gap-2">
            {alergiasActivas.length > 0 && (
              <span className="text-[10px] text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded-full font-medium">
                {alergiasActivas.length} activa{alergiasActivas.length > 1 ? 's' : ''}
              </span>
            )}
            <span className="text-apple-mid dark:text-gray-400 text-xs">{mostrarAlergias ? '▲' : '▼'}</span>
          </div>
        </button>
        {mostrarAlergias && (
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(ALERGIAS_CONFIG).map(([key, cfg]) => {
              const activo = alergiasActivas.includes(key)
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleAlergia(key)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    activo
                      ? 'bg-red-500 dark:bg-red-600 text-white border-transparent'
                      : 'bg-gray-50 dark:bg-gray-700/50 text-apple-mid dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-700'
                  }`}
                >
                  {cfg.icono} {cfg.label}
                  {activo && <span className="ml-0.5 text-[10px]">✓</span>}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Resumen de adaptaciones activas */}
      {totalAdaptaciones > 0 && (
        <div className="mb-4 px-3 py-2.5 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/50 rounded-xl flex items-start gap-2">
          <span className="text-amber-500 flex-shrink-0 mt-0.5">✎</span>
          <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-snug">
            <span className="font-semibold">{totalAdaptaciones} elemento{totalAdaptaciones > 1 ? 's' : ''} adaptado{totalAdaptaciones > 1 ? 's' : ''}</span>
            {etiquetasActivas.length > 0 && ` — ${etiquetasActivas.join(', ')}`}
          </p>
        </div>
      )}

      {/* Toggle de refrigerios */}
      <div className="mb-4">
        <p className="text-xs font-medium text-apple-mid dark:text-gray-400 mb-2">Incluir refrigerios</p>
        <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-xl">
          {OPCIONES_REF.map((op, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => { setIncluyeAM(op.am); setIncluyePM(op.pm) }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                opcionActiva === idx
                  ? 'bg-white dark:bg-gray-600 text-apple-dark dark:text-gray-100 shadow-sm'
                  : 'text-apple-mid dark:text-gray-400 hover:text-apple-dark dark:hover:text-gray-200'
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards de comidas con refrigerios intercalados */}
      <div className="flex flex-col gap-3">
        <ComidaSvCard comida={{ key: 'desayuno', data: menuAdaptado.desayuno }} />
        {incluyeAM && <RefrigerioCard refrigerio={refAMAdaptado} tipo="am" />}
        <ComidaSvCard comida={{ key: 'almuerzo', data: menuAdaptado.almuerzo }} />
        {incluyePM && <RefrigerioCard refrigerio={refPMAdaptado} tipo="pm" />}
        <ComidaSvCard comida={{ key: 'cena', data: menuAdaptado.cena }} />
      </div>

      {/* Totales del día */}
      <div className="mt-4 bg-apple-blue rounded-2xl p-4 text-white">
        <p className="text-xs font-medium opacity-80 mb-2 uppercase tracking-wide">
          Totales del día {menuDia.dia}
          {(incluyeAM || incluyePM) && (
            <span className="ml-1 opacity-70 normal-case font-normal">
              · incl. {incluyeAM && incluyePM ? 'ambos refrigerios' : incluyeAM ? 'refr. mañana' : 'refr. tarde'}
            </span>
          )}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Calorías',      val: totalesDia.kcal, unit: 'kcal' },
            { label: 'Carbohidratos', val: totalesDia.CHO,  unit: 'g' },
            { label: 'Proteínas',     val: totalesDia.CHON, unit: 'g' },
            { label: 'Grasas',        val: totalesDia.COOH, unit: 'g' },
          ].map(({ label, val, unit }) => (
            <div key={label} className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-lg font-bold">{val}</p>
              <p className="text-[10px] opacity-80 mt-0.5">{unit} · {label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Componente principal ─────────────────────────────────────────────────────

export default function GeneradorMenu({ listaIntercambios }) {
  const [modoVista, setModoVista]                     = useState('auto')
  const [distribucion, setDistribucion]               = useState(DISTRIBUCION_DEFAULT)
  const [excluidos, setExcluidos]                     = useState(new Set())
  const [mostrarExcluidos, setMostrarExcluidos]       = useState(false)
  const [mostrarDistribucion, setMostrarDistribucion] = useState(false)
  const [numDias, setNumDias]                         = useState(1)
  const [menusGenerados, setMenusGenerados]           = useState(null)
  const [diaActivo, setDiaActivo]                     = useState(0)
  const [exportando, setExportando]                   = useState(false)

  const sumaDistribucion = Object.values(distribucion).reduce((s, v) => s + v, 0)
  const distribucionOk   = sumaDistribucion === 100

  const toggleExcluido = (id) => {
    setExcluidos(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleGenerar = () => {
    if (!distribucionOk) return
    const resultado = generarMenuMultiDia(listaIntercambios, distribucion, excluidos, numDias, RECETAS)
    setMenusGenerados(resultado)
    setDiaActivo(0)
    setTimeout(() => {
      document.getElementById('menu-generado')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleDistribucion = (comida, val) => {
    const v = Math.max(0, Math.min(100, parseInt(val) || 0))
    setDistribucion(prev => ({ ...prev, [comida]: v }))
  }

  const handleExportarCSV = () => {
    if (!menusGenerados) return
    try { exportarCSV(menusGenerados) } catch (e) { console.error('Error exportando CSV:', e) }
  }

  const handleExportarExcel = async () => {
    if (!menusGenerados || exportando) return
    setExportando(true)
    try { exportarExcel(menusGenerados) } catch (e) { console.error('Error exportando Excel:', e) } finally { setExportando(false) }
  }

  const menuActivo = menusGenerados?.[diaActivo]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-apple p-6">
      <h3 className="text-base font-semibold text-apple-dark dark:text-gray-100 mb-1 flex items-center gap-2">
        <span>🥗</span> Generador de Menú
      </h3>
      <p className="text-xs text-apple-mid dark:text-gray-400 mb-4">
        Genera menús diarios con alimentos reales basados en los intercambios calculados.
      </p>

      {/* Toggle de modo */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-xl mb-5">
        <button
          type="button"
          onClick={() => setModoVista('auto')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
            modoVista === 'auto'
              ? 'bg-white dark:bg-gray-600 text-apple-dark dark:text-gray-100 shadow-sm'
              : 'text-apple-mid dark:text-gray-400 hover:text-apple-dark dark:hover:text-gray-200'
          }`}
        >
          Generar automático
        </button>
        <button
          type="button"
          onClick={() => setModoVista('salvadoreno')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
            modoVista === 'salvadoreno'
              ? 'bg-white dark:bg-gray-600 text-apple-dark dark:text-gray-100 shadow-sm'
              : 'text-apple-mid dark:text-gray-400 hover:text-apple-dark dark:hover:text-gray-200'
          }`}
        >
          🇸🇻 Menús Salvadoreños
        </button>
      </div>

      {modoVista === 'salvadoreno' && <PanelMenuSalvadoreno />}

      {modoVista === 'auto' && (<>

      {/* Selector de días */}
      <div className="mb-4">
        <p className="text-xs font-medium text-apple-mid dark:text-gray-400 mb-2">Duración del plan</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {OPCIONES_DIAS.map(op => (
            <button
              key={op.valor}
              type="button"
              onClick={() => setNumDias(op.valor)}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold border-2 transition-all ${
                numDias === op.valor
                  ? 'bg-apple-blue border-apple-blue text-white shadow-apple'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-apple-mid dark:text-gray-400 hover:border-apple-blue/40 hover:text-apple-dark dark:hover:text-gray-200'
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>
      </div>

      {/* Distribución por comida */}
      <button
        type="button"
        onClick={() => setMostrarDistribucion(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors mb-3"
      >
        <span className="text-sm font-medium text-apple-dark dark:text-gray-100">Distribución por tiempo de comida</span>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${distribucionOk ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
            {sumaDistribucion}% {distribucionOk ? '✓' : '⚠'}
          </span>
          <span className="text-apple-mid dark:text-gray-400 text-sm">{mostrarDistribucion ? '▲' : '▼'}</span>
        </div>
      </button>

      {mostrarDistribucion && (
        <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(COMIDAS_CONFIG).map(([key, cfg]) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-xs text-apple-mid dark:text-gray-400 font-medium">{cfg.icon} {cfg.label}</label>
              <div className="relative">
                <input
                  type="number"
                  value={distribucion[key]}
                  onChange={e => handleDistribucion(key, e.target.value)}
                  min="0" max="100"
                  className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm font-semibold text-center text-apple-dark dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-apple-blue/30 focus:border-apple-blue"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-apple-mid dark:text-gray-400">%</span>
              </div>
            </div>
          ))}
          {!distribucionOk && (
            <div className="col-span-2 sm:col-span-3">
              <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl px-3 py-2">
                Los porcentajes deben sumar 100% (suma actual: {sumaDistribucion}%)
              </p>
            </div>
          )}
        </div>
      )}

      {/* Exclusión de alimentos */}
      <button
        type="button"
        onClick={() => setMostrarExcluidos(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors mb-3"
      >
        <span className="text-sm font-medium text-apple-dark dark:text-gray-100">Excluir alimentos</span>
        <div className="flex items-center gap-2">
          {excluidos.size > 0 && (
            <span className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">
              {excluidos.size} excluidos
            </span>
          )}
          <span className="text-apple-mid dark:text-gray-400 text-sm">{mostrarExcluidos ? '▲' : '▼'}</span>
        </div>
      </button>

      {mostrarExcluidos && (
        <div className="mb-4">
          <PanelExcluidos excluidos={excluidos} toggleExcluido={toggleExcluido} />
          {excluidos.size > 0 && (
            <button
              type="button"
              onClick={() => setExcluidos(new Set())}
              className="mt-2 text-xs text-apple-mid dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              Limpiar exclusiones
            </button>
          )}
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleGenerar}
          disabled={!distribucionOk}
          className={`flex-1 py-3.5 rounded-2xl font-semibold text-sm transition-colors ${
            distribucionOk
              ? 'bg-apple-blue hover:bg-blue-600 active:bg-blue-700 text-white shadow-apple'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-300 dark:text-gray-500 cursor-not-allowed'
          }`}
        >
          {menusGenerados
            ? `🔄 Regenerar ${numDias > 1 ? numDias + ' días' : 'Menú'}`
            : `🥗 Generar ${numDias > 1 ? 'Plan de ' + numDias + ' días' : 'Menú'}`}
        </button>
        {menusGenerados && (
          <button
            type="button"
            onClick={() => { setMenusGenerados(null); setDiaActivo(0) }}
            className="px-4 py-3.5 rounded-2xl border-2 border-gray-200 dark:border-gray-600 text-apple-mid dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Resultado */}
      {menusGenerados && (
        <div id="menu-generado" className="mt-6">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div>
              <h4 className="text-sm font-semibold text-apple-dark dark:text-gray-100">
                {numDias === 1 ? 'Menú del día' : `Plan de ${numDias} días`}
              </h4>
              {numDias > 1 && (
                <p className="text-[11px] text-apple-mid dark:text-gray-400 mt-0.5">
                  Alimentos variados cada día · sin repeticiones consecutivas
                </p>
              )}
            </div>
            <div className="flex gap-2">
              {numDias === 1 && (
                <button
                  type="button"
                  onClick={handleGenerar}
                  className="text-xs text-apple-blue hover:text-blue-700 font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20"
                >
                  🔄 Nueva variación
                </button>
              )}
            </div>
          </div>

          {/* Botones de descarga */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <button
              type="button"
              onClick={handleExportarCSV}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-xs font-semibold text-apple-dark dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-300 transition-all"
            >
              <span>📄</span> Descargar CSV
            </button>
            <button
              type="button"
              onClick={handleExportarExcel}
              disabled={exportando}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-xs font-semibold text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 hover:border-green-300 transition-all disabled:opacity-60"
            >
              <span>📊</span> {exportando ? 'Generando...' : 'Descargar Excel'}
            </button>
          </div>

          {numDias > 1 && (
            <div className="mb-4">
              <NavDias numDias={numDias} diaActivo={diaActivo} onChange={setDiaActivo} />
            </div>
          )}

          {menuActivo && (
            <>
              {numDias > 1 && (
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-apple-blue bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full">
                    Día {menuActivo.dia} de {numDias}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const nuevos = [...menusGenerados]
                      const { menu, totales } = generarMenuMultiDia(listaIntercambios, distribucion, excluidos, 1, RECETAS)[0]
                      nuevos[diaActivo] = { ...nuevos[diaActivo], menu, totales }
                      setMenusGenerados(nuevos)
                    }}
                    className="text-xs text-apple-blue hover:text-blue-700 font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20"
                  >
                    🔄 Regenerar este día
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-3">
                {Object.entries(COMIDAS_CONFIG).map(([comida]) => (
                  <ComidaCard key={comida} comida={comida} items={menuActivo.menu[comida] || []} />
                ))}
              </div>

              <div className="mt-4 bg-apple-blue rounded-2xl p-4 text-white">
                <p className="text-xs font-medium opacity-80 mb-2 uppercase tracking-wide">
                  Totales — Día {menuActivo.dia}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Calorías',      val: menuActivo.totales.kcal,            unit: 'kcal' },
                    { label: 'Carbohidratos', val: Math.round(menuActivo.totales.CHO),  unit: 'g' },
                    { label: 'Proteínas',     val: Math.round(menuActivo.totales.CHON), unit: 'g' },
                    { label: 'Grasas',        val: Math.round(menuActivo.totales.COOH), unit: 'g' },
                  ].map(({ label, val, unit }) => (
                    <div key={label} className="bg-white/15 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold">{val.toLocaleString('es-ES')}</p>
                      <p className="text-[10px] opacity-80 mt-0.5">{unit} · {label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <ResumenSemanal menus={menusGenerados} />

          {menuActivo && (
            <NutritionSummary
              totalesMenu={menuActivo.totales}
              intercambiosRequeridos={listaIntercambios}
            />
          )}
        </div>
      )}
      </>)}
    </div>
  )
}
