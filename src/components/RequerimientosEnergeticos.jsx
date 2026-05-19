export default function RequerimientosEnergeticos({ datos }) {
  const { REE_femenino, REE_masculino, REE_seleccionado, REE_efectivo, deficitCalorico } = datos.requerimientosEnergeticos
  const { sexo } = datos.datosGenerales
  const tieneDeficit = deficitCalorico > 0

  const fmt = (n) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-apple p-6 print-card">
      <h3 className="text-base font-semibold text-apple-dark dark:text-gray-100 mb-4 flex items-center gap-2">
        <span>⚡</span> Requerimiento Energético (Harris-Benedict)
      </h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className={`rounded-xl p-4 border-2 ${sexo === 'FEMENINO' ? 'border-apple-blue bg-blue-50 dark:bg-blue-900/20' : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'}`}>
          <p className="text-xs text-apple-mid dark:text-gray-400 font-medium mb-1">REE Femenino</p>
          <p className={`text-xl font-bold ${sexo === 'FEMENINO' ? 'text-apple-blue' : 'text-apple-dark dark:text-gray-100'}`}>{fmt(REE_femenino)}</p>
          <p className="text-xs text-apple-mid dark:text-gray-400">kcal/día</p>
          {sexo === 'FEMENINO' && <span className="text-[10px] bg-apple-blue text-white px-1.5 py-0.5 rounded-full font-medium mt-1 inline-block">Seleccionado</span>}
        </div>
        <div className={`rounded-xl p-4 border-2 ${sexo === 'MASCULINO' ? 'border-apple-blue bg-blue-50 dark:bg-blue-900/20' : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'}`}>
          <p className="text-xs text-apple-mid dark:text-gray-400 font-medium mb-1">REE Masculino</p>
          <p className={`text-xl font-bold ${sexo === 'MASCULINO' ? 'text-apple-blue' : 'text-apple-dark dark:text-gray-100'}`}>{fmt(REE_masculino)}</p>
          <p className="text-xs text-apple-mid dark:text-gray-400">kcal/día</p>
          {sexo === 'MASCULINO' && <span className="text-[10px] bg-apple-blue text-white px-1.5 py-0.5 rounded-full font-medium mt-1 inline-block">Seleccionado</span>}
        </div>
      </div>

      {tieneDeficit ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl px-4 py-3">
            <div>
              <p className="text-xs text-apple-mid dark:text-gray-400 font-medium">REE base ({sexo === 'FEMENINO' ? 'Femenino' : 'Masculino'})</p>
            </div>
            <p className="text-lg font-semibold text-apple-mid dark:text-gray-400">{fmt(REE_seleccionado)} kcal/día</p>
          </div>
          <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl px-4 py-3">
            <div>
              <p className="text-xs text-amber-600 font-medium">Déficit calórico aplicado</p>
            </div>
            <p className="text-lg font-semibold text-amber-600">− {deficitCalorico} kcal/día</p>
          </div>
          <div className="bg-apple-blue rounded-xl p-4 text-white">
            <p className="text-sm font-medium opacity-80 mb-0.5">Objetivo calórico del plan</p>
            <p className="text-3xl font-bold">{fmt(REE_efectivo)} <span className="text-lg font-normal opacity-80">kcal/día</span></p>
          </div>
        </div>
      ) : (
        <div className="bg-apple-blue rounded-xl p-4 text-white">
          <p className="text-sm font-medium opacity-80 mb-0.5">Requerimiento para tu sexo</p>
          <p className="text-3xl font-bold">{fmt(REE_seleccionado)} <span className="text-lg font-normal opacity-80">kcal/día</span></p>
        </div>
      )}
    </div>
  )
}
