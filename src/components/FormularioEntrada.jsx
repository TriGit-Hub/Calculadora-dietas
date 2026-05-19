import { useState, useEffect, useCallback } from 'react'
import { calcularIntercambiosCereales, TABLA_INTERCAMBIOS, ORDEN_INTERCAMBIOS } from '../utils/calculosNutricionales'

const FACTORES_ACTIVIDAD = [
  { value: 1.2, label: '1.2 — Sedentario', desc: 'Poco o ningún ejercicio' },
  { value: 1.4, label: '1.4 — Ligeramente activo', desc: 'Ejercicio ligero 1–3 días/semana' },
  { value: 1.6, label: '1.6 — Moderadamente activo', desc: 'Ejercicio moderado 3–5 días/semana' },
  { value: 1.8, label: '1.8 — Muy activo', desc: 'Ejercicio intenso 6–7 días/semana' },
  { value: 2.0, label: '2.0 — Extremadamente activo', desc: 'Ejercicio muy intenso o trabajo físico' },
]

const DEFAULTS = {
  nombre: '',
  edad: '',
  sexo: 'MASCULINO',
  pesoActual: '',
  talla: '',
  porcentajeMusculo: '',
  porcentajeGrasa: '',
  grasaVisceral: '',
  factorActividadFisica: 1.4,
  deficitCalorico: 0,
  distribucion: { porcentajeCHO: 45, porcentajeCHON: 30, porcentajeCOOH: 25 },
  intercambios: {
    lecheEntera: 0, lecheSemi: 1, lecheDes: 1, vegetales: 5, frutas: 3,
    carnesMagras: 6, carnesSemi: 5, carnesGordas: 0, grasas: 2,
  },
}

const DEFICIT_OPCIONES = [
  { value: 0,   label: 'Sin déficit',   desc: 'Mantenimiento de peso' },
  { value: 200, label: '−200 kcal',     desc: 'Déficit leve' },
  { value: 300, label: '−300 kcal',     desc: 'Déficit moderado' },
]

const MARGENES = { CHO: 8, CHON: 5, COOH: 3, KCAL: 100 }

const MACRO_ITEMS = [
  { key: 'CHO',  label: 'Carbohidratos', unit: 'g' },
  { key: 'CHON', label: 'Proteínas',     unit: 'g' },
  { key: 'COOH', label: 'Grasas',        unit: 'g' },
  { key: 'KCAL', label: 'Calorías',      unit: 'kcal' },
]

function MacroProgreso({ preview }) {
  if (!preview) return null
  const { targets, current } = preview

  return (
    <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
      <p className="text-xs font-semibold text-apple-mid dark:text-gray-400 uppercase tracking-wide mb-3">
        Progreso de macronutrientes
      </p>
      <div className="flex flex-col gap-2.5">
        {MACRO_ITEMS.map(({ key, label, unit }) => {
          const cur = current[key]
          const tgt = targets[key]
          const margin = MARGENES[key]
          const diff = cur - tgt
          const absDiff = Math.abs(diff)
          const ok = absDiff <= margin
          const pct = tgt > 0 ? Math.min(100, (cur / tgt) * 100) : 0
          const fmtVal = (v) => unit === 'kcal'
            ? Math.round(v).toLocaleString('es-ES')
            : Math.round(v)

          return (
            <div key={key} className={`rounded-xl px-3 py-2.5 border ${ok ? 'bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-800' : 'bg-red-50 border-red-100 dark:bg-red-900/20 dark:border-red-800'}`}>
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-xs font-medium text-apple-dark dark:text-gray-100">{label}</span>
                <span className={`text-xs font-bold ${ok ? 'text-green-600' : 'text-red-500'}`}>
                  {fmtVal(cur)} / {fmtVal(tgt)} {unit} {ok ? '✓' : '⚠'}
                </span>
              </div>
              <div className="h-1.5 bg-white/80 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${ok ? 'bg-green-400' : 'bg-red-400'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {!ok && (
                <p className="text-[10px] mt-1 text-red-500">
                  {diff > 0
                    ? `Excede por +${Math.round(absDiff)} ${unit}`
                    : `Faltan ${Math.round(absDiff)} ${unit}`
                  } · margen permitido: ±{margin}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SectionCard({ title, icon, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-apple p-6 print-card">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xl">{icon}</span>
        <h2 className="text-lg font-semibold text-apple-dark dark:text-gray-100">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function InputField({ label, name, value, onChange, type = 'text', placeholder, suffix, min, step, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-apple-mid dark:text-gray-400">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          step={step}
          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-apple-dark dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue/30 focus:border-apple-blue transition-all placeholder:text-gray-300 dark:placeholder:text-gray-500"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-apple-mid dark:text-gray-400">{suffix}</span>
        )}
      </div>
    </div>
  )
}

function NumericStepper({ label, value, onChange, min = 0, max = 99 }) {
  return (
    <div className="flex items-center justify-between gap-2 py-2 border-b border-gray-50 dark:border-gray-700/50 last:border-0">
      <span className="text-sm text-apple-dark dark:text-gray-100 flex-1">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-apple-dark dark:text-gray-100 font-medium transition-colors"
        >
          −
        </button>
        <span className="w-8 text-center font-semibold text-apple-dark dark:text-gray-100 text-sm">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-apple-dark dark:text-gray-100 font-medium transition-colors"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default function FormularioEntrada({ onCalcular, initialData, darkMode, onToggleDark }) {
  const [form, setForm] = useState(initialData || DEFAULTS)
  const [errores, setErrores] = useState({})
  const [cerealPreview, setCerealPreview] = useState(null)
  const [showWarning, setShowWarning] = useState(false)
  const [macroWarnings, setMacroWarnings] = useState([])

  const sumaMacros = form.distribucion.porcentajeCHO + form.distribucion.porcentajeCHON + form.distribucion.porcentajeCOOH

  const calcularCerealPreview = useCallback(() => {
    const talla = parseFloat(form.talla)
    const edad = parseFloat(form.edad)
    if (!talla || !edad || talla <= 0) { setCerealPreview(null); return }

    const pesoIdealMin = Math.pow(talla, 2) * 18.5
    const pesoIdealMax = Math.pow(talla, 2) * 24.9
    const pesoIdealPromedio = (pesoIdealMin + pesoIdealMax) / 2
    const tallaCM = talla * 100
    const faf = form.factorActividadFisica

    const REE_f = (655.1 + (9.56 * pesoIdealPromedio) + (1.85 * tallaCM) - (4.68 * edad)) * faf
    const REE_m = (66.47 + (13.75 * pesoIdealPromedio) + (5 * tallaCM) - (6.74 * edad)) * faf
    const REE = (form.sexo === 'FEMENINO' ? REE_f : REE_m) - (form.deficitCalorico || 0)

    const CHO_gramos = (REE * (form.distribucion.porcentajeCHO / 100)) / 4
    const c = calcularIntercambiosCereales(CHO_gramos, form.intercambios)
    setCerealPreview(c)
  }, [form.talla, form.edad, form.sexo, form.factorActividadFisica, form.deficitCalorico, form.distribucion.porcentajeCHO, form.intercambios])

  useEffect(() => { calcularCerealPreview() }, [calcularCerealPreview])

  // Cálculo en vivo de los macros actuales vs objetivos — se recalcula en cada render
  const getMacroPreview = () => {
    const talla = parseFloat(form.talla)
    const edad  = parseFloat(form.edad)
    if (!talla || !edad || talla <= 0) return null

    const pesoIdealMin    = talla * talla * 18.5
    const pesoIdealMax    = talla * talla * 24.9
    const pesoIdealPromedio = (pesoIdealMin + pesoIdealMax) / 2
    const tallaCM = talla * 100
    const faf     = form.factorActividadFisica

    const REE_f = (655.1  + 9.56  * pesoIdealPromedio + 1.85 * tallaCM - 4.68 * edad) * faf
    const REE_m = (66.47  + 13.75 * pesoIdealPromedio + 5    * tallaCM - 6.74 * edad) * faf
    const REE   = (form.sexo === 'FEMENINO' ? REE_f : REE_m) - (form.deficitCalorico || 0)

    const targets = {
      CHO:  (REE * form.distribucion.porcentajeCHO  / 100) / 4,
      CHON: (REE * form.distribucion.porcentajeCHON / 100) / 4,
      COOH: (REE * form.distribucion.porcentajeCOOH / 100) / 9,
      KCAL: REE,
    }

    const allExchanges = { ...form.intercambios, cereales: cerealPreview || 0 }
    const current = { CHO: 0, CHON: 0, COOH: 0, KCAL: 0 }
    ORDEN_INTERCAMBIOS.forEach(k => {
      const qty = allExchanges[k] || 0
      const t   = TABLA_INTERCAMBIOS[k]
      current.CHO  += qty * t.CHO_por_porcion
      current.CHON += qty * t.CHON_por_porcion
      current.COOH += qty * t.COOH_por_porcion
      current.KCAL += qty * t.KCAL_por_porcion
    })

    return { targets, current }
  }

  const macroPreview = getMacroPreview()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errores[name]) setErrores(prev => ({ ...prev, [name]: null }))
  }

  const handleDistribucion = (field, rawValue) => {
    const value = parseInt(rawValue) || 0
    setForm(prev => ({ ...prev, distribucion: { ...prev.distribucion, [field]: value } }))
  }

  const handleIntercambio = (field, value) => {
    setForm(prev => ({ ...prev, intercambios: { ...prev.intercambios, [field]: value } }))
  }

  const validar = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'Ingresa el nombre'
    const edad = parseFloat(form.edad)
    if (!form.edad || isNaN(edad) || edad < 1) e.edad = 'Ingresa una edad válida'
    const peso = parseFloat(form.pesoActual)
    if (!form.pesoActual || isNaN(peso) || peso <= 0) e.pesoActual = 'Ingresa un peso válido'
    const talla = parseFloat(form.talla)
    if (!form.talla || isNaN(talla) || talla <= 0) e.talla = 'Ingresa una talla válida'
    const musculo = parseFloat(form.porcentajeMusculo)
    if (!form.porcentajeMusculo || isNaN(musculo)) e.porcentajeMusculo = 'Ingresa el % de músculo'
    const grasa = parseFloat(form.porcentajeGrasa)
    if (!form.porcentajeGrasa || isNaN(grasa)) e.porcentajeGrasa = 'Ingresa el % de grasa'
    const gv = parseFloat(form.grasaVisceral)
    if (!form.grasaVisceral || isNaN(gv)) e.grasaVisceral = 'Ingresa la grasa visceral'
    if (sumaMacros !== 100) e.macros = 'Los macronutrientes deben sumar exactamente 100%'
    if (cerealPreview !== null && cerealPreview < 0) e.intercambios = 'Los intercambios de CHO superan el objetivo. Reduce frutas, vegetales o leches.'
    return e
  }

  const doCalcular = () => {
    onCalcular({
      nombre: form.nombre.trim(),
      edad: parseFloat(form.edad),
      sexo: form.sexo,
      pesoActual: parseFloat(form.pesoActual),
      talla: parseFloat(form.talla),
      porcentajeMusculo: parseFloat(form.porcentajeMusculo),
      porcentajeGrasa: parseFloat(form.porcentajeGrasa),
      grasaVisceral: parseInt(form.grasaVisceral),
      factorActividadFisica: parseFloat(form.factorActividadFisica),
      deficitCalorico: form.deficitCalorico || 0,
      distribucion: form.distribucion,
      intercambios: { ...form.intercambios, cereales: cerealPreview || 0 },
    }, form)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validar()
    if (Object.keys(e2).length > 0) {
      setErrores(e2)
      const firstError = document.querySelector('[data-error]')
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    // Verificar que los macros cuadren dentro del margen antes de calcular
    if (macroPreview) {
      const MACRO_LABELS = {
        CHO:  { label: 'Carbohidratos', unit: 'g' },
        CHON: { label: 'Proteínas',     unit: 'g' },
        COOH: { label: 'Grasas',        unit: 'g' },
        KCAL: { label: 'Calorías',      unit: 'kcal' },
      }
      const warnings = Object.entries(MARGENES).reduce((acc, [key, margin]) => {
        const diff = macroPreview.current[key] - macroPreview.targets[key]
        if (Math.abs(diff) > margin) {
          acc.push({
            key, diff, margin,
            ...MACRO_LABELS[key],
            current: macroPreview.current[key],
            target:  macroPreview.targets[key],
          })
        }
        return acc
      }, [])

      if (warnings.length > 0) {
        setMacroWarnings(warnings)
        setShowWarning(true)
        return
      }
    }

    doCalcular()
  }

  const fieldError = (key) => errores[key] ? (
    <p data-error className="text-xs text-red-500 mt-1">{errores[key]}</p>
  ) : null

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-gray-950">

      {/* Modal de advertencia: macros fuera de margen */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-apple-md p-6 w-full max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">⚠️</div>
              <div>
                <h3 className="text-base font-semibold text-apple-dark dark:text-gray-100">Macros fuera de margen</h3>
                <p className="text-xs text-apple-mid dark:text-gray-400">El plan no cuadra con el objetivo</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              {macroWarnings.map(w => {
                const fmtV = (v) => w.unit === 'kcal' ? Math.round(v).toLocaleString('es-ES') : Math.round(v)
                return (
                  <div key={w.key} className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl px-3 py-2.5">
                    <p className="text-sm font-semibold text-red-700">{ w.label}</p>
                    <p className="text-xs text-red-500 mt-0.5 leading-relaxed">
                      Tienes {fmtV(w.current)} {w.unit} · Objetivo: {fmtV(w.target)} {w.unit}<br />
                      Diferencia: {w.diff > 0 ? '+' : ''}{Math.round(w.diff)} {w.unit} &nbsp;(margen ±{w.margin})
                    </p>
                  </div>
                )
              })}
            </div>

            <p className="text-xs text-apple-mid dark:text-gray-400 mb-5">
              Ajusta los intercambios de carnes o grasas para cuadrar los valores, o continúa de todas formas con estas diferencias.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowWarning(false)}
                className="flex-1 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm font-semibold text-apple-dark dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                ← Ajustar
              </button>
              <button
                type="button"
                onClick={() => { setShowWarning(false); doCalcular() }}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Continuar →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50 no-print">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-apple-blue rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-sm">N</div>
          <div className="flex-1">
            <h1 className="text-base font-semibold text-apple-dark dark:text-gray-100 leading-tight">Calculadora Nutricional</h1>
            <p className="text-xs text-apple-mid dark:text-gray-400">Método de intercambios · Harris-Benedict</p>
          </div>
          <button
            onClick={onToggleDark}
            className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-apple-dark dark:text-gray-100 transition-colors text-base"
            title={darkMode ? 'Modo claro' : 'Modo oscuro'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-5">

        {/* Hero */}
        <div className="text-center py-4">
          <h2 className="text-3xl font-bold text-apple-dark dark:text-gray-100 tracking-tight">Plan Nutricional</h2>
          <p className="text-apple-mid dark:text-gray-400 mt-1 text-sm">Completa los datos para calcular tu requerimiento calórico personalizado</p>
        </div>

        {/* Sección 1: Datos Personales */}
        <SectionCard title="Datos Personales" icon="👤">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <InputField label="Nombre completo" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre del paciente" required />
              {fieldError('nombre')}
            </div>
            <div>
              <InputField label="Edad" name="edad" value={form.edad} onChange={handleChange} type="number" placeholder="36" suffix="años" min="1" required />
              {fieldError('edad')}
            </div>
            <div>
              <label className="text-sm font-medium text-apple-mid dark:text-gray-400 block mb-1">Sexo<span className="text-red-400 ml-0.5">*</span></label>
              <div className="flex gap-3">
                {['MASCULINO', 'FEMENINO'].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, sexo: s }))}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border ${form.sexo === s ? 'bg-apple-blue text-white border-apple-blue shadow-sm' : 'bg-gray-50 dark:bg-gray-700 text-apple-mid dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:border-apple-blue/50'}`}
                  >
                    {s === 'MASCULINO' ? '♂ Masculino' : '♀ Femenino'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <InputField label="Peso actual" name="pesoActual" value={form.pesoActual} onChange={handleChange} type="number" placeholder="89.1" suffix="kg" min="0" step="0.1" required />
              {fieldError('pesoActual')}
            </div>
            <div>
              <InputField label="Talla" name="talla" value={form.talla} onChange={handleChange} type="number" placeholder="1.78" suffix="m" min="0" step="0.01" required />
              {fieldError('talla')}
            </div>
          </div>
        </SectionCard>

        {/* Sección 2: Composición Corporal */}
        <SectionCard title="Composición Corporal" icon="📊">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <InputField label="% Músculo" name="porcentajeMusculo" value={form.porcentajeMusculo} onChange={handleChange} type="number" placeholder="25.3" suffix="%" min="0" step="0.1" required />
              {fieldError('porcentajeMusculo')}
            </div>
            <div>
              <InputField label="% Grasa corporal" name="porcentajeGrasa" value={form.porcentajeGrasa} onChange={handleChange} type="number" placeholder="39.8" suffix="%" min="0" step="0.1" required />
              {fieldError('porcentajeGrasa')}
            </div>
            <div>
              <InputField label="Grasa visceral" name="grasaVisceral" value={form.grasaVisceral} onChange={handleChange} type="number" placeholder="11" min="0" required />
              {fieldError('grasaVisceral')}
            </div>
          </div>
        </SectionCard>

        {/* Sección 3: Actividad Física */}
        <SectionCard title="Nivel de Actividad Física" icon="🏃">
          <div className="flex flex-col gap-2">
            {FACTORES_ACTIVIDAD.map(f => (
              <button
                key={f.value}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, factorActividadFisica: f.value }))}
                className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${form.factorActividadFisica === f.value ? 'border-apple-blue bg-blue-50 dark:bg-blue-900/20' : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:border-gray-200 dark:hover:border-gray-600'}`}
              >
                <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 transition-colors ${form.factorActividadFisica === f.value ? 'border-apple-blue bg-apple-blue' : 'border-gray-300 dark:border-gray-500'}`} />
                <div>
                  <p className={`text-sm font-medium ${form.factorActividadFisica === f.value ? 'text-apple-blue' : 'text-apple-dark dark:text-gray-100'}`}>{f.label}</p>
                  <p className="text-xs text-apple-mid dark:text-gray-400">{f.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Sección 4: Déficit Calórico */}
        <SectionCard title="Objetivo Calórico" icon="📉">
          <p className="text-xs text-apple-mid dark:text-gray-400 mb-3">
            Reducción opcional sobre el requerimiento basal. Recomendado para pérdida de peso controlada.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {DEFICIT_OPCIONES.map(d => (
              <button
                key={d.value}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, deficitCalorico: d.value }))}
                className={`p-3 rounded-xl border text-center transition-all ${form.deficitCalorico === d.value ? 'border-apple-blue bg-blue-50 dark:bg-blue-900/20' : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:border-gray-200 dark:hover:border-gray-600'}`}
              >
                <p className={`text-sm font-bold ${form.deficitCalorico === d.value ? 'text-apple-blue' : 'text-apple-dark dark:text-gray-100'}`}>{d.label}</p>
                <p className="text-xs text-apple-mid dark:text-gray-400 mt-0.5">{d.desc}</p>
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Sección 5: Distribución de Macronutrientes */}
        <SectionCard title="Distribución de Macronutrientes" icon="⚖️">
          <div className="grid grid-cols-3 gap-3 mb-3">
            {[
              { field: 'porcentajeCHO', label: 'Carbohidratos', color: 'blue', abbr: 'CHO' },
              { field: 'porcentajeCHON', label: 'Proteínas', color: 'green', abbr: 'CHON' },
              { field: 'porcentajeCOOH', label: 'Grasas', color: 'amber', abbr: 'COOH' },
            ].map(m => (
              <div key={m.field} className="flex flex-col gap-1">
                <label className="text-xs font-medium text-apple-mid dark:text-gray-400">{m.label}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={form.distribucion[m.field]}
                    onChange={e => handleDistribucion(m.field, e.target.value)}
                    min="0" max="100"
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5 text-apple-dark dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue/30 focus:border-apple-blue text-center font-semibold"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-apple-mid dark:text-gray-400">%</span>
                </div>
              </div>
            ))}
          </div>
          <div className={`flex items-center justify-between rounded-xl px-4 py-2.5 ${sumaMacros === 100 ? 'bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800'}`}>
            <span className="text-sm font-medium text-apple-mid dark:text-gray-400">Total</span>
            <span className={`text-sm font-bold ${sumaMacros === 100 ? 'text-green-600' : 'text-red-500'}`}>
              {sumaMacros}% {sumaMacros === 100 ? '✓' : `(falta ${100 - sumaMacros}%)`}
            </span>
          </div>
          {errores.macros && <p data-error className="text-xs text-red-500 mt-2">{errores.macros}</p>}
        </SectionCard>

        {/* Sección 5: Intercambios */}
        <SectionCard title="Intercambios de Alimentos" icon="🍽️">
          <p className="text-xs text-apple-mid dark:text-gray-400 mb-4">Ajusta las porciones. Los cereales se calculan automáticamente según el objetivo de carbohidratos.</p>
          <div className="flex flex-col">
            <NumericStepper label="Leche Entera" value={form.intercambios.lecheEntera} onChange={v => handleIntercambio('lecheEntera', v)} />
            <NumericStepper label="Leche Semidescremada" value={form.intercambios.lecheSemi} onChange={v => handleIntercambio('lecheSemi', v)} />
            <NumericStepper label="Leche Descremada" value={form.intercambios.lecheDes} onChange={v => handleIntercambio('lecheDes', v)} />
            <NumericStepper label="Vegetales" value={form.intercambios.vegetales} onChange={v => handleIntercambio('vegetales', v)} />
            <NumericStepper label="Frutas" value={form.intercambios.frutas} onChange={v => handleIntercambio('frutas', v)} />

            {/* Cereales (calculado automáticamente) */}
            <div className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-700/50">
              <div className="flex items-center gap-2">
                <span className="text-sm text-apple-dark dark:text-gray-100">Cereales</span>
                <span className="text-[10px] bg-apple-blue/10 text-apple-blue px-1.5 py-0.5 rounded-full font-medium uppercase tracking-wide">Auto</span>
              </div>
              <span className={`text-lg font-bold ${cerealPreview === null ? 'text-gray-300 dark:text-gray-600' : cerealPreview < 0 ? 'text-red-500' : 'text-apple-blue'}`}>
                {cerealPreview === null ? '—' : cerealPreview}
              </span>
            </div>

            <NumericStepper label="Carnes Magras" value={form.intercambios.carnesMagras} onChange={v => handleIntercambio('carnesMagras', v)} />
            <NumericStepper label="Carnes Semigrasas" value={form.intercambios.carnesSemi} onChange={v => handleIntercambio('carnesSemi', v)} />
            <NumericStepper label="Carnes Grasas" value={form.intercambios.carnesGordas} onChange={v => handleIntercambio('carnesGordas', v)} />
            <NumericStepper label="Grasas" value={form.intercambios.grasas} onChange={v => handleIntercambio('grasas', v)} />
          </div>

          {/* Progreso en vivo de macronutrientes */}
          <MacroProgreso preview={macroPreview} />

          {errores.intercambios && <p data-error className="text-xs text-red-500 mt-3 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">{errores.intercambios}</p>}
        </SectionCard>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-apple-blue hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition-colors shadow-apple-md text-base"
        >
          Calcular Plan Nutricional →
        </button>

        <p className="text-center text-xs text-apple-mid dark:text-gray-400 pb-4">
          Basado en la fórmula de Harris-Benedict · Método de intercambios
        </p>
      </form>
    </div>
  )
}
