function NivelBadge({ nivel, texto }) {
  const styles = {
    normal:   'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700',
    elevado:  'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700',
    alto:     'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700',
    muy_alto: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700',
    bajo:     'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700',
  }
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${styles[nivel] || styles.normal}`}>
      {texto}
    </span>
  )
}

function StatCard({ label, value, interp, sub }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 flex flex-col gap-1">
      <span className="text-xs text-apple-mid dark:text-gray-400 font-medium uppercase tracking-wide">{label}</span>
      <span className="text-2xl font-bold text-apple-dark dark:text-gray-100">{value}</span>
      {sub && <span className="text-xs text-apple-mid dark:text-gray-400">{sub}</span>}
      {interp && <NivelBadge nivel={interp.nivel} texto={interp.texto} />}
    </div>
  )
}

export default function AnalisisAntropometrico({ datos }) {
  const { calculosAntropometricos, datosGenerales } = datos
  const { IMC, interpretacionIMC, pesoIdealMin, pesoIdealMax, pesoIdealPromedio } = calculosAntropometricos
  const { porcentajeMusculo, interpretacionMusculo, porcentajeGrasa, interpretacionGrasa, grasaVisceral, interpretacionGrasaVisceral } = datosGenerales

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-apple p-6 print-card">
      <h3 className="text-base font-semibold text-apple-dark dark:text-gray-100 mb-4 flex items-center gap-2">
        <span>📊</span> Evaluación Corporal
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
        <StatCard label="IMC" value={IMC.toFixed(2)} interp={interpretacionIMC} />
        <StatCard label="Peso ideal mín." value={`${pesoIdealMin.toFixed(2)} kg`} sub="IMC 18.5" />
        <StatCard label="Peso ideal máx." value={`${pesoIdealMax.toFixed(2)} kg`} sub="IMC 24.9" />
      </div>

      {/* Peso promedio destacado — es la base de los cálculos */}
      <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 border border-apple-blue/20 dark:border-blue-800/50 rounded-xl px-4 py-3 mb-3">
        <div>
          <p className="text-xs font-medium text-apple-blue uppercase tracking-wide">Peso ideal promedio</p>
          <p className="text-xs text-apple-mid dark:text-gray-400">Base de los cálculos REE · (mín + máx) ÷ 2</p>
        </div>
        <p className="text-2xl font-bold text-apple-blue">{pesoIdealPromedio.toFixed(2)} <span className="text-sm font-normal">kg</span></p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="% Músculo" value={`${porcentajeMusculo}%`} interp={interpretacionMusculo} />
        <StatCard label="% Grasa corporal" value={`${porcentajeGrasa}%`} interp={interpretacionGrasa} />
        <StatCard label="Grasa visceral" value={grasaVisceral} interp={interpretacionGrasaVisceral} />
      </div>
    </div>
  )
}
