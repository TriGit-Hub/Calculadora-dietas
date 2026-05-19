const TABLA = {
  lecheEntera:  { CHO: 12, CHON: 8, COOH: 8,  kcal: 150 },
  lecheSemi:    { CHO: 12, CHON: 8, COOH: 5,  kcal: 120 },
  lecheDes:     { CHO: 12, CHON: 8, COOH: 0,  kcal: 100 },
  vegetales:    { CHO: 5,  CHON: 2, COOH: 0,  kcal: 25  },
  frutas:       { CHO: 15, CHON: 0, COOH: 0,  kcal: 60  },
  cereales:     { CHO: 15, CHON: 2, COOH: 1,  kcal: 80  },
  carnesMagras: { CHO: 0,  CHON: 7, COOH: 3,  kcal: 55  },
  carnesSemi:   { CHO: 0,  CHON: 7, COOH: 5,  kcal: 75  },
  carnesGordas: { CHO: 0,  CHON: 7, COOH: 8,  kcal: 100 },
  grasas:       { CHO: 0,  CHON: 0, COOH: 5,  kcal: 45  },
}

function calcularObjetivo(intercambios) {
  const t = { CHO: 0, CHON: 0, COOH: 0, kcal: 0 }
  Object.entries(intercambios).forEach(([cat, cantidad]) => {
    const vals = TABLA[cat]
    if (!vals || !cantidad) return
    t.CHO  += vals.CHO  * cantidad
    t.CHON += vals.CHON * cantidad
    t.COOH += vals.COOH * cantidad
    t.kcal += vals.kcal * cantidad
  })
  return t
}

function cumplimientoColor(pct) {
  const diff = Math.abs(pct - 100)
  if (diff <= 5)  return { bar: 'bg-green-400',  text: 'text-green-600',  bg: 'bg-green-50'  }
  if (diff <= 10) return { bar: 'bg-amber-400',  text: 'text-amber-600',  bg: 'bg-amber-50'  }
  return              { bar: 'bg-red-400',    text: 'text-red-600',    bg: 'bg-red-50'    }
}

function BarraMacro({ label, real, objetivo, unidad }) {
  if (objetivo === 0) return null
  const pct    = Math.round((real / objetivo) * 100)
  const ancho  = Math.min(pct, 130)
  const { bar, text, bg } = cumplimientoColor(pct)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-apple-dark">{label}</span>
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${text} ${bg}`}>
          {pct}%
        </span>
      </div>
      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full rounded-full transition-all ${bar}`}
          style={{ width: `${Math.min(ancho, 100)}%` }}
        />
        {ancho > 100 && (
          <div className="absolute right-0 top-0 h-full w-1 bg-red-500 rounded-full" />
        )}
      </div>
      <div className="flex justify-between">
        <span className="text-[10px] text-apple-mid">{Math.round(real)}{unidad} real</span>
        <span className="text-[10px] text-apple-mid">{Math.round(objetivo)}{unidad} objetivo</span>
      </div>
    </div>
  )
}

function ChipMacro({ label, pctReal, pctObjetivo, color }) {
  return (
    <div className={`flex-1 rounded-xl p-3 text-center ${color}`}>
      <p className="text-base font-bold">{pctReal}%</p>
      <p className="text-[10px] mt-0.5 opacity-70">{label}</p>
      <p className="text-[10px] opacity-50">obj: {pctObjetivo}%</p>
    </div>
  )
}

export default function NutritionSummary({ totalesMenu, intercambiosRequeridos }) {
  const objetivo = calcularObjetivo(intercambiosRequeridos)

  const kcalReal = totalesMenu.kcal || 1
  const pctCHO   = Math.round(((totalesMenu.CHO  * 4) / kcalReal) * 100)
  const pctCHON  = Math.round(((totalesMenu.CHON * 4) / kcalReal) * 100)
  const pctCOOH  = Math.round(((totalesMenu.COOH * 9) / kcalReal) * 100)

  const kcalObj  = objetivo.kcal || 1
  const pctCHOobj  = Math.round(((objetivo.CHO  * 4) / kcalObj) * 100)
  const pctCHONobj = Math.round(((objetivo.CHON * 4) / kcalObj) * 100)
  const pctCOOHobj = Math.round(((objetivo.COOH * 9) / kcalObj) * 100)

  const macros = [
    { key: 'kcal', label: 'Calorías',      real: totalesMenu.kcal,  objetivo: objetivo.kcal,  unidad: ' kcal' },
    { key: 'CHO',  label: 'Carbohidratos', real: totalesMenu.CHO,   objetivo: objetivo.CHO,   unidad: 'g' },
    { key: 'CHON', label: 'Proteínas',     real: totalesMenu.CHON,  objetivo: objetivo.CHON,  unidad: 'g' },
    { key: 'COOH', label: 'Grasas',        real: totalesMenu.COOH,  objetivo: objetivo.COOH,  unidad: 'g' },
  ]

  const diffs = macros.map(m => Math.abs((m.real / (m.objetivo || 1)) * 100 - 100))
  const maxDiff = Math.max(...diffs)
  const badge =
    maxDiff <= 5  ? { label: 'Excelente ✓', cls: 'bg-green-100 text-green-700 border-green-200' } :
    maxDiff <= 10 ? { label: 'Aceptable',   cls: 'bg-amber-100 text-amber-700 border-amber-200' } :
                    { label: 'Revisar',      cls: 'bg-red-100   text-red-700   border-red-200'   }

  return (
    <div className="mt-4 bg-white rounded-2xl shadow-apple overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
        <h5 className="text-sm font-semibold text-apple-dark">Cumplimiento nutricional</h5>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badge.cls}`}>
          {badge.label}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Barras de macros */}
        <div className="flex flex-col gap-3">
          {macros.map(m => (
            <BarraMacro
              key={m.key}
              label={m.label}
              real={m.real}
              objetivo={m.objetivo}
              unidad={m.unidad}
            />
          ))}
        </div>

        {/* Chips de distribución */}
        <div>
          <p className="text-[10px] font-bold text-apple-mid uppercase tracking-wide mb-2">
            Distribución real de macros
          </p>
          <div className="flex gap-2">
            <ChipMacro label="Carb."    pctReal={pctCHO}  pctObjetivo={pctCHOobj}  color="bg-blue-50 text-blue-700"  />
            <ChipMacro label="Proteína" pctReal={pctCHON} pctObjetivo={pctCHONobj} color="bg-green-50 text-green-700" />
            <ChipMacro label="Grasa"    pctReal={pctCOOH} pctObjetivo={pctCOOHobj} color="bg-amber-50 text-amber-700" />
          </div>
        </div>
      </div>
    </div>
  )
}
